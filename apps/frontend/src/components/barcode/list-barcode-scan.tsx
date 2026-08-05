"use client";

import { useState } from "react";
import { ScanLine } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { findVariantByCode } from "@/lib/product-data";

/**
 * Scan (or type) a barcode/SKU to jump straight to the matching row on a
 * list page — resolves against the product catalog, then hands the SKU to
 * the page's existing search filter, which every list already matches SKU
 * against.
 */
export function ListBarcodeScan({
  onFound,
  placeholder = "Scan a barcode or enter a SKU…",
}: {
  onFound: (sku: string, productName: string) => void;
  placeholder?: string;
}) {
  const [value, setValue] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const term = value.trim();
    if (!term) return;

    const match = findVariantByCode(term);
    if (!match) {
      toast.error(`No product found for "${term}".`);
      return;
    }

    onFound(match.variant.sku, match.product.name);
    setValue("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2">
      <div className="flex-1">
        <Label htmlFor="list-barcode-scan" className="mb-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
          <ScanLine className="size-3.5" />
          Scan to find
        </Label>
        <Input
          id="list-barcode-scan"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={placeholder}
          className="font-mono"
          autoComplete="off"
        />
      </div>
      <Button type="submit" variant="outline" disabled={!value.trim()}>
        <ScanLine className="size-4" />
        Find
      </Button>
    </form>
  );
}
