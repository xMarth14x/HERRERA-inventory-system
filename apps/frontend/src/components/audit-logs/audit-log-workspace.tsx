"use client";

import { useMemo, useState } from "react";
import { Activity, Download, Search, ShieldAlert, TriangleAlert, UsersRound } from "lucide-react";
import { toast } from "sonner";

import { AuditLogDetailDialog } from "@/components/audit-logs/audit-log-detail-dialog";
import { AuditResultBadge, SensitiveBadge } from "@/components/audit-logs/audit-log-badges";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatNumber } from "@/lib/format";
import {
  AUDIT_LOGS,
  AUDIT_MODULES,
  getAuditActionLabel,
} from "@/lib/audit-log-data";
import { cn } from "@/lib/utils";

const ALL = "__all__";
const AUDIT_NOW = new Date("2026-08-04T23:59:59+08:00").getTime();
const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

export function AuditLogWorkspace() {
  const [search, setSearch] = useState("");
  const [moduleFilter, setModuleFilter] = useState(ALL);
  const [userFilter, setUserFilter] = useState(ALL);
  const [resultFilter, setResultFilter] = useState(ALL);
  const [sensitivityFilter, setSensitivityFilter] = useState(ALL);
  const [periodFilter, setPeriodFilter] = useState("30");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const users = useMemo(() => [...new Set(AUDIT_LOGS.map((entry) => entry.user))].sort(), []);
  const selectedEntry = AUDIT_LOGS.find((entry) => entry.id === selectedId) ?? null;
  const filteredEntries = useMemo(() => {
    const term = search.trim().toLowerCase();
    const periodDays = periodFilter === ALL ? null : Number(periodFilter);
    return AUDIT_LOGS.filter((entry) => {
      if (moduleFilter !== ALL && entry.module !== moduleFilter) return false;
      if (userFilter !== ALL && entry.user !== userFilter) return false;
      if (resultFilter !== ALL && entry.result !== resultFilter) return false;
      if (sensitivityFilter === "sensitive" && !entry.sensitive) return false;
      if (sensitivityFilter === "standard" && entry.sensitive) return false;
      if (periodDays !== null) {
        const ageDays = (AUDIT_NOW - new Date(entry.occurredAt).getTime()) / 86_400_000;
        if (ageDays > periodDays) return false;
      }
      if (!term) return true;
      return [
        entry.id,
        entry.user,
        entry.action,
        entry.module,
        entry.recordType,
        entry.recordId,
        entry.reason,
        entry.ipAddress,
        entry.device,
      ]
        .join(" ")
        .toLowerCase()
        .includes(term);
    });
  }, [moduleFilter, periodFilter, resultFilter, search, sensitivityFilter, userFilter]);

  const sensitiveCount = AUDIT_LOGS.filter((entry) => entry.sensitive).length;
  const failedCount = AUDIT_LOGS.filter((entry) => entry.result === "FAILED").length;
  const uniqueUsers = new Set(AUDIT_LOGS.map((entry) => entry.user)).size;

  function exportCsv() {
    const escapeCsv = (value: string) => /[",\n]/.test(value) ? `"${value.replaceAll('"', '""')}"` : value;
    const headers = ["Event ID", "Date and time", "User", "Action", "Module", "Record type", "Record ID", "Previous and new values", "Reason", "IP address", "Device", "Result", "Sensitive"];
    const rows = filteredEntries.map((entry) => [
      entry.id,
      entry.occurredAt,
      entry.user,
      entry.action,
      entry.module,
      entry.recordType,
      entry.recordId,
      entry.changes.map((change) => `${change.field}: ${change.previousValue} -> ${change.newValue}`).join("; "),
      entry.reason,
      entry.ipAddress,
      entry.device,
      entry.result,
      entry.sensitive ? "Yes" : "No",
    ].map(escapeCsv).join(","));
    const blob = new Blob([[headers.join(","), ...rows].join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "audit-logs-2026-08-04.csv";
    anchor.click();
    URL.revokeObjectURL(url);
    toast.success(`${filteredEntries.length} audit ${filteredEntries.length === 1 ? "event" : "events"} exported.`);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Audit Logs</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Review immutable user activity, record changes, security events, approvals, and system configuration changes.
          </p>
        </div>
        <Button onClick={exportCsv} disabled={filteredEntries.length === 0}>
          <Download className="size-4" />
          Export audit log
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard icon={Activity} label="Total events" value={AUDIT_LOGS.length} detail="Immutable activity records" tone="blue" />
        <SummaryCard icon={ShieldAlert} label="Sensitive events" value={sensitiveCount} detail="Protected activities" tone="amber" />
        <SummaryCard icon={TriangleAlert} label="Failed events" value={failedCount} detail="Security review required" tone="red" />
        <SummaryCard icon={UsersRound} label="Unique users" value={uniqueUsers} detail="Recorded actors" tone="green" />
      </div>

      <Card className="gap-3">
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-wrap items-end gap-3">
            <div className="relative min-w-64 flex-1">
              <Label htmlFor="audit-search" className="mb-1.5 block text-xs text-muted-foreground">
                Search
              </Label>
              <Search className="pointer-events-none absolute top-[34px] left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="audit-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search event, user, action, record, IP, or device…"
                className="h-9 w-full rounded-lg border border-input bg-transparent pr-3 pl-8 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </div>

            <FilterSelect label="Period" value={periodFilter} onChange={setPeriodFilter}>
              <SelectItem value="1">Today</SelectItem>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value={ALL}>All time</SelectItem>
            </FilterSelect>

            <FilterSelect label="Module" value={moduleFilter} onChange={setModuleFilter} className="min-w-48">
              <SelectItem value={ALL}>All modules</SelectItem>
              {AUDIT_MODULES.map((module) => (
                <SelectItem key={module} value={module}>{module}</SelectItem>
              ))}
            </FilterSelect>

            <FilterSelect label="User" value={userFilter} onChange={setUserFilter} className="min-w-44">
              <SelectItem value={ALL}>All users</SelectItem>
              {users.map((user) => (
                <SelectItem key={user} value={user}>{user}</SelectItem>
              ))}
            </FilterSelect>

            <FilterSelect label="Result" value={resultFilter} onChange={setResultFilter}>
              <SelectItem value={ALL}>All results</SelectItem>
              <SelectItem value="SUCCESS">Success</SelectItem>
              <SelectItem value="FAILED">Failed</SelectItem>
            </FilterSelect>

            <FilterSelect label="Activity" value={sensitivityFilter} onChange={setSensitivityFilter}>
              <SelectItem value={ALL}>All activity</SelectItem>
              <SelectItem value="sensitive">Sensitive only</SelectItem>
              <SelectItem value="standard">Standard only</SelectItem>
            </FilterSelect>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date and time</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Module</TableHead>
                  <TableHead>Record</TableHead>
                  <TableHead>IP address</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Result</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEntries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                      No audit events match the current filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEntries.map((entry) => (
                    <TableRow
                      key={entry.id}
                      className="cursor-pointer"
                      onClick={() => setSelectedId(entry.id)}
                      onKeyDown={(event) => {
                        if (event.key !== "Enter" && event.key !== " ") return;
                        event.preventDefault();
                        setSelectedId(entry.id);
                      }}
                      tabIndex={0}
                      aria-label={`View audit event ${entry.id}`}
                    >
                      <TableCell className="whitespace-nowrap">
                        <p>{dateTimeFormatter.format(new Date(entry.occurredAt))}</p>
                        <p className="font-mono text-xs text-muted-foreground">{entry.id}</p>
                      </TableCell>
                      <TableCell className="font-medium">{entry.user}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{getAuditActionLabel(entry.action)}</Badge>
                      </TableCell>
                      <TableCell>{entry.module}</TableCell>
                      <TableCell>
                        <p>{entry.recordType}</p>
                        <p className="font-mono text-xs text-muted-foreground">{entry.recordId}</p>
                      </TableCell>
                      <TableCell className="font-mono text-xs">{entry.ipAddress}</TableCell>
                      <TableCell><SensitiveBadge sensitive={entry.sensitive} /></TableCell>
                      <TableCell><AuditResultBadge result={entry.result} /></TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between border-t pt-3 text-xs text-muted-foreground">
            <span>{filteredEntries.length} {filteredEntries.length === 1 ? "event" : "events"}</span>
            <span>Audit records are view-only and cannot be deleted</span>
          </div>
        </CardContent>
      </Card>

      <AuditLogDetailDialog
        entry={selectedEntry}
        onOpenChange={(open) => {
          if (!open) setSelectedId(null);
        }}
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
        <SelectTrigger className={cn("min-w-36", className)}><SelectValue /></SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  detail,
  tone,
}: {
  icon: typeof Activity;
  label: string;
  value: number;
  detail: string;
  tone: "blue" | "amber" | "red" | "green";
}) {
  const tones = {
    blue: "bg-blue-50 text-blue-700",
    amber: "bg-amber-50 text-amber-800",
    red: "bg-red-50 text-red-700",
    green: "bg-emerald-50 text-emerald-700",
  };
  return (
    <Card size="sm">
      <CardContent className="flex items-center gap-3">
        <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-lg", tones[tone])}>
          <Icon className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-xl font-semibold tabular-nums">{formatNumber(value)}</p>
          <p className="truncate text-xs text-muted-foreground">{detail}</p>
        </div>
      </CardContent>
    </Card>
  );
}
