
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lead, mockLeads } from './types/leads';
import { LeadTableRow } from './components/LeadTableRow';
import { LeadTableControls } from './components/LeadTableControls';

interface CampaignLeadsTableProps {
  campaignId: number;
}

export const CampaignLeadsTable = ({ campaignId }: CampaignLeadsTableProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLeads, setFilteredLeads] = useState(mockLeads);

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
            <LeadTableControls 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
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
                  <LeadTableRow
                    key={lead.id}
                    lead={lead}
                    onViewDetails={handleViewDetails}
                    onAddToCampaign={handleAddToCampaign}
                    onEditLead={handleEditLead}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
