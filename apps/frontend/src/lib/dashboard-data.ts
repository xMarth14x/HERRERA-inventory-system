// Placeholder data for the Dashboard (spec §7.1). No backend endpoints exist
// yet for these aggregates (reports/alerts/purchasing modules are future
// Phase work) — this module is the single place to swap mocks for real
// TanStack Query calls against /api/v1/reports, /api/v1/alerts, etc.

export type MovementType =
  | "OPENING_BALANCE"
  | "PURCHASE_RECEIPT"
  | "MANUAL_RECEIPT"
  | "SALE_ISSUE"
  | "MANUAL_ISSUE"
  | "CUSTOMER_RETURN"
  | "SUPPLIER_RETURN"
  | "TRANSFER_OUT"
  | "TRANSFER_IN"
  | "ADJUSTMENT_IN"
  | "ADJUSTMENT_OUT"
  | "RESERVATION"
  | "RESERVATION_RELEASE"
  | "COUNT_VARIANCE_IN"
  | "COUNT_VARIANCE_OUT"
  | "REVERSAL";

export type ApprovalType =
  | "Purchase Request"
  | "Purchase Order"
  | "Stock Transfer"
  | "Stock Adjustment"
  | "Stock Count";

export interface DashboardKpis {
  totalInventoryValue: number;
  totalActiveProducts: number;
  totalActiveVariants: number;
  totalStockUnits: number;
  lowStockCount: number;
  outOfStockCount: number;
  pendingPurchaseRequests: number;
  pendingPurchaseOrders: number;
  posAwaitingDelivery: number;
  transfersInTransit: number;
  stockReceivedToday: number;
  stockIssuedToday: number;
  pendingApprovals: number;
}

export interface StockMovement {
  id: string;
  number: string;
  type: MovementType;
  product: string;
  sku: string;
  location: string;
  quantityChange: number;
  performedBy: string;
  createdAt: string;
}

export interface ProductMoverStat {
  productName: string;
  sku: string;
  unitsMoved: number;
}

export interface LocationInventoryValue {
  location: string;
  value: number;
}

export interface ExpiringProduct {
  productName: string;
  sku: string;
  batchNumber: string;
  expiryDate: string;
  location: string;
  quantity: number;
}

export interface PendingApproval {
  id: string;
  type: ApprovalType;
  reference: string;
  requestedBy: string;
  amount?: number;
  submittedAt: string;
}

export interface DashboardFilterOptions {
  organizations: string[];
  branches: string[];
  categories: string[];
  products: string[];
  suppliers: string[];
}

export interface StockTrendPoint {
  month: string;
  inStock: number;
  lowStock: number;
  outOfStock: number;
}

export interface StockStatusSlice {
  name: "In stock" | "Low stock" | "Out of stock";
  value: number;
  color: string;
}

export interface LowStockItem {
  product: string;
  sku: string;
  category: string;
  currentStock: number;
  reorderLevel: number;
  status: "Low" | "Out of stock";
}

export interface DashboardData {
  kpis: DashboardKpis;
  recentMovements: StockMovement[];
  fastMoving: ProductMoverStat[];
  slowMoving: ProductMoverStat[];
  inventoryByLocation: LocationInventoryValue[];
  expiringProducts: ExpiringProduct[];
  pendingApprovals: PendingApproval[];
  stockTrend: StockTrendPoint[];
  stockStatus: StockStatusSlice[];
  lowStockItems: LowStockItem[];
  filterOptions: DashboardFilterOptions;
}

const MOCK_DATA: DashboardData = {
  kpis: {
    totalInventoryValue: 4218650,
    totalActiveProducts: 386,
    totalActiveVariants: 1042,
    totalStockUnits: 18574,
    lowStockCount: 27,
    outOfStockCount: 9,
    pendingPurchaseRequests: 6,
    pendingPurchaseOrders: 11,
    posAwaitingDelivery: 8,
    transfersInTransit: 5,
    stockReceivedToday: 312,
    stockIssuedToday: 187,
    pendingApprovals: 14,
  },
  recentMovements: [
    { id: "1", number: "SM-2026-004821", type: "PURCHASE_RECEIPT", product: "Lumea Perfume - Inspired by BR540, 50ml", sku: "LUM-BR540-50", location: "Main Warehouse", quantityChange: 240, performedBy: "R. Domingo", createdAt: "2026-08-04T08:12:00Z" },
    { id: "2", number: "SM-2026-004820", type: "TRANSFER_OUT", product: "Cotton Tote Bag - Natural", sku: "CTB-NAT-01", location: "Main Warehouse", quantityChange: -60, performedBy: "J. Alcantara", createdAt: "2026-08-04T07:55:00Z" },
    { id: "3", number: "SM-2026-004819", type: "TRANSFER_IN", product: "Cotton Tote Bag - Natural", sku: "CTB-NAT-01", location: "Branch Warehouse", quantityChange: 60, performedBy: "J. Alcantara", createdAt: "2026-08-04T07:55:00Z" },
    { id: "4", number: "SM-2026-004818", type: "SALE_ISSUE", product: "Ceramic Mug - Matte Black", sku: "CMG-BLK-350", location: "Retail Branch", quantityChange: -18, performedBy: "POS Integration", createdAt: "2026-08-04T07:40:00Z" },
    { id: "5", number: "SM-2026-004817", type: "ADJUSTMENT_OUT", product: "Scented Candle - Sandalwood", sku: "SCN-SDW-200", location: "Damaged Stock Area", quantityChange: -12, performedBy: "M. Reyes", createdAt: "2026-08-04T07:05:00Z" },
    { id: "6", number: "SM-2026-004816", type: "COUNT_VARIANCE_IN", product: "Bamboo Cutlery Set", sku: "BMB-CTL-04", location: "Store Stockroom", quantityChange: 4, performedBy: "K. Santos", createdAt: "2026-08-04T06:48:00Z" },
    { id: "7", number: "SM-2026-004815", type: "MANUAL_ISSUE", product: "Marketing Sample Kit", sku: "MKT-SMP-01", location: "Main Warehouse", quantityChange: -25, performedBy: "R. Domingo", createdAt: "2026-08-03T17:22:00Z" },
    { id: "8", number: "SM-2026-004814", type: "REVERSAL", product: "Lumea Perfume - Inspired by BR540, 50ml", sku: "LUM-BR540-50", location: "Main Warehouse", quantityChange: -10, performedBy: "R. Domingo", createdAt: "2026-08-03T16:10:00Z" },
  ],
  fastMoving: [
    { productName: "Lumea Perfume - BR540, 50ml", sku: "LUM-BR540-50", unitsMoved: 1284 },
    { productName: "Ceramic Mug - Matte Black", sku: "CMG-BLK-350", unitsMoved: 964 },
    { productName: "Cotton Tote Bag - Natural", sku: "CTB-NAT-01", unitsMoved: 812 },
    { productName: "Scented Candle - Sandalwood", sku: "SCN-SDW-200", unitsMoved: 705 },
    { productName: "Bamboo Cutlery Set", sku: "BMB-CTL-04", unitsMoved: 588 },
  ],
  slowMoving: [
    { productName: "Brass Desk Organizer", sku: "BRS-DSK-02", unitsMoved: 6 },
    { productName: "Wool Throw Blanket - Grey", sku: "WTB-GRY-01", unitsMoved: 9 },
    { productName: "Glass Pour-Over Kit", sku: "GPO-KIT-03", unitsMoved: 14 },
    { productName: "Leather Notebook Cover", sku: "LNC-BRN-A5", unitsMoved: 18 },
    { productName: "Enamel Pin Set - Botanical", sku: "EPN-BOT-06", unitsMoved: 22 },
  ],
  inventoryByLocation: [
    { location: "Main Warehouse", value: 1862400 },
    { location: "Branch Warehouse", value: 941200 },
    { location: "Retail Branch", value: 684300 },
    { location: "Store Stockroom", value: 412900 },
    { location: "In-Transit", value: 198650 },
    { location: "Quarantine Area", value: 61200 },
  ],
  expiringProducts: [
    { productName: "Scented Candle - Sandalwood", sku: "SCN-SDW-200", batchNumber: "B24-0117", expiryDate: "2026-08-09", location: "Main Warehouse", quantity: 84 },
    { productName: "Lumea Perfume - BR540, 50ml", sku: "LUM-BR540-50", batchNumber: "B24-0322", expiryDate: "2026-08-15", location: "Main Warehouse", quantity: 46 },
    { productName: "Aromatherapy Oil - Lavender", sku: "ARO-LAV-30", batchNumber: "B24-0288", expiryDate: "2026-08-28", location: "Branch Warehouse", quantity: 120 },
    { productName: "Herbal Tea Sampler", sku: "HTS-SMP-12", batchNumber: "B24-0405", expiryDate: "2026-09-14", location: "Retail Branch", quantity: 210 },
  ],
  pendingApprovals: [
    { id: "1", type: "Purchase Order", reference: "PO-2026-000142", requestedBy: "J. Alcantara", amount: 84500, submittedAt: "2026-08-04T06:30:00Z" },
    { id: "2", type: "Stock Transfer", reference: "ST-2026-000098", requestedBy: "K. Santos", submittedAt: "2026-08-04T05:55:00Z" },
    { id: "3", type: "Stock Adjustment", reference: "SA-2026-000061", requestedBy: "M. Reyes", submittedAt: "2026-08-03T15:20:00Z" },
    { id: "4", type: "Purchase Request", reference: "PR-2026-000203", requestedBy: "R. Domingo", amount: 12300, submittedAt: "2026-08-03T11:05:00Z" },
    { id: "5", type: "Stock Count", reference: "SC-2026-000019", requestedBy: "K. Santos", submittedAt: "2026-08-02T09:40:00Z" },
  ],
  stockTrend: [
    { month: "Jan", inStock: 4100, lowStock: 1950, outOfStock: 560 },
    { month: "Feb", inStock: 5250, lowStock: 2210, outOfStock: 720 },
    { month: "Mar", inStock: 6200, lowStock: 2820, outOfStock: 980 },
    { month: "Apr", inStock: 5480, lowStock: 3100, outOfStock: 840 },
    { month: "May", inStock: 5900, lowStock: 2760, outOfStock: 790 },
    { month: "Jun", inStock: 6820, lowStock: 3520, outOfStock: 1010 },
  ],
  stockStatus: [
    { name: "In stock", value: 12456, color: "#0a43b8" },
    { name: "Low stock", value: 3246, color: "#ffca0a" },
    { name: "Out of stock", value: 2872, color: "#ed1b2f" },
  ],
  lowStockItems: [
    { product: "Ceramic Mug - Matte Black", sku: "CMG-BLK-350", category: "Drinkware", currentStock: 3, reorderLevel: 12, status: "Low" },
    { product: "Aromatherapy Oil - Lavender", sku: "ARO-LAV-30", category: "Wellness", currentStock: 5, reorderLevel: 15, status: "Low" },
    { product: "Herbal Tea Sampler", sku: "HTS-SMP-12", category: "Wellness", currentStock: 8, reorderLevel: 20, status: "Low" },
    { product: "Scented Candle - Lavender", sku: "SCN-LAV-200", category: "Home Fragrance", currentStock: 0, reorderLevel: 10, status: "Out of stock" },
    { product: "Brass Desk Organizer", sku: "BRS-DSK-02", category: "Home Goods", currentStock: 2, reorderLevel: 10, status: "Low" },
  ],
  filterOptions: {
    organizations: ["Herrera Group"],
    branches: ["Main Warehouse", "Branch Warehouse", "Retail Branch", "Store Stockroom"],
    categories: ["Fragrances", "Home Goods", "Drinkware", "Textiles", "Wellness"],
    products: ["Lumea Perfume", "Ceramic Mug", "Cotton Tote Bag", "Scented Candle"],
    suppliers: ["Aroma Distributors Inc.", "Northline Textiles", "Clayworks Supply Co."],
  },
};

export function getDashboardData(): DashboardData {
  return MOCK_DATA;
}
