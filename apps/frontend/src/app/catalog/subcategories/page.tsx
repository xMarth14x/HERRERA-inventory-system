import { SubcategoriesTable } from "@/components/catalog/subcategories-table";
import { getFlatSubcategories } from "@/lib/catalog-data";

export default function SubcategoriesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Subcategories</h1>
        <p className="max-w-3xl text-sm text-muted-foreground">
          A flat list of every subcategory across the catalog, with its parent category and product count.
        </p>
      </div>

      <SubcategoriesTable data={getFlatSubcategories()} />
    </div>
  );
}
