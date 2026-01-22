const getViteEnv = () => {
  if (typeof import.meta !== "undefined" && import.meta.env) {
    return import.meta.env;
  }
  return {};
};

const viteEnv = getViteEnv();

const DATA_PROJECT_REF = "hybqqdphqwkuiwfnbljr";
const DATA_PROJECT_URL = `https://${DATA_PROJECT_REF}.supabase.co`;

const resolveSupabaseUrl = () => {
  const envUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    viteEnv.VITE_SUPABASE_URL;

  if (!envUrl) return DATA_PROJECT_URL;
  if (envUrl.includes(DATA_PROJECT_REF)) return envUrl;

  console.warn(
    `[supabase] Unexpected project URL '${envUrl}'. Falling back to ${DATA_PROJECT_REF}.`
  );
  return DATA_PROJECT_URL;
};

// Prefer runtime env vars but fall back to the data project defaults.
export const SUPABASE_URL = resolveSupabaseUrl();

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  viteEnv.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5YnFxZHBocXdrdWl3Zm5ibGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0MTE2NzcsImV4cCI6MjAyNTk4NzY3N30.JtsL113U_lXNhy3RivgnCkHPFROWRxZmnayXiV5LQVw";
