
import React from "react";
import { PromptDialog as NewPromptDialog } from "./promptDialog/PromptDialog";
import { WorkflowStep } from "../types/workflow";
import { ApolloLead } from "../types/apollo-filters";

interface PromptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  step: WorkflowStep | null;
  lead: ApolloLead | null;
  onUpdatePrompt: (stepId: number, promptTemplate: string) => void;
}

export const PromptDialog = ({
  open,
  onOpenChange,
  step,
  lead,
  onUpdatePrompt,
}: PromptDialogProps) => {
  // Mock data for the available leads - in a real app, this would come from your app state
  const mockLeads: ApolloLead[] = lead ? 
    Array(20).fill(0).map((_, i) => ({
      ...lead,
      id: `lead-${i}`,
      name: `Lead ${i+1} ${lead.name}`,
      company: `${lead.company} ${i+1}`,
    })) : [];

  // Add the original lead at the beginning
  if (lead) {
    mockLeads.unshift(lead);
  }

  // Pass through to the new implementation with additional props
  return (
    <NewPromptDialog
      open={open}
      onOpenChange={onOpenChange}
      step={step}
      lead={lead}
      onUpdatePrompt={(stepId, promptTemplate, model) => {
        // The original doesn't support the model parameter, so we ignore it
        onUpdatePrompt(stepId, promptTemplate);
      }}
      availableLeads={mockLeads}
    />
  );
};
