export type AuditModule =
  | "Authentication"
  | "Users & Roles"
  | "Products"
  | "Purchase Orders"
  | "Goods Receiving"
  | "Stock Adjustments"
  | "Stock Transfers"
  | "Physical Stock Count"
  | "Reports"
  | "System Configuration";

export type AuditResult = "SUCCESS" | "FAILED";

export interface AuditChange {
  field: string;
  previousValue: string;
  newValue: string;
}

export interface AuditLogEntry {
  id: string;
  user: string;
  action: string;
  module: AuditModule;
  recordType: string;
  recordId: string;
  changes: AuditChange[];
  reason: string;
  ipAddress: string;
  device: string;
  occurredAt: string;
  result: AuditResult;
  sensitive: boolean;
}

export const AUDIT_MODULES: AuditModule[] = [
  "Authentication",
  "Users & Roles",
  "Products",
  "Purchase Orders",
  "Goods Receiving",
  "Stock Adjustments",
  "Stock Transfers",
  "Physical Stock Count",
  "Reports",
  "System Configuration",
];

export const AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: "AUD-2026-004821",
    user: "L. Herrera",
    action: "STOCK_COUNT_APPROVED",
    module: "Physical Stock Count",
    recordType: "Stock count",
    recordId: "PSC-2026-000018",
    changes: [
      { field: "Status", previousValue: "FOR_APPROVAL", newValue: "COMPLETED" },
      { field: "Movement", previousValue: "—", newValue: "MV-2026-001842" },
    ],
    reason: "Variance notes reviewed and physical count approved.",
    ipAddress: "192.168.10.14",
    device: "Windows 11 · Chrome 128",
    occurredAt: "2026-08-04T09:42:00+08:00",
    result: "SUCCESS",
    sensitive: true,
  },
  {
    id: "AUD-2026-004820",
    user: "J. Alcantara",
    action: "REPORT_EXPORTED",
    module: "Reports",
    recordType: "Inventory report",
    recordId: "current-stock",
    changes: [{ field: "Export format", previousValue: "—", newValue: "CSV" }],
    reason: "Month-end inventory reconciliation.",
    ipAddress: "192.168.10.22",
    device: "Windows 11 · Edge 128",
    occurredAt: "2026-08-04T09:31:00+08:00",
    result: "SUCCESS",
    sensitive: true,
  },
  {
    id: "AUD-2026-004819",
    user: "L. Herrera",
    action: "PURCHASE_ORDER_APPROVED",
    module: "Purchase Orders",
    recordType: "Purchase order",
    recordId: "PO-2026-000140",
    changes: [
      { field: "Status", previousValue: "FOR_APPROVAL", newValue: "APPROVED" },
      { field: "Approved by", previousValue: "—", newValue: "L. Herrera" },
    ],
    reason: "Order is within the approved eco-line rollout budget.",
    ipAddress: "192.168.10.14",
    device: "Windows 11 · Chrome 128",
    occurredAt: "2026-08-04T09:18:00+08:00",
    result: "SUCCESS",
    sensitive: true,
  },
  {
    id: "AUD-2026-004818",
    user: "Unknown user",
    action: "LOGIN_FAILED",
    module: "Authentication",
    recordType: "Login attempt",
    recordId: "m.reyes@herrera.local",
    changes: [],
    reason: "Invalid password. Attempt 3 of 5 before temporary lockout.",
    ipAddress: "203.177.45.88",
    device: "Android 15 · Chrome Mobile 128",
    occurredAt: "2026-08-04T09:04:00+08:00",
    result: "FAILED",
    sensitive: true,
  },
  {
    id: "AUD-2026-004817",
    user: "R. Domingo",
    action: "GOODS_RECEIPT_CONFIRMED",
    module: "Goods Receiving",
    recordType: "Goods receipt",
    recordId: "GR-2026-000050",
    changes: [
      { field: "Status", previousValue: "DRAFT", newValue: "CONFIRMED" },
      { field: "Received quantity", previousValue: "0", newValue: "240" },
      { field: "Movement", previousValue: "—", newValue: "SM-2026-004821" },
    ],
    reason: "Delivery quantities matched the supplier documents.",
    ipAddress: "192.168.20.31",
    device: "Windows 10 · Chrome 128",
    occurredAt: "2026-08-04T08:12:00+08:00",
    result: "SUCCESS",
    sensitive: true,
  },
  {
    id: "AUD-2026-004816",
    user: "J. Alcantara",
    action: "STOCK_TRANSFER_RECEIVED",
    module: "Stock Transfers",
    recordType: "Stock transfer",
    recordId: "ST-2026-000031",
    changes: [
      { field: "Status", previousValue: "IN_TRANSIT", newValue: "RECEIVED" },
      { field: "Received quantity", previousValue: "0", newValue: "60" },
    ],
    reason: "Destination warehouse confirmed complete delivery.",
    ipAddress: "192.168.30.19",
    device: "iPadOS 19 · Safari",
    occurredAt: "2026-08-04T07:55:00+08:00",
    result: "SUCCESS",
    sensitive: true,
  },
  {
    id: "AUD-2026-004815",
    user: "System Administrator",
    action: "ROLE_PERMISSIONS_UPDATED",
    module: "Users & Roles",
    recordType: "Role",
    recordId: "Inventory Approver",
    changes: [
      { field: "Reports.Export", previousValue: "Denied", newValue: "Allowed" },
      { field: "StockCount.Approve", previousValue: "Denied", newValue: "Allowed" },
    ],
    reason: "Approved access request IT-2026-0087.",
    ipAddress: "192.168.10.5",
    device: "Windows 11 · Edge 128",
    occurredAt: "2026-08-03T17:20:00+08:00",
    result: "SUCCESS",
    sensitive: true,
  },
  {
    id: "AUD-2026-004814",
    user: "M. Reyes",
    action: "PRODUCT_UPDATED",
    module: "Products",
    recordType: "Product variant",
    recordId: "ARO-LAV-30",
    changes: [
      { field: "Reorder point", previousValue: "60", newValue: "70" },
      { field: "Reorder quantity", previousValue: "120", newValue: "150" },
    ],
    reason: "Updated thresholds based on the latest consumption trend.",
    ipAddress: "192.168.10.28",
    device: "macOS 15 · Safari",
    occurredAt: "2026-08-03T16:40:00+08:00",
    result: "SUCCESS",
    sensitive: true,
  },
  {
    id: "AUD-2026-004813",
    user: "L. Herrera",
    action: "STOCK_ADJUSTMENT_APPROVED",
    module: "Stock Adjustments",
    recordType: "Stock adjustment",
    recordId: "SA-2026-000063",
    changes: [
      { field: "Status", previousValue: "FOR_APPROVAL", newValue: "POSTED" },
      { field: "Quantity", previousValue: "96", newValue: "84" },
    ],
    reason: "Damage report and attachment verified.",
    ipAddress: "192.168.10.14",
    device: "Windows 11 · Chrome 128",
    occurredAt: "2026-08-03T15:05:00+08:00",
    result: "SUCCESS",
    sensitive: true,
  },
  {
    id: "AUD-2026-004812",
    user: "M. Reyes",
    action: "PASSWORD_CHANGED",
    module: "Authentication",
    recordType: "User account",
    recordId: "USR-00018",
    changes: [{ field: "Password", previousValue: "Protected", newValue: "Changed" }],
    reason: "User-initiated password change.",
    ipAddress: "192.168.10.28",
    device: "macOS 15 · Safari",
    occurredAt: "2026-08-03T14:22:00+08:00",
    result: "SUCCESS",
    sensitive: true,
  },
  {
    id: "AUD-2026-004811",
    user: "K. Santos",
    action: "LOGIN_SUCCESS",
    module: "Authentication",
    recordType: "User session",
    recordId: "SES-8A2F194B",
    changes: [],
    reason: "Valid credentials and active account.",
    ipAddress: "192.168.40.12",
    device: "Android 15 · Chrome Mobile 128",
    occurredAt: "2026-08-03T08:02:00+08:00",
    result: "SUCCESS",
    sensitive: true,
  },
  {
    id: "AUD-2026-004810",
    user: "System Administrator",
    action: "INVENTORY_SETTING_UPDATED",
    module: "System Configuration",
    recordType: "Inventory setting",
    recordId: "negative-stock-policy",
    changes: [{ field: "Allow negative stock", previousValue: "Enabled", newValue: "Disabled" }],
    reason: "Policy change approved by operations management.",
    ipAddress: "192.168.10.5",
    device: "Windows 11 · Edge 128",
    occurredAt: "2026-08-02T13:30:00+08:00",
    result: "SUCCESS",
    sensitive: true,
  },
  {
    id: "AUD-2026-004809",
    user: "R. Domingo",
    action: "PRODUCT_VIEWED",
    module: "Products",
    recordType: "Product variant",
    recordId: "LUM-BR540-50",
    changes: [],
    reason: "Product detail viewed from inventory lookup.",
    ipAddress: "192.168.20.31",
    device: "Windows 10 · Chrome 128",
    occurredAt: "2026-08-02T11:44:00+08:00",
    result: "SUCCESS",
    sensitive: false,
  },
  {
    id: "AUD-2026-004808",
    user: "K. Santos",
    action: "REPORT_VIEWED",
    module: "Reports",
    recordType: "Analysis report",
    recordId: "reorder-recommendations",
    changes: [],
    reason: "Report opened from the Reports module.",
    ipAddress: "192.168.40.12",
    device: "Android 15 · Chrome Mobile 128",
    occurredAt: "2026-08-01T16:18:00+08:00",
    result: "SUCCESS",
    sensitive: false,
  },
];

export function getAuditActionLabel(action: string): string {
  return action
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" ");
}
