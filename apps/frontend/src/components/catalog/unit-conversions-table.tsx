import Link from "next/link";
import { ArrowLeftRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UNIT_CONVERSION_EXAMPLES } from "@/lib/catalog-data";

export function UnitConversionsTable({ viewAllHref }: { viewAllHref?: string }) {
  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0a43b8]">
            <ArrowLeftRight className="size-4" />
          </span>
          Unit Conversions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Conversion</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {UNIT_CONVERSION_EXAMPLES.map((row) => (
              <TableRow key={`${row.from}-${row.to}`}>
                <TableCell className="font-medium">{row.from}</TableCell>
                <TableCell>{row.to}</TableCell>
                <TableCell className="tabular-nums">{row.conversion}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      {viewAllHref ? (
        <CardFooter className="justify-center">
          <Link href={viewAllHref} className="text-sm font-semibold text-[#0a43b8] hover:underline">
            View All Conversions
          </Link>
        </CardFooter>
      ) : null}
    </Card>
  );
}
