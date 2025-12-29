import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "../../../lib/config/supabaseEnv";

const redirect_urls = {
  development: "http://localhost:3000/developer-Api/on-boarding",
  staging: "https://hush1one.com/developer-Api/on-boarding",
  production: "https://hush1one.com/developer-Api/on-boarding",
};

const config = {
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  // supabaseClient: null,
  guestModeAccessToken:
    "P2H8RNXPvIiPoeM0iJEDjJ2Skk37h5pScMQF5oMRUXm3dKoUC2wxrWImx5ccA9VOrOoeaLcMQqn57vYDPucTkYnkkH6icUQy09vtd5eIrAIXhBtmUfAmPI3thD2OoUeF",
  redirect_url: redirect_urls[process.env.NODE_ENV || "development"],
};

function createSupabaseClient() {
  const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY);
  return supabase;
}

config.supabaseClient = createSupabaseClient();

export default config;
