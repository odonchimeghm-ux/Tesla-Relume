import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardGridProps = {
  cols?: 3 | 4;
  children: ReactNode;
};

/** 3 эсвэл 4 баганатай, дэлгэцийн хэмжээнд дасан зохицох grid */
export function CardGrid({ cols = 3, children }: CardGridProps) {
  return (
    <div
      className={cn(
        "grid gap-8 max-md:grid-cols-1",
        cols === 3 ? "grid-cols-3 max-lg:grid-cols-2" : "grid-cols-4 max-lg:grid-cols-2 max-lg:gap-y-12",
      )}
    >
      {children}
    </div>
  );
}
