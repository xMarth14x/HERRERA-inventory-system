"use client";

import { toast } from "sonner";
import { FileText, Download, Printer } from "lucide-react";
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
import { getPurchaseOrderTotals, type PurchaseOrder } from "@/lib/purchase-order-data";

export function PurchaseOrderDetailDialog({
  order,
  onOpenChange,
}: {
  order: PurchaseOrder | null;
  onOpenChange: (open: boolean) => void;
}) {
  const totals = order ? getPurchaseOrderTotals(order) : null;

  return (
    <Dialog open={order !== null} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        {order && totals && (
          <>
            <DialogHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <DialogTitle className="font-mono text-lg">{order.poNumber}</DialogTitle>
                  <DialogDescription>
                    {order.supplier} · Quotation Ref {order.supplierQuotationRef}
                  </DialogDescription>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <StatusBadge color={statusColorForCode(order.status)} label={order.status} />
                  <Button
                    size="icon-xs"
                    variant="outline"
                    aria-label="Print purchase order"
                    onClick={() => toast.info("PDF export isn't wired up yet.")}
                  >
                    <Printer className="size-3.5" />
                  </Button>
                </div>
              </div>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-3 rounded-lg border bg-muted/30 p-3 text-sm sm:grid-cols-4">
              <Field label="Order Date" value={formatDate(order.orderDate)} />
              <Field label="Expected Delivery" value={formatDate(order.expectedDeliveryDate)} />
              <Field label="Delivery Location" value={order.deliveryLocation} />
              <Field label="Payment Terms" value={`${order.paymentTerms} · ${order.currency}`} />
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold">Product or Variant</h3>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-right">Ordered</TableHead>
                      <TableHead className="text-right">Unit Price</TableHead>
                      <TableHead className="text-right">Received</TableHead>
                      <TableHead className="text-right">Rejected</TableHead>
                      <TableHead className="text-right">Remaining</TableHead>
                      <TableHead className="text-right">Line Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.items.map((item) => (
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
                          {formatCurrency(item.unitPrice)}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {formatNumber(item.receivedQuantity)}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {formatNumber(item.rejectedQuantity)}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {formatNumber(item.orderedQuantity - item.receivedQuantity)}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {formatCurrency(item.orderedQuantity * item.unitPrice)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 self-end rounded-lg border bg-muted/30 p-3 text-sm sm:w-72">
              <TotalRow label="Subtotal" value={formatCurrency(totals.subtotal)} />
              <TotalRow label="Discount" value={`− ${formatCurrency(order.discount)}`} />
              <TotalRow label="Tax" value={formatCurrency(order.tax)} />
              <TotalRow label="Shipping" value={formatCurrency(order.shipping)} />
              <TotalRow label="Other Charges" value={formatCurrency(order.otherCharges)} />
              <div className="mt-1 flex items-center justify-between border-t pt-1.5 text-sm font-semibold">
                <span>Grand Total</span>
                <span className="tabular-nums">{formatCurrency(totals.grandTotal)}</span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold">Notes, Terms &amp; Conditions</h3>
              <p className="rounded-lg border bg-muted/30 p-3 text-sm text-muted-foreground">
                {order.notes}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 rounded-lg border bg-muted/30 p-3 text-sm sm:grid-cols-3">
              <Field label="Prepared By" value={order.preparedBy || "—"} />
              <Field label="Checked By" value={order.checkedBy || "—"} />
              <Field label="Approved By" value={order.approvedBy || "—"} />
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold">Attachments</h3>
              {order.attachments.length === 0 ? (
                <p className="text-sm text-muted-foreground">No attachments.</p>
              ) : (
                <div className="flex flex-col gap-1.5">
                  {order.attachments.map((doc) => (
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
              <h3 className="text-sm font-semibold">Revision History</h3>
              <ol className="flex flex-col gap-3 border-l pl-4">
                {order.revisionHistory.map((entry) => (
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

function TotalRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-muted-foreground">
      <span>{label}</span>
      <span className="tabular-nums text-foreground">{value}</span>
    </div>
  );
}
