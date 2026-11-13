import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionTitleProps = {
  tagline?: ReactNode;
  title: ReactNode;
  /** Гарчгийн HTML түвшин (харагдах байдал нь адилхан h2 хэмжээтэй) */
  as?: "h2" | "h3";
  /** `text-medium` хэмжээтэй тайлбар */
  description?: ReactNode;
  /** Тайлбарын дараах нэмэлт агуулга (олон догол мөр, дэд гарчиг гэх мэт) */
  children?: ReactNode;
  /** Гарчгийн доорх товчнууд */
  actions?: ReactNode;
  /** 768px өргөнтэй, 24px зайтай хувилбар */
  narrow?: boolean;
  className?: string;
};

export function SectionTitle({
  tagline,
  title,
  as: Heading = "h2",
  description,
  children,
  actions,
  narrow = false,
  className,
}: SectionTitleProps) {
  // Gestalt — Proximity: tagline↔гарчиг 12px < гарчиг↔тайлбар 16/24px < текст↔товч 32px
  return (
    <div className={cn("flex flex-col", narrow && "max-w-[768px]", className)}>
      <div className={cn("flex flex-col", narrow ? "gap-6" : "gap-4")}>
        <div className="flex flex-col gap-3">
          {tagline && <p className="font-semibold">{tagline}</p>}
          <Heading className="text-h2">{title}</Heading>
        </div>
        {description && <p className="text-medium">{description}</p>}
        {children}
      </div>
      {actions && <div className="mt-8">{actions}</div>}
    </div>
  );
}
