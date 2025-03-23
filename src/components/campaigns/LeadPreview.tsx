
import { PreviewSection } from "./PreviewSection";
import { LeadDeepResearchDialog } from "./LeadDeepResearchDialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Search, User, Building, MapPin, Shield, Code } from "lucide-react";
import { useState } from "react";
import { ApolloLead } from "./types/apollo-filters";
import { LeadTableView } from "./LeadTableView";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LeadPreviewProps {
  showEmailPreview?: boolean;
  selectedDataSource?: string;
  position?: "left" | "right";
  isApolloConnected?: boolean;
  leads: ApolloLead[];
  isLoading: boolean;
  totalResults: number;
  showTableView?: boolean;
}

export const LeadPreview = ({ 
  showEmailPreview = false, 
  selectedDataSource = "",
  position = "right",
  isApolloConnected = false,
  leads,
  isLoading,
  totalResults,
  showTableView = false
}: LeadPreviewProps) => {
  const [selectedLead, setSelectedLead] = useState<ApolloLead | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  if (showEmailPreview) {
    return <PreviewSection />;
  }

  if (showTableView) {
    return <LeadTableView leads={leads} isLoading={isLoading} />;
  }

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.position?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="bg-white rounded-lg border shadow-sm p-4 space-y-4 transition-all duration-300 hover:shadow-md">
        <div className="space-y-1">
          <h2 className="font-semibold text-lg gradient-text">Preview Leads</h2>
          <p className="text-sm text-violet-600 font-medium">
            {isApolloConnected ? `${totalResults.toLocaleString()} leads gefunden` : "54,632 leads total"}
          </p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Suchen nach Name, Unternehmen..."
            className="pl-9 bg-gray-50 border-gray-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="space-y-3">
          {isLoading ? (
            <div className="flex items-center justify-center h-44">
              <Loader2 className="w-6 h-6 text-amplifa-purple animate-spin" />
            </div>
          ) : (
            <ScrollArea className="h-[350px] pr-4">
              <div className="space-y-3">
                {filteredLeads.length > 0 ? (
                  filteredLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="p-3 bg-gray-50 rounded-lg border border-gray-100 cursor-pointer hover:border-amplifa-purple/60 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-amplifa flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium truncate">{lead.name}</span>
                          </div>
                          <div className="text-xs text-gray-600 font-medium mb-1 truncate">{lead.position}</div>
                          <div className="flex flex-wrap gap-1 text-xs text-gray-500">
                            {lead.company && (
                              <div className="flex items-center gap-0.5">
                                <Building className="w-3 h-3" />
                                <span>{lead.company}</span>
                              </div>
                            )}
                            {lead.location && (
                              <div className="flex items-center gap-0.5 ml-2">
                                <MapPin className="w-3 h-3" />
                                <span>{lead.location}</span>
                              </div>
                            )}
                          </div>
                          
                          {lead.department && (
                            <div className="mt-2 text-xs text-amplifa-purple/90 font-medium">
                              <Shield className="w-3 h-3 inline mr-1" />
                              {lead.department} • {lead.companySize} employees
                            </div>
                          )}
                          
                          {lead.technology && lead.technology.length > 0 && (
                            <div className="flex gap-1 flex-wrap mt-2">
                              {lead.technology.map((tech, i) => (
                                <span 
                                  key={i} 
                                  className="bg-amplifa-purple/10 text-amplifa-purple px-1.5 py-0.5 rounded-full text-[10px] flex items-center"
                                >
                                  <Code className="w-2 h-2 mr-0.5" />
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>Keine Leads gefunden</p>
                    <p className="text-sm">Bitte passen Sie Ihre Suchparameter an</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          )}
        </div>
        
        <div className="pt-2 border-t">
          <Button 
            variant="gradient" 
            size="sm" 
            className="w-full justify-center"
            onClick={() => {}}
          >
            Alle Leads anzeigen
          </Button>
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
