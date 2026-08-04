import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { StatusColor } from "./status-badge";

const ICON_TONE_CLASSES: Record<StatusColor, string> = {
  green: "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white",
  blue: "bg-gradient-to-br from-[#174fc1] to-[#073b9f] text-white",
  amber: "bg-gradient-to-br from-[#ffd62a] to-[#ffbc00] text-white",
  red: "bg-gradient-to-br from-[#f32a3f] to-[#df1229] text-white",
  gray: "bg-gradient-to-br from-slate-500 to-slate-700 text-white",
  violet: "bg-gradient-to-br from-violet-500 to-violet-700 text-white",
};

const ACCENT_TONE_CLASSES: Record<StatusColor, string> = {
  green: "bg-emerald-500",
  blue: "bg-[#0a43b8]",
  amber: "bg-[#ffca0a]",
  red: "bg-[#ed1b2f]",
  gray: "bg-slate-500",
  violet: "bg-violet-600",
};

export interface KpiSecondaryStat {
  label: string;
  value: string;
  tone?: StatusColor;
}

const SECONDARY_TEXT_CLASSES: Record<StatusColor, string> = {
  green: "text-emerald-600",
  blue: "text-blue-600",
  amber: "text-amber-700",
  red: "text-red-600",
  gray: "text-foreground",
  violet: "text-violet-600",
};

export function KpiCard({
  icon: Icon,
  label,
  value,
  tone = "blue",
  secondary,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  tone?: StatusColor;
  secondary?: KpiSecondaryStat[];
}) {
  return (
    <Card className="relative gap-3 py-4">
      <CardContent className="flex items-center gap-4 px-4">
        <span className={`flex size-14 shrink-0 items-center justify-center rounded-full shadow-md ${ICON_TONE_CLASSES[tone]}`}>
          <Icon className="size-6" strokeWidth={2.1} />
        </span>

        <div className="min-w-0 flex-1">
          <span className="text-[11px] font-semibold tracking-wide text-[#33405d] uppercase">{label}</span>
          <span className="mt-1 block font-sans text-2xl font-bold tracking-tight text-[#10172a]">{value}</span>

          {secondary && secondary.length > 0 ? (
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
              {secondary.map((stat) => (
                <span key={stat.label} className="text-xs text-muted-foreground">
                  <strong className={SECONDARY_TEXT_CLASSES[stat.tone ?? "gray"]}>{stat.value}</strong> {stat.label}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </CardContent>
      <span className={`absolute inset-x-0 bottom-0 h-1 ${ACCENT_TONE_CLASSES[tone]}`} aria-hidden />
    </Card>
  );
}
