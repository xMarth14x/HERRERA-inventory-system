// Placeholder data for the Stock Transfer page (spec §7.12). No backend
// endpoints exist yet for transfers — this module is the single place to
// swap mocks for real calls against /api/v1/transfers. ST-2026-000031 is the
// same transfer already referenced by the stock movement ledger's
// TRANSFER_OUT / TRANSFER_IN entries (Cotton Tote Bag, Main warehouse to
// Branch warehouse, 60 units), so the two pages agree.

export type TransferStatus =
  | "DRAFT"
  | "FOR_APPROVAL"
  | "APPROVED"
  | "PREPARING"
  | "DISPATCHED"
  | "IN_TRANSIT"
  | "PARTIALLY_RECEIVED"
  | "FULLY_RECEIVED"
  | "CANCELLED"
  | "COMPLETED";

export const TRANSFER_STATUSES: TransferStatus[] = [
  "DRAFT",
  "FOR_APPROVAL",
  "APPROVED",
  "PREPARING",
  "DISPATCHED",
  "IN_TRANSIT",
  "PARTIALLY_RECEIVED",
  "FULLY_RECEIVED",
  "CANCELLED",
  "COMPLETED",
];

export type DiscrepancyType =
  | "Short quantity"
  | "Excess quantity"
  | "Damaged in transit"
  | "Missing items"
  | "Rejected items";

export const DISCREPANCY_TYPES: DiscrepancyType[] = [
  "Short quantity",
  "Excess quantity",
  "Damaged in transit",
  "Missing items",
  "Rejected items",
];

export interface TransferLineItem {
  productName: string;
  sku: string;
  dispatchedQuantity: number;
  receivedQuantity: number;
  discrepancyType: DiscrepancyType | null;
  discrepancyQuantity: number;
  discrepancyNotes: string;
}

export interface TransferAttachment {
  name: string;
  uploadedAt: string;
}

export interface TransferHistoryEntry {
  action: string;
  by: string;
  at: string;
  notes?: string;
}

export interface StockTransfer {
  id: string;
  transferNumber: string;
  status: TransferStatus;
  sourceLocation: string;
  destinationLocation: string;
  requestedBy: string;
  approvedBy: string;
  items: TransferLineItem[];
  dispatchedAt: string | null;
  receivedAt: string | null;
  notes: string;
  attachments: TransferAttachment[];
  history: TransferHistoryEntry[];
}

export const STOCK_TRANSFERS: StockTransfer[] = [
  {
    id: "1",
    transferNumber: "ST-2026-000040",
    status: "DRAFT",
    sourceLocation: "Branch warehouse",
    destinationLocation: "Retail branch",
    requestedBy: "M. Reyes",
    approvedBy: "",
    items: [
      { productName: "Wool Throw Blanket - Grey", sku: "WTB-GRY-01", dispatchedQuantity: 0, receivedQuantity: 0, discrepancyType: null, discrepancyQuantity: 0, discrepancyNotes: "" },
    ],
    dispatchedAt: null,
    receivedAt: null,
    notes: "Restock request for the retail display, quantity 20.",
    attachments: [],
    history: [{ action: "Draft Transfer Created", by: "M. Reyes", at: "2026-08-04T09:00:00Z" }],
  },
  {
    id: "2",
    transferNumber: "ST-2026-000039",
    status: "FOR_APPROVAL",
    sourceLocation: "Main warehouse",
    destinationLocation: "Store stockroom",
    requestedBy: "K. Santos",
    approvedBy: "",
    items: [
      { productName: "Herbal Tea Sampler - 12-Pack", sku: "HTS-SMP-12", dispatchedQuantity: 0, receivedQuantity: 0, discrepancyType: null, discrepancyQuantity: 0, discrepancyNotes: "" },
    ],
    dispatchedAt: null,
    receivedAt: null,
    notes: "Requested quantity 100 ahead of the wellness display refresh.",
    attachments: [],
    history: [
      { action: "Draft Transfer Created", by: "K. Santos", at: "2026-08-03T09:00:00Z" },
      { action: "Requested", by: "K. Santos", at: "2026-08-03T10:00:00Z" },
    ],
  },
  {
    id: "3",
    transferNumber: "ST-2026-000038",
    status: "APPROVED",
    sourceLocation: "Main warehouse",
    destinationLocation: "Retail branch",
    requestedBy: "K. Santos",
    approvedBy: "L. Herrera (Approver)",
    items: [
      { productName: "Aromatherapy Oil - Lavender, 30 ml", sku: "ARO-LAV-30", dispatchedQuantity: 0, receivedQuantity: 0, discrepancyType: null, discrepancyQuantity: 0, discrepancyNotes: "" },
    ],
    dispatchedAt: null,
    receivedAt: null,
    notes: "Requested quantity 60. Awaiting warehouse preparation.",
    attachments: [],
    history: [
      { action: "Draft Transfer Created", by: "K. Santos", at: "2026-08-02T09:00:00Z" },
      { action: "Requested", by: "K. Santos", at: "2026-08-02T09:30:00Z" },
      { action: "Approved", by: "L. Herrera (Approver)", at: "2026-08-02T14:00:00Z" },
    ],
  },
  {
    id: "4",
    transferNumber: "ST-2026-000037",
    status: "PREPARING",
    sourceLocation: "Main warehouse",
    destinationLocation: "Branch warehouse",
    requestedBy: "R. Domingo",
    approvedBy: "L. Herrera (Approver)",
    items: [
      { productName: "Ceramic Mug - Matte Black, 350 ml", sku: "CMG-BLK-350", dispatchedQuantity: 0, receivedQuantity: 0, discrepancyType: null, discrepancyQuantity: 0, discrepancyNotes: "" },
    ],
    dispatchedAt: null,
    receivedAt: null,
    notes: "Requested quantity 150. Being picked and packed for dispatch.",
    attachments: [],
    history: [
      { action: "Draft Transfer Created", by: "R. Domingo", at: "2026-08-01T08:00:00Z" },
      { action: "Approved", by: "L. Herrera (Approver)", at: "2026-08-01T13:00:00Z" },
      { action: "Preparing", by: "R. Domingo", at: "2026-08-02T09:00:00Z" },
    ],
  },
  {
    id: "5",
    transferNumber: "ST-2026-000036",
    status: "DISPATCHED",
    sourceLocation: "Main warehouse",
    destinationLocation: "Store stockroom",
    requestedBy: "K. Santos",
    approvedBy: "L. Herrera (Approver)",
    items: [
      { productName: "Bamboo Cutlery Set", sku: "BMB-CTL-04", dispatchedQuantity: 80, receivedQuantity: 0, discrepancyType: null, discrepancyQuantity: 0, discrepancyNotes: "" },
    ],
    dispatchedAt: "2026-08-03T10:00:00Z",
    receivedAt: null,
    notes: "In courier hands, expected at store stockroom within 2 days.",
    attachments: [{ name: "Dispatch Note - DN-2291.pdf", uploadedAt: "2026-08-03T10:05:00Z" }],
    history: [
      { action: "Draft Transfer Created", by: "K. Santos", at: "2026-08-02T08:00:00Z" },
      { action: "Approved", by: "L. Herrera (Approver)", at: "2026-08-02T12:00:00Z" },
      { action: "Dispatched", by: "K. Santos", at: "2026-08-03T10:00:00Z" },
    ],
  },
  {
    id: "6",
    transferNumber: "ST-2026-000035",
    status: "IN_TRANSIT",
    sourceLocation: "Branch warehouse",
    destinationLocation: "Retail branch",
    requestedBy: "M. Reyes",
    approvedBy: "L. Herrera (Approver)",
    items: [
      { productName: "Brass Desk Organizer", sku: "BRS-DSK-02", dispatchedQuantity: 30, receivedQuantity: 0, discrepancyType: null, discrepancyQuantity: 0, discrepancyNotes: "" },
    ],
    dispatchedAt: "2026-08-02T11:00:00Z",
    receivedAt: null,
    notes: "En route to retail branch.",
    attachments: [{ name: "Dispatch Note - DN-2280.pdf", uploadedAt: "2026-08-02T11:05:00Z" }],
    history: [
      { action: "Draft Transfer Created", by: "M. Reyes", at: "2026-07-31T09:00:00Z" },
      { action: "Approved", by: "L. Herrera (Approver)", at: "2026-07-31T14:00:00Z" },
      { action: "Preparing", by: "M. Reyes", at: "2026-08-01T09:00:00Z" },
      { action: "Dispatched", by: "M. Reyes", at: "2026-08-02T11:00:00Z" },
    ],
  },
  {
    id: "7",
    transferNumber: "ST-2026-000034",
    status: "PARTIALLY_RECEIVED",
    sourceLocation: "Main warehouse",
    destinationLocation: "Branch warehouse",
    requestedBy: "R. Domingo",
    approvedBy: "L. Herrera (Approver)",
    items: [
      {
        productName: "Scented Candle - Sandalwood, 200 g",
        sku: "SCN-SDW-200",
        dispatchedQuantity: 100,
        receivedQuantity: 70,
        discrepancyType: "Short quantity",
        discrepancyQuantity: 30,
        discrepancyNotes: "30 units short on arrival; source location confirms full dispatch quantity. Under investigation.",
      },
    ],
    dispatchedAt: "2026-07-29T09:00:00Z",
    receivedAt: "2026-07-30T10:00:00Z",
    notes: "Discrepancy flagged on receiving; balance pending resolution.",
    attachments: [{ name: "Receiving Report - RR-1042.pdf", uploadedAt: "2026-07-30T10:15:00Z" }],
    history: [
      { action: "Draft Transfer Created", by: "R. Domingo", at: "2026-07-28T08:00:00Z" },
      { action: "Approved", by: "L. Herrera (Approver)", at: "2026-07-28T13:00:00Z" },
      { action: "Dispatched", by: "R. Domingo", at: "2026-07-29T09:00:00Z" },
      { action: "Partially Received (70 of 100, 30 short)", by: "K. Santos", at: "2026-07-30T10:15:00Z", notes: "Short quantity discrepancy logged." },
    ],
  },
  {
    id: "8",
    transferNumber: "ST-2026-000033",
    status: "FULLY_RECEIVED",
    sourceLocation: "Main warehouse",
    destinationLocation: "Store stockroom",
    requestedBy: "K. Santos",
    approvedBy: "L. Herrera (Approver)",
    items: [
      {
        productName: "Aromatherapy Oil - Lavender, 30 ml",
        sku: "ARO-LAV-30",
        dispatchedQuantity: 50,
        receivedQuantity: 52,
        discrepancyType: "Excess quantity",
        discrepancyQuantity: 2,
        discrepancyNotes: "2 extra units included in the shipment; retained after supplier confirmation.",
      },
    ],
    dispatchedAt: "2026-07-26T09:00:00Z",
    receivedAt: "2026-07-27T11:00:00Z",
    notes: "Closed out with a minor excess noted.",
    attachments: [{ name: "Receiving Report - RR-1038.pdf", uploadedAt: "2026-07-27T11:10:00Z" }],
    history: [
      { action: "Draft Transfer Created", by: "K. Santos", at: "2026-07-25T08:00:00Z" },
      { action: "Approved", by: "L. Herrera (Approver)", at: "2026-07-25T12:00:00Z" },
      { action: "Dispatched", by: "K. Santos", at: "2026-07-26T09:00:00Z" },
      { action: "Fully Received (52 of 50, 2 excess)", by: "K. Santos", at: "2026-07-27T11:10:00Z" },
    ],
  },
  {
    id: "9",
    transferNumber: "ST-2026-000032",
    status: "CANCELLED",
    sourceLocation: "Main warehouse",
    destinationLocation: "Branch warehouse",
    requestedBy: "R. Domingo",
    approvedBy: "",
    items: [
      { productName: "Wool Throw Blanket - Grey", sku: "WTB-GRY-01", dispatchedQuantity: 0, receivedQuantity: 0, discrepancyType: null, discrepancyQuantity: 0, discrepancyNotes: "" },
    ],
    dispatchedAt: null,
    receivedAt: null,
    notes: "Colorway discontinued before dispatch.",
    attachments: [],
    history: [
      { action: "Draft Transfer Created", by: "R. Domingo", at: "2026-06-01T08:00:00Z" },
      { action: "Requested", by: "R. Domingo", at: "2026-06-02T09:00:00Z" },
      { action: "Cancelled", by: "R. Domingo", at: "2026-06-03T10:00:00Z", notes: "Product discontinued before approval completed." },
    ],
  },
  {
    id: "10",
    transferNumber: "ST-2026-000031",
    status: "COMPLETED",
    sourceLocation: "Main warehouse",
    destinationLocation: "Branch warehouse",
    requestedBy: "J. Alcantara",
    approvedBy: "L. Herrera (Approver)",
    items: [
      {
        productName: "Cotton Tote Bag - Natural",
        sku: "CTB-NAT-01",
        dispatchedQuantity: 60,
        receivedQuantity: 60,
        discrepancyType: null,
        discrepancyQuantity: 0,
        discrepancyNotes: "",
      },
    ],
    dispatchedAt: "2026-08-04T07:55:00Z",
    receivedAt: "2026-08-04T08:10:00Z",
    notes: "Delivered complete, no discrepancies. Closed out.",
    attachments: [],
    history: [
      { action: "Draft Transfer Created", by: "J. Alcantara", at: "2026-08-04T07:30:00Z" },
      { action: "Approved", by: "L. Herrera (Approver)", at: "2026-08-04T07:40:00Z" },
      { action: "Dispatched", by: "J. Alcantara", at: "2026-08-04T07:55:00Z" },
      { action: "Fully Received (60 of 60)", by: "J. Alcantara", at: "2026-08-04T08:10:00Z" },
      { action: "Completed", by: "J. Alcantara", at: "2026-08-04T08:15:00Z" },
    ],
  },
  {
    id: "11",
    transferNumber: "ST-2026-000029",
    status: "PARTIALLY_RECEIVED",
    sourceLocation: "Branch warehouse",
    destinationLocation: "Retail branch",
    requestedBy: "M. Reyes",
    approvedBy: "L. Herrera (Approver)",
    items: [
      {
        productName: "Lumea Perfume - Inspired by Aventus, 50 ml",
        sku: "LUM-AVT-50",
        dispatchedQuantity: 40,
        receivedQuantity: 32,
        discrepancyType: "Damaged in transit",
        discrepancyQuantity: 8,
        discrepancyNotes: "8 units damaged after a dropped pallet during transit; quarantined on arrival.",
      },
    ],
    dispatchedAt: "2026-07-23T09:00:00Z",
    receivedAt: "2026-07-24T10:00:00Z",
    notes: "Damaged units moved to the damaged stock area, pending write-off.",
    attachments: [{ name: "Receiving Report - RR-1029.pdf", uploadedAt: "2026-07-24T10:15:00Z" }],
    history: [
      { action: "Draft Transfer Created", by: "M. Reyes", at: "2026-07-22T08:00:00Z" },
      { action: "Approved", by: "L. Herrera (Approver)", at: "2026-07-22T13:00:00Z" },
      { action: "Dispatched", by: "M. Reyes", at: "2026-07-23T09:00:00Z" },
      { action: "Partially Received (32 of 40, 8 damaged)", by: "K. Santos", at: "2026-07-24T10:15:00Z", notes: "Damaged in transit discrepancy logged." },
    ],
  },
  {
    id: "12",
    transferNumber: "ST-2026-000028",
    status: "FULLY_RECEIVED",
    sourceLocation: "Store stockroom",
    destinationLocation: "Retail branch",
    requestedBy: "K. Santos",
    approvedBy: "L. Herrera (Approver)",
    items: [
      {
        productName: "Herbal Tea Sampler - 12-Pack",
        sku: "HTS-SMP-12",
        dispatchedQuantity: 60,
        receivedQuantity: 55,
        discrepancyType: "Missing items",
        discrepancyQuantity: 5,
        discrepancyNotes: "5 units missing from the carton on arrival; reported to courier for investigation.",
      },
    ],
    dispatchedAt: "2026-07-20T09:00:00Z",
    receivedAt: "2026-07-21T10:00:00Z",
    notes: "Reconciled and closed with a missing-items discrepancy on file.",
    attachments: [{ name: "Receiving Report - RR-1021.pdf", uploadedAt: "2026-07-21T10:20:00Z" }],
    history: [
      { action: "Draft Transfer Created", by: "K. Santos", at: "2026-07-19T08:00:00Z" },
      { action: "Approved", by: "L. Herrera (Approver)", at: "2026-07-19T12:00:00Z" },
      { action: "Dispatched", by: "K. Santos", at: "2026-07-20T09:00:00Z" },
      { action: "Fully Received (55 of 60, 5 missing)", by: "K. Santos", at: "2026-07-21T10:20:00Z" },
    ],
  },
  {
    id: "13",
    transferNumber: "ST-2026-000027",
    status: "FULLY_RECEIVED",
    sourceLocation: "Branch warehouse",
    destinationLocation: "Retail branch",
    requestedBy: "M. Reyes",
    approvedBy: "L. Herrera (Approver)",
    items: [
      {
        productName: "Ceramic Mug - Matte Black, 350 ml",
        sku: "CMG-BLK-350",
        dispatchedQuantity: 45,
        receivedQuantity: 40,
        discrepancyType: "Rejected items",
        discrepancyQuantity: 5,
        discrepancyNotes: "5 units rejected on arrival due to hairline cracks found during inspection.",
      },
    ],
    dispatchedAt: "2026-07-17T09:00:00Z",
    receivedAt: "2026-07-18T10:00:00Z",
    notes: "Rejected units returned to source location for disposal.",
    attachments: [{ name: "Receiving Report - RR-1015.pdf", uploadedAt: "2026-07-18T10:20:00Z" }],
    history: [
      { action: "Draft Transfer Created", by: "M. Reyes", at: "2026-07-16T08:00:00Z" },
      { action: "Approved", by: "L. Herrera (Approver)", at: "2026-07-16T12:00:00Z" },
      { action: "Dispatched", by: "M. Reyes", at: "2026-07-17T09:00:00Z" },
      { action: "Fully Received (40 of 45, 5 rejected)", by: "M. Reyes", at: "2026-07-18T10:20:00Z" },
    ],
  },
];

export function getStockTransfers(): StockTransfer[] {
  return STOCK_TRANSFERS;
}
