"use client";

import { useMemo, useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { convertUnits, UNITS, type UnitDimension } from "@/lib/catalog-data";

const DIMENSIONS: UnitDimension[] = ["Count", "Weight", "Volume"];

function formatResult(value: number): string {
  if (!Number.isFinite(value)) return "0";
  return value.toLocaleString("en-US", { maximumFractionDigits: 4 });
}

function UnitSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Select value={value} onValueChange={(v) => v && onChange(v)}>
      <SelectTrigger className="min-w-36">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {DIMENSIONS.map((dimension) => (
          <SelectGroup key={dimension}>
            <SelectLabel>{dimension}</SelectLabel>
            {UNITS.filter((unit) => unit.dimension === dimension).map((unit) => (
              <SelectItem key={unit.code} value={unit.code}>
                {unit.name}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}

export function UnitConverter() {
  const [quantity, setQuantity] = useState("1");
  const [fromUnit, setFromUnit] = useState("box");
  const [toUnit, setToUnit] = useState("pc");

  const fromMeta = UNITS.find((u) => u.code === fromUnit);
  const toMeta = UNITS.find((u) => u.code === toUnit);
  const sameDimension = fromMeta?.dimension === toMeta?.dimension;

  const result = useMemo(() => {
    const qty = Number(quantity);
    if (Number.isNaN(qty)) return null;
    return convertUnits(qty, fromUnit, toUnit);
  }, [quantity, fromUnit, toUnit]);

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
            <UnitSelect value={fromUnit} onChange={setFromUnit} />
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
            <UnitSelect value={toUnit} onChange={setToUnit} />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">Result</Label>
            <div className="flex h-8 items-center rounded-lg border bg-muted/30 px-2.5 text-sm font-semibold tabular-nums">
              {result === null ? "—" : formatResult(result)}
            </div>
          </div>
        </div>

        {sameDimension ? (
          <p className="text-xs text-muted-foreground">
            {quantity || 0} {fromMeta?.name}
            {Number(quantity) === 1 ? "" : "s"} = {result === null ? "—" : formatResult(result)} {toMeta?.name}
            {result === 1 ? "" : "s"}
          </p>
        ) : (
          <p className="rounded-lg border border-dashed p-2.5 text-xs text-muted-foreground">
            {fromMeta?.name} ({fromMeta?.dimension}) and {toMeta?.name} ({toMeta?.dimension}) are different kinds of
            measurement — pick two units of the same type to convert between them.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
