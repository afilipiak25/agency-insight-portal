
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { WorkflowStep, DEFAULT_PROMPT_TEMPLATES } from "../../types/workflow";
import { ApolloLead } from "../../types/apollo-filters";
import { LeadInfo } from "./LeadInfo";
import { PromptTabs } from "./PromptTabs";
import { StepIcon } from "./StepIcon";
import { AIConfigSelector } from "./AIConfigSelector";

interface PromptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  step: WorkflowStep | null;
  lead: ApolloLead | null;
  onUpdatePrompt: (stepId: number, promptTemplate: string, model?: string) => void;
}

export const PromptDialog = ({
  open,
  onOpenChange,
  step,
  lead,
  onUpdatePrompt,
}: PromptDialogProps) => {
  const [promptTemplate, setPromptTemplate] = useState("");
  const [activeTab, setActiveTab] = useState("edit");
  const [copied, setCopied] = useState(false);
  const [generated, setGenerated] = useState("");
  const [generationLoading, setGenerationLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>("");

  useEffect(() => {
    if (step) {
      setPromptTemplate(step.promptTemplate || 
        DEFAULT_PROMPT_TEMPLATES[step.channel || 'email'] || "");
      setSelectedModel(step.model || "gpt-4");
    }
  }, [step]);

  const handleSave = () => {
    if (step) {
      onUpdatePrompt(step.id, promptTemplate, selectedModel);
      onOpenChange(false);
    }
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

  const handleGenerate = () => {
    if (!lead) return;
    
    setGenerationLoading(true);
    
    // Simulate an API call with a timeout
    setTimeout(() => {
      let result = promptTemplate;
      
      // Process template variables
      const firstName = lead.name.split(' ')[0];
      const lastName = lead.name.split(' ').slice(1).join(' ');
      
      result = result
        .replace(/#FirstName#/g, firstName)
        .replace(/#LastName#/g, lastName)
        .replace(/#CompanyName#/g, lead.company || '')
        .replace(/#JobTitle#/g, lead.position || '')
        .replace(/#Industry#/g, lead.industry || '')
        .replace(/#Technologies#/g, (lead.technology || []).join(', '))
        .replace(/#LinkedInProfile#/g, lead.linkedin || '')
        .replace(/#LastLinkedInActivity#/g, 'Posted about industry trends last week')
        .replace(/#InstagramHandle#/g, '@' + firstName.toLowerCase() + lastName.toLowerCase());
      
      // Add more contextual content based on the AI model
      if (selectedModel === "gpt-4") {
        // Add more detailed content for GPT-4
        result += "\n\nIch freue mich auf einen Austausch!\n\nMit freundlichen Grüßen,\nIhr Intellywave Team";
      } else if (selectedModel === "gpt-3.5-turbo") {
        // Add simpler content for GPT-3.5
        result += "\n\nViele Grüße,\nIntellywave Team";
      } else if (selectedModel === "claude-2") {
        // Add Claude-specific content
        result += "\n\nIch würde mich über ein Gespräch freuen.\n\nBeste Grüße aus Berlin,\nIntellywave Team";
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

  if (!step || !lead) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl w-[90vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <StepIcon step={step} />
            {step.title} - {lead.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1">
            <LeadInfo lead={lead} />
            
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
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
