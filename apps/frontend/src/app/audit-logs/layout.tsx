import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  title: "Audit Logs - Herrera Inventory",
};

export default function AuditLogsLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
