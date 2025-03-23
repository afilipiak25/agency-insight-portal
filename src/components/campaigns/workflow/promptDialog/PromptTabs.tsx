
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PromptEditTab } from "./PromptEditTab";
import { PromptPreviewTab } from "./PromptPreviewTab";

interface PromptTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  promptTemplate: string;
  setPromptTemplate: (template: string) => void;
  handleReset: () => void;
  handleGenerate: () => void;
  generated: string;
  copied: boolean;
  handleCopy: () => void;
}

export const PromptTabs = ({
  activeTab,
  setActiveTab,
  promptTemplate,
  setPromptTemplate,
  handleReset,
  handleGenerate,
  generated,
  copied,
  handleCopy
}: PromptTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="edit">Edit Prompt</TabsTrigger>
        <TabsTrigger value="preview">Preview Result</TabsTrigger>
      </TabsList>
      
      <TabsContent value="edit">
        <PromptEditTab 
          promptTemplate={promptTemplate}
          setPromptTemplate={setPromptTemplate}
          handleReset={handleReset}
          handleGenerate={handleGenerate}
        />
      </TabsContent>
      
      <TabsContent value="preview">
        <PromptPreviewTab 
          generated={generated}
          copied={copied}
          handleCopy={handleCopy}
          setActiveTab={setActiveTab}
          handleGenerate={handleGenerate}
        />
      </TabsContent>
    </Tabs>
  );
};
