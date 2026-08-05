import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  title: "Catalog - BigStop Inventory",
};

export default function CatalogLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
