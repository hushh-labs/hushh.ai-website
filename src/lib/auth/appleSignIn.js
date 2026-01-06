import config from "../config/config";

export default async function appleSignIn(callback, customRedirectPath) {
  try {
    console.log("Starting Apple Sign-In process...");

    let redirectPath = "/user-registration";

    if (customRedirectPath) {
      redirectPath = customRedirectPath;
    } else if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;

      if (currentPath.includes("/developerApi/login")) {
        redirectPath = "/developerApi/login";
      } else if (currentPath.includes("/developer-Api/on-boarding")) {
        redirectPath = "/developer-Api/on-boarding";
      } else if (currentPath.includes("/login")) {
        redirectPath = "/login";
      }
    }

    const redirectTo = window.location.origin + redirectPath;
    console.log("Redirecting to:", redirectTo);

    if (!config.supabaseClient) {
      console.error("Supabase client is not initialized");
      return;
    }

    const { error } = await config.supabaseClient.auth.signInWithOAuth({
      provider: "apple",
      options: {
        redirectTo,
        queryParams: {
          response_type: "code",
          response_mode: "query",
          scope: "name email",
        },
      },
    });

    if (error) {
      console.error("Error during Apple Sign-In:", error.message);
    }
  } catch (error) {
    console.error("Unexpected error during Apple Sign-In:", error);
  }
}
