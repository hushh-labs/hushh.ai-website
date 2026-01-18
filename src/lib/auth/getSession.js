import authConfig from '../config/authConfig';

export default async function getSession() {
  try {
    const { data, error } = await authConfig.supabaseClient.auth.getSession();
    
    if (error) {
      console.error('Error getting session:', error.message);
      return { data: null, error };
    }
    
    return { data, error: null };
  } catch (error) {
    console.error('Unexpected error getting session:', error);
    return { data: null, error };
  }
} 
