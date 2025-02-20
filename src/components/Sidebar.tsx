
import { useState } from 'react';
import { Users, ChartBar, DollarSign, Percent, ChartLine } from 'lucide-react';
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

export const Sidebar = ({ onClientSelect }: { onClientSelect: (clientId: number) => void }) => {
  const [selectedClient, setSelectedClient] = useState<number>(1);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleClientSelect = (clientId: number) => {
    setSelectedClient(clientId);
    onClientSelect(clientId);
  };

  return (
    <div className={cn(
      "h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className={cn(
              "font-semibold text-agency-700 transition-opacity duration-300",
              isCollapsed ? "opacity-0 w-0" : "opacity-100"
            )}>
              Agency Dashboard
            </h2>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChartBar className="w-5 h-5 text-agency-600" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div className={cn(
              "text-xs font-medium text-gray-400 uppercase tracking-wider mb-4",
              isCollapsed ? "opacity-0" : "opacity-100"
            )}>
              Clients
            </div>
            <div className="space-y-2">
              {mockClients.map((client) => (
                <button
                  key={client.id}
                  onClick={() => handleClientSelect(client.id)}
                  className={cn(
                    "w-full p-2 rounded-lg flex items-center space-x-3 transition-all duration-200",
                    selectedClient === client.id
                      ? "bg-agency-400 text-white"
                      : "hover:bg-gray-100 text-gray-600"
                  )}
                >
                  <Users className="w-5 h-5 flex-shrink-0" />
                  <span className={cn(
                    "font-medium transition-opacity duration-300",
                    isCollapsed ? "opacity-0 w-0" : "opacity-100"
                  )}>
                    {client.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className={cn(
            "grid gap-4",
            isCollapsed ? "grid-cols-1" : "grid-cols-2"
          )}>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <DollarSign className="w-5 h-5 text-agency-600" />
            </button>
            <button className={cn(
              "p-2 rounded-lg hover:bg-gray-100 transition-colors",
              isCollapsed ? "hidden" : "block"
            )}>
              <Percent className="w-5 h-5 text-agency-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
