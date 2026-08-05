import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  title: "Stock Transfer - BigStop Inventory",
};

export default function StockTransfersLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
