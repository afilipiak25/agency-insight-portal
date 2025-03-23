
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ChevronDown, 
  Search, 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  AlertCircle,
  Filter,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { ApolloLead } from "./types/apollo-filters";

interface LeadTableViewProps {
  leads: ApolloLead[];
  isLoading: boolean;
}

export const LeadTableView: React.FC<LeadTableViewProps> = ({ 
  leads,
  isLoading
}) => {
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);

  const toggleSelectAll = () => {
    if (selectedLeads.length === leads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(leads.map(lead => lead.id));
    }
  };

  const toggleLeadSelection = (id: string) => {
    if (selectedLeads.includes(id)) {
      setSelectedLeads(selectedLeads.filter(leadId => leadId !== id));
    } else {
      setSelectedLeads([...selectedLeads, id]);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border shadow-sm">
      {/* Table Header - Controls */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-sm font-medium">
            <span className="mr-1">Default View</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <span>62/71 columns</span>
            <span>•</span>
            <span>1.778/1.778 rows</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <Button variant="outline" size="sm" className="text-sm font-medium flex items-center gap-1">
              <Filter className="h-3.5 w-3.5" />
              <span>No filters</span>
            </Button>
          </div>
          <div className="flex items-center">
            <Button variant="outline" size="sm" className="text-sm font-medium">
              <span>Sort</span>
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 h-9 w-[200px] border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500/30"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="text-sm font-medium">
                Actions <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Export as CSV</DropdownMenuItem>
              <DropdownMenuItem>Bulk edit</DropdownMenuItem>
              <DropdownMenuItem>Delete selected</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="bg-gradient-amplifa text-white font-medium">
            <Plus className="h-4 w-4 mr-1" />
            Add enrichment
          </Button>
        </div>
      </div>

      {/* Credits Warning */}
      <div className="px-4 py-2 bg-amber-50 border-b text-amber-700 text-sm flex items-center">
        <span>Running low on credits</span>
      </div>

      {/* Table Content */}
      <ScrollArea className="h-[calc(100vh-320px)] overflow-x-auto">
        <div className="min-w-[2000px]">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-3 py-3 border-b border-r border-gray-200 w-10">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300"
                    checked={selectedLeads.length === leads.length && leads.length > 0}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-3 py-3 border-b border-r border-gray-200 w-48 text-left">
                  <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
                    <Search className="h-4 w-4" />
                    <span>Find people</span>
                  </div>
                </th>
                <th className="px-3 py-3 border-b border-r border-gray-200 w-36 text-left">
                  <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
                    <span>First Name</span>
                  </div>
                </th>
                <th className="px-3 py-3 border-b border-r border-gray-200 w-36 text-left">
                  <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
                    <span>Last Name</span>
                  </div>
                </th>
                <th className="px-3 py-3 border-b border-r border-gray-200 w-48 text-left">
                  <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
                    <span>Full Name</span>
                  </div>
                </th>
                <th className="px-3 py-3 border-b border-r border-gray-200 w-48 text-left">
                  <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
                    <span>Job Title</span>
                  </div>
                </th>
                <th className="px-3 py-3 border-b border-r border-gray-200 w-48 text-left">
                  <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
                    <span>Location</span>
                  </div>
                </th>
                <th className="px-3 py-3 border-b border-r border-gray-200 w-48 text-left">
                  <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
                    <ExternalLink className="h-4 w-4" />
                    <span>Company Domain</span>
                  </div>
                </th>
                <th className="px-3 py-3 border-b border-r border-gray-200 w-48 text-left">
                  <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
                    <ExternalLink className="h-4 w-4" />
                    <span>LinkedIn Profile</span>
                  </div>
                </th>
                <th className="px-3 py-3 border-b border-r border-gray-200 w-48 text-left">
                  <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
                    <span>Scrape Website</span>
                  </div>
                </th>
                <th className="px-3 py-3 border-b border-r border-gray-200 w-48 text-left">
                  <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
                    <span>Find Work Email (1)</span>
                  </div>
                </th>
                <th className="px-3 py-3 border-b border-r border-gray-200 w-48 text-left">
                  <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
                    <span>Find Work Email (2)</span>
                  </div>
                </th>
                <th className="px-3 py-3 border-b border-r border-gray-200 w-48 text-left">
                  <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
                    <span>Find Work Email (3)</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, index) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-3 py-3 border-b border-r border-gray-200">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300"
                      checked={selectedLeads.includes(lead.id)}
                      onChange={() => toggleLeadSelection(lead.id)}
                    />
                  </td>
                  <td className="px-3 py-3 border-b border-r border-gray-200">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{lead.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 border-b border-r border-gray-200">
                    <span className="text-sm">{lead.firstName || lead.name.split(' ')[0]}</span>
                  </td>
                  <td className="px-3 py-3 border-b border-r border-gray-200">
                    <span className="text-sm">{lead.lastName || lead.name.split(' ').slice(1).join(' ')}</span>
                  </td>
                  <td className="px-3 py-3 border-b border-r border-gray-200">
                    <span className="text-sm">{lead.name}</span>
                  </td>
                  <td className="px-3 py-3 border-b border-r border-gray-200">
                    <span className="text-sm">{lead.position}</span>
                  </td>
                  <td className="px-3 py-3 border-b border-r border-gray-200">
                    <span className="text-sm">{lead.location}</span>
                  </td>
                  <td className="px-3 py-3 border-b border-r border-gray-200">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a href={`https://${lead.website || lead.company?.toLowerCase().replace(/\s+/g, '')}.com`} 
                            target="_blank" 
                            className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                            {lead.website || `${lead.company?.toLowerCase().replace(/\s+/g, '')}.com`}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Open website</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </td>
                  <td className="px-3 py-3 border-b border-r border-gray-200">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a href="#" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                            {`https://linkedin.com/in/${lead.name.toLowerCase().replace(/\s+/g, '-')}`}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Open LinkedIn profile</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </td>
                  <td className="px-3 py-3 border-b border-r border-gray-200">
                    <div className="flex items-center gap-2">
                      {getStatusIcon("success")}
                      <span className="text-sm">{lead.website || `${lead.company?.toLowerCase().replace(/\s+/g, '')}.com`}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 border-b border-r border-gray-200">
                    {index % 5 === 3 ? (
                      <div className="flex items-center">
                        <XCircle className="h-4 w-4 text-red-500 mr-1" />
                        <span className="text-sm text-red-500">No email found</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <span className="text-sm italic text-gray-500">Run condition not met</span>
                      </div>
                    )}
                  </td>
                  <td className="px-3 py-3 border-b border-r border-gray-200">
                    <div className="flex items-center">
                      <span className="text-sm italic text-gray-500">Run condition not met</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 border-b border-r border-gray-200">
                    <div className="flex items-center">
                      <span className="text-sm italic text-gray-500">Run condition not met</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollArea>
    </div>
  );
};
