import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Brand } from "@/lib/catalog-data";

export function BrandsList({ brands }: { brands: Brand[] }) {
  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Brands</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {brands.map((brand) => (
          <div
            key={brand.name}
            className="flex items-center gap-2 rounded-full border bg-muted/30 py-1.5 pl-3 pr-2 text-sm"
          >
            <span className="font-medium">{brand.name}</span>
            <span className="rounded-full bg-muted px-1.5 py-0.5 text-xs text-muted-foreground tabular-nums">
              {brand.productCount}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
