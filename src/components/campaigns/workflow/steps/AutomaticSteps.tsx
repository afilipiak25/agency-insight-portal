
import React from "react";
import { Mail, MessageSquare, Mic, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AutomaticStepsProps {
  handleStepClick: (moduleType: string) => void;
}

export const AutomaticSteps = ({ handleStepClick }: AutomaticStepsProps) => {
  return (
    <div className="animate-fade-in">
      <h3 className="text-sm font-medium text-gray-600 mb-4">Automatic Steps</h3>
      <div className="grid grid-cols-4 gap-4">
        <Button 
          variant="outline" 
          className="h-auto p-4 flex flex-col items-center gap-2 bg-green-50/80 border-green-100 hover:bg-green-100 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
          onClick={() => handleStepClick("Email")}
        >
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <Mail className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-center">
            <div className="font-medium text-gray-900">Email</div>
            <div className="text-xs text-gray-500">Send automatic email</div>
          </div>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto p-4 flex flex-col items-center gap-2 bg-blue-50/80 border-blue-100 hover:bg-blue-100 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
          onClick={() => handleStepClick("Chat message")}
        >
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-center">
            <div className="font-medium text-gray-900">Chat message</div>
            <div className="text-xs text-gray-500">Send on LinkedIn</div>
          </div>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto p-4 flex flex-col items-center gap-2 bg-violet-50/80 border-violet-100 hover:bg-violet-100 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
          onClick={() => handleStepClick("Voice message")}
        >
          <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">
            <Mic className="w-5 h-5 text-violet-600" />
          </div>
          <div className="text-center">
            <div className="font-medium text-gray-900">Voice message</div>
            <div className="text-xs text-gray-500">Send on LinkedIn</div>
          </div>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto p-4 flex flex-col items-center gap-2 bg-indigo-50/80 border-indigo-100 hover:bg-indigo-100 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
          onClick={() => handleStepClick("Invitation")}
        >
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
            <UserPlus className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="text-center">
            <div className="font-medium text-gray-900">Invitation</div>
            <div className="text-xs text-gray-500">Send on LinkedIn</div>
          </div>
        </Button>
      </div>
    </div>
  );
};
