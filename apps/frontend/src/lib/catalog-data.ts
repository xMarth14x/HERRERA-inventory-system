// Placeholder data for the Categories/Brands/Units page (spec §7.3). No
// backend endpoints exist yet for the catalog — this module is the single
// place to swap mocks for real calls against /api/v1/categories,
// /api/v1/brands, and /api/v1/units.

export interface Subcategory {
  name: string;
  productCount: number;
}

export interface Category {
  name: string;
  subcategories: Subcategory[];
}

export interface Brand {
  name: string;
  productCount: number;
}

export interface Unit {
  code: string;
  name: string;
  /** How many base units (Piece) one of this unit equals. */
  conversionToBase: number;
  /** Human-readable definition, e.g. "12 boxes". */
  definition: string;
}

export const CATEGORIES: Category[] = [
  {
    name: "Fragrances",
    subcategories: [
      { name: "Perfumes", productCount: 6 },
      { name: "Body Sprays", productCount: 3 },
      { name: "Essential Oils", productCount: 4 },
    ],
  },
  {
    name: "Drinkware",
    subcategories: [
      { name: "Mugs", productCount: 5 },
      { name: "Tumblers", productCount: 2 },
      { name: "Glassware", productCount: 3 },
    ],
  },
  {
    name: "Textiles",
    subcategories: [
      { name: "Bags", productCount: 4 },
      { name: "Blankets", productCount: 2 },
      { name: "Apparel", productCount: 3 },
    ],
  },
  {
    name: "Home Goods",
    subcategories: [
      { name: "Kitchenware", productCount: 5 },
      { name: "Desk Accessories", productCount: 3 },
      { name: "Decor", productCount: 4 },
    ],
  },
  {
    name: "Wellness",
    subcategories: [
      { name: "Candles", productCount: 4 },
      { name: "Aromatherapy", productCount: 3 },
      { name: "Teas", productCount: 2 },
    ],
  },
];

export const BRANDS: Brand[] = [
  { name: "Lumea", productCount: 2 },
  { name: "Clayworks", productCount: 2 },
  { name: "Northline", productCount: 2 },
  { name: "Aroma Co.", productCount: 2 },
  { name: "EcoLiving", productCount: 1 },
  { name: "Leaf & Bloom", productCount: 1 },
  { name: "Studio Form", productCount: 1 },
];

// Piece is the base unit every conversion resolves through.
export const UNITS: Unit[] = [
  { code: "pc", name: "Piece", conversionToBase: 1, definition: "Base unit" },
  { code: "box", name: "Box", conversionToBase: 24, definition: "24 pieces" },
  { code: "case", name: "Case", conversionToBase: 288, definition: "12 boxes" },
];

export function convertUnits(quantity: number, fromCode: string, toCode: string): number {
  const from = UNITS.find((u) => u.code === fromCode);
  const to = UNITS.find((u) => u.code === toCode);
  if (!from || !to) return 0;
  return (quantity * from.conversionToBase) / to.conversionToBase;
}
