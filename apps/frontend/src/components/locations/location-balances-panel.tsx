"use client";

import { useMemo, useState } from "react";
import { Wallet, Boxes, PackageCheck, Lock, Truck, AlertTriangle, ShieldAlert } from "lucide-react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { formatCompactCurrency, formatNumber } from "@/lib/format";
import { LOCATIONS, availableQuantity } from "@/lib/location-data";
import { LocationBalanceChart } from "./location-balance-chart";

export function LocationBalancesPanel() {
  const [selected, setSelected] = useState(LOCATIONS[0].location);

  const balance = useMemo(
    () => LOCATIONS.find((l) => l.location === selected) ?? LOCATIONS[0],
    [selected],
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label className="text-xs text-muted-foreground">Location</Label>
        <Select value={selected} onValueChange={(v) => v && setSelected(v)}>
          <SelectTrigger className="min-w-64">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {LOCATIONS.map((l) => (
              <SelectItem key={l.location} value={l.location}>
                {l.location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          icon={Wallet}
          label="Inventory Value"
          value={formatCompactCurrency(balance.inventoryValue)}
          tone="blue"
        />
        <KpiCard
          icon={Boxes}
          label="On Hand"
          value={formatNumber(balance.onHand)}
          tone="blue"
        />
        <KpiCard
          icon={PackageCheck}
          label="Available (On Hand − Reserved)"
          value={formatNumber(availableQuantity(balance))}
          tone="green"
        />
        <KpiCard
          icon={Lock}
          label="Reserved (within On Hand)"
          value={formatNumber(balance.reserved)}
          tone="amber"
        />
        <KpiCard
          icon={Truck}
          label="In Transit"
          value={formatNumber(balance.inTransit)}
          tone="violet"
        />
        <KpiCard
          icon={AlertTriangle}
          label="Damaged"
          value={formatNumber(balance.damaged)}
          tone="red"
        />
        <KpiCard
          icon={ShieldAlert}
          label="Quarantined"
          value={formatNumber(balance.quarantined)}
          tone="gray"
        />
      </div>

      <LocationBalanceChart balance={balance} />
    </div>
  );
}
