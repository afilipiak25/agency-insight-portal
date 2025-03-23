
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface ContentTabProps {
  localTitle: string;
  setLocalTitle: (title: string) => void;
  localPromptTemplate: string;
  setLocalPromptTemplate: (template: string) => void;
}

export const ContentTab = ({
  localTitle,
  setLocalTitle,
  localPromptTemplate,
  setLocalPromptTemplate
}: ContentTabProps) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <label className="text-sm font-medium mb-2 block">
          Step Title
        </label>
        <Input
          type="text"
          value={localTitle}
          onChange={(e) => setLocalTitle(e.target.value)}
          className="w-full"
        />
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">
          Prompt Template
        </label>
        <Textarea
          value={localPromptTemplate}
          onChange={(e) => setLocalPromptTemplate(e.target.value)}
          placeholder="Enter prompt template..."
          className="min-h-[200px] font-mono text-sm"
        />
        <p className="text-xs text-gray-500 mt-1">
          Use variables like #FirstName#, #CompanyName#, etc.
        </p>
      </div>
    </div>
  );
};
