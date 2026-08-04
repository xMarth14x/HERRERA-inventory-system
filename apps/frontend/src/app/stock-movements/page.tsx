"use client";

import { useState } from "react";
import { StockMovementsTable, TYPE_ALL } from "@/components/stock-movements/stock-movements-table";
import { StockMovementDetailDialog } from "@/components/stock-movements/stock-movement-detail-dialog";
import { getStockMovements } from "@/lib/stock-movement-data";
import { stockMovementLedgerContent } from "@/lib/module-content";

export default function StockMovementsPage() {
  const movements = getStockMovements();

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState(TYPE_ALL);
  const [selectedMovementNumber, setSelectedMovementNumber] = useState<string | null>(null);

  const selectedMovement = selectedMovementNumber
    ? (movements.find((m) => m.movementNumber === selectedMovementNumber) ?? null)
    : null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">{stockMovementLedgerContent.title}</h1>
        <p className="max-w-3xl text-sm text-muted-foreground">
          {stockMovementLedgerContent.description}
        </p>
      </div>

      <StockMovementsTable
        data={movements}
        search={search}
        onSearchChange={setSearch}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        onSelectRow={setSelectedMovementNumber}
      />

      <StockMovementDetailDialog
        movement={selectedMovement}
        onOpenChange={(open) => {
          if (!open) setSelectedMovementNumber(null);
        }}
      />
    </div>
  );
}
