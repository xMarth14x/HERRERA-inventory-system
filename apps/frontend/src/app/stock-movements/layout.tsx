import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  title: "Stock Movement Ledger - Herrera Inventory",
};

export default function StockMovementsLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
