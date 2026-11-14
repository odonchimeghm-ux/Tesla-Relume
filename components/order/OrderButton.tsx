"use client";

import { useActionState } from "react";
import { startCheckout } from "@/app/order/actions";
import { buttonClassName } from "@/components/ui/Button";
import type { OrderableModel } from "@/data/products";

type OrderButtonProps = {
  model: OrderableModel;
  variant: string;
  children?: string;
};

/** Byl checkout руу шилжүүлэх "Захиалах" товч. Алдаа гарвал товчны доор харуулна. */
export function OrderButton({ model, variant, children = "Захиалах" }: OrderButtonProps) {
  const [state, action, pending] = useActionState(startCheckout, null);

  return (
    <form action={action} className="flex flex-col items-start gap-2">
      <input type="hidden" name="model" value={model} />
      <input type="hidden" name="variant" value={variant} />
      <button
        type="submit"
        disabled={pending}
        aria-busy={pending}
        className={buttonClassName({ className: "cursor-pointer disabled:cursor-wait disabled:opacity-70" })}
      >
        {pending ? "Түр хүлээнэ үү…" : children}
      </button>
      {state?.error && (
        <p role="alert" className="text-small text-primary">
          {state.error}
        </p>
      )}
    </form>
  );
}
