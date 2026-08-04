import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatNumber } from "@/lib/format";
import type { Unit } from "@/lib/catalog-data";

export function UnitsTable({ units }: { units: Unit[] }) {
  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Units of Measurement</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Unit</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Definition</TableHead>
              <TableHead className="text-right">In Pieces</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {units.map((unit) => (
              <TableRow key={unit.code}>
                <TableCell className="font-medium">{unit.name}</TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">{unit.code}</TableCell>
                <TableCell className="text-muted-foreground">{unit.definition}</TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatNumber(unit.conversionToBase)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
