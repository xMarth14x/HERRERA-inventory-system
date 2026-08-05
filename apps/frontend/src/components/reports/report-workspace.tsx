"use client";

import { useMemo, useState } from "react";
import { BarChart3, Download, FileSearch, PackageSearch, Printer, Search, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/format";
import {
  REPORT_CATEGORIES,
  REPORT_DEFINITIONS,
  getReportResult,
  type ReportCategory,
  type ReportFormat,
  type ReportMetric,
  type ReportRow,
} from "@/lib/report-data";
import { cn } from "@/lib/utils";

const ALL_LOCATIONS = "__all__";
const categoryIcons = {
  inventory: PackageSearch,
  purchasing: ShoppingCart,
  analysis: BarChart3,
};

const numberFormatter = new Intl.NumberFormat("en-PH", { maximumFractionDigits: 1 });
const currencyFormatter = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  maximumFractionDigits: 0,
});

export function ReportWorkspace() {
  const [category, setCategory] = useState<ReportCategory>("inventory");
  const [reportId, setReportId] = useState("current-stock");
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState(ALL_LOCATIONS);
  const [page, setPage] = useState(0);
  const pageSize = 10;

  const categoryReports = REPORT_DEFINITIONS.filter((report) => report.category === category);
  const definition = REPORT_DEFINITIONS.find((report) => report.id === reportId) ?? REPORT_DEFINITIONS[0];
  const result = useMemo(() => getReportResult(definition.id), [definition.id]);
  const locations = useMemo(() => {
    if (!result.locationKey) return [];
    return [...new Set(result.rows.map((row) => String(row[result.locationKey!] ?? "")).filter(Boolean))].sort();
  }, [result.locationKey, result.rows]);

  const filteredRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    return result.rows.filter((row) => {
      if (result.locationKey && location !== ALL_LOCATIONS && String(row[result.locationKey]) !== location) return false;
      if (!term) return true;
      return Object.values(row).some((value) => String(value).toLowerCase().includes(term));
    });
  }, [location, result.locationKey, result.rows, search]);

  const pageCount = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const currentPage = Math.min(page, pageCount - 1);
  const pagedRows = filteredRows.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize,
  );

  function selectCategory(nextCategory: ReportCategory) {
    const firstReport = REPORT_DEFINITIONS.find((report) => report.category === nextCategory);
    setCategory(nextCategory);
    if (firstReport) setReportId(firstReport.id);
    setSearch("");
    setLocation(ALL_LOCATIONS);
  }

  function selectReport(nextReportId: string) {
    setReportId(nextReportId);
    setSearch("");
    setLocation(ALL_LOCATIONS);
  }

  function exportCsv() {
    const escapeCsv = (value: string | number) => {
      const text = String(value);
      return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
    };
    const header = result.columns.map((column) => escapeCsv(column.label)).join(",");
    const rows = filteredRows.map((row) => result.columns.map((column) => escapeCsv(row[column.key] ?? "")).join(","));
    const blob = new Blob([[header, ...rows].join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${definition.id}-2026-08-04.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
    toast.success(`${definition.name} exported to CSV.`);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Reports</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Generate operational inventory, purchasing, and management-analysis reports.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.print()}>
            <Printer className="size-4" />
            Print
          </Button>
          <Button onClick={exportCsv} disabled={filteredRows.length === 0}>
            <Download className="size-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <nav aria-label="Report categories" className="grid gap-2 sm:grid-cols-3 print:hidden">
        {REPORT_CATEGORIES.map((item) => {
          const Icon = categoryIcons[item.id];
          const active = category === item.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-current={active ? "page" : undefined}
              onClick={() => selectCategory(item.id)}
              className={cn(
                "flex items-start gap-3 rounded-xl border p-3 text-left transition-colors",
                active ? "border-primary bg-primary/5" : "bg-card hover:bg-muted/40",
              )}
            >
              <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-lg", active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                <Icon className="size-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium">{item.label}</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">{item.description}</span>
              </span>
            </button>
          );
        })}
      </nav>

      <div className="grid items-start gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
        <Card className="gap-2 print:hidden">
          <CardContent className="flex flex-col gap-1 px-2">
            <p className="px-2 pb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              {REPORT_CATEGORIES.find((item) => item.id === category)?.label}
            </p>
            {categoryReports.map((report) => (
              <button
                key={report.id}
                type="button"
                aria-pressed={report.id === definition.id}
                onClick={() => selectReport(report.id)}
                className={cn(
                  "rounded-lg px-3 py-2 text-left text-sm transition-colors",
                  report.id === definition.id ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                )}
              >
                {report.name}
              </button>
            ))}
          </CardContent>
        </Card>

        <div className="min-w-0 space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="hidden text-xs font-medium text-muted-foreground print:block">BIGSTOP INVENTORY · REPORT</p>
              <h2 className="text-xl font-semibold">{definition.name}</h2>
              <p className="mt-1 max-w-3xl text-sm text-muted-foreground">{definition.description}</p>
            </div>
            <p className="text-xs text-muted-foreground">As of Aug 4, 2026</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {result.metrics.map((metric) => (
              <MetricCard key={`${metric.label}-${metric.key ?? "rows"}`} metric={metric} rows={filteredRows} />
            ))}
          </div>

          <Card className="gap-3">
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-wrap items-end gap-3 print:hidden">
                <div className="relative min-w-64 flex-1">
                  <Label htmlFor="report-search" className="mb-1.5 block text-xs text-muted-foreground">
                    Search report
                  </Label>
                  <Search className="pointer-events-none absolute top-[34px] left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="report-search"
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search any report value…"
                    className="h-9 w-full rounded-lg border border-input bg-transparent pr-3 pl-8 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  />
                </div>

                {result.locationKey && locations.length > 0 && (
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs text-muted-foreground">Location</Label>
                    <Select value={location} onValueChange={(value) => value && setLocation(value)}>
                      <SelectTrigger className="min-w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={ALL_LOCATIONS}>All locations</SelectItem>
                        {locations.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {result.columns.map((column) => (
                        <TableHead key={column.key} className={column.align === "right" ? "text-right" : undefined}>
                          {column.label}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRows.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={result.columns.length} className="h-24 text-center text-muted-foreground">
                          No report records match the current filters.
                        </TableCell>
                      </TableRow>
                    ) : (
                      pagedRows.map((row, index) => (
                        <TableRow key={`${definition.id}-${index}`}>
                          {result.columns.map((column) => (
                            <TableCell
                              key={column.key}
                              className={cn(column.align === "right" && "text-right tabular-nums", column.key === result.columns[0]?.key && "font-medium")}
                            >
                              {formatCell(row[column.key], column.format)}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="print:hidden">
                <DataTablePagination
                  page={currentPage}
                  pageCount={pageCount}
                  pageSize={pageSize}
                  totalRows={filteredRows.length}
                  onPageChange={setPage}
                />
              </div>
              <p className="text-xs text-muted-foreground print:hidden">Generated from current module data</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ metric, rows }: { metric: ReportMetric; rows: ReportRow[] }) {
  const value = getMetricValue(metric, rows);
  return (
    <Card size="sm">
      <CardContent className="flex items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <FileSearch className="size-4" />
        </span>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">{metric.label}</p>
          <p className="text-lg font-semibold tabular-nums">{formatCell(value, metric.format)}</p>
          <p className="truncate text-xs text-muted-foreground">{metric.detail}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function getMetricValue(metric: ReportMetric, rows: ReportRow[]): number {
  if (metric.aggregation === "count") return rows.length;
  const values = rows.map((row) => getMetricRowValue(metric.key ?? "", row));
  if (metric.aggregation === "average") {
    return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
  }
  return values.reduce((sum, value) => sum + value, 0);
}

function getMetricRowValue(key: string, row: ReportRow): number {
  if (key === "changeIn") return Math.max(0, Number(row.change ?? 0));
  if (key === "agedValue") return Number(row.ageDays ?? 0) > 180 ? Number(row.value ?? 0) : 0;
  if (key === "expiredQuantity") return row.status === "Expired" ? Number(row.quantity ?? 0) : 0;
  if (key === "expiringQuantity") return row.status === "Expiring soon" ? Number(row.quantity ?? 0) : 0;
  return Number(row[key] ?? 0);
}

function formatCell(value: string | number | undefined, format: ReportFormat = "text"): string {
  if (value === undefined || value === "") return "—";
  if (format === "currency") return currencyFormatter.format(Number(value));
  if (format === "number") return numberFormatter.format(Number(value));
  if (format === "percent") return `${numberFormatter.format(Number(value))}%`;
  if (format === "signed") {
    const number = Number(value);
    return `${number > 0 ? "+" : ""}${numberFormatter.format(number)}`;
  }
  if (format === "date") return formatDate(String(value));
  return String(value);
}
