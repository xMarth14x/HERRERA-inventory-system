"use client";

import { useMemo } from "react";
import { type ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ALL_MOVEMENT_TYPES, MovementTypeBadge } from "@/components/dashboard/status-badge";
import { formatNumber, formatRelativeTime } from "@/lib/format";
import type { StockMovementEntry } from "@/lib/stock-movement-data";

export const TYPE_ALL = "__all__";

export function StockMovementsTable({
  data,
  search,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
  onSelectRow,
}: {
  data: StockMovementEntry[];
  search: string;
  onSearchChange: (value: string) => void;
  typeFilter: string;
  onTypeFilterChange: (value: string) => void;
  onSelectRow: (movementNumber: string) => void;
}) {
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return data.filter((row) => {
      if (typeFilter !== TYPE_ALL && row.type !== typeFilter) return false;
      if (!term) return true;
      return (
        row.movementNumber.toLowerCase().includes(term) ||
        row.productName.toLowerCase().includes(term) ||
        row.sku.toLowerCase().includes(term) ||
        row.location.toLowerCase().includes(term) ||
        row.performedBy.toLowerCase().includes(term)
      );
    });
  }, [data, search, typeFilter]);

  const columns = useMemo<ColumnDef<StockMovementEntry>[]>(
    () => [
      {
        accessorKey: "movementNumber",
        header: "Movement #",
        cell: ({ row }) => <span className="font-medium">{row.original.movementNumber}</span>,
      },
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => <MovementTypeBadge type={row.original.type} />,
      },
      {
        id: "product",
        header: "Product & Location",
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
        accessorKey: "quantityChange",
        header: "Qty Change",
        cell: ({ row }) => {
          const qty = row.original.quantityChange;
          const positive = qty > 0;
          const neutral = qty === 0;
          return (
            <span
              className={`font-sans font-semibold tabular-nums ${
                neutral ? "text-muted-foreground" : positive ? "text-emerald-600" : "text-red-600"
              }`}
            >
              {positive ? "+" : ""}
              {formatNumber(qty)}
            </span>
          );
        },
      },
      {
        accessorKey: "performedBy",
        header: "Performed By",
      },
      {
        accessorKey: "occurredAt",
        header: "When",
        cell: ({ row }) => (
          <span className="text-muted-foreground">{formatRelativeTime(row.original.occurredAt)}</span>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: filtered,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
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
              placeholder="Search by movement #, product, SKU, location, or user..."
              className="h-9 w-full rounded-lg border border-input bg-transparent pl-8 pr-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">Type</Label>
            <Select value={typeFilter} onValueChange={(v) => v && onTypeFilterChange(v)}>
              <SelectTrigger className="min-w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={TYPE_ALL}>All types</SelectItem>
                {ALL_MOVEMENT_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
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
                  No movements match your filters.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.original.movementNumber}
                  className="cursor-pointer"
                  onClick={() => onSelectRow(row.original.movementNumber)}
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

        <DataTablePagination
          page={table.getState().pagination.pageIndex}
          pageCount={table.getPageCount()}
          pageSize={table.getState().pagination.pageSize}
          totalRows={filtered.length}
          onPageChange={(page) => table.setPageIndex(page)}
        />
      </CardContent>
    </Card>
  );
}
