"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ProductsTable } from "@/components/products/products-table";
import { ProductDetailDialog } from "@/components/products/product-detail-dialog";
import { getProducts, type Product } from "@/lib/product-data";

export default function ProductsPage() {
  const products = getProducts();
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
          <p className="text-sm text-muted-foreground">
            Manage the product catalog and its variants.
          </p>
        </div>
        <Button onClick={() => toast.info("Creating products isn't wired to the backend yet.")}>
          <Plus className="size-4" />
          New Product
        </Button>
      </div>

      <ProductsTable
        data={products}
        search={search}
        onSearchChange={setSearch}
        onSelectProduct={setSelectedProduct}
      />

      <ProductDetailDialog
        product={selectedProduct}
        onOpenChange={(open) => {
          if (!open) setSelectedProduct(null);
        }}
      />
    </div>
  );
}
