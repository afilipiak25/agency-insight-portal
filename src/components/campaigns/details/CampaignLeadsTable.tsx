
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Search, Filter, MoreHorizontal, EyeIcon, Mail, Clock, CheckCircle, XCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CampaignLeadsTableProps {
  campaignId: number;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  position: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'failed';
  step: string;
  activity: string;
  score: number;
}

// Mock lead data for the table
const mockLeads: Lead[] = Array.from({ length: 10 }).map((_, index) => ({
  id: `lead-${index + 1}`,
  name: ['John Doe', 'Jane Smith', 'Michael Brown', 'Sarah Johnson', 'David Wilson'][index % 5],
  email: `example${index + 1}@company.com`,
  company: ['Acme Inc', 'Globex Corp', 'Initech', 'Umbrella Corp', 'Stark Industries'][index % 5],
  position: ['CEO', 'CMO', 'CTO', 'VP Sales', 'Director'][index % 5],
  status: ['not-started', 'in-progress', 'completed', 'failed'][index % 4] as any,
  step: [`Email ${(index % 3) + 1}`, 'Waiting', 'Replied', 'Call scheduled'][index % 4],
  activity: [`${index + 1} days ago`, 'Today', 'Yesterday'][index % 3],
  score: Math.floor(70 + Math.random() * 30),
}));

export const CampaignLeadsTable = ({ campaignId }: CampaignLeadsTableProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLeads, setFilteredLeads] = useState(mockLeads);

  const getStatusBadge = (status: Lead['status']) => {
    switch (status) {
      case 'not-started':
        return <Badge variant="outline" className="bg-gray-100 text-gray-600">Not Started</Badge>;
      case 'in-progress':
        return <Badge variant="outline" className="bg-blue-100 text-blue-700">In Progress</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-700">Completed</Badge>;
      case 'failed':
        return <Badge variant="outline" className="bg-red-100 text-red-700">Failed</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: Lead['status']) => {
    switch (status) {
      case 'not-started':
        return <Clock className="w-4 h-4 text-gray-500" />;
      case 'in-progress':
        return <Mail className="w-4 h-4 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const handleViewDetails = (leadId: string) => {
    console.log(`View details for lead ${leadId}`);
    // Add functionality to view lead details
  };

  const handleAddToCampaign = (leadId: string) => {
    console.log(`Add lead ${leadId} to campaign`);
    // Add functionality to add lead to campaign
  };

  const handleEditLead = (leadId: string) => {
    console.log(`Edit lead ${leadId}`);
    // Add functionality to edit lead
  };

  return (
    <div className="space-y-4">
      <Card className="shadow-sm border-gray-200">
        <CardHeader className="pb-0">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold text-dashboard-primary">
              Campaign Leads
            </CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search leads..."
                  className="pl-9 h-9 w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm" className="hover:-translate-y-0.5 transition-transform">
                <Filter className="w-4 h-4 mr-1.5" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="border rounded-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 text-gray-600 text-xs">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Name</th>
                  <th className="px-4 py-3 text-left font-medium">Company</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Current Step</th>
                  <th className="px-4 py-3 text-left font-medium">Last Activity</th>
                  <th className="px-4 py-3 text-left font-medium">Lead Score</th>
                  <th className="px-4 py-3 text-left font-medium w-[80px]">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredLeads.map((lead) => (
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
                          onClick={() => handleViewDetails(lead.id)}
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
                              onClick={() => handleViewDetails(lead.id)}
                            >
                              <div className="flex items-center gap-2">
                                <EyeIcon className="w-4 h-4" />
                                <span>View Details</span>
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="cursor-pointer hover:bg-gray-100 text-sm text-gray-700 py-2 px-3"
                              onClick={() => handleAddToCampaign(lead.id)}
                            >
                              <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                <span>Add to Campaign</span>
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="cursor-pointer hover:bg-gray-100 text-sm text-gray-700 py-2 px-3"
                              onClick={() => handleEditLead(lead.id)}
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
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
