import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function WorkflowSteps({ steps }: { steps: string[] }) {
  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Workflow</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
          {steps.map((step, index) => (
            <li key={step} className="flex items-center gap-2">
              <span className="rounded-full border bg-muted/50 px-3 py-1.5 text-sm font-medium">
                {step}
              </span>
              {index < steps.length - 1 && (
                <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
              )}
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
