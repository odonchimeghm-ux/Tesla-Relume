import { Stat } from "@/components/sections/Stat";
import { Actions } from "@/components/ui/Actions";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";

/** Цэнэглэх станцын тоон үзүүлэлт (Stats / 14) */
export function StatsSection() {
  return (
    <Section>
      <div className="flex items-center gap-20 max-lg:flex-col max-lg:items-stretch max-lg:gap-12">
        <div className="flex min-w-0 shrink grow-0 basis-[616px] flex-col gap-8 max-lg:flex-none">
          <SectionTitle
            tagline="Цэнэглэлт"
            title="Цэнэглэх цэгээ олоорой"
            description="Ойролцоох Tesla Supercharger болон Destination цэнэглэгчдийн сүлжээг үзээрэй."
          />
          <Actions gap="lg">
            <Button href="#" variant="secondary">
              Газрын зураг
            </Button>
            <Button href="#" variant="link">
              Дэлгэрэнгүй
            </Button>
          </Actions>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-12">
          <Stat value="39,589" label="Supercharger станц" />
          <Stat value="401" label="Destination цэнэглэгч" />
        </div>
      </div>
    </Section>
  );
}
