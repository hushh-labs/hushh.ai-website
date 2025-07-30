import config from '../config/config';

export default async function googleSignIn(callback, customRedirectPath) {
  try {
    console.log('Starting Google Sign-In process...');
    
    // Determine redirect URL based on context
    let redirectPath = '/user-registration'; // Default fallback
    
    if (customRedirectPath) {
      // Use custom redirect if provided
      redirectPath = customRedirectPath;
    } else if (typeof window !== 'undefined') {
      // Auto-detect current page
      const currentPath = window.location.pathname;
      
      if (currentPath.includes('/developer-Api/on-boarding')) {
        redirectPath = '/developer-Api/on-boarding';
      } else if (currentPath.includes('/login')) {
        redirectPath = '/login';
      }
      // Add more path detections as needed
    }
    
    const redirectTo = window.location.origin + redirectPath;
    console.log('Redirecting to:', redirectTo);
    
    if (!config.supabaseClient) {
      console.error('Supabase client is not initialized');
      return;
    }
    
    const { data, error } = await config.supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
      },
    });

    if (error) {
      console.error('Error during Google Sign-In:', error.message);
    }
    // Note: Callback should not be executed here as the OAuth process redirects the user
    // The success handling should be done after the user returns from Google OAuth
  } catch (error) {
    console.error('Unexpected error during Google Sign-In:', error);
  }
} 