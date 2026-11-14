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
        {/* Uniform Connectedness: тусдаа цэгүүдийн оронд нэг шугамд холбогдсон хэсгүүд — бүгд нэг слайдерынх */}
        {dots && (
          <div className="flex items-center">
            {Array.from({ length: metrics.maxIndex + 1 }, (_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`${i + 1}-р слайд`}
                aria-current={i === current}
                onClick={() => goTo(i)}
                className="focus-ring group/seg py-3"
              >
                <span
                  className={cn(
                    "block h-1 w-8 transition-colors duration-200 max-md:w-6",
                    i === 0 && "rounded-l-full",
                    i === metrics.maxIndex && "rounded-r-full",
                    i === current ? "bg-ink" : "bg-ink/15 group-hover/seg:bg-ink/30",
                  )}
                />
              </button>
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
      // Prägnanz: үл харагдах хүрээг хасч, булангийн радиусыг товчнуудтай нэгтгэв (rounded-button)
      className="focus-ring flex items-center justify-center rounded-button bg-foreground p-3 transition-[opacity,background-color] duration-200 hover:bg-neutral-5 disabled:cursor-default disabled:bg-foreground disabled:opacity-40"
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
