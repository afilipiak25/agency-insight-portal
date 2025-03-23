
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, LinkedinIcon, Eye, Instagram, AlertCircle, 
  Copy, Check, RotateCcw, ArrowRight, Globe
} from "lucide-react";
import { WorkflowStep, DEFAULT_PROMPT_TEMPLATES } from "../types/workflow";
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

  const getStepIcon = () => {
    if (!step) return null;
    
    switch (step.channel) {
      case 'email':
        return <Mail className="h-5 w-5 text-purple-500" />;
      case 'linkedin':
        return <LinkedinIcon className="h-5 w-5 text-blue-500" />;
      case 'profile-visit':
        return <Eye className="h-5 w-5 text-gray-500" />;
      case 'instagram':
        return <Instagram className="h-5 w-5 text-pink-500" />;
      default:
        return null;
    }
  };

  if (!step || !lead) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[90vw] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getStepIcon()}
            {step.title} - {lead.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1 space-y-4 border-r pr-4">
            <div>
              <h3 className="text-sm font-medium mb-1">Lead Information</h3>
              <div className="text-sm space-y-1">
                <p><strong>Name:</strong> {lead.name}</p>
                <p><strong>Company:</strong> {lead.company}</p>
                <p><strong>Position:</strong> {lead.position}</p>
                <p><strong>Industry:</strong> {lead.industry}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-1">Actions</h3>
              <div className="space-y-2">
                <Button size="sm" variant="outline" className="w-full justify-start" onClick={() => window.open(lead.linkedin, '_blank')}>
                  <LinkedinIcon className="mr-1 h-4 w-4" /> View LinkedIn
                </Button>
                {lead.companyDomain && (
                  <Button size="sm" variant="outline" className="w-full justify-start" onClick={() => window.open(`https://${lead.companyDomain}`, '_blank')}>
                    <Globe className="mr-1 h-4 w-4" /> Visit Website
                  </Button>
                )}
              </div>
            </div>
            
            <div className="text-xs text-gray-500 border-t pt-4">
              <p>You can use variables like <code>#FirstName#</code>, <code>#CompanyName#</code>, etc. in your prompt template.</p>
            </div>
          </div>
          
          <div className="col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="edit">Edit Prompt</TabsTrigger>
                <TabsTrigger value="preview">Preview Result</TabsTrigger>
              </TabsList>
              
              <TabsContent value="edit" className="space-y-4">
                <div className="flex items-center text-amber-600 text-sm bg-amber-50 p-2 rounded">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <p>Edit this prompt template to customize the outreach message.</p>
                </div>
                
                <Textarea 
                  className="min-h-[350px] font-mono text-sm"
                  value={promptTemplate}
                  onChange={(e) => setPromptTemplate(e.target.value)}
                />
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleReset}>
                    <RotateCcw className="mr-1 h-4 w-4" /> Reset to Default
                  </Button>
                  <Button onClick={handleGenerate}>
                    <ArrowRight className="mr-1 h-4 w-4" /> Generate Preview
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="preview" className="space-y-4">
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
              </TabsContent>
            </Tabs>
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
