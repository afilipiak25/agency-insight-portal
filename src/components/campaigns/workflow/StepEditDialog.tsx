
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Bot, Settings, Database, Mouse, Save, Mail, Linkedin, Instagram, Eye } from "lucide-react";
import { WorkflowStep, DEFAULT_PROMPT_TEMPLATES } from "../types/workflow";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface StepEditDialogProps {
  selectedStepId: number | null;
  steps: WorkflowStep[];
  updateSteps: (newSteps: WorkflowStep[]) => void;
  updateWaitDays: (stepId: number, increment: boolean) => void;
}

export const StepEditDialog = ({ 
  selectedStepId, 
  steps, 
  updateSteps,
  updateWaitDays 
}: StepEditDialogProps) => {
  const selectedStep = selectedStepId ? steps.find(s => s.id === selectedStepId) : null;
  const [activeTab, setActiveTab] = useState<string>("content");
  const [localPromptTemplate, setLocalPromptTemplate] = useState<string>("");
  const [localTitle, setLocalTitle] = useState<string>("");
  
  // Initialize local state when the selected step changes
  React.useEffect(() => {
    if (selectedStep) {
      setLocalPromptTemplate(selectedStep.promptTemplate || "");
      setLocalTitle(selectedStep.title || "");
    }
  }, [selectedStep]);
  
  if (!selectedStep) return null;

  const isEmailStep = selectedStep.type === 'email' || selectedStep.channel === 'email';
  const isLinkedInStep = selectedStep.type === 'linkedin' || selectedStep.channel === 'linkedin';
  const isProfileVisitStep = selectedStep.type === 'profile-visit' || selectedStep.channel === 'profile-visit';
  const isInstagramStep = selectedStep.type === 'instagram' || selectedStep.channel === 'instagram';

  const getChannelIcon = () => {
    if (isEmailStep) return <Mail className="w-6 h-6 text-purple-600" />;
    if (isLinkedInStep) return <Linkedin className="w-6 h-6 text-blue-600" />;
    if (isProfileVisitStep) return <Eye className="w-6 h-6 text-gray-600" />;
    if (isInstagramStep) return <Instagram className="w-6 h-6 text-pink-600" />;
    return selectedStep.icon;
  };

  const getDefaultPromptForChannel = (channel?: string) => {
    if (!channel) return "";
    return DEFAULT_PROMPT_TEMPLATES[channel] || "";
  };

  const handleChannelChange = (channel: string) => {
    const defaultPrompt = getDefaultPromptForChannel(channel);
    setLocalPromptTemplate(defaultPrompt);
    
    updateSteps(steps.map(step => 
      step.id === selectedStepId 
        ? {
            ...step, 
            channel: channel as 'email' | 'linkedin' | 'profile-visit' | 'instagram' | 'other',
            promptTemplate: defaultPrompt
          } 
        : step
    ));
  };

  const handleUseCaseChange = (useCase: string) => {
    updateSteps(steps.map(step => 
      step.id === selectedStepId 
        ? {...step, useCase: useCase as 'web-research' | 'content-creation' | 'other'} 
        : step
    ));
  };

  const handleModelChange = (model: string) => {
    updateSteps(steps.map(step => 
      step.id === selectedStepId 
        ? {...step, model} 
        : step
    ));
  };

  const handleTitleChange = (title: string) => {
    setLocalTitle(title);
  };

  const handlePromptTemplateChange = (promptTemplate: string) => {
    setLocalPromptTemplate(promptTemplate);
  };

  const saveChanges = () => {
    updateSteps(steps.map(step => 
      step.id === selectedStepId 
        ? {
            ...step, 
            title: localTitle,
            promptTemplate: localPromptTemplate
          } 
        : step
    ));
  };

  return (
    <Dialog open={!!selectedStepId} onOpenChange={(open) => !open && saveChanges()}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: selectedStep.color ? `${selectedStep.color}15` : '#f3f4f6' }}>
              {getChannelIcon()}
            </span>
            {selectedStep.title}
          </DialogTitle>
          <DialogDescription>
            Configure your workflow step settings
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="ai">AI Configuration</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-4 p-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Step Title
                </label>
                <Input
                  type="text"
                  value={localTitle}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Prompt Template
                </label>
                <Textarea
                  value={localPromptTemplate}
                  onChange={(e) => handlePromptTemplateChange(e.target.value)}
                  placeholder="Enter prompt template..."
                  className="min-h-[200px] font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use variables like #FirstName#, #CompanyName#, etc.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Channel
                </label>
                <Select 
                  value={selectedStep.channel || 'email'} 
                  onValueChange={handleChannelChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select channel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="profile-visit">Profile Visit</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 flex items-center justify-between">
                  <span>Wait days</span>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-6 w-6"
                      onClick={() => updateWaitDays(selectedStep.id, false)}
                      disabled={selectedStep.waitDays <= 0}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center">{selectedStep.waitDays}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-6 w-6"
                      onClick={() => updateWaitDays(selectedStep.id, true)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </label>
                <div className="mt-2 p-4 border rounded-md bg-gray-50">
                  <p className="text-sm text-gray-600">
                    Wait <span className="font-medium">{selectedStep.waitDays}</span> days after the previous step before executing this step.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ai" className="space-y-4 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Use Case
                </label>
                <RadioGroup 
                  value={selectedStep.useCase || 'content-creation'} 
                  onValueChange={handleUseCaseChange}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="content-creation" id="content" />
                    <Label htmlFor="content" className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-purple-600" />
                      Content Creation
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="web-research" id="research" />
                    <Label htmlFor="research" className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-blue-600" />
                      Web Research
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other" className="flex items-center gap-2">
                      <Mouse className="w-4 h-4 text-gray-600" />
                      Other
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">
                  AI Model
                </label>
                <Select 
                  value={selectedStep.model || 'gpt-4'} 
                  onValueChange={handleModelChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4">GPT-4 (Recommended)</SelectItem>
                    <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo (Faster)</SelectItem>
                    <SelectItem value="claude-2">Claude 2</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">
                  GPT-4 provides the best results but is slower. GPT-3.5 is faster but may be less accurate.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-6">
          <Button className="gap-2" onClick={saveChanges}>
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
