import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ActionsProps = {
  /** `lg` нь товчнуудын хоорондын зайг 24px болгоно */
  gap?: "md" | "lg";
  className?: string;
  children: ReactNode;
};

/** Товчнуудын бүлэг */
export function Actions({ gap = "md", className, children }: ActionsProps) {
  return (
    <div className={cn("flex flex-wrap items-center", gap === "lg" ? "gap-6" : "gap-4", className)}>
      {children}
    </div>
  );
}
