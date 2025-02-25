
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ApolloLead {
  id: string;
  name: string;
  title: string;
  company: string;
  email?: string;
  linkedin_url?: string;
}

interface FilterState {
  companySize: string;
  industry: string;
  revenue: string;
  techStack: string[];
  fundingStage: string;
  headcount: string;
}

export const ApolloIntegration = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [isConfigured, setIsConfigured] = useState<boolean>(false);
  const [showApiDialog, setShowApiDialog] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [leads, setLeads] = useState<ApolloLead[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    companySize: "",
    industry: "",
    revenue: "",
    techStack: [],
    fundingStage: "",
    headcount: "",
  });

  useEffect(() => {
    const storedApiKey = localStorage.getItem("apollo_api_key");
    if (storedApiKey) {
      setApiKey(storedApiKey);
      setIsConfigured(true);
      setShowApiDialog(false);
      simulateLeadSearch();
    }
  }, []);

  const handleApiKeySave = () => {
    if (!apiKey.trim()) {
      toast({
        title: "API-Key erforderlich",
        description: "Bitte geben Sie Ihren Apollo.io API-Key ein",
        variant: "destructive",
      });
      return;
    }

    try {
      localStorage.setItem("apollo_api_key", apiKey);
      setIsConfigured(true);
      setShowApiDialog(false);
      
      toast({
        title: "API-Key gespeichert",
        description: "Der Apollo.io API-Key wurde erfolgreich gespeichert.",
      });

      simulateLeadSearch();

    } catch (error) {
      console.error("Error saving API key:", error);
      toast({
        title: "Speicherfehler",
        description: "Der API-Key konnte nicht gespeichert werden. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    }
  };

  const simulateLeadSearch = () => {
    setIsLoading(true);
    // Simuliere API-Aufruf mit Verzögerung
    setTimeout(() => {
      const mockLeads = [
        {
          id: "1",
          name: "Thomas Schmidt",
          title: "Head of Operations",
          company: "TechCorp GmbH",
          email: "t.schmidt@techcorp.de",
          linkedin_url: "https://linkedin.com/in/thomas-schmidt"
        },
        {
          id: "2",
          name: "Maria Weber",
          title: "VP of Sales",
          company: "Digital Solutions AG",
          email: "m.weber@digital-solutions.de",
          linkedin_url: "https://linkedin.com/in/maria-weber"
        },
        {
          id: "3",
          name: "Michael Wagner",
          title: "Operations Director",
          company: "Innovation Hub GmbH",
          email: "m.wagner@innovation-hub.de",
          linkedin_url: "https://linkedin.com/in/michael-wagner"
        }
      ];
      setLeads(mockLeads);
      setIsLoading(false);
    }, 1000);
  };

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    simulateLeadSearch(); // Trigger neue Suche bei Filteränderung
  };

  return (
    <>
      <Dialog open={showApiDialog} onOpenChange={setShowApiDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apollo.io API Konfiguration</DialogTitle>
            <DialogDescription className="space-y-2">
              <p>Bitte geben Sie Ihren Apollo.io API-Key ein, um die Integration zu aktivieren.</p>
              <p className="text-sm text-muted-foreground">
                Sie finden Ihren API-Key in den Apollo.io Einstellungen unter "API & Integrations".
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              type="password"
              placeholder="Apollo.io API-Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              disabled={isLoading}
            />
            <Button 
              onClick={handleApiKeySave}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Speichere..." : "API-Key speichern"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="space-y-6">
        {/* Filter Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Unternehmensgröße</Label>
            <Select onValueChange={(value) => handleFilterChange("companySize", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Größe auswählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-10">1-10 Mitarbeiter</SelectItem>
                <SelectItem value="11-50">11-50 Mitarbeiter</SelectItem>
                <SelectItem value="51-200">51-200 Mitarbeiter</SelectItem>
                <SelectItem value="201-500">201-500 Mitarbeiter</SelectItem>
                <SelectItem value="501-1000">501-1000 Mitarbeiter</SelectItem>
                <SelectItem value="1001-5000">1001-5000 Mitarbeiter</SelectItem>
                <SelectItem value="5001+">5001+ Mitarbeiter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Branche</Label>
            <Select onValueChange={(value) => handleFilterChange("industry", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Branche auswählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Technologie</SelectItem>
                <SelectItem value="finance">Finanzen</SelectItem>
                <SelectItem value="healthcare">Gesundheitswesen</SelectItem>
                <SelectItem value="manufacturing">Produktion</SelectItem>
                <SelectItem value="retail">Einzelhandel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Jahresumsatz</Label>
            <Select onValueChange={(value) => handleFilterChange("revenue", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Umsatz auswählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">< 1M €</SelectItem>
                <SelectItem value="1-10m">1M - 10M €</SelectItem>
                <SelectItem value="10-50m">10M - 50M €</SelectItem>
                <SelectItem value="50-100m">50M - 100M €</SelectItem>
                <SelectItem value="100m+">100M+ €</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Funding Status</Label>
            <Select onValueChange={(value) => handleFilterChange("fundingStage", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Status auswählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="seed">Seed</SelectItem>
                <SelectItem value="series_a">Series A</SelectItem>
                <SelectItem value="series_b">Series B</SelectItem>
                <SelectItem value="series_c">Series C</SelectItem>
                <SelectItem value="public">Börsennotiert</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Gefundene Leads</h3>
            {isLoading ? (
              <div className="text-sm text-violet-600">Lädt...</div>
            ) : (
              <div className="text-sm text-violet-600">{leads.length} Leads gefunden</div>
            )}
          </div>
          
          <div className="space-y-3">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="p-4 bg-white rounded-lg border border-gray-200 hover:border-violet-500/30 transition-all duration-300"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{lead.name}</h3>
                    <p className="text-sm text-gray-600">{lead.title}</p>
                    <p className="text-sm text-gray-500">{lead.company}</p>
                  </div>
                  {lead.linkedin_url && (
                    <a
                      href={lead.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-violet-600 hover:text-violet-700"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
