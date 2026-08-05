import { SummaryCard } from "@/components/shared/summary-card";
import { formatNumber, toTitleCase } from "@/lib/format";
import { formatStatusLabel, statusColorForCode, statusIconForCode } from "@/lib/status-color";

export function StatusSummary({
  statuses,
  counts,
}: {
  statuses: string[];
  counts: Record<string, number>;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statuses.map((status) => (
        <SummaryCard
          key={status}
          icon={statusIconForCode(status)}
          label={toTitleCase(formatStatusLabel(status))}
          value={formatNumber(counts[status] ?? 0)}
          tone={statusColorForCode(status)}
        />
      ))}
    </div>
  );
}
