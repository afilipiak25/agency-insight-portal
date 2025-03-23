
import React, { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ApolloLead } from "../../types/apollo-filters";
import { Check, ChevronDown, Search, User } from "lucide-react";

interface LeadSelectorProps {
  leads: ApolloLead[];
  selectedLead: ApolloLead | null;
  onLeadSelect: (lead: ApolloLead) => void;
}

export const LeadSelector = ({ leads, selectedLead, onLeadSelect }: LeadSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Filter leads based on search term
  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.position?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle scrolling for infinite scroll (simplified version)
  const handleScroll = () => {
    // In a real implementation, you would load more leads here
    // when the user scrolls near the bottom
    console.log("Scroll detected, would load more leads in a real implementation");
  };

  useEffect(() => {
    const scrollArea = scrollRef.current;
    if (scrollArea) {
      scrollArea.addEventListener("scroll", handleScroll);
      return () => scrollArea.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium mb-1">Lead auswählen</h3>
      
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full flex justify-between items-center h-10 px-3 py-2 bg-white"
          >
            <div className="flex items-center gap-2 text-left truncate">
              <User className="h-4 w-4 text-amplifa-purple" />
              <span className="truncate">
                {selectedLead ? selectedLead.name : "Lead auswählen"}
              </span>
            </div>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="w-[300px] p-0 bg-white shadow-md rounded-md border border-gray-200" 
          align="start"
        >
          <div className="p-2 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-amplifa-purple/60" />
              <Input
                placeholder="Suchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-2 py-1 h-9 text-sm border-gray-200"
              />
            </div>
          </div>
          
          <ScrollArea className="h-[220px] rounded-md" ref={scrollRef}>
            <div className="p-1">
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <button
                    key={lead.id}
                    className={`flex items-center w-full text-left px-2 py-1.5 text-sm rounded-sm hover:bg-amplifa-purple/5 transition-colors duration-200 ${
                      selectedLead?.id === lead.id ? "bg-amplifa-purple/10" : ""
                    }`}
                    onClick={() => {
                      onLeadSelect(lead);
                      setIsOpen(false);
                    }}
                  >
                    <div className="flex-1 truncate mr-2">
                      <div className="font-medium truncate">{lead.name}</div>
                      <div className="text-xs text-gray-500 truncate">
                        {lead.position} at {lead.company}
                      </div>
                    </div>
                    {selectedLead?.id === lead.id && (
                      <Check className="h-4 w-4 text-amplifa-purple" />
                    )}
                  </button>
                ))
              ) : (
                <div className="p-2 text-center text-sm text-gray-500">
                  Keine Leads gefunden
                </div>
              )}
              
              {filteredLeads.length > 0 && filteredLeads.length === 20 && (
                <div className="p-2 text-center text-xs text-gray-400">
                  Weitere Leads werden beim Scrollen geladen
                </div>
              )}
            </div>
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
