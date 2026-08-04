import { LocationBalancesPanel } from "@/components/locations/location-balances-panel";

export default function LocationsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Locations</h1>
        <p className="max-w-3xl text-sm text-muted-foreground">
          Inventory balances are maintained separately for every product variant and location.
          Pick a location to see its balance breakdown.
        </p>
      </div>

      <LocationBalancesPanel />
    </div>
  );
}
