import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  title: "Purchase Orders - BigStop Inventory",
};

export default function PurchaseOrdersLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
