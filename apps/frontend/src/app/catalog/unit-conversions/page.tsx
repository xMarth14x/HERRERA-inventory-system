import { UnitConversionsTable } from "@/components/catalog/unit-conversions-table";
import { UnitConverter } from "@/components/catalog/unit-converter";

export default function UnitConversionsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Unit Conversions</h1>
        <p className="max-w-3xl text-sm text-muted-foreground">
          Look up the most common conversions, or convert any quantity between two units of the same type.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <UnitConversionsTable />
        <UnitConverter />
      </div>
    </div>
  );
}
