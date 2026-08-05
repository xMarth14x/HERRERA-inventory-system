// Placeholder data for the Catalog pages (spec §7.3). No backend endpoints
// exist yet for the catalog — this module is the single place to swap mocks
// for real calls against /api/v1/categories, /api/v1/brands, and /api/v1/units.

export interface Subcategory {
  name: string;
  productCount: number;
}

export interface Category {
  name: string;
  subcategories: Subcategory[];
}

export interface FlatSubcategory {
  name: string;
  category: string;
  productCount: number;
}

export interface Brand {
  name: string;
  productCount: number;
}

export type UnitDimension = "Count" | "Weight" | "Volume";

export interface Unit {
  code: string;
  name: string;
  dimension: UnitDimension;
  /** How many of this dimension's base unit (Piece / Gram / Milliliter) one of this unit equals. */
  conversionToBase: number;
  definition: string;
  description: string;
  exampleUse: string;
}

export interface UnitConversionExample {
  from: string;
  to: string;
  conversion: string;
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

export function getFlatSubcategories(): FlatSubcategory[] {
  return CATEGORIES.flatMap((category) =>
    category.subcategories.map((sub) => ({
      name: sub.name,
      category: category.name,
      productCount: sub.productCount,
    })),
  ).sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
}

export const BRANDS: Brand[] = [
  { name: "Lumea", productCount: 2 },
  { name: "Clayworks", productCount: 2 },
  { name: "Northline", productCount: 2 },
  { name: "Aroma Co.", productCount: 2 },
  { name: "EcoLiving", productCount: 1 },
  { name: "Leaf & Bloom", productCount: 1 },
  { name: "Studio Form", productCount: 1 },
];

// Every dimension resolves through its own base unit: Piece (Count),
// Gram (Weight), Milliliter (Volume). Units can only convert within the
// same dimension — a Box can become Pieces, but never Kilograms.
export const UNITS: Unit[] = [
  { code: "pc", name: "Piece", dimension: "Count", conversionToBase: 1, definition: "Base unit", description: "Single item", exampleUse: "Laptop, Chair, Pen" },
  { code: "pair", name: "Pair", dimension: "Count", conversionToBase: 2, definition: "2 pieces", description: "Two pieces", exampleUse: "Shoes, Gloves" },
  { code: "pack", name: "Pack", dimension: "Count", conversionToBase: 10, definition: "10 pieces", description: "Small package", exampleUse: "Pens (10 pcs), Snacks" },
  { code: "box", name: "Box", dimension: "Count", conversionToBase: 24, definition: "24 pieces", description: "Contains multiple pieces", exampleUse: "Tissue Box, Light Bulbs" },
  { code: "case", name: "Case", dimension: "Count", conversionToBase: 288, definition: "12 boxes", description: "Multiple boxes", exampleUse: "Beverages, Canned Goods" },
  { code: "dozen", name: "Dozen", dimension: "Count", conversionToBase: 12, definition: "12 pieces", description: "Standard dozen count", exampleUse: "Eggs, Bakery Items" },
  { code: "kg", name: "Kilogram", dimension: "Weight", conversionToBase: 1000, definition: "1000 grams", description: "Weight measurement", exampleUse: "Rice, Sugar, Nuts" },
  { code: "g", name: "Gram", dimension: "Weight", conversionToBase: 1, definition: "Base unit", description: "Small weight measurement", exampleUse: "Spices, Seasoning" },
  { code: "l", name: "Liter", dimension: "Volume", conversionToBase: 1000, definition: "1000 milliliters", description: "Liquid volume", exampleUse: "Paint, Milk, Oil" },
  { code: "ml", name: "Milliliter", dimension: "Volume", conversionToBase: 1, definition: "Base unit", description: "Small liquid volume", exampleUse: "Syrup, Extract" },
];

/** Returns null when the two units aren't the same dimension — they can't be converted. */
export function convertUnits(quantity: number, fromCode: string, toCode: string): number | null {
  const from = UNITS.find((u) => u.code === fromCode);
  const to = UNITS.find((u) => u.code === toCode);
  if (!from || !to) return null;
  if (from.dimension !== to.dimension) return null;
  return (quantity * from.conversionToBase) / to.conversionToBase;
}

// Reference table shown on the Unit Conversions page — the common
// conversions staff look up most often, independent of the live converter.
export const UNIT_CONVERSION_EXAMPLES: UnitConversionExample[] = [
  { from: "1 Box", to: "Pieces", conversion: "24 pcs" },
  { from: "1 Case", to: "Boxes", conversion: "12 boxes" },
  { from: "1 Case", to: "Pieces", conversion: "288 pcs" },
  { from: "1 Dozen", to: "Pieces", conversion: "12 pcs" },
  { from: "1 Kilogram", to: "Grams", conversion: "1000 g" },
  { from: "1 Liter", to: "Milliliters", conversion: "1000 mL" },
];
