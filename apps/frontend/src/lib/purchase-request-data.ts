// Placeholder data for the Purchase Request page (spec §7.6). No backend
// endpoints exist yet for purchasing — this module is the single place to
// swap mocks for real calls against /api/v1/purchase-requests.

export type PurchaseRequestStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "FOR_APPROVAL"
  | "APPROVED"
  | "REJECTED"
  | "CANCELLED"
  | "CONVERTED_TO_PO";

export const PURCHASE_REQUEST_STATUSES: PurchaseRequestStatus[] = [
  "DRAFT",
  "SUBMITTED",
  "FOR_APPROVAL",
  "APPROVED",
  "REJECTED",
  "CANCELLED",
  "CONVERTED_TO_PO",
];

export interface RequestedProductLine {
  productName: string;
  sku: string;
  quantity: number;
  estimatedUnitCost: number;
}

export interface RequestAttachment {
  name: string;
  uploadedAt: string;
}

export interface ApprovalHistoryEntry {
  action: string;
  by: string;
  at: string;
  notes?: string;
}

export interface PurchaseRequest {
  id: string;
  requestNumber: string;
  requestingDepartment: string;
  requestedBy: string;
  requiredDate: string;
  deliveryLocation: string;
  items: RequestedProductLine[];
  justification: string;
  status: PurchaseRequestStatus;
  submittedAt: string;
  attachments: RequestAttachment[];
  approvalHistory: ApprovalHistoryEntry[];
}

export const PURCHASE_REQUESTS: PurchaseRequest[] = [
  {
    id: "1",
    requestNumber: "PR-2026-000201",
    requestingDepartment: "Retail Operations",
    requestedBy: "K. Santos",
    requiredDate: "2026-08-20",
    deliveryLocation: "Retail branch",
    items: [
      { productName: "Ceramic Mug - Matte Black, 350 ml", sku: "CMG-BLK-350", quantity: 200, estimatedUnitCost: 85 },
      { productName: "Cotton Tote Bag - Natural", sku: "CTB-NAT-01", quantity: 150, estimatedUnitCost: 60 },
    ],
    justification: "Replenish retail branch shelf stock ahead of the Q3 promo.",
    status: "DRAFT",
    submittedAt: "2026-08-04T09:10:00Z",
    attachments: [],
    approvalHistory: [{ action: "Created", by: "K. Santos", at: "2026-08-04T09:10:00Z" }],
  },
  {
    id: "2",
    requestNumber: "PR-2026-000198",
    requestingDepartment: "Warehouse Operations",
    requestedBy: "R. Domingo",
    requiredDate: "2026-08-15",
    deliveryLocation: "Main warehouse",
    items: [
      { productName: "Lumea Perfume - Inspired by BR540, 50 ml", sku: "LUM-BR540-50", quantity: 300, estimatedUnitCost: 320 },
    ],
    justification: "Restock the fastest-moving fragrance line before it stocks out.",
    status: "SUBMITTED",
    submittedAt: "2026-08-03T14:22:00Z",
    attachments: [{ name: "Stock Level Snapshot.pdf", uploadedAt: "2026-08-03T14:00:00Z" }],
    approvalHistory: [
      { action: "Created", by: "R. Domingo", at: "2026-08-02T16:00:00Z" },
      { action: "Submitted", by: "R. Domingo", at: "2026-08-03T14:22:00Z" },
    ],
  },
  {
    id: "3",
    requestNumber: "PR-2026-000195",
    requestingDepartment: "Marketing",
    requestedBy: "J. Alcantara",
    requiredDate: "2026-08-18",
    deliveryLocation: "Main warehouse",
    items: [
      { productName: "Scented Candle - Sandalwood, 200 g", sku: "SCN-SDW-200", quantity: 100, estimatedUnitCost: 110 },
      { productName: "Aromatherapy Oil - Lavender, 30 ml", sku: "ARO-LAV-30", quantity: 80, estimatedUnitCost: 95 },
    ],
    justification: "Gift bundle campaign launching in August.",
    status: "FOR_APPROVAL",
    submittedAt: "2026-08-02T11:05:00Z",
    attachments: [{ name: "Campaign Brief.pdf", uploadedAt: "2026-08-01T10:00:00Z" }],
    approvalHistory: [
      { action: "Created", by: "J. Alcantara", at: "2026-08-01T09:00:00Z" },
      { action: "Submitted", by: "J. Alcantara", at: "2026-08-01T15:00:00Z" },
      { action: "Sent for Approval", by: "J. Alcantara", at: "2026-08-02T11:05:00Z" },
    ],
  },
  {
    id: "4",
    requestNumber: "PR-2026-000190",
    requestingDepartment: "Merchandising",
    requestedBy: "M. Reyes",
    requiredDate: "2026-08-10",
    deliveryLocation: "Branch warehouse",
    items: [
      { productName: "Bamboo Cutlery Set", sku: "BMB-CTL-04", quantity: 150, estimatedUnitCost: 45 },
    ],
    justification: "New eco-friendly product line rollout.",
    status: "APPROVED",
    submittedAt: "2026-07-30T08:40:00Z",
    attachments: [{ name: "Product Sustainability Sheet.pdf", uploadedAt: "2026-07-28T09:30:00Z" }],
    approvalHistory: [
      { action: "Created", by: "M. Reyes", at: "2026-07-28T09:00:00Z" },
      { action: "Submitted", by: "M. Reyes", at: "2026-07-29T09:30:00Z" },
      { action: "Sent for Approval", by: "M. Reyes", at: "2026-07-30T08:40:00Z" },
      {
        action: "Approved",
        by: "L. Herrera (Approver)",
        at: "2026-07-31T10:15:00Z",
        notes: "Approved for eco-line rollout.",
      },
    ],
  },
  {
    id: "5",
    requestNumber: "PR-2026-000188",
    requestingDepartment: "Retail Operations",
    requestedBy: "K. Santos",
    requiredDate: "2026-08-05",
    deliveryLocation: "Store stockroom",
    items: [
      { productName: "Herbal Tea Sampler - 12-Pack", sku: "HTS-SMP-12", quantity: 200, estimatedUnitCost: 130 },
    ],
    justification: "Seasonal wellness display for the storefront.",
    status: "APPROVED",
    submittedAt: "2026-07-28T10:15:00Z",
    attachments: [],
    approvalHistory: [
      { action: "Created", by: "K. Santos", at: "2026-07-26T09:00:00Z" },
      { action: "Submitted", by: "K. Santos", at: "2026-07-27T09:30:00Z" },
      { action: "Sent for Approval", by: "K. Santos", at: "2026-07-28T10:15:00Z" },
      { action: "Approved", by: "L. Herrera (Approver)", at: "2026-07-29T09:00:00Z" },
    ],
  },
  {
    id: "6",
    requestNumber: "PR-2026-000184",
    requestingDepartment: "Marketing",
    requestedBy: "J. Alcantara",
    requiredDate: "2026-07-30",
    deliveryLocation: "Main warehouse",
    items: [
      { productName: "Brass Desk Organizer", sku: "BRS-DSK-02", quantity: 50, estimatedUnitCost: 210 },
    ],
    justification: "Executive gifting program.",
    status: "REJECTED",
    submittedAt: "2026-07-22T13:50:00Z",
    attachments: [],
    approvalHistory: [
      { action: "Created", by: "J. Alcantara", at: "2026-07-20T09:00:00Z" },
      { action: "Submitted", by: "J. Alcantara", at: "2026-07-21T09:30:00Z" },
      { action: "Sent for Approval", by: "J. Alcantara", at: "2026-07-22T13:50:00Z" },
      {
        action: "Rejected",
        by: "L. Herrera (Approver)",
        at: "2026-07-23T11:00:00Z",
        notes: "Executive gifting budget exhausted for the quarter.",
      },
    ],
  },
  {
    id: "7",
    requestNumber: "PR-2026-000180",
    requestingDepartment: "Warehouse Operations",
    requestedBy: "R. Domingo",
    requiredDate: "2026-07-25",
    deliveryLocation: "Main warehouse",
    items: [
      { productName: "Cotton Tote Bag - Natural", sku: "CTB-NAT-01", quantity: 400, estimatedUnitCost: 60 },
    ],
    justification: "Bulk order superseded by supplier consolidation.",
    status: "CANCELLED",
    submittedAt: "2026-07-18T09:30:00Z",
    attachments: [],
    approvalHistory: [
      { action: "Created", by: "R. Domingo", at: "2026-07-16T09:00:00Z" },
      { action: "Submitted", by: "R. Domingo", at: "2026-07-17T09:30:00Z" },
      {
        action: "Cancelled",
        by: "R. Domingo",
        at: "2026-07-18T09:30:00Z",
        notes: "Superseded by supplier consolidation order.",
      },
    ],
  },
  {
    id: "8",
    requestNumber: "PR-2026-000175",
    requestingDepartment: "E-commerce",
    requestedBy: "A. Bautista",
    requiredDate: "2026-08-22",
    deliveryLocation: "Main warehouse",
    items: [
      { productName: "Ceramic Mug - Matte Black, 350 ml", sku: "CMG-BLK-350", quantity: 120, estimatedUnitCost: 85 },
      { productName: "Scented Candle - Lavender, 200 g", sku: "SCN-LAV-200", quantity: 90, estimatedUnitCost: 110 },
    ],
    justification: "Online bundle restock for the fall catalog.",
    status: "SUBMITTED",
    submittedAt: "2026-08-01T16:05:00Z",
    attachments: [],
    approvalHistory: [
      { action: "Created", by: "A. Bautista", at: "2026-07-31T13:00:00Z" },
      { action: "Submitted", by: "A. Bautista", at: "2026-08-01T16:05:00Z" },
    ],
  },
  {
    id: "9",
    requestNumber: "PR-2026-000170",
    requestingDepartment: "Retail Operations",
    requestedBy: "K. Santos",
    requiredDate: "2026-08-25",
    deliveryLocation: "Retail branch",
    items: [
      { productName: "Aromatherapy Oil - Lavender, 30 ml", sku: "ARO-LAV-30", quantity: 60, estimatedUnitCost: 95 },
    ],
    justification: "Trial SKU for the retail branch wellness shelf.",
    status: "DRAFT",
    submittedAt: "2026-08-04T07:45:00Z",
    attachments: [],
    approvalHistory: [{ action: "Created", by: "K. Santos", at: "2026-08-04T07:45:00Z" }],
  },
  {
    id: "10",
    requestNumber: "PR-2026-000165",
    requestingDepartment: "Merchandising",
    requestedBy: "M. Reyes",
    requiredDate: "2026-08-12",
    deliveryLocation: "Branch warehouse",
    items: [
      { productName: "Lumea Perfume - Inspired by Aventus, 50 ml", sku: "LUM-AVT-50", quantity: 150, estimatedUnitCost: 340 },
    ],
    justification: "New variant launch stock.",
    status: "FOR_APPROVAL",
    submittedAt: "2026-07-31T12:20:00Z",
    attachments: [],
    approvalHistory: [
      { action: "Created", by: "M. Reyes", at: "2026-07-30T09:00:00Z" },
      { action: "Submitted", by: "M. Reyes", at: "2026-07-30T15:00:00Z" },
      { action: "Sent for Approval", by: "M. Reyes", at: "2026-07-31T12:20:00Z" },
    ],
  },
  {
    id: "11",
    requestNumber: "PR-2026-000158",
    requestingDepartment: "Purchasing",
    requestedBy: "J. Alcantara",
    requiredDate: "2026-08-12",
    deliveryLocation: "Main warehouse",
    items: [
      { productName: "Lumea Perfume - Inspired by BR540, 50 ml", sku: "LUM-BR540-50", quantity: 200, estimatedUnitCost: 320 },
      { productName: "Lumea Perfume - Inspired by Aventus, 50 ml", sku: "LUM-AVT-50", quantity: 150, estimatedUnitCost: 340 },
    ],
    justification: "Replenishment ahead of holiday fragrance demand.",
    status: "CONVERTED_TO_PO",
    submittedAt: "2026-07-24T15:00:00Z",
    attachments: [
      { name: "Supplier Quotation - Aroma Distributors.pdf", uploadedAt: "2026-07-25T09:00:00Z" },
      { name: "Budget Approval Memo.pdf", uploadedAt: "2026-07-26T11:00:00Z" },
    ],
    approvalHistory: [
      { action: "Created", by: "J. Alcantara", at: "2026-07-24T09:00:00Z" },
      { action: "Submitted", by: "J. Alcantara", at: "2026-07-24T15:00:00Z" },
      { action: "Sent for Approval", by: "J. Alcantara", at: "2026-07-25T08:00:00Z" },
      { action: "Approved", by: "L. Herrera (Approver)", at: "2026-07-27T10:00:00Z" },
      { action: "Converted to Purchase Order PO-2026-000142", by: "J. Alcantara", at: "2026-08-04T06:30:00Z" },
    ],
  },
];

export function getPurchaseRequests(): PurchaseRequest[] {
  return PURCHASE_REQUESTS;
}

export interface RequestedProductRow {
  requestNumber: string;
  productName: string;
  sku: string;
  quantity: number;
  estimatedCost: number;
  status: PurchaseRequestStatus;
  requestingDepartment: string;
  requiredDate: string;
}

export function getRequestedProductRows(): RequestedProductRow[] {
  return PURCHASE_REQUESTS.flatMap((pr) =>
    pr.items.map((item) => ({
      requestNumber: pr.requestNumber,
      productName: item.productName,
      sku: item.sku,
      quantity: item.quantity,
      estimatedCost: item.quantity * item.estimatedUnitCost,
      status: pr.status,
      requestingDepartment: pr.requestingDepartment,
      requiredDate: pr.requiredDate,
    })),
  );
}
