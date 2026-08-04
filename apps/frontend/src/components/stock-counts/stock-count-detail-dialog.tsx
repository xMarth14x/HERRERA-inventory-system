"use client";

import { useState } from "react";
import { Barcode, CheckCircle2, EyeOff, ScanLine, Users } from "lucide-react";
import { toast } from "sonner";

import { StockCountStatusBadge } from "@/components/stock-counts/stock-count-status-badge";
import { Badge } from "@/components/ui/badge";
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatNumber } from "@/lib/format";
import {
  getEffectiveCount,
  getLineVariance,
  type StockCount,
  type StockCountLine,
} from "@/lib/stock-count-data";
import { cn } from "@/lib/utils";

export function StockCountDetailDialog({
  count,
  onOpenChange,
  onUpdate,
}: {
  count: StockCount | null;
  onOpenChange: (open: boolean) => void;
  onUpdate: (count: StockCount) => void;
}) {
  const [barcode, setBarcode] = useState("");

  if (!count) {
    return <Dialog open={false} onOpenChange={onOpenChange} />;
  }

  const currentCount = count;
  const canEditFirst = currentCount.status === "DRAFT" || currentCount.status === "IN_PROGRESS";
  const canEditSecond = currentCount.status === "SECOND_COUNT";
  const canScan = canEditFirst || canEditSecond;
  const hideSystemQuantity = currentCount.blind && !["FOR_APPROVAL", "COMPLETED"].includes(currentCount.status);
  const allFirstCountsEntered = currentCount.lines.every((line) => line.firstCount !== null);
  const allSecondCountsEntered = currentCount.lines.every((line) => line.secondCount !== null);

  function updateLine(sku: string, updates: Partial<StockCountLine>) {
    onUpdate({
      ...currentCount,
      status: currentCount.status === "DRAFT" ? "IN_PROGRESS" : currentCount.status,
      lines: currentCount.lines.map((line) => (line.sku === sku ? { ...line, ...updates } : line)),
    });
  }

  function handleBarcodeSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const code = barcode.trim().toLowerCase();
    if (!code || !canScan) return;

    const line = currentCount.lines.find((item) => item.sku.toLowerCase() === code);
    if (!line) {
      toast.error(`No product found for barcode or SKU “${barcode.trim()}”.`);
      return;
    }

    if (canEditSecond) {
      updateLine(line.sku, { secondCount: (line.secondCount ?? 0) + 1 });
    } else {
      updateLine(line.sku, { firstCount: (line.firstCount ?? 0) + 1 });
    }
    setBarcode("");
    toast.success(`${line.productName} counted.`);
  }

  function submitFirstCount() {
    if (!allFirstCountsEntered) {
      toast.error("Enter a first count for every product before submitting.");
      return;
    }
    onUpdate({ ...currentCount, status: "SECOND_COUNT" });
    toast.success("First count submitted. The second count is ready.");
  }

  function submitForApproval() {
    if (!allSecondCountsEntered) {
      toast.error("Enter a second count for every product before submitting.");
      return;
    }
    onUpdate({ ...currentCount, status: "FOR_APPROVAL" });
    toast.success("Count submitted for variance approval.");
  }

  function approveVariance() {
    const undocumentedVariance = currentCount.lines.find(
      (line) => (getLineVariance(line) ?? 0) !== 0 && !line.varianceNote.trim(),
    );
    if (undocumentedVariance) {
      toast.error(`Add a variance note for ${undocumentedVariance.sku} before approval.`);
      return;
    }

    const movementNumber = `MV-2026-${String(1843 + Number(currentCount.id)).padStart(6, "0")}`;
    onUpdate({
      ...currentCount,
      status: "COMPLETED",
      approvedBy: "L. Herrera",
      movementNumber,
    });
    toast.success(`Variance approved. Movement ${movementNumber} was generated automatically.`);
  }

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <div className="flex flex-wrap items-start justify-between gap-3 pr-8">
            <div>
              <DialogTitle className="font-mono text-lg">{count.countNumber}</DialogTitle>
              <DialogDescription>
                {count.type} · {count.location}
              </DialogDescription>
            </div>
            <StockCountStatusBadge status={count.status} />
          </div>
        </DialogHeader>

        <div className="grid gap-3 rounded-lg border bg-muted/30 p-3 sm:grid-cols-3">
          <DetailField label="Scope" value={count.scope} />
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Counters</span>
            <div className="flex flex-wrap gap-1">
              {count.counters.map((counter) => (
                <Badge key={counter} variant="secondary">
                  <Users data-icon="inline-start" />
                  {counter}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Counting control</span>
            <span className="flex items-center gap-1.5 font-medium">
              {count.blind ? <EyeOff className="size-3.5" /> : <CheckCircle2 className="size-3.5" />}
              {count.blind ? "Blind quantity entry" : "System quantity visible"}
            </span>
          </div>
        </div>

        {count.movementNumber && (
          <div className="flex items-start gap-3 rounded-lg border border-emerald-600/20 bg-emerald-50 p-3 text-emerald-800">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
            <div>
              <p className="text-sm font-medium">Variance approved by {count.approvedBy}</p>
              <p className="text-xs">Inventory movement {count.movementNumber} was generated and posted automatically.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleBarcodeSubmit} className="flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label htmlFor="stock-count-barcode" className="mb-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Barcode className="size-3.5" />
              Barcode or SKU
            </label>
            <Input
              id="stock-count-barcode"
              value={barcode}
              onChange={(event) => setBarcode(event.target.value)}
              placeholder={canScan ? "Scan a barcode or enter a SKU…" : "Counting is locked at this stage"}
              disabled={!canScan}
              autoComplete="off"
            />
          </div>
          <Button type="submit" variant="outline" disabled={!canScan || !barcode.trim()}>
            <ScanLine className="size-4" />
            Add scan
          </Button>
        </form>

        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-64">Product</TableHead>
                <TableHead className="text-right">System</TableHead>
                <TableHead className="w-28 text-right">First count</TableHead>
                <TableHead className="w-28 text-right">Second count</TableHead>
                <TableHead className="text-right">Variance</TableHead>
                <TableHead className="min-w-56">Variance note</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {count.lines.map((line) => {
                const variance = getLineVariance(line);
                const revealVariance = !hideSystemQuantity && getEffectiveCount(line) !== null;
                return (
                  <TableRow key={line.sku}>
                    <TableCell>
                      <p className="font-medium">{line.productName}</p>
                      <p className="font-mono text-xs text-muted-foreground">{line.sku} · {line.category}</p>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {hideSystemQuantity ? (
                        <span className="text-xs text-muted-foreground">Hidden</span>
                      ) : (
                        formatNumber(line.systemQuantity)
                      )}
                    </TableCell>
                    <TableCell>
                      <QuantityInput
                        value={line.firstCount}
                        disabled={!canEditFirst}
                        label={`First count for ${line.productName}`}
                        onChange={(value) => updateLine(line.sku, { firstCount: value })}
                      />
                    </TableCell>
                    <TableCell>
                      <QuantityInput
                        value={line.secondCount}
                        disabled={!canEditSecond}
                        label={`Second count for ${line.productName}`}
                        onChange={(value) => updateLine(line.sku, { secondCount: value })}
                      />
                    </TableCell>
                    <TableCell
                      className={cn(
                        "text-right font-medium tabular-nums",
                        revealVariance && variance !== 0 && (variance ?? 0) > 0 && "text-emerald-600",
                        revealVariance && variance !== 0 && (variance ?? 0) < 0 && "text-red-600",
                      )}
                    >
                      {revealVariance && variance !== null ? `${variance > 0 ? "+" : ""}${formatNumber(variance)}` : "—"}
                    </TableCell>
                    <TableCell>
                      <Input
                        value={line.varianceNote}
                        onChange={(event) => updateLine(line.sku, { varianceNote: event.target.value })}
                        placeholder={revealVariance && variance !== 0 ? "Reason required" : "Optional note"}
                        disabled={count.status === "COMPLETED"}
                        aria-label={`Variance note for ${line.productName}`}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        <DialogFooter showCloseButton>
          {(count.status === "DRAFT" || count.status === "IN_PROGRESS") && (
            <Button type="button" onClick={submitFirstCount} disabled={!allFirstCountsEntered}>
              Submit first count
            </Button>
          )}
          {count.status === "SECOND_COUNT" && (
            <Button type="button" onClick={submitForApproval} disabled={!allSecondCountsEntered}>
              Submit for approval
            </Button>
          )}
          {count.status === "FOR_APPROVAL" && (
            <Button type="button" onClick={approveVariance}>
              <CheckCircle2 className="size-4" />
              Approve &amp; generate movement
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function QuantityInput({
  value,
  disabled,
  label,
  onChange,
}: {
  value: number | null;
  disabled: boolean;
  label: string;
  onChange: (value: number | null) => void;
}) {
  return (
    <Input
      type="number"
      min={0}
      step={1}
      value={value ?? ""}
      disabled={disabled}
      aria-label={label}
      className="text-right tabular-nums"
      onChange={(event) => onChange(event.target.value === "" ? null : Math.max(0, Number(event.target.value)))}
    />
  );
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
