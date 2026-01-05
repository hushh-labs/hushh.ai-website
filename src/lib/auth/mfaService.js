import config from '../config/config';

/**
 * MFA Service for Supabase TOTP Authentication
 * Provides complete Multi-Factor Authentication functionality
 */

/**
 * Enrolls a new MFA factor for the current user
 * @returns {Promise<{data: {id: string, totp: {qr_code: string, secret: string, uri: string}}, error: any}>}
 */
export const enrollMFA = async () => {
    try {
        const { data, error } = await config.supabaseClient.auth.mfa.enroll({
            factorType: 'totp',
            friendlyName: 'Authenticator App',
        });

        if (error) {
            console.error('MFA enrollment error:', error);
            return { data: null, error };
        }

        return { data, error: null };
    } catch (error) {
        console.error('MFA enrollment exception:', error);
        return { data: null, error };
    }
};

/**
 * Verifies the MFA enrollment with the user's first OTP code
 * @param {string} factorId - The factor ID from enrollment
 * @param {string} code - The 6-digit OTP code from authenticator app
 * @returns {Promise<{data: any, error: any}>}
 */
export const verifyMFAEnrollment = async (factorId, code) => {
    try {
        const { data, error } = await config.supabaseClient.auth.mfa.challenge({
            factorId,
        });

        if (error) {
            console.error('MFA challenge error:', error);
            return { data: null, error };
        }

        const challengeId = data.id;

        const { data: verifyData, error: verifyError } = await config.supabaseClient.auth.mfa.verify({
            factorId,
            challengeId,
            code,
        });

        if (verifyError) {
            console.error('MFA verification error:', verifyError);
            return { data: null, error: verifyError };
        }

        return { data: verifyData, error: null };
    } catch (error) {
        console.error('MFA verification exception:', error);
        return { data: null, error };
    }
};

/**
 * Creates an MFA challenge for sign-in verification
 * @param {string} factorId - The factor ID to challenge
 * @returns {Promise<{data: {id: string}, error: any}>}
 */
export const challengeMFA = async (factorId) => {
    try {
        const { data, error } = await config.supabaseClient.auth.mfa.challenge({
            factorId,
        });

        if (error) {
            console.error('MFA challenge error:', error);
            return { data: null, error };
        }

        return { data, error: null };
    } catch (error) {
        console.error('MFA challenge exception:', error);
        return { data: null, error };
    }
};

/**
 * Verifies an MFA challenge with the provided OTP code
 * @param {string} factorId - The factor ID
 * @param {string} challengeId - The challenge ID from challengeMFA
 * @param {string} code - The 6-digit OTP code
 * @returns {Promise<{data: any, error: any}>}
 */
export const verifyMFAChallenge = async (factorId, challengeId, code) => {
    try {
        const { data, error } = await config.supabaseClient.auth.mfa.verify({
            factorId,
            challengeId,
            code,
        });

        if (error) {
            console.error('MFA challenge verification error:', error);
            return { data: null, error };
        }

        return { data, error: null };
    } catch (error) {
        console.error('MFA challenge verification exception:', error);
        return { data: null, error };
    }
};

/**
 * Unenrolls an MFA factor
 * @param {string} factorId - The factor ID to unenroll
 * @returns {Promise<{data: any, error: any}>}
 */
export const unenrollMFA = async (factorId) => {
    try {
        const { data, error } = await config.supabaseClient.auth.mfa.unenroll({
            factorId,
        });

        if (error) {
            console.error('MFA unenroll error:', error);
            return { data: null, error };
        }

        return { data, error: null };
    } catch (error) {
        console.error('MFA unenroll exception:', error);
        return { data: null, error };
    }
};

/**
 * Gets all enrolled MFA factors for the current user
 * @returns {Promise<{data: Array, error: any}>}
 */
export const getMFAFactors = async () => {
    try {
        const { data, error } = await config.supabaseClient.auth.mfa.listFactors();

        if (error) {
            console.error('Get MFA factors error:', error);
            return { data: null, error };
        }

        return { data: data.all || [], error: null };
    } catch (error) {
        console.error('Get MFA factors exception:', error);
        return { data: null, error };
    }
};

/**
 * Gets the current authentication assurance level
 * @returns {Promise<{data: {currentLevel: string, nextLevel: string, currentAuthenticationMethods: Array}, error: any}>}
 */
export const getAssuranceLevel = async () => {
    try {
        const { data, error } = await config.supabaseClient.auth.mfa.getAuthenticatorAssuranceLevel();

        if (error) {
            console.error('Get assurance level error:', error);
            return { data: null, error };
        }

        return { data, error: null };
    } catch (error) {
        console.error('Get assurance level exception:', error);
        return { data: null, error };
    }
};

/**
 * Checks if the user has MFA enrolled
 * @returns {Promise<boolean>}
 */
export const hasMFAEnrolled = async () => {
    const { data, error } = await getMFAFactors();

    if (error || !data) {
        return false;
    }

    return data.length > 0;
};

/**
 * Gets the verified MFA factors (status: 'verified')
 * @returns {Promise<{data: Array, error: any}>}
 */
export const getVerifiedMFAFactors = async () => {
    const { data, error } = await getMFAFactors();

    if (error || !data) {
        return { data: [], error };
    }

    const verifiedFactors = data.filter(factor => factor.status === 'verified');
    return { data: verifiedFactors, error: null };
};

const mfaService = {
    enrollMFA,
    verifyMFAEnrollment,
    challengeMFA,
    verifyMFAChallenge,
    unenrollMFA,
    getMFAFactors,
    getAssuranceLevel,
    hasMFAEnrolled,
    getVerifiedMFAFactors,
};

export default mfaService;
