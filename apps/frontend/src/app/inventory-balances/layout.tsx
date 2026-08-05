import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  title: "Inventory Balances - BigStop Inventory",
};

export default function InventoryBalancesLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
