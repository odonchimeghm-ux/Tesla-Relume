import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Byl төлбөрийн API-ийн сервер талын клиент (https://byl.mn/docs/api).
 * Зөвхөн Server Action / Route Handler-аас импортлоно — токен хөтөч рүү гарах ёсгүй.
 */

const BASE_URL = "https://byl.mn/api/v1";

export class BylError extends Error {
  constructor(
    message: string,
    readonly status: number,
    /** Byl-ийн бизнес логикийн алдааны нэр (жш: `closed_checkout`) */
    readonly code?: string,
  ) {
    super(message);
    this.name = "BylError";
  }
}

export function getBylProjectId(): string | undefined {
  return process.env.BYL_PROJECT_ID;
}

export function isBylConfigured(): boolean {
  return Boolean(process.env.BYL_TOKEN && process.env.BYL_PROJECT_ID);
}

type CheckoutItem = { price: string; quantity: number };

export type CreateCheckoutInput = {
  items: CheckoutItem[];
  success_url?: string;
  cancel_url?: string;
  /** Манай систем дэх захиалгын дугаар, 48 тэмдэгт хүртэл. Webhook-оор буцаж ирнэ. */
  client_reference_id?: string;
  phone_number_collection?: boolean;
  email_collection?: boolean;
};

/** POST /projects/:id/checkouts — хариунд зөвхөн id, url ирнэ */
export async function createCheckout(input: CreateCheckoutInput): Promise<{ id: number; url: string }> {
  const token = process.env.BYL_TOKEN;
  const projectId = process.env.BYL_PROJECT_ID;
  if (!token || !projectId) throw new BylError("BYL_TOKEN эсвэл BYL_PROJECT_ID тохируулаагүй", 503);

  const res = await fetch(`${BASE_URL}/projects/${projectId}/checkouts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
    cache: "no-store",
  });

  const json = (await res.json().catch(() => null)) as
    | { data?: { id: number; url: string }; message?: string; error?: string }
    | null;

  if (!res.ok || !json?.data?.url) {
    throw new BylError(json?.message ?? `Byl HTTP ${res.status}`, res.status, json?.error);
  }
  return json.data;
}

/**
 * Webhook-ийн `Byl-Signature` header-ийг шалгана: түүхий body-н HMAC-SHA256 (hex),
 * тогтмол хугацааны харьцуулалтаар (https://byl.mn/docs/webhook#гарын-үсэг-шалгах).
 */
export function verifyBylSignature(rawBody: string, signature: string | null, secret: string): boolean {
  if (!signature) return false;
  const expected = Buffer.from(createHmac("sha256", secret).update(rawBody).digest("hex"));
  const received = Buffer.from(signature.trim());
  return expected.length === received.length && timingSafeEqual(expected, received);
}
