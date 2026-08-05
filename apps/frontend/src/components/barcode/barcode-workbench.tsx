"use client";

import { useMemo, useState } from "react";
import { RefreshCw, ScanLine, Search, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarcodeDisplay } from "@/components/barcode/barcode-display";
import { generateUniqueBarcode } from "@/lib/barcode";
import { collectBarcodes, getProducts } from "@/lib/product-data";

type ScanResult =
  | { status: "empty" }
  | { status: "not-found" }
  | { status: "found"; productName: string; variantName: string; sku: string; barcode: string };

/**
 * Turns the Barcode Support spec into a working feature: every product gets
 * a real, auto-generated, unique Code128 barcode (no manual entry), and any
 * barcode can be looked up against the catalog — the two things this page
 * used to just describe.
 */
export function BarcodeWorkbench() {
  const catalog = useMemo(() => getProducts(), []);
  const catalogBarcodes = useMemo(() => collectBarcodes(catalog), [catalog]);

  const [sessionBarcodes, setSessionBarcodes] = useState<string[]>([]);
  const [label, setLabel] = useState("");
  const [generatedList, setGeneratedList] = useState<{ label: string; code: string }[]>([]);

  const [scanValue, setScanValue] = useState("");

  const scanResult = useMemo<ScanResult>(() => {
    const term = scanValue.trim();
    if (!term) return { status: "empty" };
    for (const product of catalog) {
      const variant = product.variants.find((v) => v.barcode === term);
      if (variant) {
        return {
          status: "found",
          productName: product.name,
          variantName: variant.variantName,
          sku: variant.sku,
          barcode: variant.barcode,
        };
      }
    }
    return { status: "not-found" };
  }, [scanValue, catalog]);

  function handleGenerate() {
    // Every call checks against the catalog *and* every barcode generated
    // earlier this session, so each product — this one and the next — always
    // gets its own independent, non-colliding code.
    const taken = new Set([...catalogBarcodes, ...sessionBarcodes]);
    const code = generateUniqueBarcode(taken);
    setSessionBarcodes((current) => [...current, code]);
    setGeneratedList((current) => [{ label: label.trim() || `Untitled product ${current.length + 1}`, code }, ...current]);
    setLabel("");
  }

  function clearGenerated() {
    setGeneratedList([]);
    setSessionBarcodes([]);
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Card className="gap-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <RefreshCw className="size-4" />
            Auto-generate a barcode
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            Every product created in the catalog gets one of these automatically — there is
            no field to type a barcode in. Generate one below, then try it again for the next
            product: each one gets its own independent, non-colliding code.
          </p>
          <div>
            <Label className="mb-1.5" htmlFor="barcode-demo-label">
              Product or variant name
            </Label>
            <Input
              id="barcode-demo-label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                e.preventDefault();
                handleGenerate();
              }}
              placeholder="e.g. Lavender Candle, 200 g"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button type="button" onClick={handleGenerate} className="self-start">
              Generate unique barcode
            </Button>
            {generatedList.length > 0 && (
              <Button type="button" variant="outline" size="sm" onClick={clearGenerated}>
                <Trash2 className="size-4" />
                Clear
              </Button>
            )}
          </div>

          {generatedList.length > 0 && (
            <div className="flex flex-col gap-2 max-h-80 overflow-y-auto pr-1">
              {generatedList.map((entry, index) => (
                <div
                  key={entry.code}
                  className="flex flex-col items-center gap-2 rounded-lg border bg-muted/30 p-4"
                >
                  <p className="text-sm font-medium">
                    {entry.label}
                    {index === 0 && (
                      <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 align-middle">
                        Latest
                      </span>
                    )}
                  </p>
                  <BarcodeDisplay value={entry.code} height={50} />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="gap-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <ScanLine className="size-4" />
            Scan or look up a barcode
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            USB scanners act as keyboard input — type or scan a value below to look it up
            against the product catalog.
          </p>
          <div>
            <Label className="mb-1.5" htmlFor="barcode-scan-input">
              Barcode value
            </Label>
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="barcode-scan-input"
                value={scanValue}
                onChange={(e) => setScanValue(e.target.value)}
                placeholder="Scan or paste a barcode, e.g. 4801234567890"
                className="pl-8 font-mono"
              />
            </div>
          </div>

          {scanResult.status === "not-found" && (
            <p className="rounded-lg border border-dashed p-3 text-sm text-muted-foreground">
              No product matches this barcode.
            </p>
          )}
          {scanResult.status === "found" && (
            <div className="flex items-center justify-between gap-3 rounded-lg border bg-muted/30 p-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{scanResult.productName}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {scanResult.variantName} · {scanResult.sku}
                </p>
              </div>
              <BarcodeDisplay value={scanResult.barcode} height={36} fontSize={10} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
