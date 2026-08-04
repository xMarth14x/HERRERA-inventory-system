import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface ModuleSection {
  heading: string;
  items?: string[];
  note?: string;
  example?: { label: string; value: string }[];
}

export function ModuleSections({ sections }: { sections: ModuleSection[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {sections.map((section) => (
        <Card key={section.heading} className="gap-3">
          <CardHeader>
            <CardTitle className="text-base font-semibold">{section.heading}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {section.items && (
              <ul className="grid grid-cols-1 gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 size-1 shrink-0 rounded-full bg-muted-foreground" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {section.example && (
              <dl className="flex flex-col gap-1.5 rounded-lg border bg-muted/30 p-3">
                {section.example.map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-4 text-sm">
                    <dt className="text-muted-foreground">{row.label}</dt>
                    <dd className="font-medium tabular-nums">{row.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {section.note && (
              <p className="rounded-lg border bg-muted/30 p-3 text-sm text-muted-foreground">
                {section.note}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
