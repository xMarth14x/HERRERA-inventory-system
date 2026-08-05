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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { formatStatusLabel, statusColorForCode } from "@/lib/status-color";
import { formatCurrency, formatDate } from "@/lib/format";
import type { PurchaseRequest } from "@/lib/purchase-request-data";

export function PurchaseRequestDetailDialog({
  request,
  onOpenChange,
}: {
  request: PurchaseRequest | null;
  onOpenChange: (open: boolean) => void;
}) {
  const total = request
    ? request.items.reduce((sum, item) => sum + item.quantity * item.estimatedUnitCost, 0)
    : 0;

  return (
    <Dialog open={request !== null} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        {request && (
          <>
            <DialogHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <DialogTitle className="font-mono text-lg">{request.requestNumber}</DialogTitle>
                  <DialogDescription>
                    {request.requestingDepartment} · Requested by {request.requestedBy}
                  </DialogDescription>
                </div>
                <StatusBadge color={statusColorForCode(request.status)} label={formatStatusLabel(request.status)} />
              </div>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-3 rounded-lg border bg-muted/30 p-3 text-sm sm:grid-cols-4">
              <Field label="Required Date" value={formatDate(request.requiredDate)} />
              <Field label="Delivery Location" value={request.deliveryLocation} />
              <Field label="Submitted" value={formatDate(request.submittedAt)} />
              <Field label="Estimated Cost" value={formatCurrency(total)} />
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold">Requested Products</h3>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-right">Quantity</TableHead>
                      <TableHead className="text-right">Est. Unit Cost</TableHead>
                      <TableHead className="text-right">Est. Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {request.items.map((item) => (
                      <TableRow key={item.sku}>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium">{item.productName}</span>
                            <span className="font-mono text-xs text-muted-foreground">{item.sku}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right tabular-nums">{item.quantity}</TableCell>
                        <TableCell className="text-right tabular-nums">
                          {formatCurrency(item.estimatedUnitCost)}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {formatCurrency(item.quantity * item.estimatedUnitCost)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold">Justification &amp; Notes</h3>
              <p className="rounded-lg border bg-muted/30 p-3 text-sm text-muted-foreground">
                {request.justification}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold">Attachments</h3>
              {request.attachments.length === 0 ? (
                <p className="text-sm text-muted-foreground">No attachments.</p>
              ) : (
                <div className="flex flex-col gap-1.5">
                  {request.attachments.map((doc) => (
                    <div
                      key={doc.name}
                      className="flex items-center justify-between gap-3 rounded-md border px-3 py-2"
                    >
                      <div className="flex min-w-0 items-center gap-2.5">
                        <FileText className="size-4 shrink-0 text-muted-foreground" />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(doc.uploadedAt)}</p>
                        </div>
                      </div>
                      <Button
                        size="icon-xs"
                        variant="ghost"
                        aria-label={`Download ${doc.name}`}
                        onClick={() => toast.info("File storage isn't wired up yet.")}
                      >
                        <Download className="size-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold">Approval History</h3>
              <ol className="flex flex-col gap-3 border-l pl-4">
                {request.approvalHistory.map((entry, index) => (
                  <li key={`${entry.action}-${entry.at}`} className="relative text-sm">
                    <span
                      className="absolute top-1.5 -left-[21px] size-2 rounded-full bg-primary"
                      aria-hidden
                    />
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                      <span className="font-medium">{entry.action}</span>
                      <span className="text-xs text-muted-foreground">{formatDate(entry.at)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">by {entry.by}</p>
                    {entry.notes && <p className="mt-0.5 text-xs text-muted-foreground italic">{entry.notes}</p>}
                    {index === request.approvalHistory.length - 1 && (
                      <span className="sr-only">Latest</span>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
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
