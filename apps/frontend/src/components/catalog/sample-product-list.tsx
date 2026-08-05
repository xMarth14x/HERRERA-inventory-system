import Link from "next/link";
import { Boxes } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { ProductAvatar } from "@/components/products/product-avatar";
import { formatNumber } from "@/lib/format";
import type { Product } from "@/lib/product-data";

export function SampleProductList({ products, limit = 8 }: { products: Product[]; limit?: number }) {
  const shown = products.slice(0, limit);

  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0a43b8]">
            <Boxes className="size-4" />
          </span>
          Sample Product List
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Variants</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shown.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <ProductAvatar name={product.name} />
                    <div className="min-w-0">
                      <p className="truncate font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.productCode}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{product.category}</TableCell>
                <TableCell className="text-muted-foreground">{product.brand}</TableCell>
                <TableCell className="text-muted-foreground">{product.baseUnit}</TableCell>
                <TableCell>
                  <StatusBadge color={product.isActive ? "green" : "gray"} label={product.isActive ? "Active" : "Inactive"} />
                </TableCell>
                <TableCell className="text-right tabular-nums">{formatNumber(product.variants.length)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-between text-xs text-muted-foreground">
        <span>
          Showing {shown.length} of {products.length} products
        </span>
        <Link href="/products" className="text-sm font-semibold text-[#0a43b8] hover:underline">
          View All Products
        </Link>
      </CardFooter>
    </Card>
  );
}
