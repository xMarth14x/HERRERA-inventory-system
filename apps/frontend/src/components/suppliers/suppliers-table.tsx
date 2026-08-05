"use client";

import { useMemo } from "react";
import { type ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { formatStatusLabel } from "@/lib/status-color";
import type { Supplier } from "@/lib/supplier-data";

export function SuppliersTable({
  data,
  search,
  onSearchChange,
  onSelectSupplier,
}: {
  data: Supplier[];
  search: string;
  onSearchChange: (value: string) => void;
  onSelectSupplier: (supplier: Supplier) => void;
}) {
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return data;
    return data.filter(
      (supplier) =>
        supplier.name.toLowerCase().includes(term) ||
        supplier.code.toLowerCase().includes(term) ||
        supplier.contact.name.toLowerCase().includes(term) ||
        supplier.suppliedProducts.some((p) => p.toLowerCase().includes(term)),
    );
  }, [data, search]);

  const columns = useMemo<ColumnDef<Supplier>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Supplier",
        cell: ({ row }) => (
          <div className="min-w-0">
            <p className="truncate font-medium">{row.original.name}</p>
            <p className="text-xs text-muted-foreground">{row.original.code}</p>
          </div>
        ),
      },
      {
        id: "contact",
        header: "Contact",
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span>{row.original.contact.name}</span>
            <span className="text-xs text-muted-foreground">{row.original.contact.email}</span>
          </div>
        ),
      },
      {
        accessorKey: "paymentTerms",
        header: "Payment Terms",
      },
      {
        id: "leadTime",
        header: "Lead Time",
        cell: ({ row }) => <span className="tabular-nums">{row.original.deliveryLeadTimeDays}d</span>,
      },
      {
        id: "bankStatus",
        header: "Bank Status",
        cell: ({ row }) => {
          const status = row.original.bankDetails.status;
          const color = status === "Verified" ? "green" : status === "Pending" ? "amber" : "red";
          return <StatusBadge color={color} label={formatStatusLabel(status)} />;
        },
      },
      {
        id: "status",
        header: "Status",
        cell: ({ row }) => (
          <StatusBadge color={row.original.status === "Active" ? "green" : "gray"} label={formatStatusLabel(row.original.status)} />
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
        <div className="relative max-w-sm">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name, code, contact, or product..."
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
                  No suppliers match your search.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="cursor-pointer"
                  onClick={() => onSelectSupplier(row.original)}
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
