
import { useState } from 'react';
import { Users, ChartBar, DollarSign, BarChartHorizontal, Calendar, Inbox, Database, CircuitBoard, UserSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Client {
  id: number;
  name: string;
  logo?: string;
}

const mockClients: Client[] = [
  { id: 1, name: "Tech Solutions GmbH" },
  { id: 2, name: "Digital Marketing AG" },
  { id: 3, name: "E-Commerce Plus" },
];

const navItems = [
  { icon: ChartBar, label: 'Dashboard', isActive: true },
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

  const handleClientSelect = (clientId: number) => {
    setSelectedClient(clientId);
    onClientSelect(clientId);
  };

  return (
    <div className={cn(
      "h-screen bg-[#F8F9FC] border-r border-gray-200 transition-all duration-300 ease-in-out",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className={cn(
              "font-semibold text-[#6B7280] transition-opacity duration-300",
              isCollapsed ? "opacity-0 w-0" : "opacity-100"
            )}>
              Clients
            </h2>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChartBar className="w-5 h-5 text-[#6B7280]" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-3">
            {mockClients.map((client) => (
              <button
                key={client.id}
                onClick={() => handleClientSelect(client.id)}
                className={cn(
                  "w-full p-2 rounded-lg flex items-center space-x-3 mb-1 transition-all duration-200",
                  selectedClient === client.id
                    ? "bg-[#6366F1] text-white"
                    : "hover:bg-gray-100 text-[#6B7280]"
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
          </div>

          <div className="mt-4 px-3">
            {navItems.map((item, index) => (
              <button
                key={index}
                className={cn(
                  "w-full p-2 rounded-lg flex items-center space-x-3 mb-1 transition-colors",
                  item.isActive 
                    ? "bg-[#EEF2FF] text-[#6366F1]"
                    : "text-[#6B7280] hover:bg-gray-100"
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
