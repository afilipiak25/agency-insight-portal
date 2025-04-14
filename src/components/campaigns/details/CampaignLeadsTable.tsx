
import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lead, mockLeads } from './types/leads';
import { LeadTableRow } from './components/LeadTableRow';
import { LeadTableControls } from './components/LeadTableControls';
import { Badge } from '@/components/ui/badge';
import { SlidersHorizontal } from 'lucide-react';

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
    <div className="space-y-4 animate-fade-in">
      <Card className="shadow-sm border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300">
        <CardHeader className="pb-0 pt-5 border-b border-gray-50">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg font-semibold text-gray-800">
                Campaign Leads
              </CardTitle>
              <Badge variant="secondary" className="rounded-full bg-indigo-100 text-indigo-700 border-0">
                {filteredAndSortedLeads.length}
              </Badge>
            </div>
            <LeadTableControls 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="border rounded-md overflow-hidden border-gray-100">
            <table className="w-full">
              <thead className="bg-gray-50 text-gray-600 text-xs">
                <tr>
                  <th 
                    className="px-4 py-3 text-left font-medium cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-1">
                      Name
                      {sortField === 'name' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-left font-medium cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('company')}
                  >
                    <div className="flex items-center gap-1">
                      Company
                      {sortField === 'company' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-left font-medium cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center gap-1">
                      Status
                      {sortField === 'status' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-left font-medium cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('step')}
                  >
                    <div className="flex items-center gap-1">
                      Current Step
                      {sortField === 'step' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-left font-medium cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('activity')}
                  >
                    <div className="flex items-center gap-1">
                      Last Activity
                      {sortField === 'activity' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-left font-medium cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('score')}
                  >
                    <div className="flex items-center gap-1">
                      Lead Score
                      {sortField === 'score' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
                    </div>
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
