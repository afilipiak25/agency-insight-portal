
import { useState } from 'react';
import { Users, PieChart, DollarSign, BarChartHorizontal, Calendar, Inbox, Database, CircuitBoard, UserSquare, Search, PlusCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface Client {
  id: number;
  name: string;
  logo?: string;
}

const mockClients: Client[] = [
  { id: 1, name: "Tech Solutions GmbH" },
  { id: 2, name: "Digital Marketing AG" },
  { id: 3, name: "E-Commerce Plus" },
  { id: 4, name: "Innovative Labs" },
  { id: 5, name: "Global Trading KG" },
];

const navItems = [
  { icon: PieChart, label: 'Dashboard', isActive: true },
  { icon: BarChartHorizontal, label: 'Kampagnen' },
  { icon: CircuitBoard, label: 'Integrations' },
  { icon: Database, label: 'Pipeline' },
  { icon: Calendar, label: 'Kalender' },
  { icon: Inbox, label: 'Inbox' },
  { icon: Users, label: 'Lead Database' },
  { icon: UserSquare, label: 'Personas' },
];

export const Sidebar = ({ onClientSelect }: { onClientSelect: (clientId: number) => void }) => {
  const [selectedClient, setSelectedClient] = useState<number>(1);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleClientSelect = (clientId: number) => {
    setSelectedClient(clientId);
    onClientSelect(clientId);
    setSearchQuery('');
    setIsSearching(false);
  };

  const handleSearchFocus = () => {
    setIsSearching(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsSearching(true);
  };

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const clientsToShow = isSearching ? filteredClients : mockClients.filter(client => client.id === selectedClient);

  return (
    <div className={cn(
      "h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className={cn(
              "transition-opacity duration-300",
              isCollapsed ? "opacity-0 w-0" : "opacity-100"
            )}>
              <img 
                src="/lovable-uploads/bbaf6a02-7eee-4dc4-9df8-a980e5495698.png" 
                alt="Amplifa" 
                className="h-8"
              />
            </div>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label={isCollapsed ? "Sidebar ausklappen" : "Sidebar einklappen"}
            >
              {isCollapsed ? (
                <ChevronRight className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
          
          <div className={cn(
            "relative mb-4 transition-opacity duration-300",
            isCollapsed ? "opacity-0" : "opacity-100"
          )}>
            <div className="relative">
              <input
                type="text"
                placeholder="Kunde suchen..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amplifa-purple/30 focus:border-transparent"
              />
              <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
            </div>
            <button 
              className="mt-2 w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-amplifa-blue to-amplifa-purple rounded-lg hover:opacity-90 transition-opacity"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Neuer Kunde</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-3">
            {clientsToShow.map((client) => (
              <button
                key={client.id}
                onClick={() => handleClientSelect(client.id)}
                className={cn(
                  "w-full p-2 rounded-lg flex items-center space-x-3 mb-1 transition-all duration-200",
                  selectedClient === client.id
                    ? "bg-gradient-to-r from-amplifa-blue to-amplifa-purple text-white"
                    : "hover:bg-gray-50 text-gray-600"
                )}
              >
                <Users className="w-5 h-5 flex-shrink-0" />
                <span className={cn(
                  "font-medium text-sm transition-opacity duration-300",
                  isCollapsed ? "opacity-0 w-0" : "opacity-100"
                )}>
                  {client.name}
                </span>
              </button>
            ))}
            <Link
              to="/clients"
              className="w-full p-2 rounded-lg flex items-center space-x-3 mb-1 hover:bg-gray-50 text-gray-600 transition-all duration-200"
            >
              <Users className="w-5 h-5 flex-shrink-0" />
              <span className={cn(
                "font-medium text-sm transition-opacity duration-300",
                isCollapsed ? "opacity-0 w-0" : "opacity-100"
              )}>
                Alle Kunden
              </span>
            </Link>
          </div>

          <div className="mt-4 px-3">
            <div className="h-px bg-gray-200 my-4" />
            {navItems.map((item, index) => (
              <button
                key={index}
                className={cn(
                  "w-full p-2 rounded-lg flex items-center space-x-3 mb-1 transition-colors",
                  item.isActive 
                    ? "bg-gradient-to-r from-amplifa-blue/10 to-amplifa-purple/10 text-amplifa-purple"
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className={cn(
                  "font-medium text-sm transition-opacity duration-300",
                  isCollapsed ? "opacity-0 w-0" : "opacity-100"
                )}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
