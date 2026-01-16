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

        const profileAgentData = getAgentData('hushh-profile');
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

        // 1. Resolve User ID (Check if email exists to prevent duplicates)
        let finalUserId = userData.userId; // Try from request first
        if (!finalUserId) {
            // Check DB for existing email
            const { data: existingUser } = await supabase
                .from('user_profiles')
                .select('user_id')
                .eq('email', userData.email)
                .single();

            if (existingUser) {
                finalUserId = existingUser.user_id;
            } else {
                // Generate new ID if not found
                finalUserId = `hushh_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
            }
        }

        // 2. Map Flattened Needs/Wants/Desires
        const needs = Array.isArray(geminiData.needs) ? geminiData.needs : [];
        const wants = Array.isArray(geminiData.wants) ? geminiData.wants : [];
        const desires = Array.isArray(geminiData.desires) ? geminiData.desires : [];

        // 3. Map Intents (handling potentially different AI output structures)
        const intents = geminiData.intents || {};
        // Helper to get intent fields safely
        const getIntent = (period) => {
            // Support array structure or object key structure
            if (Array.isArray(intents)) {
                return intents.find(i => i.period === period) || {};
            }
            return intents[period] || intents[`${period}h`] || {};
        };

        const intent24 = getIntent('24');
        const intent48 = getIntent('48');
        const intent72 = getIntent('72');


        // 4. Construct Exact Schema Object
        const profileData = {
            user_id: finalUserId,
            full_name: userData.fullName,
            email: userData.email,
            phone: `${userData.countryCode} ${userData.phoneNumber}`.trim(),

            // Address
            address_line1: geminiData.address?.street || publicData.address?.street || userData.address,
            city: geminiData.address?.city || publicData.address?.city || userData.city,
            state: geminiData.address?.state || publicData.address?.state,
            zip: safeInt(geminiData.address?.zipCode || publicData.address?.zipCode),

            // Demographics
            age: safeInt(geminiData.age),
            gender: geminiData.gender,
            marital_status: geminiData.maritalStatus,
            household_size: safeInt(geminiData.householdSize),
            children_count: geminiData.childrenCount?.toString(), // Schema says text

            // Professional
            education_level: geminiData.educationLevel,
            occupation: geminiData.occupation,
            income_bracket: geminiData.incomeBracket,
            home_ownership: geminiData.homeOwnership,
            city_tier: geminiData.cityTier,

            // Lifestyle
            primary_transport: geminiData.transport || geminiData.primaryTransport,
            diet_preference: geminiData.dietPreference,
            favorite_cuisine: geminiData.favoriteCuisine,
            coffee_or_tea: geminiData.coffeeOrTeaChoice || geminiData.coffeeOrTea,
            fitness_routine: geminiData.fitnessRoutine,
            gym_member: safeBool(geminiData.gymMembership),

            shopping_preference: geminiData.shoppingPreference,
            preferred_grocery_store_type: geminiData.groceryStoreType,
            fashion_style: geminiData.fashionStyle,

            // Tech
            tech_affinity: geminiData.techAffinity,
            primary_device: geminiData.primaryDevice,
            favorite_social_platform: geminiData.favoriteSocialPlatform,
            daily_social_time_minutes: geminiData.socialMediaUsageTime, // Schema says text? or int. Schema said text.
            content_preference: geminiData.contentPreference,

            // Interests
            sports_interest: geminiData.sportsInterest,
            gamer: safeBool(geminiData.gamingPreference?.toLowerCase().includes('yes') || geminiData.gamer),
            travel_frequency: geminiData.travelFrequency,
            eco_friendly: safeBool(geminiData.ecoFriendliness?.toLowerCase().includes('high') || geminiData.ecoFriendly),
            sleep_chronotype: geminiData.sleepChronotype,

            // Flattened Arrays
            need_1: needs[0] || null,
            need_2: needs[1] || null,
            need_3: needs[2] || null,

            want_1: wants[0] || null,
            want_2: wants[1] || null,
            want_3: wants[2] || null,

            desire_1: desires[0] || null,
            desire_2: desires[1] || null,
            desire_3: desires[2] || null,

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
            // profile_created_utc is default now(), so we don't need to send it unless verifying insert
        };

        // Upsert using user_id as PK
        const { data, error } = await supabase
            .from('user_profiles')
            .upsert(profileData, { onConflict: 'user_id' })
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
