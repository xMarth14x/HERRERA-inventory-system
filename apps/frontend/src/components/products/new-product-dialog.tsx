"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Sparkles } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateUniqueBarcode } from "@/lib/barcode";
import type { Product } from "@/lib/product-data";

const newProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  category: z.string().min(1, "Category is required"),
  brand: z.string().min(1, "Brand is required"),
  baseUnit: z.string().min(1, "Base unit is required"),
  description: z.string().optional(),
  isActive: z.boolean(),
  isTaxable: z.boolean(),
  batchTracking: z.boolean(),
  expiryTracking: z.boolean(),
  variantName: z.string().min(1, "Variant name is required"),
  sku: z.string().min(1, "SKU is required"),
  cost: z.number().min(0, "Must be 0 or more"),
  sellingPrice: z.number().min(0, "Must be 0 or more"),
  minimum: z.number().min(0, "Must be 0 or more"),
  maximum: z.number().min(0, "Must be 0 or more"),
  reorderPoint: z.number().min(0, "Must be 0 or more"),
  reorderQuantity: z.number().min(0, "Must be 0 or more"),
});

type NewProductValues = z.infer<typeof newProductSchema>;

const defaultValues: NewProductValues = {
  name: "",
  category: "",
  brand: "",
  baseUnit: "Piece",
  description: "",
  isActive: true,
  isTaxable: true,
  batchTracking: false,
  expiryTracking: false,
  variantName: "",
  sku: "",
  cost: 0,
  sellingPrice: 0,
  minimum: 10,
  maximum: 200,
  reorderPoint: 20,
  reorderQuantity: 50,
};

export function NewProductDialog({
  open,
  onOpenChange,
  existingBarcodes,
  nextProductCode,
  onCreate,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  existingBarcodes: Set<string>;
  nextProductCode: string;
  onCreate: (product: Product) => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewProductValues>({
    resolver: zodResolver(newProductSchema),
    defaultValues,
  });

  useEffect(() => {
    if (open) reset(defaultValues);
  }, [open, reset]);

  function onSubmit(values: NewProductValues) {
    const barcode = generateUniqueBarcode(existingBarcodes);
    const id = crypto.randomUUID();

    const product: Product = {
      id,
      name: values.name,
      productCode: nextProductCode,
      description: values.description ?? "",
      category: values.category,
      brand: values.brand,
      baseUnit: values.baseUnit,
      isActive: values.isActive,
      isTaxable: values.isTaxable,
      batchTracking: values.batchTracking,
      expiryTracking: values.expiryTracking,
      variants: [
        {
          id: `${id}-1`,
          variantName: values.variantName,
          sku: values.sku,
          barcode,
          cost: values.cost,
          sellingPrice: values.sellingPrice,
          minimum: values.minimum,
          maximum: values.maximum,
          reorderPoint: values.reorderPoint,
          reorderQuantity: values.reorderQuantity,
        },
      ],
    };

    onCreate(product);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>New product</DialogTitle>
          <DialogDescription>
            {nextProductCode} will be assigned automatically. A unique, scannable barcode is
            generated for the variant below — there&apos;s no field to type one in.
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Product name" error={errors.name?.message} className="col-span-2">
              <Input placeholder="e.g. Lavender Candle" {...register("name")} />
            </Field>
            <Field label="Category" error={errors.category?.message}>
              <Input placeholder="e.g. Wellness" {...register("category")} />
            </Field>
            <Field label="Brand" error={errors.brand?.message}>
              <Input placeholder="e.g. Aroma Co." {...register("brand")} />
            </Field>
            <Field label="Base unit" error={errors.baseUnit?.message}>
              <Input placeholder="e.g. Piece" {...register("baseUnit")} />
            </Field>
            <Field label="Description" className="col-span-2">
              <Input placeholder="Optional short description" {...register("description")} />
            </Field>
          </div>

          <div className="flex flex-wrap gap-4 rounded-lg border bg-muted/30 p-3">
            <Checkbox label="Active" {...register("isActive")} />
            <Checkbox label="Taxable" {...register("isTaxable")} />
            <Checkbox label="Batch tracking" {...register("batchTracking")} />
            <Checkbox label="Expiry tracking" {...register("expiryTracking")} />
          </div>

          <div className="flex flex-col gap-3 rounded-lg border p-3">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Sparkles className="size-4 text-[#0a43b8]" />
              First variant
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Variant name" error={errors.variantName?.message} className="col-span-2">
                <Input placeholder="e.g. Sandalwood, 200 g" {...register("variantName")} />
              </Field>
              <Field label="SKU" error={errors.sku?.message}>
                <Input placeholder="e.g. SCN-SDW-200" {...register("sku")} />
              </Field>
              <Field label="Barcode">
                <Input value="Auto-generated on save" disabled className="text-muted-foreground" />
              </Field>
              <Field label="Cost" error={errors.cost?.message}>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  {...register("cost", { valueAsNumber: true })}
                />
              </Field>
              <Field label="Selling price" error={errors.sellingPrice?.message}>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  {...register("sellingPrice", { valueAsNumber: true })}
                />
              </Field>
              <Field label="Minimum" error={errors.minimum?.message}>
                <Input type="number" min="0" {...register("minimum", { valueAsNumber: true })} />
              </Field>
              <Field label="Maximum" error={errors.maximum?.message}>
                <Input type="number" min="0" {...register("maximum", { valueAsNumber: true })} />
              </Field>
              <Field label="Reorder point" error={errors.reorderPoint?.message}>
                <Input
                  type="number"
                  min="0"
                  {...register("reorderPoint", { valueAsNumber: true })}
                />
              </Field>
              <Field label="Reorder quantity" error={errors.reorderQuantity?.message}>
                <Input
                  type="number"
                  min="0"
                  {...register("reorderQuantity", { valueAsNumber: true })}
                />
              </Field>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create product</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <Label className="mb-1.5">{label}</Label>
      {children}
      {error ? <p className="mt-1 text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

function Checkbox({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="flex items-center gap-2 text-sm font-medium">
      <input type="checkbox" className="size-4 rounded border-input accent-[#0a43b8]" {...props} />
      {label}
    </label>
  );
}
