// Placeholder data for the Purchase Order page (spec §7.7). No backend
// endpoints exist yet for purchasing — this module is the single place to
// swap mocks for real calls against /api/v1/purchase-orders. PO-2026-000142
// is the same PO referenced by the dashboard's pending approvals and by the
// converted purchase request (PR-2026-000158) so the three pages agree.

export type PurchaseOrderStatus =
  | "DRAFT"
  | "FOR_APPROVAL"
  | "APPROVED"
  | "REJECTED"
  | "SENT_TO_SUPPLIER"
  | "PARTIALLY_RECEIVED"
  | "FULLY_RECEIVED"
  | "CANCELLED"
  | "CLOSED";

export const PURCHASE_ORDER_STATUSES: PurchaseOrderStatus[] = [
  "DRAFT",
  "FOR_APPROVAL",
  "APPROVED",
  "REJECTED",
  "SENT_TO_SUPPLIER",
  "PARTIALLY_RECEIVED",
  "FULLY_RECEIVED",
  "CANCELLED",
  "CLOSED",
];

export interface PurchaseOrderLineItem {
  productName: string;
  sku: string;
  orderedQuantity: number;
  unitPrice: number;
  receivedQuantity: number;
  rejectedQuantity: number;
}

export interface POAttachment {
  name: string;
  uploadedAt: string;
}

export interface PORevisionEntry {
  action: string;
  by: string;
  at: string;
  notes?: string;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  status: PurchaseOrderStatus;
  supplier: string;
  supplierQuotationRef: string;
  orderDate: string;
  expectedDeliveryDate: string;
  deliveryLocation: string;
  paymentTerms: string;
  currency: string;
  items: PurchaseOrderLineItem[];
  discount: number;
  tax: number;
  shipping: number;
  otherCharges: number;
  notes: string;
  preparedBy: string;
  checkedBy: string;
  approvedBy: string;
  attachments: POAttachment[];
  revisionHistory: PORevisionEntry[];
}

export const PURCHASE_ORDERS: PurchaseOrder[] = [
  {
    id: "1",
    poNumber: "PO-2026-000145",
    status: "DRAFT",
    supplier: "Studio Form Trading",
    supplierQuotationRef: "Q-SFT-2026-0801",
    orderDate: "2026-08-04",
    expectedDeliveryDate: "2026-09-03",
    deliveryLocation: "Main warehouse",
    paymentTerms: "Net 30",
    currency: "USD",
    items: [
      { productName: "Brass Desk Organizer", sku: "BRS-DSK-02", orderedQuantity: 40, unitPrice: 210, receivedQuantity: 0, rejectedQuantity: 0 },
    ],
    discount: 0,
    tax: 672,
    shipping: 300,
    otherCharges: 0,
    notes: "Standard 30-day terms. Confirm finish sample before dispatch.",
    preparedBy: "K. Santos",
    checkedBy: "",
    approvedBy: "",
    attachments: [],
    revisionHistory: [{ action: "Draft Purchase Order Created", by: "K. Santos", at: "2026-08-04T09:30:00Z" }],
  },
  {
    id: "2",
    poNumber: "PO-2026-000142",
    status: "FOR_APPROVAL",
    supplier: "Aroma Distributors Inc.",
    supplierQuotationRef: "Q-AD-2026-0731",
    orderDate: "2026-08-04",
    expectedDeliveryDate: "2026-08-16",
    deliveryLocation: "Main warehouse",
    paymentTerms: "Net 30",
    currency: "USD",
    items: [
      { productName: "Lumea Perfume - Inspired by BR540, 50 ml", sku: "LUM-BR540-50", orderedQuantity: 200, unitPrice: 320, receivedQuantity: 0, rejectedQuantity: 0 },
      { productName: "Lumea Perfume - Inspired by Aventus, 50 ml", sku: "LUM-AVT-50", orderedQuantity: 150, unitPrice: 340, receivedQuantity: 0, rejectedQuantity: 0 },
    ],
    discount: 2000,
    tax: 9040,
    shipping: 1500,
    otherCharges: 0,
    notes: "Converted from PR-2026-000158. Holiday fragrance demand replenishment.",
    preparedBy: "J. Alcantara",
    checkedBy: "R. Domingo",
    approvedBy: "",
    attachments: [{ name: "Supplier Quotation - Aroma Distributors.pdf", uploadedAt: "2026-07-25T09:00:00Z" }],
    revisionHistory: [
      { action: "Draft Purchase Order Created", by: "J. Alcantara", at: "2026-08-04T06:30:00Z", notes: "Converted from PR-2026-000158." },
      { action: "Submitted for Approval", by: "J. Alcantara", at: "2026-08-04T06:45:00Z" },
    ],
  },
  {
    id: "3",
    poNumber: "PO-2026-000140",
    status: "APPROVED",
    supplier: "EcoLiving Partners",
    supplierQuotationRef: "Q-ECO-2026-0715",
    orderDate: "2026-07-31",
    expectedDeliveryDate: "2026-08-10",
    deliveryLocation: "Branch warehouse",
    paymentTerms: "Net 15",
    currency: "USD",
    items: [
      { productName: "Bamboo Cutlery Set", sku: "BMB-CTL-04", orderedQuantity: 150, unitPrice: 45, receivedQuantity: 0, rejectedQuantity: 0 },
    ],
    discount: 0,
    tax: 540,
    shipping: 250,
    otherCharges: 0,
    notes: "Approved for eco-line rollout. Awaiting dispatch to supplier.",
    preparedBy: "M. Reyes",
    checkedBy: "R. Domingo",
    approvedBy: "L. Herrera (Approver)",
    attachments: [{ name: "Sustainability Accreditation.pdf", uploadedAt: "2026-07-30T09:00:00Z" }],
    revisionHistory: [
      { action: "Draft Purchase Order Created", by: "M. Reyes", at: "2026-07-31T08:00:00Z" },
      { action: "Submitted for Approval", by: "M. Reyes", at: "2026-07-31T09:00:00Z" },
      { action: "Approved", by: "L. Herrera (Approver)", at: "2026-07-31T14:20:00Z", notes: "Within eco-line rollout budget." },
    ],
  },
  {
    id: "4",
    poNumber: "PO-2026-000138",
    status: "REJECTED",
    supplier: "Studio Form Trading",
    supplierQuotationRef: "Q-SFT-2026-0710",
    orderDate: "2026-07-22",
    expectedDeliveryDate: "2026-08-05",
    deliveryLocation: "Main warehouse",
    paymentTerms: "Net 30",
    currency: "USD",
    items: [
      { productName: "Brass Desk Organizer", sku: "BRS-DSK-02", orderedQuantity: 50, unitPrice: 210, receivedQuantity: 0, rejectedQuantity: 0 },
    ],
    discount: 0,
    tax: 840,
    shipping: 300,
    otherCharges: 0,
    notes: "Executive gifting program order.",
    preparedBy: "J. Alcantara",
    checkedBy: "R. Domingo",
    approvedBy: "",
    attachments: [],
    revisionHistory: [
      { action: "Draft Purchase Order Created", by: "J. Alcantara", at: "2026-07-22T09:00:00Z" },
      { action: "Submitted for Approval", by: "J. Alcantara", at: "2026-07-22T13:50:00Z" },
      { action: "Rejected", by: "L. Herrera (Approver)", at: "2026-07-23T11:15:00Z", notes: "Executive gifting budget exhausted for the quarter." },
    ],
  },
  {
    id: "5",
    poNumber: "PO-2026-000135",
    status: "SENT_TO_SUPPLIER",
    supplier: "Northline Textiles",
    supplierQuotationRef: "Q-NT-2026-0705",
    orderDate: "2026-07-18",
    expectedDeliveryDate: "2026-08-07",
    deliveryLocation: "Main warehouse",
    paymentTerms: "Net 45",
    currency: "USD",
    items: [
      { productName: "Cotton Tote Bag - Natural", sku: "CTB-NAT-01", orderedQuantity: 400, unitPrice: 60, receivedQuantity: 0, rejectedQuantity: 0 },
    ],
    discount: 1000,
    tax: 1840,
    shipping: 600,
    otherCharges: 0,
    notes: "Confirmed with supplier for early-August dispatch.",
    preparedBy: "R. Domingo",
    checkedBy: "K. Santos",
    approvedBy: "L. Herrera (Approver)",
    attachments: [{ name: "2026 Wholesale Contract.pdf", uploadedAt: "2026-07-17T10:00:00Z" }],
    revisionHistory: [
      { action: "Draft Purchase Order Created", by: "R. Domingo", at: "2026-07-18T08:00:00Z" },
      { action: "Submitted for Approval", by: "R. Domingo", at: "2026-07-18T09:00:00Z" },
      { action: "Approved", by: "L. Herrera (Approver)", at: "2026-07-19T10:00:00Z" },
      { action: "Sent to Supplier", by: "R. Domingo", at: "2026-07-19T15:00:00Z" },
    ],
  },
  {
    id: "6",
    poNumber: "PO-2026-000130",
    status: "PARTIALLY_RECEIVED",
    supplier: "Clayworks Supply Co.",
    supplierQuotationRef: "Q-CW-2026-0620",
    orderDate: "2026-07-05",
    expectedDeliveryDate: "2026-07-30",
    deliveryLocation: "Main warehouse",
    paymentTerms: "Net 30",
    currency: "USD",
    items: [
      { productName: "Ceramic Mug - Matte Black, 350 ml", sku: "CMG-BLK-350", orderedQuantity: 300, unitPrice: 85, receivedQuantity: 180, rejectedQuantity: 5 },
    ],
    discount: 0,
    tax: 2040,
    shipping: 500,
    otherCharges: 0,
    notes: "First delivery received. Balance expected mid-August.",
    preparedBy: "K. Santos",
    checkedBy: "R. Domingo",
    approvedBy: "L. Herrera (Approver)",
    attachments: [{ name: "Delivery Receipt - DR-4821.pdf", uploadedAt: "2026-07-28T10:00:00Z" }],
    revisionHistory: [
      { action: "Draft Purchase Order Created", by: "K. Santos", at: "2026-07-05T08:00:00Z" },
      { action: "Approved", by: "L. Herrera (Approver)", at: "2026-07-06T09:00:00Z" },
      { action: "Sent to Supplier", by: "K. Santos", at: "2026-07-06T14:00:00Z" },
      { action: "Goods Receipt Confirmed (180 received, 5 rejected)", by: "K. Santos", at: "2026-07-28T10:05:00Z", notes: "5 units damaged in transit." },
    ],
  },
  {
    id: "7",
    poNumber: "PO-2026-000125",
    status: "FULLY_RECEIVED",
    supplier: "Aroma Distributors Inc.",
    supplierQuotationRef: "Q-AD-2026-0610",
    orderDate: "2026-06-20",
    expectedDeliveryDate: "2026-07-10",
    deliveryLocation: "Main warehouse",
    paymentTerms: "Net 30",
    currency: "USD",
    items: [
      { productName: "Scented Candle - Sandalwood, 200 g", sku: "SCN-SDW-200", orderedQuantity: 200, unitPrice: 110, receivedQuantity: 200, rejectedQuantity: 0 },
    ],
    discount: 500,
    tax: 1720,
    shipping: 400,
    otherCharges: 0,
    notes: "Delivered complete, no discrepancies.",
    preparedBy: "R. Domingo",
    checkedBy: "K. Santos",
    approvedBy: "L. Herrera (Approver)",
    attachments: [{ name: "Delivery Receipt - DR-4790.pdf", uploadedAt: "2026-07-09T10:00:00Z" }],
    revisionHistory: [
      { action: "Draft Purchase Order Created", by: "R. Domingo", at: "2026-06-20T08:00:00Z" },
      { action: "Approved", by: "L. Herrera (Approver)", at: "2026-06-21T09:00:00Z" },
      { action: "Sent to Supplier", by: "R. Domingo", at: "2026-06-21T14:00:00Z" },
      { action: "Goods Receipt Confirmed (200 received, 0 rejected)", by: "K. Santos", at: "2026-07-09T11:00:00Z" },
    ],
  },
  {
    id: "8",
    poNumber: "PO-2026-000120",
    status: "CANCELLED",
    supplier: "Northline Textiles",
    supplierQuotationRef: "Q-NT-2026-0528",
    orderDate: "2026-06-01",
    expectedDeliveryDate: "2026-06-25",
    deliveryLocation: "Branch warehouse",
    paymentTerms: "Net 45",
    currency: "USD",
    items: [
      { productName: "Wool Throw Blanket - Grey", sku: "WTB-GRY-01", orderedQuantity: 40, unitPrice: 380, receivedQuantity: 0, rejectedQuantity: 0 },
    ],
    discount: 0,
    tax: 0,
    shipping: 0,
    otherCharges: 0,
    notes: "Colorway discontinued by supplier before dispatch.",
    preparedBy: "R. Domingo",
    checkedBy: "",
    approvedBy: "",
    attachments: [],
    revisionHistory: [
      { action: "Draft Purchase Order Created", by: "R. Domingo", at: "2026-06-01T08:00:00Z" },
      { action: "Submitted for Approval", by: "R. Domingo", at: "2026-06-02T09:00:00Z" },
      { action: "Cancelled", by: "R. Domingo", at: "2026-06-03T10:00:00Z", notes: "Product discontinued before approval completed." },
    ],
  },
  {
    id: "9",
    poNumber: "PO-2026-000110",
    status: "CLOSED",
    supplier: "EcoLiving Partners",
    supplierQuotationRef: "Q-ECO-2026-0410",
    orderDate: "2026-04-15",
    expectedDeliveryDate: "2026-05-05",
    deliveryLocation: "Main warehouse",
    paymentTerms: "Net 15",
    currency: "USD",
    items: [
      { productName: "Bamboo Cutlery Set", sku: "BMB-CTL-04", orderedQuantity: 100, unitPrice: 45, receivedQuantity: 100, rejectedQuantity: 0 },
    ],
    discount: 0,
    tax: 360,
    shipping: 200,
    otherCharges: 0,
    notes: "Fully received and reconciled. Closed out.",
    preparedBy: "M. Reyes",
    checkedBy: "R. Domingo",
    approvedBy: "L. Herrera (Approver)",
    attachments: [{ name: "Delivery Receipt - DR-4602.pdf", uploadedAt: "2026-05-04T10:00:00Z" }],
    revisionHistory: [
      { action: "Draft Purchase Order Created", by: "M. Reyes", at: "2026-04-15T08:00:00Z" },
      { action: "Approved", by: "L. Herrera (Approver)", at: "2026-04-16T09:00:00Z" },
      { action: "Sent to Supplier", by: "M. Reyes", at: "2026-04-16T14:00:00Z" },
      { action: "Goods Receipt Confirmed (100 received, 0 rejected)", by: "R. Domingo", at: "2026-05-04T10:30:00Z" },
      { action: "Closed", by: "R. Domingo", at: "2026-05-05T09:00:00Z" },
    ],
  },
];

export function getPurchaseOrders(): PurchaseOrder[] {
  return PURCHASE_ORDERS;
}

export interface PurchaseOrderLineRow {
  poNumber: string;
  supplier: string;
  productName: string;
  sku: string;
  orderedQuantity: number;
  receivedQuantity: number;
  rejectedQuantity: number;
  remainingQuantity: number;
  unitPrice: number;
  lineTotal: number;
  status: PurchaseOrderStatus;
}

export function getPurchaseOrderLineRows(): PurchaseOrderLineRow[] {
  return PURCHASE_ORDERS.flatMap((po) =>
    po.items.map((item) => ({
      poNumber: po.poNumber,
      supplier: po.supplier,
      productName: item.productName,
      sku: item.sku,
      orderedQuantity: item.orderedQuantity,
      receivedQuantity: item.receivedQuantity,
      rejectedQuantity: item.rejectedQuantity,
      remainingQuantity: item.orderedQuantity - item.receivedQuantity,
      unitPrice: item.unitPrice,
      lineTotal: item.orderedQuantity * item.unitPrice,
      status: po.status,
    })),
  );
}

export function getPurchaseOrderTotals(po: PurchaseOrder) {
  const subtotal = po.items.reduce((sum, item) => sum + item.orderedQuantity * item.unitPrice, 0);
  const grandTotal = subtotal - po.discount + po.tax + po.shipping + po.otherCharges;
  return { subtotal, grandTotal };
}
