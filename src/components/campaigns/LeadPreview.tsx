
import { PreviewSection } from "./PreviewSection";
import { LeadDeepResearchDialog } from "./LeadDeepResearchDialog";
import { ApolloIntegration } from "./ApolloIntegration";
import { useState } from "react";

interface Lead {
  name: string;
  position: string;
  company: string;
  location: string;
}

interface LeadPreviewProps {
  showEmailPreview?: boolean;
  selectedDataSource?: string;
  position?: "left" | "right";
}

export const LeadPreview = ({ 
  showEmailPreview = false, 
  selectedDataSource = "",
  position = "right"
}: LeadPreviewProps) => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  if (showEmailPreview) {
    return <PreviewSection />;
  }

  if (selectedDataSource === "b2b") {
    return <ApolloIntegration />;
  }

  const leads: Lead[] = [
    {
      name: "Marc Nagel",
      position: "CEO",
      company: "Acme GmbH",
      location: "Berlin, Germany",
    },
    {
      name: "Sarah Weber",
      position: "Marketing Director",
      company: "TechCorp",
      location: "Munich, Germany",
    },
    {
      name: "Thomas Müller",
      position: "Head of Sales",
      company: "Digital Solutions",
      location: "Hamburg, Germany",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border p-4 space-y-4">
        <div className="space-y-1">
          <h2 className="font-semibold text-lg">Preview Leads</h2>
          <p className="text-sm text-violet-600 font-medium">54,632 leads total</p>
        </div>
        
        <div className="space-y-3">
          {leads.map((lead) => (
            <div
              key={lead.name}
              className="p-3 bg-gray-50 rounded-lg border border-gray-100 cursor-pointer hover:border-violet-500 transition-colors"
              onClick={() => setSelectedLead(lead)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{lead.name}</span>
                <span className="text-xs text-gray-500">{lead.position}</span>
              </div>
              <div className="text-xs text-gray-500">
                {lead.company} • {lead.location}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedLead && (
        <LeadDeepResearchDialog
          lead={selectedLead}
          open={!!selectedLead}
          onClose={() => setSelectedLead(null)}
        />
      )}
    </div>
  );
};
