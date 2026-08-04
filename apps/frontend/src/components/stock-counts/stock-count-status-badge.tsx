import { StatusBadge, type StatusColor } from "@/components/dashboard/status-badge";
import type { StockCountStatus } from "@/lib/stock-count-data";

const STATUS_META: Record<StockCountStatus, { color: StatusColor; label: string }> = {
  DRAFT: { color: "gray", label: "Draft" },
  IN_PROGRESS: { color: "blue", label: "Counting" },
  SECOND_COUNT: { color: "violet", label: "Second count" },
  FOR_APPROVAL: { color: "amber", label: "For approval" },
  COMPLETED: { color: "green", label: "Completed" },
};

export function StockCountStatusBadge({ status }: { status: StockCountStatus }) {
  const meta = STATUS_META[status];
  return <StatusBadge color={meta.color} label={meta.label} />;
}
