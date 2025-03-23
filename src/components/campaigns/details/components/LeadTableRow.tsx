
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { EyeIcon, Mail, MoreHorizontal } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Lead } from '../types/leads';
import { getStatusBadge, getStatusIcon } from '../utils/leadStatusUtils';

interface LeadTableRowProps {
  lead: Lead;
  onViewDetails: (leadId: string) => void;
  onAddToCampaign: (leadId: string) => void;
  onEditLead: (leadId: string) => void;
}

export const LeadTableRow = ({ 
  lead, 
  onViewDetails, 
  onAddToCampaign, 
  onEditLead 
}: LeadTableRowProps) => {
  return (
    <tr key={lead.id} className="hover:bg-gray-50">
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amplifa-orange to-amplifa-pink flex items-center justify-center text-white font-medium text-sm mr-3">
            {lead.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex flex-col">
            <span className="font-medium">{lead.name}</span>
            <span className="text-gray-500 text-xs">{lead.email}</span>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="flex flex-col">
          <span>{lead.company}</span>
          <span className="text-gray-500 text-xs">{lead.position}</span>
        </div>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="flex items-center gap-2">
          {getStatusIcon(lead.status)}
          {getStatusBadge(lead.status)}
        </div>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">{lead.step}</td>
      <td className="px-4 py-3 whitespace-nowrap">{lead.activity}</td>
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <Progress value={lead.score} className="h-1.5 w-24" />
          <span className="text-sm font-medium">{lead.score}</span>
        </div>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="flex justify-end">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7"
            onClick={() => onViewDetails(lead.id)}
          >
            <EyeIcon className="w-4 h-4 text-gray-500" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <MoreHorizontal className="w-4 h-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="bg-white shadow-md border border-gray-200 rounded-md w-48 z-[100]"
              style={{ backgroundColor: "white" }}
            >
              <DropdownMenuItem 
                className="cursor-pointer hover:bg-gray-100 text-sm text-gray-700 py-2 px-3"
                onClick={() => onViewDetails(lead.id)}
              >
                <div className="flex items-center gap-2">
                  <EyeIcon className="w-4 h-4" />
                  <span>View Details</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer hover:bg-gray-100 text-sm text-gray-700 py-2 px-3"
                onClick={() => onAddToCampaign(lead.id)}
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>Add to Campaign</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer hover:bg-gray-100 text-sm text-gray-700 py-2 px-3"
                onClick={() => onEditLead(lead.id)}
              >
                <div className="flex items-center gap-2">
                  <MoreHorizontal className="w-4 h-4" />
                  <span>Edit Lead</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </td>
    </tr>
  );
};
