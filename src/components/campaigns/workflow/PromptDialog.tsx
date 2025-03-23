
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { WorkflowStep, DEFAULT_PROMPT_TEMPLATES } from "../types/workflow";
import { ApolloLead } from "../types/apollo-filters";
import { LeadInfo } from "./promptDialog/LeadInfo";
import { PromptTabs } from "./promptDialog/PromptTabs";
import { StepIcon } from "./promptDialog/StepIcon";

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
  const [promptTemplate, setPromptTemplate] = useState("");
  const [activeTab, setActiveTab] = useState("edit");
  const [copied, setCopied] = useState(false);
  const [generated, setGenerated] = useState("");

  useEffect(() => {
    if (step) {
      setPromptTemplate(step.promptTemplate || 
        DEFAULT_PROMPT_TEMPLATES[step.channel || 'email'] || "");
    }
  }, [step]);

  const handleSave = () => {
    if (step) {
      onUpdatePrompt(step.id, promptTemplate);
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
    // This would normally call an API to generate text based on the prompt and lead data
    // For now, we'll create a simple simulation
    let result = promptTemplate;
    
    if (lead) {
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
    }
    
    setGenerated(result);
    setActiveTab("preview");
  };

  if (!step || !lead) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[90vw] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <StepIcon step={step} />
            {step.title} - {lead.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-4 gap-4">
          <LeadInfo lead={lead} />
          
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
