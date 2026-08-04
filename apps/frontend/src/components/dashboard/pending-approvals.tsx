"use client";

import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate, formatNumber } from "@/lib/format";
import type { PendingApproval } from "@/lib/dashboard-data";

function notImplemented() {
  toast.info("Approvals aren't wired to the backend yet.");
}

export function PendingApprovals({ data }: { data: PendingApproval[] }) {
  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Pending Approvals</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-3 rounded-md px-1 py-2 transition-colors hover:bg-muted/50"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                {item.type} · {item.reference}
              </p>
              <p className="text-xs text-muted-foreground">
                {item.requestedBy} · {formatDate(item.submittedAt)}
                {item.amount ? ` · $${formatNumber(item.amount)}` : ""}
              </p>
            </div>
            <div className="flex shrink-0 gap-1.5">
              <Button size="xs" variant="outline" onClick={notImplemented}>
                Reject
              </Button>
              <Button size="xs" onClick={notImplemented}>
                Approve
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
