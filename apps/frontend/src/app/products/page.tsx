"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ProductsTable } from "@/components/products/products-table";
import { ProductDetailDialog } from "@/components/products/product-detail-dialog";
import { NewProductDialog } from "@/components/products/new-product-dialog";
import {
  collectBarcodes,
  generateNextProductCode,
  getProducts,
  type Product,
} from "@/lib/product-data";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(() => getProducts());
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const existingBarcodes = useMemo(() => collectBarcodes(products), [products]);
  const nextProductCode = useMemo(() => generateNextProductCode(products), [products]);

  function handleCreate(product: Product) {
    setProducts((current) => [product, ...current]);
    setIsCreateOpen(false);
    toast.success(`${product.name} added — barcode ${product.variants[0].barcode} generated automatically.`);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
          <p className="text-sm text-muted-foreground">
            Manage the product catalog and its variants. Every new product gets a unique barcode automatically.
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
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

      <NewProductDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        existingBarcodes={existingBarcodes}
        nextProductCode={nextProductCode}
        onCreate={handleCreate}
      />
    </div>
  );
}
