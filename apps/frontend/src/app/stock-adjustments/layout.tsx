import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  title: "Stock Adjustment - Herrera Inventory",
};

export default function StockAdjustmentsLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
