import { CategoriesList } from "@/components/catalog/categories-list";
import { CATEGORIES } from "@/lib/catalog-data";

export default function CategoriesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Categories &amp; Subcategories</h1>
        <p className="max-w-3xl text-sm text-muted-foreground">
          Every product category and the subcategories nested under it, with product counts.
        </p>
      </div>

      <CategoriesList categories={CATEGORIES} />
    </div>
  );
}
