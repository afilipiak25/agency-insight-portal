
import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Lead, mockLeads } from './types/leads';
import { LeadTableRow } from './components/LeadTableRow';
import { LeadTableControls } from './components/LeadTableControls';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  SlidersHorizontal, FileSpreadsheet, 
  Download, Search, Users, 
  UserPlus, RefreshCw, Filter
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

interface CampaignLeadsTableProps {
  campaignId: number;
}

type SortField = 'name' | 'company' | 'status' | 'step' | 'activity' | 'score';
type SortDirection = 'asc' | 'desc';

const statuses = [
  { value: 'all', label: 'All Leads', count: 356 },
  { value: 'active', label: 'Active', count: 245 },
  { value: 'completed', label: 'Completed', count: 68 },
  { value: 'paused', label: 'Paused', count: 23 },
  { value: 'bounced', label: 'Bounced', count: 12 },
  { value: 'unsubscribed', label: 'Unsubscribed', count: 8 },
];

export const CampaignLeadsTable = ({ campaignId }: CampaignLeadsTableProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [activeStatus, setActiveStatus] = useState('all');

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
    let filtered = mockLeads.filter(lead => {
      return (
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.status.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    // Filter by active status if not 'all'
    if (activeStatus !== 'all') {
      filtered = filtered.filter(lead => lead.status.toLowerCase() === activeStatus);
    }

    // Then sort by the selected field and direction
    return [...filtered].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[sortField] > b[sortField] ? 1 : -1;
      } else {
        return a[sortField] < b[sortField] ? 1 : -1;
      }
    });
  }, [mockLeads, searchQuery, sortField, sortDirection, activeStatus]);

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

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show" 
      className="space-y-4"
    >
      <motion.div variants={item} className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Campaign Leads</h2>
            <p className="text-sm text-gray-500">Manage and track all leads in your campaign</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <UserPlus className="h-4 w-4" />
            Add Leads
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button 
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white gap-1.5"
            size="sm"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="bg-white border border-gray-200 p-1 rounded-lg shadow-sm mb-4">
            <TabsTrigger value="list" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-md">
              <FileSpreadsheet className="h-4 w-4 mr-1.5" />
              List View
            </TabsTrigger>
            <TabsTrigger value="board" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-md">
              <SlidersHorizontal className="h-4 w-4 mr-1.5" />
              Board View
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="mt-0">
            <Card className="shadow-sm border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-0 pt-5 border-b border-gray-50">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg font-semibold text-gray-800">
                      All Leads
                    </CardTitle>
                    <Badge variant="secondary" className="rounded-full bg-indigo-100 text-indigo-700 border-0">
                      {filteredAndSortedLeads.length}
                    </Badge>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <input
                        type="text"
                        placeholder="Search leads..."
                        className="pl-9 pr-3 py-2 border border-gray-200 rounded-lg w-full sm:w-auto"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" size="sm" className="gap-1.5">
                      <Filter className="h-4 w-4" />
                      Filter
                    </Button>
                  </div>
                </div>
                
                <div className="flex mt-4 pb-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100">
                  {statuses.map((status) => (
                    <button
                      key={status.value}
                      onClick={() => setActiveStatus(status.value)}
                      className={`px-3 py-1 rounded-full text-sm whitespace-nowrap mr-2 flex items-center gap-1.5 transition-colors ${
                        activeStatus === status.value
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {status.label}
                      <Badge className="bg-white text-gray-700 ml-1.5 min-w-6 h-5 flex items-center justify-center rounded-full text-xs">
                        {status.count}
                      </Badge>
                    </button>
                  ))}
                </div>
              </CardHeader>
              
              <CardContent className="pt-4 px-0">
                <div className="overflow-x-auto">
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
                      {filteredAndSortedLeads.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                            No leads match your criteria. Try adjusting your filters.
                          </td>
                        </tr>
                      ) : (
                        filteredAndSortedLeads.map((lead) => (
                          <LeadTableRow
                            key={lead.id}
                            lead={lead}
                            onViewDetails={handleViewDetails}
                            onAddToCampaign={handleAddToCampaign}
                            onEditLead={handleEditLead}
                          />
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              
              <CardFooter className="border-t border-gray-100 py-3 px-4 bg-gray-50 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Showing <span className="font-medium">{filteredAndSortedLeads.length}</span> leads out of <span className="font-medium">{mockLeads.length}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm" className="bg-white">1</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="board" className="mt-0">
            <Card className="shadow-sm border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 p-8 flex items-center justify-center h-[400px]">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">Board View Coming Soon</h3>
                <p className="text-gray-500">We're working on a Kanban-style view for your leads.</p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};
