import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  title: "Reports - BigStop Inventory",
};

export default function ReportsLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
