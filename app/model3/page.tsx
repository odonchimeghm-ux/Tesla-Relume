import type { Metadata } from "next";
import { CtaCard } from "@/components/sections/CtaCard";
import { Footnotes } from "@/components/sections/Footnotes";
import { Hero } from "@/components/sections/Hero";
import { InfoCard } from "@/components/sections/InfoCard";
import { MeetCard } from "@/components/sections/MeetCard";
import { SpecsSection } from "@/components/sections/SpecsSection";
import { SplitCard } from "@/components/sections/SplitCard";
import { Stat } from "@/components/sections/Stat";
import { VariantExplorer } from "@/components/sections/VariantExplorer";
import { Actions } from "@/components/ui/Actions";
import { Button } from "@/components/ui/Button";
import { CardGrid } from "@/components/ui/CardGrid";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Slider } from "@/components/ui/Slider";
import {
  affordableCards,
  appFeatures,
  autonomousCards,
  footnotes,
  interiorFeatures,
  meetCards,
  performanceCards,
  premiumCards,
  premiumStats,
  safetyParagraphs,
  specs,
  variants,
} from "@/data/model3";

export const metadata: Metadata = {
  title: "Model 3 — Спорт цахилгаан седан | Tesla",
  description: "Model 3 — хурдан хурдатгал, хол явах зай, бага зардалтай, дунд оврын цахилгаан седан.",
};

export default function Model3Page() {
  return (
    <>
      <Hero
        image="/assets/model3/hero.webp"
        alt="Уулын замаар давхиж буй цагаан Model 3"
        title="Model 3"
        description="Сард $439-өөс эхлэн түрээслэх боломжтой"
        actions={
          <>
            <Button href="#">Захиалах</Button>
            <Button href="#specs" variant="on-dark">
              Загвар харьцуулах
            </Button>
          </>
        }
      />

      {/* Model 3-тай танилцаарай */}
      <Section stack>
        <SectionTitle
          narrow
          tagline="Спорт седан"
          title="Model 3-тай танилцаарай"
          description="Model 3 бүрт стандартаар дагалддаг онцлогуудтай танилцаарай."
        />
        <Slider>
          {meetCards.map((card) => (
            <MeetCard key={card.title} {...card} />
          ))}
        </Slider>
      </Section>

      {/* Хувилбарууд */}
      <Section stack>
        <SectionTitle narrow title="Model 3-ыг судлах" description="Гурван хувилбараас өөрт тохирохыг нь сонгоорой." />
        <VariantExplorer
          ariaLabel="Model 3 хувилбар"
          variants={variants}
          actions={
            <>
              <Button href="#">Захиалах</Button>
              <Button href="#specs" variant="secondary">
                Үзүүлэлт харах
              </Button>
            </>
          }
        />
      </Section>

      {/* Хамгийн хүртээмжтэй үнэ */}
      <Section stack>
        <CtaCard
          tall
          image={{ src: "/assets/model3/affordable.webp", alt: "Ойн дэргэд ачааны тээшээ нээсэн цагаан Model 3" }}
        >
          <SectionTitle
            title="Хамгийн хүртээмжтэй үнэ"
            description="Шилдэг бүх онцлогийг хамгийн хямд үнэтэй, цаг хугацааны турш эзэмших зардал нь хамгийн бага тээврийн хэрэгсэлдээ шингээв."
          />
          <Actions>
            <Button href="#">Захиалах</Button>
          </Actions>
        </CtaCard>
        <CardGrid>
          {affordableCards.map((card, i) => (
            <InfoCard key={i} {...card} />
          ))}
        </CardGrid>
      </Section>

      {/* Дотор засал */}
      <Section stack>
        <SectionTitle
          narrow
          tagline="Дотор засал"
          title="Үндсэн хэрэгцээнээс илүү"
          description="Цэвэрхэн, нарийн нямбай дотор засал танд хэрэгтэй бүхнийг кабин дотроо агуулна."
        />
        <div className="flex flex-col gap-8">
          {interiorFeatures.map((f, i) => (
            <CtaCard key={f.title} tall reverse={i % 2 === 1} image={{ src: f.image, alt: f.alt }}>
              <SectionTitle as="h3" title={f.title} description={f.text} />
            </CtaCard>
          ))}
        </div>
      </Section>

      {/* Tesla апп */}
      <Section stack>
        <SectionTitle
          narrow
          tagline="Tesla апп"
          title="Үргэлж холбогдсон"
          description="Tesla аппаар дамжуулан тээврийн хэрэгслээ хаанаас ч хянаж, удирдаарай."
        />
        <CardGrid cols={4}>
          {appFeatures.map((f, i) => (
            <Stat key={i} {...f} />
          ))}
        </CardGrid>
      </Section>

      {/* Аюулгүй байдал */}
      <Section>
        <CtaCard tall reverse image={{ src: "/assets/model3/safety.webp", alt: "Model 3-ын аюулгүй байдлын бүтэц" }}>
          <SectionTitle tagline="Аюулгүй байдал" title="Таны аюулгүй байдлын төлөө">
            {safetyParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </SectionTitle>
          <Actions>
            <Button href="#" variant="link">
              Дэлгэрэнгүй
            </Button>
          </Actions>
        </CtaCard>
      </Section>

      {/* Автономит жолоодлого */}
      <Section stack>
        <SectionTitle
          narrow
          title="Аяллын ирээдүй бол автономит"
          description="Саад ойртох үед ажилладаг Автомат яаралтай тоормос, эгнээндээ байлгах Эгнээнээс гарахаас сэргийлэх систем зэрэг идэвхтэй аюулгүй байдлын онцлогтой. Бүрэн автомат жолоодлого (Хяналттай)-д шилжиж илүү олон боломжийг нээгээрэй."
          actions={
            <Actions>
              <Button href="/" variant="secondary">
                Туршилт товлох
              </Button>
              <Button href="#" variant="link">
                Дэлгэрэнгүй
              </Button>
            </Actions>
          }
        />
        <CardGrid>
          {autonomousCards.map((card, i) => (
            <InfoCard key={i} {...card} />
          ))}
        </CardGrid>
      </Section>

      {/* Powershare */}
      <Section>
        <SplitCard
          left={
            <>
              <p className="font-semibold">Powershare</p>
              <h2 className="text-h2">Хаана ч эрчим хүч</h2>
              <p className="text-medium">
                Тээврийн хэрэгслээ зөөврийн цахилгаан станц болгоорой. Тээврийн хэрэгслийн батерей болон Tesla Outlet
                Adapter-аар гэрэл, зөөврийн компьютер зэрэг төхөөрөмж, хөргөгч, халаагуур, цахилгаан багаж зэрэг
                хэрэгслийг тэжээнэ.
              </p>
            </>
          }
          right={
            <>
              <h3 className="text-h6">Хуваалцахад хүрэлцэх эрчим хүч</h3>
              <p>
                Тээврийн хэрэгслийн батерей болон Tesla Outlet Adapter-аар өрөөний халаагуур, цахилгаан дугуй, цахилгаан
                багаж зэрэг бусад төхөөрөмжийг тэжээгээрэй.<sup>3</sup> Powerwall 3-тай бол тээврийн хэрэгслийн батерейд
                хуримтлагдсан эрчим хүчээр гэрийнхээ нөөц цахилгааны хугацааг уртасгах боломжтой.
              </p>
              <Button href="#" variant="link">
                Дэлгэрэнгүй
              </Button>
            </>
          }
        />
      </Section>

      {/* Premium */}
      <Section stack>
        <SectionTitle
          narrow
          tagline="Model 3 Premium"
          title="Хол замд зориулав"
          description="Агаарын эсэргүүцлийг дээд зэргээр бууруулахаар шинэчилсэн гадна загвартайгаар нэг цэнэглэлтээр 363 миль (EPA тооцоо) хүртэл замыг туулна."
        />
        <CardGrid>
          {premiumCards.map((card, i) => (
            <InfoCard key={i} {...card} />
          ))}
        </CardGrid>
        <CtaCard aside={premiumStats.map((s, i) => <Stat key={i} {...s} />)}>
          <SectionTitle
            as="h3"
            title="Нам гүм кабин"
            description="360 градусын дуу тусгаарлагч шилний ачаар шивнэх мэт нам гүм кабин. Хор хөнөөлтэй хэт ягаан туяанаас хамгаалахын зэрэгцээ гэрэл нэвтрүүлэх бүтэн шилэн дээвэр дороос тэнгэрийг ширтээрэй."
          />
        </CtaCard>
      </Section>

      {/* Performance */}
      <Section stack>
        <SectionTitle
          narrow
          tagline="Model 3 Performance"
          title="Дараагийн түвшний гүйцэтгэл"
          description={
            <>
              Model 3-д суурилуулж байсан хамгийн хүчирхэг, шинэ үеийн Performance хөтлөгч нэгж нь 500 гаруй морины хүч
              өгч, 0-60 mph хурдыг ердөө 2.9 секундэд хүрэх боломж олгоно.<sup>4</sup>
            </>
          }
        />
        <CardGrid>
          {performanceCards.map((card, i) => (
            <InfoCard key={i} {...card} />
          ))}
        </CardGrid>
      </Section>

      <SpecsSection
        variants={specs}
        actions={
          <>
            <Button href="#">Захиалах</Button>
            <Button href="#" variant="link" light>
              Эзэмшигчийн гарын авлага
            </Button>
          </>
        }
      />

      <Footnotes notes={footnotes} />

      <Hero
        variant="end"
        as="h2"
        image="/assets/model3/end.webp"
        title="Model 3"
        description="Өөрийн Model 3-аа зохион бүтээгээрэй."
        actions={
          <>
            <Button href="#">Өөрийнхөөрөө бүтээх</Button>
            <Button href="#" variant="on-dark">
              Туршилт товлох
            </Button>
          </>
        }
      />
    </>
  );
}
