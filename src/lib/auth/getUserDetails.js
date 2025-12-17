import config from "../config/config";

const getAuthTokenKey = () => {
  const match = config.SUPABASE_URL?.match(/https?:\/\/(.*?)\.supabase\.co/i);
  const projectRef = match?.[1] || "supabase";
  return `sb-${projectRef}-auth-token`;
};

export default async function getUserDetails(setUserDetails) {
  try {
    const localCreds = localStorage.getItem(getAuthTokenKey());
    const localCredsJSON = localCreds ? JSON.parse(localCreds) : null;
    
    const userDetails = {
      data: localCredsJSON,
    };
    
    if (setUserDetails) {
      setUserDetails(userDetails);
    }
    
    return userDetails;
  } catch (error) {
    console.error('Error getting user details:', error);
    return { data: null };
  }
}
