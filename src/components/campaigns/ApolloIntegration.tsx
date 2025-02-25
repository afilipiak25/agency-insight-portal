
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
  const [showApiDialog, setShowApiDialog] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [leads, setLeads] = useState<ApolloLead[]>([]);

  useEffect(() => {
    const storedApiKey = localStorage.getItem("apollo_api_key");
    if (storedApiKey) {
      setApiKey(storedApiKey);
      setIsConfigured(true);
      setShowApiDialog(false);
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

    // Einfache Validierung des API-Key Formats
    if (apiKey.length < 10) {
      toast({
        title: "Ungültiger API-Key",
        description: "Der eingegebene API-Key scheint nicht gültig zu sein. Bitte überprüfen Sie den Key.",
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

      // Zeige Beispiel-Leads an
      setLeads([
        {
          id: "1",
          name: "Max Mustermann",
          title: "CEO",
          company: "Beispiel GmbH",
          email: "max@beispiel.de",
          linkedin_url: "https://linkedin.com/in/max-mustermann"
        },
        {
          id: "2",
          name: "Anna Schmidt",
          title: "Marketing Director",
          company: "Marketing AG",
          email: "anna@marketing.de",
          linkedin_url: "https://linkedin.com/in/anna-schmidt"
        }
      ]);

    } catch (error) {
      console.error("Error saving API key:", error);
      toast({
        title: "Speicherfehler",
        description: "Der API-Key konnte nicht gespeichert werden. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    }
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
