import { BrandsList } from "@/components/catalog/brands-list";
import { BRANDS } from "@/lib/catalog-data";

export default function BrandsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Brands</h1>
        <p className="max-w-3xl text-sm text-muted-foreground">
          Every brand carried in the catalog, with how many products are linked to each.
        </p>
      </div>

      <BrandsList brands={BRANDS} />
    </div>
  );
}
