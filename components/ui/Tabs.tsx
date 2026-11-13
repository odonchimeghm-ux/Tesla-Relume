"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type TabItem = {
  id: string;
  label: string;
  content: ReactNode;
};

type TabsProps = {
  items: TabItem[];
  /** Tab болон panel-ийн id-д ашиглах угтвар (хуудсанд давхцахгүй байх ёстой) */
  idPrefix: string;
  ariaLabel: string;
  tone?: "light" | "dark";
  /** Өгвөл tab-уудын жагсаалттай нэг мөрөнд (баруун талд нь tab-ууд) харуулна */
  heading?: ReactNode;
  /** Panel-уудын доор харагдах агуулга (товчнууд гэх мэт) */
  footer?: ReactNode;
  className?: string;
  panelClassName?: string;
};

export function Tabs({
  items,
  idPrefix,
  ariaLabel,
  tone = "light",
  heading,
  footer,
  className,
  panelClassName,
}: TabsProps) {
  const [selected, setSelected] = useState(items[0]?.id);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const dark = tone === "dark";

  const onKeyDown = (e: KeyboardEvent, i: number) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (i + dir + items.length) % items.length;
    tabRefs.current[next]?.focus();
    setSelected(items[next].id);
  };

  const list = (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex gap-1 self-start rounded-lg p-1 max-md:w-full max-md:flex-wrap max-md:self-stretch",
        dark ? "bg-white/8" : "bg-neutral-5",
        items.length >= 4 && "max-md:grid max-md:grid-cols-2",
      )}
    >
      {items.map((item, i) => {
        const isSelected = item.id === selected;
        return (
          <button
            key={item.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${idPrefix}-tab-${item.id}`}
            aria-controls={`${idPrefix}-panel-${item.id}`}
            aria-selected={isSelected}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => setSelected(item.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cn(
              "focus-ring whitespace-nowrap rounded-button px-5 py-2 font-medium transition-colors duration-200 max-md:flex-1 max-md:px-3",
              isSelected && (dark ? "bg-white/18" : "bg-foreground shadow-[0_1px_3px_rgb(1_5_8/0.12)]"),
              !isSelected && (dark ? "hover:bg-white/8" : "hover:bg-neutral-5"),
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className={className}>
      {heading ? (
        <div className="flex flex-wrap items-center justify-between gap-6">
          {heading}
          {list}
        </div>
      ) : (
        list
      )}

      {items.map((item) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`${idPrefix}-panel-${item.id}`}
          aria-labelledby={`${idPrefix}-tab-${item.id}`}
          hidden={item.id !== selected}
          className={panelClassName}
        >
          {item.content}
        </div>
      ))}

      {footer}
    </div>
  );
}
