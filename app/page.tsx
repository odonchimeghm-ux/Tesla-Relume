import Image from "next/image";
import { ChargeSection } from "@/components/home/ChargeSection";
import { FeatureSection } from "@/components/home/FeatureSection";
import { StatsSection } from "@/components/home/StatsSection";
import { CtaCard } from "@/components/sections/CtaCard";
import { Hero } from "@/components/sections/Hero";
import { ModelCard } from "@/components/sections/ModelCard";
import { Actions } from "@/components/ui/Actions";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Slider } from "@/components/ui/Slider";
import { gallery, modelCards } from "@/data/home";

export default function HomePage() {
  return (
    <>
      <Hero
        image="/assets/hero.png"
        title="Model 3"
        description="Тэрээр Гольфстримийн урсгалд ганцаараа завиар загасчилдаг өвгөн байсан бөгөөд наян дөрвөн өдрийн турш нэг ч загас бариагүй явлаа."
        actions={
          <>
            <Button href="#">Захиалах</Button>
            <Button href="#" variant="secondary">
              Цаг авах
            </Button>
          </>
        }
      />

      <FeatureSection />

      <Section stack>
        <SectionTitle narrow title="Загварууд" description="Өөрт тохирох Tesla-гаа сонгоорой." />
        <Slider dots>
          {modelCards.map((card, i) => (
            <ModelCard key={i} {...card} />
          ))}
        </Slider>
      </Section>

      <Section>
        <CtaCard image={{ src: "/assets/offers.png", alt: "Cybertruck, Model Y болон Model 3" }}>
          <SectionTitle
            title="Онцгой санал"
            description="Tesla-гийн хязгаарлагдмал хугацааны саналуудтай танилцаарай"
          />
          <Actions>
            <Button href="#">Дэлгэрэнгүй</Button>
          </Actions>
        </CtaCard>
      </Section>

      <Section>
        <CtaCard image={{ src: "/assets/shareholder.png", alt: "Tesla Roadster-ийн арын төрх" }}>
          <SectionTitle
            title="2026 оны Хувьцаа эзэмшигчдийн жилийн хурал"
            description="Tesla-гийн ирээдүй таны гарт. Таны санал яагаад чухал болохыг мэдээрэй."
          />
          <Actions>
            <Button href="#">Шинэ</Button>
            <Button href="#" variant="secondary">
              Хэрэглэсэн
            </Button>
          </Actions>
        </CtaCard>
      </Section>

      <ChargeSection />

      <StatsSection />

      <Section stack>
        <SectionTitle
          narrow
          title="Бусад бүтээгдэхүүн"
          description="Нарны хавтан, Powerwall болон бусад эрчим хүчний шийдлүүд."
        />
        <Slider dots spacing="lg">
          {gallery.map((img) => (
            <div key={img.src} className="relative aspect-[1280/720] w-full shrink-0 grow-0 basis-full overflow-hidden rounded-lg">
              <Image src={img.src} alt={img.alt} fill sizes="(max-width: 1408px) 100vw, 1280px" className="object-cover" />
            </div>
          ))}
        </Slider>
      </Section>
    </>
  );
}
