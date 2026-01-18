import authConfig from "../../../lib/config/authConfig";

export default async function appleSignIn(setUserEmail) {
  try {
    const redirectTo = window.location.origin + '/user-registration';

    console.log("Starting Apple Sign-In process...");

    const { data, error } = await authConfig.supabaseClient.auth.signInWithOAuth({
      provider: "apple",
      options: {
        redirectTo: redirectTo,
      },
    });

    if (error) {
      console.error("Error during Apple Sign-In:", error.message);
      // Handle the error appropriately
    } else {
      console.log("Apple Sign-In successful:", data);
      const user = data?.user || (await authConfig.supabaseClient.auth.getUser()).data.user;
      if (user) {
        setUserEmail(user.email); // Capture and set the user's email
      }
      // Handle successful sign-in
    }
  } catch (error) {
    console.error("Unexpected error during Apple Sign-In:", error);
    // Handle unexpected errors
  }
}

