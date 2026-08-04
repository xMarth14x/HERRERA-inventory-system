"use client";

import { toast } from "sonner";
import { FileText, Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatDate, formatNumber } from "@/lib/format";
import type { StockIssue } from "@/lib/stock-issue-data";
import { IssueCategoryBadge } from "./issue-category-badge";

export function StockIssueDetailDialog({
  issue,
  onOpenChange,
}: {
  issue: StockIssue | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={issue !== null} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        {issue && (
          <>
            <DialogHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <DialogTitle className="font-mono text-lg">{issue.issueNumber}</DialogTitle>
                  <DialogDescription>
                    {issue.productName} ({issue.sku}) · {issue.location}
                  </DialogDescription>
                </div>
                <IssueCategoryBadge category={issue.category} />
              </div>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-3 rounded-lg border bg-muted/30 p-3 text-sm sm:grid-cols-3">
              <Field label="Product" value={issue.productName} />
              <Field label="Location" value={issue.location} />
              <Field label="Quantity" value={formatNumber(issue.quantity)} />
              <Field label="Department / Recipient" value={issue.departmentOrRecipient} />
              <Field label="Date" value={formatDate(issue.issuedAt)} />
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold">Issue Reason</h3>
              <p className="rounded-lg border bg-muted/30 p-3 text-sm text-muted-foreground">
                {issue.issueReason}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 rounded-lg border bg-muted/30 p-3 text-sm sm:grid-cols-3">
              <Field label="Requested By" value={issue.requestedBy || "—"} />
              <Field label="Approved By" value={issue.approvedBy || "—"} />
              <Field label="Released By" value={issue.releasedBy || "—"} />
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold">Supporting Document</h3>
              {issue.supportingDocument === null ? (
                <p className="text-sm text-muted-foreground">No supporting document.</p>
              ) : (
                <div className="flex items-center justify-between gap-3 rounded-md border px-3 py-2">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <FileText className="size-4 shrink-0 text-muted-foreground" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{issue.supportingDocument.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(issue.supportingDocument.uploadedAt)}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="icon-xs"
                    variant="ghost"
                    aria-label={`Download ${issue.supportingDocument.name}`}
                    onClick={() => toast.info("File storage isn't wired up yet.")}
                  >
                    <Download className="size-3.5" />
                  </Button>
                </div>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
