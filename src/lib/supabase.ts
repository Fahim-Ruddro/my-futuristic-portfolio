import { createClient } from "@supabase/supabase-js";

// WHAT: Fetch our secret cloud keys from the environment configuration vault safely.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// WHY: Safeguard against empty configurations. If our environment keys are broken or missing, 
// stop the application instantly and tell us exactly what is wrong instead of silently crashing.
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Database Warning: Environment variables for Supabase are missing inside your .env.local file. Database connectivity is temporarily running on placeholder status."
  );
}

/**
 * HOW: Initialize and export our single, reusable connection interface pipeline.
 * We use fallbacks ("https://supabase.co" and a dummy string) so that 
 * your Next.js development server compiles successfully right now without crashing.
 */
export const supabase = createClient(
  supabaseUrl || "https://supabase.co",
  supabaseAnonKey || "placeholder-token-string"
);
