import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * RLS-ийг тойрох эрхтэй сервер талын Supabase клиент (`orders` хүснэгтэд бичихэд).
 * SUPABASE_SECRET_KEY (эсвэл хуучин нэрээр SUPABASE_SERVICE_ROLE_KEY) зөвхөн серверт байна —
 * NEXT_PUBLIC_ угтвар хэзээ ч бүү өг. Env байхгүй бол null.
 */
export function getAdminSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
