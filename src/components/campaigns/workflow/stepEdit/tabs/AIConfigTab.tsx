
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bot, Database, Mouse } from "lucide-react";
import { WorkflowStep } from "../../../types/workflow";

interface AIConfigTabProps {
  selectedStep: WorkflowStep;
  steps: WorkflowStep[];
  selectedStepId: number;
  updateSteps: (newSteps: WorkflowStep[]) => void;
}

export const AIConfigTab = ({
  selectedStep,
  steps,
  selectedStepId,
  updateSteps
}: AIConfigTabProps) => {
  const handleUseCaseChange = (useCase: string) => {
    updateSteps(steps.map(step => 
      step.id === selectedStepId 
        ? {...step, useCase: useCase as 'web-research' | 'content-creation' | 'other'} 
        : step
    ));
  };

  const handleModelChange = (model: string) => {
    updateSteps(steps.map(step => 
      step.id === selectedStepId 
        ? {...step, model} 
        : step
    ));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="text-sm font-medium mb-2 block">
          Use Case
        </label>
        <RadioGroup 
          value={selectedStep.useCase || 'content-creation'} 
          onValueChange={handleUseCaseChange}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="content-creation" id="content" />
            <Label htmlFor="content" className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-purple-600" />
              Content Creation
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="web-research" id="research" />
            <Label htmlFor="research" className="flex items-center gap-2">
              <Database className="w-4 h-4 text-blue-600" />
              Web Research
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other" id="other" />
            <Label htmlFor="other" className="flex items-center gap-2">
              <Mouse className="w-4 h-4 text-gray-600" />
              Other
            </Label>
          </div>
        </RadioGroup>
      </div>
      
      <div>
        <label className="text-sm font-medium mb-2 block">
          AI Model
        </label>
        <Select 
          value={selectedStep.model || 'gpt-4'} 
          onValueChange={handleModelChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gpt-4">GPT-4 (Recommended)</SelectItem>
            <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo (Faster)</SelectItem>
            <SelectItem value="claude-2">Claude 2</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-500 mt-1">
          GPT-4 provides the best results but is slower. GPT-3.5 is faster but may be less accurate.
        </p>
      </div>
    </div>
  );
};
