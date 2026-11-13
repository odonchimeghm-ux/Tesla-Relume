"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { mainLinks } from "@/data/navigation";
import { cn } from "@/lib/cn";
import { Logo } from "./Logo";
import { MegaMenu } from "./MegaMenu";

const linkClass =
  "focus-ring inline-flex items-center gap-1 whitespace-nowrap text-regular hover:opacity-70";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Хуудас солигдоход цэсийг хаана
  useEffect(() => setOpen(false), [pathname]);

  // Гадна дарах эсвэл Escape дарахад цэсийг хаана
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!menuRef.current?.contains(target) && !toggleRef.current?.contains(target)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="relative z-10 border-b border-border bg-background">
      <div className="flex min-h-[72px] items-center justify-between gap-4 px-page max-lg:flex-wrap max-lg:py-3">
        <div className="flex items-center gap-6 max-lg:flex-wrap max-lg:gap-y-2">
          <Logo />
          <nav
            aria-label="Үндсэн цэс"
            className="flex items-center gap-8 max-lg:gap-6 max-md:flex-wrap max-md:gap-x-4 max-md:gap-y-1"
          >
            {mainLinks.map((link) => {
              const active = link.href === pathname;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(linkClass, active && "font-semibold")}
                >
                  {link.label}
                </Link>
              );
            })}
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls="mega-menu"
              onClick={() => setOpen((o) => !o)}
              className={linkClass}
            >
              Бусад
              <Image
                src="/assets/chevron-down.svg"
                alt=""
                width={24}
                height={24}
                className={cn("transition-transform duration-200", open && "rotate-180")}
              />
            </button>
          </nav>
        </div>
        <div className="flex items-center gap-4 max-md:gap-2">
          <Button href="#" variant="secondary" size="sm">
            Захиалах
          </Button>
          <Button href="#" variant="primary" size="sm">
            Цаг авах
          </Button>
        </div>
      </div>

      <MegaMenu ref={menuRef} id="mega-menu" open={open} />
    </header>
  );
}
