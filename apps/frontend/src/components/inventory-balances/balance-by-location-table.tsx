import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatNumber } from "@/lib/format";
import { LOCATIONS, availableQuantity } from "@/lib/location-data";

export function BalanceByLocationTable() {
  const totals = LOCATIONS.reduce(
    (acc, l) => ({
      onHand: acc.onHand + l.onHand,
      reserved: acc.reserved + l.reserved,
      available: acc.available + availableQuantity(l),
      inTransit: acc.inTransit + l.inTransit,
      damaged: acc.damaged + l.damaged,
      quarantined: acc.quarantined + l.quarantined,
    }),
    { onHand: 0, reserved: 0, available: 0, inTransit: 0, damaged: 0, quarantined: 0 },
  );

  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Balances by Location</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">On Hand</TableHead>
              <TableHead className="text-right">Reserved</TableHead>
              <TableHead className="text-right">Available</TableHead>
              <TableHead className="text-right">In Transit</TableHead>
              <TableHead className="text-right">Damaged</TableHead>
              <TableHead className="text-right">Quarantined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {LOCATIONS.map((l) => (
              <TableRow key={l.location}>
                <TableCell className="font-medium">{l.location}</TableCell>
                <TableCell className="text-right tabular-nums">{formatNumber(l.onHand)}</TableCell>
                <TableCell className="text-right tabular-nums">{formatNumber(l.reserved)}</TableCell>
                <TableCell className="text-right tabular-nums font-medium text-emerald-600">
                  {formatNumber(availableQuantity(l))}
                </TableCell>
                <TableCell className="text-right tabular-nums">{formatNumber(l.inTransit)}</TableCell>
                <TableCell className="text-right tabular-nums">{formatNumber(l.damaged)}</TableCell>
                <TableCell className="text-right tabular-nums">{formatNumber(l.quarantined)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell className="text-right tabular-nums">{formatNumber(totals.onHand)}</TableCell>
              <TableCell className="text-right tabular-nums">{formatNumber(totals.reserved)}</TableCell>
              <TableCell className="text-right tabular-nums text-emerald-600">
                {formatNumber(totals.available)}
              </TableCell>
              <TableCell className="text-right tabular-nums">{formatNumber(totals.inTransit)}</TableCell>
              <TableCell className="text-right tabular-nums">{formatNumber(totals.damaged)}</TableCell>
              <TableCell className="text-right tabular-nums">{formatNumber(totals.quarantined)}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}
