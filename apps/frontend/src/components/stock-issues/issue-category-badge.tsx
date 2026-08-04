import { StatusBadge, type StatusColor } from "@/components/dashboard/status-badge";
import type { StockIssueCategory } from "@/lib/stock-issue-data";

const CATEGORY_COLOR: Record<StockIssueCategory, StatusColor> = {
  "Internal Department Use": "blue",
  "Product Samples and Testers": "violet",
  "Marketing Materials": "amber",
  "Damaged Goods Processing": "red",
  "Manual Sales Integration": "green",
  "Operational Consumption": "gray",
};

export function IssueCategoryBadge({ category }: { category: StockIssueCategory }) {
  return <StatusBadge color={CATEGORY_COLOR[category]} label={category} />;
}
