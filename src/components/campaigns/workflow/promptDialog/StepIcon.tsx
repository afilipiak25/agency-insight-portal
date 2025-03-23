
import React from "react";
import { Mail, LinkedinIcon, Eye, Instagram } from "lucide-react";
import { WorkflowStep } from "../../types/workflow";

interface StepIconProps {
  step: WorkflowStep;
}

export const StepIcon = ({ step }: StepIconProps) => {
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
