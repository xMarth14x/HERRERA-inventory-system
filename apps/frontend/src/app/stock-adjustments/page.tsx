"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { StockAdjustmentsTable, TYPE_ALL } from "@/components/stock-adjustments/stock-adjustments-table";
import { StockAdjustmentDetailDialog } from "@/components/stock-adjustments/stock-adjustment-detail-dialog";
import { getStockAdjustments } from "@/lib/stock-adjustment-data";

export default function StockAdjustmentsPage() {
  const adjustments = getStockAdjustments();

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState(TYPE_ALL);
  const [selectedAdjustmentNumber, setSelectedAdjustmentNumber] = useState<string | null>(null);

  const selectedAdjustment = selectedAdjustmentNumber
    ? (adjustments.find((a) => a.adjustmentNumber === selectedAdjustmentNumber) ?? null)
    : null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Stock Adjustment</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            High-value or high-quantity adjustments will require approval.
          </p>
        </div>
        <Button onClick={() => toast.info("Creating stock adjustments isn't wired to the backend yet.")}>
          <Plus className="size-4" />
          New Stock Adjustment
        </Button>
      </div>

      <StockAdjustmentsTable
        data={adjustments}
        search={search}
        onSearchChange={setSearch}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        onSelectRow={setSelectedAdjustmentNumber}
      />

      <StockAdjustmentDetailDialog
        adjustment={selectedAdjustment}
        onOpenChange={(open) => {
          if (!open) setSelectedAdjustmentNumber(null);
        }}
      />
    </div>
  );
}
