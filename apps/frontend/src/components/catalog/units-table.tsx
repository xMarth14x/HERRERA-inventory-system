import Link from "next/link";
import { Ruler } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge, type StatusColor } from "@/components/dashboard/status-badge";
import type { Unit, UnitDimension } from "@/lib/catalog-data";

const DIMENSION_COLOR: Record<UnitDimension, StatusColor> = {
  Count: "blue",
  Weight: "green",
  Volume: "violet",
};

export function UnitsTable({
  units,
  limit,
  viewAllHref,
}: {
  units: Unit[];
  limit?: number;
  viewAllHref?: string;
}) {
  const shown = limit ? units.slice(0, limit) : units;

  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
            <Ruler className="size-4" />
          </span>
          Units of Measurement
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Unit</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Example Use</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shown.map((unit) => (
              <TableRow key={unit.code}>
                <TableCell className="font-medium">{unit.name}</TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">{unit.code}</TableCell>
                <TableCell>
                  <StatusBadge color={DIMENSION_COLOR[unit.dimension]} label={unit.dimension} />
                </TableCell>
                <TableCell className="text-muted-foreground">{unit.description}</TableCell>
                <TableCell className="text-muted-foreground">{unit.exampleUse}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      {viewAllHref ? (
        <CardFooter className="justify-center">
          <Link href={viewAllHref} className="text-sm font-semibold text-amber-700 hover:underline">
            View All Units
          </Link>
        </CardFooter>
      ) : null}
    </Card>
  );
}
