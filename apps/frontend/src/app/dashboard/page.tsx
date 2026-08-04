"use client";

import { useState } from "react";
import { Boxes, ClipboardList, Package, ShoppingCart, SlidersHorizontal } from "lucide-react";

import { DashboardFilters, ALL_VALUE, type DashboardFilterState } from "@/components/dashboard/dashboard-filters";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { LowStockItems } from "@/components/dashboard/low-stock-items";
import { RecentActivities } from "@/components/dashboard/recent-activities";
import { StockOverviewChart } from "@/components/dashboard/stock-overview-chart";
import { StockStatusDonut } from "@/components/dashboard/stock-status-donut";
import { getDashboardData } from "@/lib/dashboard-data";
import { formatNumber } from "@/lib/format";

const today = new Date();
const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

function toDateInputValue(date: Date) {
  return date.toISOString().slice(0, 10);
}

export default function DashboardPage() {
  const data = getDashboardData();
  const [filters, setFilters] = useState<DashboardFilterState>({
    organization: ALL_VALUE,
    branch: ALL_VALUE,
    dateFrom: toDateInputValue(thirtyDaysAgo),
    dateTo: toDateInputValue(today),
    category: ALL_VALUE,
    product: ALL_VALUE,
    supplier: ALL_VALUE,
  });

  return (
    <div className="flex flex-col gap-5">
      <details className="group rounded-xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(22,44,84,0.06)]">
        <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-semibold text-[#0a43b8] marker:hidden">
          <SlidersHorizontal className="size-4" />
          Dashboard filters
          <span className="ml-auto text-xs font-normal text-muted-foreground group-open:hidden">Show filters</span>
          <span className="ml-auto hidden text-xs font-normal text-muted-foreground group-open:inline">Hide filters</span>
        </summary>
        <div className="border-t border-slate-200 px-4 py-4">
          <DashboardFilters options={data.filterOptions} value={filters} onChange={setFilters} />
        </div>
      </details>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          icon={Package}
          label="Total Products"
          value={formatNumber(data.kpis.totalActiveProducts)}
          tone="red"
          secondary={[{ label: "active variants", value: formatNumber(data.kpis.totalActiveVariants), tone: "red" }]}
        />
        <KpiCard
          icon={Boxes}
          label="Total Stock (Units)"
          value={formatNumber(data.kpis.totalStockUnits)}
          tone="blue"
          secondary={[{ label: "received today", value: `+${formatNumber(data.kpis.stockReceivedToday)}`, tone: "blue" }]}
        />
        <KpiCard
          icon={ClipboardList}
          label="Low Stock Items"
          value={formatNumber(data.kpis.lowStockCount)}
          tone="amber"
          secondary={[{ label: "out of stock", value: formatNumber(data.kpis.outOfStockCount), tone: "red" }]}
        />
        <KpiCard
          icon={ShoppingCart}
          label="Pending Purchases"
          value={formatNumber(data.kpis.pendingPurchaseRequests + data.kpis.pendingPurchaseOrders)}
          tone="red"
          secondary={[{ label: "awaiting delivery", value: formatNumber(data.kpis.posAwaitingDelivery), tone: "red" }]}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(360px,0.85fr)]">
        <StockOverviewChart data={data.stockTrend} />
        <StockStatusDonut data={data.stockStatus} />
      </div>

      <div className="grid items-stretch gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(340px,0.75fr)]">
        <LowStockItems data={data.lowStockItems} />
        <RecentActivities data={data.recentMovements} />
      </div>
    </div>
  );
}
