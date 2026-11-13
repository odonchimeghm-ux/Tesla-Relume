import Image from "next/image";
import { Stat } from "@/components/sections/Stat";
import { Actions } from "@/components/ui/Actions";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";

const stats = [
  { value: "39,589", label: "Supercharger станц" },
  { value: "401", label: "Destination цэнэглэгч" },
];

/**
 * Цэнэглэлтийн хэсэг: гарчиг, газрын зураг, станцын тоо, товчнууд нэг картад.
 * Gestalt — Common Region: нэг сэдвийн мэдээллийг нэг хүрээнд бүлэглэнэ.
 */
export function ChargeSection() {
  return (
    <Section>
      <Card className="flex flex-col gap-12 p-12 max-md:gap-8 max-md:p-6">
        <SectionTitle
          narrow
          tagline="Цэнэглэлт"
          title="Цэнэглэх цэгээ олоорой"
          description="Ойролцоох Tesla Supercharger болон Destination цэнэглэгчдийн сүлжээг үзээрэй."
        />

        <div className="flex flex-col gap-8">
          <div className="relative aspect-[1440/810] w-full overflow-hidden rounded-lg">
            <Image
              src="/assets/charge-map.png"
              alt="АНУ даяарх Tesla Supercharger станцуудын газрын зураг"
              fill
              sizes="(max-width: 1376px) 100vw, 1184px"
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-12 max-md:grid-cols-1 max-md:gap-8">
            {stats.map((s) => (
              <Stat key={s.label} {...s} />
            ))}
          </div>
        </div>

        <Actions>
          <Button href="#">Сүлжээг үзэх</Button>
          <Button href="#" variant="secondary">
            Дэлгэрэнгүй
          </Button>
        </Actions>
      </Card>
    </Section>
  );
}
