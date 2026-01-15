const getViteEnv = () => {
  if (typeof import.meta !== "undefined" && import.meta.env) {
    return import.meta.env;
  }
  return {};
};

const viteEnv = getViteEnv();

// Prefer runtime env vars but fall back to the provided Supabase project defaults.
export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  viteEnv.VITE_SUPABASE_URL ||
  "https://hybqqdphqwkuiwfnbljr.supabase.co";

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  viteEnv.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5YnFxZHBocXdrdWl3Zm5ibGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0MTE2NzcsImV4cCI6MjAyNTk4NzY3N30.JtsL113U_lXNhy3RivgnCkHPFROWRxZmnayXiV5LQVw";
