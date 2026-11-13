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
  return (
    <div className={cn("flex flex-col", narrow ? "max-w-[768px] gap-6" : "gap-4", className)}>
      {tagline && <p className="font-semibold">{tagline}</p>}
      <div className="flex flex-col gap-6">
        <Heading className="text-h2">{title}</Heading>
        {description && <p className="text-medium">{description}</p>}
        {children}
      </div>
      {actions}
    </div>
  );
}
