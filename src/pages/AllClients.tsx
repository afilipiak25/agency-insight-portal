
import { useState } from 'react';
import { Users, ArrowUpRight, Search } from 'lucide-react';

interface ClientOverview {
  id: number;
  name: string;
  activeLeads: number;
  conversionRate: number;
  monthlyTarget: number;
  progress: number;
}

const mockClientsData: ClientOverview[] = [
  { 
    id: 1, 
    name: "Tech Solutions GmbH",
    activeLeads: 46622,
    conversionRate: 24.8,
    monthlyTarget: 300000,
    progress: 32.9
  },
  { 
    id: 2, 
    name: "Digital Marketing AG",
    activeLeads: 38450,
    conversionRate: 28.5,
    monthlyTarget: 250000,
    progress: 45.2
  },
  { 
    id: 3, 
    name: "E-Commerce Plus",
    activeLeads: 29876,
    conversionRate: 22.3,
    monthlyTarget: 180000,
    progress: 38.7
  },
  { 
    id: 4, 
    name: "Innovative Labs",
    activeLeads: 15234,
    conversionRate: 19.8,
    monthlyTarget: 120000,
    progress: 28.4
  },
  { 
    id: 5, 
    name: "Global Trading KG",
    activeLeads: 52189,
    conversionRate: 31.2,
    monthlyTarget: 400000,
    progress: 42.1
  }
];

const AllClients = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredClients = mockClientsData.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Alle Kunden</h1>
        <p className="text-gray-600">Übersicht aller Kundenaktivitäten und Performance</p>
      </div>

      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Kunden suchen..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amplifa-purple/30 focus:border-transparent"
        />
        <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
      </div>

      <div className="grid gap-6">
        {filteredClients.map((client) => (
          <div 
            key={client.id}
            className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-amplifa-purple/10 rounded-lg">
                    <Users className="w-5 h-5 text-amplifa-purple" />
                  </div>
                  <h2 className="text-lg font-semibold">{client.name}</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Aktive Leads</p>
                    <p className="text-xl font-semibold">{client.activeLeads.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Conversion Rate</p>
                    <p className="text-xl font-semibold">{client.conversionRate}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Monatsziel</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-xl font-semibold">
                        {client.progress}%
                      </p>
                      <p className="text-sm text-gray-500">
                        von {client.monthlyTarget.toLocaleString()}€
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <a 
                href={`/?client=${client.id}`}
                className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <ArrowUpRight className="w-5 h-5 text-gray-400" />
              </a>
            </div>

            <div className="mt-4 w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amplifa-blue to-amplifa-purple"
                style={{ width: `${client.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllClients;
