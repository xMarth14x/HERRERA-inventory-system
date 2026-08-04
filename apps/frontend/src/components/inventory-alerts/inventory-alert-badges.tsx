import { StatusBadge, type StatusColor } from "@/components/dashboard/status-badge";
import type { InventoryAlertSeverity, InventoryAlertStatus } from "@/lib/inventory-alert-data";

const SEVERITY_META: Record<InventoryAlertSeverity, { color: StatusColor; label: string }> = {
  CRITICAL: { color: "red", label: "Critical" },
  WARNING: { color: "amber", label: "Warning" },
  INFO: { color: "blue", label: "Info" },
};

const STATUS_META: Record<InventoryAlertStatus, { color: StatusColor; label: string }> = {
  OPEN: { color: "red", label: "Open" },
  ACKNOWLEDGED: { color: "amber", label: "Acknowledged" },
  RESOLVED: { color: "green", label: "Resolved" },
};

export function AlertSeverityBadge({ severity }: { severity: InventoryAlertSeverity }) {
  const meta = SEVERITY_META[severity];
  return <StatusBadge color={meta.color} label={meta.label} />;
}

export function AlertStatusBadge({ status }: { status: InventoryAlertStatus }) {
  const meta = STATUS_META[status];
  return <StatusBadge color={meta.color} label={meta.label} />;
}
