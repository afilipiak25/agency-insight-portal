
import { Mail, Type, FileText, AlertCircle, Play, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkflowStep } from "../types/workflow";

interface StepCardProps {
  step: WorkflowStep;
  index: number;
  stepsLength: number;
  onStepClick: (stepId: number) => void;
  updateWaitDays: (stepId: number, increment: boolean) => void;
}

export const StepCard = ({ 
  step, 
  index, 
  stepsLength, 
  onStepClick, 
  updateWaitDays 
}: StepCardProps) => {
  
  const getStatusIndicator = (status?: string) => {
    if (!status) return null;
    
    switch (status) {
      case 'not-met':
        return (
          <div className="text-xs text-gray-500 py-1 px-2 bg-gray-100 rounded-md flex items-center gap-1">
            <AlertCircle className="w-3 h-3 text-gray-500" />
            Run condition not met
          </div>
        );
      case 'missing-inputs':
        return (
          <div className="text-xs text-gray-500 py-1 px-2 bg-gray-100 rounded-md flex items-center gap-1">
            <AlertCircle className="w-3 h-3 text-yellow-500" />
            Some inputs missing
          </div>
        );
      case 'in-progress':
        return (
          <div className="text-xs text-green-600 py-1 px-2 bg-green-50 rounded-md flex items-center gap-1">
            <Play className="w-3 h-3 text-green-600" />
            Running
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className="w-64 border rounded-lg p-4 cursor-pointer hover:border-purple-300 transition-colors"
      onClick={() => onStepClick(step.id)}
    >
      <div 
        className="flex items-center gap-2 mb-2"
        style={step.color ? { color: step.color } : undefined}
      >
        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
          step.type === 'email' ? 'bg-purple-100' : 
          step.type === 'ai' ? 'bg-green-100' : 'bg-gray-100'
        }`}>
          {step.icon}
        </div>
        <div className="flex items-center gap-1">
          <span className={`font-medium ${
            step.type === 'email' ? 'text-purple-600' : 
            step.type === 'ai' ? 'text-green-600' : 'text-gray-800'
          }`}>
            {step.title}
          </span>
          {index < stepsLength - 1 && (
            <div className="text-xs text-gray-500 flex items-center gap-1 ml-2">
              <span>{step.waitDays}d</span>
            </div>
          )}
        </div>
        {step.personalized && (
          <span className="ml-auto text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">
            Personalized
          </span>
        )}
      </div>
      
      <div 
        className="text-sm text-gray-600 line-clamp-3 min-h-[60px] border-b pb-2"
        dangerouslySetInnerHTML={{ __html: step.content }}
      />
      
      {getStatusIndicator(step.status)}
      
      <div className="mt-4 flex justify-end gap-2">
        {index < stepsLength - 1 && (
          <div className="flex items-center gap-1 text-xs text-gray-500">
            Wait:
            <Button
              variant="outline"
              size="icon"
              className="h-6 w-6"
              onClick={(e) => { e.stopPropagation(); updateWaitDays(step.id, false); }}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-6 text-center">
              {step.waitDays}d
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-6 w-6"
              onClick={(e) => { e.stopPropagation(); updateWaitDays(step.id, true); }}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
