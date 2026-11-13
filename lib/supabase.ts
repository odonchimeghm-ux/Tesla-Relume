import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

/** Зөвхөн унших зориулалттай Supabase клиент (publishable түлхүүр, RLS-ээр хамгаалагдсан). Env байхгүй бол null. */
export const supabase =
  url && key ? createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } }) : null;
