import type { ModelCardData } from "@/components/sections/ModelCard";

const testimonial =
  '"Tesla-гаар зорчих бүр таатай байдаг. Чимээгүй, хурдан бөгөөд аюулгүй. Дахиж бензин машин руу буцахгүй гэдэгтээ итгэлтэй байна."';
const meta = "Албан тушаал, Компанийн нэр";
const image = "/assets/vehicle-card.png";

export const modelCards: ModelCardData[] = [
  { quote: "Урт тэнхлэгтэй, дунд оврын SUV", href: "/modely", name: "$61,990-оос эхэлнэ2", meta, image, logo: "/assets/card-logo-1.png" },
  { quote: "Model 3", href: "/model3", name: "$61,990-оос эхэлнэ2", meta, image, logo: "/assets/card-logo-2.png" },
  { quote: testimonial, name: "Овог Нэр", meta, image, logo: "/assets/card-logo-3.png" },
  { quote: testimonial, name: "Овог Нэр", meta, image, logo: "/assets/card-logo-4.svg" },
  { quote: testimonial, name: "Овог Нэр", meta, image, logo: "/assets/card-logo-5.svg" },
  { quote: testimonial, name: "Овог Нэр", meta, image, logo: "/assets/card-logo-4.svg" },
];

export const gallery: { src: string; alt: string }[] = [
  { src: "/assets/gallery-1.png", alt: "Дээвэр дээрх нарны хавтан" },
  { src: "/assets/gallery-2.png", alt: "" },
  { src: "/assets/gallery-3.png", alt: "" },
];
