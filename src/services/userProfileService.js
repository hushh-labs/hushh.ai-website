import config from '../lib/config/config';

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
            // Search by both user_id (UUID) and hushh_id (formatted string)
            const { data, error } = await config.supabaseClient
                .from('user_profiles')
                .select('*')
                .or(`user_id.eq.${userId},hushh_id.eq.${userId}`)
                .single();

            if (error) {
                console.error('Error fetching user profile:', error);
                return null;
            }

            return data;
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
