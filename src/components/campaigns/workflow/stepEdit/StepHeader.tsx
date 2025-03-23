
import React from "react";
import { WorkflowStep } from "../../types/workflow";
import { Mail, Linkedin, Eye, Instagram } from "lucide-react";

interface StepHeaderProps {
  selectedStep: WorkflowStep;
}

export const StepHeader = ({ selectedStep }: StepHeaderProps) => {
  const getChannelIcon = () => {
    const isEmailStep = selectedStep.type === 'email' || selectedStep.channel === 'email';
    const isLinkedInStep = selectedStep.type === 'linkedin' || selectedStep.channel === 'linkedin';
    const isProfileVisitStep = selectedStep.type === 'profile-visit' || selectedStep.channel === 'profile-visit';
    const isInstagramStep = selectedStep.type === 'instagram' || selectedStep.channel === 'instagram';

    if (isEmailStep) return <Mail className="w-6 h-6 text-purple-600" />;
    if (isLinkedInStep) return <Linkedin className="w-6 h-6 text-blue-600" />;
    if (isProfileVisitStep) return <Eye className="w-6 h-6 text-gray-600" />;
    if (isInstagramStep) return <Instagram className="w-6 h-6 text-pink-600" />;
    return selectedStep.icon;
  };

  return (
    <div className="flex items-center gap-2">
      <span className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: selectedStep.color ? `${selectedStep.color}15` : '#f3f4f6' }}>
        {getChannelIcon()}
      </span>
      {selectedStep.title}
    </div>
  );
};
