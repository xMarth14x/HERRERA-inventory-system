"use client";

import { toast } from "sonner";
import { FileText, Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { formatDate, formatNumber } from "@/lib/format";
import type { StockAdjustment } from "@/lib/stock-adjustment-data";
import { AdjustmentTypeBadge } from "./adjustment-type-badge";

export function StockAdjustmentDetailDialog({
  adjustment,
  onOpenChange,
}: {
  adjustment: StockAdjustment | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={adjustment !== null} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        {adjustment && (
          <>
            <DialogHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <DialogTitle className="font-mono text-lg">{adjustment.adjustmentNumber}</DialogTitle>
                  <DialogDescription>
                    {adjustment.productName} ({adjustment.sku}) · {adjustment.location}
                  </DialogDescription>
                </div>
                <AdjustmentTypeBadge type={adjustment.adjustmentType} />
              </div>
            </DialogHeader>

            <div>
              <h3 className="mb-2 text-sm font-semibold">Quantity</h3>
              <div className="grid grid-cols-3 gap-3 rounded-lg border bg-muted/30 p-3 text-center text-sm">
                <QuantityStat label="Current" value={formatNumber(adjustment.currentQuantity)} />
                <QuantityStat
                  label="Adjustment"
                  value={`${adjustment.adjustmentQuantity > 0 ? "+" : ""}${formatNumber(adjustment.adjustmentQuantity)}`}
                  tone={adjustment.adjustmentQuantity > 0 ? "green" : "red"}
                />
                <QuantityStat label="New" value={formatNumber(adjustment.newQuantity)} />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold">Reason</h3>
              <p className="rounded-lg border bg-muted/30 p-3 text-sm text-muted-foreground">
                {adjustment.reason}
              </p>
            </div>

            {adjustment.notes && (
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semibold">Notes</h3>
                <p className="rounded-lg border bg-muted/30 p-3 text-sm text-muted-foreground">
                  {adjustment.notes}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 rounded-lg border bg-muted/30 p-3 text-sm sm:grid-cols-3">
              <Field label="Requested By" value={adjustment.requestedBy || "—"} />
              <Field label="Approved By" value={adjustment.approvedBy || "—"} />
              <Field label="Posted By" value={adjustment.postedBy || "—"} />
              <Field label="Date" value={formatDate(adjustment.createdAt)} />
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">Approval Required</span>
                <StatusBadge
                  color={adjustment.requiresApproval ? "amber" : "gray"}
                  label={adjustment.requiresApproval ? "Yes" : "No"}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold">Attachment</h3>
              {adjustment.attachment === null ? (
                <p className="text-sm text-muted-foreground">No attachment.</p>
              ) : (
                <div className="flex items-center justify-between gap-3 rounded-md border px-3 py-2">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <FileText className="size-4 shrink-0 text-muted-foreground" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{adjustment.attachment.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(adjustment.attachment.uploadedAt)}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="icon-xs"
                    variant="ghost"
                    aria-label={`Download ${adjustment.attachment.name}`}
                    onClick={() => toast.info("File storage isn't wired up yet.")}
                  >
                    <Download className="size-3.5" />
                  </Button>
                </div>
              )}
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
