import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  title: "Locations - Herrera Inventory",
};

export default function LocationsLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
