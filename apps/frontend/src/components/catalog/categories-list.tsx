import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Category } from "@/lib/catalog-data";

export function CategoriesList({ categories }: { categories: Category[] }) {
  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Categories &amp; Subcategories</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {categories.map((category) => (
          <div key={category.name} className="rounded-lg border p-3">
            <div className="flex items-center justify-between">
              <span className="font-medium">{category.name}</span>
              <span className="text-xs text-muted-foreground">
                {category.subcategories.reduce((sum, s) => sum + s.productCount, 0)} products
              </span>
            </div>
            <ul className="mt-2 flex flex-col gap-1 border-l pl-3">
              {category.subcategories.map((sub) => (
                <li key={sub.name} className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{sub.name}</span>
                  <span className="tabular-nums">{sub.productCount}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
