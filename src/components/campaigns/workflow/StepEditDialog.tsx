
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { WorkflowStep } from "../types/workflow";
import { StepEditTabs } from "./stepEdit/StepEditTabs";
import { StepHeader } from "./stepEdit/StepHeader";

interface StepEditDialogProps {
  selectedStepId: number | null;
  steps: WorkflowStep[];
  updateSteps: (newSteps: WorkflowStep[]) => void;
  updateWaitDays: (stepId: number, increment: boolean) => void;
}

export const StepEditDialog = ({ 
  selectedStepId, 
  steps, 
  updateSteps,
  updateWaitDays 
}: StepEditDialogProps) => {
  const selectedStep = selectedStepId ? steps.find(s => s.id === selectedStepId) : null;
  const [activeTab, setActiveTab] = useState<string>("content");
  const [localPromptTemplate, setLocalPromptTemplate] = useState<string>("");
  const [localTitle, setLocalTitle] = useState<string>("");
  
  // Initialize local state when the selected step changes
  useEffect(() => {
    if (selectedStep) {
      setLocalPromptTemplate(selectedStep.promptTemplate || "");
      setLocalTitle(selectedStep.title || "");
    }
  }, [selectedStep]);
  
  if (!selectedStep) return null;

  const saveChanges = () => {
    updateSteps(steps.map(step => 
      step.id === selectedStepId 
        ? {
            ...step, 
            title: localTitle,
            promptTemplate: localPromptTemplate
          } 
        : step
    ));
  };

  return (
    <Dialog open={!!selectedStepId} onOpenChange={(open) => !open && saveChanges()}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            <StepHeader selectedStep={selectedStep} />
          </DialogTitle>
          <DialogDescription>
            Configure your workflow step settings
          </DialogDescription>
        </DialogHeader>

        <StepEditTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedStep={selectedStep}
          steps={steps}
          selectedStepId={selectedStepId!}
          updateSteps={updateSteps}
          updateWaitDays={updateWaitDays}
          localTitle={localTitle}
          setLocalTitle={setLocalTitle}
          localPromptTemplate={localPromptTemplate}
          setLocalPromptTemplate={setLocalPromptTemplate}
        />

        <div className="flex justify-end mt-6">
          <Button className="gap-2" onClick={saveChanges}>
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
