"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { SuppliersTable } from "@/components/suppliers/suppliers-table";
import { SupplierDetailDialog } from "@/components/suppliers/supplier-detail-dialog";
import { getSuppliers, type Supplier } from "@/lib/supplier-data";

export default function SuppliersPage() {
  const suppliers = getSuppliers();
  const [search, setSearch] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Suppliers</h1>
          <p className="text-sm text-muted-foreground">
            Manage supplier records, terms, banking, and compliance documents.
          </p>
        </div>
        <Button onClick={() => toast.info("Creating suppliers isn't wired to the backend yet.")}>
          <Plus className="size-4" />
          New Supplier
        </Button>
      </div>

      <SuppliersTable
        data={suppliers}
        search={search}
        onSearchChange={setSearch}
        onSelectSupplier={setSelectedSupplier}
      />

      <SupplierDetailDialog
        supplier={selectedSupplier}
        onOpenChange={(open) => {
          if (!open) setSelectedSupplier(null);
        }}
      />
    </div>
  );
}
