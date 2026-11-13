import type { ReactNode } from "react";
import type { SpecGroupData } from "@/components/sections/SpecsSection";

/** Model 3 болон Model Y-д давтагддаг үзүүлэлтийн бүлгүүдийг үүсгэх туслахууд */

export const powertrain = (range: string, acceleration: ReactNode, drive: string, accelerationLabel: ReactNode = "Хурдатгал"): SpecGroupData => ({
  title: "Хөтлөгч",
  items: [
    { label: "Явах зай (EPA тооцоо)", value: range },
    { label: accelerationLabel, value: acceleration },
    { label: "Хөтлөгч", value: drive },
  ],
});

type Dimensions = {
  weight: string;
  cargo: ReactNode;
  wheels: string;
  seating: string;
  display: ReactNode;
  clearance: string;
  width: [string, string];
  height: string;
  length: string;
};

export const dimensions = (d: Dimensions): SpecGroupData => ({
  title: "Хэмжээс",
  items: [
    { label: "Жин (хоосон)", value: d.weight },
    { label: "Ачааны багтаамж", value: d.cargo },
    { label: "Обуд", value: d.wheels },
    { label: "Суудал", value: d.seating },
    { label: "Дэлгэц", value: d.display },
    { label: "Газраас өндөр", value: d.clearance },
    {
      label: "Нийт өргөн",
      value: (
        <>
          Толь эвхсэн: {d.width[0]}
          <br />
          Толь дэлгэсэн: {d.width[1]}
        </>
      ),
    },
    { label: "Нийт өндөр", value: d.height },
    { label: "Нийт урт", value: d.length },
  ],
});

export const charging = (power: string, speed: ReactNode, speedLabel: ReactNode = "Цэнэглэх хурд"): SpecGroupData => ({
  title: "Цэнэглэлт",
  items: [
    { label: "Supercharging дээд хүч / Төлбөр", value: `${power}; Хэрэглэсэн хэмжээгээр` },
    { label: speedLabel, value: speed },
  ],
});

export const warranty = (batteryMiles: string): SpecGroupData => ({
  title: "Баталгаа",
  items: [
    { label: "Үндсэн баталгаа", value: "4 жил эсвэл 50,000 миль (аль түрүүлж хүрсэн нь)" },
    { label: "Батерей ба хөтлөгч нэгж", value: `8 жил эсвэл ${batteryMiles} миль (аль түрүүлж хүрсэн нь)` },
  ],
});

/** Хоёр мөр дэлгэцийн тайлбар */
export const twoLines = (first: string, second: string) => (
  <>
    {first}
    <br />
    {second}
  </>
);
