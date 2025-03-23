
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bot, Zap, Sparkles } from "lucide-react";

interface AIConfigSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

export const AIConfigSelector = ({ selectedModel, onModelChange }: AIConfigSelectorProps) => {
  return (
    <div className="space-y-3 border rounded-md p-3">
      <h3 className="text-sm font-medium flex items-center gap-2">
        <Bot className="h-4 w-4 text-purple-500" />
        AI Model Configuration
      </h3>
      
      <div>
        <label className="text-xs text-gray-500 mb-1 block">
          Select AI model for generation
        </label>
        <Select value={selectedModel} onValueChange={onModelChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select AI model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gpt-4" className="flex items-center">
              <div className="flex items-center gap-2">
                <Sparkles className="h-3 w-3 text-purple-600" />
                <span>GPT-4 (Recommended)</span>
              </div>
            </SelectItem>
            <SelectItem value="gpt-3.5-turbo">
              <div className="flex items-center gap-2">
                <Zap className="h-3 w-3 text-blue-600" />
                <span>GPT-3.5 Turbo (Faster)</span>
              </div>
            </SelectItem>
            <SelectItem value="claude-2">
              <div className="flex items-center gap-2">
                <Bot className="h-3 w-3 text-amber-600" />
                <span>Claude 2</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="text-xs text-gray-500 mt-2">
        <p>GPT-4 provides higher quality outputs but may be slower</p>
      </div>
    </div>
  );
};
