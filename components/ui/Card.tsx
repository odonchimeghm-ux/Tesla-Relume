import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

/** Цагаан дэвсгэртэй, булан нь бөөрөнхий контейнер */
export function Card({ as: Tag = "div", className, children }: CardProps) {
  return <Tag className={cn("overflow-hidden rounded-lg bg-foreground", className)}>{children}</Tag>;
}
