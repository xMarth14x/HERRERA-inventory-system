"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { INITIAL_INVENTORY_ALERTS, type InventoryAlert } from "@/lib/inventory-alert-data";

// A single shared cache entry (not a network fetch) so every component that
// reads it — the header bell, the Inventory Alerts page — reacts instantly
// to the same data. Mutating alerts anywhere updates everyone at once,
// without a page reload or a real backend.
const ALERTS_QUERY_KEY = ["inventory-alerts"] as const;

function seedAlerts(): InventoryAlert[] {
  return INITIAL_INVENTORY_ALERTS.map((alert) => ({ ...alert }));
}

/** Live-reads the shared alert list. Re-renders automatically when any component updates it. */
export function useInventoryAlerts() {
  const { data } = useQuery<InventoryAlert[]>({
    queryKey: ALERTS_QUERY_KEY,
    queryFn: () => seedAlerts(),
    initialData: seedAlerts,
    staleTime: Infinity,
  });
  return data;
}

/** Returns a setter that updates the shared alert list for every subscriber at once. */
export function useSetInventoryAlerts() {
  const queryClient = useQueryClient();
  return (updater: (current: InventoryAlert[]) => InventoryAlert[]) => {
    queryClient.setQueryData<InventoryAlert[]>(ALERTS_QUERY_KEY, (current) => updater(current ?? seedAlerts()));
  };
}
