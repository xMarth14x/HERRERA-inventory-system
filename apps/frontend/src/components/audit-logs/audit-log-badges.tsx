import { StatusBadge } from "@/components/dashboard/status-badge";
import { Badge } from "@/components/ui/badge";
import type { AuditResult } from "@/lib/audit-log-data";

export function AuditResultBadge({ result }: { result: AuditResult }) {
  return <StatusBadge color={result === "SUCCESS" ? "green" : "red"} label={result === "SUCCESS" ? "Success" : "Failed"} />;
}

export function SensitiveBadge({ sensitive }: { sensitive: boolean }) {
  return sensitive ? <Badge variant="destructive">Sensitive</Badge> : <Badge variant="outline">Standard</Badge>;
}
