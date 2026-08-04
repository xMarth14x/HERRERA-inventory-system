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
import { statusColorForCode } from "@/lib/status-color";
import { formatCurrency, formatDate, formatNumber } from "@/lib/format";
import type { GoodsReceipt } from "@/lib/goods-receipt-data";

export function GoodsReceiptDetailDialog({
  receipt,
  onOpenChange,
}: {
  receipt: GoodsReceipt | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={receipt !== null} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        {receipt && (
          <>
            <DialogHeader>
              <div>
                <DialogTitle className="font-mono text-lg">{receipt.receiptNumber}</DialogTitle>
                <DialogDescription>
                  {receipt.poNumber} · {receipt.supplier}
                </DialogDescription>
              </div>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-3 rounded-lg border bg-muted/30 p-3 text-sm sm:grid-cols-4">
              <Field label="Delivery Location" value={receipt.deliveryLocation} />
              <Field label="Delivery Date" value={formatDate(receipt.deliveryDate)} />
              <Field label="Delivery Receipt #" value={receipt.deliveryReceiptNumber} />
              <Field label="Supplier Invoice #" value={receipt.supplierInvoiceNumber} />
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold">Product</h3>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-right">Ordered</TableHead>
                      <TableHead className="text-right">Prev. Received</TableHead>
                      <TableHead className="text-right">Current Received</TableHead>
                      <TableHead className="text-right">Rejected</TableHead>
                      <TableHead className="text-right">Damaged</TableHead>
                      <TableHead className="text-right">Remaining</TableHead>
                      <TableHead className="text-right">Unit Cost</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {receipt.items.map((item) => {
                      const remaining =
                        item.orderedQuantity - (item.previouslyReceivedQuantity + item.currentReceivedQuantity);
                      return (
                        <TableRow key={item.sku}>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-medium">{item.productName}</span>
                              <span className="font-mono text-xs text-muted-foreground">{item.sku}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right tabular-nums">
                            {formatNumber(item.orderedQuantity)}
                          </TableCell>
                          <TableCell className="text-right tabular-nums">
                            {formatNumber(item.previouslyReceivedQuantity)}
                          </TableCell>
                          <TableCell className="text-right tabular-nums">
                            {formatNumber(item.currentReceivedQuantity)}
                          </TableCell>
                          <TableCell className="text-right tabular-nums">
                            {formatNumber(item.rejectedQuantity)}
                          </TableCell>
                          <TableCell className="text-right tabular-nums">
                            {formatNumber(item.damagedQuantity)}
                          </TableCell>
                          <TableCell className="text-right tabular-nums">{formatNumber(remaining)}</TableCell>
                          <TableCell className="text-right tabular-nums">
                            {formatCurrency(item.unitCost)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {receipt.items.map((item) => {
                const remaining =
                  item.orderedQuantity - (item.previouslyReceivedQuantity + item.currentReceivedQuantity);
                const status = remaining <= 0 ? "FULLY_RECEIVED" : "PARTIALLY_RECEIVED";
                return (
                  <StatusBadge key={item.sku} color={statusColorForCode(status)} label={`PO Status: ${status}`} />
                );
              })}
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold">Batch, Manufacturing &amp; Expiry</h3>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Batch Number</TableHead>
                      <TableHead>Manufacturing Date</TableHead>
                      <TableHead>Expiry Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {receipt.items.map((item) => (
                      <TableRow key={item.sku}>
                        <TableCell className="font-medium">{item.productName}</TableCell>
                        <TableCell>{item.batchNumber}</TableCell>
                        <TableCell>
                          {item.manufacturingDate === "—" ? "—" : formatDate(item.manufacturingDate)}
                        </TableCell>
                        <TableCell>{item.expiryDate === "—" ? "—" : formatDate(item.expiryDate)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 rounded-lg border bg-muted/30 p-3 text-sm sm:grid-cols-2">
              <Field label="Received By" value={receipt.receivedBy} />
              <Field label="Confirmed By" value={receipt.confirmedBy} />
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold">Attachments</h3>
              {receipt.attachments.length === 0 ? (
                <p className="text-sm text-muted-foreground">No attachments.</p>
              ) : (
                <div className="flex flex-col gap-1.5">
                  {receipt.attachments.map((doc) => (
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
