
import { PreviewSection } from "./PreviewSection";
import { LeadDeepResearchDialog } from "./LeadDeepResearchDialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { ApolloLead } from "./types/apollo-filters";

interface LeadPreviewProps {
  showEmailPreview?: boolean;
  selectedDataSource?: string;
  position?: "left" | "right";
  isApolloConnected?: boolean;
  leads: ApolloLead[];
  isLoading: boolean;
  totalResults: number;
}

export const LeadPreview = ({ 
  showEmailPreview = false, 
  selectedDataSource = "",
  position = "right",
  isApolloConnected = false,
  leads,
  isLoading,
  totalResults
}: LeadPreviewProps) => {
  const [selectedLead, setSelectedLead] = useState<ApolloLead | null>(null);

  if (showEmailPreview) {
    return <PreviewSection />;
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border p-4 space-y-4">
        <div className="space-y-1">
          <h2 className="font-semibold text-lg">Preview Leads</h2>
          <p className="text-sm text-violet-600 font-medium">
            {isApolloConnected ? `${totalResults} leads gefunden` : "54,632 leads total"}
          </p>
        </div>
        
        <ScrollArea className="h-[600px] pr-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="w-6 h-6 text-violet-600 animate-spin" />
            </div>
          ) : (
            <div className="space-y-3">
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  className="p-3 bg-gray-50 rounded-lg border border-gray-100 cursor-pointer hover:border-violet-500 transition-colors"
                  onClick={() => setSelectedLead(lead)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{lead.name}</span>
                    <span className="text-xs text-gray-500">{lead.position}</span>
                  </div>
                  <div className="text-xs text-gray-500 space-y-1">
                    <div>{lead.company} • {lead.location}</div>
                    {lead.department && (
                      <div className="text-violet-600">
                        {lead.department} • {lead.companySize} employees
                      </div>
                    )}
                    {lead.technology && lead.technology.length > 0 && (
                      <div className="flex gap-1 flex-wrap">
                        {lead.technology.map((tech, i) => (
                          <span key={i} className="bg-violet-50 text-violet-600 px-1.5 py-0.5 rounded-full text-[10px]">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
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
