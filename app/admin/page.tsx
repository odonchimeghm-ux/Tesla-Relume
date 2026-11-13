import type { Metadata } from "next";
import { AdminApp } from "@/components/admin/AdminApp";

export const metadata: Metadata = {
  title: "Админ | Tesla",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="px-page pt-section-md pb-section">
      <div className="mx-auto w-full max-w-[1280px]">
        <AdminApp />
      </div>
    </div>
  );
}
