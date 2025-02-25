
import { useState } from "react";
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

interface ApolloLead {
  id: string;
  name: string;
  title: string;
  company: string;
  email?: string;
  linkedin_url?: string;
}

export const ApolloIntegration = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [isConfigured, setIsConfigured] = useState<boolean>(false);
  const [showApiDialog, setShowApiDialog] = useState<boolean>(true); // Immer true am Anfang
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [leads, setLeads] = useState<ApolloLead[]>([]);

  const handleApiKeySave = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "API-Key erforderlich",
        description: "Bitte geben Sie Ihren Apollo.io API-Key ein",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);

      // Testen Sie den API-Key mit einer einfachen Suche
      const testResponse = await fetch("https://api.apollo.io/v1/people/search", {
        method: "POST",
        headers: {
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
          "X-API-KEY": apiKey,
        },
        body: JSON.stringify({
          page: 1,
          per_page: 1,
        }),
      });

      if (!testResponse.ok) {
        throw new Error(`API-Fehler: ${testResponse.status}`);
      }

      // Wenn der Test erfolgreich war, speichern Sie den Key
      localStorage.setItem("apollo_api_key", apiKey);
      setIsConfigured(true);
      setShowApiDialog(false);
      
      toast({
        title: "Erfolgreich verbunden",
        description: "Apollo.io API wurde erfolgreich konfiguriert",
      });

      // Führen Sie eine erste Suche durch
      await searchLeads({});

    } catch (error) {
      console.error("Apollo API error:", error);
      toast({
        title: "Verbindungsfehler",
        description: "API-Key konnte nicht validiert werden. Bitte überprüfen Sie Ihren API-Key und versuchen Sie es erneut.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const searchLeads = async (filters: any) => {
    const storedApiKey = localStorage.getItem("apollo_api_key") || apiKey;
    if (!storedApiKey) {
      setShowApiDialog(true);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("https://api.apollo.io/v1/people/search", {
        method: "POST",
        headers: {
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
          "X-API-KEY": storedApiKey,
        },
        body: JSON.stringify({
          ...filters,
          page: 1,
          per_page: 25,
        }),
      });

      if (!response.ok) {
        throw new Error(`API-Fehler: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.people) {
        setLeads(data.people.map((person: any) => ({
          id: person.id,
          name: `${person.first_name} ${person.last_name}`,
          title: person.title || "Keine Position angegeben",
          company: person.organization?.name || "Unbekanntes Unternehmen",
          email: person.email || undefined,
          linkedin_url: person.linkedin_url || undefined,
        })));
      } else {
        setLeads([]);
      }

    } catch (error) {
      console.error("Apollo search error:", error);
      toast({
        title: "Suchfehler",
        description: "Leads konnten nicht geladen werden. Bitte überprüfen Sie Ihre Verbindung oder versuchen Sie es später erneut.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog open={showApiDialog} onOpenChange={setShowApiDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apollo.io API Konfiguration</DialogTitle>
            <DialogDescription>
              Bitte geben Sie Ihren Apollo.io API-Key ein, um die Integration zu aktivieren.
              {isLoading && <div className="mt-2 text-sm text-violet-600">Verbindung wird getestet...</div>}
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
              {isLoading ? "Verbinde..." : "API-Key speichern"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="space-y-4">
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
    </>
  );
};
