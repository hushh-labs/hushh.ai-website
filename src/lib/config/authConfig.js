import { createClient } from "@supabase/supabase-js";
import { SUPABASE_AUTH_ANON_KEY, SUPABASE_AUTH_URL } from "./supabaseAuthEnv";

const authConfig = {
  SUPABASE_URL: SUPABASE_AUTH_URL,
  SUPABASE_ANON_KEY: SUPABASE_AUTH_ANON_KEY,
};

function createSupabaseAuthClient() {
  return createClient(authConfig.SUPABASE_URL, authConfig.SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  });
}

authConfig.supabaseClient = createSupabaseAuthClient();

export default authConfig;
