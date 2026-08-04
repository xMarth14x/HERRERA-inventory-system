import { WorkflowSteps } from "./workflow-steps";
import { StatusList } from "./status-list";
import { ModuleSections, type ModuleSection } from "./module-sections";

export function ModuleSubsection({
  heading,
  workflow,
  statuses,
  sections,
}: {
  heading: string;
  workflow?: string[];
  statuses?: string[];
  sections: ModuleSection[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="border-b pb-2 text-lg font-semibold">{heading}</h2>
      {workflow && <WorkflowSteps steps={workflow} />}
      {statuses && <StatusList codes={statuses} />}
      <ModuleSections sections={sections} />
    </div>
  );
}
