import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "on-dark" | "link";

type ButtonProps = {
  href: string;
  variant?: ButtonVariant;
  size?: "md" | "sm";
  /** Зөвхөн `link` хувилбарт: бараан дэвсгэр дээрх цагаан өнгө */
  light?: boolean;
  className?: string;
  children: ReactNode;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-primary bg-primary text-white hover:border-primary-hover hover:bg-primary-hover",
  secondary: "bg-neutral-5 text-ink hover:bg-neutral-10",
  "on-dark": "bg-white/18 text-white hover:bg-white/28",
  link: "group border-0 text-ink",
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  light = false,
  className,
  children,
}: ButtonProps) {
  const isLink = variant === "link";
  const padding = isLink ? (size === "sm" ? "py-1" : "p-0") : size === "sm" ? "px-5 py-2" : "px-6 py-2.5";

  return (
    <Link
      href={href}
      className={cn(
        "focus-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-button border border-transparent text-regular font-medium transition-colors duration-200",
        padding,
        variants[variant],
        isLink && light && "text-white",
        className,
      )}
    >
      {children}
      {isLink && (
        <Image
          src="/assets/chevron-right.svg"
          alt=""
          width={24}
          height={24}
          className={cn("transition-transform duration-200 group-hover:translate-x-[3px]", light && "invert")}
        />
      )}
    </Link>
  );
}
