import { Card, CardContent } from "@/components/ui/card";
import { statusColorForCode } from "@/lib/status-color";

const COLOR_TEXT = {
  green: "text-emerald-600",
  blue: "text-blue-600",
  amber: "text-amber-700",
  red: "text-red-600",
  gray: "text-gray-600",
  violet: "text-violet-600",
} as const;

export function StatusSummary({
  statuses,
  counts,
}: {
  statuses: string[];
  counts: Record<string, number>;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {statuses.map((status) => {
        const color = statusColorForCode(status);
        return (
          <Card key={status} className="gap-1 py-3">
            <CardContent className="flex flex-col gap-0.5 px-4">
              <span className={`text-2xl font-semibold tabular-nums ${COLOR_TEXT[color]}`}>
                {counts[status] ?? 0}
              </span>
              <span className="text-xs font-medium text-muted-foreground">{status}</span>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
