"use client";

import { CheckCircle2, ClipboardCheck, MapPin, RotateCcw, Tag } from "lucide-react";
import { toast } from "sonner";

import {
  AlertSeverityBadge,
  AlertStatusBadge,
} from "@/components/inventory-alerts/inventory-alert-badges";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDate } from "@/lib/format";
import type { InventoryAlert } from "@/lib/inventory-alert-data";

export function InventoryAlertDetailDialog({
  alert,
  onOpenChange,
  onUpdate,
}: {
  alert: InventoryAlert | null;
  onOpenChange: (open: boolean) => void;
  onUpdate: (alert: InventoryAlert) => void;
}) {
  if (!alert) return <Dialog open={false} onOpenChange={onOpenChange} />;

  const currentAlert = alert;

  function acknowledge() {
    onUpdate({ ...currentAlert, status: "ACKNOWLEDGED", acknowledgedBy: "L. Herrera", read: true });
    toast.success(`${currentAlert.id} acknowledged.`);
  }

  function resolve() {
    onUpdate({
      ...currentAlert,
      status: "RESOLVED",
      acknowledgedBy: currentAlert.acknowledgedBy || "L. Herrera",
      resolvedBy: "L. Herrera",
      read: true,
    });
    toast.success(`${currentAlert.id} marked as resolved.`);
  }

  function reopen() {
    onUpdate({ ...currentAlert, status: "OPEN", acknowledgedBy: "", resolvedBy: "", read: true });
    toast.success(`${currentAlert.id} reopened.`);
  }

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex flex-wrap items-start justify-between gap-3 pr-8">
            <div className="min-w-0">
              <DialogTitle className="text-lg">{currentAlert.title}</DialogTitle>
              <DialogDescription className="mt-1 font-mono">{currentAlert.id}</DialogDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <AlertSeverityBadge severity={currentAlert.severity} />
              <AlertStatusBadge status={currentAlert.status} />
            </div>
          </div>
        </DialogHeader>

        <div className="rounded-lg border bg-muted/30 p-4">
          <p className="text-sm leading-6">{currentAlert.message}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <DetailField icon={Tag} label="Alert type" value={currentAlert.type} />
          <DetailField icon={MapPin} label="Location" value={currentAlert.location} />
          <DetailField icon={ClipboardCheck} label="Reference" value={currentAlert.reference} />
          <DetailField label="Triggered" value={formatDate(currentAlert.triggeredAt)} />
          <DetailField label="Current value" value={currentAlert.currentValue} />
          <DetailField label="Rule / threshold" value={currentAlert.threshold} />
        </div>

        <div className="rounded-lg border border-blue-600/20 bg-blue-50 p-4 text-blue-900">
          <h3 className="text-sm font-semibold">Recommended action</h3>
          <p className="mt-1 text-sm leading-5">{currentAlert.recommendedAction}</p>
        </div>

        {(currentAlert.acknowledgedBy || currentAlert.resolvedBy) && (
          <div className="grid gap-3 rounded-lg border p-3 text-sm sm:grid-cols-2">
            <div>
              <p className="text-xs text-muted-foreground">Acknowledged by</p>
              <p className="font-medium">{currentAlert.acknowledgedBy || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Resolved by</p>
              <p className="font-medium">{currentAlert.resolvedBy || "—"}</p>
            </div>
          </div>
        )}

        <DialogFooter showCloseButton>
          {currentAlert.status === "OPEN" && (
            <Button type="button" variant="outline" onClick={acknowledge}>
              <ClipboardCheck className="size-4" />
              Acknowledge
            </Button>
          )}
          {currentAlert.status !== "RESOLVED" && (
            <Button type="button" onClick={resolve}>
              <CheckCircle2 className="size-4" />
              Mark resolved
            </Button>
          )}
          {currentAlert.status === "RESOLVED" && (
            <Button type="button" variant="outline" onClick={reopen}>
              <RotateCcw className="size-4" />
              Reopen alert
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DetailField({
  icon: Icon,
  label,
  value,
}: {
  icon?: typeof Tag;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border p-3">
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {Icon && <Icon className="size-3.5" />}
        {label}
      </p>
      <p className="mt-1 font-medium">{value}</p>
    </div>
  );
}
