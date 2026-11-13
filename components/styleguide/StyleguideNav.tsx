"use client";

import { useEffect, useState } from "react";
import { sgSections } from "@/data/styleguide";
import { cn } from "@/lib/cn";

/** Хажуугийн дугаарласан цэс: дэлгэцэнд байгаа хэсгийг тодруулна. ≤991px үед хэвтээ гүйлгэх мөр болно. */
export function StyleguideNav() {
  const [active, setActive] = useState<string>(sgSections[0].id);

  useEffect(() => {
    const targets = sgSections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Styleguide-ийн хэсгүүд"
      className={cn(
        "lg:sticky lg:top-8 lg:self-start",
        "max-lg:sticky max-lg:top-0 max-lg:z-[5] max-lg:-mx-page max-lg:border-b max-lg:border-border max-lg:bg-background/95 max-lg:px-page max-lg:backdrop-blur",
      )}
    >
      <ol className="flex flex-col gap-0.5 max-lg:flex-row max-lg:gap-1 max-lg:overflow-x-auto max-lg:py-3 max-lg:[scrollbar-width:none]">
        {sgSections.map((s, i) => {
          const isActive = s.id === active;
          return (
            <li key={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "focus-ring flex items-baseline gap-3 rounded-button px-3 py-1.5 text-small transition-colors duration-200",
                  isActive ? "bg-foreground font-medium shadow-[0_1px_3px_rgb(1_5_8/0.12)]" : "opacity-60 hover:opacity-100",
                )}
              >
                <span className="font-alt tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="whitespace-nowrap">{s.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
