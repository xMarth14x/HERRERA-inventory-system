"use client";

import { useMemo } from "react";
import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { formatDate, formatNumber } from "@/lib/format";
import { STOCK_ISSUE_CATEGORIES, type StockIssue } from "@/lib/stock-issue-data";
import { IssueCategoryBadge } from "./issue-category-badge";

export const CATEGORY_ALL = "__all__";

export function StockIssuesTable({
  data,
  search,
  onSearchChange,
  categoryFilter,
  onCategoryFilterChange,
  onSelectRow,
}: {
  data: StockIssue[];
  search: string;
  onSearchChange: (value: string) => void;
  categoryFilter: string;
  onCategoryFilterChange: (value: string) => void;
  onSelectRow: (issueNumber: string) => void;
}) {
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return data.filter((row) => {
      if (categoryFilter !== CATEGORY_ALL && row.category !== categoryFilter) return false;
      if (!term) return true;
      return (
        row.issueNumber.toLowerCase().includes(term) ||
        row.productName.toLowerCase().includes(term) ||
        row.sku.toLowerCase().includes(term) ||
        row.departmentOrRecipient.toLowerCase().includes(term)
      );
    });
  }, [data, search, categoryFilter]);

  const columns = useMemo<ColumnDef<StockIssue>[]>(
    () => [
      {
        accessorKey: "issueNumber",
        header: "Issue #",
        cell: ({ row }) => <span className="font-medium">{row.original.issueNumber}</span>,
      },
      {
        id: "product",
        header: "Product",
        cell: ({ row }) => (
          <div className="min-w-0">
            <p className="truncate">{row.original.productName}</p>
            <p className="text-xs text-muted-foreground">
              {row.original.sku} · {row.original.location}
            </p>
          </div>
        ),
      },
      {
        accessorKey: "quantity",
        header: "Qty",
        cell: ({ row }) => <span className="tabular-nums">{formatNumber(row.original.quantity)}</span>,
      },
      {
        accessorKey: "departmentOrRecipient",
        header: "Department / Recipient",
      },
      {
        accessorKey: "issuedAt",
        header: "Date",
        cell: ({ row }) => formatDate(row.original.issuedAt),
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => <IssueCategoryBadge category={row.original.category} />,
      },
    ],
    [],
  );

  const table = useReactTable({
    data: filtered,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card className="gap-3">
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-wrap items-end gap-3">
          <div className="relative max-w-sm flex-1">
            <Label className="mb-1.5 block text-xs text-muted-foreground">Search</Label>
            <Search className="pointer-events-none absolute left-2.5 top-[34px] size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by issue #, product, SKU, or department..."
              className="h-9 w-full rounded-lg border border-input bg-transparent pl-8 pr-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">Category</Label>
            <Select value={categoryFilter} onValueChange={(v) => v && onCategoryFilterChange(v)}>
              <SelectTrigger className="min-w-56">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={CATEGORY_ALL}>All categories</SelectItem>
                {STOCK_ISSUE_CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  No stock issues match your filters.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.original.issueNumber}
                  className="cursor-pointer"
                  onClick={() => onSelectRow(row.original.issueNumber)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
