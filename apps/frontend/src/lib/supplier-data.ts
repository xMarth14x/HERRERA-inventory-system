// Placeholder data for the Suppliers page (spec §7.5). No backend endpoints
// exist yet for suppliers — this module is the single place to swap mocks
// for real calls against /api/v1/suppliers. Names match the supplier list
// already referenced in the dashboard's filter options.

export interface SupplierContact {
  name: string;
  phone: string;
  email: string;
}

export interface SupplierDocument {
  name: string;
  type: "Quotation" | "Contract" | "Price List" | "Tax Document" | "Accreditation";
  uploadedAt: string;
}

export interface SupplierPerformance {
  totalPurchaseOrders: number;
  totalPurchaseValue: number;
  onTimeDeliveryRate: number;
  averageLeadTimeDays: number;
  lastOrderDate: string;
}

export interface BankDetails {
  bankName: string;
  accountName: string;
  accountNumber: string;
  status: "Verified" | "Pending" | "Unverified";
}

export interface Supplier {
  id: string;
  code: string;
  name: string;
  status: "Active" | "Inactive";
  contact: SupplierContact;
  address: string;
  taxId: string;
  paymentTerms: string;
  deliveryLeadTimeDays: number;
  suppliedProducts: string[];
  bankDetails: BankDetails;
  performance: SupplierPerformance;
  documents: SupplierDocument[];
}

export const SUPPLIERS: Supplier[] = [
  {
    id: "1",
    code: "SUP-0001",
    name: "Aroma Distributors Inc.",
    status: "Active",
    contact: { name: "Melissa Cruz", phone: "+63 917 555 0142", email: "melissa.cruz@aromadist.com" },
    address: "88 Industrial Ave, Pasig City, Metro Manila, Philippines",
    taxId: "TIN 123-456-789-000",
    paymentTerms: "Net 30",
    deliveryLeadTimeDays: 12,
    suppliedProducts: ["Scented Candle", "Aromatherapy Oil", "Herbal Tea Sampler", "Lumea Perfume"],
    bankDetails: {
      bankName: "BDO Unibank",
      accountName: "Aroma Distributors Inc.",
      accountNumber: "•••• •••• 4821",
      status: "Verified",
    },
    performance: {
      totalPurchaseOrders: 34,
      totalPurchaseValue: 612400,
      onTimeDeliveryRate: 92,
      averageLeadTimeDays: 11,
      lastOrderDate: "2026-07-28",
    },
    documents: [
      { name: "Q3 Quotation - Wellness Line", type: "Quotation", uploadedAt: "2026-07-01" },
      { name: "Supply Agreement 2025-2027", type: "Contract", uploadedAt: "2025-03-02" },
      { name: "2026 Price List", type: "Price List", uploadedAt: "2026-01-15" },
      { name: "BIR Certificate of Registration", type: "Tax Document", uploadedAt: "2025-01-10" },
    ],
  },
  {
    id: "2",
    code: "SUP-0002",
    name: "Northline Textiles",
    status: "Active",
    contact: { name: "Ramon Dizon", phone: "+63 918 555 0876", email: "ramon.dizon@northlinetextiles.com" },
    address: "Lot 4 Textile Hub, Malolos, Bulacan, Philippines",
    taxId: "TIN 234-567-890-000",
    paymentTerms: "Net 45",
    deliveryLeadTimeDays: 20,
    suppliedProducts: ["Cotton Tote Bag", "Wool Throw Blanket"],
    bankDetails: {
      bankName: "Metrobank",
      accountName: "Northline Textiles Corp.",
      accountNumber: "•••• •••• 1190",
      status: "Verified",
    },
    performance: {
      totalPurchaseOrders: 21,
      totalPurchaseValue: 389200,
      onTimeDeliveryRate: 85,
      averageLeadTimeDays: 19,
      lastOrderDate: "2026-07-15",
    },
    documents: [
      { name: "2026 Wholesale Contract", type: "Contract", uploadedAt: "2026-01-05" },
      { name: "Price List - Textiles", type: "Price List", uploadedAt: "2026-02-01" },
      { name: "Fabric Accreditation Certificate", type: "Accreditation", uploadedAt: "2024-11-20" },
    ],
  },
  {
    id: "3",
    code: "SUP-0003",
    name: "Clayworks Supply Co.",
    status: "Active",
    contact: { name: "Josefina Ramos", phone: "+63 919 555 0234", email: "jo.ramos@clayworkssupply.com" },
    address: "22 Pottery Row, Vigan, Ilocos Sur, Philippines",
    taxId: "TIN 345-678-901-000",
    paymentTerms: "Net 30",
    deliveryLeadTimeDays: 25,
    suppliedProducts: ["Ceramic Mug"],
    bankDetails: {
      bankName: "BPI",
      accountName: "Clayworks Supply Co.",
      accountNumber: "•••• •••• 7734",
      status: "Pending",
    },
    performance: {
      totalPurchaseOrders: 14,
      totalPurchaseValue: 154800,
      onTimeDeliveryRate: 78,
      averageLeadTimeDays: 27,
      lastOrderDate: "2026-06-30",
    },
    documents: [
      { name: "Quotation - Matte Collection", type: "Quotation", uploadedAt: "2026-06-20" },
      { name: "Accreditation - Ceramics Guild", type: "Accreditation", uploadedAt: "2025-05-14" },
    ],
  },
  {
    id: "4",
    code: "SUP-0004",
    name: "EcoLiving Partners",
    status: "Active",
    contact: { name: "Carlo Villanueva", phone: "+63 920 555 0456", email: "carlo.v@ecolivingpartners.com" },
    address: "15 Greenway Industrial Park, Cebu City, Philippines",
    taxId: "TIN 456-789-012-000",
    paymentTerms: "Net 15",
    deliveryLeadTimeDays: 10,
    suppliedProducts: ["Bamboo Cutlery Set"],
    bankDetails: {
      bankName: "UnionBank",
      accountName: "EcoLiving Partners Inc.",
      accountNumber: "•••• •••• 2298",
      status: "Verified",
    },
    performance: {
      totalPurchaseOrders: 9,
      totalPurchaseValue: 68400,
      onTimeDeliveryRate: 95,
      averageLeadTimeDays: 9,
      lastOrderDate: "2026-07-22",
    },
    documents: [
      { name: "Sustainability Accreditation", type: "Accreditation", uploadedAt: "2025-09-01" },
      { name: "Price List 2026", type: "Price List", uploadedAt: "2026-01-20" },
    ],
  },
  {
    id: "5",
    code: "SUP-0005",
    name: "Studio Form Trading",
    status: "Inactive",
    contact: { name: "Anna Bautista", phone: "+63 921 555 0678", email: "anna.bautista@studioformtrading.com" },
    address: "9 Metalcraft Street, Marikina City, Philippines",
    taxId: "TIN 567-890-123-000",
    paymentTerms: "Net 30",
    deliveryLeadTimeDays: 30,
    suppliedProducts: ["Brass Desk Organizer"],
    bankDetails: {
      bankName: "Security Bank",
      accountName: "Studio Form Trading",
      accountNumber: "•••• •••• 5560",
      status: "Unverified",
    },
    performance: {
      totalPurchaseOrders: 4,
      totalPurchaseValue: 21600,
      onTimeDeliveryRate: 60,
      averageLeadTimeDays: 34,
      lastOrderDate: "2026-05-10",
    },
    documents: [{ name: "Draft Supply Contract", type: "Contract", uploadedAt: "2026-04-15" }],
  },
];

export function getSuppliers(): Supplier[] {
  return SUPPLIERS;
}
