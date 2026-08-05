import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { formatStatusLabel, statusColorForCode } from "@/lib/status-color";

export function StatusList({ codes }: { codes: string[] }) {
  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Statuses</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {codes.map((code) => (
          <StatusBadge key={code} color={statusColorForCode(code)} label={formatStatusLabel(code)} />
        ))}
      </CardContent>
    </Card>
  );
}
