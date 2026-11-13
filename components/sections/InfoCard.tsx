import Image from "next/image";
import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";

export type InfoCardData = {
  title: ReactNode;
  text: ReactNode;
  image?: string;
};

/** Гарчиг, тайлбар, (заавал биш) зурагтай жижиг карт */
export function InfoCard({ title, text, image }: InfoCardData) {
  return (
    <Card as="article" className={cn("flex flex-col", !image && "gap-3 p-8 max-md:p-6")}>
      {image ? (
        <>
          <div className="relative aspect-[4/3] w-full">
            <Image src={image} alt="" fill sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 420px" className="object-cover" />
          </div>
          <div className="flex flex-col gap-3 p-8 max-md:p-6">
            <h3 className="text-h6">{title}</h3>
            <p>{text}</p>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-h6">{title}</h3>
          <p>{text}</p>
        </>
      )}
    </Card>
  );
}
