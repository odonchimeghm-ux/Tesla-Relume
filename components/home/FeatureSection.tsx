import Image from "next/image";
import { Stat } from "@/components/sections/Stat";
import { Actions } from "@/components/ui/Actions";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";

// Prägnanz: 11 оронтой "17,034,000,000"-ийг нэг харцаар уншигдах "17 тэрбум" болгов
const stats = [
  { value: "7x", label: "Осол бага" },
  {
    value: (
      <>
        17<span className="ml-2 text-h6">тэрбум</span>
      </>
    ),
    label: "Туулсан миль",
  },
];

/** Нүүр хуудасны "Бүрэн автомат жолоодлого" хэсэг (Layout / 652) */
export function FeatureSection() {
  return (
    <Section>
      <Card className="flex min-h-[640px] max-lg:h-auto max-lg:flex-col max-lg:items-stretch">
        {/* Proximity: гарчиг↔үзүүлэлт 32px < агуулга↔товч 48px — товчнууд бүх агуулгад хамаарна */}
        <div className="flex min-w-0 shrink-0 grow-0 basis-1/2 flex-col justify-center gap-12 p-12 max-lg:flex-none max-md:gap-8 max-md:p-6">
          <div className="flex flex-col gap-8">
            <SectionTitle
              tagline="Үзүүлэлт"
              title="Бүрэн автомат жолоодлого (Хяналттай)"
              description="Аялал бүрийг илүү хялбар болгоно. Сард $99-өөр захиалаарай.1"
            />
            {/* Similarity: Цэнэглэлтийн хэсгийн үзүүлэлттэй ижил Stat хэлбэр */}
            <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
              {stats.map((stat) => (
                <Stat key={stat.label} size="md" {...stat} />
              ))}
            </div>
          </div>
          <Actions gap="lg">
            <Button href="#" variant="secondary">
              Туршилт товлох
            </Button>
            <Button href="#" variant="link">
              Дэлгэрэнгүй
            </Button>
          </Actions>
        </div>

        {/* Prägnanz: картын ирмэгтэй нийлсэн зураг — дотор талын илүүдэл бөөрөнхий булангүй */}
        <div className="relative min-w-0 shrink-0 grow-0 basis-1/2 overflow-hidden after:absolute after:inset-0 after:bg-overlay max-lg:aspect-square max-lg:flex-none">
          <Image src="/assets/fsd-video.png" alt="" fill sizes="(max-width: 991px) 100vw, 640px" className="object-cover" />
          <button
            type="button"
            aria-label="Видео тоглуулах"
            className="focus-ring absolute top-1/2 left-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hover:scale-[1.08]"
          >
            <Image src="/assets/play-button.svg" alt="" width={64} height={64} />
          </button>
        </div>
      </Card>
    </Section>
  );
}
