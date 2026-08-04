import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  title: "Inventory Alerts - Herrera Inventory",
};

export default function AlertsLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
