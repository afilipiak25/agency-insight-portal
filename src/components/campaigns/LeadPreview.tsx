
import { PreviewSection } from "./PreviewSection";
import { LeadDeepResearchDialog } from "./LeadDeepResearchDialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, LayoutGrid, List, ChevronDown } from "lucide-react";
import { useState } from "react";
import { ApolloLead } from "./types/apollo-filters";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mockLeadData } from "../leads/mockLeadData";

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
  const [viewMode, setViewMode] = useState<"card" | "table">("card");

  if (showEmailPreview) {
    return <PreviewSection />;
  }

  const renderCardView = () => (
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
  );

  const renderTableView = () => (
    <div className="border border-gray-100 rounded-lg overflow-hidden">
      <ScrollArea className="h-[500px]">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="p-2 text-left font-medium">Name</th>
              <th className="p-2 text-left font-medium">Position</th>
              <th className="p-2 text-left font-medium">Company</th>
            </tr>
          </thead>
          <tbody>
            {mockLeadData.map((lead) => (
              <tr key={lead.id} className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer">
                <td className="p-2 font-medium">{lead.fullName}</td>
                <td className="p-2 text-gray-600">{lead.jobTitle}</td>
                <td className="p-2 text-gray-600">{lead.company}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollArea>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border p-4 space-y-4">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h2 className="font-semibold text-lg">Preview Leads</h2>
            <p className="text-sm text-violet-600 font-medium">
              {isApolloConnected ? `${totalResults} leads gefunden` : "54,632 leads total"}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex border rounded overflow-hidden">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`p-1 h-8 ${viewMode === 'card' ? 'bg-gray-100' : ''}`}
                onClick={() => setViewMode("card")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`p-1 h-8 ${viewMode === 'table' ? 'bg-gray-100' : ''}`}
                onClick={() => setViewMode("table")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  <span className="text-xs">View</span>
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => window.location.href = "/lead-overview"}>
                  Full-page view
                </DropdownMenuItem>
                <DropdownMenuItem>Export as CSV</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="space-y-3">
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="w-6 h-6 text-violet-600 animate-spin" />
            </div>
          ) : viewMode === "card" ? (
            renderCardView()
          ) : (
            renderTableView()
          )}
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
