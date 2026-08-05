"use client";

import { useState } from "react";
import {
  ArrowLeftRight,
  Boxes,
  ClipboardCheck,
  ClipboardList,
  FileClock,
  Package,
  ShoppingCart,
  SlidersHorizontal,
  Wallet,
} from "lucide-react";

import { DashboardFilters, ALL_VALUE, type DashboardFilterState } from "@/components/dashboard/dashboard-filters";
import { SummaryCard } from "@/components/shared/summary-card";
import { LowStockItems } from "@/components/dashboard/low-stock-items";
import { PendingApprovals } from "@/components/dashboard/pending-approvals";
import { ExpiringProducts } from "@/components/dashboard/expiring-products";
import { InventoryValueChart } from "@/components/dashboard/inventory-value-chart";
import { TopMovers } from "@/components/dashboard/top-movers";
import { RecentMovementsTable } from "@/components/dashboard/recent-movements-table";
import { StockOverviewChart } from "@/components/dashboard/stock-overview-chart";
import { StockStatusDonut } from "@/components/dashboard/stock-status-donut";
import { getDashboardData } from "@/lib/dashboard-data";
import { formatCompactCurrency, formatNumber } from "@/lib/format";

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
        <SummaryCard
          icon={Wallet}
          label="Total Inventory Value"
          value={formatCompactCurrency(data.kpis.totalInventoryValue)}
          tone="green"
        />
        <SummaryCard
          icon={Package}
          label="Total Products"
          value={formatNumber(data.kpis.totalActiveProducts)}
          detail={`${formatNumber(data.kpis.totalActiveVariants)} active variants`}
          tone="red"
        />
        <SummaryCard
          icon={Boxes}
          label="Total Stock (Units)"
          value={formatNumber(data.kpis.totalStockUnits)}
          detail={`+${formatNumber(data.kpis.stockReceivedToday)} received · -${formatNumber(data.kpis.stockIssuedToday)} issued today`}
          tone="blue"
        />
        <SummaryCard
          icon={ClipboardList}
          label="Low Stock Items"
          value={formatNumber(data.kpis.lowStockCount)}
          detail={`${formatNumber(data.kpis.outOfStockCount)} out of stock`}
          tone="amber"
        />
        <SummaryCard
          icon={FileClock}
          label="Pending Purchase Requests"
          value={formatNumber(data.kpis.pendingPurchaseRequests)}
          tone="violet"
        />
        <SummaryCard
          icon={ShoppingCart}
          label="Pending Purchase Orders"
          value={formatNumber(data.kpis.pendingPurchaseOrders)}
          detail={`${formatNumber(data.kpis.posAwaitingDelivery)} awaiting delivery`}
          tone="red"
        />
        <SummaryCard
          icon={ArrowLeftRight}
          label="Transfers in Transit"
          value={formatNumber(data.kpis.transfersInTransit)}
          tone="blue"
        />
        <SummaryCard
          icon={ClipboardCheck}
          label="Pending Approvals"
          value={formatNumber(data.kpis.pendingApprovals)}
          tone="amber"
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(360px,0.85fr)]">
        <StockOverviewChart data={data.stockTrend} />
        <StockStatusDonut data={data.stockStatus} />
      </div>

      <div className="grid items-stretch gap-4 xl:grid-cols-[minmax(0,1.3fr)_minmax(340px,1fr)]">
        <InventoryValueChart data={data.inventoryByLocation} />
        <ExpiringProducts data={data.expiringProducts} />
      </div>

      <TopMovers fastMoving={data.fastMoving} slowMoving={data.slowMoving} />

      <div className="grid items-stretch gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(340px,0.75fr)]">
        <LowStockItems data={data.lowStockItems} />
        <PendingApprovals data={data.pendingApprovals} />
      </div>

      <RecentMovementsTable data={data.recentMovements} />
    </div>
  );
}
