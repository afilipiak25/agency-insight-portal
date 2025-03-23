
import React from "react";
import { ApolloLead } from "../types/apollo-filters";
import { WorkflowStep } from "../types/workflow";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Check, X, Mail, Link as LinkIcon, Search, MoreHorizontal,
  Globe, User, LinkedinIcon, Eye, Instagram
} from "lucide-react";

interface LeadTableRowProps {
  lead: ApolloLead;
  selectedLeads: string[];
  workflowSteps: WorkflowStep[];
  toggleSelectLead: (id: string) => void;
  onLeadSelect: (lead: ApolloLead) => void;
  onOpenEmailFinder: (lead: ApolloLead) => void;
  onPromptClick: (step: WorkflowStep, lead: ApolloLead) => void;
}

export const LeadTableRow: React.FC<LeadTableRowProps> = ({
  lead,
  selectedLeads,
  workflowSteps,
  toggleSelectLead,
  onLeadSelect,
  onOpenEmailFinder,
  onPromptClick
}) => {
  const firstName = lead.name.split(' ')[0];
  const lastName = lead.name.split(' ').slice(1).join(' ');
  const hasEmail = !!lead.email;

  return (
    <tr 
      key={lead.id} 
      className="border-b hover:bg-gray-50 cursor-pointer"
      onClick={() => onLeadSelect(lead)}
    >
      <td 
        className="px-4 py-3 sticky left-0 bg-white z-10"
        onClick={e => {
          e.stopPropagation();
          toggleSelectLead(lead.id);
        }}
      >
        <input 
          type="checkbox" 
          className="rounded border-gray-300"
          checked={selectedLeads.includes(lead.id)}
          onChange={(e) => {
            e.stopPropagation();
            toggleSelectLead(lead.id);
          }}
        />
      </td>
      
      <td className="px-4 py-3 whitespace-nowrap">{firstName}</td>
      <td className="px-4 py-3 whitespace-nowrap">{lastName}</td>
      <td className="px-4 py-3 font-medium whitespace-nowrap">{lead.name}</td>
      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{lead.position}</td>
      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{lead.location}</td>
      <td className="px-4 py-3 whitespace-nowrap">
        {lead.companyDomain ? (
          <a href={`https://${lead.companyDomain}`} target="_blank" rel="noopener noreferrer" 
            className="text-blue-600 hover:underline flex items-center" 
            onClick={(e) => e.stopPropagation()}>
            <Globe className="w-3 h-3 mr-1" /> {lead.companyDomain}
          </a>
        ) : (
          <span className="text-red-500">Missing input</span>
        )}
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        {lead.linkedin ? (
          <a href={lead.linkedin} target="_blank" rel="noopener noreferrer" 
            className="text-blue-600 hover:underline flex items-center"
            onClick={(e) => e.stopPropagation()}>
            <LinkIcon className="w-3 h-3 mr-1" /> Profile
          </a>
        ) : (
          <span className="text-red-500 flex items-center">
            <X className="w-3 h-3 mr-1" /> Not found
          </span>
        )}
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <Button size="sm" variant="outline" className="text-xs py-1 h-7"
                onClick={(e) => {
                  e.stopPropagation();
                }}>
          <Globe className="w-3 h-3 mr-1" /> Scrape
        </Button>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <Button size="sm" variant="outline" className="text-xs py-1 h-7"
                onClick={(e) => {
                  e.stopPropagation();
                }}>
          <User className="w-3 h-3 mr-1" /> Enrich
        </Button>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        {hasEmail ? (
          <span className="flex items-center text-green-600">
            <Check className="w-4 h-4 mr-1" /> {lead.email}
          </span>
        ) : (
          <Button 
            size="sm" 
            variant="outline" 
            className="text-xs py-1 h-7"
            onClick={(e) => {
              e.stopPropagation();
              onOpenEmailFinder(lead);
            }}
          >
            <Search className="w-3 h-3 mr-1" /> Find Email
          </Button>
        )}
      </td>
      <td className="px-4 py-3 text-gray-500 text-sm whitespace-nowrap">
        {hasEmail ? (
          <span className="flex items-center text-green-600">
            <Check className="w-4 h-4 mr-1" /> {lead.email}
          </span>
        ) : (
          <span className="text-gray-500 text-sm">Run condition not met</span>
        )}
      </td>
      <td className="px-4 py-3 text-gray-500 text-sm whitespace-nowrap">
        {hasEmail ? (
          <span className="flex items-center text-green-600">
            <Check className="w-4 h-4 mr-1" /> {lead.email}
          </span>
        ) : (
          <span className="text-gray-500 text-sm">Run condition not met</span>
        )}
      </td>
      <td className="px-4 py-3 text-gray-500 text-sm whitespace-nowrap">
        {hasEmail ? (
          <span className="flex items-center text-green-600">
            <Check className="w-4 h-4 mr-1" /> {lead.email}
          </span>
        ) : (
          <span className="text-gray-500 text-sm">Run condition not met</span>
        )}
      </td>
      <td className="px-4 py-3 text-gray-500 text-sm whitespace-nowrap">
        {hasEmail ? (
          <span className="flex items-center text-green-600">
            <Check className="w-4 h-4 mr-1" /> {lead.email}
          </span>
        ) : (
          <span className="text-gray-500 text-sm">Run condition not met</span>
        )}
      </td>
      <td className="px-4 py-3 text-gray-500 text-sm whitespace-nowrap">
        {hasEmail ? (
          <span className="flex items-center text-green-600">
            <Check className="w-4 h-4 mr-1" /> {lead.email}
          </span>
        ) : (
          <span className="text-gray-500 text-sm">Run condition not met</span>
        )}
      </td>
      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
        {Math.floor(Math.random() * 10000)}
      </td>
      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
        {Math.floor(Math.random() * 10000)}
      </td>
      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
        {lead.industry || "Unknown"}
      </td>
      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
        {lead.companySize || "Unknown"}
      </td>
      <td className="px-4 py-3 min-w-[200px]">
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
                  <button 
                    className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs"
                    onClick={(e) => e.stopPropagation()}
                  >
                    +{lead.technology.length - 2}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-48" onClick={(e) => e.stopPropagation()}>
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
      
      {workflowSteps.map((step) => (
        <td 
          key={step.id}
          className="px-4 py-3 cursor-pointer hover:bg-gray-100"
          onClick={(e) => {
            e.stopPropagation();
            onPromptClick(step, lead);
          }}
        >
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 text-gray-500 hover:text-blue-600 hover:bg-blue-50"
          >
            {step.type === 'email' && <Mail className="h-4 w-4" />}
            {step.type === 'linkedin' && <LinkedinIcon className="h-4 w-4" />}
            {step.type === 'profile-visit' && <Eye className="h-4 w-4" />}
            {step.type === 'instagram' && <Instagram className="h-4 w-4" />}
          </Button>
        </td>
      ))}
      
      <td className="px-4 py-3 whitespace-nowrap">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Add to Campaign</DropdownMenuItem>
            <DropdownMenuItem>Edit Lead</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
};
