import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { CtaCard } from "@/components/sections/CtaCard";
import { InfoCard } from "@/components/sections/InfoCard";
import { MeetCard } from "@/components/sections/MeetCard";
import { Stat } from "@/components/sections/Stat";
import { MotionDemo } from "@/components/styleguide/MotionDemo";
import { StyleguideNav } from "@/components/styleguide/StyleguideNav";
import { Swatch } from "@/components/styleguide/Swatch";
import { Actions } from "@/components/ui/Actions";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Slider } from "@/components/ui/Slider";
import { Tabs } from "@/components/ui/Tabs";
import { meetCards } from "@/data/model3";
import {
  alphaColors,
  breakpoints,
  fontFamilies,
  icons,
  layoutTokens,
  motions,
  principles,
  radii,
  sectionInventory,
  sgSections,
  solidColors,
  spacingScale,
  spacingTokens,
  surfaceRoles,
  typeScale,
} from "@/data/styleguide";
import { contrast } from "@/lib/contrast";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Styleguide — Дизайн систем | Tesla",
  description: "Tesla сайтын өнгө, үсэг, зай, хэлбэр, компонент, хөдөлгөөний сан.",
};

const sectionNumber = (id: string) =>
  String(sgSections.findIndex((s) => s.id === id) + 1).padStart(2, "0");

export default function StyleguidePage() {
  return (
    <div className="px-page pt-section-md pb-section">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-16 max-lg:gap-8">
        <header className="flex max-w-[768px] flex-col gap-6">
          <p className="font-semibold">Дизайн систем · Styleguide</p>
          <h1 className="text-h1">Tesla дизайн систем</h1>
          <p className="text-medium">
            Сайтын токен, компонент, хөдөлгөөний сан. Өнгө, хэмжээ, үсгийн утгууд нь <Code>app/globals.css</Code>-ийн{" "}
            <Code>@theme</Code> токенуудаас, компонентууд нь бодит <Code>components/</Code> сангаас шууд зурагдсан.
          </p>
        </header>

        <div className="grid gap-16 lg:grid-cols-[208px_minmax(0,1fr)] max-lg:gap-8">
          <StyleguideNav />

          <div className="flex min-w-0 flex-col">
            {/* 01 Зарчим */}
            <Block id="principles" title="Зарчим">
              <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                {principles.map((p) => (
                  <article key={p.title} className="flex flex-col gap-3 rounded-lg bg-foreground p-8 max-md:p-6">
                    <h3 className="text-h6">{p.title}</h3>
                    <p>{p.text}</p>
                  </article>
                ))}
              </div>
            </Block>

            {/* 02 Брэнд */}
            <Block id="brand" title="Брэнд">
              <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
                <LogoTile className="bg-foreground" caption={<>Цайвар дээр · <Code>specs</Code></>} />
                <LogoTile className="bg-specs text-white" invert caption={<>Бараан дээр · <Code>white</Code></>} />
                <LogoTile className="bg-primary text-white" invert caption={<>Primary дээр · <Code>white</Code></>} />
              </div>
              <p className="text-small opacity-80">
                <Code>public/assets/tesla-logo.svg</Code>, <Code>fill=&quot;#171a20&quot;</Code>. Бараан дэвсгэр дээр{" "}
                <Code>brightness-0 invert</Code>-ээр цагаан болгоно. Header, footer: 120px өргөн. Хамгийн бага өргөн 96px.
              </p>
            </Block>

            {/* 03 Өнгө */}
            <Block id="color" title="Өнгө">
              <Sub title="Үндсэн токен" note="globals.css · @theme">
                <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2">
                  {solidColors.map((c) => (
                    <Swatch
                      key={c.name}
                      {...c}
                      ratios={{ white: contrast(c.value, "#ffffff"), ink: contrast(c.value, "#010508") }}
                    />
                  ))}
                </div>
              </Sub>
              <Sub title="Тунгалаг токен" note="ink эсвэл хар өнгөний хувь">
                <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2">
                  {alphaColors.map((c) => (
                    <Swatch key={c.name} {...c} />
                  ))}
                </div>
              </Sub>
              <Sub title="Гадаргуугаар" note="Цайвар хуудас ба бараан specs хэсэг">
                <Table
                  head={["Үүрэг", "Цайвар", "Бараан"]}
                  rows={surfaceRoles.map((r) => [r.role, <Code key="l">{r.light}</Code>, <Code key="d">{r.dark}</Code>])}
                />
              </Sub>
            </Block>

            {/* 04 Үсэг */}
            <Block id="type" title="Үсэг">
              <Sub title="Үсгийн гэр бүл">
                <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                  {fontFamilies.map((f) => (
                    <article key={f.name} className="flex flex-col gap-4 rounded-lg bg-foreground p-8 max-md:p-6">
                      <p className={cn(f.className, "text-[56px] leading-none font-medium")}>Аа Өө Үү 0123</p>
                      <div className="flex flex-col gap-1">
                        <p className="font-semibold">
                          {f.name} · {f.family}
                        </p>
                        <p className="text-small opacity-60">
                          <Code>{f.variable}</Code> · {f.weights}
                        </p>
                        <p className="text-small">{f.usage}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </Sub>
              <Sub title="Хэмжээний шатлал" note={`Breakpoint: ${breakpoints.join(" / ")}`}>
                <div className="flex flex-col rounded-lg bg-foreground">
                  {typeScale.map((t, i) => (
                    <div
                      key={t.token}
                      className={cn(
                        "grid grid-cols-[200px_minmax(0,1fr)] items-baseline gap-6 p-6 max-md:grid-cols-1 max-md:gap-2",
                        i > 0 && "border-t border-border",
                      )}
                    >
                      <div className="flex flex-col gap-0.5 text-small">
                        <Code>{t.token}</Code>
                        <span className="opacity-60">{t.sizes.join(" / ")}</span>
                        <span className="opacity-60">{t.meta}</span>
                      </div>
                      <p className={cn(t.className, "truncate")} title={t.usage}>
                        Цахилгаан ирээдүй
                      </p>
                    </div>
                  ))}
                </div>
              </Sub>
              <Sub title="Бичвэрийн хэв маяг" note="Компонент дотор хэрхэн хослуулдаг">
                <div className="flex flex-col gap-8 rounded-lg bg-foreground p-8 max-md:p-6">
                  <Specimen label="Tagline · font-semibold" meta="Inter 600 · 16px/24px">
                    <p className="font-semibold">Спорт седан</p>
                  </Specimen>
                  <Specimen label="SectionTitle · text-h2" meta="Inter 500 · 52px/62.4px · -0.52px">
                    <p className="text-h2">Model 3-тай танилцаарай</p>
                  </Specimen>
                  <Specimen label="Картын гарчиг · text-h6" meta="Inter 500 · 22px/30.8px · -0.22px">
                    <p className="text-h6">Хамгийн хүртээмжтэй үнэ</p>
                  </Specimen>
                  <Specimen label="Lead · text-medium" meta="Inter 400 · 18px/27px">
                    <p className="text-medium">Model 3 бүрт стандартаар дагалддаг онцлогуудтай танилцаарай.</p>
                  </Specimen>
                  <Specimen label="Stat · font-alt" meta="Roboto 700 · 80px/104px (64 / 56px)">
                    <p className="font-alt text-[80px] leading-[1.3] font-bold max-lg:text-[64px] max-md:text-[56px]">
                      39,589
                    </p>
                  </Specimen>
                  <Specimen label="Зүүлт · text-small" meta="Inter 400 · 14px/21px">
                    <p className="text-small">
                      <sup>1</sup> EPA-ийн тооцоолсон зай. Бодит зай нөхцөлөөс хамаарна.
                    </p>
                  </Specimen>
                </div>
              </Sub>
            </Block>

            {/* 05 Зай */}
            <Block id="spacing" title="Зай">
              <Sub title="Responsive токен" note="Breakpoint бүрт өөрөө багасна">
                <Table
                  head={["Токен", ...breakpoints, "Хэрэглээ"]}
                  rows={spacingTokens.map((s) => [<Code key="t">{s.token}</Code>, ...s.values, s.usage])}
                />
              </Sub>
              <Sub title="Компонентын шатлал" note="Tailwind gap / padding, 4px суурьтай">
                <div className="flex flex-col gap-3 rounded-lg bg-foreground p-8 max-md:p-6">
                  {spacingScale.map((s) => (
                    <div key={s.cls} className="grid grid-cols-[96px_56px_minmax(0,1fr)] items-center gap-4 text-small">
                      <Code>gap-{s.cls}</Code>
                      <span className="opacity-60">{s.px}px</span>
                      <span className="h-3 rounded-sm bg-primary" style={{ width: s.px }} />
                    </div>
                  ))}
                </div>
              </Sub>
              <Sub title="Байршил">
                <Table
                  head={["Нэр", "Утга", "Хэрэглээ"]}
                  rows={layoutTokens.map((l) => [l.name, <Code key="v">{l.value}</Code>, l.usage])}
                />
              </Sub>
            </Block>

            {/* 06 Хэлбэр */}
            <Block id="shape" title="Хэлбэр">
              <div className="grid grid-cols-5 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2">
                {radii.map((r) => (
                  <div key={r.token} className="flex flex-col gap-3">
                    <div className={cn("aspect-square border border-border bg-foreground", r.className)} />
                    <div className="flex flex-col gap-0.5 text-small">
                      <Code>{r.token}</Code>
                      <span className="opacity-60">{r.value}</span>
                      <span>{r.usage}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Block>

            {/* 07 Шугам */}
            <Block id="stroke" title="Шугам">
              <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                <StrokeTile title="Hairline" meta="1px · --color-border · header, footer, specs">
                  <hr className="h-px w-full border-0 bg-border" />
                </StrokeTile>
                <StrokeTile title="Stat-ийн зураас" meta="border-l 1px · --color-border · pl-8">
                  <div className="border-l border-border pl-8 text-h6">500+ м.х</div>
                </StrokeTile>
                <StrokeTile title="Slider-ийн сум" meta="1px · --color-background · цагаан дэвсгэр">
                  <span className="flex items-center justify-center rounded border border-background bg-foreground p-3">
                    <Image src="/assets/arrow-forward.svg" alt="" width={24} height={24} />
                  </span>
                </StrokeTile>
                <StrokeTile title="Focus ring" meta="2px solid --color-primary · offset 2px · :focus-visible">
                  <span className="rounded-button bg-neutral-5 px-5 py-2 font-medium outline-2 outline-offset-2 outline-primary outline-solid">
                    Tab дарж үзээрэй
                  </span>
                </StrokeTile>
              </div>
            </Block>

            {/* 08 Сүүдэр, бүрхүүл */}
            <Block id="shade" title="Сүүдэр, бүрхүүл">
              <Sub title="Зураг дээрх бүрхүүл" note="Зураг дээрх цагаан бичвэрийг уншигдахуйц болгоно">
                <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
                  <OverlayTile title="Байхгүй" meta="Зөвхөн бичвэргүй зураг" />
                  <OverlayTile title="--color-overlay" meta="#000 · 40% · Hero, ModelCard" className="after:bg-overlay" />
                  <OverlayTile
                    title="Доороос gradient"
                    meta="black/60 → transparent 50% · MeetCard"
                    className="after:bg-linear-to-t after:from-black/60 after:to-transparent after:to-50%"
                  />
                </div>
              </Sub>
              <Sub title="Сүүдэр">
                <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                  <div className="flex flex-col gap-4 rounded-lg bg-foreground p-8 max-md:p-6">
                    <div className="inline-flex gap-1 self-start rounded-lg bg-neutral-5 p-1">
                      <span className="rounded-button bg-foreground px-5 py-2 font-medium shadow-[0_1px_3px_rgb(1_5_8/0.12)]">
                        Сонгосон
                      </span>
                      <span className="px-5 py-2 font-medium">Бусад</span>
                    </div>
                    <p className="text-small">
                      <Code>0 1px 3px ink 12%</Code> · Сонгосон tab. Сайтын цорын ганц сүүдэр, карт сүүдэргүй.
                    </p>
                  </div>
                  <div className="flex flex-col gap-4 rounded-lg bg-specs p-8 text-white max-md:p-6">
                    <div className="flex gap-2">
                      <span className="rounded-button bg-white/8 px-4 py-2">8%</span>
                      <span className="rounded-button bg-white/18 px-4 py-2">18%</span>
                      <span className="rounded-button bg-white/28 px-4 py-2">28%</span>
                    </div>
                    <p className="text-small">
                      Бараан дээрх цагаан бүрхүүл: tab-ын суурь, on-dark товч, түүний hover.
                    </p>
                  </div>
                </div>
              </Sub>
            </Block>

            {/* 09 Дүрс */}
            <Block id="icons" title="Дүрс">
              <p className="text-small opacity-80">
                SVG файлууд <Code>public/assets/</Code>-д, <Code>next/image</Code>-ээр <Code>alt=&quot;&quot;</Code>-тэй
                (чимэглэл). Бараан дэвсгэр дээр <Code>invert</Code>.
              </p>
              <div className="grid grid-cols-6 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2">
                {icons.map((icon) => (
                  <div key={icon.file} className="flex flex-col items-center gap-3 rounded-lg bg-foreground p-6 text-center">
                    <div className="flex h-16 items-center justify-center">
                      <Image src={`/assets/${icon.file}`} alt="" width={icon.size} height={icon.size} />
                    </div>
                    <div className="flex flex-col gap-0.5 text-small">
                      <Code>{icon.file.replace(".svg", "")}</Code>
                      <span className="opacity-60">{icon.size}px</span>
                      <span>{icon.usage}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Block>

            {/* 10 Компонент */}
            <Block id="components" title="Компонент">
              <Sub title="Button" note="ui/Button.tsx · rounded-button, Inter 500 16px, padding 10×24 (sm: 8×20)">
                <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                  <div className="flex flex-col gap-6 rounded-lg bg-foreground p-8 max-md:p-6">
                    <Actions>
                      <Button href="#components">Захиалах</Button>
                      <Button href="#components" variant="secondary">
                        Цаг авах
                      </Button>
                      <Button href="#components" variant="link">
                        Дэлгэрэнгүй
                      </Button>
                    </Actions>
                    <Actions>
                      <Button href="#components" size="sm">
                        Цаг авах
                      </Button>
                      <Button href="#components" variant="secondary" size="sm">
                        Захиалах
                      </Button>
                    </Actions>
                  </div>
                  <div className="flex flex-col gap-6 rounded-lg bg-specs p-8 text-white max-md:p-6">
                    <Actions>
                      <Button href="#components">Захиалах</Button>
                      <Button href="#components" variant="on-dark">
                        Туршилт товлох
                      </Button>
                    </Actions>
                    <Actions>
                      <Button href="#components" variant="link" light>
                        Гарын авлага
                      </Button>
                    </Actions>
                  </div>
                </div>
                <Table
                  head={["Variant", "Хэрэглээ"]}
                  rows={[
                    [<Code key="p">primary</Code>, "Гол үйлдэл: захиалах, цаг авах. Хэсэг бүрт нэг л байна."],
                    [<Code key="s">secondary</Code>, "Цайвар дэвсгэр дээрх хоёрдогч үйлдэл."],
                    [<Code key="o">on-dark</Code>, "Зураг, бараан дэвсгэр дээрх хоёрдогч үйлдэл."],
                    [<Code key="l">link</Code>, "Бичвэр маягийн үйлдэл, chevron-той. Бараан дээр light."],
                  ]}
                />
              </Sub>

              <Sub title="Tabs" note="ui/Tabs.tsx · ← → товчоор шилжинэ · tone: light | dark">
                <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                  <div className="rounded-lg bg-foreground p-8 max-md:p-6">
                    <Tabs
                      idPrefix="sg-light"
                      ariaLabel="Жишээ tab (цайвар)"
                      className="flex flex-col gap-6"
                      items={[
                        { id: "rwd", label: "Хойд хөтлөгч", content: <p>Нэг цэнэглэлтээр 363 миль хүртэл.</p> },
                        { id: "awd", label: "Бүх дугуй", content: <p>Бүх цаг агаарт тогтвортой зүтгүүр.</p> },
                      ]}
                    />
                  </div>
                  <div className="rounded-lg bg-specs p-8 text-white max-md:p-6">
                    <Tabs
                      idPrefix="sg-dark"
                      ariaLabel="Жишээ tab (бараан)"
                      tone="dark"
                      className="flex flex-col gap-6"
                      items={[
                        { id: "std", label: "Model 3", content: <p>0–60 mph · 5.8 сек</p> },
                        { id: "perf", label: "Performance", content: <p>0–60 mph · 2.9 сек</p> },
                      ]}
                    />
                  </div>
                </div>
              </Sub>

              <Sub title="Card · InfoCard" note="ui/Card.tsx · bg-foreground, rounded-lg, padding 32 (утсан дээр 24)">
                <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
                  <InfoCard
                    image="/assets/model3/affordable-1.webp"
                    title="Зурагтай карт"
                    text="4:3 зураг, доор нь гарчиг ба тайлбар."
                  />
                  <InfoCard title="Зураггүй карт" text="Гарчиг, тайлбар 12px зайтай, 32px padding." />
                  <InfoCard title="Text-h6 гарчиг" text="Картын гарчиг үргэлж text-h6, бичвэр text-regular." />
                </div>
              </Sub>

              <Sub title="Stat" note="sections/Stat.tsx · Roboto 700 тоо, border-l hairline">
                <div className="grid grid-cols-3 gap-8 rounded-lg bg-foreground p-8 max-md:grid-cols-1 max-md:p-6">
                  <Stat value="363" label="миль зай" />
                  <Stat value="2.9" label="сек 0–60 mph" />
                  <Stat label="Tesla апп" text="Утаснаасаа машинаа хянана." />
                </div>
              </Sub>

              <Sub title="SectionTitle · Actions" note="ui/SectionTitle.tsx · tagline + h2 + lead + товч">
                <div className="rounded-lg bg-foreground p-8 max-md:p-6">
                  <SectionTitle
                    narrow
                    tagline="Аюулгүй байдал"
                    title="Таны аюулгүй байдлын төлөө"
                    description="Narrow хувилбар нь 768px өргөн, элементүүдийн хооронд 24px зайтай."
                    actions={
                      <Actions>
                        <Button href="#components" variant="secondary">
                          Туршилт товлох
                        </Button>
                        <Button href="#components" variant="link">
                          Дэлгэрэнгүй
                        </Button>
                      </Actions>
                    }
                  />
                </div>
              </Sub>
            </Block>

            {/* 11 Хэсгүүд */}
            <Block id="sections" title="Хэсгүүд">
              <Sub title="CtaCard" note="sections/CtaCard.tsx · хагас текст, хагас зураг · tall, reverse, aside">
                <CtaCard image={{ src: "/assets/model3/affordable.webp", alt: "" }}>
                  <SectionTitle
                    as="h3"
                    title="Хамгийн хүртээмжтэй үнэ"
                    description="Шилдэг бүх онцлогийг хамгийн бага эзэмших зардалтайгаар."
                  />
                  <Actions>
                    <Button href="#sections">Захиалах</Button>
                  </Actions>
                </CtaCard>
              </Sub>
              <Sub title="MeetCard · Slider" note="sections/MeetCard.tsx + ui/Slider.tsx · 400×520, доороос gradient">
                <div className="overflow-hidden">
                  <Slider>
                    {meetCards.map((card) => (
                      <MeetCard key={card.title} {...card} />
                    ))}
                  </Slider>
                </div>
              </Sub>
              <Sub title="Бусад хэсэг" note="Бодит хуудсан дээрээ харагдана">
                <Table
                  head={["Хэсэг", "Файл", "Хуудас", "Тайлбар"]}
                  rows={sectionInventory.map((s) => [
                    <span key="n" className="font-medium">
                      {s.name}
                    </span>,
                    <Code key="f">{s.file}</Code>,
                    s.pages,
                    s.note,
                  ])}
                />
              </Sub>
            </Block>

            {/* 12 Хөдөлгөөн */}
            <Block id="motion" title="Хөдөлгөөн">
              <p className="text-small opacity-80">
                Хөдөлгөөн цөөн, богино: ихэнх нь 200ms, зөвхөн slider 500ms <Code>ease-in-out</Code>. Жишээн дээр hover
                хийж эсвэл дарж үзээрэй.
              </p>
              <div className="flex flex-col rounded-lg bg-foreground">
                {motions.map((m, i) => (
                  <article
                    key={m.slug}
                    className={cn(
                      "grid grid-cols-[minmax(0,1fr)_200px] items-center gap-6 p-6 max-md:grid-cols-1",
                      i > 0 && "border-t border-border",
                    )}
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-h6">{m.name}</h3>
                        <Code>{m.slug}</Code>
                        <span className="rounded-button bg-neutral-5 px-2 py-0.5 text-small">{m.kind}</span>
                      </div>
                      <p>{m.description}</p>
                      <p className="text-small opacity-60">
                        <Code>{m.where}</Code> · {m.spec}
                      </p>
                    </div>
                    <div className="flex justify-center max-md:justify-start">
                      <MotionDemo demo={m.demo} />
                    </div>
                  </article>
                ))}
              </div>
            </Block>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Хуудасны дотоод туслах компонентууд ---------- */

function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="flex scroll-mt-20 flex-col gap-8 border-t border-border py-16 first:border-t-0 first:pt-0 max-md:py-12">
      <h2 className="flex items-baseline gap-4 text-h2">
        <span className="font-alt text-medium tabular-nums opacity-40">{sectionNumber(id)}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Sub({ title, note, children }: { title: string; note?: ReactNode; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="text-h6">{title}</h3>
        {note && <p className="text-small opacity-60">{note}</p>}
      </div>
      {children}
    </div>
  );
}

function Code({ children }: { children: ReactNode }) {
  return <code className="rounded bg-neutral-5 px-1.5 py-0.5 text-[0.875em] break-words">{children}</code>;
}

function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-lg bg-foreground">
      <table className="w-full min-w-[560px] text-left text-small">
        <thead>
          <tr className="border-b border-border">
            {head.map((h) => (
              <th key={h} scope="col" className="px-4 py-3 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border last:border-b-0">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LogoTile({ className, invert, caption }: { className: string; invert?: boolean; caption: ReactNode }) {
  return (
    <figure className={cn("flex flex-col justify-between gap-12 rounded-lg p-8", className)}>
      <Image
        src="/assets/tesla-logo.svg"
        alt="Tesla"
        width={160}
        height={17}
        className={cn("h-auto w-[160px]", invert && "brightness-0 invert")}
      />
      <figcaption className="text-small">{caption}</figcaption>
    </figure>
  );
}

function Specimen({ label, meta, children }: { label: string; meta: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      {children}
      <p className="text-small opacity-60">
        {label} — {meta}
      </p>
    </div>
  );
}

function StrokeTile({ title, meta, children }: { title: string; meta: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-6 rounded-lg bg-foreground p-8 max-md:p-6">
      <div className="flex min-h-12 items-center">{children}</div>
      <div className="flex flex-col gap-0.5 text-small">
        <span className="font-semibold">{title}</span>
        <span className="opacity-60">{meta}</span>
      </div>
    </div>
  );
}

function OverlayTile({ title, meta, className }: { title: string; meta: string; className?: string }) {
  return (
    <div
      className={cn(
        "relative flex aspect-[4/3] items-end overflow-hidden rounded-lg p-6 text-white after:absolute after:inset-0",
        className,
      )}
    >
      <Image src="/assets/model3/meet-design.webp" alt="" fill sizes="(max-width: 767px) 100vw, 320px" className="object-cover" />
      <div className="relative z-[1] flex flex-col gap-0.5">
        <span className="font-semibold">{title}</span>
        <span className="text-small">{meta}</span>
      </div>
    </div>
  );
}
