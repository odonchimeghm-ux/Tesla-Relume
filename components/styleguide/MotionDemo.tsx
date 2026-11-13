"use client";

import Image from "next/image";
import { useState } from "react";
import type { MotionItem } from "@/data/styleguide";
import { cn } from "@/lib/cn";

/** Хөдөлгөөн бүрийн жижиг, бодит ажилладаг жишээ */
export function MotionDemo({ demo }: { demo: MotionItem["demo"] }) {
  const [on, setOn] = useState(false);

  switch (demo) {
    case "button":
      return (
        <span className="inline-flex rounded-button border border-primary bg-primary px-5 py-2 font-medium text-white transition-colors duration-200 hover:border-primary-hover hover:bg-primary-hover">
          Hover хийх
        </span>
      );
    case "link":
      return (
        <span className="group inline-flex items-center gap-2 font-medium">
          Дэлгэрэнгүй
          <Image
            src="/assets/chevron-right.svg"
            alt=""
            width={24}
            height={24}
            className="transition-transform duration-200 group-hover:translate-x-[3px]"
          />
        </span>
      );
    case "chevron":
      return (
        <button
          type="button"
          aria-pressed={on}
          onClick={() => setOn((v) => !v)}
          className="focus-ring inline-flex items-center gap-1 rounded-button bg-neutral-5 px-4 py-2 font-medium hover:bg-neutral-10"
        >
          Бусад
          <Image
            src="/assets/chevron-down.svg"
            alt=""
            width={24}
            height={24}
            className={cn("transition-transform duration-200", on && "rotate-180")}
          />
        </button>
      );
    case "slider":
      return (
        <button
          type="button"
          onClick={() => setOn((v) => !v)}
          aria-label="Slider-ийн шилжилтийг тоглуулах"
          className="focus-ring w-40 overflow-hidden rounded-lg bg-neutral-5 p-2"
        >
          <span
            className="flex gap-2 transition-transform duration-500 ease-in-out"
            style={{ transform: on ? "translateX(-72px)" : "translateX(0)" }}
          >
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="h-12 w-16 shrink-0 rounded bg-ink" style={{ opacity: 0.25 + i * 0.2 }} />
            ))}
          </span>
        </button>
      );
    case "opacity":
      return <span className="cursor-default font-semibold hover:opacity-70">Model 3</span>;
    case "disabled":
      return (
        <button
          type="button"
          aria-pressed={on}
          aria-label="Идэвхгүй төлөвийг солих"
          onClick={() => setOn((v) => !v)}
          className={cn(
            "focus-ring flex items-center justify-center rounded border border-background bg-foreground p-3 transition-opacity duration-200",
            on && "opacity-40",
          )}
        >
          <Image src="/assets/arrow-forward.svg" alt="" width={24} height={24} />
        </button>
      );
  }
}
