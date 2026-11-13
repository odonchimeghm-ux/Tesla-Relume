import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionProps = {
  id?: string;
  /** Дотор талын элементүүдийг 80px зайтай багана болгон байрлуулна */
  stack?: boolean;
  /** Дээд талын padding-гүй (жишээ нь зүүлт тайлбар) */
  tight?: boolean;
  className?: string;
  children: ReactNode;
};

/** Хуудасны нэг хэсэг: гадна padding + 1280px контейнер */
export function Section({ id, stack = false, tight = false, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("overflow-hidden px-page py-section", tight && "pt-0", className)}>
      <div className={cn("mx-auto w-full max-w-[1280px]", stack && "flex flex-col gap-20")}>{children}</div>
    </section>
  );
}
