
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
  isLoading?: boolean;
  isGenerateDisabled?: boolean;
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
  handleCopy,
  isLoading = false,
  isGenerateDisabled = false
}: PromptTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="edit">Prompt bearbeiten</TabsTrigger>
        <TabsTrigger value="preview">Vorschau</TabsTrigger>
      </TabsList>
      
      <TabsContent value="edit">
        <PromptEditTab 
          promptTemplate={promptTemplate}
          setPromptTemplate={setPromptTemplate}
          handleReset={handleReset}
          handleGenerate={handleGenerate}
          isLoading={isLoading}
          isGenerateDisabled={isGenerateDisabled}
        />
      </TabsContent>
      
      <TabsContent value="preview">
        <PromptPreviewTab 
          generated={generated}
          copied={copied}
          handleCopy={handleCopy}
          setActiveTab={setActiveTab}
          handleGenerate={handleGenerate}
          isLoading={isLoading}
          isGenerateDisabled={isGenerateDisabled}
        />
      </TabsContent>
    </Tabs>
  );
};
