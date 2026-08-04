// Placeholder data for the Products page (spec §7.2). No backend endpoints
// exist yet for the catalog (Phase 2 - Product Catalog is future work) — this
// module is the single place to swap mocks for real TanStack Query calls
// against /api/v1/products and /api/v1/product-variants.

export interface ProductVariant {
  id: string;
  variantName: string;
  sku: string;
  barcode: string;
  cost: number;
  sellingPrice: number;
  minimum: number;
  maximum: number;
  reorderPoint: number;
  reorderQuantity: number;
}

export interface Product {
  id: string;
  name: string;
  productCode: string;
  description: string;
  category: string;
  brand: string;
  baseUnit: string;
  isActive: boolean;
  isTaxable: boolean;
  batchTracking: boolean;
  expiryTracking: boolean;
  variants: ProductVariant[];
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Lumea Perfume",
    productCode: "PRD-0001",
    description: "Eau de parfum line inspired by designer fragrances.",
    category: "Fragrances",
    brand: "Lumea",
    baseUnit: "Piece",
    isActive: true,
    isTaxable: true,
    batchTracking: true,
    expiryTracking: true,
    variants: [
      {
        id: "1-1",
        variantName: "Inspired by BR540, 50 ml",
        sku: "LUM-BR540-50",
        barcode: "4801234567890",
        cost: 320,
        sellingPrice: 650,
        minimum: 20,
        maximum: 300,
        reorderPoint: 40,
        reorderQuantity: 100,
      },
      {
        id: "1-2",
        variantName: "Inspired by Aventus, 50 ml",
        sku: "LUM-AVT-50",
        barcode: "4801234567891",
        cost: 340,
        sellingPrice: 680,
        minimum: 15,
        maximum: 250,
        reorderPoint: 30,
        reorderQuantity: 80,
      },
    ],
  },
  {
    id: "2",
    name: "Ceramic Mug",
    productCode: "PRD-0002",
    description: "Stoneware mug, dishwasher and microwave safe.",
    category: "Drinkware",
    brand: "Clayworks",
    baseUnit: "Piece",
    isActive: true,
    isTaxable: true,
    batchTracking: false,
    expiryTracking: false,
    variants: [
      {
        id: "2-1",
        variantName: "Matte Black, 350 ml",
        sku: "CMG-BLK-350",
        barcode: "4801234570010",
        cost: 85,
        sellingPrice: 199,
        minimum: 40,
        maximum: 500,
        reorderPoint: 80,
        reorderQuantity: 200,
      },
      {
        id: "2-2",
        variantName: "Glossy White, 350 ml",
        sku: "CMG-WHT-350",
        barcode: "4801234570011",
        cost: 85,
        sellingPrice: 199,
        minimum: 40,
        maximum: 500,
        reorderPoint: 80,
        reorderQuantity: 200,
      },
    ],
  },
  {
    id: "3",
    name: "Cotton Tote Bag",
    productCode: "PRD-0003",
    description: "Heavyweight cotton canvas tote, reinforced handles.",
    category: "Textiles",
    brand: "Northline",
    baseUnit: "Piece",
    isActive: true,
    isTaxable: false,
    batchTracking: false,
    expiryTracking: false,
    variants: [
      {
        id: "3-1",
        variantName: "Natural",
        sku: "CTB-NAT-01",
        barcode: "4801234571010",
        cost: 60,
        sellingPrice: 149,
        minimum: 50,
        maximum: 600,
        reorderPoint: 100,
        reorderQuantity: 250,
      },
      {
        id: "3-2",
        variantName: "Charcoal",
        sku: "CTB-CHR-01",
        barcode: "4801234571011",
        cost: 60,
        sellingPrice: 149,
        minimum: 50,
        maximum: 600,
        reorderPoint: 100,
        reorderQuantity: 250,
      },
    ],
  },
  {
    id: "4",
    name: "Scented Candle",
    productCode: "PRD-0004",
    description: "Soy wax candle, approx. 45-hour burn time.",
    category: "Wellness",
    brand: "Aroma Co.",
    baseUnit: "Piece",
    isActive: true,
    isTaxable: true,
    batchTracking: true,
    expiryTracking: true,
    variants: [
      {
        id: "4-1",
        variantName: "Sandalwood, 200 g",
        sku: "SCN-SDW-200",
        barcode: "4801234572010",
        cost: 110,
        sellingPrice: 249,
        minimum: 30,
        maximum: 400,
        reorderPoint: 60,
        reorderQuantity: 150,
      },
      {
        id: "4-2",
        variantName: "Lavender, 200 g",
        sku: "SCN-LAV-200",
        barcode: "4801234572011",
        cost: 110,
        sellingPrice: 249,
        minimum: 30,
        maximum: 400,
        reorderPoint: 60,
        reorderQuantity: 150,
      },
    ],
  },
  {
    id: "5",
    name: "Bamboo Cutlery Set",
    productCode: "PRD-0005",
    description: "Reusable travel cutlery set with carrying pouch.",
    category: "Home Goods",
    brand: "EcoLiving",
    baseUnit: "Set",
    isActive: true,
    isTaxable: true,
    batchTracking: false,
    expiryTracking: false,
    variants: [
      {
        id: "5-1",
        variantName: "Standard Set",
        sku: "BMB-CTL-04",
        barcode: "4801234573010",
        cost: 45,
        sellingPrice: 119,
        minimum: 25,
        maximum: 300,
        reorderPoint: 50,
        reorderQuantity: 120,
      },
    ],
  },
  {
    id: "6",
    name: "Aromatherapy Oil",
    productCode: "PRD-0006",
    description: "100% pure essential oil blend.",
    category: "Wellness",
    brand: "Aroma Co.",
    baseUnit: "Bottle",
    isActive: true,
    isTaxable: true,
    batchTracking: true,
    expiryTracking: true,
    variants: [
      {
        id: "6-1",
        variantName: "Lavender, 30 ml",
        sku: "ARO-LAV-30",
        barcode: "4801234574010",
        cost: 95,
        sellingPrice: 229,
        minimum: 40,
        maximum: 400,
        reorderPoint: 70,
        reorderQuantity: 150,
      },
    ],
  },
  {
    id: "7",
    name: "Herbal Tea Sampler",
    productCode: "PRD-0007",
    description: "Assorted herbal tea sachets, 12-count sampler box.",
    category: "Wellness",
    brand: "Leaf & Bloom",
    baseUnit: "Box",
    isActive: true,
    isTaxable: true,
    batchTracking: true,
    expiryTracking: true,
    variants: [
      {
        id: "7-1",
        variantName: "12-Pack Sampler",
        sku: "HTS-SMP-12",
        barcode: "4801234575010",
        cost: 130,
        sellingPrice: 289,
        minimum: 60,
        maximum: 500,
        reorderPoint: 100,
        reorderQuantity: 200,
      },
    ],
  },
  {
    id: "8",
    name: "Brass Desk Organizer",
    productCode: "PRD-0008",
    description: "Solid brass desktop tray for stationery.",
    category: "Home Goods",
    brand: "Studio Form",
    baseUnit: "Piece",
    isActive: true,
    isTaxable: true,
    batchTracking: false,
    expiryTracking: false,
    variants: [
      {
        id: "8-1",
        variantName: "Standard",
        sku: "BRS-DSK-02",
        barcode: "4801234576010",
        cost: 210,
        sellingPrice: 459,
        minimum: 10,
        maximum: 120,
        reorderPoint: 20,
        reorderQuantity: 40,
      },
    ],
  },
  {
    id: "9",
    name: "Wool Throw Blanket",
    productCode: "PRD-0009",
    description: "Merino wool blend throw, discontinued colorway.",
    category: "Textiles",
    brand: "Northline",
    baseUnit: "Piece",
    isActive: false,
    isTaxable: true,
    batchTracking: false,
    expiryTracking: false,
    variants: [
      {
        id: "9-1",
        variantName: "Grey",
        sku: "WTB-GRY-01",
        barcode: "4801234577010",
        cost: 380,
        sellingPrice: 799,
        minimum: 5,
        maximum: 60,
        reorderPoint: 10,
        reorderQuantity: 20,
      },
    ],
  },
];

export function getProducts(): Product[] {
  return MOCK_PRODUCTS;
}
