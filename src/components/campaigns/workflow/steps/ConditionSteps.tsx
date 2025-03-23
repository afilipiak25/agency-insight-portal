
import React from "react";
import { Mail, Link, PhoneCall, Code, Calendar, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConditionStepsProps {
  handleStepClick: (moduleType: string) => void;
}

export const ConditionSteps = ({ handleStepClick }: ConditionStepsProps) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-4">Lead information</h3>
        <div className="grid grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2 bg-blue-50/80 border-blue-100 hover:bg-blue-100 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
            onClick={() => handleStepClick("Has email")}
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-center">
              <div className="font-medium text-gray-900">Has email address</div>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2 bg-indigo-50/80 border-indigo-100 hover:bg-indigo-100 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
            onClick={() => handleStepClick("Has LinkedIn URL")}
          >
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <Link className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="text-center">
              <div className="font-medium text-gray-900">Has LinkedIn URL</div>
              <div className="text-xs text-gray-500">LinkedIn</div>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2 bg-violet-50/80 border-violet-100 hover:bg-violet-100 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
            onClick={() => handleStepClick("Has phone")}
          >
            <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">
              <PhoneCall className="w-5 h-5 text-violet-600" />
            </div>
            <div className="text-center">
              <div className="font-medium text-gray-900">Has phone number</div>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2 bg-cyan-50/80 border-cyan-100 hover:bg-cyan-100 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
            onClick={() => handleStepClick("Custom condition")}
          >
            <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center">
              <Code className="w-5 h-5 text-cyan-600" />
            </div>
            <div className="text-center">
              <div className="font-medium text-gray-900">Custom condition</div>
            </div>
          </Button>
        </div>
      </div>

      <div className="animate-fade-in animation-delay-150">
        <h3 className="text-sm font-medium text-gray-600 mb-4">Lead actions</h3>
        <div className="grid grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2 bg-blue-50/80 border-blue-100 hover:bg-blue-100 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
            onClick={() => handleStepClick("Opened email")}
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-center">
              <div className="font-medium text-gray-900">Opened email</div>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2 bg-indigo-50/80 border-indigo-100 hover:bg-indigo-100 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
            onClick={() => handleStepClick("Clicked link")}
          >
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <Link className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="text-center">
              <div className="font-medium text-gray-900">Clicked on link in email</div>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2 bg-red-50/80 border-red-100 hover:bg-red-100 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
            onClick={() => handleStepClick("Unsubscribe")}
          >
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-red-600" />
            </div>
            <div className="text-center">
              <div className="font-medium text-gray-900">Unsubscribe from email</div>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2 bg-green-50/80 border-green-100 hover:bg-green-100 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
            onClick={() => handleStepClick("Booked meeting")}
          >
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-center">
              <div className="font-medium text-gray-900">Booked a meeting</div>
              <div className="text-xs text-gray-500">lemcal</div>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2 bg-blue-50/80 border-blue-100 hover:bg-blue-100 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
            onClick={() => handleStepClick("Accepted invite")}
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Link className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-center">
              <div className="font-medium text-gray-900">Accepted invite</div>
              <div className="text-xs text-gray-500">LinkedIn</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};
