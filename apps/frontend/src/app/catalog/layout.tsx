import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  title: "Categories, Brands, and Units - Herrera Inventory",
};

export default function CatalogLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
