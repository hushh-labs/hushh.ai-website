import config from '../config/config';

export default async function googleSignIn(callback) {
  try {
    console.log('Starting Google Sign-In process...');
    const redirectTo = window.location.origin + '/user-registration';
    
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