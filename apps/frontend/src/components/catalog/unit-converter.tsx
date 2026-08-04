"use client";

import { useMemo, useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { convertUnits, UNITS } from "@/lib/catalog-data";

function formatResult(value: number): string {
  if (!Number.isFinite(value)) return "0";
  return value.toLocaleString("en-US", { maximumFractionDigits: 4 });
}

export function UnitConverter() {
  const [quantity, setQuantity] = useState("1");
  const [fromUnit, setFromUnit] = useState("box");
  const [toUnit, setToUnit] = useState("pc");

  const result = useMemo(() => {
    const qty = Number(quantity);
    if (Number.isNaN(qty)) return null;
    return convertUnits(qty, fromUnit, toUnit);
  }, [quantity, fromUnit, toUnit]);

  const fromLabel = UNITS.find((u) => u.code === fromUnit)?.name ?? fromUnit;
  const toLabel = UNITS.find((u) => u.code === toUnit)?.name ?? toUnit;

  function swap() {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  }

  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Unit Converter</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-1 items-end gap-3 sm:grid-cols-[1fr_auto_auto_auto_1fr]">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="unit-qty" className="text-xs text-muted-foreground">
              Quantity
            </Label>
            <Input
              id="unit-qty"
              type="number"
              min={0}
              step="any"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">From</Label>
            <Select value={fromUnit} onValueChange={(v) => v && setFromUnit(v)}>
              <SelectTrigger className="min-w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {UNITS.map((unit) => (
                  <SelectItem key={unit.code} value={unit.code}>
                    {unit.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon"
            className="mb-0.5 self-end"
            onClick={swap}
            aria-label="Swap units"
          >
            <ArrowLeftRight className="size-4" />
          </Button>

          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">To</Label>
            <Select value={toUnit} onValueChange={(v) => v && setToUnit(v)}>
              <SelectTrigger className="min-w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {UNITS.map((unit) => (
                  <SelectItem key={unit.code} value={unit.code}>
                    {unit.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">Result</Label>
            <div className="flex h-8 items-center rounded-lg border bg-muted/30 px-2.5 text-sm font-semibold tabular-nums">
              {result === null ? "—" : formatResult(result)}
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          {quantity || 0} {fromLabel}
          {Number(quantity) === 1 ? "" : "s"} = {result === null ? "—" : formatResult(result)} {toLabel}
          {result === 1 ? "" : "s"}
        </p>
      </CardContent>
    </Card>
  );
}
