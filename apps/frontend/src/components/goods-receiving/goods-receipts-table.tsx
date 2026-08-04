"use client";

import { useMemo } from "react";
import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { statusColorForCode } from "@/lib/status-color";
import { formatDate, formatNumber } from "@/lib/format";
import type { GoodsReceiptLineRow } from "@/lib/goods-receipt-data";

export function GoodsReceiptsTable({
  data,
  search,
  onSearchChange,
  onSelectRow,
}: {
  data: GoodsReceiptLineRow[];
  search: string;
  onSearchChange: (value: string) => void;
  onSelectRow: (receiptNumber: string) => void;
}) {
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return data;
    return data.filter(
      (row) =>
        row.receiptNumber.toLowerCase().includes(term) ||
        row.poNumber.toLowerCase().includes(term) ||
        row.productName.toLowerCase().includes(term) ||
        row.sku.toLowerCase().includes(term) ||
        row.supplier.toLowerCase().includes(term),
    );
  }, [data, search]);

  const columns = useMemo<ColumnDef<GoodsReceiptLineRow>[]>(
    () => [
      {
        accessorKey: "receiptNumber",
        header: "Receipt #",
        cell: ({ row }) => <span className="font-medium">{row.original.receiptNumber}</span>,
      },
      {
        accessorKey: "poNumber",
        header: "PO #",
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
        accessorKey: "currentReceivedQuantity",
        header: "Received",
        cell: ({ row }) => (
          <span className="tabular-nums">{formatNumber(row.original.currentReceivedQuantity)}</span>
        ),
      },
      {
        accessorKey: "remainingQuantity",
        header: "Remaining",
        cell: ({ row }) => <span className="tabular-nums">{formatNumber(row.original.remainingQuantity)}</span>,
      },
      {
        accessorKey: "deliveryDate",
        header: "Delivery Date",
        cell: ({ row }) => formatDate(row.original.deliveryDate),
      },
      {
        accessorKey: "poStatus",
        header: "PO Status",
        cell: ({ row }) => (
          <StatusBadge color={statusColorForCode(row.original.poStatus)} label={row.original.poStatus} />
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
        <div className="relative max-w-sm">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by receipt #, PO #, product, SKU, or supplier..."
            className="h-9 w-full rounded-lg border border-input bg-transparent pl-8 pr-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />
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
                  No goods receipts match your search.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={`${row.original.receiptNumber}-${row.original.sku}`}
                  className="cursor-pointer"
                  onClick={() => onSelectRow(row.original.receiptNumber)}
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
