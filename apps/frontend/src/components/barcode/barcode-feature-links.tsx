import Link from "next/link";
import { ArrowLeftRight, ClipboardList, PackageCheck, PackageMinus, ScanSearch, type LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BarcodeFeatureLink {
  label: string;
  href: string;
  icon: LucideIcon;
  description: string;
}

const LINKS: BarcodeFeatureLink[] = [
  {
    label: "Receiving",
    href: "/goods-receiving",
    icon: PackageCheck,
    description: "Scan a barcode inside a receipt to log one more unit received against the PO.",
  },
  {
    label: "Stock issue",
    href: "/stock-issues",
    icon: PackageMinus,
    description: "Scan a barcode on the list to jump straight to that product's issue record.",
  },
  {
    label: "Transfers",
    href: "/stock-transfers",
    icon: ArrowLeftRight,
    description: "Scan a barcode inside a transfer to confirm one more unit arrived at the destination.",
  },
  {
    label: "Stock counting",
    href: "/stock-counts",
    icon: ClipboardList,
    description: "Scan a barcode during a count to add one more unit to that product's tally.",
  },
  {
    label: "Product verification",
    href: "/products",
    icon: ScanSearch,
    description: "Use the lookup above to confirm a scanned item's barcode matches the expected product.",
  },
];

/**
 * Directory of where barcode scanning actually lives across the app — each
 * card links to the real, working feature on its own page rather than
 * duplicating it here.
 */
export function BarcodeFeatureLinks() {
  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Where barcode scanning is available</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-col gap-2 rounded-lg border p-3 transition-colors hover:border-[#0a43b8]/40 hover:bg-blue-50/40"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0a43b8]">
                <Icon className="size-4.5" />
              </span>
              <span className="text-sm font-semibold">{link.label}</span>
              <span className="text-xs text-muted-foreground">{link.description}</span>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}
