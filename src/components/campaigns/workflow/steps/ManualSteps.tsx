
import React from "react";
import { PhoneCall, List } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ManualStepsProps {
  handleStepClick: (moduleType: string) => void;
}

export const ManualSteps = ({ handleStepClick }: ManualStepsProps) => {
  return (
    <div className="animate-fade-in animation-delay-150">
      <h3 className="text-sm font-medium text-gray-600 mb-4">Manual execution</h3>
      <div className="grid grid-cols-4 gap-4">
        <Button 
          variant="outline" 
          className="h-auto p-4 flex flex-col items-center gap-2 bg-red-50/80 border-red-100 hover:bg-red-100 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
          onClick={() => handleStepClick("Call")}
        >
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <PhoneCall className="w-5 h-5 text-red-600" />
          </div>
          <div className="text-center">
            <div className="font-medium text-gray-900">Call</div>
            <div className="text-xs text-gray-500">Create a task</div>
          </div>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto p-4 flex flex-col items-center gap-2 bg-orange-50/80 border-orange-100 hover:bg-orange-100 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
          onClick={() => handleStepClick("Manual task")}
        >
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
            <List className="w-5 h-5 text-orange-600" />
          </div>
          <div className="text-center">
            <div className="font-medium text-gray-900">Manual task</div>
            <div className="text-xs text-gray-500">Create a task</div>
          </div>
        </Button>
      </div>
    </div>
  );
};
