import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  title: "Products - Herrera Inventory",
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
