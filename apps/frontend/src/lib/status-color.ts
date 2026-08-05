import {
  Archive,
  ArrowRightLeft,
  Ban,
  CheckCircle2,
  CircleDot,
  Clock3,
  FileText,
  PackageCheck,
  PackageOpen,
  Send,
  Truck,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import type { StatusColor } from "@/components/dashboard/status-badge";

// Maps a workflow status code to the project's fixed status-color scheme
// (spec §12): green=completed/approved/received, blue=active/informational,
// amber=pending/partial/warning, red=rejected/cancelled, gray=draft/archived,
// violet=transfer/in-transit.
export function statusColorForCode(code: string): StatusColor {
  if (code.includes("CANCELLED") || code.includes("REJECTED")) return "red";
  if (code.includes("DRAFT") || code === "CLOSED") return "gray";
  if (code.includes("PARTIALLY")) return "amber";
  if (code.includes("FOR_APPROVAL") || code.includes("SUBMITTED") || code.includes("PENDING")) {
    return "amber";
  }
  if (code.includes("IN_TRANSIT") || code.includes("PREPARING") || code.includes("DISPATCHED")) {
    return "violet";
  }
  if (
    code.includes("APPROVED") ||
    code.includes("FULLY_RECEIVED") ||
    code.includes("COMPLETED") ||
    code.includes("CONVERTED")
  ) {
    return "green";
  }
  return "blue";
}

/** "PARTIALLY_RECEIVED" -> "partially received" — the readable form shown in every status badge. */
export function formatStatusLabel(code: string): string {
  return code.replaceAll("_", " ").toLowerCase();
}

// A simple, recognizable icon per workflow status — used on status summary
// cards so each one reads at a glance instead of all sharing one dot.
export function statusIconForCode(code: string): LucideIcon {
  if (code.includes("CANCELLED")) return Ban;
  if (code.includes("REJECTED")) return XCircle;
  if (code.includes("DRAFT")) return FileText;
  if (code === "SUBMITTED") return Send;
  if (code.includes("FOR_APPROVAL")) return Clock3;
  if (code.includes("SENT_TO_SUPPLIER")) return Truck;
  if (code.includes("PARTIALLY_RECEIVED")) return PackageOpen;
  if (code.includes("FULLY_RECEIVED")) return PackageCheck;
  if (code.includes("CONVERTED")) return ArrowRightLeft;
  if (code.includes("APPROVED")) return CheckCircle2;
  if (code === "CLOSED") return Archive;
  return CircleDot;
}
