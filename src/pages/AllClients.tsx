
import { useState } from 'react';
import { Users, ArrowUpRight, Search, TrendingUp, TrendingDown, Target, AlertCircle, PlayCircle, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Layout } from '@/components/Layout';

interface ClientOverview {
  id: number;
  name: string;
  activeLeads: number;
  conversionRate: number;
  monthlyTarget: number;
  progress: number;
  requestType?: 'campaign' | 'connection' | 'other';
}

const mockClientsData: ClientOverview[] = [
  { 
    id: 1, 
    name: "Tech Solutions GmbH",
    activeLeads: 46622,
    conversionRate: 24.8,
    monthlyTarget: 300000,
    progress: 32.9,
    requestType: 'campaign'
  },
  { 
    id: 2, 
    name: "Digital Marketing AG",
    activeLeads: 38450,
    conversionRate: 28.5,
    monthlyTarget: 250000,
    progress: 45.2,
    requestType: 'connection'
  },
  { 
    id: 3, 
    name: "E-Commerce Plus",
    activeLeads: 29876,
    conversionRate: 22.3,
    monthlyTarget: 180000,
    progress: 38.7,
    requestType: 'campaign'
  },
  { 
    id: 4, 
    name: "Innovative Labs",
    activeLeads: 15234,
    conversionRate: 19.8,
    monthlyTarget: 120000,
    progress: 28.4,
    requestType: 'other'
  },
  { 
    id: 5, 
    name: "Global Trading KG",
    activeLeads: 52189,
    conversionRate: 31.2,
    monthlyTarget: 400000,
    progress: 42.1,
    requestType: 'connection'
  }
];

const AllClients = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredClient, setHoveredClient] = useState<number | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'campaign' | 'connection' | 'other'>('all');
  
  const filteredClients = mockClientsData.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || client.requestType === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleClientClick = (clientId: number) => {
    toast.success('Zum Kunden-Dashboard weitergeleitet');
  };

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

          <div className="flex flex-col md:flex-row gap-4 mb-6 animate-fade-in">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Kunden suchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amplifa-purple/30 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/80"
              />
              <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedFilter('all')}
                className={cn(
                  "px-4 py-2 rounded-lg border transition-all duration-300",
                  selectedFilter === 'all' 
                    ? "border-amplifa-purple bg-amplifa-purple text-white" 
                    : "border-gray-200 hover:border-amplifa-purple/50"
                )}
              >
                Alle Anfragen
              </button>
              <button
                onClick={() => setSelectedFilter('campaign')}
                className={cn(
                  "px-4 py-2 rounded-lg border transition-all duration-300 flex items-center gap-2",
                  selectedFilter === 'campaign' 
                    ? "border-amplifa-purple bg-amplifa-purple text-white" 
                    : "border-gray-200 hover:border-amplifa-purple/50"
                )}
              >
                <PlayCircle className="w-4 h-4" />
                Neue Kampagnen
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
                  {getFilterCount('campaign')}
                </span>
              </button>
              <button
                onClick={() => setSelectedFilter('connection')}
                className={cn(
                  "px-4 py-2 rounded-lg border transition-all duration-300 flex items-center gap-2",
                  selectedFilter === 'connection' 
                    ? "border-amplifa-purple bg-amplifa-purple text-white" 
                    : "border-gray-200 hover:border-amplifa-purple/50"
                )}
              >
                <AlertCircle className="w-4 h-4" />
                Connection Fehler
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
                  {getFilterCount('connection')}
                </span>
              </button>
              <button
                onClick={() => setSelectedFilter('other')}
                className={cn(
                  "px-4 py-2 rounded-lg border transition-all duration-300 flex items-center gap-2",
                  selectedFilter === 'other' 
                    ? "border-amplifa-purple bg-amplifa-purple text-white" 
                    : "border-gray-200 hover:border-amplifa-purple/50"
                )}
              >
                <HelpCircle className="w-4 h-4" />
                Sonstige
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
                  {getFilterCount('other')}
                </span>
              </button>
            </div>
          </div>

          <div className="grid gap-6 animate-fade-in">
            {filteredClients.map((client) => (
              <div 
                key={client.id}
                className={cn(
                  "bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 p-6 transition-all duration-300",
                  hoveredClient === client.id ? "shadow-lg transform -translate-y-1" : "hover:shadow-md"
                )}
                onMouseEnter={() => setHoveredClient(client.id)}
                onMouseLeave={() => setHoveredClient(null)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-gradient-to-r from-amplifa-blue to-amplifa-purple rounded-lg">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-lg font-semibold">{client.name}</h2>
                      {client.requestType && (
                        <span className={cn(
                          "px-3 py-1 rounded-full text-sm",
                          client.requestType === 'campaign' && "bg-amplifa-blue/10 text-amplifa-blue",
                          client.requestType === 'connection' && "bg-red-100 text-red-600",
                          client.requestType === 'other' && "bg-gray-100 text-gray-600"
                        )}>
                          {client.requestType === 'campaign' && 'Neue Kampagne'}
                          {client.requestType === 'connection' && 'Connection Fehler'}
                          {client.requestType === 'other' && 'Sonstige Anfrage'}
                        </span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gradient-to-br from-amplifa-blue/5 to-transparent p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Target className="w-4 h-4 text-amplifa-blue" />
                          <p className="text-sm text-gray-500">Aktive Leads</p>
                        </div>
                        <p className="text-xl font-semibold text-amplifa-blue">{client.activeLeads.toLocaleString()}</p>
                      </div>
                      <div className="bg-gradient-to-br from-amplifa-purple/5 to-transparent p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          {client.conversionRate >= 25 ? (
                            <TrendingUp className="w-4 h-4 text-green-500" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-500" />
                          )}
                          <p className="text-sm text-gray-500">Conversion Rate</p>
                        </div>
                        <p className="text-xl font-semibold text-amplifa-purple">{client.conversionRate}%</p>
                      </div>
                      <div className="bg-gradient-to-br from-amplifa-pink/5 to-transparent p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Target className="w-4 h-4 text-amplifa-pink" />
                          <p className="text-sm text-gray-500">Monatsziel</p>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <p className="text-xl font-semibold text-amplifa-pink">
                            {client.progress}%
                          </p>
                          <p className="text-sm text-gray-500">
                            von {client.monthlyTarget.toLocaleString()}€
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleClientClick(client.id)}
                    className="p-2 hover:bg-gray-50 rounded-lg transition-all duration-300 hover:scale-110"
                  >
                    <ArrowUpRight className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                <div className="mt-6 relative">
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amplifa-blue via-amplifa-purple to-amplifa-pink transition-all duration-700 ease-in-out"
                      style={{ width: `${client.progress}%` }}
                    />
                  </div>
                  <div className="absolute -top-6 right-0 text-sm font-medium text-gray-500">
                    Fortschritt: {client.progress}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllClients;
