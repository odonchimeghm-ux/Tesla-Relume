import Image from "next/image";
import { Actions } from "@/components/ui/Actions";
import { Button } from "@/components/ui/Button";

/** "Цэнэглэх цэгээ олоорой" гарчиг + бүтэн өргөнтэй газрын зураг (Header / 149) */
export function ChargeSection() {
  return (
    <section>
      <div className="px-page py-section">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="flex max-w-[768px] flex-col gap-8">
            <div className="flex flex-col gap-6">
              <h2 className="text-h1">Цэнэглэх цэгээ олоорой</h2>
              <p className="text-medium">
                Ойролцоох Tesla Supercharger болон Destination цэнэглэгчдийн сүлжээг үзээрэй.
              </p>
            </div>
            <Actions>
              <Button href="#">Сүлжээг үзэх</Button>
              <Button href="#" variant="secondary">
                Дэлгэрэнгүй
              </Button>
            </Actions>
          </div>
        </div>
      </div>
      <div className="relative aspect-[1440/810] w-full">
        <Image
          src="/assets/charge-map.png"
          alt="АНУ даяарх Tesla Supercharger станцуудын газрын зураг"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
