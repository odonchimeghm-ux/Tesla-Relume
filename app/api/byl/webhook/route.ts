import { getBylProjectId, verifyBylSignature } from "@/lib/byl";
import { getAdminSupabase } from "@/lib/supabase-admin";

// node:crypto ашигладаг тул Node.js runtime
export const runtime = "nodejs";

type BylEvent = {
  id: number;
  project_id: number;
  type: string;
  data?: {
    object?: {
      id?: number;
      status?: string;
      client_reference_id?: string | null;
      amount_total?: string | number;
      customer_email?: string | null;
      phone_number?: string | null;
    };
  };
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Byl webhook (https://byl.mn/docs/webhook).
 * 2xx буцаавал Byl хүргэлтийг амжилттайд тооцно; 5xx бол дахин илгээнэ (4 хоног хүртэл).
 */
export async function POST(request: Request) {
  const secret = process.env.BYL_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[byl-webhook] BYL_WEBHOOK_SECRET тохируулаагүй");
    return Response.json({ error: "not configured" }, { status: 500 });
  }

  // Гарын үсгийг түүхий body дээр шалгана — JSON задлаад дахин stringify хийвэл таарахгүй
  const raw = await request.text();
  if (!verifyBylSignature(raw, request.headers.get("byl-signature"), secret)) {
    return Response.json({ error: "invalid signature" }, { status: 401 });
  }

  let event: BylEvent;
  try {
    event = JSON.parse(raw);
  } catch {
    return Response.json({ error: "invalid json" }, { status: 400 });
  }

  // Signing secret нь багийн бүх төсөлд ижил тул төслийг нь шалгана
  const projectId = getBylProjectId();
  if (projectId && String(event.project_id) !== projectId) {
    return Response.json({ ignored: "other project" });
  }

  if (event.type === "checkout.completed") {
    const checkout = event.data?.object;
    const orderId = checkout?.client_reference_id;
    if (checkout?.status !== "complete" || !orderId || !UUID.test(orderId)) {
      return Response.json({ ignored: "not our order" });
    }

    const db = getAdminSupabase();
    if (!db) {
      console.error("[byl-webhook] SUPABASE_SECRET_KEY тохируулаагүй");
      return Response.json({ error: "not configured" }, { status: 500 });
    }

    // Давтан ирсэн event-д дахин шинэчлэхгүй (status != paid)
    const { error } = await db
      .from("orders")
      .update({
        status: "paid",
        paid_at: new Date().toISOString(),
        amount: checkout.amount_total != null ? Number(checkout.amount_total) : null,
        customer_email: checkout.customer_email ?? null,
        phone: checkout.phone_number ?? null,
        byl_checkout_id: checkout.id ?? null,
        byl_event_id: event.id,
      })
      .eq("id", orderId)
      .neq("status", "paid");

    if (error) {
      console.error("[byl-webhook] захиалга шинэчилж чадсангүй", error.message);
      return Response.json({ error: "db error" }, { status: 500 });
    }
  }

  // Бусад event-ийг (payment.awaiting_verification гэх мэт) хүлээн аваад алгасна
  return Response.json({ received: true });
}
