import Image from "next/image";
import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";

type CtaCardProps = {
  /** Зүүн (эсвэл `reverse` үед баруун) талын агуулга */
  children: ReactNode;
  /** Хагас өргөнтэй зураг */
  image?: { src: string; alt?: string };
  /** Зургийн оронд хоёр дахь агуулгын багана (жишээ нь статистик) */
  aside?: ReactNode;
  /** Хамгийн багадаа 560px өндөртэй */
  tall?: boolean;
  /** Зургийг зүүн талд байрлуулна */
  reverse?: boolean;
};

const contentClass =
  "flex min-w-0 shrink-0 grow-0 basis-1/2 flex-col justify-center gap-8 p-12 max-lg:flex-none max-md:p-6";

/** Нэг талдаа текст, нөгөө талдаа зурагтай карт */
export function CtaCard({ children, image, aside, tall = false, reverse = false }: CtaCardProps) {
  return (
    <Card
      className={cn(
        "flex items-center max-lg:h-auto max-lg:flex-col max-lg:items-stretch",
        tall && "min-h-[560px] max-lg:min-h-0",
        reverse && "flex-row-reverse",
      )}
    >
      <div className={contentClass}>{children}</div>
      {aside && <div className={cn(contentClass, "gap-12")}>{aside}</div>}
      {image && (
        <div className="relative min-w-0 shrink-0 grow-0 basis-1/2 self-stretch max-lg:aspect-[4/3] max-lg:flex-none">
          <Image src={image.src} alt={image.alt ?? ""} fill sizes="(max-width: 991px) 100vw, 640px" className="object-cover" />
        </div>
      )}
    </Card>
  );
}
