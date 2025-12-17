import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./supabaseEnv";

const config = {
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  redirect_url: "https://hushh.ai/",
};

function createSupabaseClient() {
  const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  });
  return supabase;
}

config.supabaseClient = createSupabaseClient();

export default config;
