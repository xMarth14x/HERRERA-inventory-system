// Placeholder data for the Goods Receiving page (spec §7.8). No backend
// endpoints exist yet for receiving — this module is the single place to
// swap mocks for real calls against /api/v1/goods-receipts. GR-2026-000041
// and GR-2026-000038 close deliveries against PO-2026-000130 / PO-2026-000125
// from the Purchase Order page, and GR-2026-000005 / GR-2026-000006 walk
// through the exact partial-then-full delivery example from the spec
// (ordered 100, first delivery 60, final delivery 40).

export interface GoodsReceiptLineItem {
  productName: string;
  sku: string;
  orderedQuantity: number;
  previouslyReceivedQuantity: number;
  currentReceivedQuantity: number;
  rejectedQuantity: number;
  damagedQuantity: number;
  unitCost: number;
  batchNumber: string;
  manufacturingDate: string;
  expiryDate: string;
}

export interface GRAttachment {
  name: string;
  uploadedAt: string;
}

export interface GoodsReceipt {
  id: string;
  receiptNumber: string;
  poNumber: string;
  supplier: string;
  deliveryLocation: string;
  deliveryDate: string;
  deliveryReceiptNumber: string;
  supplierInvoiceNumber: string;
  items: GoodsReceiptLineItem[];
  receivedBy: string;
  confirmedBy: string;
  attachments: GRAttachment[];
}

export const GOODS_RECEIPTS: GoodsReceipt[] = [
  {
    id: "1",
    receiptNumber: "GR-2026-000041",
    poNumber: "PO-2026-000130",
    supplier: "Clayworks Supply Co.",
    deliveryLocation: "Main warehouse",
    deliveryDate: "2026-07-28",
    deliveryReceiptNumber: "DR-4821",
    supplierInvoiceNumber: "INV-CW-3391",
    items: [
      {
        productName: "Ceramic Mug - Matte Black, 350 ml",
        sku: "CMG-BLK-350",
        orderedQuantity: 300,
        previouslyReceivedQuantity: 0,
        currentReceivedQuantity: 180,
        rejectedQuantity: 2,
        damagedQuantity: 3,
        unitCost: 85,
        batchNumber: "—",
        manufacturingDate: "—",
        expiryDate: "—",
      },
    ],
    receivedBy: "K. Santos",
    confirmedBy: "R. Domingo",
    attachments: [{ name: "Delivery Receipt - DR-4821.pdf", uploadedAt: "2026-07-28T10:00:00Z" }],
  },
  {
    id: "2",
    receiptNumber: "GR-2026-000038",
    poNumber: "PO-2026-000125",
    supplier: "Aroma Distributors Inc.",
    deliveryLocation: "Main warehouse",
    deliveryDate: "2026-07-09",
    deliveryReceiptNumber: "DR-4790",
    supplierInvoiceNumber: "INV-AD-2280",
    items: [
      {
        productName: "Scented Candle - Sandalwood, 200 g",
        sku: "SCN-SDW-200",
        orderedQuantity: 200,
        previouslyReceivedQuantity: 0,
        currentReceivedQuantity: 200,
        rejectedQuantity: 0,
        damagedQuantity: 0,
        unitCost: 110,
        batchNumber: "B24-0117",
        manufacturingDate: "2026-05-02",
        expiryDate: "2026-08-09",
      },
    ],
    receivedBy: "R. Domingo",
    confirmedBy: "K. Santos",
    attachments: [{ name: "Delivery Receipt - DR-4790.pdf", uploadedAt: "2026-07-09T10:00:00Z" }],
  },
  {
    id: "3",
    receiptNumber: "GR-2026-000012",
    poNumber: "PO-2026-000110",
    supplier: "EcoLiving Partners",
    deliveryLocation: "Main warehouse",
    deliveryDate: "2026-05-04",
    deliveryReceiptNumber: "DR-4602",
    supplierInvoiceNumber: "INV-ECO-0871",
    items: [
      {
        productName: "Bamboo Cutlery Set",
        sku: "BMB-CTL-04",
        orderedQuantity: 100,
        previouslyReceivedQuantity: 0,
        currentReceivedQuantity: 100,
        rejectedQuantity: 0,
        damagedQuantity: 0,
        unitCost: 45,
        batchNumber: "—",
        manufacturingDate: "—",
        expiryDate: "—",
      },
    ],
    receivedBy: "R. Domingo",
    confirmedBy: "M. Reyes",
    attachments: [{ name: "Delivery Receipt - DR-4602.pdf", uploadedAt: "2026-05-04T10:00:00Z" }],
  },
  {
    id: "4",
    receiptNumber: "GR-2026-000005",
    poNumber: "PO-2026-000098",
    supplier: "Studio Form Trading",
    deliveryLocation: "Main warehouse",
    deliveryDate: "2026-06-10",
    deliveryReceiptNumber: "DR-4550",
    supplierInvoiceNumber: "INV-SFT-0512",
    items: [
      {
        productName: "Brass Desk Organizer",
        sku: "BRS-DSK-02",
        orderedQuantity: 100,
        previouslyReceivedQuantity: 0,
        currentReceivedQuantity: 60,
        rejectedQuantity: 0,
        damagedQuantity: 0,
        unitCost: 210,
        batchNumber: "—",
        manufacturingDate: "—",
        expiryDate: "—",
      },
    ],
    receivedBy: "K. Santos",
    confirmedBy: "R. Domingo",
    attachments: [{ name: "Delivery Receipt - DR-4550.pdf", uploadedAt: "2026-06-10T09:30:00Z" }],
  },
  {
    id: "5",
    receiptNumber: "GR-2026-000006",
    poNumber: "PO-2026-000098",
    supplier: "Studio Form Trading",
    deliveryLocation: "Main warehouse",
    deliveryDate: "2026-06-20",
    deliveryReceiptNumber: "DR-4571",
    supplierInvoiceNumber: "INV-SFT-0538",
    items: [
      {
        productName: "Brass Desk Organizer",
        sku: "BRS-DSK-02",
        orderedQuantity: 100,
        previouslyReceivedQuantity: 60,
        currentReceivedQuantity: 40,
        rejectedQuantity: 0,
        damagedQuantity: 0,
        unitCost: 210,
        batchNumber: "—",
        manufacturingDate: "—",
        expiryDate: "—",
      },
    ],
    receivedBy: "K. Santos",
    confirmedBy: "R. Domingo",
    attachments: [{ name: "Delivery Receipt - DR-4571.pdf", uploadedAt: "2026-06-20T11:00:00Z" }],
  },
];

export function getGoodsReceipts(): GoodsReceipt[] {
  return GOODS_RECEIPTS;
}

export interface GoodsReceiptLineRow {
  receiptNumber: string;
  poNumber: string;
  supplier: string;
  productName: string;
  sku: string;
  orderedQuantity: number;
  currentReceivedQuantity: number;
  remainingQuantity: number;
  poStatus: "PARTIALLY_RECEIVED" | "FULLY_RECEIVED";
  deliveryDate: string;
}

export function getGoodsReceiptLineRows(receipts: GoodsReceipt[] = GOODS_RECEIPTS): GoodsReceiptLineRow[] {
  return receipts.flatMap((gr) =>
    gr.items.map((item) => {
      const remaining = item.orderedQuantity - (item.previouslyReceivedQuantity + item.currentReceivedQuantity);
      return {
        receiptNumber: gr.receiptNumber,
        poNumber: gr.poNumber,
        supplier: gr.supplier,
        productName: item.productName,
        sku: item.sku,
        orderedQuantity: item.orderedQuantity,
        currentReceivedQuantity: item.currentReceivedQuantity,
        remainingQuantity: remaining,
        poStatus: remaining <= 0 ? ("FULLY_RECEIVED" as const) : ("PARTIALLY_RECEIVED" as const),
        deliveryDate: gr.deliveryDate,
      };
    }),
  );
}
