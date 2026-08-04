"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { GoodsReceiptsTable } from "@/components/goods-receiving/goods-receipts-table";
import { GoodsReceiptDetailDialog } from "@/components/goods-receiving/goods-receipt-detail-dialog";
import { getGoodsReceipts, getGoodsReceiptLineRows } from "@/lib/goods-receipt-data";
import { goodsReceivingContent } from "@/lib/module-content";

export default function GoodsReceivingPage() {
  const receipts = getGoodsReceipts();
  const rows = getGoodsReceiptLineRows();

  const [search, setSearch] = useState("");
  const [selectedReceiptNumber, setSelectedReceiptNumber] = useState<string | null>(null);

  const selectedReceipt = selectedReceiptNumber
    ? (receipts.find((r) => r.receiptNumber === selectedReceiptNumber) ?? null)
    : null;

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
      />
    </div>
  );
}
