import { StatusBadge, type StatusColor } from "@/components/dashboard/status-badge";
import type { DiscrepancyType } from "@/lib/stock-transfer-data";

const DISCREPANCY_COLOR: Record<DiscrepancyType, StatusColor> = {
  "Short quantity": "amber",
  "Excess quantity": "blue",
  "Damaged in transit": "red",
  "Missing items": "amber",
  "Rejected items": "red",
};

export function DiscrepancyBadge({ type }: { type: DiscrepancyType }) {
  return <StatusBadge color={DISCREPANCY_COLOR[type]} label={type} />;
}
