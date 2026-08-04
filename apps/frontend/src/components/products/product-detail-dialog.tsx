"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { formatCurrency, formatNumber } from "@/lib/format";
import type { Product } from "@/lib/product-data";
import { ProductAvatar } from "./product-avatar";

export function ProductDetailDialog({
  product,
  onOpenChange,
}: {
  product: Product | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={product !== null} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        {product && (
          <>
            <DialogHeader>
              <div className="flex items-start gap-3">
                <ProductAvatar name={product.name} />
                <div className="flex-1">
                  <DialogTitle className="text-lg">{product.name}</DialogTitle>
                  <DialogDescription>
                    {product.productCode} · {product.category} · {product.brand}
                  </DialogDescription>
                </div>
                <StatusBadge
                  color={product.isActive ? "green" : "gray"}
                  label={product.isActive ? "Active" : "Inactive"}
                />
              </div>
            </DialogHeader>

            <p className="text-sm text-muted-foreground">{product.description}</p>

            <div className="grid grid-cols-2 gap-3 rounded-lg border bg-muted/30 p-3 text-sm sm:grid-cols-4">
              <Field label="Base Unit" value={product.baseUnit} />
              <Field label="Tax Status" value={product.isTaxable ? "Taxable" : "Non-taxable"} />
              <Field
                label="Batch Tracking"
                value={product.batchTracking ? "Enabled" : "Disabled"}
              />
              <Field
                label="Expiry Tracking"
                value={product.expiryTracking ? "Enabled" : "Disabled"}
              />
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold">
                Variants <span className="text-muted-foreground">({product.variants.length})</span>
              </h3>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Variant</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Barcode</TableHead>
                      <TableHead className="text-right">Cost</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Min / Max</TableHead>
                      <TableHead className="text-right">Reorder</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {product.variants.map((variant) => (
                      <TableRow key={variant.id}>
                        <TableCell className="font-medium">{variant.variantName}</TableCell>
                        <TableCell className="font-mono text-xs">{variant.sku}</TableCell>
                        <TableCell className="font-mono text-xs">{variant.barcode}</TableCell>
                        <TableCell className="text-right tabular-nums">
                          {formatCurrency(variant.cost)}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {formatCurrency(variant.sellingPrice)}
                        </TableCell>
                        <TableCell className="text-right tabular-nums text-muted-foreground">
                          {formatNumber(variant.minimum)} / {formatNumber(variant.maximum)}
                        </TableCell>
                        <TableCell className="text-right tabular-nums text-muted-foreground">
                          {formatNumber(variant.reorderPoint)} pt / {formatNumber(variant.reorderQuantity)} qty
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
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
