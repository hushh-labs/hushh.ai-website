import config from '../config/config';


export default async function googleSignIn() {
  try {
    console.log('Starting Google Sign-In process...');
    const { data, error } = await config.supabaseClient.auth.signInWithOAuth({
      provider: 'google',

    });

    if (error) {
      console.error('Error during Google Sign-In:', error.message);
      return;
    }
    console.log('OAuth sign-in process completed, fetching user...');

    // Wait for the OAuth sign-in process to complete
    const user = data?.user || (await config.supabaseClient.auth.getUser()).data.user;

    if (user) {
      console.log('User signed in successfully:', user);

      // Extract user data to be inserted
      const userData = {
        user_id: user.id, // Unique Supabase user ID
        mail: user.email, // User's email
        firstname: user.name || null,   // Full name from metadata
      };
      console.log('Data to be inserted:', userData);

      // Insert or update the user data into the 'dev_api_userprofile' table
      const { error: upsertError } = await config.supabaseClient
        .from('dev_api_userprofile')
        .upsert([userData]); // Prevent duplicate entries

      if (upsertError) {
        console.error('Error inserting user data:', upsertError.message);
      } else {
        console.log('User data inserted successfully');
      }
    }
    
  } catch (error) {
    console.error('Unexpected error during Google Sign-In:', error);
  }
}


