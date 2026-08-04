import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  title: "Barcode Support - Herrera Inventory",
};

export default function BarcodeSupportLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
