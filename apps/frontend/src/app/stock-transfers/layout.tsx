import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  title: "Stock Transfer - Herrera Inventory",
};

export default function StockTransfersLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
