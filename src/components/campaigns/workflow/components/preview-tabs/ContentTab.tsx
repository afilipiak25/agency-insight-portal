
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Pencil } from 'lucide-react';
import { WorkflowStep } from '../../../types/workflow';

interface ContentTabProps {
  selectedStep: WorkflowStep;
}

export const ContentTab: React.FC<ContentTabProps> = ({ selectedStep }) => {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border p-4">
        <h3 className="text-sm font-semibold mb-2 text-gray-500">Message Content</h3>
        <div className="prose prose-sm max-w-none">
          {selectedStep.content ? (
            <div className="text-gray-800 whitespace-pre-line">
              {selectedStep.content}
            </div>
          ) : (
            <div className="text-gray-400 italic">No content available for preview</div>
          )}
        </div>
      </div>
      
      <div className="bg-white rounded-lg border p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-semibold text-gray-500">Template Variables</h3>
          <Button size="sm" variant="ghost" className="h-8 text-xs">
            <Pencil className="h-3 w-3 mr-1" /> Edit
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gray-50 p-2 rounded text-xs">
            <span className="font-mono text-blue-600">#FirstName#</span>
            <span className="text-gray-400 ml-2">First name</span>
          </div>
          <div className="bg-gray-50 p-2 rounded text-xs">
            <span className="font-mono text-blue-600">#CompanyName#</span>
            <span className="text-gray-400 ml-2">Company</span>
          </div>
          <div className="bg-gray-50 p-2 rounded text-xs">
            <span className="font-mono text-blue-600">#JobTitle#</span>
            <span className="text-gray-400 ml-2">Job title</span>
          </div>
          <div className="bg-gray-50 p-2 rounded text-xs">
            <span className="font-mono text-blue-600">#Industry#</span>
            <span className="text-gray-400 ml-2">Industry</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-semibold text-gray-500">Sending Schedule</h3>
          <div className="flex items-center mt-1 text-xs text-gray-600">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            <span>
              {selectedStep.waitDays === 0 
                ? 'Sent immediately after campaign start' 
                : `Sent ${selectedStep.waitDays} days after previous step`}
            </span>
          </div>
        </div>
        <Button size="sm" variant="outline" className="h-8 text-xs">
          <Pencil className="h-3 w-3 mr-1" /> Adjust Timing
        </Button>
      </div>
    </div>
  );
};
