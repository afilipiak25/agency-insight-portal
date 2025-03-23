
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { WorkflowStep } from "../types/workflow";

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
  
  if (!selectedStep) return null;

  return (
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle>
          {selectedStep.title}
        </DialogTitle>
      </DialogHeader>
      
      <div className="p-4 space-y-4">
        <div className="flex gap-4 items-center">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            {selectedStep.icon}
          </div>
          <div>
            <h3 className="font-medium">{selectedStep.title}</h3>
            <p className="text-sm text-gray-500">Edit step details</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Content</label>
          <Textarea 
            className="min-h-[200px]"
            value={selectedStep.content.replace(/<\/?p>/g, '') || ''}
            onChange={(e) => {
              const value = e.target.value;
              updateSteps(steps.map(step => 
                step.id === selectedStepId 
                  ? {...step, content: `<p>${value.replace(/\n/g, '</p><p>')}</p>`} 
                  : step
              ));
            }}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Wait duration (days)</label>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                if (selectedStep.waitDays > 0) {
                  updateWaitDays(selectedStep.id, false);
                }
              }}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center font-medium">
              {selectedStep.waitDays || 0}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => updateWaitDays(selectedStep.id, true)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};
