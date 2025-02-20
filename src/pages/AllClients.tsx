
import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { ClientCard } from '@/components/clients/ClientCard';
import { ClientFilters } from '@/components/clients/ClientFilters';
import { CampaignDialog } from '@/components/clients/CampaignDialog';
import { mockClientsData } from '@/data/mockClients';
import type { ClientOverview } from '@/types/client';

const AllClients = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredClient, setHoveredClient] = useState<number | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'campaign' | 'connection' | 'other'>('all');
  const [selectedClient, setSelectedClient] = useState<ClientOverview | null>(null);
  
  const filteredClients = mockClientsData.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || client.requestType === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getFilterCount = (filterType: 'campaign' | 'connection' | 'other') => {
    return mockClientsData.filter(client => client.requestType === filterType).length;
  };

  return (
    <Layout>
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amplifa-blue via-amplifa-purple to-amplifa-pink bg-clip-text text-transparent">
              Alle Kunden
            </h1>
            <p className="text-gray-600 mt-2">Übersicht aller Kundenaktivitäten und Performance</p>
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
                onClick={(id) => setSelectedClient(mockClientsData.find(c => c.id === id) || null)}
              />
            ))}
          </div>
        </div>
      </div>

      <CampaignDialog 
        client={selectedClient} 
        onClose={() => setSelectedClient(null)} 
      />
    </Layout>
  );
};

export default AllClients;
