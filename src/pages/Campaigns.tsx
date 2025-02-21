import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateCampaignForm } from '@/components/campaigns/CreateCampaignForm';

interface CampaignRow {
  id: number;
  name: string;
  status: 'active' | 'inactive';
  leadsCompleted: string;
  sender?: string;
  tag?: string;
  createdAt: string;
}

const mockCampaigns: CampaignRow[] = [
  {
    id: 1,
    name: "Anthony's campaign (1)",
    status: 'active',
    leadsCompleted: "0/1",
    createdAt: "6 days ago"
  },
  {
    id: 2,
    name: "BAFA",
    status: 'active',
    leadsCompleted: "64/733",
    sender: "Amplifa",
    createdAt: "9 days ago"
  },
  {
    id: 3,
    name: "Bildungsträger",
    status: 'active',
    leadsCompleted: "231/3988",
    sender: "Amplifa",
    createdAt: "2 months ago"
  },
  {
    id: 4,
    name: "Leadgenerierung",
    status: 'active',
    leadsCompleted: "788/20904",
    sender: "Amplifa",
    createdAt: "2 months ago"
  }
];

const Campaigns = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <Layout>
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-dashboard-primary mb-8">
            Kampagnen
          </h1>

          <div className="flex justify-between items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Kampagne suchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-dashboard-primary/30"
              />
            </div>
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-dashboard-primary hover:bg-dashboard-hover text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              Neue Kampagne erstellen
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="relative">
              <Button variant="outline" className="flex items-center gap-2">
                Status: Alle
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
            <div className="relative">
              <Button variant="outline" className="flex items-center gap-2">
                Sender: Alle
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
            <div className="relative">
              <Button variant="outline" className="flex items-center gap-2">
                Tags: Alle
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
            <div className="relative">
              <Button variant="outline" className="flex items-center gap-2">
                Ersteller: Alle
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="w-10 p-4">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-500">Kampagnen Name</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-500">Leads completed</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-500">Sender</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-500">Tag</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-500">Erstellt am</th>
                  <th className="w-20 p-4 text-left text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockCampaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-4">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-dashboard-primary"></div>
                      </div>
                    </td>
                    <td className="p-4 font-medium">{campaign.name}</td>
                    <td className="p-4">{campaign.leadsCompleted}</td>
                    <td className="p-4">{campaign.sender || '-'}</td>
                    <td className="p-4">{campaign.tag || '-'}</td>
                    <td className="p-4">{campaign.createdAt}</td>
                    <td className="p-4">
                      <button className="text-gray-400 hover:text-gray-600">
                        •••
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Neue Kampagne erstellen</DialogTitle>
              </DialogHeader>
              <CreateCampaignForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Layout>
  );
};

export default Campaigns;
