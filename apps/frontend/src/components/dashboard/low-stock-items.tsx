"use client";

import Link from "next/link";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { LowStockItem } from "@/lib/dashboard-data";
import { formatNumber } from "@/lib/format";

export function LowStockItems({ data }: { data: LowStockItem[] }) {
  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle>Top Low Stock Items</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Current stock</TableHead>
              <TableHead className="text-right">Reorder level</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.sku}>
                <TableCell className="font-medium">{item.product}</TableCell>
                <TableCell className="font-mono text-xs">{item.sku}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell className="text-right tabular-nums">{formatNumber(item.currentStock)}</TableCell>
                <TableCell className="text-right tabular-nums">{formatNumber(item.reorderLevel)}</TableCell>
                <TableCell>
                  <Badge variant={item.status === "Out of stock" ? "destructive" : "secondary"}>{item.status}</Badge>
                </TableCell>
                <TableCell>
                  <Button
                    size="xs"
                    variant={item.status === "Out of stock" ? "destructive" : "secondary"}
                    onClick={() => toast.info(`Reorder request for ${item.sku} is not connected to the backend yet.`)}
                  >
                    Reorder
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-center">
        <Link href="/alerts" className="text-sm font-semibold text-[#0a43b8] hover:underline">View all low stock items</Link>
      </CardFooter>
    </Card>
  );
}
