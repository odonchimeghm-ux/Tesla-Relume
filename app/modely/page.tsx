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
import { getMeetCards } from "@/lib/meetCards";
import {
  affordableCards,
  appFeatures,
  autonomousCards,
  everythingCards,
  footnotes,
  performanceCards,
  premiumComfortCards,
  premiumExteriorCards,
  rangeStats,
  safetyParagraphs,
  specs,
  variants,
  ylCards,
} from "@/data/modely";

export const metadata: Metadata = {
  title: "Model Y — Цахилгаан дунд оврын SUV | Tesla",
  description:
    "Model Y — 7 хүртэлх суудалтай, 76 куб фут хүртэлх ачааны багтаамжтай, хэмнэлттэй цахилгаан дунд оврын SUV.",
};

// Supabase-ийн өгөгдлийг 60 секунд тутам шинэчилнэ (ISR)
export const revalidate = 60;

export default async function ModelYPage() {
  const meetCards = await getMeetCards("modely");

  return (
    <>
      <Hero
        image="/assets/modely/hero.webp"
        alt="Нар жаргах үеийн цугларалтын дэргэд зогсож буй цагаан Model Y"
        title="Model Y"
        description="Цахилгаан дунд оврын SUV. Жилийн 2.49% хүүтэй санхүүжилт боломжтой."
        actions={
          <>
            <Button href="#">Захиалах</Button>
            <Button href="#specs" variant="on-dark">
              Загвар харьцуулах
            </Button>
          </>
        }
      />

      {/* Model Y-тэй танилцаарай */}
      <Section stack>
        <SectionTitle
          narrow
          tagline="Цахилгаан дунд оврын SUV"
          title="Model Y-тэй танилцаарай"
          description="Model Y бүрт стандартаар дагалддаг онцлогуудтай танилцаарай."
        />
        <Slider>
          {meetCards.map((card) => (
            <MeetCard key={card.title} {...card} />
          ))}
        </Slider>
      </Section>

      {/* Хувилбарууд */}
      <Section stack>
        <SectionTitle narrow title="Model Y-г судлах" description="Дөрвөн хувилбараас өөрт тохирохыг нь сонгоорой." />
        <VariantExplorer
          ariaLabel="Model Y хувилбар"
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

      {/* Хүссэн бүхэн нэг дор */}
      <Section stack>
        <SectionTitle
          narrow
          tagline="Model Y"
          title="Хүссэн бүхэн нэг дор"
          description="Хэн ч, ямар ч аялалд. Тамирлаг хурц шугам, налуу дээвэр, агаарын эсэргүүцэл багатай шинэ хайлштай обуд нь давтагдашгүй хэмнэлтийг бий болгоно. Бага эрчим хүч зарцуулан илүү хол, илүү хурдан хүрээрэй."
        />
        <CardGrid>
          {everythingCards.map((card, i) => (
            <InfoCard key={i} {...card} />
          ))}
        </CardGrid>
      </Section>

      {/* Хэмнэлт */}
      <Section>
        <CtaCard tall image={{ src: "/assets/modely/efficiency.webp", alt: "Намрын замаар явж буй цагаан Model Y" }}>
          <SectionTitle
            title="Давтагдашгүй хэмнэлт"
            description={
              <>
                Model Y бол АНУ-ын хамгийн хэмнэлттэй цахилгаан SUV.<sup>8</sup> Илүү өндөр хэмнэлт нь цаг хугацааны
                турш цэнэглэлтийн зардлыг бууруулна.
              </>
            }
          >
            <h3 className="text-h6">Машинаас илүү</h3>
            <p>
              Model Y-д зугаа цэнгэл бүрэн бий. Дуртай газартаа зогсоод 16 инчийн төв дэлгэцээр хөгжим, кино, тоглоом
              тоглуулаарай.<sup>9</sup> Camp Mode-ыг идэвхжүүлж, кино үзэх, амрах, хонох үедээ кабинаа тав тухтай
              байлгаарай.
            </p>
          </SectionTitle>
        </CtaCard>
      </Section>

      {/* Явах зай — Proximity: карт ба түүний үзүүлэлтүүд 32px зайтай нэг бүлэг */}
      <Section>
        <div className="flex flex-col gap-8">
          <CtaCard tall reverse image={{ src: "/assets/modely/range.webp", alt: "Model Y-ийн явах зай" }}>
            <SectionTitle
              tagline="Явах зай"
              title="Танд хэрэгтэй бүх зай"
              description="Нэг цэнэглэлтээр EPA тооцоогоор 321 миль хүртэл хаана ч хүрээрэй. Урт аялалд Trip Planner-ээр замаа төлөвлөхөд Tesla тань замдаа Supercharger-ийн зогсоолуудыг автоматаар нэмнэ."
            />
          </CtaCard>
          <CardGrid>
            {rangeStats.map((s, i) => (
              <Stat key={i} {...s} />
            ))}
          </CardGrid>
        </div>
      </Section>

      {/* Бензин машинаас хямд — Proximity: карт ба холбогдох картууд нэг бүлэг */}
      <Section>
        <div className="flex flex-col gap-8">
          <CtaCard tall image={{ src: "/assets/modely/affordable.webp", alt: "Model Y" }}>
            <SectionTitle
              title="Бензин машинаас хямд"
              description="Хаана ч хялбар, хямд цэнэглэхээс эхлээд маш бага засвар үйлчилгээ хүртэл — Model Y-г эзэмших нь ижил төстэй бензин машинаас ихэвчлэн хямд байдаг."
            />
          </CtaCard>
          <CardGrid>
            {affordableCards.map((card, i) => (
              <InfoCard key={i} {...card} />
            ))}
          </CardGrid>
        </div>
      </Section>

      {/* Tesla апп */}
      <Section stack>
        <SectionTitle
          narrow
          tagline="Tesla апп"
          title="Хэзээ ч алсаас хандах"
          description="Утсаа түлхүүр болгон ашиглахаас гадна Tesla аппаар тээврийн хэрэгслээ урьдчилан бэлтгэх, нэвтрэх, хянах боломжтой."
        />
        {/* Common Region + Similarity: онцлог бүр бусад онцлогийн картуудтай ижил цагаан картанд */}
        <CardGrid cols={4}>
          {appFeatures.map((f, i) => (
            <InfoCard key={i} title={f.label} text={f.text} />
          ))}
        </CardGrid>
      </Section>

      {/* Premium */}
      <Section stack>
        <SectionTitle
          narrow
          tagline="Model Y Premium"
          title="Нарийн урласан гадна төрх"
          description="Гадна төрхийн өнцөг бүрийг гоо зүй, аэродинамикийг бодолцон нарийн нямбай зохион бүтээсэн."
        />
        <CardGrid>
          {premiumExteriorCards.map((card, i) => (
            <InfoCard key={i} {...card} />
          ))}
        </CardGrid>
        <CtaCard tall image={{ src: "/assets/modely/hero-premium.webp", alt: "Model Y Premium" }}>
          <SectionTitle
            title="Дээд зэргийн тав тух"
            description={
              <>
                Бүтэн шилэн дээвэр бүхий уудам кабинд долоо хүртэл хүн<sup>4</sup> тав тухтай сууна. Өндөр зэрэглэлийн
                материал, дэвшилтэт онцлог, хүрээлсэн орчны гэрэлтүүлэг нь бүрэн дүрэлзсэн орчныг бүтээнэ.
              </>
            }
          />
        </CtaCard>
        <CardGrid>
          {premiumComfortCards.map((card, i) => (
            <InfoCard key={i} {...card} />
          ))}
        </CardGrid>
        <SplitCard
          left={<h2 className="text-h2">Уудам ачааны багтаамж</h2>}
          right={
            <p className="text-medium">
              76 куб фут ачааны багтаамжид долоо хүртэл хүн<sup>4</sup> болон тэдний авчрах бүх зүйл багтана. Гар
              чөлөөтэй тээш ойртоход автоматаар нээгдэж, цүнх, хүнс, спортын хэрэгслээ хялбар ачна. Хоёр, гуравдугаар
              эгнээний суудлыг<sup>4</sup> хавтгай эвхэж нэмэлт зай гаргаарай.
            </p>
          }
        />
      </Section>

      {/* Performance */}
      <Section stack>
        <CtaCard tall reverse image={{ src: "/assets/modely/hero-performance.webp", alt: "Model Y Performance" }}>
          <SectionTitle
            tagline="Model Y Performance"
            title="Дээд зэргийн адреналин"
            description="Model Y Performance нь таны жолоодлогын хэв маяг, хурд, замын нөхцөлд дасан зохицож, явалтыг зөөлөн, зүрхний цохилтыг тань өндөр байлгана."
          />
        </CtaCard>
        <CardGrid>
          {performanceCards.map((card, i) => (
            <InfoCard key={i} {...card} />
          ))}
        </CardGrid>
      </Section>

      {/* Model Y L */}
      <Section stack>
        <CtaCard tall image={{ src: "/assets/modely/hero-yl.webp", alt: "Model Y L Premium" }}>
          <SectionTitle
            tagline="Model Y L Premium · Урт тэнхлэг"
            title="Нямбай сонгосон бүхэн"
            description={
              <>
                Гурван уудам эгнээ, гараар урласан өндөр зэрэглэлийн даавуу, маш нам гүм, олон зориулалттай кабин, 89 куб
                фут<sup>10</sup> хүртэлх ачааны багтаамжаар тав тух, багтаамжийг дээд зэргээр хангана.
              </>
            }
          />
        </CtaCard>
        <CardGrid>
          {ylCards.map((card, i) => (
            <InfoCard key={i} {...card} />
          ))}
        </CardGrid>
        <CtaCard tall reverse image={{ src: "/assets/modely/yl-sleek.webp", alt: "Model Y L-ийн хажуу төрх" }}>
          <SectionTitle title="Гоолиг, боловсронгуй">
            <p>
              Урт тэнхлэг, боловсронгуй явах эд анги нь хоёр, гуравдугаар эгнээний зорчигчдод суух, буухад хялбар
              болгоно. Цахилгаан удирдлагатай амортизатор замын нөхцөлд дасан зохицож, тусгайлан тааруулсан түдгэлзүүр
              арын эгнээнд нэмэлт тав тух өгнө.
            </p>
            <h3 className="text-h6">Шингэсэн хэмнэлт</h3>
            <p>
              Уртасгасан дээвэр, боловсронгуй их бие нь агаарын урсгалыг сайжруулж, хэмнэлт, явах зайг нэмэгдүүлнэ. Арын
              спойлер өндөр хурдад өргөлтийг бууруулна.
            </p>
          </SectionTitle>
        </CtaCard>
      </Section>

      {/* Аюулгүй байдал */}
      <Section>
        <CtaCard tall image={{ src: "/assets/modely/safety.webp", alt: "Model Y-ийн аюулгүй байдал" }}>
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

      {/* Автономит жолоодлого + Powershare */}
      <Section stack>
        <SectionTitle
          narrow
          title="Аяллын ирээдүй бол автономит"
          description="Саад ойртох үед ажилладаг Автомат яаралтай тоормос, эгнээндээ байлгах Эгнээнээс гарахаас сэргийлэх систем зэрэг идэвхтэй аюулгүй байдлын онцлогтой. Бүрэн автомат жолоодлого (Хяналттай)-д шилжиж илүү олон боломжийг нээгээрэй."
          actions={
            <Actions>
              <Button href="#" variant="secondary">
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
        <SplitCard
          left={
            <>
              <p className="font-semibold">Powershare</p>
              <h2 className="text-h2">Хаана ч эрчим хүч</h2>
              <p className="text-medium">
                Тээврийн хэрэгслээ зөөврийн цахилгаан станц болгоорой. Батерей болон Tesla Outlet Adapter-аар гэрэл,
                зөөврийн компьютер, хөргөгч, халаагуур, цахилгаан багаж зэргийг тэжээнэ.
              </p>
            </>
          }
          right={
            <>
              <h3 className="text-h6">Хуваалцахад хүрэлцэх эрчим хүч</h3>
              <p>
                Өрөөний халаагуур, цахилгаан дугуй, цахилгаан багаж зэрэг бусад төхөөрөмжийг тэжээгээрэй.<sup>6</sup>{" "}
                Powerwall 3-тай бол тээврийн хэрэгслийн батерейд хуримтлагдсан эрчим хүчээр гэрийнхээ нөөц цахилгааны
                хугацааг уртасгах боломжтой.
              </p>
              <Button href="#" variant="link">
                Дэлгэрэнгүй
              </Button>
            </>
          }
        />
      </Section>

      <SpecsSection
        variants={specs}
        actions={
          <>
            <Button href="#">Захиалах</Button>
            <Button href="#" variant="link" light>
              Загваруудыг харьцуулах
            </Button>
          </>
        }
      />

      <Footnotes notes={footnotes} />

      <Hero
        variant="end"
        as="h2"
        image="/assets/modely/end.webp"
        title="Model Y"
        description="Өөрийн Model Y-гээ зохион бүтээгээрэй."
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
