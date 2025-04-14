
import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lead, mockLeads } from './types/leads';
import { LeadTableRow } from './components/LeadTableRow';
import { LeadTableControls } from './components/LeadTableControls';

interface CampaignLeadsTableProps {
  campaignId: number;
}

type SortField = 'name' | 'company' | 'status' | 'step' | 'activity' | 'score';
type SortDirection = 'asc' | 'desc';

export const CampaignLeadsTable = ({ campaignId }: CampaignLeadsTableProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // If already sorting by this field, toggle direction
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // If sorting by a new field, default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedLeads = useMemo(() => {
    // First filter by search query
    const filtered = mockLeads.filter(lead => {
      return (
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.status.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    // Then sort by the selected field and direction
    return [...filtered].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[sortField] > b[sortField] ? 1 : -1;
      } else {
        return a[sortField] < b[sortField] ? 1 : -1;
      }
    });
  }, [mockLeads, searchQuery, sortField, sortDirection]);

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
                  <th 
                    className="px-4 py-3 text-left font-medium cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('name')}
                  >
                    Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="px-4 py-3 text-left font-medium cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('company')}
                  >
                    Company {sortField === 'company' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="px-4 py-3 text-left font-medium cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('status')}
                  >
                    Status {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="px-4 py-3 text-left font-medium cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('step')}
                  >
                    Current Step {sortField === 'step' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="px-4 py-3 text-left font-medium cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('activity')}
                  >
                    Last Activity {sortField === 'activity' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="px-4 py-3 text-left font-medium cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('score')}
                  >
                    Lead Score {sortField === 'score' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="px-4 py-3 text-left font-medium w-[80px]">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredAndSortedLeads.map((lead) => (
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
