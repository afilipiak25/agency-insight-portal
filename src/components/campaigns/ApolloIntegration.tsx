
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
  const [showApiDialog, setShowApiDialog] = useState<boolean>(!isConfigured);
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

    // Testen Sie die API-Verbindung
    try {
      setIsLoading(true);
      const response = await fetch("https://api.apollo.io/v1/auth/health", {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
          "X-API-KEY": apiKey,
        },
      });

      if (!response.ok) throw new Error("API-Verbindung fehlgeschlagen");

      localStorage.setItem("apollo_api_key", apiKey);
      setIsConfigured(true);
      setShowApiDialog(false);
      
      toast({
        title: "Erfolgreich verbunden",
        description: "Apollo.io API wurde erfolgreich konfiguriert",
      });

    } catch (error) {
      console.error("Apollo API error:", error);
      toast({
        title: "Verbindungsfehler",
        description: "Bitte überprüfen Sie Ihren API-Key und versuchen Sie es erneut",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const searchLeads = async (filters: any) => {
    const storedApiKey = localStorage.getItem("apollo_api_key");
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

      if (!response.ok) throw new Error("Fehler beim Laden der Leads");

      const data = await response.json();
      setLeads(data.people.map((person: any) => ({
        id: person.id,
        name: `${person.first_name} ${person.last_name}`,
        title: person.title || "Keine Position angegeben",
        company: person.organization?.name || "Unbekanntes Unternehmen",
        email: person.email || undefined,
        linkedin_url: person.linkedin_url || undefined,
      })));

    } catch (error) {
      console.error("Apollo search error:", error);
      toast({
        title: "Suchfehler",
        description: "Leads konnten nicht geladen werden. Bitte versuchen Sie es später erneut.",
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
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              type="password"
              placeholder="Apollo.io API-Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
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
            className="p-4 bg-white rounded-lg border border-gray-200 hover:border-amplifa-purple/30 transition-all duration-300"
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
                  className="text-amplifa-purple hover:text-amplifa-purple/80"
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
