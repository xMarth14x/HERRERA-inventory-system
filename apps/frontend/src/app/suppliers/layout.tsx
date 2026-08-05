import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  title: "Suppliers - BigStop Inventory",
};

export default function SuppliersLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
