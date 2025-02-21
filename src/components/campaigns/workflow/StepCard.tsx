
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical, Plus } from "lucide-react";
import { WorkflowStep } from "./types";

interface StepCardProps {
  step: WorkflowStep;
  index: number;
  onAddClick: (index: string) => void;
}

export const StepCard = ({ step, index, onAddClick }: StepCardProps) => {
  return (
    <div className="relative">
      <div className="absolute left-1/2 -translate-x-1/2 -top-4 h-4 w-px bg-gray-200" />
      <Card className="relative border border-violet-200 shadow-sm hover:shadow-md transition-all">
        <div className="p-4 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-gray-50 rounded-lg">
              {step.icon}
            </div>
            <div>
              <div className="font-medium">{step.title}</div>
              <div className="text-sm text-gray-500">{step.description}</div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="shrink-0">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </Card>
      <Button 
        variant="outline" 
        size="icon"
        className="absolute left-1/2 -translate-x-1/2 -bottom-6 z-10 rounded-full w-8 h-8 shadow-sm border-violet-200 hover:border-violet-300 hover:bg-violet-50"
        onClick={() => onAddClick(index.toString())}
      >
        <Plus className="w-4 h-4 text-violet-600" />
      </Button>
    </div>
  );
};
