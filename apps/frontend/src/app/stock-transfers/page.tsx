"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ListBarcodeScan } from "@/components/barcode/list-barcode-scan";
import { StockTransfersTable, STATUS_ALL } from "@/components/stock-transfers/stock-transfers-table";
import { StockTransferDetailDialog } from "@/components/stock-transfers/stock-transfer-detail-dialog";
import { getStockTransfers, type StockTransfer } from "@/lib/stock-transfer-data";

export default function StockTransfersPage() {
  const [transfers, setTransfers] = useState<StockTransfer[]>(() => getStockTransfers());

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState(STATUS_ALL);
  const [selectedTransferNumber, setSelectedTransferNumber] = useState<string | null>(null);

  const selectedTransfer = selectedTransferNumber
    ? (transfers.find((t) => t.transferNumber === selectedTransferNumber) ?? null)
    : null;

  function handleUpdate(updated: StockTransfer) {
    setTransfers((current) => current.map((t) => (t.transferNumber === updated.transferNumber ? updated : t)));
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Stock Transfer</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Stock transfers move inventory between locations through a dispatch and receive workflow.
          </p>
        </div>
        <Button onClick={() => toast.info("Creating stock transfers isn't wired to the backend yet.")}>
          <Plus className="size-4" />
          New Stock Transfer
        </Button>
      </div>

      <Card className="gap-3">
        <CardContent>
          <ListBarcodeScan
            placeholder="Scan a barcode or SKU to find its transfer…"
            onFound={(sku, productName) => {
              setSearch(sku);
              toast.success(`Found ${productName} — filtered to ${sku}.`);
            }}
          />
        </CardContent>
      </Card>

      <StockTransfersTable
        data={transfers}
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onSelectRow={setSelectedTransferNumber}
      />

      <StockTransferDetailDialog
        transfer={selectedTransfer}
        onOpenChange={(open) => {
          if (!open) setSelectedTransferNumber(null);
        }}
        onUpdate={handleUpdate}
      />
    </div>
  );
}
