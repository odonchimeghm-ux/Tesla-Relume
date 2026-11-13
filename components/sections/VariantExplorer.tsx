import Image from "next/image";
import type { ReactNode } from "react";
import { Actions } from "@/components/ui/Actions";
import { Tabs } from "@/components/ui/Tabs";

export type VariantData = {
  id: string;
  /** Tab дээрх богино нэр */
  tab: string;
  name: string;
  subtitle: ReactNode;
  image: string;
  alt: string;
  stats: { label: ReactNode; value: string; unit?: string }[];
  note?: string;
};

type VariantExplorerProps = {
  ariaLabel: string;
  variants: VariantData[];
  actions: ReactNode;
};

/** Хувилбаруудыг tab-аар сольж харуулах карт */
export function VariantExplorer({ ariaLabel, variants, actions }: VariantExplorerProps) {
  return (
    <Tabs
      idPrefix="variant"
      ariaLabel={ariaLabel}
      className="flex flex-col gap-8 overflow-hidden rounded-lg bg-foreground p-12 max-md:p-6"
      panelClassName="flex flex-col gap-8"
      footer={<Actions>{actions}</Actions>}
      items={variants.map((v) => ({
        id: v.id,
        label: v.tab,
        content: (
          <>
            <div className="relative aspect-[2.4/1] w-full overflow-hidden rounded-lg bg-variant-img max-md:aspect-video">
              <Image src={v.image} alt={v.alt} fill sizes="(max-width: 1376px) 100vw, 1184px" className="object-cover" />
            </div>
            <div className="flex flex-wrap items-end justify-between gap-8">
              <div>
                <h3 className="mb-2 text-[32px] leading-[1.2] font-medium">{v.name}</h3>
                <p>{v.subtitle}</p>
              </div>
              <dl className="flex gap-12 max-lg:gap-8 max-md:flex-wrap max-md:gap-6">
                {v.stats.map((stat, j) => (
                  <div key={j} className="flex flex-col-reverse gap-1">
                    <dt className="text-small opacity-70">{stat.label}</dt>
                    <dd className="text-[40px] leading-[1.2] font-medium max-md:text-[32px]">
                      {stat.value}
                      {stat.unit && <span className="ml-1 text-medium">{stat.unit}</span>}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            {v.note && <p className="text-small opacity-70">{v.note}</p>}
          </>
        ),
      }))}
    />
  );
}
