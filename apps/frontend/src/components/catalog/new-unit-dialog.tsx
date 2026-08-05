"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Unit, UnitDimension } from "@/lib/catalog-data";

const DIMENSIONS: UnitDimension[] = ["Count", "Weight", "Volume"];

const BASE_UNIT_LABEL: Record<UnitDimension, string> = {
  Count: "Piece",
  Weight: "Gram",
  Volume: "Milliliter",
};

const newUnitSchema = z.object({
  name: z.string().min(1, "Unit name is required"),
  code: z
    .string()
    .min(1, "Code is required")
    .max(10, "Keep the code short, e.g. \"box\" or \"kg\""),
  dimension: z.enum(["Count", "Weight", "Volume"]),
  conversionToBase: z.number().positive("Must be greater than 0"),
  definition: z.string().min(1, "Definition is required"),
  description: z.string().min(1, "Description is required"),
  exampleUse: z.string().min(1, "Example use is required"),
});

type NewUnitValues = z.infer<typeof newUnitSchema>;

const defaultValues: NewUnitValues = {
  name: "",
  code: "",
  dimension: "Count",
  conversionToBase: 1,
  definition: "",
  description: "",
  exampleUse: "",
};

export function NewUnitDialog({
  open,
  onOpenChange,
  existingCodes,
  onCreate,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  existingCodes: Set<string>;
  onCreate: (unit: Unit) => void;
}) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { errors },
  } = useForm<NewUnitValues>({
    resolver: zodResolver(newUnitSchema),
    defaultValues,
  });

  useEffect(() => {
    if (open) reset(defaultValues);
  }, [open, reset]);

  const dimension = watch("dimension");

  function onSubmit(values: NewUnitValues) {
    const code = values.code.trim().toLowerCase();
    if (existingCodes.has(code)) {
      setError("code", { message: `"${code}" is already used by another unit` });
      return;
    }

    onCreate({
      code,
      name: values.name.trim(),
      dimension: values.dimension,
      conversionToBase: values.conversionToBase,
      definition: values.definition.trim(),
      description: values.description.trim(),
      exampleUse: values.exampleUse.trim(),
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>New unit</DialogTitle>
          <DialogDescription>
            Add a unit of measurement. Conversion is relative to this type&apos;s base unit —{" "}
            {BASE_UNIT_LABEL[dimension]} for {dimension}.
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Unit name" error={errors.name?.message}>
              <Input placeholder="e.g. Gallon" {...register("name")} />
            </Field>
            <Field label="Code" error={errors.code?.message}>
              <Input placeholder="e.g. gal" {...register("code")} />
            </Field>

            <Field label="Type">
              <Controller
                control={control}
                name="dimension"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={(v) => v && field.onChange(v)}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DIMENSIONS.map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>
            <Field
              label={`Equals how many ${BASE_UNIT_LABEL[dimension]}s?`}
              error={errors.conversionToBase?.message}
            >
              <Input
                type="number"
                min="0"
                step="any"
                {...register("conversionToBase", { valueAsNumber: true })}
              />
            </Field>

            <Field label="Definition" error={errors.definition?.message} className="col-span-2">
              <Input placeholder="e.g. 3.785 liters" {...register("definition")} />
            </Field>
            <Field label="Description" error={errors.description?.message} className="col-span-2">
              <Input placeholder="e.g. Liquid volume measurement" {...register("description")} />
            </Field>
            <Field label="Example use" error={errors.exampleUse?.message} className="col-span-2">
              <Input placeholder="e.g. Fuel, Bulk liquids" {...register("exampleUse")} />
            </Field>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add unit</Button>
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
