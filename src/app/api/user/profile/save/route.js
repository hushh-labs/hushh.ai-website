import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { SUPABASE_URL } from '../../../../../lib/config/supabaseEnv';

const supabaseUrl = SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request) {
    try {
        const body = await request.json();
        const { userData, agentResults, aggregatedData } = body;

        const pick = (...values) => values.find((value) => value !== undefined && value !== null && value !== '');

        const normalizeAgentPayload = (payload) => {
            if (!payload || typeof payload !== 'object') return {};
            if (payload.userProfile && typeof payload.userProfile === 'object') return payload.userProfile;
            if (payload.profile && typeof payload.profile === 'object') return payload.profile;
            if (payload.data && typeof payload.data === 'object' && !Array.isArray(payload.data)) return payload.data;
            return payload;
        };

        const parseAgentJson = (text) => {
            if (typeof text !== 'string') return null;
            const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            const jsonMatch = cleaned.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
            const jsonStr = jsonMatch ? jsonMatch[0] : cleaned;
            try {
                return JSON.parse(jsonStr);
            } catch (e) {
                return null;
            }
        };

        // Extract AI data
        const getAgentData = (agentName) => {
            const result = agentResults?.[agentName];
            if (!result?.data) return {};

            const payload = result.data;
            const text = payload?.result?.status?.message?.parts?.[0]?.text ||
                payload?.result?.message?.parts?.[0]?.text ||
                payload?.result?.response?.parts?.[0]?.text ||
                payload?.result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
                payload?.result?.output?.[0]?.content?.[0]?.text ||
                payload?.result?.output ||
                payload?.output ||
                (typeof payload === 'string' ? payload : '');

            if (typeof text === 'string' && text.trim()) {
                const parsed = parseAgentJson(text);
                return normalizeAgentPayload(parsed || {});
            }

            if (text && typeof text === 'object') {
                return normalizeAgentPayload(text);
            }

            if (payload && typeof payload === 'object') {
                return normalizeAgentPayload(payload);
            }

            return {};
        };

        // IMPORTANT:
        // We must NOT generate or mutate Supabase-auth identity ourselves.
        // The persistent UUID must come from the Supabase profile-creation agent/API only.
        const profileAgentData = getAgentData('supabase-profile-creation-agent');
        const geminiAgentData = getAgentData('gemini');
        const publicAgentData = getAgentData('public');
        const aggregatedProfile = aggregatedData && typeof aggregatedData === 'object' ? aggregatedData : {};

        // Merge strategies: Profile Agent > Gemini > Public
        // We use a consolidated object for the mapping below
        const geminiData = {
            ...publicAgentData,
            ...geminiAgentData,
            ...aggregatedProfile,
            ...profileAgentData // Profile agent overwrites others as it is the "synthesizer"
        };

        // Ensure nested objects (like address) are merged, not just overwritten if partial
        const mergedAddress = {
            ...(publicAgentData.address || {}),
            ...(geminiAgentData.address || {}),
            ...(aggregatedProfile.address || {}),
            ...(profileAgentData.address || {})
        };
        if (Object.keys(mergedAddress).length) {
            geminiData.address = mergedAddress;
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
            // Sanitize phone number to remove spaces and special chars for the URL
            const cleanPhone = (userData.phoneNumber || '').replace(/\D/g, '');

            if (cleanPhone && cleanPhone.length > 6) {
                // Use name/phone format if we have a valid phone number
                finalHushhId = `${firstName}/${cleanPhone}`;
            } else {
                // Fallback to suffix if phone is not available/valid
                const suffix = finalUserId.includes('-') ? finalUserId.split('-').shift() : finalUserId.substr(-6);
                finalHushhId = `${firstName}/${suffix}`;
            }
        }

        // 2. Map Flattened Needs/Wants/Desires
        const needs = Array.isArray(geminiData.needs)
            ? geminiData.needs
            : [geminiData.need_1, geminiData.need_2, geminiData.need_3].filter(Boolean);
        const wants = Array.isArray(geminiData.wants)
            ? geminiData.wants
            : [geminiData.want_1, geminiData.want_2, geminiData.want_3].filter(Boolean);
        const desires = Array.isArray(geminiData.desires)
            ? geminiData.desires
            : [geminiData.desire_1, geminiData.desire_2, geminiData.desire_3].filter(Boolean);

        // 3. Map Intents
        const intents = geminiData.intents || {};
        const getIntent = (period) => {
            if (Array.isArray(intents)) {
                return intents.find((intent) => {
                    const timeFrame = intent.period || intent.time_frame || intent.timeFrame || intent.time_window || '';
                    return String(timeFrame).includes(period);
                }) || {};
            }
            return intents[period] || intents[`${period}h`] || {};
        };

        const normalizeIntent = (raw) => {
            if (!raw || typeof raw !== 'object') return {};
            return {
                category: raw.category,
                budget: raw.budget_usd ?? raw.budget ?? raw.budgetUsd,
                time_window: raw.time_window ?? raw.timeWindow,
                confidence: raw.confidence
            };
        };

        const intent24 = normalizeIntent(geminiData.intent_24h || geminiData.intent24 || getIntent('24'));
        const intent48 = normalizeIntent(geminiData.intent_48h || geminiData.intent48 || getIntent('48'));
        const intent72 = normalizeIntent(geminiData.intent_72h || geminiData.intent72 || getIntent('72'));

        // 4. Construct Profile Data for Upsert
        const address = geminiData.address && typeof geminiData.address === 'object' ? geminiData.address : {};

        const profileData = {
            user_id: finalUserId,
            hushh_id: finalHushhId, // Added hushh_id column
            full_name: pick(userData.fullName, userData.full_name, geminiData.full_name, geminiData.fullName),
            email: pick(userData.email, geminiData.email),
            phone: pick(
                `${userData.countryCode || ''} ${userData.phoneNumber || ''}`.trim(),
                userData.phone,
                geminiData.phone
            ),

            // Address
            address_line1: pick(
                address.street,
                address.address_line1,
                address.addressLine1,
                geminiData.address_line1,
                geminiData.street,
                userData.address,
                userData.address_line1
            ),
            city: pick(address.city, geminiData.city, userData.city),
            state: pick(address.state, geminiData.state, userData.state),
            zip: safeInt(pick(address.zip_code, address.zip, geminiData.zip_code, geminiData.zip, userData.zip, userData.zip_code)),

            // Demographics
            age: safeInt(pick(geminiData.age, userData.age)),
            gender: pick(geminiData.gender, userData.gender),
            marital_status: pick(geminiData.marital_status, geminiData.maritalStatus, userData.marital_status, userData.maritalStatus),
            household_size: safeInt(pick(geminiData.household_size, geminiData.householdSize, userData.household_size)),
            children_count: pick(geminiData.children_count, geminiData.childrenCount, userData.children_count)?.toString(),

            // Professional
            education_level: pick(geminiData.education_level, geminiData.educationLevel, userData.education_level),
            occupation: pick(geminiData.occupation, userData.occupation),
            income_bracket: pick(geminiData.income_bracket, geminiData.incomeBracket, userData.income_bracket),
            home_ownership: pick(geminiData.home_ownership, geminiData.homeOwnership, userData.home_ownership),
            city_tier: pick(geminiData.city_tier, geminiData.cityTier, userData.city_tier),

            // Lifestyle
            primary_transport: pick(geminiData.primary_transport, geminiData.primaryTransport, geminiData.transport, userData.primary_transport),
            diet_preference: pick(geminiData.diet_preference, geminiData.dietPreference, userData.diet_preference),
            favorite_cuisine: pick(geminiData.favorite_cuisine, geminiData.favoriteCuisine, userData.favorite_cuisine),
            coffee_or_tea: pick(
                geminiData.coffee_or_tea,
                geminiData.coffee_or_tea_choice,
                geminiData.coffeeOrTeaChoice,
                geminiData.coffeeOrTea,
                userData.coffee_or_tea,
                userData.coffee_or_tea_choice
            ),
            fitness_routine: pick(geminiData.fitness_routine, geminiData.fitnessRoutine, userData.fitness_routine),
            gym_member: safeBool(pick(geminiData.gym_member, geminiData.gym_membership, geminiData.gymMembership, userData.gym_member)),

            shopping_preference: pick(geminiData.shopping_preference, geminiData.shoppingPreference, userData.shopping_preference),
            preferred_grocery_store_type: pick(
                geminiData.preferred_grocery_store_type,
                geminiData.grocery_store_type,
                geminiData.groceryStoreType,
                userData.preferred_grocery_store_type
            ),
            fashion_style: pick(geminiData.fashion_style, geminiData.fashionStyle, userData.fashion_style),

            // Tech
            tech_affinity: pick(geminiData.tech_affinity, geminiData.techAffinity, userData.tech_affinity),
            primary_device: pick(geminiData.primary_device, geminiData.primaryDevice, userData.primary_device),
            favorite_social_platform: pick(
                geminiData.favorite_social_platform,
                geminiData.favoriteSocialPlatform,
                geminiData.social_media,
                userData.favorite_social_platform
            ),
            daily_social_time_minutes: pick(
                geminiData.daily_social_time_minutes,
                geminiData.social_media_usage_time,
                geminiData.socialMediaUsageTime,
                userData.daily_social_time_minutes
            )?.toString(),
            content_preference: pick(geminiData.content_preference, geminiData.contentPreference, userData.content_preference),

            // Interests
            sports_interest: pick(geminiData.sports_interest, geminiData.sportsInterest, userData.sports_interest),
            gamer: safeBool(pick(geminiData.gamer, geminiData.gaming_preference, geminiData.gamingPreference, userData.gamer)),
            travel_frequency: pick(geminiData.travel_frequency, geminiData.travelFrequency, userData.travel_frequency),
            eco_friendly: safeBool(pick(geminiData.eco_friendly, geminiData.eco_friendliness, geminiData.ecoFriendliness, userData.eco_friendly)),
            sleep_chronotype: pick(geminiData.sleep_chronotype, geminiData.sleepChronotype, userData.sleep_chronotype),

            // Needs/Wants/Desires (Flattened)
            need_1: pick(needs[0], userData.need_1),
            need_2: pick(needs[1], userData.need_2),
            need_3: pick(needs[2], userData.need_3),
            want_1: pick(wants[0], userData.want_1),
            want_2: pick(wants[1], userData.want_2),
            want_3: pick(wants[2], userData.want_3),
            desire_1: pick(desires[0], userData.desire_1),
            desire_2: pick(desires[1], userData.desire_2),
            desire_3: pick(desires[2], userData.desire_3),

            // Intents
            intent_24h_category: pick(geminiData.intent_24h_category, intent24.category),
            intent_24h_budget_usd: safeInt(pick(geminiData.intent_24h_budget_usd, geminiData.intent_24h_budget, intent24.budget)),
            intent_24h_time_window: pick(geminiData.intent_24h_time_window, intent24.time_window),
            intent_24h_confidence: safeFloat(pick(geminiData.intent_24h_confidence, intent24.confidence)),

            intent_48h_category: pick(geminiData.intent_48h_category, intent48.category),
            intent_48h_budget_usd: safeInt(pick(geminiData.intent_48h_budget_usd, geminiData.intent_48h_budget, intent48.budget)),
            intent_48h_time_window: pick(geminiData.intent_48h_time_window, intent48.time_window),
            intent_48h_confidence: safeFloat(pick(geminiData.intent_48h_confidence, intent48.confidence)),

            intent_72h_category: pick(geminiData.intent_72h_category, intent72.category),
            intent_72h_budget_usd: safeInt(pick(geminiData.intent_72h_budget_usd, geminiData.intent_72h_budget, intent72.budget)),
            intent_72h_time_window: pick(geminiData.intent_72h_time_window, intent72.time_window),
            intent_72h_confidence: safeFloat(pick(geminiData.intent_72h_confidence, intent72.confidence)),

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
