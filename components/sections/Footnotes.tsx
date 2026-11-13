import type { ReactNode } from "react";
import { Section } from "@/components/ui/Section";

/** Хуудасны доод хэсгийн зүүлт тайлбарууд */
export function Footnotes({ notes }: { notes: ReactNode[] }) {
  return (
    <Section tight>
      <div className="flex max-w-[960px] flex-col gap-2 text-[12px] text-ink/60">
        {notes.map((note, i) => (
          <p key={i}>{note}</p>
        ))}
      </div>
    </Section>
  );
}
