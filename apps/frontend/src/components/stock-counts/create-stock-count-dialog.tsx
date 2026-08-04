"use client";

import { useState } from "react";
import { Check, EyeOff, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  STOCK_COUNT_COUNTERS,
  STOCK_COUNT_LOCATIONS,
  STOCK_COUNT_TYPES,
  type StockCountType,
} from "@/lib/stock-count-data";
import { cn } from "@/lib/utils";

export interface NewStockCountValues {
  type: StockCountType;
  location: string;
  scope: string;
  blind: boolean;
  counters: string[];
}

export function CreateStockCountDialog({
  open,
  onOpenChange,
  onCreate,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (values: NewStockCountValues) => void;
}) {
  const [type, setType] = useState<StockCountType>("Full warehouse count");
  const [location, setLocation] = useState(STOCK_COUNT_LOCATIONS[0]);
  const [scope, setScope] = useState("All products and storage zones");
  const [blind, setBlind] = useState(false);
  const [counters, setCounters] = useState<string[]>([STOCK_COUNT_COUNTERS[0]]);

  function toggleCounter(counter: string) {
    setCounters((current) =>
      current.includes(counter) ? current.filter((name) => name !== counter) : [...current, counter],
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!scope.trim() || counters.length === 0) return;
    onCreate({ type, location, scope: scope.trim(), blind, counters });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <form onSubmit={handleSubmit} className="contents">
          <DialogHeader>
            <DialogTitle>New physical stock count</DialogTitle>
            <DialogDescription>Set the count scope, counting controls, and assigned team.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="count-type">Count type</Label>
              <Select
                value={type}
                onValueChange={(value) => {
                  if (!value) return;
                  setType(value as StockCountType);
                  if (value === "Blind count") setBlind(true);
                }}
              >
                <SelectTrigger id="count-type" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STOCK_COUNT_TYPES.map((countType) => (
                    <SelectItem key={countType} value={countType}>
                      {countType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="count-location">Location</Label>
              <Select value={location} onValueChange={(value) => value && setLocation(value)}>
                <SelectTrigger id="count-location" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STOCK_COUNT_LOCATIONS.map((countLocation) => (
                    <SelectItem key={countLocation} value={countLocation}>
                      {countLocation}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Label htmlFor="count-scope">Scope</Label>
              <Input
                id="count-scope"
                value={scope}
                onChange={(event) => setScope(event.target.value)}
                placeholder="Example: Zone A, Wellness category, or selected SKUs"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Users className="size-4 text-muted-foreground" />
              <Label>Assigned counters</Label>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {STOCK_COUNT_COUNTERS.map((counter) => {
                const selected = counters.includes(counter);
                return (
                  <button
                    key={counter}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggleCounter(counter)}
                    className={cn(
                      "flex items-center justify-between rounded-lg border px-3 py-2 text-left text-sm transition-colors",
                      selected ? "border-primary bg-primary/5 text-foreground" : "text-muted-foreground hover:bg-muted/50",
                    )}
                  >
                    {counter}
                    <span
                      className={cn(
                        "flex size-5 items-center justify-center rounded border",
                        selected && "border-primary bg-primary text-primary-foreground",
                      )}
                    >
                      {selected && <Check className="size-3.5" />}
                    </span>
                  </button>
                );
              })}
            </div>
            {counters.length === 0 && <p className="text-xs text-destructive">Assign at least one counter.</p>}
          </div>

          <button
            type="button"
            aria-pressed={blind}
            onClick={() => setBlind((current) => !current)}
            className={cn(
              "flex items-start gap-3 rounded-lg border p-3 text-left transition-colors",
              blind && "border-primary bg-primary/5",
            )}
          >
            <EyeOff className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <span className="flex-1">
              <span className="block text-sm font-medium">Blind quantity entry</span>
              <span className="block text-xs text-muted-foreground">
                Hide system quantities from counters until the count is submitted.
              </span>
            </span>
            <span
              className={cn(
                "relative mt-0.5 h-5 w-9 rounded-full bg-muted transition-colors",
                blind && "bg-primary",
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 left-0.5 size-4 rounded-full bg-white shadow-sm transition-transform",
                  blind && "translate-x-4",
                )}
              />
            </span>
          </button>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!scope.trim() || counters.length === 0}>
              Create draft count
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
