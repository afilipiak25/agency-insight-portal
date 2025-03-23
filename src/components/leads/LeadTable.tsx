
import React from 'react';
import { Check, X, ExternalLink, Search, AlertCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LeadTableHeader } from './LeadTableHeader';
import { mockLeadData } from './mockLeadData';

interface StatusBadgeProps {
  status: 'success' | 'error' | 'warning' | 'neutral';
  label: string;
}

const StatusBadge = ({ status, label }: StatusBadgeProps) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'success':
        return 'bg-green-50 text-green-600 border-green-200';
      case 'error':
        return 'bg-red-50 text-red-600 border-red-200';
      case 'warning':
        return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'neutral':
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusStyles()}`}>
      {label}
    </span>
  );
};

export const LeadTable = () => {
  return (
    <div className="space-y-4 w-full">
      <LeadTableHeader />
      
      <div className="rounded-lg border border-gray-200 bg-white">
        <ScrollArea className="w-full" orientation="horizontal">
          <div className="min-w-[2200px]">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="w-10 p-3">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </th>
                  <th className="p-3 text-left text-sm font-medium text-gray-500 w-[180px]">
                    <div className="flex items-center space-x-1">
                      <span>Full Name</span>
                    </div>
                  </th>
                  <th className="p-3 text-left text-sm font-medium text-gray-500 w-[150px]">
                    <div className="flex items-center space-x-1">
                      <span>First Name</span>
                    </div>
                  </th>
                  <th className="p-3 text-left text-sm font-medium text-gray-500 w-[150px]">
                    <div className="flex items-center space-x-1">
                      <span>Last Name</span>
                    </div>
                  </th>
                  <th className="p-3 text-left text-sm font-medium text-gray-500 w-[180px]">
                    <div className="flex items-center space-x-1">
                      <span>Job Title</span>
                    </div>
                  </th>
                  <th className="p-3 text-left text-sm font-medium text-gray-500 w-[180px]">
                    <div className="flex items-center space-x-1">
                      <span>Location</span>
                    </div>
                  </th>
                  <th className="p-3 text-left text-sm font-medium text-gray-500 w-[180px]">
                    <div className="flex items-center space-x-1">
                      <span>Company Domain</span>
                    </div>
                  </th>
                  <th className="p-3 text-left text-sm font-medium text-gray-500 w-[180px]">
                    <div className="flex items-center space-x-1">
                      <span>LinkedIn Profile</span>
                    </div>
                  </th>
                  <th className="p-3 text-left text-sm font-medium text-gray-500 w-[150px]">
                    <div className="flex items-center space-x-1">
                      <span>Scrape Website</span>
                    </div>
                  </th>
                  <th className="p-3 text-left text-sm font-medium text-gray-500 w-[150px]">
                    <div className="flex items-center space-x-1">
                      <span>Email Status</span>
                    </div>
                  </th>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <th key={index} className="p-3 text-left text-sm font-medium text-gray-500 w-[180px]">
                      <div className="flex items-center space-x-1">
                        <span>Find Work Email ({index + 1})</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockLeadData.map((lead, idx) => (
                  <tr key={lead.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-3">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{lead.fullName}</span>
                      </div>
                    </td>
                    <td className="p-3">{lead.firstName}</td>
                    <td className="p-3">{lead.lastName}</td>
                    <td className="p-3">{lead.jobTitle}</td>
                    <td className="p-3">{lead.location}</td>
                    <td className="p-3">
                      <div className="flex items-center space-x-1">
                        <ExternalLink className="h-4 w-4 text-gray-400" />
                        <span className="text-amplifa-blue underline">{lead.companyDomain}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-1">
                        <ExternalLink className="h-4 w-4 text-gray-400" />
                        <span className="text-amplifa-blue underline truncate max-w-[160px]">
                          {lead.linkedinProfile}
                        </span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-1">
                        {lead.scrapeWebsite ? (
                          <>
                            <span className="inline-flex items-center">
                              <Check className="h-4 w-4 text-green-500 mr-1" />
                              <span className="text-green-500">{lead.companyDomain}</span>
                            </span>
                          </>
                        ) : (
                          <StatusBadge status="neutral" label="Missing input" />
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-1">
                        {lead.emailStatus === 'found' ? (
                          <div className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-1" />
                            <span className="text-green-500">{lead.email}</span>
                          </div>
                        ) : lead.emailStatus === 'not_found' ? (
                          <div className="flex items-center">
                            <X className="h-4 w-4 text-red-500 mr-1" />
                            <span className="text-red-500">No email found</span>
                          </div>
                        ) : (
                          <StatusBadge status="neutral" label="Missing input" />
                        )}
                      </div>
                    </td>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <td key={index} className="p-3">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="w-full text-left">
                              <StatusBadge status="neutral" label="Run condition not met" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">Company domain is required to find work email</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
