import Image from "next/image";
import type { ReactNode } from "react";
import { Actions } from "@/components/ui/Actions";
import { Section } from "@/components/ui/Section";
import { Tabs } from "@/components/ui/Tabs";

export type SpecGroupData = {
  title: string;
  items: { label: ReactNode; value: ReactNode }[];
};

export type SpecVariantData = {
  id: string;
  tab: string;
  image: string;
  alt: string;
  groups: SpecGroupData[];
};

type SpecsSectionProps = {
  variants: SpecVariantData[];
  actions: ReactNode;
};

/** Бараан дэвсгэртэй техникийн үзүүлэлтийн хэсэг. `#specs` холбоосоор хүрнэ. */
export function SpecsSection({ variants, actions }: SpecsSectionProps) {
  return (
    <Section id="specs">
      <Tabs
        idPrefix="specs"
        ariaLabel="Үзүүлэлтийн хувилбар"
        tone="dark"
        heading={<h2 className="text-h2">Техникийн үзүүлэлт</h2>}
        className="flex flex-col gap-12 rounded-lg bg-specs p-12 text-white max-md:p-6"
        panelClassName="flex flex-col gap-12"
        footer={<Actions>{actions}</Actions>}
        items={variants.map((v) => ({
          id: v.id,
          label: v.tab,
          content: (
            <>
              <Image
                src={v.image}
                alt={v.alt}
                width={1920}
                height={702}
                sizes="(max-width: 1088px) 100vw, 960px"
                className="mx-auto h-auto w-full max-w-[960px]"
              />
              <div className="grid grid-cols-4 gap-12 max-lg:grid-cols-2 max-md:grid-cols-1">
                {v.groups.map((group) => (
                  <SpecGroup key={group.title} {...group} />
                ))}
              </div>
            </>
          ),
        }))}
      />
    </Section>
  );
}

function SpecGroup({ title, items }: SpecGroupData) {
  return (
    <div>
      <h3 className="mb-5 border-b border-white/20 pb-3 text-regular font-semibold">{title}</h3>
      <dl className="flex flex-col gap-4">
        {items.map((item, i) => (
          <div key={i}>
            <dt className="text-small opacity-65">{item.label}</dt>
            <dd className="font-medium">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
