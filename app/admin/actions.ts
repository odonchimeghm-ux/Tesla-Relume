"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

/**
 * Админ өгөгдөл хадгалсны дараа нийтийн хуудсуудыг шууд шинэчилнэ.
 * Дуудсан хүний access token-оор is_admin()-г шалгаж, админ биш бол юу ч хийхгүй.
 */
export async function revalidateContent(accessToken: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key || !accessToken) return { ok: false as const };

  const asUser = createClient(url, key, {
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: isAdmin, error } = await asUser.rpc("is_admin");
  if (error || isAdmin !== true) return { ok: false as const };

  revalidatePath("/");
  revalidatePath("/model3");
  revalidatePath("/modely");
  return { ok: true as const };
}
