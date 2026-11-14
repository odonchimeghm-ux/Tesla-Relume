import Image from "next/image";
import Link from "next/link";
import { forwardRef } from "react";
import { Button } from "@/components/ui/Button";
import { megaMenuGroups, megaMenuPosts } from "@/data/navigation";

type MegaMenuProps = { id: string; open: boolean };

/** Navbar-ийн "Бусад" товчоор нээгддэг цэс */
export const MegaMenu = forwardRef<HTMLDivElement, MegaMenuProps>(function MegaMenu({ id, open }, ref) {
  return (
    <div
      ref={ref}
      id={id}
      hidden={!open}
      className="absolute inset-x-0 top-full flex border-b border-border bg-background max-lg:flex-col"
    >
      <div className="flex flex-1 gap-8 py-8 pr-8 pl-page max-md:flex-col max-md:pr-page">
        {megaMenuGroups.map((group) => (
          <div key={group.heading} className="flex min-w-0 flex-1 flex-col gap-4">
            <p className="text-small font-semibold">{group.heading}</p>
            <ul className="flex flex-col gap-4">
              {group.items.map((item) => (
                <li key={item.title}>
                  {/* Common Region: дүрс, гарчиг, тайлбар нэг дэвсгэр дотор — нэг холбоос гэдгийг харуулна */}
                  <Link
                    href={item.href}
                    className="focus-ring group -mx-3 flex items-start gap-3 rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-neutral-5"
                  >
                    <Image src="/assets/relume-icon.svg" alt="" width={24} height={24} className="shrink-0" />
                    <span className="flex flex-col">
                      <strong className="text-regular font-semibold group-hover:underline">{item.title}</strong>
                      <span className="text-small">{item.description}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex max-w-[560px] flex-1 flex-col items-start gap-4 bg-foreground py-8 pr-page pl-8 max-lg:max-w-none max-lg:pl-page">
        <p className="text-small font-semibold">Блогоос онцлох</p>
        <div className="flex w-full flex-col gap-2">
          {megaMenuPosts.map((post, i) => (
            <article key={i} className="flex items-start gap-6 py-2 max-md:gap-4">
              <Image
                src={post.image}
                alt=""
                width={160}
                height={107}
                className="h-[107px] w-[160px] shrink-0 rounded-lg object-cover max-md:h-20 max-md:w-[120px]"
              />
              <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
                <div className="flex flex-col gap-1">
                  <h3 className="text-regular font-semibold">{post.title}</h3>
                  <p className="text-small">{post.excerpt}</p>
                </div>
                <Link href={post.href} className="text-small underline">
                  Цааш унших
                </Link>
              </div>
            </article>
          ))}
        </div>
        <Button href="#" variant="link" size="sm">
          Бүгдийг үзэх
        </Button>
      </div>
    </div>
  );
});
