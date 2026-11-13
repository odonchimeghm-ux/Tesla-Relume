import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ModelCardData = {
  /** Картын гол текст (загварын нэр эсвэл ишлэл) */
  quote: ReactNode;
  /** Өгвөл бүх карт энэ холбоос руу дарагдана */
  href?: string;
  name: string;
  meta: string;
  image: string;
  logo: string;
};

/** Нүүр хуудасны "Загварууд" слайдерын карт */
export function ModelCard({ quote, href, name, meta, image, logo }: ModelCardData) {
  return (
    <article
      className={cn(
        "relative flex h-[560px] max-w-full shrink-0 grow-0 basis-[608px] flex-col justify-end overflow-hidden rounded-lg p-8 text-white",
        "after:absolute after:inset-0 after:bg-overlay",
        "max-md:h-[480px] max-md:basis-full max-md:p-6",
      )}
    >
      <Image src={image} alt="" fill sizes="(max-width: 767px) 100vw, 608px" className="object-cover" />
      <div className="relative z-[1] flex flex-col gap-6">
        <p className="font-alt text-[18px]">
          {href ? (
            // ::before нь бүх картыг дарагддаг болгоно
            <Link href={href} className="before:absolute before:inset-0 before:z-[2] hover:underline">
              {quote}
            </Link>
          ) : (
            quote
          )}
        </p>
        <div className="flex items-end gap-6">
          <div className="min-w-0 flex-1">
            <p className="font-semibold">{name}</p>
            <p>{meta}</p>
          </div>
          <Image src={logo} alt="" width={120} height={48} className="h-12 w-[120px] shrink-0 object-cover" />
        </div>
      </div>
    </article>
  );
}
