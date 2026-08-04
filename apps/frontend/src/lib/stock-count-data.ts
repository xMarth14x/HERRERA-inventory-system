export type StockCountType =
  | "Full warehouse count"
  | "Branch count"
  | "Category count"
  | "Cycle count"
  | "Spot count"
  | "Blind count";

export type StockCountStatus = "DRAFT" | "IN_PROGRESS" | "SECOND_COUNT" | "FOR_APPROVAL" | "COMPLETED";

export interface StockCountLine {
  sku: string;
  productName: string;
  category: string;
  systemQuantity: number;
  firstCount: number | null;
  secondCount: number | null;
  varianceNote: string;
}

export interface StockCount {
  id: string;
  countNumber: string;
  type: StockCountType;
  location: string;
  scope: string;
  blind: boolean;
  counters: string[];
  status: StockCountStatus;
  createdAt: string;
  lines: StockCountLine[];
  approvedBy: string;
  movementNumber: string | null;
}

export const STOCK_COUNT_TYPES: StockCountType[] = [
  "Full warehouse count",
  "Branch count",
  "Category count",
  "Cycle count",
  "Spot count",
  "Blind count",
];

export const STOCK_COUNT_LOCATIONS = ["Main warehouse", "Branch warehouse", "Retail branch", "Store stockroom"];
export const STOCK_COUNT_COUNTERS = ["M. Reyes", "R. Domingo", "K. Santos", "J. Flores"];

const BASE_LINES: StockCountLine[] = [
  {
    sku: "SCN-SDW-200",
    productName: "Scented Candle - Sandalwood, 200 g",
    category: "Home Fragrance",
    systemQuantity: 96,
    firstCount: null,
    secondCount: null,
    varianceNote: "",
  },
  {
    sku: "ARO-LAV-30",
    productName: "Aromatherapy Oil - Lavender, 30 ml",
    category: "Wellness",
    systemQuantity: 114,
    firstCount: null,
    secondCount: null,
    varianceNote: "",
  },
  {
    sku: "CMG-BLK-350",
    productName: "Ceramic Mug - Matte Black, 350 ml",
    category: "Home Goods",
    systemQuantity: 88,
    firstCount: null,
    secondCount: null,
    varianceNote: "",
  },
];

function linesWithCounts(
  values: Array<[number | null, number | null, string]>,
): StockCountLine[] {
  return BASE_LINES.map((line, index) => ({
    ...line,
    firstCount: values[index]?.[0] ?? null,
    secondCount: values[index]?.[1] ?? null,
    varianceNote: values[index]?.[2] ?? "",
  }));
}

export const INITIAL_STOCK_COUNTS: StockCount[] = [
  {
    id: "1",
    countNumber: "PSC-2026-000018",
    type: "Full warehouse count",
    location: "Main warehouse",
    scope: "All products and storage zones",
    blind: false,
    counters: ["M. Reyes", "R. Domingo"],
    status: "COMPLETED",
    createdAt: "2026-08-01T08:00:00Z",
    lines: linesWithCounts([
      [94, 94, "Two damaged units moved to quarantine."],
      [120, 120, "Six units found in an unlabeled bin."],
      [88, 88, ""],
    ]),
    approvedBy: "L. Herrera",
    movementNumber: "MV-2026-001842",
  },
  {
    id: "2",
    countNumber: "PSC-2026-000019",
    type: "Branch count",
    location: "Retail branch",
    scope: "Entire retail branch",
    blind: false,
    counters: ["K. Santos", "J. Flores"],
    status: "FOR_APPROVAL",
    createdAt: "2026-08-02T08:30:00Z",
    lines: linesWithCounts([
      [95, 95, "One display unit was damaged."],
      [114, 114, ""],
      [90, 90, "Two units returned from the display area."],
    ]),
    approvedBy: "",
    movementNumber: null,
  },
  {
    id: "3",
    countNumber: "PSC-2026-000020",
    type: "Category count",
    location: "Main warehouse",
    scope: "Wellness category",
    blind: false,
    counters: ["M. Reyes"],
    status: "IN_PROGRESS",
    createdAt: "2026-08-03T07:45:00Z",
    lines: linesWithCounts([[96, null, ""], [109, null, "Five units are being checked."], [null, null, ""]]),
    approvedBy: "",
    movementNumber: null,
  },
  {
    id: "4",
    countNumber: "PSC-2026-000021",
    type: "Cycle count",
    location: "Branch warehouse",
    scope: "Zone B - weekly cycle",
    blind: false,
    counters: ["R. Domingo", "J. Flores"],
    status: "SECOND_COUNT",
    createdAt: "2026-08-03T09:15:00Z",
    lines: linesWithCounts([[91, 92, "Four units moved to damaged stock."], [114, 114, ""], [89, null, "Recount pending."]]),
    approvedBy: "",
    movementNumber: null,
  },
  {
    id: "5",
    countNumber: "PSC-2026-000022",
    type: "Spot count",
    location: "Store stockroom",
    scope: "Top-variance SKUs",
    blind: false,
    counters: ["K. Santos"],
    status: "DRAFT",
    createdAt: "2026-08-04T06:30:00Z",
    lines: linesWithCounts([]),
    approvedBy: "",
    movementNumber: null,
  },
  {
    id: "6",
    countNumber: "PSC-2026-000023",
    type: "Blind count",
    location: "Main warehouse",
    scope: "Zone C - high-value products",
    blind: true,
    counters: ["M. Reyes", "K. Santos"],
    status: "IN_PROGRESS",
    createdAt: "2026-08-04T07:00:00Z",
    lines: linesWithCounts([[93, null, ""], [null, null, ""], [88, null, ""]]),
    approvedBy: "",
    movementNumber: null,
  },
];

export function getEffectiveCount(line: StockCountLine): number | null {
  return line.secondCount ?? line.firstCount;
}

export function getLineVariance(line: StockCountLine): number | null {
  const count = getEffectiveCount(line);
  return count === null ? null : count - line.systemQuantity;
}

export function getCountVariance(count: StockCount): number {
  return count.lines.reduce((total, line) => total + (getLineVariance(line) ?? 0), 0);
}

export function getCountProgress(count: StockCount): number {
  const counted = count.lines.filter((line) => getEffectiveCount(line) !== null).length;
  return Math.round((counted / count.lines.length) * 100);
}

export function createStockCountLines(): StockCountLine[] {
  return BASE_LINES.map((line) => ({ ...line }));
}
