
import React from "react";
import { AutomaticSteps } from "./steps/AutomaticSteps";
import { ManualSteps } from "./steps/ManualSteps";
import { OtherSteps } from "./steps/OtherSteps";
import { ConditionSteps } from "./steps/ConditionSteps";
import { AlternativeMethods } from "./steps/AlternativeMethods";

interface TabPanelProps {
  activeTab: string;
  handleStepClick: (moduleType: string) => void;
}

export const TabPanel = ({ activeTab, handleStepClick }: TabPanelProps) => {
  if (activeTab === "steps") {
    return (
      <>
        <AutomaticSteps handleStepClick={handleStepClick} />
        <ManualSteps handleStepClick={handleStepClick} />
        <OtherSteps handleStepClick={handleStepClick} />
        <AlternativeMethods />
      </>
    );
  }
  
  return <ConditionSteps handleStepClick={handleStepClick} />;
};
