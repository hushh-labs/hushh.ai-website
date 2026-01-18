"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import authConfig from '../../lib/config/authConfig';
import authentication from '../../lib/auth/authentication';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // MFA States
  const [mfaRequired, setMfaRequired] = useState(false);
  const [mfaEnrollmentNeeded, setMfaEnrollmentNeeded] = useState(false);
  const [currentFactorId, setCurrentFactorId] = useState(null);
  const [currentChallengeId, setCurrentChallengeId] = useState(null);
  const [mfaFactors, setMfaFactors] = useState([]);
  const [checkingMFA, setCheckingMFA] = useState(false); // Prevents redirect during MFA check

  // Check MFA status for the current user
  const checkMFAStatus = async () => {
    setCheckingMFA(true);
    console.log('🔐 Checking MFA status...');

    try {
      const { data: factors, error } = await authentication.mfa.getMFAFactors();

      if (error) {
        console.error('Error checking MFA status:', error);
        setCheckingMFA(false);
        return;
      }

      console.log('📋 MFA Factors:', factors);
      setMfaFactors(factors || []);

      // Check if user has verified MFA factors
      const verifiedFactors = factors?.filter(f => f.status === 'verified') || [];

      if (verifiedFactors.length === 0) {
        // No MFA enrolled - mandatory enrollment
        console.log('⚠️ No MFA enrolled - showing enrollment modal');
        setMfaEnrollmentNeeded(true);
        setMfaRequired(false);
      } else {
        // MFA enrolled - check assurance level
        const { data: assurance } = await authentication.mfa.getAssuranceLevel();
        console.log('🔒 Assurance Level:', assurance);

        if (assurance?.currentLevel === 'aal1' && assurance?.nextLevel === 'aal2') {
          // User has MFA but hasn't verified this session - create challenge
          console.log('🔑 Creating MFA challenge...');
          const factor = verifiedFactors[0];
          const { data: challenge, error: challengeError } = await authentication.mfa.challengeMFA(factor.id);

          if (!challengeError && challenge) {
            console.log('✅ Challenge created - showing verification modal');
            setCurrentFactorId(factor.id);
            setCurrentChallengeId(challenge.id);
            setMfaRequired(true);
            setMfaEnrollmentNeeded(false);
          }
        } else {
          // Already verified for this session
          console.log('✅ MFA already verified for this session');
          setMfaRequired(false);
          setMfaEnrollmentNeeded(false);
        }
      }
    } catch (error) {
      console.error('MFA status check exception:', error);
    } finally {
      setCheckingMFA(false);
    }
  };

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await authConfig.supabaseClient.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);

        // Check MFA status if user is authenticated
        if (session?.user) {
          await checkMFAStatus();
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = authConfig.supabaseClient.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.email);

        setSession(session);
        setUser(session?.user ?? null);

        // Handle MFA based on auth events
        if (event === 'SIGNED_IN' && session?.user) {
          // User just signed in - check MFA status
          await checkMFAStatus();
        } else if (event === 'SIGNED_OUT') {
          // Reset MFA states on sign out
          setMfaRequired(false);
          setMfaEnrollmentNeeded(false);
          setCurrentFactorId(null);
          setCurrentChallengeId(null);
          setMfaFactors([]);
        } else if (event === 'MFA_CHALLENGE_VERIFIED') {
          // MFA verified successfully
          setMfaRequired(false);
          setMfaEnrollmentNeeded(false);
        }

        setLoading(false);
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  const signIn = async (callback) => {
    return await authentication.googleSignIn(callback);
  };

  const signOut = async () => {
    const result = await authentication.signOut();
    if (!result.error) {
      setSession(null);
      setUser(null);
      setMfaRequired(false);
      setMfaEnrollmentNeeded(false);
      setCurrentFactorId(null);
      setCurrentChallengeId(null);
      setMfaFactors([]);
    }
    return result;
  };

  const completeMFAEnrollment = async () => {
    setMfaEnrollmentNeeded(false);
    await checkMFAStatus();
  };

  const completeMFAVerification = async () => {
    setMfaRequired(false);
    setCurrentFactorId(null);
    setCurrentChallengeId(null);
    // Refresh session to get updated assurance level
    await authConfig.supabaseClient.auth.refreshSession();
  };

  const refreshMFAStatus = async () => {
    await checkMFAStatus();
  };

  const value = {
    session,
    user,
    loading,
    signIn,
    signOut,
    isAuthenticated: !!session,

    // MFA properties
    mfaRequired,
    mfaEnrollmentNeeded,
    currentFactorId,
    currentChallengeId,
    mfaFactors,
    checkingMFA, // Add this to prevent redirects during MFA check

    // MFA functions
    completeMFAEnrollment,
    completeMFAVerification,
    refreshMFAStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 
