"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { UnitsTable } from "@/components/catalog/units-table";
import { NewUnitDialog } from "@/components/catalog/new-unit-dialog";
import { UNITS, type Unit } from "@/lib/catalog-data";

export default function UnitsPage() {
  const [units, setUnits] = useState<Unit[]>(() => UNITS);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const existingCodes = useMemo(() => new Set(units.map((unit) => unit.code)), [units]);

  function handleCreate(unit: Unit) {
    setUnits((current) => [...current, unit]);
    setIsCreateOpen(false);
    toast.success(`${unit.name} added to Units of Measurement.`);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Units of Measurement</h1>
          <p className="max-w-3xl text-sm text-muted-foreground">
            Every unit the catalog supports, grouped by measurement type — Count, Weight, or Volume.
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="size-4" />
          Add Unit
        </Button>
      </div>

      <UnitsTable units={units} />

      <NewUnitDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        existingCodes={existingCodes}
        onCreate={handleCreate}
      />
    </div>
  );
}
