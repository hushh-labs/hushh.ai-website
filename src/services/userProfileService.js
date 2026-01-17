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
            const normalizedId = extractUuid(rawId) || rawId;
            const supabase = config.supabaseClient;
            if (!supabase) return null;

            // Prefer UUID lookups for public profile access
            const { data: byUserId, error: userIdError } = await supabase
                .from('user_profiles')
                .select('*')
                .eq('user_id', normalizedId)
                .maybeSingle();

            if (userIdError) {
                console.error('Error fetching user profile by user_id:', userIdError);
            }

            if (byUserId) return byUserId;

            // Fallback for legacy hushh_id links
            const { data: byHushhId, error: hushhIdError } = await supabase
                .from('user_profiles')
                .select('*')
                .eq('hushh_id', rawId)
                .maybeSingle();

            if (hushhIdError) {
                console.error('Error fetching user profile by hushh_id:', hushhIdError);
            }

            return byHushhId || null;
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
