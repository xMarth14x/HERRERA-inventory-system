// Placeholder data for the Stock Issue page (spec §7.11). No backend
// endpoints exist yet for issuing — this module is the single place to
// swap mocks for real calls against /api/v1/inventory/issues. SI-2026-000014
// is the same issue already referenced by the stock movement ledger's
// MANUAL_ISSUE entry (SM-2026-004815), so the two pages agree.

export type StockIssueCategory =
  | "Internal Department Use"
  | "Product Samples and Testers"
  | "Marketing Materials"
  | "Damaged Goods Processing"
  | "Manual Sales Integration"
  | "Operational Consumption";

export const STOCK_ISSUE_CATEGORIES: StockIssueCategory[] = [
  "Internal Department Use",
  "Product Samples and Testers",
  "Marketing Materials",
  "Damaged Goods Processing",
  "Manual Sales Integration",
  "Operational Consumption",
];

export interface StockIssueDocument {
  name: string;
  uploadedAt: string;
}

export interface StockIssue {
  id: string;
  issueNumber: string;
  category: StockIssueCategory;
  productName: string;
  sku: string;
  location: string;
  quantity: number;
  issueReason: string;
  departmentOrRecipient: string;
  supportingDocument: StockIssueDocument | null;
  requestedBy: string;
  approvedBy: string;
  releasedBy: string;
  issuedAt: string;
}

export const STOCK_ISSUES: StockIssue[] = [
  {
    id: "1",
    issueNumber: "SI-2026-000014",
    category: "Marketing Materials",
    productName: "Marketing Sample Kit",
    sku: "MKT-SMP-01",
    location: "Main warehouse",
    quantity: 25,
    issueReason: "Marketing sample kit distribution for Q3 trade show",
    departmentOrRecipient: "Marketing",
    supportingDocument: { name: "Trade Show Requisition Form.pdf", uploadedAt: "2026-08-03T16:00:00Z" },
    requestedBy: "M. Reyes",
    approvedBy: "",
    releasedBy: "R. Domingo",
    issuedAt: "2026-08-03T17:22:00Z",
  },
  {
    id: "2",
    issueNumber: "SI-2026-000015",
    category: "Internal Department Use",
    productName: "Bamboo Cutlery Set",
    sku: "BMB-CTL-04",
    location: "Store stockroom",
    quantity: 10,
    issueReason: "Office pantry restock",
    departmentOrRecipient: "Admin & Operations",
    supportingDocument: null,
    requestedBy: "K. Santos",
    approvedBy: "",
    releasedBy: "K. Santos",
    issuedAt: "2026-07-31T09:00:00Z",
  },
  {
    id: "3",
    issueNumber: "SI-2026-000013",
    category: "Product Samples and Testers",
    productName: "Aromatherapy Oil - Lavender, 30 ml",
    sku: "ARO-LAV-30",
    location: "Main warehouse",
    quantity: 15,
    issueReason: "Tester units for retail counter display",
    departmentOrRecipient: "Retail Operations",
    supportingDocument: { name: "Tester Allocation Memo.pdf", uploadedAt: "2026-07-29T10:00:00Z" },
    requestedBy: "K. Santos",
    approvedBy: "R. Domingo",
    releasedBy: "R. Domingo",
    issuedAt: "2026-07-29T11:00:00Z",
  },
  {
    id: "4",
    issueNumber: "SI-2026-000016",
    category: "Damaged Goods Processing",
    productName: "Ceramic Mug - Matte Black, 350 ml",
    sku: "CMG-BLK-350",
    location: "Retail branch",
    quantity: 6,
    issueReason: "Cracked units pulled from shelf for disposal",
    departmentOrRecipient: "Retail Operations",
    supportingDocument: { name: "Damage Report - DMG-0092.pdf", uploadedAt: "2026-07-27T14:00:00Z" },
    requestedBy: "K. Santos",
    approvedBy: "L. Herrera (Approver)",
    releasedBy: "K. Santos",
    issuedAt: "2026-07-27T15:00:00Z",
  },
  {
    id: "5",
    issueNumber: "SI-2026-000017",
    category: "Manual Sales Integration",
    productName: "Cotton Tote Bag - Natural",
    sku: "CTB-NAT-01",
    location: "Retail branch",
    quantity: 20,
    issueReason: "Manual sale entry for a wholesale account not yet integrated with POS",
    departmentOrRecipient: "Retail Operations",
    supportingDocument: { name: "Wholesale Order - WS-0041.pdf", uploadedAt: "2026-07-24T10:00:00Z" },
    requestedBy: "K. Santos",
    approvedBy: "",
    releasedBy: "K. Santos",
    issuedAt: "2026-07-24T11:30:00Z",
  },
  {
    id: "6",
    issueNumber: "SI-2026-000018",
    category: "Operational Consumption",
    productName: "Wool Throw Blanket - Grey",
    sku: "WTB-GRY-01",
    location: "Branch warehouse",
    quantity: 2,
    issueReason: "Used for retail display staging",
    departmentOrRecipient: "Visual Merchandising",
    supportingDocument: null,
    requestedBy: "M. Reyes",
    approvedBy: "",
    releasedBy: "R. Domingo",
    issuedAt: "2026-07-20T13:00:00Z",
  },
];

export function getStockIssues(): StockIssue[] {
  return STOCK_ISSUES;
}
