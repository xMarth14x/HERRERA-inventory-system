"use client";

import { useMemo } from "react";
import { type ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { StatusBadge } from "@/components/dashboard/status-badge";
import type { Product } from "@/lib/product-data";
import { ProductAvatar } from "./product-avatar";

export function ProductsTable({
  data,
  search,
  onSearchChange,
  onSelectProduct,
}: {
  data: Product[];
  search: string;
  onSearchChange: (value: string) => void;
  onSelectProduct: (product: Product) => void;
}) {
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return data;
    return data.filter((product) => {
      if (product.name.toLowerCase().includes(term)) return true;
      if (product.productCode.toLowerCase().includes(term)) return true;
      if (product.brand.toLowerCase().includes(term)) return true;
      return product.variants.some(
        (variant) =>
          variant.sku.toLowerCase().includes(term) || variant.barcode.includes(term),
      );
    });
  }, [data, search]);

  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Product",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <ProductAvatar name={row.original.name} />
            <div className="min-w-0">
              <p className="truncate font-medium">{row.original.name}</p>
              <p className="text-xs text-muted-foreground">{row.original.productCode}</p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span>{row.original.category}</span>
            <span className="text-xs text-muted-foreground">{row.original.brand}</span>
          </div>
        ),
      },
      {
        accessorKey: "baseUnit",
        header: "Base Unit",
      },
      {
        id: "variants",
        header: "Variants",
        cell: ({ row }) => (
          <span className="tabular-nums">{row.original.variants.length}</span>
        ),
      },
      {
        id: "tracking",
        header: "Tracking",
        cell: ({ row }) => {
          const { batchTracking, expiryTracking } = row.original;
          if (!batchTracking && !expiryTracking) {
            return <span className="text-xs text-muted-foreground">None</span>;
          }
          return (
            <div className="flex flex-wrap gap-1">
              {batchTracking && <StatusBadge color="blue" label="Batch" />}
              {expiryTracking && <StatusBadge color="amber" label="Expiry" />}
            </div>
          );
        },
      },
      {
        id: "status",
        header: "Status",
        cell: ({ row }) => (
          <div className="flex flex-col gap-1">
            <StatusBadge
              color={row.original.isActive ? "green" : "gray"}
              label={row.original.isActive ? "Active" : "Inactive"}
            />
            <span className="text-xs text-muted-foreground">
              {row.original.isTaxable ? "Taxable" : "Non-taxable"}
            </span>
          </div>
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
            placeholder="Search by name, code, SKU, or barcode..."
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
                  No products match your search.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="cursor-pointer"
                  onClick={() => onSelectProduct(row.original)}
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
