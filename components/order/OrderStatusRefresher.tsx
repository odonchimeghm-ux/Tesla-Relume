"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/** Webhook ирэхийг хүлээж серверийн хуудсыг 3 секунд тутам (2 минут хүртэл) дахин уншина */
export function OrderStatusRefresher() {
  const router = useRouter();

  useEffect(() => {
    let count = 0;
    const timer = setInterval(() => {
      if (++count > 40) return clearInterval(timer);
      router.refresh();
    }, 3000);
    return () => clearInterval(timer);
  }, [router]);

  return null;
}
