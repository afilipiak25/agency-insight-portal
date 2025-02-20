
import { useState } from 'react';
import { Search, Plus, ChevronDown, MoreHorizontal, CheckSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { mockClientsData } from '@/data/mockClients';

export const CampaignsOverview = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const campaigns = mockClientsData
    .filter(client => client.campaignSummary)
    .map(client => ({
      ...client.campaignSummary!,
      clientName: client.name
    }));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 7) {
      return `${diffDays} days ago`;
    } else if (diffDays <= 60) {
      return `${Math.floor(diffDays / 30)} months ago`;
    } else {
      return date.toLocaleDateString('de-DE');
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Kampagnen</h1>
          <Button className="bg-[#9b87f5] hover:bg-[#9b87f5]/90">
            <Plus className="w-4 h-4 mr-2" />
            Neue Kampagne erstellen
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Kampagne suchen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b87f5]/30"
            />
          </div>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status: Alle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle</SelectItem>
              <SelectItem value="active">Aktiv</SelectItem>
              <SelectItem value="paused">Pausiert</SelectItem>
              <SelectItem value="completed">Abgeschlossen</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sender: Alle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tags: Alle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ersteller: Alle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="bg-white rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox />
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Kampagnen Name</TableHead>
                <TableHead>Leads completed</TableHead>
                <TableHead>Sender</TableHead>
                <TableHead>Tag</TableHead>
                <TableHead>Erstellt am</TableHead>
                <TableHead className="w-12">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign, index) => (
                <TableRow key={index} className="h-14">
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <CheckSquare className="w-5 h-5 text-green-500" />
                  </TableCell>
                  <TableCell className="font-medium">{campaign.title}</TableCell>
                  <TableCell>{campaign.leadsCompleted}</TableCell>
                  <TableCell>{campaign.sender}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                      {campaign.tag}
                    </span>
                  </TableCell>
                  <TableCell>{formatDate(campaign.lastUpdated)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
