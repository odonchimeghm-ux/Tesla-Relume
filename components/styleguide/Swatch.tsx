"use client";

import { useState } from "react";
import type { ColorToken } from "@/data/styleguide";
import { cn } from "@/lib/cn";

type SwatchProps = ColorToken & {
  /** Цагаан ба ink бичвэртэй тодролын харьцаа (зөвхөн тунгалаг биш өнгөнд) */
  ratios?: { white: number; ink: number };
};

const checker = {
  backgroundImage: "repeating-conic-gradient(#e2e2e2 0 25%, #ffffff 0 50%)",
  backgroundSize: "16px 16px",
};

/** Өнгөний дээж: дарахад токены нэрийг хуулна */
export function Swatch({ name, value, usage, alpha, ratios }: SwatchProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`var(${name})`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      // Clipboard хаалттай орчинд чимээгүй алгасна
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="focus-ring group flex flex-col overflow-hidden rounded-lg bg-foreground text-left"
    >
      <span className="relative block h-28 border-b border-border" style={alpha ? checker : undefined}>
        <span className="absolute inset-0" style={{ background: value }} />
        <span
          className={cn(
            "absolute top-3 right-3 rounded-button bg-foreground px-2 py-0.5 text-small transition-opacity duration-200",
            copied ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
          )}
        >
          {copied ? "Хуулсан" : "Хуулах"}
        </span>
      </span>
      <span className="flex flex-col gap-1 p-4">
        <code className="text-small font-medium">{name}</code>
        <span className="text-small opacity-60">{value}</span>
        <span className="text-small">{usage}</span>
        {ratios && (
          <span className="mt-1 flex gap-2 text-small">
            <Ratio label="Цагаан" value={ratios.white} />
            <Ratio label="Ink" value={ratios.ink} />
          </span>
        )}
      </span>
    </button>
  );
}

function Ratio({ label, value }: { label: string; value: number }) {
  const pass = value >= 4.5;
  return (
    <span className={cn("rounded-button px-1.5", pass ? "bg-neutral-5" : "opacity-40")}>
      {label} {value}:1
    </span>
  );
}
