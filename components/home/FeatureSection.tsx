import Image from "next/image";
import { Actions } from "@/components/ui/Actions";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";

const stats = [
  { value: "7x", label: "Осол бага" },
  { value: "17,034,000,000", label: "Туулсан миль" },
];

/** Нүүр хуудасны "Бүрэн автомат жолоодлого" хэсэг (Layout / 652) */
export function FeatureSection() {
  return (
    <Section>
      <Card className="flex min-h-[640px] max-lg:h-auto max-lg:flex-col max-lg:items-stretch">
        <div className="flex min-w-0 shrink-0 grow-0 basis-1/2 flex-col justify-center gap-8 p-12 max-lg:flex-none max-md:p-6">
          <div className="flex flex-col gap-8">
            <SectionTitle
              tagline="Үзүүлэлт"
              title="Бүрэн автомат жолоодлого (Хяналттай)"
              description="Аялал бүрийг илүү хялбар болгоно. Сард $99-өөр захиалаарай.1"
            />
            <div className="flex gap-6 py-2 max-md:flex-col">
              {stats.map((stat) => (
                <div key={stat.label} className="flex min-w-0 flex-1 flex-col gap-2 [overflow-wrap:anywhere]">
                  <p className="text-h2">{stat.value}</p>
                  <p>{stat.label}</p>
                </div>
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

        <div className="relative min-w-0 shrink-0 grow-0 basis-1/2 overflow-hidden rounded-lg after:absolute after:inset-0 after:bg-overlay max-lg:aspect-square max-lg:flex-none">
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
