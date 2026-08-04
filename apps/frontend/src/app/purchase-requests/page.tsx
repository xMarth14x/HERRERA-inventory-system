"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { StatusSummary } from "@/components/shared/status-summary";
import { PurchaseRequestsTable, STATUS_ALL } from "@/components/purchase-requests/purchase-requests-table";
import { PurchaseRequestDetailDialog } from "@/components/purchase-requests/purchase-request-detail-dialog";
import {
  getPurchaseRequests,
  getRequestedProductRows,
  PURCHASE_REQUEST_STATUSES,
} from "@/lib/purchase-request-data";

export default function PurchaseRequestsPage() {
  const requests = getPurchaseRequests();
  const rows = getRequestedProductRows();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState(STATUS_ALL);
  const [selectedRequestNumber, setSelectedRequestNumber] = useState<string | null>(null);

  const counts = useMemo(() => {
    const tally: Record<string, number> = {};
    for (const row of rows) {
      tally[row.status] = (tally[row.status] ?? 0) + 1;
    }
    return tally;
  }, [rows]);

  const selectedRequest = selectedRequestNumber
    ? (requests.find((r) => r.requestNumber === selectedRequestNumber) ?? null)
    : null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Purchase Request</h1>
          <p className="text-sm text-muted-foreground">
            Status report of every requested product, from draft through approval.
          </p>
        </div>
        <Button onClick={() => toast.info("Creating purchase requests isn't wired to the backend yet.")}>
          <Plus className="size-4" />
          New Purchase Request
        </Button>
      </div>

      <StatusSummary statuses={PURCHASE_REQUEST_STATUSES} counts={counts} />

      <PurchaseRequestsTable
        data={rows}
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onSelectRow={setSelectedRequestNumber}
      />

      <PurchaseRequestDetailDialog
        request={selectedRequest}
        onOpenChange={(open) => {
          if (!open) setSelectedRequestNumber(null);
        }}
      />
    </div>
  );
}
