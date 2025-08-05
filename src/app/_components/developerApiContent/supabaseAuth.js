"use client";
import { createClient } from "@supabase/supabase-js";

// Developer API Supabase Configuration
// Note: Environment variables should be prefixed with NEXT_PUBLIC_ for client-side access
const devApiSupabaseConfig = {
  SUPABASE_URL: typeof window !== 'undefined' && window.location.hostname === 'localhost' 
    ? "https://rpmzykoxqnbozgdoqbpc.supabase.co" 
    : "https://rpmzykoxqnbozgdoqbpc.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwbXp5a294cW5ib3pnZG9xYnBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE1MTQyMzIsImV4cCI6MjA0NzA5MDIzMn0.wCJOe3JrTv4jJ5FCYcwJWV8WEMdyZLx5DopY6x8lZts",
  redirectUrl: typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? "http://localhost:3000/developer-Api/on-boarding"
    : "https://hushh.ai/developer-Api/on-boarding"
};

// Create Supabase client for Developer API
function createDevApiSupabaseClient() {
  const supabase = createClient(
    devApiSupabaseConfig.SUPABASE_URL, 
    devApiSupabaseConfig.SUPABASE_ANON_KEY,
    {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        flowType: 'pkce'
      }
    }
  );
  return supabase;
}

const devApiSupabase = createDevApiSupabaseClient();

// Google Sign-In Function
export const signInWithGoogle = async () => {
  try {
    console.log('Initiating Google Sign-In with config:', {
      url: devApiSupabaseConfig.SUPABASE_URL,
      redirectTo: devApiSupabaseConfig.redirectUrl
    });

    const { data, error } = await devApiSupabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: devApiSupabaseConfig.redirectUrl,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        scopes: 'email profile'
      },
    });

    if (error) {
      console.error('Google Sign-In Error:', error);
      throw error;
    }

    console.log('Google Sign-In initiated successfully:', data);
    return { data, error: null };
  } catch (error) {
    console.error('Unexpected error during Google Sign-In:', error);
    return { data: null, error };
  }
};

// Sign Out Function
export const signOut = async () => {
  try {
    const { error } = await devApiSupabase.auth.signOut();
    if (error) {
      console.error('Sign Out Error:', error);
      throw error;
    }
    return { error: null };
  } catch (error) {
    console.error('Unexpected error during sign out:', error);
    return { error };
  }
};

// Get Current Session
export const getCurrentSession = async () => {
  try {
    const { data: { session }, error } = await devApiSupabase.auth.getSession();
    if (error) {
      console.error('Get Session Error:', error);
      throw error;
    }
    return { session, error: null };
  } catch (error) {
    console.error('Unexpected error getting session:', error);
    return { session: null, error };
  }
};

// Get Current User
export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await devApiSupabase.auth.getUser();
    if (error) {
      console.error('Get User Error:', error);
      throw error;
    }
    return { user, error: null };
  } catch (error) {
    console.error('Unexpected error getting user:', error);
    return { user: null, error };
  }
};

// Listen to Auth Changes
export const onAuthStateChange = (callback) => {
  return devApiSupabase.auth.onAuthStateChange(callback);
};

export { devApiSupabase };
export default devApiSupabase;