"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, ClipboardList, Clock3, Plus, Search, ShieldCheck, Users } from "lucide-react";
import { toast } from "sonner";

import {
  CreateStockCountDialog,
  type NewStockCountValues,
} from "@/components/stock-counts/create-stock-count-dialog";
import { StockCountDetailDialog } from "@/components/stock-counts/stock-count-detail-dialog";
import { StockCountStatusBadge } from "@/components/stock-counts/stock-count-status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { SummaryCard } from "@/components/shared/summary-card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate, formatNumber } from "@/lib/format";
import {
  INITIAL_STOCK_COUNTS,
  STOCK_COUNT_TYPES,
  createStockCountLines,
  getCountProgress,
  getCountVariance,
  type StockCount,
  type StockCountStatus,
} from "@/lib/stock-count-data";

const ALL = "__all__";
const STATUS_OPTIONS: Array<{ value: StockCountStatus; label: string }> = [
  { value: "DRAFT", label: "Draft" },
  { value: "IN_PROGRESS", label: "Counting" },
  { value: "SECOND_COUNT", label: "Second count" },
  { value: "FOR_APPROVAL", label: "For approval" },
  { value: "COMPLETED", label: "Completed" },
];

export function StockCountWorkspace() {
  const [counts, setCounts] = useState<StockCount[]>(() =>
    INITIAL_STOCK_COUNTS.map((count) => ({
      ...count,
      counters: [...count.counters],
      lines: count.lines.map((line) => ({ ...line })),
    })),
  );
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState(ALL);
  const [statusFilter, setStatusFilter] = useState(ALL);
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const pageSize = 10;

  const selectedCount = counts.find((count) => count.id === selectedId) ?? null;
  const filteredCounts = useMemo(() => {
    const term = search.trim().toLowerCase();
    return counts.filter((count) => {
      if (typeFilter !== ALL && count.type !== typeFilter) return false;
      if (statusFilter !== ALL && count.status !== statusFilter) return false;
      if (!term) return true;
      return [count.countNumber, count.type, count.location, count.scope, ...count.counters]
        .join(" ")
        .toLowerCase()
        .includes(term);
    });
  }, [counts, search, statusFilter, typeFilter]);

  useEffect(() => {
    setPage(0);
  }, [search, statusFilter, typeFilter]);

  const pageCount = Math.max(1, Math.ceil(filteredCounts.length / pageSize));
  const pagedCounts = filteredCounts.slice(page * pageSize, page * pageSize + pageSize);

  const activeCount = counts.filter((count) => ["DRAFT", "IN_PROGRESS", "SECOND_COUNT"].includes(count.status)).length;
  const awaitingApproval = counts.filter((count) => count.status === "FOR_APPROVAL").length;
  const completedCount = counts.filter((count) => count.status === "COMPLETED").length;

  function handleCreate(values: NewStockCountValues) {
    const numericIds = counts.map((count) => Number(count.id)).filter(Number.isFinite);
    const nextId = String(Math.max(0, ...numericIds) + 1);
    const nextSequence = Math.max(
      24,
      ...counts.map((count) => Number(count.countNumber.split("-").at(-1)) + 1),
    );
    const newCount: StockCount = {
      id: nextId,
      countNumber: `PSC-2026-${String(nextSequence).padStart(6, "0")}`,
      ...values,
      status: "DRAFT",
      createdAt: new Date().toISOString(),
      lines: createStockCountLines(),
      approvedBy: "",
      movementNumber: null,
    };
    setCounts((current) => [newCount, ...current]);
    setSelectedId(nextId);
    toast.success(`${newCount.countNumber} created as a draft.`);
  }

  function handleUpdate(updatedCount: StockCount) {
    setCounts((current) => current.map((count) => (count.id === updatedCount.id ? updatedCount : count)));
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-tight">Physical Stock Count</h1>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard icon={ClipboardList} label="Total Counts" value={formatNumber(counts.length)} detail="All count types" tone="blue" />
        <SummaryCard icon={Clock3} label="Active Counts" value={formatNumber(activeCount)} detail="Draft, first, or second count" tone="amber" />
        <SummaryCard icon={ShieldCheck} label="Awaiting Approval" value={formatNumber(awaitingApproval)} detail="Variance review required" tone="violet" />
        <SummaryCard icon={CheckCircle2} label="Completed" value={formatNumber(completedCount)} detail="Movements posted" tone="green" />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-2xl text-sm text-muted-foreground">
          Plan counts, capture blind or barcode-assisted quantities, review variances, and post approved movements.
        </p>
        <Button onClick={() => setCreateOpen(true)}>
          <Plus className="size-4" />
          New stock count
        </Button>
      </div>

      <Card className="gap-3">
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-wrap items-end gap-3">
            <div className="relative min-w-64 flex-1">
              <Label htmlFor="stock-count-search" className="mb-1.5 block text-xs text-muted-foreground">
                Search
              </Label>
              <Search className="pointer-events-none absolute top-[34px] left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="stock-count-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search count #, location, scope, or counter…"
                className="h-9 w-full rounded-lg border border-input bg-transparent pr-3 pl-8 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-muted-foreground">Count type</Label>
              <Select value={typeFilter} onValueChange={(value) => value && setTypeFilter(value)}>
                <SelectTrigger className="min-w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL}>All count types</SelectItem>
                  {STOCK_COUNT_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-muted-foreground">Status</Label>
              <Select value={statusFilter} onValueChange={(value) => value && setStatusFilter(value)}>
                <SelectTrigger className="min-w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL}>All statuses</SelectItem>
                  {STATUS_OPTIONS.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Count #</TableHead>
                  <TableHead>Type &amp; scope</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Counters</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead className="text-right">Variance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCounts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                      No stock counts match your filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  pagedCounts.map((count) => {
                    const progress = getCountProgress(count);
                    const variance = getCountVariance(count);
                    return (
                      <TableRow key={count.id} className="cursor-pointer" onClick={() => setSelectedId(count.id)}>
                        <TableCell>
                          <span className="font-mono font-medium">{count.countNumber}</span>
                          {count.blind && (
                            <Badge variant="outline" className="mt-1 block w-fit">
                              Blind
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <p className="font-medium">{count.type}</p>
                          <p className="max-w-56 truncate text-xs text-muted-foreground">{count.scope}</p>
                        </TableCell>
                        <TableCell>{count.location}</TableCell>
                        <TableCell>
                          <span className="flex items-center gap-1.5 text-sm">
                            <Users className="size-3.5 text-muted-foreground" />
                            {count.counters.length} {count.counters.length === 1 ? "counter" : "counters"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex min-w-28 items-center gap-2">
                            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                              <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
                            </div>
                            <span className="w-9 text-right text-xs tabular-nums text-muted-foreground">{progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell
                          className={`text-right font-medium tabular-nums ${
                            variance > 0 ? "text-emerald-600" : variance < 0 ? "text-red-600" : ""
                          }`}
                        >
                          {progress === 0 ? "—" : `${variance > 0 ? "+" : ""}${formatNumber(variance)}`}
                        </TableCell>
                        <TableCell>
                          <StockCountStatusBadge status={count.status} />
                        </TableCell>
                        <TableCell className="whitespace-nowrap">{formatDate(count.createdAt)}</TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          <DataTablePagination
            page={page}
            pageCount={pageCount}
            pageSize={pageSize}
            totalRows={filteredCounts.length}
            onPageChange={setPage}
          />
        </CardContent>
      </Card>

      <CreateStockCountDialog open={createOpen} onOpenChange={setCreateOpen} onCreate={handleCreate} />
      <StockCountDetailDialog
        count={selectedCount}
        onOpenChange={(open) => {
          if (!open) setSelectedId(null);
        }}
        onUpdate={handleUpdate}
      />
    </div>
  );
}
