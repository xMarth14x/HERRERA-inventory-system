import Link from "next/link";
import { Tag } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/lib/format";
import type { Brand } from "@/lib/catalog-data";

const TONE_CLASSES = [
  "bg-blue-50 text-blue-700",
  "bg-emerald-50 text-emerald-700",
  "bg-amber-50 text-amber-800",
  "bg-violet-50 text-violet-700",
  "bg-red-50 text-red-700",
];

function toneForName(name: string) {
  return TONE_CLASSES[name.charCodeAt(0) % TONE_CLASSES.length];
}

function initialsForName(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

export function BrandsList({
  brands,
  limit,
  viewAllHref,
}: {
  brands: Brand[];
  limit?: number;
  viewAllHref?: string;
}) {
  const shown = limit ? brands.slice(0, limit) : brands;

  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
            <Tag className="size-4" />
          </span>
          Brands
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {shown.map((brand) => (
          <div key={brand.name} className="flex flex-col items-center gap-2 rounded-lg border p-3 text-center">
            <span
              className={`flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-bold ${toneForName(brand.name)}`}
              aria-hidden
            >
              {initialsForName(brand.name)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{brand.name}</p>
              <p className="text-xs text-muted-foreground">{formatNumber(brand.productCount)} products</p>
            </div>
          </div>
        ))}
      </CardContent>
      {viewAllHref ? (
        <CardFooter className="justify-center">
          <Link href={viewAllHref} className="text-sm font-semibold text-amber-700 hover:underline">
            View All Brands
          </Link>
        </CardFooter>
      ) : null}
    </Card>
  );
}
