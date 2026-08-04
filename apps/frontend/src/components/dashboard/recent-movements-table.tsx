"use client";

import { useMemo } from "react";
import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatNumber, formatRelativeTime } from "@/lib/format";
import type { StockMovement } from "@/lib/dashboard-data";
import { MovementTypeBadge } from "./status-badge";

export function RecentMovementsTable({ data }: { data: StockMovement[] }) {
  const columns = useMemo<ColumnDef<StockMovement>[]>(
    () => [
      {
        accessorKey: "number",
        header: "Movement #",
        cell: ({ row }) => <span className="font-medium">{row.original.number}</span>,
      },
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => <MovementTypeBadge type={row.original.type} />,
      },
      {
        accessorKey: "product",
        header: "Product",
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span>{row.original.product}</span>
            <span className="text-xs text-muted-foreground">{row.original.sku}</span>
          </div>
        ),
      },
      {
        accessorKey: "location",
        header: "Location",
      },
      {
        accessorKey: "quantityChange",
        header: "Qty",
        cell: ({ row }) => {
          const qty = row.original.quantityChange;
          const positive = qty > 0;
          return (
            <span
              className={`font-sans font-semibold tabular-nums ${positive ? "text-emerald-600" : "text-red-600"}`}
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
        accessorKey: "createdAt",
        header: "When",
        cell: ({ row }) => (
          <span className="text-muted-foreground">{formatRelativeTime(row.original.createdAt)}</span>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Recent Movements</CardTitle>
      </CardHeader>
      <CardContent>
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
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
