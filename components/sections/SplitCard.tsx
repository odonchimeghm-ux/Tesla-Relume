import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";

type SplitCardProps = {
  left: ReactNode;
  /** Баруун багана доод талдаа тулж байрлана */
  right: ReactNode;
};

/** Хоёр баганатай текст карт */
export function SplitCard({ left, right }: SplitCardProps) {
  return (
    <Card className="grid grid-cols-2 gap-16 p-12 max-lg:grid-cols-1 max-lg:gap-8 max-md:p-6">
      <div className="flex flex-col items-start gap-6">{left}</div>
      <div className="flex flex-col items-start justify-end gap-6">{right}</div>
    </Card>
  );
}
