import type { MeetCardData } from "@/components/sections/MeetCard";
import { meetCards as model3Fallback } from "@/data/model3";
import { meetCards as modelyFallback } from "@/data/modely";
import { supabase } from "@/lib/supabase";

type Model = "model3" | "modely";

const fallback: Record<Model, MeetCardData[]> = { model3: model3Fallback, modely: modelyFallback };

/**
 * Supabase-ийн `meet_cards` хүснэгтээс тухайн загварын картуудыг sort_order-оор татна.
 * Холболт тохируулаагүй эсвэл алдаа гарвал data/ доторх нөөц өгөгдлийг буцаана.
 */
export async function getMeetCards(model: Model): Promise<MeetCardData[]> {
  if (!supabase) {
    console.warn("[meet_cards] Supabase env тохируулаагүй — нөөц өгөгдөл ашиглав");
    return fallback[model];
  }

  const { data, error } = await supabase
    .from("meet_cards")
    .select("title, image")
    .eq("model", model)
    .order("sort_order", { ascending: true });

  if (error || !data?.length) {
    console.error("[meet_cards] татаж чадсангүй — нөөц өгөгдөл ашиглав", error?.message ?? "хоосон");
    return fallback[model];
  }

  return data;
}
