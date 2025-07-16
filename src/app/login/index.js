/**
 * Apple Sign-In Integration for Hushh Website
 * 
 * This module provides a complete Apple Sign-In implementation with Supabase
 * following Apple's guidelines and Supabase documentation.
 * 
 * @author Hushh Development Team
 * @version 1.0.0
 * @created January 2025
 */

// Configuration
export { default as appleAuthConfig } from './config/appleAuth.js';
export {
  createAppleAuthSupabaseClient,
  getRedirectUrl,
  generateNonce,
  hashNonce,
  validateAppleAuthConfig,
  appleSignInButtonConfig
} from './config/appleAuth.js';

// Service
export { default as appleAuthService } from './services/appleAuthService.js';
export { AppleAuthService } from './services/appleAuthService.js';

// Components
export { default as AppleSignInButton } from './components/AppleSignInButton.jsx';

// Constants and utilities
export const APPLE_AUTH_CONSTANTS = {
  PROVIDER: 'apple',
  SCOPES: ['name', 'email'],
  RESPONSE_TYPE: 'code id_token',
  RESPONSE_MODE: 'form_post'
};

export const APPLE_AUTH_ROUTES = {
  LOGIN: '/login',
  CALLBACK: '/login/callback',
  ERROR: '/login/error'
};

/**
 * Quick setup function for Apple authentication
 * @returns {Object} Apple auth service instance and configuration
 */
export const setupAppleAuth = () => {
  return {
    service: appleAuthService,
    config: appleAuthConfig,
    isConfigured: validateAppleAuthConfig()
  };
};

/**
 * Utility to check if Apple Sign-In is available
 * @returns {boolean} Whether Apple Sign-In is properly configured
 */
export const isAppleSignInAvailable = () => {
  try {
    return validateAppleAuthConfig() && typeof window !== 'undefined';
  } catch (error) {
    console.warn('Apple Sign-In availability check failed:', error);
    return false;
  }
};

// Default export for convenience
export default {
  service: appleAuthService,
  config: appleAuthConfig,
  AppleSignInButton,
  constants: APPLE_AUTH_CONSTANTS,
  routes: APPLE_AUTH_ROUTES,
  setup: setupAppleAuth,
  isAvailable: isAppleSignInAvailable
}; 