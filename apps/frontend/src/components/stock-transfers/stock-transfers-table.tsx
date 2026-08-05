"use client";

import { useMemo } from "react";
import { type ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { Search, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { formatStatusLabel, statusColorForCode } from "@/lib/status-color";
import { formatNumber } from "@/lib/format";
import { TRANSFER_STATUSES, type StockTransfer } from "@/lib/stock-transfer-data";
import { DiscrepancyBadge } from "./discrepancy-badge";

export const STATUS_ALL = "__all__";

export function StockTransfersTable({
  data,
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onSelectRow,
}: {
  data: StockTransfer[];
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  onSelectRow: (transferNumber: string) => void;
}) {
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return data.filter((row) => {
      if (statusFilter !== STATUS_ALL && row.status !== statusFilter) return false;
      if (!term) return true;
      return (
        row.transferNumber.toLowerCase().includes(term) ||
        row.sourceLocation.toLowerCase().includes(term) ||
        row.destinationLocation.toLowerCase().includes(term) ||
        row.items.some((item) => item.productName.toLowerCase().includes(term) || item.sku.toLowerCase().includes(term))
      );
    });
  }, [data, search, statusFilter]);

  const columns = useMemo<ColumnDef<StockTransfer>[]>(
    () => [
      {
        accessorKey: "transferNumber",
        header: "Transfer #",
        cell: ({ row }) => <span className="font-medium">{row.original.transferNumber}</span>,
      },
      {
        id: "product",
        header: "Product",
        cell: ({ row }) => (
          <div className="min-w-0">
            <p className="truncate">{row.original.items.map((i) => i.productName).join(", ")}</p>
          </div>
        ),
      },
      {
        id: "route",
        header: "Source → Destination",
        cell: ({ row }) => (
          <div className="flex items-center gap-1.5 text-sm">
            <span>{row.original.sourceLocation}</span>
            <ArrowRight className="size-3.5 shrink-0 text-muted-foreground" />
            <span>{row.original.destinationLocation}</span>
          </div>
        ),
      },
      {
        id: "dispatched",
        header: "Dispatched",
        cell: ({ row }) => (
          <span className="tabular-nums">
            {formatNumber(row.original.items.reduce((sum, i) => sum + i.dispatchedQuantity, 0))}
          </span>
        ),
      },
      {
        id: "received",
        header: "Received",
        cell: ({ row }) => (
          <span className="tabular-nums">
            {formatNumber(row.original.items.reduce((sum, i) => sum + i.receivedQuantity, 0))}
          </span>
        ),
      },
      {
        id: "discrepancy",
        header: "Discrepancy",
        cell: ({ row }) => {
          const discrepancy = row.original.items.find((i) => i.discrepancyType !== null);
          return discrepancy?.discrepancyType ? (
            <DiscrepancyBadge type={discrepancy.discrepancyType} />
          ) : (
            <span className="text-xs text-muted-foreground">None</span>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <StatusBadge color={statusColorForCode(row.original.status)} label={formatStatusLabel(row.original.status)} />
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
              placeholder="Search by transfer #, location, product, or SKU..."
              className="h-9 w-full rounded-lg border border-input bg-transparent pl-8 pr-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">Status</Label>
            <Select value={statusFilter} onValueChange={(v) => v && onStatusFilterChange(v)}>
              <SelectTrigger className="min-w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={STATUS_ALL}>All statuses</SelectItem>
                {TRANSFER_STATUSES.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
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
                  No transfers match your filters.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.original.transferNumber}
                  className="cursor-pointer"
                  onClick={() => onSelectRow(row.original.transferNumber)}
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
