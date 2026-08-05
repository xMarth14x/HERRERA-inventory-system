"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ListBarcodeScan } from "@/components/barcode/list-barcode-scan";
import { GoodsReceiptsTable } from "@/components/goods-receiving/goods-receipts-table";
import { GoodsReceiptDetailDialog } from "@/components/goods-receiving/goods-receipt-detail-dialog";
import { getGoodsReceipts, getGoodsReceiptLineRows, type GoodsReceipt } from "@/lib/goods-receipt-data";
import { goodsReceivingContent } from "@/lib/module-content";

export default function GoodsReceivingPage() {
  const [receipts, setReceipts] = useState<GoodsReceipt[]>(() => getGoodsReceipts());
  const rows = useMemo(() => getGoodsReceiptLineRows(receipts), [receipts]);

  const [search, setSearch] = useState("");
  const [selectedReceiptNumber, setSelectedReceiptNumber] = useState<string | null>(null);

  const selectedReceipt = selectedReceiptNumber
    ? (receipts.find((r) => r.receiptNumber === selectedReceiptNumber) ?? null)
    : null;

  function handleUpdate(updated: GoodsReceipt) {
    setReceipts((current) => current.map((r) => (r.receiptNumber === updated.receiptNumber ? updated : r)));
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Goods Receiving</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            {goodsReceivingContent.description}
          </p>
        </div>
        <Button onClick={() => toast.info("Creating goods receipts isn't wired to the backend yet.")}>
          <Plus className="size-4" />
          New Goods Receipt
        </Button>
      </div>

      <Card className="gap-3">
        <CardContent>
          <ListBarcodeScan
            placeholder="Scan a barcode or SKU to find its receipt line…"
            onFound={(sku, productName) => {
              setSearch(sku);
              toast.success(`Found ${productName} — filtered to ${sku}.`);
            }}
          />
        </CardContent>
      </Card>

      <GoodsReceiptsTable
        data={rows}
        search={search}
        onSearchChange={setSearch}
        onSelectRow={setSelectedReceiptNumber}
      />

      <GoodsReceiptDetailDialog
        receipt={selectedReceipt}
        onOpenChange={(open) => {
          if (!open) setSelectedReceiptNumber(null);
        }}
        onUpdate={handleUpdate}
      />
    </div>
  );
}
