import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  title: "Physical Stock Count - BigStop Inventory",
};

export default function StockCountsLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
