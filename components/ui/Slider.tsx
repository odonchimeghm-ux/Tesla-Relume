"use client";

import Image from "next/image";
import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type SliderProps = {
  children: ReactNode;
  /** Зүүн доод буланд байрлалын цэгүүдийг харуулна */
  dots?: boolean;
  /** Слайд ба удирдлагын хоорондох зай: md = 32px, lg = 48px */
  spacing?: "md" | "lg";
  className?: string;
};

export function Slider({ children, dots = false, spacing = "md", className }: SliderProps) {
  const slides = Children.toArray(children);
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [metrics, setMetrics] = useState({ step: 0, maxIndex: slides.length - 1 });

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    const measure = () => {
      const first = track.firstElementChild;
      if (!first) return;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      const step = first.getBoundingClientRect().width + gap;
      const visible = Math.max(1, Math.floor((root.clientWidth + gap) / step));
      setMetrics({ step, maxIndex: Math.max(0, track.children.length - visible) });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  // Цонхны хэмжээ өөрчлөгдөхөд индекс хязгаараас гарахгүй байлгана
  const current = Math.min(index, metrics.maxIndex);
  const goTo = (i: number) => setIndex(Math.min(Math.max(i, 0), metrics.maxIndex));

  return (
    <div ref={rootRef} className={cn("flex flex-col", spacing === "lg" ? "gap-12" : "gap-8", className)}>
      <div
        ref={trackRef}
        className="flex gap-8 transition-transform duration-500 ease-in-out will-change-transform"
        style={{ transform: `translateX(${-current * metrics.step}px)` }}
      >
        {slides}
      </div>

      <div className={cn("flex items-center", dots ? "justify-between" : "justify-end")}>
        {dots && (
          <div className="flex gap-2">
            {Array.from({ length: metrics.maxIndex + 1 }, (_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`${i + 1}-р слайд`}
                aria-current={i === current}
                onClick={() => goTo(i)}
                className={cn(
                  "focus-ring size-2 rounded-full bg-ink transition-opacity",
                  i === current ? "opacity-100" : "opacity-20",
                )}
              />
            ))}
          </div>
        )}
        <div className="flex gap-4">
          <SliderArrow direction="prev" disabled={current === 0} onClick={() => goTo(current - 1)} />
          <SliderArrow direction="next" disabled={current === metrics.maxIndex} onClick={() => goTo(current + 1)} />
        </div>
      </div>
    </div>
  );
}

function SliderArrow({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "Өмнөх" : "Дараах"}
      disabled={disabled}
      onClick={onClick}
      className="focus-ring flex items-center justify-center rounded border border-background bg-foreground p-3 transition-opacity duration-200 disabled:cursor-default disabled:opacity-40"
    >
      <Image
        src={direction === "prev" ? "/assets/arrow-back.svg" : "/assets/arrow-forward.svg"}
        alt=""
        width={24}
        height={24}
      />
    </button>
  );
}
