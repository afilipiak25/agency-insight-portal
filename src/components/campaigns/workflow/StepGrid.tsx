
import { Card } from "@/components/ui/card";
import { WorkflowStep, WorkflowCondition } from "./types";

interface StepGridProps<T extends WorkflowStep | WorkflowCondition> {
  title: string;
  steps: T[];
  onStepClick: (step: T) => void;
}

export const StepGrid = <T extends WorkflowStep | WorkflowCondition>({ 
  title, 
  steps, 
  onStepClick 
}: StepGridProps<T>) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-500 mb-4">{title}</h3>
      <div className="grid grid-cols-4 gap-4">
        {steps.map((step) => (
          <Card 
            key={step.id}
            className="p-4 cursor-pointer hover:border-violet-200 hover:shadow-md transition-all group"
            onClick={() => onStepClick(step)}
          >
            <div className="space-y-3">
              <div className="p-2 bg-gray-50 rounded-lg w-fit group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <div>
                <div className="font-medium">{step.title}</div>
                <div className="text-sm text-gray-500">{step.description}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
