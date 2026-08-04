"use client";

import { useMemo } from "react";
import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { statusColorForCode } from "@/lib/status-color";
import { formatCurrency, formatDate, formatNumber } from "@/lib/format";
import { PURCHASE_REQUEST_STATUSES, type RequestedProductRow } from "@/lib/purchase-request-data";

export const STATUS_ALL = "__all__";

export function PurchaseRequestsTable({
  data,
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onSelectRow,
}: {
  data: RequestedProductRow[];
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  onSelectRow: (requestNumber: string) => void;
}) {
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return data.filter((row) => {
      if (statusFilter !== STATUS_ALL && row.status !== statusFilter) return false;
      if (!term) return true;
      return (
        row.productName.toLowerCase().includes(term) ||
        row.sku.toLowerCase().includes(term) ||
        row.requestNumber.toLowerCase().includes(term) ||
        row.requestingDepartment.toLowerCase().includes(term)
      );
    });
  }, [data, search, statusFilter]);

  const columns = useMemo<ColumnDef<RequestedProductRow>[]>(
    () => [
      {
        accessorKey: "productName",
        header: "Product",
        cell: ({ row }) => (
          <div className="min-w-0">
            <p className="truncate font-medium">{row.original.productName}</p>
            <p className="text-xs text-muted-foreground">{row.original.sku}</p>
          </div>
        ),
      },
      {
        accessorKey: "requestNumber",
        header: "Request #",
        cell: ({ row }) => <span className="font-mono text-xs">{row.original.requestNumber}</span>,
      },
      {
        accessorKey: "requestingDepartment",
        header: "Department",
      },
      {
        accessorKey: "requiredDate",
        header: "Required Date",
        cell: ({ row }) => formatDate(row.original.requiredDate),
      },
      {
        accessorKey: "quantity",
        header: "Qty",
        cell: ({ row }) => <span className="tabular-nums">{formatNumber(row.original.quantity)}</span>,
      },
      {
        accessorKey: "estimatedCost",
        header: "Est. Cost",
        cell: ({ row }) => (
          <span className="tabular-nums">{formatCurrency(row.original.estimatedCost)}</span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <StatusBadge color={statusColorForCode(row.original.status)} label={row.original.status} />
        ),
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
              placeholder="Search by product, SKU, request #, or department..."
              className="h-9 w-full rounded-lg border border-input bg-transparent pl-8 pr-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">Status</Label>
            <Select value={statusFilter} onValueChange={(v) => v && onStatusFilterChange(v)}>
              <SelectTrigger className="min-w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={STATUS_ALL}>All statuses</SelectItem>
                {PURCHASE_REQUEST_STATUSES.map((status) => (
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
                  No requested products match your filters.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="cursor-pointer"
                  onClick={() => onSelectRow(row.original.requestNumber)}
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
