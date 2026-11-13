/**
 * /styleguide хуудасны өгөгдөл. Утгууд нь app/globals.css-ийн @theme токенуудтай таарна:
 * токен өөрчлөгдвөл энд мөн шинэчилнэ.
 */

export const sgSections = [
  { id: "principles", label: "Зарчим" },
  { id: "brand", label: "Брэнд" },
  { id: "color", label: "Өнгө" },
  { id: "type", label: "Үсэг" },
  { id: "spacing", label: "Зай" },
  { id: "shape", label: "Хэлбэр" },
  { id: "stroke", label: "Шугам" },
  { id: "shade", label: "Сүүдэр, бүрхүүл" },
  { id: "icons", label: "Дүрс" },
  { id: "components", label: "Компонент" },
  { id: "sections", label: "Хэсгүүд" },
  { id: "motion", label: "Хөдөлгөөн" },
] as const;

export const principles = [
  {
    title: "Саарал суурь, цагаан карт",
    text: "#f2f2f2 дэвсгэр дээр цагаан карт, бараан бэх. Тод өнгийг зөвхөн гол үйлдэлд хэрэглэнэ.",
  },
  {
    title: "Нэг sans гэр бүл",
    text: "Гарчиг, бичвэр, товч бүгд Inter. Roboto-г зөвхөн том тоо болон ишлэлд хэрэглэнэ.",
  },
  {
    title: "Зураг бол гол дүр",
    text: "Бүтэн өргөнтэй зураг дээр 40% бүрхүүл, цагаан бичвэр. Чимэглэл биш, машин өөрөө ярина.",
  },
  {
    title: "Токеноор зай",
    text: "Хуудасны болон хэсгийн зай px-page, py-section токеноос. Breakpoint бүрт өөрөө багасна.",
  },
];

export type ColorToken = {
  name: string;
  value: string;
  usage: string;
  /** Тунгалаг өнгө: swatch-ийг шатрын дэвсгэр дээр харуулна */
  alpha?: boolean;
};

export const solidColors: ColorToken[] = [
  { name: "--color-background", value: "#f2f2f2", usage: "Хуудасны дэвсгэр, header" },
  { name: "--color-foreground", value: "#ffffff", usage: "Карт, slider-ийн сум" },
  { name: "--color-ink", value: "#010508", usage: "Үндсэн бичвэр, гарчиг" },
  { name: "--color-primary", value: "#8b2e23", usage: "Гол үйлдлийн товч, focus ring" },
  { name: "--color-primary-hover", value: "#6e231b", usage: "Гол товчны hover" },
  { name: "--color-specs", value: "#171a20", usage: "Техникийн үзүүлэлтийн бараан хэсэг, лого" },
  { name: "--color-variant-img", value: "#f4f4f4", usage: "Хувилбарын зургийн дэвсгэр" },
];

export const alphaColors: ColorToken[] = [
  { name: "--color-border", value: "rgb(1 5 8 / 0.15)", usage: "Hairline, Stat-ийн зураас", alpha: true },
  { name: "--color-neutral-5", value: "rgb(1 5 8 / 0.05)", usage: "Secondary товч, tab-ын суурь", alpha: true },
  { name: "--color-neutral-10", value: "rgb(1 5 8 / 0.1)", usage: "Secondary товчны hover", alpha: true },
  { name: "--color-overlay", value: "rgb(0 0 0 / 0.4)", usage: "Hero, ModelCard зураг дээрх бүрхүүл", alpha: true },
];

/** Цайвар (үндсэн) ба бараан (specs) гадаргуу дээрх семантик хэрэглээ */
export const surfaceRoles = [
  { role: "Дэвсгэр", light: "background #f2f2f2", dark: "specs #171a20" },
  { role: "Бичвэр", light: "ink #010508", dark: "white" },
  { role: "Гол товч", light: "primary", dark: "primary" },
  { role: "Хоёрдогч товч", light: "neutral-5 → neutral-10", dark: "white/18 → white/28" },
  { role: "Tab-ын суурь", light: "neutral-5", dark: "white/8" },
  { role: "Сонгосон tab", light: "foreground + сүүдэр", dark: "white/18" },
  { role: "Link товчны сум", light: "ink", dark: "invert" },
];

export const fontFamilies = [
  {
    name: "Sans",
    family: "Inter",
    variable: "--font-sans",
    weights: "400 · 500 · 600",
    usage: "Гарчиг h1–h6, бичвэр, товч, цэс. Сайтын үндсэн үсэг.",
    className: "font-sans",
  },
  {
    name: "Alt",
    family: "Roboto",
    variable: "--font-alt",
    weights: "400 · 700",
    usage: "Stat-ийн том тоо, ModelCard-ийн ишлэл.",
    className: "font-alt",
  },
];

/** Утгууд: [≥992px, 768–991px, ≤767px] */
export const typeScale = [
  { token: "--text-h1", sizes: ["72px", "56px", "40px"], meta: "500 · 1.2 · -0.01em", className: "text-h1", usage: "Hero гарчиг" },
  { token: "--text-h2", sizes: ["52px", "44px", "36px"], meta: "500 · 1.2 · -0.01em", className: "text-h2", usage: "Хэсгийн гарчиг" },
  { token: "--text-h6", sizes: ["22px", "22px", "22px"], meta: "500 · 1.4 · -0.01em", className: "text-h6", usage: "Картын гарчиг" },
  { token: "--text-medium", sizes: ["18px", "18px", "16px"], meta: "400 · 1.5", className: "text-medium", usage: "Lead, hero тайлбар" },
  { token: "--text-regular", sizes: ["16px", "16px", "16px"], meta: "400 · 1.5", className: "text-regular", usage: "Бичвэр, товч" },
  { token: "--text-small", sizes: ["14px", "14px", "14px"], meta: "400 · 1.5", className: "text-small", usage: "Footer, зүүлт тайлбар" },
];

export const breakpoints = ["≥992px", "768–991px", "≤767px"];

export const spacingTokens = [
  { token: "--spacing-page", values: ["64px", "32px", "20px"], usage: "Хуудасны хажуугийн зай (px-page)" },
  { token: "--spacing-section", values: ["112px", "80px", "64px"], usage: "Хэсгийн дээд, доод зай (py-section)" },
  { token: "--spacing-section-md", values: ["80px", "64px", "48px"], usage: "Footer-ийн зай (py-section-md)" },
];

/** Компонентууд дотор хэрэглэгддэг Tailwind gap/padding шатлал */
export const spacingScale = [
  { cls: "1", px: 4 },
  { cls: "2", px: 8 },
  { cls: "3", px: 12 },
  { cls: "4", px: 16 },
  { cls: "6", px: 24 },
  { cls: "8", px: 32 },
  { cls: "12", px: 48 },
  { cls: "20", px: 80 },
];

export const layoutTokens = [
  { name: "Контейнер", value: "1280px", usage: "Section-ийн агуулгын дээд өргөн" },
  { name: "Нарийн гарчиг", value: "768px", usage: "SectionTitle narrow, hero бичвэр" },
  { name: "Header", value: "72px", usage: "Navbar-ийн хамгийн бага өндөр" },
  { name: "Hero", value: "900 / 720 / 600px", usage: "Нүүрний hero-ийн өндөр (end: 720 / 600 / 520)" },
];

export const radii = [
  { token: "rounded", value: "4px", usage: "Slider-ийн сум", className: "rounded" },
  { token: "--radius-button", value: "6px", usage: "Товч, tab", className: "rounded-button" },
  { token: "rounded-lg", value: "8px", usage: "Карт, зураг, tab-ын жагсаалт, specs", className: "rounded-lg" },
  { token: "rounded-full", value: "50%", usage: "Slider-ийн цэг", className: "rounded-full" },
  { token: "0", value: "0", usage: "Бүтэн өргөнтэй hero", className: "rounded-none" },
];

export const icons = [
  { file: "arrow-back.svg", size: 24, usage: "Slider: өмнөх" },
  { file: "arrow-forward.svg", size: 24, usage: "Slider: дараах" },
  { file: "chevron-right.svg", size: 24, usage: "Link товч" },
  { file: "chevron-down.svg", size: 24, usage: "\"Бусад\" цэс" },
  { file: "play-button.svg", size: 64, usage: "Видео тоглуулах" },
  { file: "relume-icon.svg", size: 24, usage: "Mega menu-ийн жагсаалт" },
];

export const sectionInventory = [
  { name: "Hero", file: "sections/Hero.tsx", pages: "Нүүр, Model 3, Model Y", note: "Бүтэн өргөн зураг + 40% overlay. variant=\"end\" нь төгсгөлийн CTA." },
  { name: "VariantExplorer", file: "sections/VariantExplorer.tsx", pages: "Model 3, Model Y", note: "Tabs-аар хувилбар сольж, зураг ба үзүүлэлтийг харуулна." },
  { name: "SpecsSection", file: "sections/SpecsSection.tsx", pages: "Model 3, Model Y", note: "Бараан (specs) дэвсгэртэй, tone=\"dark\" Tabs. #specs холбоосоор хүрнэ." },
  { name: "SplitCard", file: "sections/SplitCard.tsx", pages: "Model 3, Model Y", note: "Хоёр баганат текст карт (Powershare)." },
  { name: "Footnotes", file: "sections/Footnotes.tsx", pages: "Model 3, Model Y", note: "Дугаарласан зүүлт тайлбар, text-small." },
  { name: "FeatureSection · ChargeSection · StatsSection", file: "home/*.tsx", pages: "Нүүр", note: "Нүүр хуудасны тусгай хэсгүүд." },
  { name: "Navbar · MegaMenu", file: "layout/Navbar.tsx", pages: "Бүх хуудас", note: "Hairline-тай саарал header, \"Бусад\" дарахад mega menu нээгдэнэ." },
  { name: "Footer", file: "layout/Footer.tsx", pages: "Бүх хуудас", note: "Төвлөрсөн лого, холбоосууд, hairline, хуулийн холбоос." },
];

export type MotionItem = {
  name: string;
  slug: string;
  kind: "Hover" | "Шилжилт" | "Төлөв" | "Дарах хариу";
  description: string;
  where: string;
  spec: string;
  demo: "button" | "link" | "chevron" | "slider" | "opacity" | "disabled";
};

export const motions: MotionItem[] = [
  {
    name: "Товчны өнгө",
    slug: "button-color",
    kind: "Hover",
    description: "Заагч очиход товчны дэвсгэр бараан болно.",
    where: "ui/Button.tsx",
    spec: "background, border · 200ms · ease",
    demo: "button",
  },
  {
    name: "Link сум урагшлах",
    slug: "link-nudge",
    kind: "Hover",
    description: "Link товчны chevron 3px баруун тийш гулсана.",
    where: "ui/Button.tsx",
    spec: "translateX(0 → 3px) · 200ms · ease",
    demo: "link",
  },
  {
    name: "Цэсний chevron эргэх",
    slug: "menu-chevron",
    kind: "Төлөв",
    description: "\"Бусад\" цэс нээгдэхэд chevron 180° эргэнэ.",
    where: "layout/Navbar.tsx",
    spec: "rotate(0 → 180deg) · 200ms · ease",
    demo: "chevron",
  },
  {
    name: "Slider гүйлгэх",
    slug: "slider-track",
    kind: "Шилжилт",
    description: "Сум, цэг дарахад карт нэг алхмаар гулсана.",
    where: "ui/Slider.tsx",
    spec: "translateX · 500ms · ease-in-out",
    demo: "slider",
  },
  {
    name: "Холбоосны бүдгэрэлт",
    slug: "link-dim",
    kind: "Hover",
    description: "Цэс, footer-ийн холбоос заагч очиход 70% болно.",
    where: "layout/Navbar.tsx, layout/Footer.tsx",
    spec: "opacity 1 → 0.7 · шууд",
    demo: "opacity",
  },
  {
    name: "Идэвхгүй сум",
    slug: "arrow-disabled",
    kind: "Төлөв",
    description: "Slider эхэнд, төгсгөлд хүрэхэд сум 40% болж идэвхгүй болно.",
    where: "ui/Slider.tsx",
    spec: "opacity 1 → 0.4 · 200ms",
    demo: "disabled",
  },
];
