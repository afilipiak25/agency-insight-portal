
import { useState, ReactElement } from "react";
import { WorkflowStep, DEFAULT_PROMPT_TEMPLATES } from "../types/workflow";
import { Mail, Linkedin, Eye, Instagram } from "lucide-react";

export const useWorkflowSteps = () => {
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([
    {
      id: 1,
      sequenceNum: 1,
      type: 'email',
      icon: <Mail className="w-4 h-4 text-purple-600" /> as ReactElement,
      title: 'First Mail',
      content: '<p>Personalized first outreach email</p>',
      waitDays: 2,
      channel: 'email',
      promptTemplate: DEFAULT_PROMPT_TEMPLATES['email'],
    },
    {
      id: 2,
      sequenceNum: 2,
      type: 'linkedin',
      icon: <Linkedin className="w-4 h-4 text-blue-600" /> as ReactElement,
      title: 'LinkedIn Message',
      content: '<p>LinkedIn connection message</p>',
      waitDays: 2,
      channel: 'linkedin',
      promptTemplate: DEFAULT_PROMPT_TEMPLATES['linkedin'],
    },
    {
      id: 3,
      sequenceNum: 3,
      type: 'profile-visit',
      icon: <Eye className="w-4 h-4 text-gray-600" /> as ReactElement,
      title: 'Profile Visit',
      content: '<p>Visit LinkedIn profile</p>',
      waitDays: 1,
      channel: 'profile-visit',
      promptTemplate: DEFAULT_PROMPT_TEMPLATES['profile-visit'],
    },
    {
      id: 4,
      sequenceNum: 4,
      type: 'instagram',
      icon: <Instagram className="w-4 h-4 text-pink-600" /> as ReactElement,
      title: 'Instagram DM',
      content: '<p>Instagram direct message</p>',
      waitDays: 2,
      channel: 'instagram',
      promptTemplate: DEFAULT_PROMPT_TEMPLATES['instagram'],
    },
    {
      id: 5,
      sequenceNum: 5,
      type: 'email',
      icon: <Mail className="w-4 h-4 text-purple-600" /> as ReactElement,
      title: 'Follow-up Email',
      content: '<p>Follow-up email</p>',
      waitDays: 0,
      channel: 'email',
      promptTemplate: DEFAULT_PROMPT_TEMPLATES['email-followup'],
    }
  ]);
  
  const [selectedStepId, setSelectedStepId] = useState<number | null>(null);
  const [selectedPromptStep, setSelectedPromptStep] = useState<WorkflowStep | null>(null);
  
  const updateSteps = (newSteps: WorkflowStep[]) => {
    setWorkflowSteps(newSteps);
  };

  const updateWaitDays = (stepId: number, increment: boolean) => {
    setWorkflowSteps(workflowSteps.map(step => 
      step.id === stepId 
        ? {...step, waitDays: increment ? step.waitDays + 1 : Math.max(0, step.waitDays - 1)} 
        : step
    ));
  };
  
  const updateStepPrompt = (stepId: number, promptTemplate: string) => {
    setWorkflowSteps(workflowSteps.map(step => 
      step.id === stepId 
        ? {...step, promptTemplate} 
        : step
    ));
  };

  return {
    workflowSteps,
    selectedStepId,
    selectedPromptStep,
    setSelectedStepId,
    setSelectedPromptStep,
    updateSteps,
    updateWaitDays,
    updateStepPrompt
  };
};
