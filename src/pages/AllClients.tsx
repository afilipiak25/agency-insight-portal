
import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { ClientCard } from '@/components/clients/ClientCard';
import { ClientFilters } from '@/components/clients/ClientFilters';
import { CampaignDialog } from '@/components/clients/CampaignDialog';
import { ConnectionErrorDialog } from '@/components/clients/ConnectionErrorDialog';
import { CampaignsOverview } from '@/components/campaigns/CampaignsOverview';
import { mockClientsData } from '@/data/mockClients';
import type { ClientOverview } from '@/types/client';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';

const AllClients = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredClient, setHoveredClient] = useState<number | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'campaign' | 'connection' | 'other'>('all');
  const [selectedClient, setSelectedClient] = useState<ClientOverview | null>(null);
  const [view, setView] = useState<'clients' | 'campaigns'>('clients');
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  
  const filteredClients = mockClientsData.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || client.requestType === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getFilterCount = (filterType: 'campaign' | 'connection' | 'other') => {
    return mockClientsData.filter(client => client.requestType === filterType).length;
  };

  const handleClientSelect = (clientId: number) => {
    setSelectedClientId(clientId);
    setView('campaigns');
  };

  return (
    <Layout>
      {selectedClientId && view === 'campaigns' ? (
        <CampaignsOverview clientId={selectedClientId} />
      ) : (
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 animate-fade-in flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-amplifa-blue via-amplifa-purple to-amplifa-pink bg-clip-text text-transparent">
                  Alle Kunden
                </h1>
                <p className="text-gray-600 mt-2">Übersicht aller Kundenaktivitäten und Performance</p>
              </div>
              <Button
                onClick={() => navigate('/clients/create')}
                className="gap-2 bg-gradient-to-r from-amplifa-blue to-amplifa-purple hover:opacity-90"
              >
                <UserPlus className="w-4 h-4" />
                Neuer Kunde
              </Button>
            </div>

            <ClientFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedFilter={selectedFilter}
              onFilterChange={setSelectedFilter}
              getFilterCount={getFilterCount}
            />

            <div className="grid gap-6 animate-fade-in">
              {filteredClients.map((client) => (
                <ClientCard
                  key={client.id}
                  client={client}
                  isHovered={hoveredClient === client.id}
                  onHover={setHoveredClient}
                  onClick={(id) => {
                    if (client.requestType === 'campaign') {
                      handleClientSelect(id);
                    } else {
                      setSelectedClient(mockClientsData.find(c => c.id === id) || null);
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedClient?.requestType === 'campaign' ? (
        <CampaignDialog 
          client={selectedClient} 
          onClose={() => setSelectedClient(null)} 
        />
      ) : selectedClient?.requestType === 'connection' ? (
        <ConnectionErrorDialog 
          client={selectedClient} 
          onClose={() => setSelectedClient(null)} 
        />
      ) : null}
    </Layout>
  );
};

export default AllClients;
