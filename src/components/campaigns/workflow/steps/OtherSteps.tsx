
import React from "react";
import { Code, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OtherStepsProps {
  handleStepClick: (moduleType: string) => void;
}

export const OtherSteps = ({ handleStepClick }: OtherStepsProps) => {
  return (
    <div className="animate-fade-in animation-delay-300">
      <h3 className="text-sm font-medium text-gray-600 mb-4">Other steps</h3>
      <div className="grid grid-cols-4 gap-4">
        <Button 
          variant="outline" 
          className="h-auto p-4 flex flex-col items-center gap-2 bg-cyan-50/80 border-cyan-100 hover:bg-cyan-100 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
          onClick={() => handleStepClick("Call API")}
        >
          <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center">
            <Code className="w-5 h-5 text-cyan-600" />
          </div>
          <div className="text-center">
            <div className="font-medium text-gray-900">Call an API</div>
            <div className="text-xs text-gray-500">Call an API</div>
          </div>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto p-4 flex flex-col items-center gap-2 bg-gray-50/80 border-gray-100 hover:bg-gray-100 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
          onClick={() => handleStepClick("Send to campaign")}
        >
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <Send className="w-5 h-5 text-gray-600" />
          </div>
          <div className="text-center">
            <div className="font-medium text-gray-900">Send to another campaign</div>
            <div className="text-xs text-gray-500">Transfer to campaign</div>
          </div>
        </Button>
      </div>
    </div>
  );
};
