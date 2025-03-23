
import React from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

interface PromptPreviewTabProps {
  generated: string;
  copied: boolean;
  handleCopy: () => void;
  setActiveTab: (tab: string) => void;
  handleGenerate: () => void;
}

export const PromptPreviewTab = ({
  generated,
  copied,
  handleCopy,
  setActiveTab,
  handleGenerate
}: PromptPreviewTabProps) => {
  return (
    <div className="space-y-4">
      {generated ? (
        <>
          <div className="border rounded p-4 min-h-[350px] bg-white whitespace-pre-wrap">
            {generated}
          </div>
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setActiveTab("edit")}>
              Back to Edit
            </Button>
            <Button onClick={handleCopy}>
              {copied ? (
                <>
                  <Check className="mr-1 h-4 w-4" /> Copied
                </>
              ) : (
                <>
                  <Copy className="mr-1 h-4 w-4" /> Copy Text
                </>
              )}
            </Button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[350px] text-gray-500">
          <p>Generate a preview to see the result</p>
          <Button 
            variant="outline" 
            className="mt-2"
            onClick={handleGenerate}
          >
            Generate Now
          </Button>
        </div>
      )}
    </div>
  );
};
