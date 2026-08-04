"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { StatusSummary } from "@/components/shared/status-summary";
import { PurchaseOrdersTable, STATUS_ALL } from "@/components/purchase-orders/purchase-orders-table";
import { PurchaseOrderDetailDialog } from "@/components/purchase-orders/purchase-order-detail-dialog";
import {
  getPurchaseOrders,
  getPurchaseOrderLineRows,
  PURCHASE_ORDER_STATUSES,
} from "@/lib/purchase-order-data";

export default function PurchaseOrdersPage() {
  const orders = getPurchaseOrders();
  const rows = getPurchaseOrderLineRows();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState(STATUS_ALL);
  const [selectedPoNumber, setSelectedPoNumber] = useState<string | null>(null);

  const counts = useMemo(() => {
    const tally: Record<string, number> = {};
    for (const row of rows) {
      tally[row.status] = (tally[row.status] ?? 0) + 1;
    }
    return tally;
  }, [rows]);

  const selectedOrder = selectedPoNumber
    ? (orders.find((o) => o.poNumber === selectedPoNumber) ?? null)
    : null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Purchase Order</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            The Purchase Order module is included in the first production release. A{" "}
            <Link href="/purchase-requests" className="font-medium text-primary hover:underline">
              purchase request
            </Link>{" "}
            is submitted and approved before it converts into a purchase order.
          </p>
        </div>
        <Button onClick={() => toast.info("Creating purchase orders isn't wired to the backend yet.")}>
          <Plus className="size-4" />
          New Purchase Order
        </Button>
      </div>

      <StatusSummary statuses={PURCHASE_ORDER_STATUSES} counts={counts} />

      <PurchaseOrdersTable
        data={rows}
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onSelectRow={setSelectedPoNumber}
      />

      <PurchaseOrderDetailDialog
        order={selectedOrder}
        onOpenChange={(open) => {
          if (!open) setSelectedPoNumber(null);
        }}
      />
    </div>
  );
}
