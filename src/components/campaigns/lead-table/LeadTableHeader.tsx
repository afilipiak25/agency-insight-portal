
import React from "react";
import { WorkflowStep } from "../types/workflow";

interface LeadTableHeaderProps {
  toggleSelectAll: () => void;
  selectedLeads: string[];
  totalLeads: number;
  workflowSteps: WorkflowStep[];
  onStepClick: (stepId: number) => void;
}

export const LeadTableHeader: React.FC<LeadTableHeaderProps> = ({
  toggleSelectAll,
  selectedLeads,
  totalLeads,
  workflowSteps,
  onStepClick
}) => {
  return (
    <thead>
      <tr className="bg-gray-50 border-b">
        <th className="px-4 py-3 text-left sticky left-0 bg-gray-50 z-10">
          <input 
            type="checkbox" 
            className="rounded border-gray-300"
            checked={selectedLeads.length === totalLeads && totalLeads > 0}
            onChange={toggleSelectAll}
          />
        </th>
        <th className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap">First Name</th>
        <th className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap">Last Name</th>
        <th className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap">Full Name</th>
        <th className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap">Job Title</th>
        <th className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap">Location</th>
        <th className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap">Company Domain</th>
        <th className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap">LinkedIn Profile</th>
        <th className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap">Scrape Website</th>
        <th className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap">Enrich Person</th>
        <th className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap">Find Email</th>
        <th className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap">Find Work Email (1)</th>
        <th className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap">Find Work Email (2)</th>
        <th className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap">Find Work Email (3)</th>
        <th className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap">Find Work Email (4)</th>
        <th className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap">Find Work Email (5)</th>
        <th className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap">Connections</th>
        <th className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap">Followers</th>
        <th className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap">Industry</th>
        <th className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap">Company Size</th>
        <th className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap">Technologies</th>
        
        {workflowSteps.map((step) => (
          <th 
            key={step.id} 
            className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap cursor-pointer hover:bg-gray-100"
            onClick={() => onStepClick(step.id)}
          >
            <div className="flex items-center gap-1">
              {step.icon}
              {step.title}
            </div>
          </th>
        ))}
        
        <th className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap">Actions</th>
      </tr>
    </thead>
  );
};
