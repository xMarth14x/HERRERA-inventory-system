import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  title: "Goods Receiving - BigStop Inventory",
};

export default function GoodsReceivingLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
