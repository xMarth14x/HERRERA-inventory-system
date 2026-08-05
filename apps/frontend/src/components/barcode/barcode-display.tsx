"use client";

import { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";

/** Renders a real, scannable Code128 barcode as an inline SVG. */
export function BarcodeDisplay({
  value,
  height = 42,
  width = 1.6,
  fontSize = 12,
  className,
}: {
  value: string;
  height?: number;
  width?: number;
  fontSize?: number;
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !value) return;
    try {
      JsBarcode(svgRef.current, value, {
        format: "CODE128",
        displayValue: true,
        fontSize,
        height,
        width,
        margin: 6,
        background: "transparent",
        lineColor: "#10172a",
      });
    } catch {
      // Invalid characters for the symbology — leave the previous render as-is.
    }
  }, [value, height, width, fontSize]);

  return <svg ref={svgRef} role="img" aria-label={`Barcode ${value}`} className={className} />;
}
