// Placeholder data for the Locations page (spec §7.4 + §7.9). No backend
// endpoints exist yet for locations or balances — this module is the single
// place to swap mocks for real calls against /api/v1/locations and
// /api/v1/inventory/balances. Values are aligned with the location figures
// already used in the dashboard's mock data where the names overlap.

export interface LocationBalance {
  location: string;
  onHand: number;
  reserved: number;
  inTransit: number;
  damaged: number;
  quarantined: number;
  inventoryValue: number;
}

export const LOCATIONS: LocationBalance[] = [
  {
    location: "Main warehouse",
    onHand: 18420,
    reserved: 1240,
    inTransit: 0,
    damaged: 85,
    quarantined: 40,
    inventoryValue: 1862400,
  },
  {
    location: "Branch warehouse",
    onHand: 9210,
    reserved: 640,
    inTransit: 0,
    damaged: 32,
    quarantined: 15,
    inventoryValue: 941200,
  },
  {
    location: "Retail branch",
    onHand: 6840,
    reserved: 210,
    inTransit: 0,
    damaged: 18,
    quarantined: 0,
    inventoryValue: 684300,
  },
  {
    location: "Store stockroom",
    onHand: 4129,
    reserved: 95,
    inTransit: 0,
    damaged: 12,
    quarantined: 0,
    inventoryValue: 412900,
  },
  {
    location: "Damaged stock area",
    onHand: 0,
    reserved: 0,
    inTransit: 0,
    damaged: 612,
    quarantined: 0,
    inventoryValue: 18400,
  },
  {
    location: "Quarantine area",
    onHand: 0,
    reserved: 0,
    inTransit: 0,
    damaged: 0,
    quarantined: 340,
    inventoryValue: 61200,
  },
  {
    location: "In-transit location",
    onHand: 0,
    reserved: 0,
    inTransit: 1986,
    damaged: 0,
    quarantined: 0,
    inventoryValue: 198650,
  },
];

export function availableQuantity(balance: LocationBalance): number {
  return balance.onHand - balance.reserved;
}
