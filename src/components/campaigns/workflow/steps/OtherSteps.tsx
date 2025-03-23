
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
          className="h-auto p-4 flex flex-col items-center gap-2 bg-orange-50/80 border-orange-100 hover:bg-gradient-to-r hover:from-orange-100/80 hover:to-pink-100/80 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
          onClick={() => handleStepClick("Call API")}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 flex items-center justify-center text-white">
            <Code className="w-5 h-5" />
          </div>
          <div className="text-center">
            <div className="font-medium text-gray-900">Call an API</div>
            <div className="text-xs text-gray-500">Call an API</div>
          </div>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto p-4 flex flex-col items-center gap-2 bg-pink-50/80 border-pink-100 hover:bg-gradient-to-r hover:from-pink-100/80 hover:to-purple-100/80 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
          onClick={() => handleStepClick("Send to campaign")}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center text-white">
            <Send className="w-5 h-5" />
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
