"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { DashboardFilterOptions } from "@/lib/dashboard-data";

export interface DashboardFilterState {
  organization: string;
  branch: string;
  dateFrom: string;
  dateTo: string;
  category: string;
  product: string;
  supplier: string;
}

export const ALL_VALUE = "__all__";

export function DashboardFilters({
  options,
  value,
  onChange,
}: {
  options: DashboardFilterOptions;
  value: DashboardFilterState;
  onChange: (next: DashboardFilterState) => void;
}) {
  function set<K extends keyof DashboardFilterState>(key: K, next: DashboardFilterState[K]) {
    onChange({ ...value, [key]: next });
  }

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="date-from" className="text-xs text-muted-foreground">
          Date range
        </Label>
        <div className="flex items-center gap-2">
          <input
            id="date-from"
            type="date"
            value={value.dateFrom}
            onChange={(e) => set("dateFrom", e.target.value)}
            className="h-9 rounded-lg border border-input bg-white px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/20"
          />
          <span className="text-sm text-muted-foreground">to</span>
          <input
            id="date-to"
            type="date"
            value={value.dateTo}
            onChange={(e) => set("dateTo", e.target.value)}
            className="h-9 rounded-lg border border-input bg-white px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/20"
          />
        </div>
      </div>

      <FilterSelect
        label="Organization"
        value={value.organization}
        onChange={(v) => set("organization", v)}
        options={options.organizations}
      />
      <FilterSelect
        label="Branch / warehouse"
        value={value.branch}
        onChange={(v) => set("branch", v)}
        options={options.branches}
      />
      <FilterSelect
        label="Category"
        value={value.category}
        onChange={(v) => set("category", v)}
        options={options.categories}
      />
      <FilterSelect
        label="Product"
        value={value.product}
        onChange={(v) => set("product", v)}
        options={options.products}
      />
      <FilterSelect
        label="Supplier"
        value={value.supplier}
        onChange={(v) => set("supplier", v)}
        options={options.suppliers}
      />
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Select value={value} onValueChange={(v) => onChange(v ?? ALL_VALUE)}>
        <SelectTrigger size="sm" className="min-w-40">
          <SelectValue placeholder={`All ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL_VALUE}>All {label.toLowerCase()}</SelectItem>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
