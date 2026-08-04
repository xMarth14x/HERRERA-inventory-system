import Link from "next/link";
import { AlertTriangle, ArrowLeftRight, PackageCheck, ShoppingCart } from "lucide-react";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { StockMovement } from "@/lib/dashboard-data";
import { formatRelativeTime } from "@/lib/format";

const ACTIVITY_META = {
  PURCHASE_RECEIPT: { icon: PackageCheck, tone: "bg-[#0a43b8]" },
  TRANSFER_OUT: { icon: ArrowLeftRight, tone: "bg-[#ffca0a]" },
  TRANSFER_IN: { icon: ArrowLeftRight, tone: "bg-[#0a43b8]" },
  SALE_ISSUE: { icon: ShoppingCart, tone: "bg-[#0a43b8]" },
} as const;

export function RecentActivities({ data }: { data: StockMovement[] }) {
  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        {data.slice(0, 4).map((item) => {
          const meta = ACTIVITY_META[item.type as keyof typeof ACTIVITY_META] ?? { icon: AlertTriangle, tone: "bg-[#ed1b2f]" };
          const Icon = meta.icon;
          return (
            <div key={item.id} className="flex items-center gap-3 border-b border-slate-100 py-3 last:border-0">
              <span className={`flex size-10 shrink-0 items-center justify-center rounded-full text-white ${meta.tone}`}>
                <Icon className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{activityTitle(item)}</p>
                <p className="truncate text-xs text-muted-foreground">{item.number} · {item.location}</p>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">{formatRelativeTime(item.createdAt)}</span>
            </div>
          );
        })}
      </CardContent>
      <CardFooter className="justify-center">
        <Link href="/audit-logs" className="text-sm font-semibold text-[#0a43b8] hover:underline">View all activities</Link>
      </CardFooter>
    </Card>
  );
}

function activityTitle(item: StockMovement): string {
  if (item.type === "PURCHASE_RECEIPT") return `Stock received for ${item.product}`;
  if (item.type === "TRANSFER_IN") return `Transfer received for ${item.product}`;
  if (item.type === "TRANSFER_OUT") return `Transfer dispatched for ${item.product}`;
  if (item.type === "SALE_ISSUE") return `Stock issued for ${item.product}`;
  return `${item.type.replaceAll("_", " ")} · ${item.product}`;
}
