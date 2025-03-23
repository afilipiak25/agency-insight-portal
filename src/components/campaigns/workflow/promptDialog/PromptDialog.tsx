
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { WorkflowStep, DEFAULT_PROMPT_TEMPLATES } from "../../types/workflow";
import { ApolloLead } from "../../types/apollo-filters";
import { LeadInfo } from "./LeadInfo";
import { PromptTabs } from "./PromptTabs";
import { StepIcon } from "./StepIcon";
import { AIConfigSelector } from "./AIConfigSelector";
import { LeadSelector } from "./LeadSelector";

interface PromptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  step: WorkflowStep | null;
  lead: ApolloLead | null;
  onUpdatePrompt: (stepId: number, promptTemplate: string, model?: string) => void;
  availableLeads?: ApolloLead[];
}

export const PromptDialog = ({
  open,
  onOpenChange,
  step,
  lead: initialLead,
  onUpdatePrompt,
  availableLeads = [],
}: PromptDialogProps) => {
  const [promptTemplate, setPromptTemplate] = useState("");
  const [activeTab, setActiveTab] = useState("edit");
  const [copied, setCopied] = useState(false);
  const [generated, setGenerated] = useState("");
  const [generationLoading, setGenerationLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedLead, setSelectedLead] = useState<ApolloLead | null>(null);

  useEffect(() => {
    if (step) {
      setPromptTemplate(step.promptTemplate || 
        DEFAULT_PROMPT_TEMPLATES[step.channel || 'email'] || "");
      setSelectedModel(step.model || "gpt-4");
    }
  }, [step]);

  useEffect(() => {
    if (initialLead) {
      setSelectedLead(initialLead);
    }
  }, [initialLead]);

  const handleSave = () => {
    if (step) {
      onUpdatePrompt(step.id, promptTemplate, selectedModel);
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  const handleReset = () => {
    if (step) {
      const defaultTemplate = DEFAULT_PROMPT_TEMPLATES[step.channel || 'email'] || "";
      setPromptTemplate(defaultTemplate);
    }
  };

  const handleCopy = () => {
    if (generated) {
      navigator.clipboard.writeText(generated);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLeadSelect = (lead: ApolloLead) => {
    setSelectedLead(lead);
    // Reset generated content when lead changes
    setGenerated("");
  };

  const handleGenerate = () => {
    if (!selectedLead) return;
    
    setGenerationLoading(true);
    
    // Simulate an API call with a timeout
    setTimeout(() => {
      let result = promptTemplate;
      
      // Process template variables
      const firstName = selectedLead.name.split(' ')[0];
      const lastName = selectedLead.name.split(' ').slice(1).join(' ');
      
      // Replace template variables
      result = result
        .replace(/#FirstName#/g, firstName)
        .replace(/#LastName#/g, lastName)
        .replace(/#CompanyName#/g, selectedLead.company || '')
        .replace(/#JobTitle#/g, selectedLead.position || '')
        .replace(/#Industry#/g, selectedLead.industry || '')
        .replace(/#Technologies#/g, (selectedLead.technology || []).join(', '))
        .replace(/#LinkedInProfile#/g, selectedLead.linkedin || '')
        .replace(/#LastLinkedInActivity#/g, 'Posted about industry trends last week')
        .replace(/#InstagramHandle#/g, '@' + firstName.toLowerCase() + lastName.toLowerCase());
      
      // Generate a more personalized email based on the AI model
      if (!result.includes("Hallo") && !result.includes("Sehr geehrte")) {
        // If no greeting exists, add a personalized greeting
        if (selectedModel === "gpt-4") {
          result = `Hallo ${firstName},\n\n${result}`;
        } else {
          result = `Sehr geehrte(r) ${firstName} ${lastName},\n\n${result}`;
        }
      }
      
      // Add signature if not present
      if (!result.includes("Mit freundlichen Grüßen") && !result.includes("Beste Grüße")) {
        // Add signature based on AI model
        if (selectedModel === "gpt-4") {
          result += "\n\nIch freue mich auf einen Austausch!\n\nMit freundlichen Grüßen,\nIhr Intellywave Team";
        } else if (selectedModel === "gpt-3.5-turbo") {
          result += "\n\nViele Grüße,\nIntellywave Team";
        } else if (selectedModel === "claude-2") {
          result += "\n\nIch würde mich über ein Gespräch freuen.\n\nBeste Grüße aus Berlin,\nIntellywave Team";
        } else {
          result += "\n\nMit freundlichen Grüßen,\nIhr Intellywave Team";
        }
      }
      
      setGenerated(result);
      setGenerationLoading(false);
      setActiveTab("preview");
    }, 1200); // Simulate processing time
  };

  // Handler for model change
  const handleModelChange = (model: string) => {
    setSelectedModel(model);
  };

  if (!step) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <StepIcon step={step} />
            {step.title} - {selectedLead?.name || "Wähle einen Lead"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1">
            <LeadSelector 
              leads={availableLeads} 
              selectedLead={selectedLead} 
              onLeadSelect={handleLeadSelect} 
            />
            
            {selectedLead && <LeadInfo lead={selectedLead} />}
            
            <div className="mt-6">
              <AIConfigSelector 
                selectedModel={selectedModel} 
                onModelChange={handleModelChange} 
              />
            </div>
          </div>
          
          <div className="col-span-3">
            <PromptTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              promptTemplate={promptTemplate}
              setPromptTemplate={setPromptTemplate}
              handleReset={handleReset}
              handleGenerate={handleGenerate}
              generated={generated}
              copied={copied}
              handleCopy={handleCopy}
              isLoading={generationLoading}
              isGenerateDisabled={!selectedLead}
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleCancel}>Abbrechen</Button>
          <Button variant="gradient" onClick={handleSave}>Änderungen speichern</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
