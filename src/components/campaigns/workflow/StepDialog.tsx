
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { StepGrid } from "./StepGrid";
import { automaticSteps, manualSteps, otherSteps } from "./stepData";
import { leadInformationConditions, leadActionsConditions } from "./conditionData";
import { WorkflowStep, WorkflowCondition } from "./types";
import { useState } from "react";

interface StepDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onStepSelect: (step: WorkflowStep) => void;
}

export const StepDialog = ({ isOpen, onClose, onStepSelect }: StepDialogProps) => {
  const [selectedView, setSelectedView] = useState<"steps" | "conditions">("steps");

  const handleConditionSelect = (condition: WorkflowCondition) => {
    const step: WorkflowStep = {
      ...condition,
      type: "automatic",
    };
    onStepSelect(step);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <div className="flex justify-center gap-2 mb-4">
            <Button
              variant={selectedView === "steps" ? "default" : "outline"}
              onClick={() => setSelectedView("steps")}
              className="font-medium"
            >
              Steps
            </Button>
            <Button
              variant={selectedView === "conditions" ? "default" : "outline"}
              onClick={() => setSelectedView("conditions")}
              className="font-medium"
            >
              Conditions
            </Button>
          </div>
          <DialogTitle className="text-center text-gray-600">
            Add conditions to your sequence and create decisions branches to get the best results possible
          </DialogTitle>
        </DialogHeader>

        <div className="mt-8 space-y-8">
          {selectedView === "steps" ? (
            <>
              <StepGrid<WorkflowStep>
                title="Automatic Steps" 
                steps={automaticSteps} 
                onStepClick={(step) => {
                  onStepSelect(step);
                  onClose();
                }}
              />
              <StepGrid<WorkflowStep>
                title="Manual execution" 
                steps={manualSteps} 
                onStepClick={(step) => {
                  onStepSelect(step);
                  onClose();
                }}
              />
              <StepGrid<WorkflowStep>
                title="Other steps" 
                steps={otherSteps} 
                onStepClick={(step) => {
                  onStepSelect(step);
                  onClose();
                }}
              />
            </>
          ) : (
            <>
              <StepGrid<WorkflowCondition>
                title="Lead information" 
                steps={leadInformationConditions} 
                onStepClick={(condition) => {
                  handleConditionSelect(condition);
                  onClose();
                }}
              />
              <StepGrid<WorkflowCondition>
                title="Lead actions" 
                steps={leadActionsConditions} 
                onStepClick={(condition) => {
                  handleConditionSelect(condition);
                  onClose();
                }}
              />
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
