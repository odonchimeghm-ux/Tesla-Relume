import type { Metadata } from "next";
import { OrderStatusRefresher } from "@/components/order/OrderStatusRefresher";
import { Actions } from "@/components/ui/Actions";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { isOrderableModel, modelNames } from "@/data/products";
import { getAdminSupabase } from "@/lib/supabase-admin";

export const metadata: Metadata = {
  title: "Захиалга | Tesla",
  robots: { index: false },
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type Order = { status: "pending" | "paid" | "failed"; model: string; variant: string };

async function getOrder(id: string | undefined): Promise<Order | null> {
  if (!id || !UUID.test(id)) return null;
  const db = getAdminSupabase();
  if (!db) return null;
  const { data } = await db.from("orders").select("status, model, variant").eq("id", id).maybeSingle();
  return data;
}

/**
 * Byl-ийн success_url. Төлбөрийн баталгааг webhook (checkout.completed) хийдэг тул
 * хэрэглэгч webhook-оос түрүүлж ирвэл "баталгаажиж байна" гэж харуулаад хуудсыг шинэчилнэ.
 */
export default async function OrderSuccessPage({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const { order: orderId } = await searchParams;
  const order = await getOrder(orderId);
  const modelName = order && isOrderableModel(order.model) ? modelNames[order.model] : "Tesla";

  const content =
    order?.status === "paid"
      ? {
          tagline: "Захиалга баталгаажлаа",
          title: `${modelName} таны захиалгад орлоо`,
          description: "Төлбөр амжилттай төлөгдлөө. Баримтыг таны и-мэйл рүү илгээсэн бөгөөд манай зөвлөх удахгүй холбогдоно.",
        }
      : order?.status === "pending"
        ? {
            tagline: "Түр хүлээнэ үү",
            title: "Төлбөрийг баталгаажуулж байна",
            description:
              "Төлбөрийн мэдээлэл ирэхийг хүлээж байна. Энэ хуудас автоматаар шинэчлэгдэнэ. Банкны шилжүүлгээр төлсөн бол баталгаажихад хугацаа шаардагдаж болно.",
          }
        : {
            tagline: "Захиалга",
            title: "Захиалга олдсонгүй",
            description: "Холбоос буруу эсвэл захиалга цуцлагдсан байна. Хувилбараа сонгоод дахин захиална уу.",
          };

  return (
    <Section>
      <Card className="flex flex-col gap-8 p-12 max-md:p-6">
        <SectionTitle narrow {...content} />
        <Actions>
          <Button href="/">Нүүр хуудас</Button>
          {order?.status !== "paid" && (
            <Button href={order ? `/${order.model}#variants` : "/model3#variants"} variant="secondary">
              Хувилбар сонгох
            </Button>
          )}
        </Actions>
      </Card>
      {order?.status === "pending" && <OrderStatusRefresher />}
    </Section>
  );
}
