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
import { formatCurrency, formatNumber } from "@/lib/format";
import { PURCHASE_ORDER_STATUSES, type PurchaseOrderLineRow } from "@/lib/purchase-order-data";

export const STATUS_ALL = "__all__";

export function PurchaseOrdersTable({
  data,
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onSelectRow,
}: {
  data: PurchaseOrderLineRow[];
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  onSelectRow: (poNumber: string) => void;
}) {
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return data.filter((row) => {
      if (statusFilter !== STATUS_ALL && row.status !== statusFilter) return false;
      if (!term) return true;
      return (
        row.productName.toLowerCase().includes(term) ||
        row.sku.toLowerCase().includes(term) ||
        row.poNumber.toLowerCase().includes(term) ||
        row.supplier.toLowerCase().includes(term)
      );
    });
  }, [data, search, statusFilter]);

  const columns = useMemo<ColumnDef<PurchaseOrderLineRow>[]>(
    () => [
      {
        accessorKey: "poNumber",
        header: "PO #",
        cell: ({ row }) => <span className="font-medium">{row.original.poNumber}</span>,
      },
      {
        id: "product",
        header: "Product",
        cell: ({ row }) => (
          <div className="min-w-0">
            <p className="truncate">{row.original.productName}</p>
            <p className="text-xs text-muted-foreground">{row.original.sku}</p>
          </div>
        ),
      },
      {
        accessorKey: "supplier",
        header: "Supplier",
      },
      {
        accessorKey: "orderedQuantity",
        header: "Ordered",
        cell: ({ row }) => <span className="tabular-nums">{formatNumber(row.original.orderedQuantity)}</span>,
      },
      {
        accessorKey: "receivedQuantity",
        header: "Received",
        cell: ({ row }) => <span className="tabular-nums">{formatNumber(row.original.receivedQuantity)}</span>,
      },
      {
        accessorKey: "remainingQuantity",
        header: "Remaining",
        cell: ({ row }) => <span className="tabular-nums">{formatNumber(row.original.remainingQuantity)}</span>,
      },
      {
        accessorKey: "unitPrice",
        header: "Unit Price",
        cell: ({ row }) => <span className="tabular-nums">{formatCurrency(row.original.unitPrice)}</span>,
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
              placeholder="Search by PO #, product, SKU, or supplier..."
              className="h-9 w-full rounded-lg border border-input bg-transparent pl-8 pr-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">Status</Label>
            <Select value={statusFilter} onValueChange={(v) => v && onStatusFilterChange(v)}>
              <SelectTrigger className="min-w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={STATUS_ALL}>All statuses</SelectItem>
                {PURCHASE_ORDER_STATUSES.map((status) => (
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
                  No purchase order lines match your filters.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={`${row.original.poNumber}-${row.original.sku}`}
                  className="cursor-pointer"
                  onClick={() => onSelectRow(row.original.poNumber)}
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
