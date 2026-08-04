import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { daysUntil, formatDate, formatNumber } from "@/lib/format";
import type { ExpiringProduct } from "@/lib/dashboard-data";
import { StatusBadge, type StatusColor } from "./status-badge";

function urgencyColor(days: number): StatusColor {
  if (days <= 7) return "red";
  if (days <= 30) return "amber";
  return "gray";
}

export function ExpiringProducts({ data }: { data: ExpiringProduct[] }) {
  const sorted = [...data].sort(
    (a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime(),
  );

  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Expiring Products</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        {sorted.map((item) => {
          const days = daysUntil(item.expiryDate);
          return (
            <div
              key={`${item.sku}-${item.batchNumber}`}
              className="flex items-center justify-between gap-3 rounded-md px-1 py-2 transition-colors hover:bg-muted/50"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{item.productName}</p>
                <p className="text-xs text-muted-foreground">
                  {item.sku} · Batch {item.batchNumber} · {item.location} · {formatNumber(item.quantity)} units
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <StatusBadge
                  color={urgencyColor(days)}
                  label={days <= 0 ? "Expired" : `${days}d left`}
                />
                <span className="text-xs text-muted-foreground">{formatDate(item.expiryDate)}</span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
