import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/lib/format";
import type { ProductMoverStat } from "@/lib/dashboard-data";

// Two sequential contexts shown at once: fast-moving takes the sequential
// blue, slow-moving takes the next categorical slot (orange) as its own
// single-hue ramp — each list stays single-series internally.
const FAST_FILL = "#2a78d6";
const SLOW_FILL = "#eb6834";

export function TopMovers({
  fastMoving,
  slowMoving,
}: {
  fastMoving: ProductMoverStat[];
  slowMoving: ProductMoverStat[];
}) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <BarListPanel title="Fast-Moving Products" data={fastMoving} fill={FAST_FILL} />
      <BarListPanel title="Slow-Moving Products" data={slowMoving} fill={SLOW_FILL} />
    </div>
  );
}

function BarListPanel({
  title,
  data,
  fill,
}: {
  title: string;
  data: ProductMoverStat[];
  fill: string;
}) {
  const max = Math.max(...data.map((d) => d.unitsMoved), 1);

  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {data.map((item) => {
          const widthPct = Math.max((item.unitsMoved / max) * 100, 4);
          return (
            <div
              key={item.sku}
              className="flex items-center gap-3 rounded-md px-1 py-1 transition-colors hover:bg-muted/50"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="truncate text-sm font-medium">{item.productName}</span>
                  <span
                    className="shrink-0 font-sans text-sm font-semibold tabular-nums"
                    style={{ color: fill }}
                  >
                    {formatNumber(item.unitsMoved)}
                  </span>
                </div>
                <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${widthPct}%`, backgroundColor: fill }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{item.sku}</span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
