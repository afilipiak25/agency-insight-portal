
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

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
        <div className="flex items-center text-amber-600 text-sm bg-amber-50 p-2 rounded mb-2">
          <AlertCircle className="h-4 w-4 mr-2" />
          <p>Use variables like #FirstName#, #CompanyName#, etc. in your template.</p>
        </div>
        <Textarea
          value={localPromptTemplate}
          onChange={(e) => setLocalPromptTemplate(e.target.value)}
          placeholder="Enter prompt template..."
          className="min-h-[250px] font-mono text-sm"
        />
        <div className="flex justify-end mt-3">
          <Button 
            variant="secondary" 
            size="sm"
            className="text-xs"
            onClick={() => {
              const defaultTemplate = "Hey #FirstName#,\n\nI noticed you work at #CompanyName# as a #JobTitle#.\n\nWould you be interested in discussing how we might be able to help with your #Industry# challenges?";
              setLocalPromptTemplate(defaultTemplate);
            }}
          >
            Insert Example Template
          </Button>
        </div>
      </div>
    </div>
  );
};
