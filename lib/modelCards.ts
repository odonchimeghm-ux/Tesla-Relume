import type { ModelCardData } from "@/components/sections/ModelCard";
import { modelCards as fallback } from "@/data/home";
import { supabase } from "@/lib/supabase";

/**
 * Нүүр хуудасны "Загварууд" картуудыг Supabase-ийн `model_cards` хүснэгтээс sort_order-оор татна.
 * Холболт тохируулаагүй эсвэл алдаа гарвал data/home.ts доторх нөөц өгөгдлийг буцаана.
 */
export async function getModelCards(): Promise<ModelCardData[]> {
  if (!supabase) {
    console.warn("[model_cards] Supabase env тохируулаагүй — нөөц өгөгдөл ашиглав");
    return fallback;
  }

  const { data, error } = await supabase
    .from("model_cards")
    .select("quote, href, name, meta, image, logo")
    .order("sort_order", { ascending: true });

  if (error || !data?.length) {
    console.error("[model_cards] татаж чадсангүй — нөөц өгөгдөл ашиглав", error?.message ?? "хоосон");
    return fallback;
  }

  return data.map((row) => ({ ...row, href: row.href ?? undefined }));
}
