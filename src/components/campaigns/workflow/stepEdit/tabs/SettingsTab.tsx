
import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Minus } from "lucide-react";
import { WorkflowStep, DEFAULT_PROMPT_TEMPLATES } from "../../../types/workflow";

interface SettingsTabProps {
  selectedStep: WorkflowStep;
  steps: WorkflowStep[];
  selectedStepId: number;
  updateSteps: (newSteps: WorkflowStep[]) => void;
  updateWaitDays: (stepId: number, increment: boolean) => void;
  setLocalPromptTemplate: (template: string) => void;
}

export const SettingsTab = ({
  selectedStep,
  steps,
  selectedStepId,
  updateSteps,
  updateWaitDays,
  setLocalPromptTemplate
}: SettingsTabProps) => {
  const getDefaultPromptForChannel = (channel?: string) => {
    if (!channel) return "";
    return DEFAULT_PROMPT_TEMPLATES[channel] || "";
  };

  const handleChannelChange = (channel: string) => {
    const defaultPrompt = getDefaultPromptForChannel(channel);
    setLocalPromptTemplate(defaultPrompt);
    
    updateSteps(steps.map(step => 
      step.id === selectedStepId 
        ? {
            ...step, 
            channel: channel as 'email' | 'linkedin' | 'profile-visit' | 'instagram' | 'other',
            promptTemplate: defaultPrompt
          } 
        : step
    ));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="text-sm font-medium mb-2 block">
          Channel
        </label>
        <Select 
          value={selectedStep.channel || 'email'} 
          onValueChange={handleChannelChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select channel" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="linkedin">LinkedIn</SelectItem>
            <SelectItem value="profile-visit">Profile Visit</SelectItem>
            <SelectItem value="instagram">Instagram</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <label className="text-sm font-medium mb-2 flex items-center justify-between">
          <span>Wait days</span>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-6 w-6"
              onClick={() => updateWaitDays(selectedStep.id, false)}
              disabled={selectedStep.waitDays <= 0}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center">{selectedStep.waitDays}</span>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-6 w-6"
              onClick={() => updateWaitDays(selectedStep.id, true)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </label>
        <div className="mt-2 p-4 border rounded-md bg-gray-50">
          <p className="text-sm text-gray-600">
            Wait <span className="font-medium">{selectedStep.waitDays}</span> days after the previous step before executing this step.
          </p>
        </div>
      </div>
    </div>
  );
};
