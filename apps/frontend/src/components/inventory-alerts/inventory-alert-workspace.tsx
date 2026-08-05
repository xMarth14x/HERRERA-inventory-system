"use client";

import { useEffect, useMemo, useState } from "react";
import { BellRing, CheckCircle2, CircleAlert, Eye, Search, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

import {
  AlertSeverityBadge,
  AlertStatusBadge,
} from "@/components/inventory-alerts/inventory-alert-badges";
import { InventoryAlertDetailDialog } from "@/components/inventory-alerts/inventory-alert-detail-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SummaryCard } from "@/components/shared/summary-card";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate, formatNumber } from "@/lib/format";
import {
  INVENTORY_ALERT_TYPES,
  type InventoryAlert,
  type InventoryAlertSeverity,
  type InventoryAlertStatus,
} from "@/lib/inventory-alert-data";
import { useInventoryAlerts, useSetInventoryAlerts } from "@/lib/use-inventory-alerts";
import { cn } from "@/lib/utils";

const ALL = "__all__";

export function InventoryAlertWorkspace() {
  const alerts = useInventoryAlerts();
  const setAlerts = useSetInventoryAlerts();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState(ALL);
  const [severityFilter, setSeverityFilter] = useState(ALL);
  const [statusFilter, setStatusFilter] = useState(ALL);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const pageSize = 10;

  const selectedAlert = alerts.find((alert) => alert.id === selectedId) ?? null;
  const filteredAlerts = useMemo(() => {
    const term = search.trim().toLowerCase();
    return alerts.filter((alert) => {
      if (typeFilter !== ALL && alert.type !== typeFilter) return false;
      if (severityFilter !== ALL && alert.severity !== severityFilter) return false;
      if (statusFilter !== ALL && alert.status !== statusFilter) return false;
      if (!term) return true;
      return [alert.id, alert.type, alert.title, alert.location, alert.reference]
        .join(" ")
        .toLowerCase()
        .includes(term);
    });
  }, [alerts, search, severityFilter, statusFilter, typeFilter]);

  useEffect(() => {
    setPage(0);
  }, [search, severityFilter, statusFilter, typeFilter]);

  const pageCount = Math.max(1, Math.ceil(filteredAlerts.length / pageSize));
  const pagedAlerts = filteredAlerts.slice(page * pageSize, page * pageSize + pageSize);

  const openCount = alerts.filter((alert) => alert.status === "OPEN").length;
  const criticalCount = alerts.filter(
    (alert) => alert.severity === "CRITICAL" && alert.status !== "RESOLVED",
  ).length;
  const unreadCount = alerts.filter((alert) => !alert.read).length;
  const resolvedCount = alerts.filter((alert) => alert.status === "RESOLVED").length;

  function openAlert(id: string) {
    setAlerts((current) => current.map((alert) => (alert.id === id ? { ...alert, read: true } : alert)));
    setSelectedId(id);
  }

  function updateAlert(updatedAlert: InventoryAlert) {
    setAlerts((current) => current.map((alert) => (alert.id === updatedAlert.id ? updatedAlert : alert)));
  }

  function markAllRead() {
    if (unreadCount === 0) {
      toast.info("All alerts are already marked as read.");
      return;
    }
    setAlerts((current) => current.map((alert) => ({ ...alert, read: true })));
    toast.success(`${unreadCount} ${unreadCount === 1 ? "alert" : "alerts"} marked as read.`);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Inventory Alerts</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Monitor stock risks, purchasing delays, transfer exceptions, adjustments, and unresolved count variances.
          </p>
        </div>
        <Button variant="outline" onClick={markAllRead}>
          <Eye className="size-4" />
          Mark all as read
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard icon={CircleAlert} label="Open Alerts" value={formatNumber(openCount)} detail="Needs attention" tone="red" />
        <SummaryCard icon={ShieldAlert} label="Critical" value={formatNumber(criticalCount)} detail="Unresolved critical alerts" tone="red" />
        <SummaryCard icon={BellRing} label="Unread" value={formatNumber(unreadCount)} detail="New alert activity" tone="blue" />
        <SummaryCard icon={CheckCircle2} label="Resolved" value={formatNumber(resolvedCount)} detail="Closed alerts" tone="green" />
      </div>

      <Card className="gap-3">
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-wrap items-end gap-3">
            <div className="relative min-w-64 flex-1">
              <Label htmlFor="inventory-alert-search" className="mb-1.5 block text-xs text-muted-foreground">
                Search
              </Label>
              <Search className="pointer-events-none absolute top-[34px] left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="inventory-alert-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search alert, product, location, or reference…"
                className="h-9 w-full rounded-lg border border-input bg-transparent pr-3 pl-8 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </div>

            <FilterSelect label="Alert type" value={typeFilter} onChange={setTypeFilter} className="min-w-52">
              <SelectItem value={ALL}>All alert types</SelectItem>
              {INVENTORY_ALERT_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </FilterSelect>

            <FilterSelect label="Severity" value={severityFilter} onChange={setSeverityFilter}>
              <SelectItem value={ALL}>All severities</SelectItem>
              {(["CRITICAL", "WARNING", "INFO"] as InventoryAlertSeverity[]).map((severity) => (
                <SelectItem key={severity} value={severity}>
                  {severity.charAt(0) + severity.slice(1).toLowerCase()}
                </SelectItem>
              ))}
            </FilterSelect>

            <FilterSelect label="Status" value={statusFilter} onChange={setStatusFilter}>
              <SelectItem value={ALL}>All statuses</SelectItem>
              {(["OPEN", "ACKNOWLEDGED", "RESOLVED"] as InventoryAlertStatus[]).map((status) => (
                <SelectItem key={status} value={status}>
                  {status.charAt(0) + status.slice(1).toLowerCase()}
                </SelectItem>
              ))}
            </FilterSelect>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-72">Alert</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Location / reference</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAlerts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                      No alerts match your filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  pagedAlerts.map((alert) => (
                    <TableRow
                      key={alert.id}
                      className={cn("cursor-pointer", !alert.read && "bg-blue-50/50 hover:bg-blue-50")}
                      onClick={() => openAlert(alert.id)}
                      onKeyDown={(event) => {
                        if (event.key !== "Enter" && event.key !== " ") return;
                        event.preventDefault();
                        openAlert(alert.id);
                      }}
                      tabIndex={0}
                      aria-label={`Open ${alert.id}: ${alert.title}`}
                    >
                      <TableCell>
                        <div className="flex items-start gap-2.5">
                          <span
                            className={cn(
                              "mt-1.5 size-2 shrink-0 rounded-full",
                              alert.read ? "bg-transparent" : "bg-blue-600",
                            )}
                            aria-label={alert.read ? "Read" : "Unread"}
                          />
                          <div className="min-w-0">
                            <p className="font-medium">{alert.title}</p>
                            <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{alert.message}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{alert.type}</TableCell>
                      <TableCell>
                        <p>{alert.location}</p>
                        <p className="font-mono text-xs text-muted-foreground">{alert.reference}</p>
                      </TableCell>
                      <TableCell>
                        <AlertSeverityBadge severity={alert.severity} />
                      </TableCell>
                      <TableCell>
                        <AlertStatusBadge status={alert.status} />
                      </TableCell>
                      <TableCell className="whitespace-nowrap">{formatDate(alert.triggeredAt)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <DataTablePagination
            page={page}
            pageCount={pageCount}
            pageSize={pageSize}
            totalRows={filteredAlerts.length}
            onPageChange={setPage}
          />
        </CardContent>
      </Card>

      <InventoryAlertDetailDialog
        alert={selectedAlert}
        onOpenChange={(open) => {
          if (!open) setSelectedId(null);
        }}
        onUpdate={updateAlert}
      />
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  children,
  className,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Select value={value} onValueChange={(nextValue) => nextValue && onChange(nextValue)}>
        <SelectTrigger className={cn("min-w-36", className)}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    </div>
  );
}
