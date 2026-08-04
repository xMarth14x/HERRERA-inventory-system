import { WorkflowSteps } from "./workflow-steps";
import { StatusList } from "./status-list";
import { ModuleSections, type ModuleSection } from "./module-sections";

export interface ModuleContent {
  title: string;
  description: string;
  workflow?: string[];
  statuses?: string[];
  sections: ModuleSection[];
}

export function ModuleSpecPage({ content }: { content: ModuleContent }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">{content.title}</h1>
        <p className="max-w-3xl text-sm text-muted-foreground">{content.description}</p>
      </div>

      {content.workflow && <WorkflowSteps steps={content.workflow} />}
      {content.statuses && <StatusList codes={content.statuses} />}

      <ModuleSections sections={content.sections} />
    </div>
  );
}
