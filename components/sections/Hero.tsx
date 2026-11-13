import Image from "next/image";
import type { ReactNode } from "react";
import { Actions } from "@/components/ui/Actions";
import { cn } from "@/lib/cn";

type HeroProps = {
  image: string;
  alt?: string;
  title: ReactNode;
  /** Хуудасны эхний hero нь h1, төгсгөлийн CTA нь h2 */
  as?: "h1" | "h2";
  description?: ReactNode;
  actions?: ReactNode;
  /** `end` нь хуудасны төгсгөлийн, намхан hero */
  variant?: "default" | "end";
};

export function Hero({ image, alt = "", title, as: Heading = "h1", description, actions, variant = "default" }: HeroProps) {
  const isFirst = variant === "default";

  return (
    <section
      className={cn(
        "relative flex items-center justify-center overflow-hidden px-page text-center text-white",
        "after:absolute after:inset-0 after:bg-overlay",
        isFirst ? "h-[900px] max-lg:h-[720px] max-md:h-[600px]" : "h-[720px] max-lg:h-[600px] max-md:h-[520px]",
      )}
    >
      <Image src={image} alt={alt} fill preload={isFirst} sizes="100vw" className="object-cover" />
      <div className="relative z-[1] flex max-w-[768px] flex-col items-center gap-6">
        <Heading className="text-h1">{title}</Heading>
        {description && <p className="text-medium">{description}</p>}
        {actions && <Actions className="mt-2 justify-center">{actions}</Actions>}
      </div>
    </section>
  );
}
