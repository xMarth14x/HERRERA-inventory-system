import Link from "next/link";
import { Layers } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Category } from "@/lib/catalog-data";
import { categoryVisual } from "./category-visuals";

export function CategoriesList({
  categories,
  limit,
  viewAllHref,
}: {
  categories: Category[];
  limit?: number;
  viewAllHref?: string;
}) {
  const shown = limit ? categories.slice(0, limit) : categories;

  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-red-50 text-[#ed1b2f]">
            <Layers className="size-4" />
          </span>
          Categories &amp; Subcategories
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {shown.map((category) => {
          const visual = categoryVisual(category.name);
          const Icon = visual.icon;
          const totalProducts = category.subcategories.reduce((sum, s) => sum + s.productCount, 0);
          const preview = category.subcategories.slice(0, 3);
          const remaining = category.subcategories.length - preview.length;

          return (
            <div key={category.name} className="rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <span className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${visual.className}`}>
                  <Icon className="size-4.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{category.name}</p>
                  <p className="text-xs text-muted-foreground">{category.subcategories.length} subcategories</p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">{totalProducts} products</span>
              </div>
              <ul className="mt-2 flex flex-col gap-1 border-l pl-3">
                {preview.map((sub) => (
                  <li key={sub.name} className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{sub.name}</span>
                    <span className="tabular-nums">{sub.productCount}</span>
                  </li>
                ))}
                {remaining > 0 ? (
                  <li className="text-xs text-muted-foreground">+{remaining} more</li>
                ) : null}
              </ul>
            </div>
          );
        })}
      </CardContent>
      {viewAllHref ? (
        <CardFooter className="justify-center">
          <Link href={viewAllHref} className="text-sm font-semibold text-[#ed1b2f] hover:underline">
            View All Categories
          </Link>
        </CardFooter>
      ) : null}
    </Card>
  );
}
