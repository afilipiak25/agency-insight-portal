
import { PreviewSection } from "./PreviewSection";
import { LeadDeepResearchDialog } from "./LeadDeepResearchDialog";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  isApolloConnected?: boolean;
}

export const LeadPreview = ({ 
  showEmailPreview = false, 
  selectedDataSource = "",
  position = "right",
  isApolloConnected = false
}: LeadPreviewProps) => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  if (showEmailPreview) {
    return <PreviewSection />;
  }

  // Generate 1000 example leads
  const generateLeads = (): Lead[] => {
    const companies = ["Acme GmbH", "TechCorp", "Digital Solutions", "Innovation AG", "Future Systems"];
    const positions = ["CEO", "Marketing Director", "Head of Sales", "CTO", "Product Manager"];
    const cities = ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne"];
    
    return Array.from({ length: 1000 }, (_, i) => ({
      name: `Lead ${i + 1}`,
      position: positions[Math.floor(Math.random() * positions.length)],
      company: companies[Math.floor(Math.random() * companies.length)],
      location: `${cities[Math.floor(Math.random() * cities.length)]}, Germany`,
    }));
  };

  const leads = generateLeads();

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border p-4 space-y-4">
        <div className="space-y-1">
          <h2 className="font-semibold text-lg">Preview Leads</h2>
          <p className="text-sm text-violet-600 font-medium">
            {isApolloConnected ? "1,000 leads gefunden" : "54,632 leads total"}
          </p>
        </div>
        
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-3">
            {leads.map((lead, index) => (
              <div
                key={`${lead.name}-${index}`}
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
        </ScrollArea>
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
