"use client";

import { toast } from "sonner";
import { ArrowRight, FileText, Download } from "lucide-react";
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
import { statusColorForCode } from "@/lib/status-color";
import { formatDate, formatNumber } from "@/lib/format";
import type { StockTransfer } from "@/lib/stock-transfer-data";
import { DiscrepancyBadge } from "./discrepancy-badge";

export function StockTransferDetailDialog({
  transfer,
  onOpenChange,
}: {
  transfer: StockTransfer | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={transfer !== null} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        {transfer && (
          <>
            <DialogHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <DialogTitle className="font-mono text-lg">{transfer.transferNumber}</DialogTitle>
                  <DialogDescription className="flex items-center gap-1.5">
                    <span>{transfer.sourceLocation}</span>
                    <ArrowRight className="size-3.5 shrink-0" />
                    <span>{transfer.destinationLocation}</span>
                  </DialogDescription>
                </div>
                <StatusBadge color={statusColorForCode(transfer.status)} label={transfer.status} />
              </div>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-3 rounded-lg border bg-muted/30 p-3 text-sm sm:grid-cols-4">
              <Field label="Requested By" value={transfer.requestedBy || "—"} />
              <Field label="Approved By" value={transfer.approvedBy || "—"} />
              <Field label="Dispatched" value={transfer.dispatchedAt ? formatDate(transfer.dispatchedAt) : "—"} />
              <Field label="Received" value={transfer.receivedAt ? formatDate(transfer.receivedAt) : "—"} />
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold">Products</h3>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-right">Dispatched</TableHead>
                      <TableHead className="text-right">Received</TableHead>
                      <TableHead>Discrepancy</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transfer.items.map((item) => (
                      <TableRow key={item.sku}>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium">{item.productName}</span>
                            <span className="font-mono text-xs text-muted-foreground">{item.sku}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {formatNumber(item.dispatchedQuantity)}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {formatNumber(item.receivedQuantity)}
                        </TableCell>
                        <TableCell>
                          {item.discrepancyType ? (
                            <div className="flex flex-col gap-1">
                              <DiscrepancyBadge type={item.discrepancyType} />
                              <span className="text-xs text-muted-foreground">
                                {formatNumber(item.discrepancyQuantity)} units · {item.discrepancyNotes}
                              </span>
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground">None</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold">Notes</h3>
              <p className="rounded-lg border bg-muted/30 p-3 text-sm text-muted-foreground">
                {transfer.notes}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold">Attachments</h3>
              {transfer.attachments.length === 0 ? (
                <p className="text-sm text-muted-foreground">No attachments.</p>
              ) : (
                <div className="flex flex-col gap-1.5">
                  {transfer.attachments.map((doc) => (
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
              <h3 className="text-sm font-semibold">History</h3>
              <ol className="flex flex-col gap-3 border-l pl-4">
                {transfer.history.map((entry) => (
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
                    {entry.notes && (
                      <p className="mt-0.5 text-xs text-muted-foreground italic">{entry.notes}</p>
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
