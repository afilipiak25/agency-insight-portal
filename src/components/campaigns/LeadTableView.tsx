
import React, { useState } from "react";
import { 
  Check, X, ChevronDown, Download, Filter, Plus, 
  Mail, Link as LinkIcon, Search, MoreHorizontal 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ApolloLead } from "./types/apollo-filters";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LeadTableViewProps {
  leads: ApolloLead[];
  isLoading: boolean;
}

export const LeadTableView = ({ leads, isLoading }: LeadTableViewProps) => {
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);

  const toggleSelectAll = () => {
    if (selectedLeads.length === leads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(leads.map(lead => lead.id));
    }
  };

  const toggleSelectLead = (id: string) => {
    if (selectedLeads.includes(id)) {
      setSelectedLeads(selectedLeads.filter(leadId => leadId !== id));
    } else {
      setSelectedLeads([...selectedLeads, id]);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="table-topbar flex items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-2">
          <Button 
            className="bg-gradient-amplifa text-white"
          >
            <Plus className="w-4 h-4 mr-1" /> Add Enrichment
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-white">
                Actions <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Download className="w-4 h-4 mr-2" /> Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Filter className="w-4 h-4 mr-2" /> Apply Filters
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Mail className="w-4 h-4 mr-2" /> Enrich with Email
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline" className="bg-white">
            <Filter className="w-4 h-4 mr-1" /> No filters
          </Button>
        </div>
        
        <div className="text-sm text-gray-600">
          <span className="font-medium">Apollo Database</span>
          <span className="mx-2">•</span>
          <span>Default View</span>
          <span className="mx-2">•</span>
          <span>{leads.length} rows</span>
        </div>
      </div>

      <div id="leadTableContainer" className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="lead-table min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-4 py-3 text-left">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300"
                  checked={selectedLeads.length === leads.length && leads.length > 0}
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="px-4 py-3 text-left font-medium text-sm text-gray-500">Name</th>
              <th className="px-4 py-3 text-left font-medium text-sm text-gray-500">Position</th>
              <th className="px-4 py-3 text-left font-medium text-sm text-gray-500">Company</th>
              <th className="px-4 py-3 text-left font-medium text-sm text-gray-500">Location</th>
              <th className="px-4 py-3 text-left font-medium text-sm text-gray-500">Industry</th>
              <th className="px-4 py-3 text-left font-medium text-sm text-gray-500">Company Domain</th>
              <th className="px-4 py-3 text-left font-medium text-sm text-gray-500">Email Status</th>
              <th className="px-4 py-3 text-left font-medium text-sm text-gray-500">LinkedIn</th>
              <th className="px-4 py-3 text-left font-medium text-sm text-gray-500">Technologies</th>
              <th className="px-4 py-3 text-left font-medium text-sm text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={11} className="px-4 py-8 text-center text-gray-500">
                  No leads found. Try adjusting your filters.
                </td>
              </tr>
            ) : (
              leads.map(lead => (
                <tr key={lead.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300"
                      checked={selectedLeads.includes(lead.id)}
                      onChange={() => toggleSelectLead(lead.id)}
                    />
                  </td>
                  <td className="px-4 py-3 font-medium">{lead.name}</td>
                  <td className="px-4 py-3 text-gray-600">{lead.position}</td>
                  <td className="px-4 py-3">{lead.company}</td>
                  <td className="px-4 py-3 text-gray-600">{lead.location}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {lead.industry || "Unknown"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      {lead.company} 
                      {lead.companyDomain ? (
                        <span className="ml-1 text-blue-600">{lead.companyDomain}</span>
                      ) : (
                        <span className="ml-1 text-red-500">No domain</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      {lead.email ? (
                        <span className="flex items-center text-green-600">
                          <Check className="w-4 h-4 mr-1" /> Found
                        </span>
                      ) : (
                        <Button size="sm" variant="outline" className="text-xs py-1 h-7">
                          <Search className="w-3 h-3 mr-1" /> Find Email
                        </Button>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      {lead.linkedin ? (
                        <a href={lead.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                          <LinkIcon className="w-3 h-3 mr-1" /> Profile
                        </a>
                      ) : (
                        <span className="text-red-500 flex items-center">
                          <X className="w-3 h-3 mr-1" /> Not found
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {lead.technology && lead.technology.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {lead.technology.slice(0, 2).map((tech, i) => (
                          <span key={i} className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-xs">
                            {tech}
                          </span>
                        ))}
                        {lead.technology.length > 2 && (
                          <Popover>
                            <PopoverTrigger asChild>
                              <button className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">
                                +{lead.technology.length - 2}
                              </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-48">
                              <div className="text-sm font-medium mb-2">All Technologies</div>
                              <div className="flex flex-wrap gap-1">
                                {lead.technology.map((tech, i) => (
                                  <span key={i} className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-xs">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </PopoverContent>
                          </Popover>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400 text-xs">No data</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Add to Campaign</DropdownMenuItem>
                        <DropdownMenuItem>Edit Lead</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
