"use client";

import { Fingerprint, LockKeyhole, Monitor, Network, UserRound } from "lucide-react";

import { AuditResultBadge, SensitiveBadge } from "@/components/audit-logs/audit-log-badges";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAuditActionLabel, type AuditLogEntry } from "@/lib/audit-log-data";

const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

export function AuditLogDetailDialog({
  entry,
  onOpenChange,
}: {
  entry: AuditLogEntry | null;
  onOpenChange: (open: boolean) => void;
}) {
  if (!entry) return <Dialog open={false} onOpenChange={onOpenChange} />;

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <div className="flex flex-wrap items-start justify-between gap-3 pr-8">
            <div>
              <DialogTitle className="text-lg">{getAuditActionLabel(entry.action)}</DialogTitle>
              <DialogDescription className="mt-1 font-mono">{entry.id}</DialogDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <SensitiveBadge sensitive={entry.sensitive} />
              <AuditResultBadge result={entry.result} />
            </div>
          </div>
        </DialogHeader>

        <div className="grid gap-3 rounded-lg border bg-muted/30 p-3 sm:grid-cols-2 lg:grid-cols-4">
          <DetailField icon={UserRound} label="User" value={entry.user} />
          <DetailField label="Module" value={entry.module} />
          <DetailField label="Record type" value={entry.recordType} />
          <DetailField icon={Fingerprint} label="Record ID" value={entry.recordId} mono />
        </div>

        <section>
          <h3 className="mb-2 text-sm font-semibold">Reason</h3>
          <p className="rounded-lg border p-3 text-sm leading-5 text-muted-foreground">{entry.reason}</p>
        </section>

        <section>
          <div className="mb-2 flex items-center justify-between gap-3">
            <h3 className="text-sm font-semibold">Recorded changes</h3>
            <Badge variant="outline">{entry.changes.length} {entry.changes.length === 1 ? "field" : "fields"}</Badge>
          </div>
          {entry.changes.length === 0 ? (
            <p className="rounded-lg border p-4 text-center text-sm text-muted-foreground">
              This event did not modify record values.
            </p>
          ) : (
            <div className="overflow-hidden rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Field</TableHead>
                    <TableHead>Previous value</TableHead>
                    <TableHead>New value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entry.changes.map((change) => (
                    <TableRow key={change.field}>
                      <TableCell className="font-medium">{change.field}</TableCell>
                      <TableCell className="text-red-700">{change.previousValue}</TableCell>
                      <TableCell className="text-emerald-700">{change.newValue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </section>

        <section>
          <h3 className="mb-2 text-sm font-semibold">Request information</h3>
          <div className="grid gap-3 sm:grid-cols-3">
            <DetailField icon={Network} label="IP address" value={entry.ipAddress} mono />
            <DetailField icon={Monitor} label="Device" value={entry.device} />
            <DetailField label="Date and time" value={dateTimeFormatter.format(new Date(entry.occurredAt))} />
          </div>
        </section>

        <div className="flex items-start gap-2 rounded-lg border border-blue-600/20 bg-blue-50 p-3 text-blue-900">
          <LockKeyhole className="mt-0.5 size-4 shrink-0" />
          <p className="text-xs leading-5">
            Audit events are immutable. They cannot be edited or deleted after being recorded.
          </p>
        </div>

        <DialogFooter showCloseButton />
      </DialogContent>
    </Dialog>
  );
}

function DetailField({
  icon: Icon,
  label,
  value,
  mono = false,
}: {
  icon?: typeof UserRound;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-lg border bg-background p-3">
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {Icon ? <Icon className="size-3.5" /> : null}
        {label}
      </p>
      <p className={`mt-1 break-words font-medium ${mono ? "font-mono text-xs" : ""}`}>{value}</p>
    </div>
  );
}
