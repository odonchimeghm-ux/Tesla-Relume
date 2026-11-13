/** Админ хуудасны товч, input-ийн нийтлэг class-ууд (сайтын токенуудаар) */
const base =
  "focus-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-button font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40";

export const btn = {
  primary: `${base} border border-primary bg-primary px-5 py-2 text-white hover:border-primary-hover hover:bg-primary-hover`,
  secondary: `${base} bg-neutral-5 px-5 py-2 text-ink hover:bg-neutral-10`,
  small: `${base} bg-neutral-5 px-3 py-1.5 text-small text-ink hover:bg-neutral-10`,
  danger: `${base} px-3 py-1.5 text-small text-primary hover:bg-primary/8`,
};

export const input =
  "focus-ring w-full rounded-button border border-border bg-foreground px-3 py-2 text-regular placeholder:text-ink/40";

export const label = "flex flex-col gap-1.5 text-small font-medium";
