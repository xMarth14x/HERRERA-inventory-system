// Placeholder data for the Stock Adjustment page (spec §7.13). No backend
// endpoints exist yet for adjustments — this module is the single place to
// swap mocks for real calls against /api/v1/inventory/adjustments.
// SA-2026-000063, SA-2026-000064, and SA-2026-000058 are the same
// adjustments already referenced by the stock movement ledger's
// ADJUSTMENT_OUT, ADJUSTMENT_IN, and REVERSAL entries, so the two pages
// agree on quantities and approvers.

export type AdjustmentType =
  | "Damaged"
  | "Expired"
  | "Lost"
  | "Found"
  | "Encoding correction"
  | "Sample usage"
  | "Tester usage"
  | "Internal consumption"
  | "Reclassification"
  | "Quality-control rejection";

export const ADJUSTMENT_TYPES: AdjustmentType[] = [
  "Damaged",
  "Expired",
  "Lost",
  "Found",
  "Encoding correction",
  "Sample usage",
  "Tester usage",
  "Internal consumption",
  "Reclassification",
  "Quality-control rejection",
];

export interface AdjustmentAttachment {
  name: string;
  uploadedAt: string;
}

export interface StockAdjustment {
  id: string;
  adjustmentNumber: string;
  location: string;
  productName: string;
  sku: string;
  currentQuantity: number;
  adjustmentQuantity: number;
  newQuantity: number;
  adjustmentType: AdjustmentType;
  reason: string;
  notes: string;
  attachment: AdjustmentAttachment | null;
  requestedBy: string;
  approvedBy: string;
  postedBy: string;
  requiresApproval: boolean;
  createdAt: string;
}

export const STOCK_ADJUSTMENTS: StockAdjustment[] = [
  {
    id: "1",
    adjustmentNumber: "SA-2026-000063",
    location: "Damaged stock area",
    productName: "Scented Candle - Sandalwood, 200 g",
    sku: "SCN-SDW-200",
    currentQuantity: 96,
    adjustmentQuantity: -12,
    newQuantity: 84,
    adjustmentType: "Damaged",
    reason: "Water damage during storage",
    notes: "Water leak detected in the Damaged Stock Area storage rack.",
    attachment: { name: "Damage Report - DMG-0088.pdf", uploadedAt: "2026-08-04T07:00:00Z" },
    requestedBy: "M. Reyes",
    approvedBy: "L. Herrera (Approver)",
    postedBy: "M. Reyes",
    requiresApproval: true,
    createdAt: "2026-08-04T07:05:00Z",
  },
  {
    id: "2",
    adjustmentNumber: "SA-2026-000064",
    location: "Main warehouse",
    productName: "Aromatherapy Oil - Lavender, 30 ml",
    sku: "ARO-LAV-30",
    currentQuantity: 114,
    adjustmentQuantity: 6,
    newQuantity: 120,
    adjustmentType: "Found",
    reason: "Physical count found additional units",
    notes: "Units found in an unlabeled bin during cycle count.",
    attachment: null,
    requestedBy: "M. Reyes",
    approvedBy: "L. Herrera (Approver)",
    postedBy: "M. Reyes",
    requiresApproval: true,
    createdAt: "2026-08-01T10:00:00Z",
  },
  {
    id: "3",
    adjustmentNumber: "SA-2026-000058",
    location: "Main warehouse",
    productName: "Lumea Perfume - Inspired by BR540, 50 ml",
    sku: "LUM-BR540-50",
    currentQuantity: 1220,
    adjustmentQuantity: -10,
    newQuantity: 1210,
    adjustmentType: "Encoding correction",
    reason: "Correcting an over-posted adjustment from the prior week",
    notes: "Prior stock count adjustment was posted 10 units too high.",
    attachment: null,
    requestedBy: "R. Domingo",
    approvedBy: "L. Herrera (Approver)",
    postedBy: "R. Domingo",
    requiresApproval: true,
    createdAt: "2026-08-03T16:10:00Z",
  },
  {
    id: "4",
    adjustmentNumber: "SA-2026-000060",
    location: "Store stockroom",
    productName: "Scented Candle - Lavender, 200 g",
    sku: "SCN-LAV-200",
    currentQuantity: 40,
    adjustmentQuantity: -8,
    newQuantity: 32,
    adjustmentType: "Expired",
    reason: "Batch past expiry date",
    notes: "Batch B24-0055 expired 2026-07-15; pulled from shelf.",
    attachment: { name: "Expiry Disposal Log.pdf", uploadedAt: "2026-07-16T09:00:00Z" },
    requestedBy: "K. Santos",
    approvedBy: "L. Herrera (Approver)",
    postedBy: "K. Santos",
    requiresApproval: true,
    createdAt: "2026-07-16T09:15:00Z",
  },
  {
    id: "5",
    adjustmentNumber: "SA-2026-000059",
    location: "Main warehouse",
    productName: "Brass Desk Organizer",
    sku: "BRS-DSK-02",
    currentQuantity: 65,
    adjustmentQuantity: -5,
    newQuantity: 60,
    adjustmentType: "Lost",
    reason: "Units unaccounted for after warehouse reorganization",
    notes: "Unable to locate during shelf audit; presumed lost.",
    attachment: null,
    requestedBy: "R. Domingo",
    approvedBy: "L. Herrera (Approver)",
    postedBy: "R. Domingo",
    requiresApproval: true,
    createdAt: "2026-07-25T10:00:00Z",
  },
  {
    id: "6",
    adjustmentNumber: "SA-2026-000057",
    location: "Retail branch",
    productName: "Aromatherapy Oil - Lavender, 30 ml",
    sku: "ARO-LAV-30",
    currentQuantity: 45,
    adjustmentQuantity: -3,
    newQuantity: 42,
    adjustmentType: "Sample usage",
    reason: "Used as fragrance samples for VIP customers",
    notes: "",
    attachment: null,
    requestedBy: "K. Santos",
    approvedBy: "",
    postedBy: "K. Santos",
    requiresApproval: false,
    createdAt: "2026-07-22T14:00:00Z",
  },
  {
    id: "7",
    adjustmentNumber: "SA-2026-000056",
    location: "Retail branch",
    productName: "Ceramic Mug - Matte Black, 350 ml",
    sku: "CMG-BLK-350",
    currentQuantity: 88,
    adjustmentQuantity: -2,
    newQuantity: 86,
    adjustmentType: "Tester usage",
    reason: "Display tester units damaged from handling",
    notes: "",
    attachment: null,
    requestedBy: "K. Santos",
    approvedBy: "",
    postedBy: "K. Santos",
    requiresApproval: false,
    createdAt: "2026-07-20T11:00:00Z",
  },
  {
    id: "8",
    adjustmentNumber: "SA-2026-000055",
    location: "Store stockroom",
    productName: "Herbal Tea Sampler - 12-Pack",
    sku: "HTS-SMP-12",
    currentQuantity: 202,
    adjustmentQuantity: -4,
    newQuantity: 198,
    adjustmentType: "Internal consumption",
    reason: "Staff break room consumption",
    notes: "",
    attachment: null,
    requestedBy: "M. Reyes",
    approvedBy: "",
    postedBy: "M. Reyes",
    requiresApproval: false,
    createdAt: "2026-07-18T09:00:00Z",
  },
  {
    id: "9",
    adjustmentNumber: "SA-2026-000054",
    location: "Main warehouse",
    productName: "Scented Candle - Sandalwood, 200 g",
    sku: "SCN-SDW-200",
    currentQuantity: 200,
    adjustmentQuantity: -50,
    newQuantity: 150,
    adjustmentType: "Reclassification",
    reason: "Reclassified as component stock for a gift bundle SKU",
    notes: "50 units re-tagged under gift bundle assembly; recorded here as an outbound reclassification.",
    attachment: { name: "Reclassification Memo.pdf", uploadedAt: "2026-07-15T10:00:00Z" },
    requestedBy: "M. Reyes",
    approvedBy: "L. Herrera (Approver)",
    postedBy: "M. Reyes",
    requiresApproval: true,
    createdAt: "2026-07-15T10:30:00Z",
  },
  {
    id: "10",
    adjustmentNumber: "SA-2026-000053",
    location: "Branch warehouse",
    productName: "Cotton Tote Bag - Natural",
    sku: "CTB-NAT-01",
    currentQuantity: 250,
    adjustmentQuantity: -15,
    newQuantity: 235,
    adjustmentType: "Quality-control rejection",
    reason: "Failed incoming QC inspection - stitching defects",
    notes: "",
    attachment: { name: "QC Rejection Report - QC-0031.pdf", uploadedAt: "2026-07-12T09:00:00Z" },
    requestedBy: "R. Domingo",
    approvedBy: "L. Herrera (Approver)",
    postedBy: "R. Domingo",
    requiresApproval: true,
    createdAt: "2026-07-12T09:30:00Z",
  },
];

export function getStockAdjustments(): StockAdjustment[] {
  return STOCK_ADJUSTMENTS;
}
