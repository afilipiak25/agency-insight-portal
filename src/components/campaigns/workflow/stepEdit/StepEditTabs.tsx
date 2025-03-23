
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentTab } from "./tabs/ContentTab";
import { SettingsTab } from "./tabs/SettingsTab";
import { AIConfigTab } from "./tabs/AIConfigTab";
import { WorkflowStep } from "../../types/workflow";

interface StepEditTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedStep: WorkflowStep;
  steps: WorkflowStep[];
  selectedStepId: number;
  updateSteps: (newSteps: WorkflowStep[]) => void;
  updateWaitDays: (stepId: number, increment: boolean) => void;
  localTitle: string;
  setLocalTitle: (title: string) => void;
  localPromptTemplate: string;
  setLocalPromptTemplate: (template: string) => void;
}

export const StepEditTabs = ({
  activeTab,
  setActiveTab,
  selectedStep,
  steps,
  selectedStepId,
  updateSteps,
  updateWaitDays,
  localTitle,
  setLocalTitle,
  localPromptTemplate,
  setLocalPromptTemplate
}: StepEditTabsProps) => {
  return (
    <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mt-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="content">Content</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
        <TabsTrigger value="ai">AI Configuration</TabsTrigger>
      </TabsList>

      <TabsContent value="content" className="space-y-4 p-4">
        <ContentTab 
          localTitle={localTitle}
          setLocalTitle={setLocalTitle}
          localPromptTemplate={localPromptTemplate}
          setLocalPromptTemplate={setLocalPromptTemplate}
        />
      </TabsContent>

      <TabsContent value="settings" className="space-y-4 p-4">
        <SettingsTab 
          selectedStep={selectedStep}
          steps={steps}
          selectedStepId={selectedStepId}
          updateSteps={updateSteps}
          updateWaitDays={updateWaitDays}
          setLocalPromptTemplate={setLocalPromptTemplate}
        />
      </TabsContent>

      <TabsContent value="ai" className="space-y-4 p-4">
        <AIConfigTab
          selectedStep={selectedStep}
          steps={steps}
          selectedStepId={selectedStepId}
          updateSteps={updateSteps}
        />
      </TabsContent>
    </Tabs>
  );
};
