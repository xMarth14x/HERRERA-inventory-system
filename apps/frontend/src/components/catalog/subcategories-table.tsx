import { Layers } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatNumber } from "@/lib/format";
import type { FlatSubcategory } from "@/lib/catalog-data";

export function SubcategoriesTable({ data }: { data: FlatSubcategory[] }) {
  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-red-50 text-[#ed1b2f]">
            <Layers className="size-4" />
          </span>
          Subcategories
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subcategory</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Products</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((sub) => (
              <TableRow key={`${sub.category}-${sub.name}`}>
                <TableCell className="font-medium">{sub.name}</TableCell>
                <TableCell className="text-muted-foreground">{sub.category}</TableCell>
                <TableCell className="text-right tabular-nums">{formatNumber(sub.productCount)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
