import { useState } from 'react';
import { Users, ArrowUpRight, Search, TrendingUp, TrendingDown, Target, AlertCircle, PlayCircle, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Layout } from '@/components/Layout';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Bot } from 'lucide-react';

interface ClientOverview {
  id: number;
  name: string;
  activeLeads: number;
  conversionRate: number;
  monthlyTarget: number;
  progress: number;
  requestType?: 'campaign' | 'connection' | 'other';
  campaignSummary?: {
    title: string;
    industry: string;
    region: string;
    aiSummary: string;
    lastUpdated: string;
  };
}

const mockClientsData: ClientOverview[] = [
  { 
    id: 1, 
    name: "Tech Solutions GmbH",
    activeLeads: 46622,
    conversionRate: 24.8,
    monthlyTarget: 300,
    progress: 32.9,
    requestType: 'campaign',
    campaignSummary: {
      title: "Head of Sales Automotive Germany",
      industry: "Automotive",
      region: "Deutschland",
      aiSummary: "Der Kunde sucht einen erfahrenen Head of Sales für den Automotive-Bereich in Deutschland. Schwerpunkte sind die Entwicklung der Vertriebsstrategie, Führung eines 15-köpfigen Teams und die Expansion im DACH-Raum. Zielprofil: 8+ Jahre Erfahrung im Automotive-Vertrieb, nachweisliche Erfolge im B2B-Bereich, verhandlungssicheres Deutsch und Englisch.",
      lastUpdated: "2024-03-15T14:30:00"
    }
  },
  { 
    id: 2, 
    name: "Digital Marketing AG",
    activeLeads: 38450,
    conversionRate: 28.5,
    monthlyTarget: 250,
    progress: 45.2,
    requestType: 'connection',
    campaignSummary: {
      title: "Senior Marketing Manager E-Commerce",
      industry: "E-Commerce",
      region: "Remote / DACH",
      aiSummary: "Gesucht wird ein Senior Marketing Manager mit Fokus auf E-Commerce und Performance Marketing. Hauptaufgaben umfassen die Optimierung der Customer Journey, Steuerung von Paid Media Kampagnen und Entwicklung der Content-Strategie. Anforderungen: 5+ Jahre Erfahrung im E-Commerce Marketing, analytische Fähigkeiten, Hands-on-Mentalität.",
      lastUpdated: "2024-03-14T09:15:00"
    }
  },
  { 
    id: 3, 
    name: "E-Commerce Plus",
    activeLeads: 29876,
    conversionRate: 22.3,
    monthlyTarget: 180,
    progress: 38.7,
    requestType: 'campaign',
    campaignSummary: {
      title: "Online Shop Manager Fashion",
      industry: "Fashion",
      region: "Berlin",
      aiSummary: "Für einen schnell wachsenden Online-Shop im Fashion-Bereich wird ein erfahrener Shop Manager gesucht. Verantwortlichkeiten umfassen die Sortimentsgestaltung, Umsatzsteigerung und Optimierung des Online-Shops. Erwartungen: Erfahrung im E-Commerce, Kenntnisse in SEO und SEA, Kreativität und ein gutes Auge für Trends.",
      lastUpdated: "2024-03-13T16:45:00"
    }
  },
  { 
    id: 4, 
    name: "Innovative Labs",
    activeLeads: 15234,
    conversionRate: 19.8,
    monthlyTarget: 120,
    progress: 28.4,
    requestType: 'other',
    campaignSummary: {
      title: "Data Scientist AI Solutions",
      industry: "AI",
      region: "München",
      aiSummary: "Ein innovatives AI-Unternehmen sucht einen Data Scientist zur Entwicklung von KI-basierten Lösungen. Aufgaben sind die Analyse großer Datenmengen, Entwicklung von Machine Learning Modellen und die Umsetzung von Prototypen. Gesucht werden Kandidaten mit einem starken Hintergrund in Mathematik und Statistik, Erfahrung in Python und R sowie Kenntnisse in Deep Learning.",
      lastUpdated: "2024-03-12T11:00:00"
    }
  },
  { 
    id: 5, 
    name: "Global Trading KG",
    activeLeads: 52189,
    conversionRate: 31.2,
    monthlyTarget: 400,
    progress: 42.1,
    requestType: 'connection',
    campaignSummary: {
      title: "International Sales Director",
      industry: "Trading",
      region: "Hamburg",
      aiSummary: "Für ein international agierendes Handelsunternehmen wird ein erfahrener Sales Director gesucht. Der Fokus liegt auf der Erschließung neuer Märkte, der Betreuung von Key Accounts und der Führung eines internationalen Vertriebsteams. Anforderungen: Mehrjährige Erfahrung im internationalen Vertrieb, verhandlungssicheres Englisch, interkulturelle Kompetenz und Reisebereitschaft.",
      lastUpdated: "2024-03-11T18:20:00"
    }
  }
];

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

  const handleClientClick = (clientId: number) => {
    const client = mockClientsData.find(c => c.id === clientId);
    if (client) {
      setSelectedClient(client);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
                          <p className="text-sm text-gray-500">Monatliche Termine</p>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <p className="text-xl font-semibold text-amplifa-pink">
                            {client.progress}%
                          </p>
                          <p className="text-sm text-gray-500">
                            von {client.monthlyTarget} Terminen
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

      <Dialog open={!!selectedClient} onOpenChange={() => setSelectedClient(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-amplifa-purple" />
              KI-Kampagnen Analyse
            </DialogTitle>
          </DialogHeader>
          
          {selectedClient?.campaignSummary && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  {selectedClient.campaignSummary.title}
                </h3>
                <div className="flex gap-3">
                  <span className="px-3 py-1 rounded-full text-sm bg-amplifa-blue/10 text-amplifa-blue">
                    {selectedClient.campaignSummary.industry}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm bg-amplifa-purple/10 text-amplifa-purple">
                    {selectedClient.campaignSummary.region}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg">
                    <Bot className="w-5 h-5 text-amplifa-purple" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-600 leading-relaxed">
                      {selectedClient.campaignSummary.aiSummary}
                    </p>
                    <p className="text-sm text-gray-400">
                      Zuletzt aktualisiert: {formatDate(selectedClient.campaignSummary.lastUpdated)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default AllClients;
