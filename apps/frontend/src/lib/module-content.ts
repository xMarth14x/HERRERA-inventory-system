import type { ModuleContent } from "@/components/module-spec/module-spec-page";

export const purchaseOrderContent = {
  heading: "Purchase Order",
  workflow: [
    "Draft Purchase Order",
    "Submitted for Approval",
    "Approved",
    "Sent to Supplier",
    "Partially Received or Fully Received",
    "Closed",
  ],
  statuses: [
    "DRAFT",
    "FOR_APPROVAL",
    "APPROVED",
    "REJECTED",
    "SENT_TO_SUPPLIER",
    "PARTIALLY_RECEIVED",
    "FULLY_RECEIVED",
    "CANCELLED",
    "CLOSED",
  ],
  sections: [
    {
      heading: "Purchase Order Information",
      items: [
        "PO number",
        "Supplier",
        "Supplier quotation reference",
        "Order and expected delivery dates",
        "Delivery location",
        "Payment terms and currency",
        "Product or variant",
        "Ordered quantity and unit price",
        "Discount, tax, shipping, and other charges",
        "Subtotal and grand total",
        "Notes, terms, and conditions",
        "Prepared by, checked by, and approved by",
        "Attachments",
      ],
    },
    {
      heading: "Purchase Order Controls",
      items: [
        "Approval limits based on total amount",
        "Prevent receiving more than the ordered quantity",
        "Support partial deliveries",
        "Record rejected or damaged quantities",
        "Prevent unauthorized editing after approval",
        "Require revision history for approved changes",
        "Generate printable and PDF purchase orders",
        "Record supplier confirmation and delivery updates",
        "Track ordered, received, rejected, and remaining quantities",
      ],
    },
    {
      heading: "Inventory Rule",
      note: "Creating or approving a purchase order will not increase inventory. Inventory increases only after a confirmed goods receipt.",
    },
  ],
};

export const goodsReceivingContent: ModuleContent = {
  title: "Goods Receiving",
  description:
    "Goods receiving confirms delivered quantities against an open purchase order and updates stock only once confirmed.",
  workflow: [
    "Open Purchase Order",
    "Create Goods Receipt",
    "Scan or Select Products",
    "Enter Received Quantities",
    "Record Damaged or Rejected Quantities",
    "Upload Delivery Documents",
    "Confirm Receipt",
    "Stock Updated",
  ],
  sections: [
    {
      heading: "Goods Receipt Information",
      items: [
        "Goods receipt number",
        "Purchase order and supplier",
        "Delivery location and date",
        "Delivery receipt and supplier invoice numbers",
        "Product",
        "Ordered, previously received, current received, rejected, damaged, and remaining quantities",
        "Batch number, manufacturing date, and expiry date",
        "Unit cost",
        "Received by and confirmed by",
        "Attachments",
      ],
    },
    {
      heading: "Partial Delivery Example",
      example: [
        { label: "Ordered quantity", value: "100" },
        { label: "First delivery", value: "60" },
        { label: "Remaining quantity", value: "40" },
        { label: "PO status", value: "PARTIALLY_RECEIVED" },
      ],
    },
    {
      heading: "After Final Delivery",
      example: [
        { label: "Total received", value: "100" },
        { label: "Remaining quantity", value: "0" },
        { label: "PO status", value: "FULLY_RECEIVED" },
      ],
    },
  ],
};

export const inventoryBalancesContent: ModuleContent = {
  title: "Inventory Balances",
  description: "Available quantity should be calculated rather than independently edited or manually maintained.",
  sections: [
    {
      heading: "Balance Types",
      items: ["On Hand", "Reserved", "Available", "In Transit", "Damaged", "Quarantined"],
    },
    {
      heading: "Formula",
      example: [{ label: "Available Quantity", value: "On Hand − Reserved" }],
    },
  ],
};

export const stockMovementLedgerContent = {
  title: "Stock Movement Ledger",
  description:
    "Every stock change must create a movement record. Posted movements cannot be edited or deleted. Errors must be corrected using reversal movements.",
  sections: [
    {
      heading: "Movement Information",
      items: [
        "Movement number and type",
        "Product variant and location",
        "Quantity before, change, and after",
        "Reserved quantity before, change, and after",
        "Unit cost",
        "Reference type and number",
        "Reason",
        "Performed by and approved by",
        "Date and time",
      ],
    },
  ],
};

export const barcodeSupportContent: ModuleContent = {
  title: "Barcode Support",
  description:
    "The initial system will support USB barcode scanners that operate as keyboard input devices. Mobile-camera barcode scanning may be added later.",
  sections: [
    {
      heading: "Where Barcodes Are Used",
      items: ["Product lookup", "Receiving", "Stock issue", "Transfers", "Stock counting", "Product verification"],
    },
  ],
};
