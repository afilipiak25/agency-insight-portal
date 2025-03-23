
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Mail, Linkedin, Eye, Instagram } from 'lucide-react';
import { WorkflowStep } from '../../types/workflow';
import { Node } from '@xyflow/react';

interface WorkflowNodeProps {
  step: WorkflowStep;
  stepLeads: any[];
  isSimulating: boolean;
  activeNodeId: string | null;
}

export const getStepIcon = (step: WorkflowStep) => {
  switch (step.channel) {
    case 'email':
      return <Mail className="w-5 h-5 text-pink-500" />;
    case 'linkedin':
      return <Linkedin className="w-5 h-5 text-blue-500" />;
    case 'profile-visit':
      return <Eye className="w-5 h-5 text-gray-500" />;
    case 'instagram':
      return <Instagram className="w-5 h-5 text-pink-600" />;
    default:
      return <Mail className="w-5 h-5 text-purple-500" />;
  }
};

export const WorkflowNode: React.FC<WorkflowNodeProps> = ({ 
  step, 
  stepLeads, 
  isSimulating, 
  activeNodeId 
}) => {
  // Calculate statistics for the step
  const deliveryRate = Math.floor(85 + Math.random() * 15);
  const openRate = Math.floor(30 + Math.random() * 50);
  
  return (
    <div className="p-2 w-full">
      <div className="flex items-center gap-2 font-semibold">
        {getStepIcon(step)}
        <span>{step.title} {step.waitDays > 0 ? `(${step.waitDays} days)` : ''}</span>
      </div>
      <div className="text-sm text-gray-500 mt-1">{step.content}</div>
      <div className="flex gap-2 mt-2">
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{deliveryRate}% Delivered</Badge>
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{openRate}% Opened</Badge>
      </div>
    </div>
  );
};
