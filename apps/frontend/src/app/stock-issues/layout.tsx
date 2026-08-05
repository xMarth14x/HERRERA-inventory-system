import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  title: "Stock Issue - BigStop Inventory",
};

export default function StockIssuesLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
