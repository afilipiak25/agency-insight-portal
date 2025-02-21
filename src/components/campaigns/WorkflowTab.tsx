
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { WorkflowStep } from "./workflow/types";
import { StepCard } from "./workflow/StepCard";
import { SidePanel } from "./workflow/SidePanel";
import { StepDialog } from "./workflow/StepDialog";

export const WorkflowTab = () => {
  const [selectedTab, setSelectedTab] = useState<"steps" | "conditions">("steps");
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([]);

  const handleAddStep = (step: WorkflowStep) => {
    setWorkflowSteps([...workflowSteps, step]);
    setActiveStep(null);
  };

  return (
    <TabsContent value="workflow" className="space-y-8 py-4">
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold flex items-center gap-2">
              Build my campaign manually
              <Badge variant="outline" className="bg-blue-50">
                <Share2 className="w-4 h-4 mr-1" />
                Flow
              </Badge>
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Start by choosing your sequence's first step
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={selectedTab === "steps" ? "default" : "outline"}
              onClick={() => setSelectedTab("steps")}
              className="font-medium"
            >
              Steps
            </Button>
            <Button
              variant={selectedTab === "conditions" ? "default" : "outline"}
              onClick={() => setSelectedTab("conditions")}
              className="font-medium"
            >
              Conditions
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          <div className="flex-1 space-y-4">
            {workflowSteps.length === 0 ? (
              <div 
                className="text-center py-12 border-2 border-dashed rounded-lg cursor-pointer hover:border-violet-300 transition-colors"
                onClick={() => setActiveStep("new")}
              >
                <p className="text-gray-500">Click here to add your first step</p>
              </div>
            ) : (
              <div className="space-y-4">
                {workflowSteps.map((step, index) => (
                  <StepCard
                    key={`${step.id}-${index}`}
                    step={step}
                    index={index}
                    onAddClick={setActiveStep}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="w-80 shrink-0">
            <SidePanel />
          </div>
        </div>
      </div>

      <StepDialog 
        isOpen={activeStep !== null}
        onClose={() => setActiveStep(null)}
        onStepSelect={handleAddStep}
      />
    </TabsContent>
  );
};
