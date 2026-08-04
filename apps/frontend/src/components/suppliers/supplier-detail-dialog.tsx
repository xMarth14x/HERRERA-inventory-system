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
import { StatusBadge, type StatusColor } from "@/components/dashboard/status-badge";
import { formatCurrency, formatDate, formatNumber } from "@/lib/format";
import type { Supplier, SupplierDocument } from "@/lib/supplier-data";

const DOCUMENT_COLOR: Record<SupplierDocument["type"], StatusColor> = {
  Quotation: "blue",
  Contract: "violet",
  "Price List": "green",
  "Tax Document": "amber",
  Accreditation: "gray",
};

const BANK_STATUS_COLOR: Record<Supplier["bankDetails"]["status"], StatusColor> = {
  Verified: "green",
  Pending: "amber",
  Unverified: "red",
};

export function SupplierDetailDialog({
  supplier,
  onOpenChange,
}: {
  supplier: Supplier | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={supplier !== null} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        {supplier && (
          <>
            <DialogHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <DialogTitle className="text-lg">{supplier.name}</DialogTitle>
                  <DialogDescription>{supplier.code}</DialogDescription>
                </div>
                <StatusBadge
                  color={supplier.status === "Active" ? "green" : "gray"}
                  label={supplier.status}
                />
              </div>
            </DialogHeader>

            <div className="flex flex-col gap-4">
              <Section heading="Contact">
                <FieldGrid
                  fields={[
                    { label: "Contact Person", value: supplier.contact.name },
                    { label: "Phone", value: supplier.contact.phone },
                    { label: "Email", value: supplier.contact.email },
                  ]}
                />
              </Section>

              <Section heading="Address &amp; Tax Information">
                <FieldGrid
                  fields={[
                    { label: "Address", value: supplier.address },
                    { label: "Tax Information", value: supplier.taxId },
                  ]}
                />
              </Section>

              <Section heading="Payment Terms &amp; Delivery">
                <FieldGrid
                  fields={[
                    { label: "Payment Terms", value: supplier.paymentTerms },
                    { label: "Delivery Lead Time", value: `${supplier.deliveryLeadTimeDays} days` },
                  ]}
                />
              </Section>

              <Section heading="Supplied Products">
                <div className="flex flex-wrap gap-1.5">
                  {supplier.suppliedProducts.map((product) => (
                    <span
                      key={product}
                      className="rounded-full border bg-muted/30 px-2.5 py-1 text-xs font-medium"
                    >
                      {product}
                    </span>
                  ))}
                </div>
              </Section>

              <Section heading="Bank Details &amp; Status">
                <div className="flex items-center justify-between gap-3 rounded-lg border bg-muted/30 p-3">
                  <FieldGrid
                    fields={[
                      { label: "Bank Name", value: supplier.bankDetails.bankName },
                      { label: "Account Name", value: supplier.bankDetails.accountName },
                      { label: "Account Number", value: supplier.bankDetails.accountNumber },
                    ]}
                  />
                  <StatusBadge
                    color={BANK_STATUS_COLOR[supplier.bankDetails.status]}
                    label={supplier.bankDetails.status}
                  />
                </div>
              </Section>

              <Section heading="Purchase &amp; Performance History">
                <div className="grid grid-cols-2 gap-3 rounded-lg border bg-muted/30 p-3 sm:grid-cols-3">
                  <Stat label="Purchase Orders" value={formatNumber(supplier.performance.totalPurchaseOrders)} />
                  <Stat
                    label="Total Purchase Value"
                    value={formatCurrency(supplier.performance.totalPurchaseValue)}
                  />
                  <Stat
                    label="On-Time Delivery"
                    value={`${supplier.performance.onTimeDeliveryRate}%`}
                  />
                  <Stat
                    label="Avg. Lead Time"
                    value={`${supplier.performance.averageLeadTimeDays}d`}
                  />
                  <Stat label="Last Order" value={formatDate(supplier.performance.lastOrderDate)} />
                </div>
              </Section>

              <Section heading="Quotations, Contracts, Price Lists, Tax Documents &amp; Accreditation">
                <div className="flex flex-col gap-1.5">
                  {supplier.documents.map((doc) => (
                    <div
                      key={doc.name}
                      className="flex items-center justify-between gap-3 rounded-md border px-3 py-2"
                    >
                      <div className="flex min-w-0 items-center gap-2.5">
                        <FileText className="size-4 shrink-0 text-muted-foreground" />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(doc.uploadedAt)}</p>
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <StatusBadge color={DOCUMENT_COLOR[doc.type]} label={doc.type} />
                        <Button
                          size="icon-xs"
                          variant="ghost"
                          aria-label={`Download ${doc.name}`}
                          onClick={() => toast.info("File storage isn't wired up yet.")}
                        >
                          <Download className="size-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-semibold">{heading}</h3>
      {children}
    </div>
  );
}

function FieldGrid({ fields }: { fields: { label: string; value: string }[] }) {
  return (
    <div className="grid flex-1 grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
      {fields.map((field) => (
        <div key={field.label} className="flex flex-col">
          <span className="text-xs text-muted-foreground">{field.label}</span>
          <span className="font-medium">{field.value}</span>
        </div>
      ))}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-sm font-semibold tabular-nums">{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}
