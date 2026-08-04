export type InventoryAlertType =
  | "Low stock"
  | "Out of stock"
  | "Overstock"
  | "Negative-stock attempt"
  | "Expiring soon"
  | "Expired product"
  | "Pending purchase approval"
  | "Delayed purchase order"
  | "Unreceived transfer"
  | "Unusual adjustment"
  | "Unresolved stock-count variance";

export type InventoryAlertSeverity = "CRITICAL" | "WARNING" | "INFO";
export type InventoryAlertStatus = "OPEN" | "ACKNOWLEDGED" | "RESOLVED";

export interface InventoryAlert {
  id: string;
  type: InventoryAlertType;
  severity: InventoryAlertSeverity;
  status: InventoryAlertStatus;
  title: string;
  message: string;
  location: string;
  reference: string;
  triggeredAt: string;
  recommendedAction: string;
  currentValue: string;
  threshold: string;
  read: boolean;
  acknowledgedBy: string;
  resolvedBy: string;
}

export const INVENTORY_ALERT_TYPES: InventoryAlertType[] = [
  "Low stock",
  "Out of stock",
  "Overstock",
  "Negative-stock attempt",
  "Expiring soon",
  "Expired product",
  "Pending purchase approval",
  "Delayed purchase order",
  "Unreceived transfer",
  "Unusual adjustment",
  "Unresolved stock-count variance",
];

export const INITIAL_INVENTORY_ALERTS: InventoryAlert[] = [
  {
    id: "ALT-2026-00142",
    type: "Out of stock",
    severity: "CRITICAL",
    status: "OPEN",
    title: "Ceramic Mug - Matte Black is out of stock",
    message: "Available inventory reached zero after the latest stock issue.",
    location: "Retail branch",
    reference: "CMG-BLK-350",
    triggeredAt: "2026-08-04T08:35:00+08:00",
    recommendedAction: "Create a replenishment request or transfer stock from another location.",
    currentValue: "0 available",
    threshold: "Reorder at 12",
    read: false,
    acknowledgedBy: "",
    resolvedBy: "",
  },
  {
    id: "ALT-2026-00141",
    type: "Negative-stock attempt",
    severity: "CRITICAL",
    status: "OPEN",
    title: "Issue blocked for Cotton Tote Bag",
    message: "A request for 18 units was blocked because only 11 units are available.",
    location: "Store stockroom",
    reference: "SI-2026-000291",
    triggeredAt: "2026-08-04T08:10:00+08:00",
    recommendedAction: "Verify the physical balance and reduce the issue quantity or replenish stock.",
    currentValue: "11 available",
    threshold: "18 requested",
    read: false,
    acknowledgedBy: "",
    resolvedBy: "",
  },
  {
    id: "ALT-2026-00140",
    type: "Unresolved stock-count variance",
    severity: "CRITICAL",
    status: "ACKNOWLEDGED",
    title: "Branch count variance awaiting resolution",
    message: "Physical count PSC-2026-000019 has a net variance of +1 unit.",
    location: "Retail branch",
    reference: "PSC-2026-000019",
    triggeredAt: "2026-08-04T07:50:00+08:00",
    recommendedAction: "Review variance notes, approve the count, and generate inventory movements.",
    currentValue: "+1 unit",
    threshold: "Any unresolved variance",
    read: true,
    acknowledgedBy: "L. Herrera",
    resolvedBy: "",
  },
  {
    id: "ALT-2026-00139",
    type: "Expired product",
    severity: "CRITICAL",
    status: "OPEN",
    title: "Herbal Tea batch has expired",
    message: "Batch HT-24017 passed its expiry date and remains in sellable inventory.",
    location: "Main warehouse",
    reference: "HT-24017",
    triggeredAt: "2026-08-04T06:00:00+08:00",
    recommendedAction: "Quarantine the batch and create an expiry stock adjustment.",
    currentValue: "24 units",
    threshold: "Expired Aug 3, 2026",
    read: false,
    acknowledgedBy: "",
    resolvedBy: "",
  },
  {
    id: "ALT-2026-00138",
    type: "Low stock",
    severity: "WARNING",
    status: "OPEN",
    title: "Aromatherapy Oil is below reorder level",
    message: "Available quantity has fallen below the configured reorder point.",
    location: "Branch warehouse",
    reference: "ARO-LAV-30",
    triggeredAt: "2026-08-03T16:25:00+08:00",
    recommendedAction: "Review demand and create a purchase or transfer request.",
    currentValue: "8 available",
    threshold: "Reorder at 15",
    read: true,
    acknowledgedBy: "",
    resolvedBy: "",
  },
  {
    id: "ALT-2026-00137",
    type: "Expiring soon",
    severity: "WARNING",
    status: "ACKNOWLEDGED",
    title: "Scented Candle batch expires in 21 days",
    message: "Batch SC-25108 is within the configured 30-day expiry warning window.",
    location: "Main warehouse",
    reference: "SC-25108",
    triggeredAt: "2026-08-03T08:00:00+08:00",
    recommendedAction: "Prioritize the batch for dispatch or arrange a stock transfer.",
    currentValue: "42 units",
    threshold: "Expires Aug 25, 2026",
    read: true,
    acknowledgedBy: "M. Reyes",
    resolvedBy: "",
  },
  {
    id: "ALT-2026-00136",
    type: "Delayed purchase order",
    severity: "WARNING",
    status: "OPEN",
    title: "Purchase order is 4 days late",
    message: "PO-2026-000184 has not been fully received after its expected delivery date.",
    location: "Main warehouse",
    reference: "PO-2026-000184",
    triggeredAt: "2026-08-03T07:30:00+08:00",
    recommendedAction: "Contact the supplier and update the expected delivery date.",
    currentValue: "40 units remaining",
    threshold: "Expected Jul 30, 2026",
    read: false,
    acknowledgedBy: "",
    resolvedBy: "",
  },
  {
    id: "ALT-2026-00135",
    type: "Unreceived transfer",
    severity: "WARNING",
    status: "OPEN",
    title: "Dispatched transfer has not been received",
    message: "Transfer ST-2026-000077 has been in transit for more than 48 hours.",
    location: "Main warehouse → Retail branch",
    reference: "ST-2026-000077",
    triggeredAt: "2026-08-02T14:20:00+08:00",
    recommendedAction: "Confirm delivery with the destination location or report a discrepancy.",
    currentValue: "52 hours in transit",
    threshold: "48-hour limit",
    read: true,
    acknowledgedBy: "",
    resolvedBy: "",
  },
  {
    id: "ALT-2026-00134",
    type: "Unusual adjustment",
    severity: "WARNING",
    status: "ACKNOWLEDGED",
    title: "Large manual adjustment requires review",
    message: "Adjustment SA-2026-000063 reduced stock by 12 units, exceeding the review threshold.",
    location: "Damaged stock area",
    reference: "SA-2026-000063",
    triggeredAt: "2026-08-02T11:05:00+08:00",
    recommendedAction: "Verify the damage report and confirm the approver and supporting documents.",
    currentValue: "−12 units",
    threshold: "Review at ±10 units",
    read: true,
    acknowledgedBy: "L. Herrera",
    resolvedBy: "",
  },
  {
    id: "ALT-2026-00133",
    type: "Pending purchase approval",
    severity: "INFO",
    status: "OPEN",
    title: "Purchase request pending for 2 days",
    message: "PR-2026-000211 remains in the approval queue.",
    location: "Head office",
    reference: "PR-2026-000211",
    triggeredAt: "2026-08-02T09:00:00+08:00",
    recommendedAction: "Review the request total and approve, reject, or return it for revision.",
    currentValue: "₱48,750 request",
    threshold: "Pending over 24 hours",
    read: false,
    acknowledgedBy: "",
    resolvedBy: "",
  },
  {
    id: "ALT-2026-00132",
    type: "Overstock",
    severity: "INFO",
    status: "RESOLVED",
    title: "Bamboo Cutlery exceeds maximum stock",
    message: "Available quantity exceeded the configured maximum following a purchase receipt.",
    location: "Main warehouse",
    reference: "BCS-NAT-01",
    triggeredAt: "2026-08-01T15:40:00+08:00",
    recommendedAction: "Rebalance stock to a branch or revise the maximum level if demand has changed.",
    currentValue: "560 available",
    threshold: "Maximum 500",
    read: true,
    acknowledgedBy: "R. Domingo",
    resolvedBy: "R. Domingo",
  },
];
