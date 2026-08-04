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
