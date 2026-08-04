"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { StockTransfersTable, STATUS_ALL } from "@/components/stock-transfers/stock-transfers-table";
import { StockTransferDetailDialog } from "@/components/stock-transfers/stock-transfer-detail-dialog";
import { getStockTransfers } from "@/lib/stock-transfer-data";

export default function StockTransfersPage() {
  const transfers = getStockTransfers();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState(STATUS_ALL);
  const [selectedTransferNumber, setSelectedTransferNumber] = useState<string | null>(null);

  const selectedTransfer = selectedTransferNumber
    ? (transfers.find((t) => t.transferNumber === selectedTransferNumber) ?? null)
    : null;

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
      />
    </div>
  );
}
