import { ModuleSections } from "@/components/module-spec/module-sections";
import { BalanceSummary } from "@/components/inventory-balances/balance-summary";
import { AvailableByLocationChart } from "@/components/inventory-balances/available-by-location-chart";
import { BalanceByLocationTable } from "@/components/inventory-balances/balance-by-location-table";
import { inventoryBalancesContent } from "@/lib/module-content";

// "Balance Types" is now demonstrated by the KPI tiles below, so only the
// formula reference is kept as a callout.
const formulaSection = inventoryBalancesContent.sections.slice(1);

export default function InventoryBalancesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Inventory Balances</h1>
        <p className="max-w-3xl text-sm text-muted-foreground">
          {inventoryBalancesContent.description}
        </p>
      </div>

      <BalanceSummary />

      <ModuleSections sections={formulaSection} />

      <AvailableByLocationChart />

      <BalanceByLocationTable />
    </div>
  );
}
