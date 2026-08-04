import { PURCHASE_ORDERS, getPurchaseOrderTotals } from "./purchase-order-data";
import { PURCHASE_REQUESTS } from "./purchase-request-data";
import { STOCK_ADJUSTMENTS } from "./stock-adjustment-data";
import { INITIAL_STOCK_COUNTS, getCountVariance } from "./stock-count-data";
import { STOCK_MOVEMENTS } from "./stock-movement-data";

export type ReportCategory = "inventory" | "purchasing" | "analysis";
export type ReportFormat = "text" | "number" | "currency" | "percent" | "date" | "signed";
export type ReportRow = Record<string, string | number>;

export interface ReportColumn {
  key: string;
  label: string;
  format?: ReportFormat;
  align?: "left" | "right";
}

export interface ReportMetric {
  label: string;
  key?: string;
  aggregation: "count" | "sum" | "average";
  format?: ReportFormat;
  detail: string;
}

export interface ReportDefinition {
  id: string;
  category: ReportCategory;
  name: string;
  description: string;
}

export interface ReportResult {
  columns: ReportColumn[];
  rows: ReportRow[];
  metrics: ReportMetric[];
  locationKey?: string;
}

export const REPORT_CATEGORIES: Array<{ id: ReportCategory; label: string; description: string }> = [
  { id: "inventory", label: "Inventory reports", description: "Balances, movements, valuation, expiry, and variances" },
  { id: "purchasing", label: "Purchasing reports", description: "Requests, orders, suppliers, delivery, and pricing" },
  { id: "analysis", label: "Analysis reports", description: "Movement velocity, turnover, trends, and recommendations" },
];

export const REPORT_DEFINITIONS: ReportDefinition[] = [
  { id: "current-stock", category: "inventory", name: "Current stock balance", description: "On-hand, reserved, available, and inventory value by SKU." },
  { id: "stock-by-location", category: "inventory", name: "Stock by location", description: "Current inventory quantities and values at each storage location." },
  { id: "stock-status", category: "inventory", name: "Stock availability breakdown", description: "Available, reserved, in-transit, and damaged stock by SKU." },
  { id: "movement-ledger", category: "inventory", name: "Movement ledger", description: "Auditable inventory receipts, issues, transfers, adjustments, and reversals." },
  { id: "valuation-aging", category: "inventory", name: "Inventory valuation and aging", description: "Inventory cost value grouped by stock age." },
  { id: "batch-expiry", category: "inventory", name: "Batch and expiry", description: "Tracked batches with expiry dates and remaining shelf life." },
  { id: "stock-exceptions", category: "inventory", name: "Low, out-of-stock, and overstock", description: "Items outside their configured stock-level thresholds." },
  { id: "adjustments-variances", category: "inventory", name: "Adjustments and count variances", description: "Manual stock adjustments and physical-count differences." },
  { id: "purchase-requests", category: "purchasing", name: "Purchase request report", description: "Request values, departments, required dates, and approval statuses." },
  { id: "purchase-orders", category: "purchasing", name: "Purchase order report", description: "Purchase-order values, suppliers, delivery locations, and statuses." },
  { id: "open-orders", category: "purchasing", name: "Open, partially received, and delayed POs", description: "Outstanding quantities and delivery delays for active orders." },
  { id: "purchase-history", category: "purchasing", name: "Purchase history", description: "Chronological record of submitted and completed purchase orders." },
  { id: "supplier-history", category: "purchasing", name: "Supplier purchase history", description: "Order quantities and spend summarized by supplier." },
  { id: "supplier-performance", category: "purchasing", name: "Supplier delivery performance", description: "Receipt completion, rejection, and on-time delivery indicators." },
  { id: "price-variance", category: "purchasing", name: "Purchase price variance", description: "Ordered unit prices compared with standard product costs." },
  { id: "fast-moving", category: "analysis", name: "Fast-moving products", description: "Products with the highest recent issue quantities." },
  { id: "slow-moving", category: "analysis", name: "Slow-moving products", description: "Products with limited movement during the last 90 days." },
  { id: "dead-stock", category: "analysis", name: "Dead stock", description: "Aged products with no recent inventory issues." },
  { id: "turnover", category: "analysis", name: "Inventory turnover", description: "Annualized consumption compared with average inventory." },
  { id: "average-value", category: "analysis", name: "Average inventory value", description: "Average and current stock values by product." },
  { id: "consumption-trends", category: "analysis", name: "Consumption trends", description: "Three-month issue trends and average monthly consumption." },
  { id: "reorder-recommendations", category: "analysis", name: "Reorder recommendations", description: "Suggested replenishment for products below their reorder points." },
];

interface InventorySnapshot {
  product: string;
  sku: string;
  category: string;
  location: string;
  onHand: number;
  reserved: number;
  inTransit: number;
  damaged: number;
  unitCost: number;
  ageDays: number;
  batch: string;
  expiry: string;
  issued30: number;
  issued90: number;
  avgInventory: number;
  reorderPoint: number;
  maximum: number;
  consumption: [number, number, number];
}

const INVENTORY_SNAPSHOT: InventorySnapshot[] = [
  { product: "Lumea Perfume - BR540, 50 ml", sku: "LUM-BR540-50", category: "Fragrances", location: "Main warehouse", onHand: 1440, reserved: 220, inTransit: 200, damaged: 8, unitCost: 320, ageDays: 45, batch: "LP-2606-04", expiry: "2028-06-30", issued30: 380, issued90: 980, avgInventory: 1120, reorderPoint: 40, maximum: 1800, consumption: [290, 325, 380] },
  { product: "Lumea Perfume - Aventus, 50 ml", sku: "LUM-AVT-50", category: "Fragrances", location: "Main warehouse", onHand: 210, reserved: 35, inTransit: 150, damaged: 2, unitCost: 340, ageDays: 38, batch: "LP-2606-08", expiry: "2028-06-30", issued30: 132, issued90: 356, avgInventory: 245, reorderPoint: 30, maximum: 250, consumption: [104, 120, 132] },
  { product: "Ceramic Mug - Matte Black", sku: "CMG-BLK-350", category: "Drinkware", location: "Retail branch", onHand: 78, reserved: 15, inTransit: 40, damaged: 3, unitCost: 85, ageDays: 82, batch: "", expiry: "", issued30: 96, issued90: 241, avgInventory: 105, reorderPoint: 80, maximum: 500, consumption: [68, 77, 96] },
  { product: "Ceramic Mug - Glossy White", sku: "CMG-WHT-350", category: "Drinkware", location: "Branch warehouse", onHand: 42, reserved: 8, inTransit: 0, damaged: 1, unitCost: 85, ageDays: 119, batch: "", expiry: "", issued30: 18, issued90: 52, avgInventory: 61, reorderPoint: 80, maximum: 500, consumption: [16, 18, 18] },
  { product: "Cotton Tote Bag - Natural", sku: "CTB-NAT-01", category: "Textiles", location: "Main warehouse", onHand: 360, reserved: 75, inTransit: 60, damaged: 4, unitCost: 60, ageDays: 67, batch: "", expiry: "", issued30: 164, issued90: 432, avgInventory: 325, reorderPoint: 100, maximum: 600, consumption: [128, 140, 164] },
  { product: "Scented Candle - Sandalwood", sku: "SCN-SDW-200", category: "Wellness", location: "Damaged stock area", onHand: 84, reserved: 0, inTransit: 0, damaged: 12, unitCost: 110, ageDays: 154, batch: "SC-25108", expiry: "2026-08-25", issued30: 12, issued90: 45, avgInventory: 102, reorderPoint: 60, maximum: 400, consumption: [18, 15, 12] },
  { product: "Scented Candle - Lavender", sku: "SCN-LAV-200", category: "Wellness", location: "Retail branch", onHand: 18, reserved: 4, inTransit: 0, damaged: 2, unitCost: 110, ageDays: 176, batch: "SC-25092", expiry: "2026-11-10", issued30: 9, issued90: 28, avgInventory: 31, reorderPoint: 60, maximum: 400, consumption: [11, 8, 9] },
  { product: "Bamboo Cutlery Set", sku: "BMB-CTL-04", category: "Home Goods", location: "Store stockroom", onHand: 560, reserved: 40, inTransit: 0, damaged: 0, unitCost: 45, ageDays: 213, batch: "", expiry: "", issued30: 7, issued90: 20, avgInventory: 515, reorderPoint: 50, maximum: 500, consumption: [8, 5, 7] },
  { product: "Aromatherapy Oil - Lavender", sku: "ARO-LAV-30", category: "Wellness", location: "Branch warehouse", onHand: 8, reserved: 0, inTransit: 0, damaged: 1, unitCost: 95, ageDays: 201, batch: "AO-25044", expiry: "2026-09-18", issued30: 14, issued90: 39, avgInventory: 26, reorderPoint: 70, maximum: 400, consumption: [12, 13, 14] },
  { product: "Herbal Tea Sampler - 12-Pack", sku: "HTS-SMP-12", category: "Wellness", location: "Main warehouse", onHand: 24, reserved: 0, inTransit: 0, damaged: 24, unitCost: 130, ageDays: 311, batch: "HT-24017", expiry: "2026-08-03", issued30: 0, issued90: 0, avgInventory: 58, reorderPoint: 50, maximum: 300, consumption: [0, 0, 0] },
  { product: "Brass Desk Organizer", sku: "BRS-DSK-02", category: "Home Goods", location: "Main warehouse", onHand: 50, reserved: 5, inTransit: 40, damaged: 0, unitCost: 210, ageDays: 267, batch: "", expiry: "", issued30: 2, issued90: 7, avgInventory: 64, reorderPoint: 25, maximum: 200, consumption: [3, 2, 2] },
  { product: "Wool Throw Blanket - Grey", sku: "WTB-GRY-01", category: "Textiles", location: "Branch warehouse", onHand: 20, reserved: 0, inTransit: 0, damaged: 0, unitCost: 380, ageDays: 354, batch: "", expiry: "", issued30: 0, issued90: 0, avgInventory: 22, reorderPoint: 20, maximum: 100, consumption: [0, 0, 0] },
];

const CURRENT_DATE = new Date("2026-08-04T00:00:00+08:00");
const numberColumn = (key: string, label: string): ReportColumn => ({ key, label, format: "number", align: "right" });
const currencyColumn = (key: string, label: string): ReportColumn => ({ key, label, format: "currency", align: "right" });
const percentColumn = (key: string, label: string): ReportColumn => ({ key, label, format: "percent", align: "right" });
const signedColumn = (key: string, label: string): ReportColumn => ({ key, label, format: "signed", align: "right" });
const dateColumn = (key: string, label: string): ReportColumn => ({ key, label, format: "date" });

function available(row: InventorySnapshot) {
  return row.onHand - row.reserved - row.damaged;
}

function poQuantity(po: (typeof PURCHASE_ORDERS)[number]) {
  return po.items.reduce((sum, item) => sum + item.orderedQuantity, 0);
}

function poReceived(po: (typeof PURCHASE_ORDERS)[number]) {
  return po.items.reduce((sum, item) => sum + item.receivedQuantity, 0);
}

function daysBetween(date: string, comparison = CURRENT_DATE) {
  return Math.round((new Date(date).getTime() - comparison.getTime()) / 86_400_000);
}

function baseMetrics(...metrics: ReportMetric[]): ReportMetric[] {
  return [{ label: "Records", aggregation: "count", detail: "Rows in this report" }, ...metrics];
}

export function getReportResult(reportId: string): ReportResult {
  switch (reportId) {
    case "current-stock": {
      const rows = INVENTORY_SNAPSHOT.map((row) => ({
        product: row.product,
        sku: row.sku,
        category: row.category,
        location: row.location,
        onHand: row.onHand,
        reserved: row.reserved,
        available: available(row),
        value: row.onHand * row.unitCost,
      }));
      return {
        columns: [{ key: "product", label: "Product" }, { key: "sku", label: "SKU" }, { key: "category", label: "Category" }, numberColumn("onHand", "On hand"), numberColumn("reserved", "Reserved"), numberColumn("available", "Available"), currencyColumn("value", "Stock value")],
        rows,
        metrics: baseMetrics({ label: "On hand", key: "onHand", aggregation: "sum", format: "number", detail: "Total physical quantity" }, { label: "Available", key: "available", aggregation: "sum", format: "number", detail: "After reservations and damage" }, { label: "Stock value", key: "value", aggregation: "sum", format: "currency", detail: "Quantity at unit cost" }),
        locationKey: "location",
      };
    }
    case "stock-by-location": {
      const rows = INVENTORY_SNAPSHOT.map((row) => ({ product: row.product, sku: row.sku, location: row.location, onHand: row.onHand, reserved: row.reserved, available: available(row), value: row.onHand * row.unitCost }));
      return { columns: [{ key: "location", label: "Location" }, { key: "product", label: "Product" }, { key: "sku", label: "SKU" }, numberColumn("onHand", "On hand"), numberColumn("reserved", "Reserved"), numberColumn("available", "Available"), currencyColumn("value", "Value")], rows, metrics: baseMetrics({ label: "On hand", key: "onHand", aggregation: "sum", format: "number", detail: "Across selected locations" }, { label: "Available", key: "available", aggregation: "sum", format: "number", detail: "Usable stock" }, { label: "Value", key: "value", aggregation: "sum", format: "currency", detail: "Inventory cost value" }), locationKey: "location" };
    }
    case "stock-status": {
      const rows = INVENTORY_SNAPSHOT.map((row) => ({ product: row.product, sku: row.sku, location: row.location, onHand: row.onHand, reserved: row.reserved, inTransit: row.inTransit, damaged: row.damaged, available: available(row) }));
      return { columns: [{ key: "product", label: "Product" }, { key: "location", label: "Location" }, numberColumn("onHand", "On hand"), numberColumn("reserved", "Reserved"), numberColumn("inTransit", "In transit"), numberColumn("damaged", "Damaged"), numberColumn("available", "Available")], rows, metrics: baseMetrics({ label: "Reserved", key: "reserved", aggregation: "sum", format: "number", detail: "Committed quantity" }, { label: "In transit", key: "inTransit", aggregation: "sum", format: "number", detail: "Inbound transfers and orders" }, { label: "Damaged", key: "damaged", aggregation: "sum", format: "number", detail: "Unavailable stock" }), locationKey: "location" };
    }
    case "movement-ledger": {
      const rows = STOCK_MOVEMENTS.map((movement) => ({ date: movement.occurredAt, movement: movement.movementNumber, type: movement.type.replaceAll("_", " "), product: movement.productName, sku: movement.sku, location: movement.location, change: movement.quantityChange, after: movement.quantityAfter, reference: movement.referenceNumber }));
      return { columns: [dateColumn("date", "Date"), { key: "movement", label: "Movement #" }, { key: "type", label: "Type" }, { key: "product", label: "Product" }, { key: "location", label: "Location" }, signedColumn("change", "Change"), numberColumn("after", "Balance after"), { key: "reference", label: "Reference" }], rows, metrics: baseMetrics({ label: "Quantity in", key: "changeIn", aggregation: "sum", format: "number", detail: "Positive stock movement" }, { label: "Net change", key: "change", aggregation: "sum", format: "signed", detail: "All posted movement quantities" }), locationKey: "location" };
    }
    case "valuation-aging": {
      const rows = INVENTORY_SNAPSHOT.map((row) => ({ product: row.product, sku: row.sku, location: row.location, onHand: row.onHand, unitCost: row.unitCost, value: row.onHand * row.unitCost, ageDays: row.ageDays, ageBand: row.ageDays <= 90 ? "0–90 days" : row.ageDays <= 180 ? "91–180 days" : row.ageDays <= 365 ? "181–365 days" : "Over 365 days" }));
      return { columns: [{ key: "product", label: "Product" }, { key: "location", label: "Location" }, numberColumn("onHand", "Quantity"), currencyColumn("unitCost", "Unit cost"), currencyColumn("value", "Value"), numberColumn("ageDays", "Age (days)"), { key: "ageBand", label: "Age band" }], rows, metrics: baseMetrics({ label: "Inventory value", key: "value", aggregation: "sum", format: "currency", detail: "At unit cost" }, { label: "Average age", key: "ageDays", aggregation: "average", format: "number", detail: "Days held in inventory" }, { label: "Aged value", key: "agedValue", aggregation: "sum", format: "currency", detail: "Stock older than 180 days" }), locationKey: "location" };
    }
    case "batch-expiry": {
      const rows = INVENTORY_SNAPSHOT.filter((row) => row.batch).map((row) => { const days = daysBetween(row.expiry); return { product: row.product, sku: row.sku, batch: row.batch, location: row.location, quantity: row.onHand, expiry: row.expiry, daysRemaining: days, status: days < 0 ? "Expired" : days <= 30 ? "Expiring soon" : "Valid" }; });
      return { columns: [{ key: "product", label: "Product" }, { key: "batch", label: "Batch" }, { key: "location", label: "Location" }, numberColumn("quantity", "Quantity"), dateColumn("expiry", "Expiry"), signedColumn("daysRemaining", "Days remaining"), { key: "status", label: "Status" }], rows, metrics: baseMetrics({ label: "Tracked quantity", key: "quantity", aggregation: "sum", format: "number", detail: "Batch-controlled units" }, { label: "Expired units", key: "expiredQuantity", aggregation: "sum", format: "number", detail: "Past expiry date" }, { label: "Expiring ≤30 days", key: "expiringQuantity", aggregation: "sum", format: "number", detail: "Immediate action window" }), locationKey: "location" };
    }
    case "stock-exceptions": {
      const rows = INVENTORY_SNAPSHOT.map((row) => ({ ...row, available: available(row) })).filter((row) => row.available <= row.reorderPoint || row.onHand > row.maximum).map((row) => ({ product: row.product, sku: row.sku, location: row.location, available: row.available, reorderPoint: row.reorderPoint, maximum: row.maximum, status: row.available <= 0 ? "Out of stock" : row.onHand > row.maximum ? "Overstock" : "Low stock", variance: row.onHand > row.maximum ? row.onHand - row.maximum : row.available - row.reorderPoint }));
      return { columns: [{ key: "product", label: "Product" }, { key: "location", label: "Location" }, { key: "status", label: "Exception" }, numberColumn("available", "Available"), numberColumn("reorderPoint", "Reorder point"), numberColumn("maximum", "Maximum"), signedColumn("variance", "Threshold variance")], rows, metrics: baseMetrics({ label: "Available units", key: "available", aggregation: "sum", format: "number", detail: "Across exception items" }, { label: "Threshold variance", key: "variance", aggregation: "sum", format: "signed", detail: "Net distance from thresholds" }), locationKey: "location" };
    }
    case "adjustments-variances": {
      const adjustmentRows = STOCK_ADJUSTMENTS.map((item) => ({ date: item.createdAt, reference: item.adjustmentNumber, recordType: "Stock adjustment", location: item.location, subject: `${item.productName} (${item.sku})`, reason: item.adjustmentType, variance: item.adjustmentQuantity, status: item.approvedBy ? "Approved" : "Posted" }));
      const countRows = INITIAL_STOCK_COUNTS.map((item) => ({ date: item.createdAt, reference: item.countNumber, recordType: "Physical count", location: item.location, subject: item.scope, reason: item.type, variance: getCountVariance(item), status: item.status.replaceAll("_", " ") }));
      const rows = [...adjustmentRows, ...countRows];
      return { columns: [dateColumn("date", "Date"), { key: "reference", label: "Reference" }, { key: "recordType", label: "Record type" }, { key: "location", label: "Location" }, { key: "subject", label: "Subject / scope" }, { key: "reason", label: "Reason / type" }, signedColumn("variance", "Variance"), { key: "status", label: "Status" }], rows, metrics: baseMetrics({ label: "Net variance", key: "variance", aggregation: "sum", format: "signed", detail: "Adjustments and count differences" }, { label: "Average variance", key: "variance", aggregation: "average", format: "signed", detail: "Per record" }), locationKey: "location" };
    }
    case "purchase-requests": {
      const rows = PURCHASE_REQUESTS.map((request) => ({ request: request.requestNumber, date: request.submittedAt, department: request.requestingDepartment, requestedBy: request.requestedBy, location: request.deliveryLocation, requiredDate: request.requiredDate, items: request.items.length, quantity: request.items.reduce((sum, item) => sum + item.quantity, 0), value: request.items.reduce((sum, item) => sum + item.quantity * item.estimatedUnitCost, 0), status: request.status.replaceAll("_", " ") }));
      return { columns: [{ key: "request", label: "Request #" }, dateColumn("date", "Submitted"), { key: "department", label: "Department" }, { key: "location", label: "Delivery location" }, numberColumn("items", "Lines"), numberColumn("quantity", "Quantity"), currencyColumn("value", "Estimated value"), { key: "status", label: "Status" }], rows, metrics: baseMetrics({ label: "Requested quantity", key: "quantity", aggregation: "sum", format: "number", detail: "Across all request lines" }, { label: "Estimated value", key: "value", aggregation: "sum", format: "currency", detail: "Requested procurement value" }, { label: "Average request", key: "value", aggregation: "average", format: "currency", detail: "Value per request" }), locationKey: "location" };
    }
    case "purchase-orders":
    case "purchase-history": {
      const rows = PURCHASE_ORDERS.map((po) => ({ order: po.poNumber, date: po.orderDate, supplier: po.supplier, location: po.deliveryLocation, expected: po.expectedDeliveryDate, quantity: poQuantity(po), received: poReceived(po), total: getPurchaseOrderTotals(po).grandTotal, status: po.status.replaceAll("_", " ") }));
      return { columns: [{ key: "order", label: "PO #" }, dateColumn("date", "Order date"), { key: "supplier", label: "Supplier" }, { key: "location", label: "Delivery location" }, dateColumn("expected", "Expected"), numberColumn("quantity", "Ordered"), numberColumn("received", "Received"), currencyColumn("total", "Grand total"), { key: "status", label: "Status" }], rows, metrics: baseMetrics({ label: "Ordered quantity", key: "quantity", aggregation: "sum", format: "number", detail: "Across purchase orders" }, { label: "Purchase value", key: "total", aggregation: "sum", format: "currency", detail: "Grand total of orders" }, { label: "Average order", key: "total", aggregation: "average", format: "currency", detail: "Value per PO" }), locationKey: "location" };
    }
    case "open-orders": {
      const terminal = new Set(["FULLY_RECEIVED", "CANCELLED", "CLOSED", "REJECTED"]);
      const rows = PURCHASE_ORDERS.filter((po) => !terminal.has(po.status)).map((po) => { const ordered = poQuantity(po); const received = poReceived(po); return { order: po.poNumber, supplier: po.supplier, location: po.deliveryLocation, expected: po.expectedDeliveryDate, daysLate: Math.max(0, -daysBetween(po.expectedDeliveryDate)), ordered, received, remaining: ordered - received, total: getPurchaseOrderTotals(po).grandTotal, status: po.status.replaceAll("_", " ") }; });
      return { columns: [{ key: "order", label: "PO #" }, { key: "supplier", label: "Supplier" }, { key: "location", label: "Location" }, dateColumn("expected", "Expected"), numberColumn("daysLate", "Days late"), numberColumn("ordered", "Ordered"), numberColumn("received", "Received"), numberColumn("remaining", "Remaining"), { key: "status", label: "Status" }], rows, metrics: baseMetrics({ label: "Outstanding units", key: "remaining", aggregation: "sum", format: "number", detail: "Not yet received" }, { label: "Average delay", key: "daysLate", aggregation: "average", format: "number", detail: "Days past expected date" }, { label: "Open value", key: "total", aggregation: "sum", format: "currency", detail: "Value of active orders" }), locationKey: "location" };
    }
    case "supplier-history":
    case "supplier-performance": {
      const grouped = new Map<string, typeof PURCHASE_ORDERS>();
      for (const po of PURCHASE_ORDERS) grouped.set(po.supplier, [...(grouped.get(po.supplier) ?? []), po]);
      const rows = [...grouped].map(([supplier, orders]) => { const ordered = orders.reduce((sum, po) => sum + poQuantity(po), 0); const received = orders.reduce((sum, po) => sum + poReceived(po), 0); const rejected = orders.reduce((sum, po) => sum + po.items.reduce((value, item) => value + item.rejectedQuantity, 0), 0); const total = orders.reduce((sum, po) => sum + getPurchaseOrderTotals(po).grandTotal, 0); const lastOrder = orders.map((po) => po.orderDate).sort().at(-1) ?? ""; return { supplier, orders: orders.length, ordered, received, rejected, total, lastOrder, receiptRate: ordered ? (received / ordered) * 100 : 0, rejectionRate: received ? (rejected / received) * 100 : 0, onTimeRate: supplier.includes("Aroma") ? 83 : supplier.includes("Eco") ? 96 : supplier.includes("Studio") ? 88 : 91 }; });
      const performance = reportId === "supplier-performance";
      return { columns: performance ? [{ key: "supplier", label: "Supplier" }, numberColumn("orders", "Orders"), numberColumn("ordered", "Ordered"), numberColumn("received", "Received"), percentColumn("receiptRate", "Receipt rate"), percentColumn("rejectionRate", "Rejection rate"), percentColumn("onTimeRate", "On-time rate")] : [{ key: "supplier", label: "Supplier" }, numberColumn("orders", "Orders"), numberColumn("ordered", "Ordered"), numberColumn("received", "Received"), currencyColumn("total", "Purchase value"), dateColumn("lastOrder", "Last order")], rows, metrics: performance ? baseMetrics({ label: "Average receipt rate", key: "receiptRate", aggregation: "average", format: "percent", detail: "Ordered quantity received" }, { label: "Average on-time rate", key: "onTimeRate", aggregation: "average", format: "percent", detail: "Supplier delivery timeliness" }, { label: "Average rejection rate", key: "rejectionRate", aggregation: "average", format: "percent", detail: "Rejected received quantity" }) : baseMetrics({ label: "Purchase orders", key: "orders", aggregation: "sum", format: "number", detail: "Orders placed" }, { label: "Purchased quantity", key: "ordered", aggregation: "sum", format: "number", detail: "Units ordered" }, { label: "Purchase value", key: "total", aggregation: "sum", format: "currency", detail: "Total supplier spend" }) };
    }
    case "price-variance": {
      const rows = PURCHASE_ORDERS.flatMap((po) => po.items.map((item, index) => { const standardCost = Math.round(item.unitPrice * (index % 2 === 0 ? 0.96 : 1.04)); const variance = item.unitPrice - standardCost; return { order: po.poNumber, supplier: po.supplier, product: item.productName, sku: item.sku, quantity: item.orderedQuantity, standardCost, purchasePrice: item.unitPrice, variance, variancePercent: standardCost ? (variance / standardCost) * 100 : 0 }; }));
      return { columns: [{ key: "order", label: "PO #" }, { key: "supplier", label: "Supplier" }, { key: "product", label: "Product" }, numberColumn("quantity", "Quantity"), currencyColumn("standardCost", "Standard cost"), currencyColumn("purchasePrice", "Purchase price"), currencyColumn("variance", "Unit variance"), percentColumn("variancePercent", "Variance %")], rows, metrics: baseMetrics({ label: "Average standard cost", key: "standardCost", aggregation: "average", format: "currency", detail: "Across ordered products" }, { label: "Average purchase price", key: "purchasePrice", aggregation: "average", format: "currency", detail: "Actual ordered unit cost" }, { label: "Average variance", key: "variancePercent", aggregation: "average", format: "percent", detail: "Purchase price vs standard" }) };
    }
    case "fast-moving":
    case "slow-moving": {
      const fast = reportId === "fast-moving";
      const source = [...INVENTORY_SNAPSHOT].filter((row) => fast ? row.issued30 > 20 : row.issued90 > 0 && row.issued30 <= 20).sort((a, b) => fast ? b.issued30 - a.issued30 : a.issued30 - b.issued30);
      const rows = source.map((row, index) => ({ rank: index + 1, product: row.product, sku: row.sku, category: row.category, location: row.location, issued30: row.issued30, issued90: row.issued90, monthlyAverage: row.issued90 / 3, available: available(row) }));
      return { columns: [numberColumn("rank", "Rank"), { key: "product", label: "Product" }, { key: "category", label: "Category" }, { key: "location", label: "Location" }, numberColumn("issued30", "Issues (30d)"), numberColumn("issued90", "Issues (90d)"), numberColumn("monthlyAverage", "Monthly average"), numberColumn("available", "Available")], rows, metrics: baseMetrics({ label: "Issues (30 days)", key: "issued30", aggregation: "sum", format: "number", detail: "Recent consumption" }, { label: "Issues (90 days)", key: "issued90", aggregation: "sum", format: "number", detail: "Quarter consumption" }, { label: "Average monthly issues", key: "monthlyAverage", aggregation: "average", format: "number", detail: "Per listed SKU" }), locationKey: "location" };
    }
    case "dead-stock": {
      const rows = INVENTORY_SNAPSHOT.filter((row) => row.issued90 === 0 || (row.issued90 < 10 && row.ageDays > 240)).map((row) => ({ product: row.product, sku: row.sku, category: row.category, location: row.location, onHand: row.onHand, last90Days: row.issued90, ageDays: row.ageDays, value: row.onHand * row.unitCost }));
      return { columns: [{ key: "product", label: "Product" }, { key: "category", label: "Category" }, { key: "location", label: "Location" }, numberColumn("onHand", "On hand"), numberColumn("last90Days", "Issues (90d)"), numberColumn("ageDays", "Age (days)"), currencyColumn("value", "Tied-up value")], rows, metrics: baseMetrics({ label: "Dead-stock units", key: "onHand", aggregation: "sum", format: "number", detail: "Units with no meaningful movement" }, { label: "Tied-up value", key: "value", aggregation: "sum", format: "currency", detail: "Inventory cost value" }, { label: "Average age", key: "ageDays", aggregation: "average", format: "number", detail: "Days held" }), locationKey: "location" };
    }
    case "turnover": {
      const rows = INVENTORY_SNAPSHOT.map((row) => { const annualConsumption = row.issued90 * 4; const turnover = row.avgInventory ? annualConsumption / row.avgInventory : 0; return { product: row.product, sku: row.sku, category: row.category, location: row.location, annualConsumption, avgInventory: row.avgInventory, turnover, daysOnHand: annualConsumption ? (row.avgInventory / annualConsumption) * 365 : 0 }; });
      return { columns: [{ key: "product", label: "Product" }, { key: "category", label: "Category" }, { key: "location", label: "Location" }, numberColumn("annualConsumption", "Annualized issues"), numberColumn("avgInventory", "Average inventory"), numberColumn("turnover", "Turnover (x)"), numberColumn("daysOnHand", "Days on hand")], rows, metrics: baseMetrics({ label: "Average turnover", key: "turnover", aggregation: "average", format: "number", detail: "Annual inventory turns" }, { label: "Average days on hand", key: "daysOnHand", aggregation: "average", format: "number", detail: "Estimated inventory coverage" }), locationKey: "location" };
    }
    case "average-value": {
      const rows = INVENTORY_SNAPSHOT.map((row) => { const averageValue = row.avgInventory * row.unitCost; const currentValue = row.onHand * row.unitCost; return { product: row.product, sku: row.sku, category: row.category, location: row.location, avgInventory: row.avgInventory, unitCost: row.unitCost, averageValue, currentValue, change: currentValue - averageValue }; });
      return { columns: [{ key: "product", label: "Product" }, { key: "category", label: "Category" }, { key: "location", label: "Location" }, numberColumn("avgInventory", "Average quantity"), currencyColumn("unitCost", "Unit cost"), currencyColumn("averageValue", "Average value"), currencyColumn("currentValue", "Current value"), currencyColumn("change", "Value change")], rows, metrics: baseMetrics({ label: "Average stock value", key: "averageValue", aggregation: "sum", format: "currency", detail: "Average quantity at cost" }, { label: "Current stock value", key: "currentValue", aggregation: "sum", format: "currency", detail: "Current quantity at cost" }, { label: "Value change", key: "change", aggregation: "sum", format: "currency", detail: "Current vs average" }), locationKey: "location" };
    }
    case "consumption-trends": {
      const rows = INVENTORY_SNAPSHOT.map((row) => { const [may, june, july] = row.consumption; const average = (may + june + july) / 3; return { product: row.product, sku: row.sku, category: row.category, location: row.location, may, june, july, average, trend: may === 0 ? (july === 0 ? 0 : 100) : ((july - may) / may) * 100 }; });
      return { columns: [{ key: "product", label: "Product" }, { key: "category", label: "Category" }, { key: "location", label: "Location" }, numberColumn("may", "May"), numberColumn("june", "June"), numberColumn("july", "July"), numberColumn("average", "Monthly average"), percentColumn("trend", "3-month trend")], rows, metrics: baseMetrics({ label: "May issues", key: "may", aggregation: "sum", format: "number", detail: "Monthly consumption" }, { label: "July issues", key: "july", aggregation: "sum", format: "number", detail: "Latest full month" }, { label: "Average trend", key: "trend", aggregation: "average", format: "percent", detail: "May-to-July change" }), locationKey: "location" };
    }
    case "reorder-recommendations": {
      const rows = INVENTORY_SNAPSHOT.map((row) => ({ ...row, available: available(row) })).filter((row) => row.available <= row.reorderPoint).map((row) => ({ product: row.product, sku: row.sku, category: row.category, location: row.location, available: row.available, inTransit: row.inTransit, reorderPoint: row.reorderPoint, maximum: row.maximum, recommended: Math.max(0, row.maximum - row.available - row.inTransit), estimatedCost: Math.max(0, row.maximum - row.available - row.inTransit) * row.unitCost }));
      return { columns: [{ key: "product", label: "Product" }, { key: "location", label: "Location" }, numberColumn("available", "Available"), numberColumn("inTransit", "In transit"), numberColumn("reorderPoint", "Reorder point"), numberColumn("maximum", "Target maximum"), numberColumn("recommended", "Recommended order"), currencyColumn("estimatedCost", "Estimated cost")], rows, metrics: baseMetrics({ label: "Recommended units", key: "recommended", aggregation: "sum", format: "number", detail: "Suggested replenishment" }, { label: "Estimated cost", key: "estimatedCost", aggregation: "sum", format: "currency", detail: "At current standard cost" }, { label: "Current available", key: "available", aggregation: "sum", format: "number", detail: "Across reorder candidates" }), locationKey: "location" };
    }
    default:
      return getReportResult("current-stock");
  }
}
