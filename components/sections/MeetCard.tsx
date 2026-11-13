import Image from "next/image";
import { cn } from "@/lib/cn";

export type MeetCardData = { title: string; image: string };

/** Model хуудасны "танилцаарай" слайдерын карт */
export function MeetCard({ title, image }: MeetCardData) {
  return (
    <article
      className={cn(
        "relative flex h-[520px] max-w-full shrink-0 grow-0 basis-[400px] items-end overflow-hidden rounded-lg p-8 text-white",
        "after:absolute after:inset-0 after:bg-linear-to-t after:from-black/60 after:to-transparent after:to-50%",
        "max-md:h-[440px] max-md:basis-[85%] max-md:p-6",
      )}
    >
      <Image src={image} alt="" fill sizes="(max-width: 767px) 85vw, 400px" className="object-cover" />
      <h3 className="relative z-[1] text-h6">{title}</h3>
    </article>
  );
}
