import { CategoriesList } from "@/components/catalog/categories-list";
import { BrandsList } from "@/components/catalog/brands-list";
import { UnitsTable } from "@/components/catalog/units-table";
import { UnitConverter } from "@/components/catalog/unit-converter";
import { CATEGORIES, BRANDS, UNITS } from "@/lib/catalog-data";

export default function CatalogPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Categories, Brands, and Units</h1>
        <p className="max-w-3xl text-sm text-muted-foreground">
          The catalog supports product categories, subcategories, brands, units of measurement,
          and unit conversions.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <CategoriesList categories={CATEGORIES} />
        <BrandsList brands={BRANDS} />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <UnitsTable units={UNITS} />
        <UnitConverter />
      </div>
    </div>
  );
}
