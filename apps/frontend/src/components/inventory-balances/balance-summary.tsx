import { Wallet, Boxes, PackageCheck, Lock, Truck, AlertTriangle, ShieldAlert } from "lucide-react";
import { SummaryCard } from "@/components/shared/summary-card";
import { formatCompactCurrency, formatNumber } from "@/lib/format";
import { LOCATIONS } from "@/lib/location-data";

export function BalanceSummary() {
  const totals = LOCATIONS.reduce(
    (acc, l) => ({
      onHand: acc.onHand + l.onHand,
      reserved: acc.reserved + l.reserved,
      inTransit: acc.inTransit + l.inTransit,
      damaged: acc.damaged + l.damaged,
      quarantined: acc.quarantined + l.quarantined,
      inventoryValue: acc.inventoryValue + l.inventoryValue,
    }),
    { onHand: 0, reserved: 0, inTransit: 0, damaged: 0, quarantined: 0, inventoryValue: 0 },
  );
  const available = totals.onHand - totals.reserved;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <SummaryCard icon={Wallet} label="Total Inventory Value" value={formatCompactCurrency(totals.inventoryValue)} tone="blue" />
      <SummaryCard icon={Boxes} label="On Hand" value={formatNumber(totals.onHand)} tone="blue" />
      <SummaryCard icon={PackageCheck} label="Available (On Hand − Reserved)" value={formatNumber(available)} tone="green" />
      <SummaryCard icon={Lock} label="Reserved (within On Hand)" value={formatNumber(totals.reserved)} tone="amber" />
      <SummaryCard icon={Truck} label="In Transit" value={formatNumber(totals.inTransit)} tone="violet" />
      <SummaryCard icon={AlertTriangle} label="Damaged" value={formatNumber(totals.damaged)} tone="red" />
      <SummaryCard icon={ShieldAlert} label="Quarantined" value={formatNumber(totals.quarantined)} tone="gray" />
    </div>
  );
}
