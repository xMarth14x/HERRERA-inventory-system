import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { StatusColor } from "@/components/dashboard/status-badge";

const TONE_CLASSES: Record<StatusColor, string> = {
  green: "bg-emerald-50 text-emerald-700",
  blue: "bg-blue-50 text-blue-700",
  amber: "bg-amber-50 text-amber-800",
  red: "bg-red-50 text-red-700",
  gray: "bg-gray-100 text-gray-600",
  violet: "bg-violet-50 text-violet-700",
};

/** The compact icon-tile summary card used across every module's KPI row (matches Inventory Alerts). */
export function SummaryCard({
  icon: Icon,
  label,
  value,
  detail,
  tone = "blue",
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  detail?: string;
  tone?: StatusColor;
}) {
  return (
    <Card size="sm">
      <CardContent className="flex items-center gap-3">
        <span className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${TONE_CLASSES[tone]}`}>
          <Icon className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-xl font-semibold tabular-nums">{value}</p>
          {detail ? <p className="truncate text-xs text-muted-foreground">{detail}</p> : null}
        </div>
      </CardContent>
    </Card>
  );
}
