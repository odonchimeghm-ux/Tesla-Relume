import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" aria-label="Нүүр хуудас" className="focus-ring flex h-9 shrink-0 items-center justify-center">
      <Image src="/assets/tesla-logo.svg" alt="Tesla" width={120} height={13} className="h-auto w-[120px]" />
    </Link>
  );
}
