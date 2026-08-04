"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MovementTypeBadge } from "@/components/dashboard/status-badge";
import { formatCurrency, formatDate, formatNumber } from "@/lib/format";
import type { StockMovementEntry } from "@/lib/stock-movement-data";

export function StockMovementDetailDialog({
  movement,
  onOpenChange,
}: {
  movement: StockMovementEntry | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={movement !== null} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        {movement && (
          <>
            <DialogHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <DialogTitle className="font-mono text-lg">{movement.movementNumber}</DialogTitle>
                  <DialogDescription>
                    {movement.productName} ({movement.sku}) · {movement.location}
                  </DialogDescription>
                </div>
                <MovementTypeBadge type={movement.type} />
              </div>
            </DialogHeader>

            <div>
              <h3 className="mb-2 text-sm font-semibold">Quantity</h3>
              <div className="grid grid-cols-3 gap-3 rounded-lg border bg-muted/30 p-3 text-center text-sm">
                <QuantityStat label="Before" value={formatNumber(movement.quantityBefore)} />
                <QuantityStat
                  label="Change"
                  value={`${movement.quantityChange > 0 ? "+" : ""}${formatNumber(movement.quantityChange)}`}
                  tone={movement.quantityChange > 0 ? "green" : movement.quantityChange < 0 ? "red" : "muted"}
                />
                <QuantityStat label="After" value={formatNumber(movement.quantityAfter)} />
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold">Reserved Quantity</h3>
              <div className="grid grid-cols-3 gap-3 rounded-lg border bg-muted/30 p-3 text-center text-sm">
                <QuantityStat label="Before" value={formatNumber(movement.reservedBefore)} />
                <QuantityStat
                  label="Change"
                  value={`${movement.reservedChange > 0 ? "+" : ""}${formatNumber(movement.reservedChange)}`}
                  tone={movement.reservedChange > 0 ? "green" : movement.reservedChange < 0 ? "red" : "muted"}
                />
                <QuantityStat label="After" value={formatNumber(movement.reservedAfter)} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 rounded-lg border bg-muted/30 p-3 text-sm sm:grid-cols-3">
              <Field label="Unit Cost" value={formatCurrency(movement.unitCost)} />
              <Field label="Reference Type" value={movement.referenceType} />
              <Field label="Reference Number" value={movement.referenceNumber} />
              <Field label="Performed By" value={movement.performedBy} />
              <Field label="Approved By" value={movement.approvedBy || "—"} />
              <Field label="Date & Time" value={formatDate(movement.occurredAt)} />
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold">Reason</h3>
              <p className="rounded-lg border bg-muted/30 p-3 text-sm text-muted-foreground">
                {movement.reason}
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

const TONE_CLASSES = {
  green: "text-emerald-600",
  red: "text-red-600",
  muted: "text-muted-foreground",
} as const;

function QuantityStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: keyof typeof TONE_CLASSES;
}) {
  return (
    <div className="flex flex-col">
      <span className={`text-base font-semibold tabular-nums ${tone ? TONE_CLASSES[tone] : ""}`}>{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
