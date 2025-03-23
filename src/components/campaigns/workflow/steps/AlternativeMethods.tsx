
import React from "react";
import { Brain, LayoutTemplate } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AlternativeMethods = () => {
  return (
    <div className="border-t pt-6 mt-8 animate-fade-in animation-delay-300">
      <h3 className="text-base font-medium text-gray-700 mb-4">Or choose another methods</h3>
      <div className="grid grid-cols-2 gap-4">
        <Button 
          variant="outline" 
          className="h-auto p-4 flex items-center gap-4 hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 hover:border-orange-200 transition-all group shadow-sm hover:shadow-md"
        >
          <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-500 rounded-lg flex items-center justify-center text-white group-hover:animate-pulse">
            <Brain className="w-6 h-6" />
          </div>
          <div className="text-left">
            <div className="font-medium text-gray-900 group-hover:text-orange-500 transition-colors">Create with AI</div>
            <div className="text-sm text-gray-500 group-hover:text-pink-400 transition-colors">Let AI generate your multichannel campaigns</div>
          </div>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto p-4 flex items-center gap-4 hover:bg-orange-50/80 transition-all group shadow-sm hover:shadow-md"
        >
          <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg flex items-center justify-center text-white group-hover:animate-pulse">
            <LayoutTemplate className="w-6 h-6" />
          </div>
          <div className="text-left">
            <div className="font-medium text-gray-900 group-hover:text-orange-500 transition-colors">Templates library</div>
            <div className="text-sm text-gray-500 group-hover:text-orange-400 transition-colors">Use a template to create your campaign</div>
          </div>
        </Button>
      </div>
    </div>
  );
};
