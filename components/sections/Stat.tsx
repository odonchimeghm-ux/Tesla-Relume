import type { ReactNode } from "react";

export type StatData = {
  /** Том тоо (жишээ нь "39,589"). Байхгүй бол гарчиг + тайлбар хэлбэрээр харагдана */
  value?: ReactNode;
  label: ReactNode;
  /** Гарчгийн доорх тайлбар */
  text?: ReactNode;
};

/** Зүүн талдаа зураастай үзүүлэлт */
export function Stat({ value, label, text }: StatData) {
  return (
    <div className="flex flex-col gap-2 border-l border-border pl-8">
      {value !== undefined && (
        <p className="font-alt text-[80px] leading-[1.3] font-bold max-lg:text-[64px] max-md:text-[56px]">{value}</p>
      )}
      {text ? <h3 className="text-h6">{label}</h3> : <p className="text-h6">{label}</p>}
      {text && <p className="opacity-80">{text}</p>}
    </div>
  );
}
