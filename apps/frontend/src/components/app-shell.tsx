"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  ArrowLeftRight,
  Barcode,
  Bell,
  Building2,
  ChevronDown,
  ClipboardEdit,
  ClipboardList,
  FileBarChart,
  FileClock,
  History,
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu,
  Package,
  PackageCheck,
  PackageMinus,
  Scale,
  ScrollText,
  Search,
  ShoppingCart,
  Tags,
  X,
} from "lucide-react";

import { apiFetch } from "@/lib/api";
import { clearAccessToken, type AuthUser } from "@/lib/auth";
import { useInventoryAlerts } from "@/lib/use-inventory-alerts";

interface NavChild {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  children?: NavChild[];
}

interface NavSection {
  label: string;
  items: NavItem[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Products",
    items: [
      { label: "Products", href: "/products", icon: Package },
      {
        label: "Catalog",
        href: "/catalog",
        icon: Tags,
        children: [
          { label: "Categories", href: "/catalog/categories" },
          { label: "Subcategories", href: "/catalog/subcategories" },
          { label: "Brands", href: "/catalog/brands" },
          { label: "Units of Measurement", href: "/catalog/units" },
          { label: "Unit Conversions", href: "/catalog/unit-conversions" },
        ],
      },
      { label: "Locations", href: "/locations", icon: MapPin },
      { label: "Suppliers", href: "/suppliers", icon: Building2 },
    ],
  },
  {
    label: "Purchasing",
    items: [
      { label: "Purchase Requests", href: "/purchase-requests", icon: FileClock },
      { label: "Purchase Orders", href: "/purchase-orders", icon: ShoppingCart },
      { label: "Goods Receiving", href: "/goods-receiving", icon: PackageCheck },
    ],
  },
  {
    label: "Stock Management",
    items: [
      { label: "Inventory Balances", href: "/inventory-balances", icon: Scale },
      { label: "Stock Movement Ledger", href: "/stock-movements", icon: History },
      { label: "Stock Issues", href: "/stock-issues", icon: PackageMinus },
      { label: "Stock Transfers", href: "/stock-transfers", icon: ArrowLeftRight },
      { label: "Stock Adjustments", href: "/stock-adjustments", icon: ClipboardEdit },
      { label: "Physical Stock Count", href: "/stock-counts", icon: ClipboardList },
      { label: "Barcode Support", href: "/barcode-support", icon: Barcode },
    ],
  },
  {
    label: "Insights & Control",
    items: [
      { label: "Inventory Alerts", href: "/alerts", icon: Bell },
      { label: "Reports", href: "/reports", icon: FileBarChart },
      { label: "Audit Logs", href: "/audit-logs", icon: ScrollText },
    ],
  },
];

const PAGE_META: Record<string, { title: string; description: string }> = {
  "/dashboard": { title: "Dashboard", description: "Overview of your inventory" },
  "/products": { title: "Products", description: "Manage products, variants, and stock rules" },
  "/catalog": { title: "Catalog", description: "Categories, subcategories, brands, and units at a glance" },
  "/catalog/categories": { title: "Categories", description: "Product categories and their subcategories" },
  "/catalog/subcategories": { title: "Subcategories", description: "Every subcategory across the catalog" },
  "/catalog/brands": { title: "Brands", description: "Brands carried in the catalog" },
  "/catalog/units": { title: "Units of Measurement", description: "Count, weight, and volume units" },
  "/catalog/unit-conversions": { title: "Unit Conversions", description: "Reference conversions and a live converter" },
  "/locations": { title: "Locations", description: "Manage warehouses, branches, and storage areas" },
  "/suppliers": { title: "Suppliers", description: "Manage supplier records and purchasing history" },
  "/purchase-requests": { title: "Purchase Requests", description: "Create and approve internal purchase requests" },
  "/purchase-orders": { title: "Purchase Orders", description: "Track supplier orders and delivery commitments" },
  "/goods-receiving": { title: "Goods Receiving", description: "Confirm deliveries and update inventory" },
  "/inventory-balances": { title: "Inventory Balances", description: "Monitor stock quantities across every location" },
  "/stock-movements": { title: "Stock Movement Ledger", description: "Review every posted inventory movement" },
  "/stock-issues": { title: "Stock Issues", description: "Record inventory released from storage" },
  "/stock-transfers": { title: "Stock Transfers", description: "Move stock safely between locations" },
  "/stock-adjustments": { title: "Stock Adjustments", description: "Correct stock with controlled approvals" },
  "/stock-counts": { title: "Physical Stock Count", description: "Count, reconcile, and approve stock variances" },
  "/barcode-support": { title: "Barcode Support", description: "Scan products throughout inventory workflows" },
  "/alerts": { title: "Inventory Alerts", description: "Act on stock, purchasing, and control exceptions" },
  "/reports": { title: "Reports", description: "Inventory, purchasing, and management analysis" },
  "/audit-logs": { title: "Audit Logs", description: "Review immutable system and user activity" },
};

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const { data: user } = useQuery<AuthUser>({
    queryKey: ["me"],
    queryFn: () => apiFetch<AuthUser>("/auth/me"),
    retry: false,
    throwOnError: false,
  });

  // Shared, reactive alert cache — acknowledging or resolving an alert on
  // the Inventory Alerts page updates this badge immediately, everywhere,
  // with no reload and no polling.
  const alerts = useInventoryAlerts();
  const openAlertsCount = alerts.filter((alert) => alert.status === "OPEN").length;

  const pageMeta = PAGE_META[pathname] ?? { title: "BigStop Inventory", description: "Inventory management" };
  const displayName = user?.name || "Admin User";
  const initials = displayName
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  function handleLogout() {
    clearAccessToken();
    router.push("/login");
  }

  function isGroupExpanded(item: NavItem) {
    const hasActiveChild = item.children?.some((child) => pathname === child.href) ?? false;
    return expandedGroups[item.href] ?? hasActiveChild;
  }

  function toggleGroup(item: NavItem) {
    setExpandedGroups((current) => ({ ...current, [item.href]: !isGroupExpanded(item) }));
  }

  return (
    <div className="flex min-h-full flex-1 bg-[#f4f7fb]">
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[272px] shrink-0 flex-col overflow-hidden bg-gradient-to-b from-[#9c1b28] via-[#7a121e] to-[#4d0a12] text-white shadow-xl transition-transform duration-200 lg:translate-x-0 ${
          mobileNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-28 shrink-0 items-center justify-between bg-gradient-to-br from-[#174fc1] to-[#062e7e] px-6 shadow-lg shadow-blue-950/20">
          <Link href="/dashboard" className="flex min-w-0 items-center gap-3" onClick={() => setMobileNavOpen(false)}>
            <span className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl shadow-sm">
              <Image src="/bigstop-logo.png" alt="BigStop logo" width={64} height={64} className="size-full object-cover" />
            </span>
            <span className="min-w-0">
              <span className="block text-xl font-extrabold tracking-tight">BigStop</span>
              <span className="block text-xs font-medium text-white/85">Inventory Management</span>
            </span>
          </Link>
          <button
            type="button"
            className="rounded-lg p-2 text-white/80 hover:bg-white/10 hover:text-white lg:hidden"
            onClick={() => setMobileNavOpen(false)}
            aria-label="Close navigation"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="app-scrollbar flex-1 overflow-y-auto px-3 py-4">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label} className="mb-4 last:mb-0">
              <p className="mb-1.5 px-3 text-[10px] font-bold tracking-[0.16em] text-red-100/70 uppercase">
                {section.label}
              </p>
              <ul className="flex flex-col gap-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;

                  if (item.children) {
                    const childActive = item.children.some((child) => pathname === child.href);
                    const expanded = isGroupExpanded(item);
                    return (
                      <li key={item.href}>
                        <div className="flex items-center gap-1">
                          <Link
                            href={item.href}
                            onClick={() => setMobileNavOpen(false)}
                            aria-current={isActive ? "page" : undefined}
                            className={`flex min-h-10 flex-1 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                              isActive
                                ? "bg-[#ffd21f] text-[#09245d] shadow-md shadow-yellow-950/15"
                                : childActive
                                  ? "bg-white/10 text-white"
                                  : "text-white/90 hover:bg-white/10 hover:text-white"
                            }`}
                          >
                            <Icon className="size-[18px] shrink-0" strokeWidth={2} />
                            <span className="truncate">{item.label}</span>
                          </Link>
                          <button
                            type="button"
                            onClick={() => toggleGroup(item)}
                            aria-label={expanded ? `Collapse ${item.label}` : `Expand ${item.label}`}
                            aria-expanded={expanded}
                            className={`flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                              isActive ? "text-[#09245d] hover:bg-black/5" : "text-white/70 hover:bg-white/10 hover:text-white"
                            }`}
                          >
                            <ChevronDown className={`size-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
                          </button>
                        </div>
                        {expanded ? (
                          <ul className="mt-1 mb-1 flex flex-col gap-0.5 border-l border-white/15 py-1 pl-4">
                            {item.children.map((child) => {
                              const childIsActive = pathname === child.href;
                              return (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    onClick={() => setMobileNavOpen(false)}
                                    aria-current={childIsActive ? "page" : undefined}
                                    className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-all ${
                                      childIsActive
                                        ? "bg-[#ffd21f] font-medium text-[#09245d]"
                                        : "text-white/80 hover:bg-white/10 hover:text-white"
                                    }`}
                                  >
                                    <span className="size-1 shrink-0 rounded-full bg-current" aria-hidden />
                                    <span className="truncate">{child.label}</span>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        ) : null}
                      </li>
                    );
                  }

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileNavOpen(false)}
                        aria-current={isActive ? "page" : undefined}
                        className={`flex min-h-10 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                          isActive
                            ? "bg-[#ffd21f] text-[#09245d] shadow-md shadow-yellow-950/15"
                            : "text-white/90 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <Icon className="size-[18px] shrink-0" strokeWidth={2} />
                        <span className="truncate">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          className="flex h-14 shrink-0 items-center gap-3 border-t border-white/10 px-6 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
        >
          <LogOut className="size-[18px]" />
          Logout
        </button>
      </aside>

      {mobileNavOpen ? (
        <button
          type="button"
          aria-label="Close navigation overlay"
          className="fixed inset-0 z-30 bg-[#061a46]/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileNavOpen(false)}
        />
      ) : null}

      <div className="flex min-h-full min-w-0 flex-1 flex-col lg:pl-[272px]">
        <header className="sticky top-0 z-20 flex h-28 shrink-0 items-center gap-4 bg-gradient-to-br from-[#174fc1] to-[#062e7e] px-4 shadow-lg shadow-blue-950/20 md:px-6 xl:px-8">
          <button
            type="button"
            className="rounded-lg p-2 text-white/90 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
            onClick={() => setMobileNavOpen(true)}
            aria-label="Open navigation"
          >
            <Menu className="size-5" />
          </button>

          <div className="min-w-0 shrink-0">
            <div className="flex items-baseline gap-3">
              <h1 className="truncate text-xl font-bold tracking-tight text-white md:text-2xl">{pageMeta.title}</h1>
              <span className="hidden text-sm text-white/75 xl:inline">{pageMeta.description}</span>
            </div>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-3">
            <div className="relative hidden w-56 md:block">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#10172a]" />
              <input
                type="search"
                placeholder="Search..."
                onKeyDown={(event) => {
                  if (event.key !== "Enter") return;
                  event.preventDefault();
                  toast.info("Global search isn't wired to the backend yet.");
                }}
                className="h-9 w-full rounded-lg border border-transparent bg-white pr-3 pl-9 text-sm shadow-sm outline-none transition focus:border-[#0a43b8] focus:ring-3 focus:ring-blue-100"
              />
            </div>

            <button
              type="button"
              onClick={() => router.push("/alerts")}
              className="relative flex size-10 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/10 hover:text-white"
              aria-label={openAlertsCount > 0 ? `Open inventory alerts (${openAlertsCount} open)` : "Open inventory alerts"}
            >
              <Bell className="size-5" />
              {openAlertsCount > 0 && (
                <span className="absolute top-0.5 right-0.5 flex size-4 items-center justify-center">
                  <span className="absolute inset-0 animate-ping rounded-full bg-[#ffd21f]/75" aria-hidden />
                  <span className="relative flex size-4 items-center justify-center rounded-full bg-[#ffd21f] text-[9px] font-bold text-[#09245d] ring-2 ring-[#062e7e]">
                    {openAlertsCount > 9 ? "9+" : openAlertsCount}
                  </span>
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => toast.info("Account settings are not available yet.")}
              className="flex items-center gap-2 rounded-xl p-1.5 pr-2 transition-colors hover:bg-white/10"
              aria-label="Open account menu"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-white text-sm font-bold text-[#073b9f] shadow-sm">
                {initials}
              </span>
              <span className="hidden text-left leading-tight sm:block">
                <span className="block max-w-28 truncate text-sm font-semibold text-white">{displayName}</span>
                <span className="block text-xs text-white/75">Administrator</span>
              </span>
              <ChevronDown className="hidden size-4 text-white/75 sm:block" />
            </button>
          </div>
        </header>

        <main className="app-content min-w-0 flex-1 p-4 md:p-6 xl:p-7">{children}</main>
      </div>
    </div>
  );
}
