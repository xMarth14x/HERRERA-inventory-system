"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { StockIssuesTable, CATEGORY_ALL } from "@/components/stock-issues/stock-issues-table";
import { StockIssueDetailDialog } from "@/components/stock-issues/stock-issue-detail-dialog";
import { getStockIssues } from "@/lib/stock-issue-data";

export default function StockIssuesPage() {
  const issues = getStockIssues();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(CATEGORY_ALL);
  const [selectedIssueNumber, setSelectedIssueNumber] = useState<string | null>(null);

  const selectedIssue = selectedIssueNumber
    ? (issues.find((i) => i.issueNumber === selectedIssueNumber) ?? null)
    : null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Stock Issue</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Manual stock issue for internal use, samples, marketing, and damaged goods processing.
          </p>
        </div>
        <Button onClick={() => toast.info("Creating stock issues isn't wired to the backend yet.")}>
          <Plus className="size-4" />
          New Stock Issue
        </Button>
      </div>

      <StockIssuesTable
        data={issues}
        search={search}
        onSearchChange={setSearch}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
        onSelectRow={setSelectedIssueNumber}
      />

      <StockIssueDetailDialog
        issue={selectedIssue}
        onOpenChange={(open) => {
          if (!open) setSelectedIssueNumber(null);
        }}
      />
    </div>
  );
}
