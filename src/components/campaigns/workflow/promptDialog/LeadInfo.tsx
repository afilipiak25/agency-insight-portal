
import React from "react";
import { Button } from "@/components/ui/button";
import { LinkedinIcon, Globe } from "lucide-react";
import { ApolloLead } from "../../types/apollo-filters";

interface LeadInfoProps {
  lead: ApolloLead;
}

export const LeadInfo = ({ lead }: LeadInfoProps) => {
  return (
    <div className="space-y-4 mt-4 border-t pt-4">
      <div>
        <h3 className="text-sm font-medium mb-1">Lead Informationen</h3>
        <div className="text-sm space-y-1">
          <p><strong>Name:</strong> {lead.name}</p>
          <p><strong>Firma:</strong> {lead.company}</p>
          <p><strong>Position:</strong> {lead.position}</p>
          <p><strong>Branche:</strong> {lead.industry}</p>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-1">Aktionen</h3>
        <div className="space-y-2">
          <Button size="sm" variant="outline" className="w-full justify-start" onClick={() => window.open(lead.linkedin, '_blank')}>
            <LinkedinIcon className="mr-1 h-4 w-4" /> LinkedIn ansehen
          </Button>
          {lead.companyDomain && (
            <Button size="sm" variant="outline" className="w-full justify-start" onClick={() => window.open(`https://${lead.companyDomain}`, '_blank')}>
              <Globe className="mr-1 h-4 w-4" /> Website besuchen
            </Button>
          )}
        </div>
      </div>
      
      <div className="text-xs text-gray-500 border-t pt-4">
        <p>Sie können Variablen wie <code>#FirstName#</code>, <code>#CompanyName#</code>, usw. in Ihrer Vorlage verwenden.</p>
      </div>
    </div>
  );
};
