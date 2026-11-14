"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getPriceKey } from "@/data/products";
import { BylError, createCheckout, isBylConfigured } from "@/lib/byl";
import { getAdminSupabase } from "@/lib/supabase-admin";

export type CheckoutState = { error: string } | null;

/** success_url / cancel_url-д ашиглах сайтын хаяг. SITE_URL өгвөл түүнийг, үгүй бол хүсэлтийн host-ыг ашиглана. */
async function getOrigin(): Promise<string> {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

/**
 * "Захиалах" товч: захиалга үүсгээд Byl checkout руу шилжүүлнэ.
 * Хэрэглэгчээс зөвхөн model, variant ирнэ — үнэ серверт data/products.ts-ээс тодорхойлогдоно.
 */
export async function startCheckout(_prev: CheckoutState, formData: FormData): Promise<CheckoutState> {
  const model = String(formData.get("model") ?? "");
  const variant = String(formData.get("variant") ?? "");
  const priceKey = getPriceKey(model, variant);
  if (!priceKey) return { error: "Ийм хувилбар олдсонгүй." };

  const db = getAdminSupabase();
  if (!db || !isBylConfigured()) {
    console.error("[checkout] BYL_* эсвэл SUPABASE_SECRET_KEY env тохируулаагүй");
    return { error: "Онлайн захиалга түр ажиллахгүй байна. Дараа дахин оролдоно уу." };
  }

  const { data: order, error: insertError } = await db
    .from("orders")
    .insert({ model, variant, price_key: priceKey })
    .select("id")
    .single();
  if (insertError || !order) {
    console.error("[checkout] захиалга үүсгэж чадсангүй", insertError?.message);
    return { error: "Захиалга үүсгэж чадсангүй. Дахин оролдоно уу." };
  }

  const origin = await getOrigin();
  let checkoutUrl: string;
  try {
    const checkout = await createCheckout({
      items: [{ price: priceKey, quantity: 1 }],
      client_reference_id: order.id,
      success_url: `${origin}/order/success?order=${order.id}`,
      cancel_url: `${origin}/${model}#variants`,
      phone_number_collection: true,
    });
    checkoutUrl = checkout.url;
    await db.from("orders").update({ byl_checkout_id: checkout.id }).eq("id", order.id);
  } catch (e) {
    const detail = e instanceof BylError ? `${e.status} ${e.code ?? ""} ${e.message}` : String(e);
    console.error("[checkout] Byl checkout үүсгэж чадсангүй:", detail);
    await db.from("orders").update({ status: "failed" }).eq("id", order.id);
    return { error: "Төлбөрийн хуудсыг нээж чадсангүй. Дахин оролдоно уу." };
  }

  // redirect нь exception шиддэг тул try/catch-ийн гадна дуудна
  redirect(checkoutUrl);
}
