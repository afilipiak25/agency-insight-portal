
import { WorkflowStep, DEFAULT_PROMPT_TEMPLATES } from "../../../types/workflow";
import { ReactElement } from "react";
import { Mail, Linkedin, Eye, Instagram } from "lucide-react";

export const getDefaultPromptForChannel = (channel?: string): string => {
  if (!channel) return "";
  return DEFAULT_PROMPT_TEMPLATES[channel] || "";
};

export const getChannelIcon = (step: WorkflowStep): ReactElement => {
  const isEmailStep = step.type === 'email' || step.channel === 'email';
  const isLinkedInStep = step.type === 'linkedin' || step.channel === 'linkedin';
  const isProfileVisitStep = step.type === 'profile-visit' || step.channel === 'profile-visit';
  const isInstagramStep = step.type === 'instagram' || step.channel === 'instagram';

  if (isEmailStep) return <Mail className="w-6 h-6 text-purple-600" />;
  if (isLinkedInStep) return <Linkedin className="w-6 h-6 text-blue-600" />;
  if (isProfileVisitStep) return <Eye className="w-6 h-6 text-gray-600" />;
  if (isInstagramStep) return <Instagram className="w-6 h-6 text-pink-600" />;
  return step.icon;
};
