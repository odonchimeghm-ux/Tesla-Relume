import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type StatData = {
  /** Том тоо (жишээ нь "39,589"). Байхгүй бол гарчиг + тайлбар хэлбэрээр харагдана */
  value?: ReactNode;
  label: ReactNode;
  /** Гарчгийн доорх тайлбар */
  text?: ReactNode;
  /** `md` нь хагас өргөнтэй картад тохирох жижиг хэмжээ (h2-той ижил) */
  size?: "lg" | "md";
};

/**
 * Зүүн талдаа зураастай үзүүлэлт.
 * Gestalt — Similarity: сайтын бүх тоон үзүүлэлт энэ нэг хэлбэрээр (font-alt, bold, зүүн зураас) харагдана.
 */
export function Stat({ value, label, text, size = "lg" }: StatData) {
  return (
    <div className="flex flex-col gap-2 border-l border-border pl-8">
      {value !== undefined && (
        <p
          className={cn(
            "font-alt font-bold",
            size === "md" ? "text-h2" : "text-[80px] leading-[1.3] max-lg:text-[64px] max-md:text-[56px]",
          )}
        >
          {value}
        </p>
      )}
      {text ? <h3 className="text-h6">{label}</h3> : <p className="text-h6">{label}</p>}
      {text && <p className="opacity-80">{text}</p>}
    </div>
  );
}
