
import React from "react";
import { Button } from "@/components/ui/button";
import { LinkedinIcon, Globe } from "lucide-react";
import { ApolloLead } from "../../types/apollo-filters";

interface LeadInfoProps {
  lead: ApolloLead;
}

export const LeadInfo = ({ lead }: LeadInfoProps) => {
  return (
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
  );
};
