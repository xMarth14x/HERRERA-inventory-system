import { CategoriesList } from "@/components/catalog/categories-list";
import { BrandsList } from "@/components/catalog/brands-list";
import { UnitsTable } from "@/components/catalog/units-table";
import { UnitConversionsTable } from "@/components/catalog/unit-conversions-table";
import { SampleProductList } from "@/components/catalog/sample-product-list";
import { CATEGORIES, BRANDS, UNITS } from "@/lib/catalog-data";
import { getProducts } from "@/lib/product-data";

export default function CatalogPage() {
  const products = getProducts();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Catalog</h1>
        <p className="max-w-3xl text-sm text-muted-foreground">
          A snapshot of categories, subcategories, brands, units of measurement, and unit conversions —
          drill into any section from the Catalog menu for the full list.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="flex flex-col gap-4">
          <CategoriesList categories={CATEGORIES} limit={4} viewAllHref="/catalog/categories" />
          <UnitConversionsTable viewAllHref="/catalog/unit-conversions" />
        </div>
        <div className="flex flex-col gap-4">
          <BrandsList brands={BRANDS} limit={6} viewAllHref="/catalog/brands" />
          <UnitsTable units={UNITS} viewAllHref="/catalog/units" />
        </div>
      </div>

      <SampleProductList products={products} limit={8} />
    </div>
  );
}
