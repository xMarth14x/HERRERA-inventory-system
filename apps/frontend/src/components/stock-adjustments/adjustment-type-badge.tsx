import { StatusBadge, type StatusColor } from "@/components/dashboard/status-badge";
import type { AdjustmentType } from "@/lib/stock-adjustment-data";

const ADJUSTMENT_TYPE_COLOR: Record<AdjustmentType, StatusColor> = {
  Damaged: "red",
  Expired: "red",
  Lost: "red",
  Found: "green",
  "Encoding correction": "blue",
  "Sample usage": "violet",
  "Tester usage": "violet",
  "Internal consumption": "gray",
  Reclassification: "amber",
  "Quality-control rejection": "red",
};

export function AdjustmentTypeBadge({ type }: { type: AdjustmentType }) {
  return <StatusBadge color={ADJUSTMENT_TYPE_COLOR[type]} label={type} />;
}
