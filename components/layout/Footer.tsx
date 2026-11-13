import Link from "next/link";
import { footerLinks, legalLinks } from "@/data/navigation";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="px-page py-section-md">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-20">
        <div className="flex w-full max-w-[480px] flex-col items-center gap-8">
          <Logo />
          <nav aria-label="Доод цэс" className="flex flex-wrap justify-center gap-8 text-small font-semibold">
            {footerLinks.map((link) => (
              <Link key={link.label} href={link.href} className="hover:opacity-70">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex w-full flex-col gap-8">
          <hr className="h-px border-0 bg-border" />
          <div className="flex justify-between gap-6 text-small max-md:flex-col-reverse max-md:items-center">
            <p>Tesla © 2026</p>
            <div className="flex gap-6 max-md:flex-wrap max-md:justify-center">
              {legalLinks.map((link) => (
                <Link key={link.label} href={link.href} className="underline hover:opacity-70">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
