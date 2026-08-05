import type { MovementType } from "@/lib/dashboard-data";

export type StatusColor = "green" | "blue" | "amber" | "red" | "gray" | "violet";

const COLOR_CLASSES: Record<StatusColor, string> = {
  green: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  blue: "bg-blue-50 text-blue-700 ring-blue-600/20",
  amber: "bg-amber-50 text-amber-800 ring-amber-600/20",
  red: "bg-red-50 text-red-700 ring-red-600/20",
  gray: "bg-gray-100 text-gray-600 ring-gray-500/20",
  violet: "bg-violet-50 text-violet-700 ring-violet-600/20",
};

const DOT_CLASSES: Record<StatusColor, string> = {
  green: "bg-emerald-600",
  blue: "bg-blue-600",
  amber: "bg-amber-600",
  red: "bg-red-600",
  gray: "bg-gray-500",
  violet: "bg-violet-600",
};

export function StatusBadge({ color, label }: { color: StatusColor; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium lowercase ring-1 ring-inset ${COLOR_CLASSES[color]}`}
    >
      <span className={`size-1.5 rounded-full ${DOT_CLASSES[color]}`} aria-hidden />
      {label}
    </span>
  );
}

const MOVEMENT_META: Record<MovementType, { label: string; color: StatusColor }> = {
  OPENING_BALANCE: { label: "Opening Balance", color: "gray" },
  PURCHASE_RECEIPT: { label: "Purchase Receipt", color: "green" },
  MANUAL_RECEIPT: { label: "Manual Receipt", color: "green" },
  SALE_ISSUE: { label: "Sale Issue", color: "blue" },
  MANUAL_ISSUE: { label: "Manual Issue", color: "blue" },
  CUSTOMER_RETURN: { label: "Customer Return", color: "green" },
  SUPPLIER_RETURN: { label: "Supplier Return", color: "blue" },
  TRANSFER_OUT: { label: "Transfer Out", color: "violet" },
  TRANSFER_IN: { label: "Transfer In", color: "violet" },
  ADJUSTMENT_IN: { label: "Adjustment In", color: "amber" },
  ADJUSTMENT_OUT: { label: "Adjustment Out", color: "amber" },
  RESERVATION: { label: "Reservation", color: "gray" },
  RESERVATION_RELEASE: { label: "Reservation Release", color: "gray" },
  COUNT_VARIANCE_IN: { label: "Count Variance In", color: "amber" },
  COUNT_VARIANCE_OUT: { label: "Count Variance Out", color: "amber" },
  REVERSAL: { label: "Reversal", color: "red" },
};

export function MovementTypeBadge({ type }: { type: MovementType }) {
  const meta = MOVEMENT_META[type];
  return <StatusBadge color={meta.color} label={meta.label} />;
}

export const ALL_MOVEMENT_TYPES = Object.keys(MOVEMENT_META) as MovementType[];
