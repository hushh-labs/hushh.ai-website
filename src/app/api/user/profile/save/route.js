import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request) {
    try {
        const body = await request.json();
        const { userData, agentResults } = body;

        // Extract AI data
        const getAgentData = (agentName) => {
            const result = agentResults[agentName];
            if (!result?.data) return {};

            // Handle various nested structures
            const text = result.data?.result?.status?.message?.parts?.[0]?.text ||
                result.data?.result?.message?.parts?.[0]?.text ||
                result.data?.result?.response?.parts?.[0]?.text ||
                result.data?.result?.output ||
                (typeof result.data === 'string' ? result.data : '');

            try {
                // Try parsing if it's a string, looking for JSON block
                if (typeof text === 'string') {
                    const jsonMatch = text.match(/\{[\s\S]*\}/);
                    const jsonStr = jsonMatch ? jsonMatch[0] : text;
                    return JSON.parse(jsonStr);
                }
                return text || {}; // Return object if already object
            } catch (e) {
                return {};
            }
        };

        // IMPORTANT:
        // We must NOT generate or mutate Supabase-auth identity ourselves.
        // The persistent UUID must come from the Supabase profile-creation agent/API only.
        const profileAgentData = getAgentData('supabase-profile-creation-agent');
        const geminiAgentData = getAgentData('gemini');
        const publicAgentData = agentResults.public?.data || {};

        // Merge strategies: Profile Agent > Gemini > Public
        // We use a consolidated object for the mapping below
        const geminiData = {
            ...publicAgentData,
            ...geminiAgentData,
            ...profileAgentData // Profile agent overwrites others as it is the "synthesizer"
        };

        // Ensure nested objects (like address) are merged, not just overwritten if partial
        if (profileAgentData.address && geminiAgentData.address) {
            geminiData.address = { ...geminiAgentData.address, ...profileAgentData.address };
        }

        // Helper to safe parse Int/Float
        const safeInt = (val) => {
            const parsed = parseInt(val);
            return isNaN(parsed) ? null : parsed;
        };
        const safeFloat = (val) => {
            const parsed = parseFloat(val);
            return isNaN(parsed) ? null : parsed;
        };
        const safeBool = (val) => {
            if (typeof val === 'boolean') return val;
            if (typeof val === 'string') return val.toLowerCase() === 'true' || val === 'yes';
            return null;
        };

        // 1. Resolve User ID & Hushh ID
        // Priority: Agent Result > Request Data
        // NOTE: We intentionally do NOT query by email to “find or invent” user_id,
        // and we never generate a synthetic user_id.
        let finalUserId = profileAgentData?.user_id || userData?.user_id || userData?.userId;
        let finalHushhId = userData.hushh_id;

        if (profileAgentData?.hushh_id) {
            finalHushhId = profileAgentData.hushh_id;
        }

        if (!finalUserId) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Missing user_id. It must be provided by the Supabase profile creation API/agent.'
                },
                { status: 400 }
            );
        }

        // Fallback for hushh_id if still missing
        if (!finalHushhId) {
            const firstName = (userData.fullName || "user").split(' ')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
            const suffix = finalUserId.includes('-') ? finalUserId.split('-').shift() : finalUserId.substr(-6);
            finalHushhId = `${firstName}/${suffix}`;
        }

        // 2. Map Flattened Needs/Wants/Desires
        const needs = Array.isArray(geminiData.needs) ? geminiData.needs : [];
        const wants = Array.isArray(geminiData.wants) ? geminiData.wants : [];
        const desires = Array.isArray(geminiData.desires) ? geminiData.desires : [];

        // 3. Map Intents
        const intents = geminiData.intents || {};
        const getIntent = (period) => {
            if (Array.isArray(intents)) return intents.find(i => i.period === period) || {};
            return intents[period] || intents[`${period}h`] || {};
        };

        const intent24 = getIntent('24');
        const intent48 = getIntent('48');
        const intent72 = getIntent('72');

        // 4. Construct Profile Data for Upsert
        const profileData = {
            user_id: finalUserId,
            hushh_id: finalHushhId, // Added hushh_id column
            full_name: userData.fullName,
            email: userData.email,
            phone: `${userData.countryCode || ''} ${userData.phoneNumber || ''}`.trim(),

            // Address
            address_line1: geminiData.address?.street || userData.address || userData.address_line1,
            city: geminiData.address?.city || userData.city,
            state: geminiData.address?.state || userData.state,
            zip: safeInt(geminiData.address?.zipCode || userData.zip || userData.zip_code),

            // Demographics
            age: safeInt(geminiData.age || userData.age),
            gender: geminiData.gender || userData.gender,
            marital_status: geminiData.maritalStatus || geminiData.marital_status || userData.marital_status,
            household_size: safeInt(geminiData.householdSize || userData.household_size),
            children_count: (geminiData.childrenCount || userData.children_count)?.toString(),

            // Professional
            education_level: geminiData.educationLevel || userData.education_level,
            occupation: geminiData.occupation || userData.occupation,
            income_bracket: geminiData.incomeBracket || userData.income_bracket,
            home_ownership: geminiData.homeOwnership || userData.home_ownership,
            city_tier: geminiData.cityTier || userData.city_tier,

            // Lifestyle
            primary_transport: geminiData.transport || geminiData.primaryTransport || userData.primary_transport,
            diet_preference: geminiData.dietPreference || userData.diet_preference,
            favorite_cuisine: geminiData.favoriteCuisine || userData.favorite_cuisine,
            coffee_or_tea: geminiData.coffeeOrTeaChoice || geminiData.coffeeOrTea || userData.coffee_or_tea,
            fitness_routine: geminiData.fitnessRoutine || userData.fitness_routine,
            gym_member: safeBool(geminiData.gymMembership ?? userData.gym_member),

            shopping_preference: geminiData.shoppingPreference || userData.shopping_preference,
            preferred_grocery_store_type: geminiData.groceryStoreType || userData.preferred_grocery_store_type,
            fashion_style: geminiData.fashionStyle || userData.fashion_style,

            // Tech
            tech_affinity: geminiData.techAffinity || userData.tech_affinity,
            primary_device: geminiData.primaryDevice || userData.primary_device,
            favorite_social_platform: geminiData.favoriteSocialPlatform || userData.favorite_social_platform,
            daily_social_time_minutes: (geminiData.socialMediaUsageTime || userData.daily_social_time_minutes)?.toString(),
            content_preference: geminiData.contentPreference || userData.content_preference,

            // Interests
            sports_interest: geminiData.sportsInterest || userData.sports_interest,
            gamer: safeBool(geminiData.gamer ?? (geminiData.gamingPreference?.toLowerCase().includes('yes'))),
            travel_frequency: geminiData.travelFrequency || userData.travel_frequency,
            eco_friendly: safeBool(geminiData.ecoFriendly ?? (geminiData.ecoFriendliness?.toLowerCase().includes('high'))),
            sleep_chronotype: geminiData.sleepChronotype || userData.sleep_chronotype,

            // Needs/Wants/Desires (Flattened)
            need_1: needs[0] || userData.need_1,
            need_2: needs[1] || userData.need_2,
            need_3: needs[2] || userData.need_3,
            want_1: wants[0] || userData.want_1,
            want_2: wants[1] || userData.want_2,
            want_3: wants[2] || userData.want_3,
            desire_1: desires[0] || userData.desire_1,
            desire_2: desires[1] || userData.desire_2,
            desire_3: desires[2] || userData.desire_3,

            // Intents
            intent_24h_category: intent24.category,
            intent_24h_budget_usd: safeInt(intent24.budget),
            intent_24h_time_window: intent24.timeWindow,
            intent_24h_confidence: safeFloat(intent24.confidence),

            intent_48h_category: intent48.category,
            intent_48h_budget_usd: safeInt(intent48.budget),
            intent_48h_time_window: intent48.timeWindow,
            intent_48h_confidence: safeFloat(intent48.confidence),

            intent_72h_category: intent72.category,
            intent_72h_budget_usd: safeInt(intent72.budget),
            intent_72h_time_window: intent72.timeWindow,
            intent_72h_confidence: safeFloat(intent72.confidence),

            profile_updated_utc: new Date().toISOString()
        };

        // 5. Merge with existing row (if any) by user_id, then upsert by user_id.
        // This keeps user_id stable and avoids destructive email-based cleanup.
        const { data: existingByUserId } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('user_id', finalUserId)
            .maybeSingle();

        const consolidatedData = { ...profileData };
        if (existingByUserId) {
            Object.keys(existingByUserId).forEach(key => {
                if (existingByUserId[key] !== null && consolidatedData[key] === null) {
                    consolidatedData[key] = existingByUserId[key];
                }
            });
        }

        const { data: upserted, error } = await supabase
            .from('user_profiles')
            .upsert([consolidatedData], { onConflict: 'user_id' })
            .select();

        if (error) {
            console.error("Supabase upsert error:", error);
            return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: "Profile saved successfully",
            userId: finalUserId
        });

    } catch (error) {
        console.error("Profile save exception:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}