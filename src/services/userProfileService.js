import config from '../lib/config/config';
import { extractUuid } from '../lib/utils';

/**
 * Service to handle User Profile data fetching and operations.
 */
export const UserProfileService = {
    /**
     * Fetches a user profile by their user_id string (e.g., 'test_user_001' or 'sundar_pichai').
     * @param {string} userId - The unique user_id to search for.
     * @returns {Promise<Object|null>} The user profile object or null if not found.
     */
    async getUserProfile(userId) {
        if (!userId) return null;

        try {
            const rawId = String(userId).trim();
            const normalizedId = extractUuid(rawId);
            const normalizedLower = rawId.toLowerCase();
            const supabase = config.supabaseClient;
            if (!supabase) return null;

            const isValuePresent = (value) =>
                value !== null && value !== undefined && value !== '' && value !== 'Not available' && value !== 'N/A';
            const countDataPoints = (data) =>
                Object.values(data || {}).filter(isValuePresent).length;
            const mergeProfiles = (base, source) => {
                const merged = { ...(base || {}) };
                Object.keys(source || {}).forEach((key) => {
                    if (!isValuePresent(merged[key]) && isValuePresent(source[key])) {
                        merged[key] = source[key];
                    }
                });
                return merged;
            };
            const pickBestProfile = (profiles) => {
                if (!profiles.length) return null;
                let best = profiles[0];
                let bestScore = countDataPoints(best);
                profiles.forEach((profile) => {
                    const score = countDataPoints(profile);
                    if (score > bestScore) {
                        best = profile;
                        bestScore = score;
                    }
                });
                return profiles.reduce((acc, profile) => mergeProfiles(acc, profile), best);
            };
            const candidates = [];
            const addCandidate = (data) => {
                if (data) candidates.push(data);
            };

            // Prefer UUID lookups for public profile access
            if (normalizedId) {
                const { data: byUserId, error: userIdError } = await supabase
                    .from('user_profiles')
                    .select('*')
                    .eq('user_id', normalizedId)
                    .maybeSingle();

                if (userIdError) {
                    console.error('Error fetching user profile by user_id:', userIdError);
                }

                addCandidate(byUserId);
            }

            // Fallback for legacy hushh_id links
            const hushhIds = new Set();
            if (!normalizedId && rawId) hushhIds.add(rawId);
            if (normalizedLower && normalizedLower !== rawId) hushhIds.add(normalizedLower);
            candidates.forEach((profile) => {
                if (profile?.hushh_id) hushhIds.add(profile.hushh_id);
            });

            for (const hushhId of hushhIds) {
                const { data: byHushhId, error: hushhIdError } = await supabase
                    .from('user_profiles')
                    .select('*')
                    .eq('hushh_id', hushhId)
                    .maybeSingle();

                if (hushhIdError) {
                    console.error('Error fetching user profile by hushh_id:', hushhIdError);
                }

                addCandidate(byHushhId);
            }

            const phoneDigitsSet = new Set();
            if (rawId.includes('/')) {
                const parts = rawId.split('/');
                const phonePart = parts[parts.length - 1] || '';
                const digits = phonePart.replace(/\D/g, '');
                const localDigits = digits.length > 10 ? digits.slice(-10) : digits;
                if (localDigits.length >= 7) phoneDigitsSet.add(localDigits);
            }
            candidates.forEach((profile) => {
                const phoneValue = profile?.phone || profile?.phone_number || '';
                const digits = String(phoneValue).replace(/\D/g, '');
                const localDigits = digits.length > 10 ? digits.slice(-10) : digits;
                if (localDigits.length >= 7) phoneDigitsSet.add(localDigits);
            });

            for (const localDigits of phoneDigitsSet) {
                const { data: byPhone, error: phoneError } = await supabase
                    .from('user_profiles')
                    .select('*')
                    .ilike('phone', `%${localDigits}`)
                    .order('profile_created_utc', { ascending: false })
                    .limit(1)
                    .maybeSingle();

                if (phoneError) {
                    console.error('Error fetching user profile by phone digits:', phoneError);
                }

                addCandidate(byPhone);
            }

            return pickBestProfile(candidates);
        } catch (err) {
            console.error('Unexpected error in getUserProfile:', err);
            return null;
        }
    },

    /**
     * Optional: Fetch by internal numeric ID if needed.
     * @param {number} id 
     */
    async getUserProfileById(id) {
        try {
            const { data, error } = await config.supabaseClient
                .from('user_profiles')
                .select('*')
                .eq('id', id)
                .single();

            if (error) return null;
            return data;
        } catch (err) {
            return null;
        }
    }
};
