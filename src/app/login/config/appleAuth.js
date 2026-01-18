import { createClient } from '@supabase/supabase-js';
import { SUPABASE_AUTH_ANON_KEY, SUPABASE_AUTH_URL } from '../../../lib/config/supabaseAuthEnv';

// Apple Sign-In Configuration for Supabase
const appleAuthConfig = {
  // Apple Developer Account Configuration
  APPLE_CLIENT_ID: "com.hushh.auth.web",
  APPLE_TEAM_ID: "WVDK9JW99C",
  APPLE_KEY_ID: "358S6P5WC3",
  APPLE_PRIVATE_KEY: "-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgTiGn4rnvx4Yj9U053NKQngYpkA0XBzhu0Lp84vaelHagCgYIKoZIzj0DAQehRANCAAQhw93yeOtRHhd4ujcrwtqiVIGpH/m3k63q9NEMBCIlbXlp3ZJoW7qJSfJSUhxqcDiAs6f5lxqkwEw5FDukx+h+\n-----END PRIVATE KEY-----",
  
  // Supabase Configuration
  SUPABASE_URL: SUPABASE_AUTH_URL,
  SUPABASE_ANON_KEY: SUPABASE_AUTH_ANON_KEY,
  
  // Redirect URLs Configuration
  redirectUrls: {
    development: "http://localhost:3000/login/callback",
    staging: "https://hushh.ai/login/callback", 
    production: "https://hushh.ai/login/callback"
  },
  
  // Apple Sign-In Scope Configuration
  scope: "name email",
  
  // Apple Sign-In Response Type
  responseType: "code id_token",
  
  // Response Mode
  responseMode: "form_post"
};

// Initialize Supabase Client for Apple Auth
function createAppleAuthSupabaseClient() {
  return createClient(appleAuthConfig.SUPABASE_URL, appleAuthConfig.SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false, // We'll handle this manually for Apple Sign-In
      flowType: 'pkce' // Use PKCE flow for better security
    }
  });
}

// Get Current Environment Redirect URL
function getRedirectUrl() {
  const environment = process.env.NODE_ENV || 'development';
  return appleAuthConfig.redirectUrls[environment] || appleAuthConfig.redirectUrls.development;
}

// Apple Sign-In Nonce Generation (for security)
function generateNonce() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

// Hash Nonce for Apple (SHA-256)
async function hashNonce(nonce) {
  const encoder = new TextEncoder();
  const data = encoder.encode(nonce);
  const hash = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hash));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Validate Apple Auth Configuration
function validateAppleAuthConfig() {
  const requiredEnvVars = [
    'APPLE_CLIENT_ID',
    'APPLE_TEAM_ID', 
    'APPLE_KEY_ID',
    'APPLE_PRIVATE_KEY'
  ];
  
  const missing = requiredEnvVars.filter(envVar => !appleAuthConfig[envVar]);
  
  if (missing.length > 0) {
    console.warn('Missing Apple Auth environment variables:', missing);
    return false;
  }
  
  return true;
}

// Apple Sign-In Button Configuration
const appleSignInButtonConfig = {
  color: "black",
  border: false,
  type: "sign-in",
  borderRadius: 15,
  className: "apple-signin-button"
};

export {
  appleAuthConfig,
  createAppleAuthSupabaseClient,
  getRedirectUrl,
  generateNonce,
  hashNonce,
  validateAppleAuthConfig,
  appleSignInButtonConfig
};

export default appleAuthConfig; 
