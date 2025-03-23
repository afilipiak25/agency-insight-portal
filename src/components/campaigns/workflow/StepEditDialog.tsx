
import React, { useState } from "react";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Bot, Settings, Database, Mouse, Save, Mail, Linkedin, Instagram, Eye } from "lucide-react";
import { WorkflowStep, DEFAULT_PROMPT_TEMPLATES } from "../types/workflow";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
    updateSteps(steps.map(step => 
      step.id === selectedStepId 
        ? {
            ...step, 
            channel: channel as 'email' | 'linkedin' | 'profile-visit' | 'instagram' | 'other',
            promptTemplate: getDefaultPromptForChannel(channel)
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

  const handlePromptTemplateChange = (promptTemplate: string) => {
    updateSteps(steps.map(step => 
      step.id === selectedStepId 
        ? {...step, promptTemplate} 
        : step
    ));
  };

  return (
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: selectedStep.color ? `${selectedStep.color}15` : '#f3f4f6' }}>
            {getChannelIcon()}
          </span>
          {selectedStep.title}
        </DialogTitle>
      </DialogHeader>
      
      <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="content" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Inhalt
          </TabsTrigger>
          <TabsTrigger value="prompt" className="flex items-center gap-2">
            <Bot className="w-4 h-4" />
            Prompt-Vorlage
          </TabsTrigger>
          <TabsTrigger value="data" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            Daten & Variablen
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="space-y-4">
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              {getChannelIcon()}
            </div>
            <div>
              <h3 className="font-medium">{selectedStep.title}</h3>
              <p className="text-sm text-gray-500">Bearbeite den Inhalt dieses Schritts</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Inhalt</label>
            <Textarea 
              className="min-h-[200px]"
              value={selectedStep.content.replace(/<\/?p>/g, '') || ''}
              onChange={(e) => {
                const value = e.target.value;
                updateSteps(steps.map(step => 
                  step.id === selectedStepId 
                    ? {...step, content: `<p>${value.replace(/\n/g, '</p><p>')}</p>`} 
                    : step
                ));
              }}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Wartezeit (Tage)</label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  if (selectedStep.waitDays > 0) {
                    updateWaitDays(selectedStep.id, false);
                  }
                }}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-medium">
                {selectedStep.waitDays || 0}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateWaitDays(selectedStep.id, true)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="prompt" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="text-sm font-medium">Kommunikationskanal</label>
              <RadioGroup 
                defaultValue={selectedStep.channel || 'email'} 
                onValueChange={handleChannelChange}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="channel-email" />
                  <Label htmlFor="channel-email">E-Mail</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="linkedin" id="channel-linkedin" />
                  <Label htmlFor="channel-linkedin">LinkedIn Nachricht</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="profile-visit" id="channel-profile" />
                  <Label htmlFor="channel-profile">Profilbesuch</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="instagram" id="channel-instagram" />
                  <Label htmlFor="channel-instagram">Instagram DM</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="channel-other" />
                  <Label htmlFor="channel-other">Andere Aktion</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-medium">Anwendungsfall</label>
              <RadioGroup 
                defaultValue={selectedStep.useCase || 'web-research'} 
                onValueChange={handleUseCaseChange}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="web-research" id="usecase-research" />
                  <Label htmlFor="usecase-research">Web-Recherche (mit Internet-Zugang)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="content-creation" id="usecase-content" />
                  <Label htmlFor="usecase-content">Inhaltserstellung</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="usecase-other" />
                  <Label htmlFor="usecase-other">Anderer Anwendungsfall</Label>
                </div>
              </RadioGroup>
              
              <div className="pt-3">
                <label className="text-sm font-medium">KI-Modell</label>
                <Select 
                  defaultValue={selectedStep.model || 'gpt-4o-mini'}
                  onValueChange={handleModelChange}
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Modell auswählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4o-mini">OpenAI {'>'} GPT 4o Mini</SelectItem>
                    <SelectItem value="gpt-4o">OpenAI {'>'} GPT 4o</SelectItem>
                    <SelectItem value="claude-3-5-sonnet">Anthropic {'>'} Claude 3.5 Sonnet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="space-y-3 pt-2">
            <label className="text-sm font-medium">Prompt-Vorlage</label>
            <Textarea 
              className="min-h-[250px] font-mono text-sm"
              value={selectedStep.promptTemplate || getDefaultPromptForChannel(selectedStep.channel)}
              onChange={(e) => handlePromptTemplateChange(e.target.value)}
              placeholder={"#CONTEXT#\nErstelle eine personalisierte Nachricht basierend auf:\n- Name: #FirstName# #LastName#\n- Firma: #CompanyName#\n\n#IMPORTANT#\nNutze freundlichen, aber professionellen Ton."}
            />
          </div>
          
          <div className="flex justify-end">
            <Button className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Als Template speichern
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="data" className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">Verfügbare Datenfelder</h3>
            <p className="text-sm text-gray-500">
              Diese Variablen können im Prompt oder Inhalt verwendet werden:
            </p>
            
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="p-3 bg-gray-50 rounded-lg border">
                <p className="font-mono text-sm font-medium">#FirstName#</p>
                <p className="text-xs text-gray-500">Vorname des Kontakts</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border">
                <p className="font-mono text-sm font-medium">#LastName#</p>
                <p className="text-xs text-gray-500">Nachname des Kontakts</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border">
                <p className="font-mono text-sm font-medium">#CompanyName#</p>
                <p className="text-xs text-gray-500">Firmenname</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border">
                <p className="font-mono text-sm font-medium">#JobTitle#</p>
                <p className="text-xs text-gray-500">Position/Jobtitel</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border">
                <p className="font-mono text-sm font-medium">#LinkedInProfile#</p>
                <p className="text-xs text-gray-500">LinkedIn Profil-URL</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border">
                <p className="font-mono text-sm font-medium">#InstagramHandle#</p>
                <p className="text-xs text-gray-500">Instagram Benutzername</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border">
                <p className="font-mono text-sm font-medium">#LastLinkedInActivity#</p>
                <p className="text-xs text-gray-500">Letzte Aktivität auf LinkedIn</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border">
                <p className="font-mono text-sm font-medium">#Department#</p>
                <p className="text-xs text-gray-500">Abteilung</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border">
                <p className="font-mono text-sm font-medium">#Industry#</p>
                <p className="text-xs text-gray-500">Branche</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border">
                <p className="font-mono text-sm font-medium">#Technologies#</p>
                <p className="text-xs text-gray-500">Verwendete Technologien</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border">
                <p className="font-mono text-sm font-medium">#Location#</p>
                <p className="text-xs text-gray-500">Standort</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border">
                <p className="font-mono text-sm font-medium">#CompanySize#</p>
                <p className="text-xs text-gray-500">Unternehmensgröße</p>
              </div>
            </div>
            
            <div className="mt-4">
              <Button variant="outline" className="gap-2">
                <Plus className="w-4 h-4" />
                Benutzerdefiniertes Feld hinzufügen
              </Button>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h4 className="font-medium text-amber-800 flex items-center gap-2">
              <Mouse className="w-4 h-4" />
              Tipp zur Verwendung
            </h4>
            <p className="text-sm text-amber-700 mt-1">
              Verwende die oben genannten Variablen im Format #Variable# in deinen Prompts oder Inhalten. Sie werden automatisch mit den tatsächlichen Werten ersetzt, wenn der Schritt ausgeführt wird.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </DialogContent>
  );
};
