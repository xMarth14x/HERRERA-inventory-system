import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  title: "Purchase Request - BigStop Inventory",
};

export default function PurchaseRequestsLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
