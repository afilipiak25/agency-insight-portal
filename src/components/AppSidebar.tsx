
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Users, PieChart, DollarSign, BarChartHorizontal, Calendar, 
  Inbox, Database, CircuitBoard, UserSquare, Search, 
  PlusCircle, ChevronLeft, ChevronRight, Brain, Mail, Headset 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInput,
  SidebarMenuBadge
} from "@/components/ui/sidebar";

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
  { icon: PieChart, label: 'Dashboard', path: '/' },
  { icon: BarChartHorizontal, label: 'Kampagnen', path: '/campaigns' },
  { icon: CircuitBoard, label: 'Integrations', path: '/integrations' },
  { 
    icon: Headset, 
    label: 'AI Callcenter', 
    path: '/ai-callcenter',
    tag: 'Coming Soon',
    disabled: true 
  },
  { icon: Database, label: 'Pipeline', path: '/pipeline' },
  { icon: Calendar, label: 'Kalender', path: '/calendar' },
  { icon: Inbox, label: 'Inbox', path: '/inbox' },
  { icon: Users, label: 'Lead Database', path: '/leads' },
  { icon: Brain, label: 'Train AI', path: '/train-ai' },
  { icon: UserSquare, label: 'Personas', path: '/personas' },
  { icon: Mail, label: 'Mailboxes', path: '/mailboxes' },
];

export const AppSidebar = ({ onClientSelect }: { onClientSelect: (clientId: number) => void }) => {
  const [selectedClient, setSelectedClient] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const location = useLocation();

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
    <Sidebar>
      <SidebarRail />
      <SidebarHeader>
        <div className="flex items-center justify-between mb-4">
          <div>
            <img 
              src="/lovable-uploads/d4665375-6d3a-4f1e-9de8-abc24145fe9c.png" 
              alt="Amplifa" 
              className="h-8"
            />
          </div>
          <SidebarTrigger />
        </div>
        
        <div className="relative mb-4">
          <SidebarInput
            type="text"
            placeholder="Kunde suchen..."
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
          />
          <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
        </div>
        <Link 
          to="/clients/create"
          className="mt-2 w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-gradient-amplifa rounded-lg hover:opacity-90 transition-opacity shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:opacity-95"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Neuer Kunde</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Clients</SidebarGroupLabel>
          <SidebarMenu>
            {clientsToShow.map((client) => (
              <SidebarMenuItem key={client.id}>
                <SidebarMenuButton
                  isActive={selectedClient === client.id}
                  tooltip={client.name}
                  onClick={() => handleClientSelect(client.id)}
                >
                  <Users className="w-5 h-5 flex-shrink-0" />
                  <span>{client.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Alle Kunden"
                asChild
              >
                <Link to="/clients">
                  <Users className="w-5 h-5 flex-shrink-0" />
                  <span>Alle Kunden</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map((item, index) => (
              <SidebarMenuItem key={index}>
                {item.disabled ? (
                  <SidebarMenuButton
                    isActive={location.pathname === item.path}
                    tooltip={item.label}
                    className="opacity-60 cursor-not-allowed"
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <span>{item.label}</span>
                    {item.tag && (
                      <SidebarMenuBadge className="bg-amplifa-pink/10 text-amplifa-pink">
                        {item.tag}
                      </SidebarMenuBadge>
                    )}
                  </SidebarMenuButton>
                ) : (
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.path}
                    tooltip={item.label}
                  >
                    <Link to={item.path} className="flex items-center gap-3 relative w-full">
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      <span>{item.label}</span>
                      {item.tag && (
                        <SidebarMenuBadge className="bg-amplifa-pink/10 text-amplifa-pink">
                          {item.tag}
                        </SidebarMenuBadge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
