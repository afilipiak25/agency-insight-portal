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
import { X, Plus, Upload, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ApolloLead {
  id: string;
  name: string;
  title: string;
  company: string;
  email?: string;
  linkedin_url?: string;
}

interface FilterState {
  companyNames: string[];
  excludedCompanies: string[];
  locations: string[];
  excludedLocations: string[];
  jobTitles: string[];
  excludedJobTitles: string[];
  jobFunctions: string[];
  managementLevel: string;
  industries: string[];
  excludedIndustries: string[];
  employeeRange: {
    min: string;
    max: string;
  };
  keywords: string[];
  domains: string[];
  excludedDomains: string[];
  revenue: string;
}

export const ApolloIntegration = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [isConfigured, setIsConfigured] = useState<boolean>(false);
  const [showApiDialog, setShowApiDialog] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [leads, setLeads] = useState<ApolloLead[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    companyNames: [],
    excludedCompanies: [],
    locations: ["United Kingdom", "United States"],
    excludedLocations: [],
    jobTitles: ["Vice President of Operations", "President of Operations", "Operations Manager"],
    excludedJobTitles: [],
    jobFunctions: [],
    managementLevel: "",
    industries: [],
    excludedIndustries: [],
    employeeRange: {
      min: "",
      max: ""
    },
    keywords: [],
    domains: [],
    excludedDomains: [],
    revenue: ""
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

  const handleInputChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    simulateLeadSearch();
  };

  const handleArrayInput = (e: React.KeyboardEvent<HTMLInputElement>, key: keyof FilterState, input: string, setInput: (value: string) => void) => {
    if (e.key === 'Enter' && input.trim()) {
      const newArray = [...(filters[key] as string[]), input.trim()];
      handleInputChange(key, newArray);
      setInput("");
    }
  };

  const removeFromArray = (key: keyof FilterState, index: number) => {
    const newArray = (filters[key] as string[]).filter((_, i) => i !== index);
    handleInputChange(key, newArray);
  };

  const [companyInput, setCompanyInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [jobTitleInput, setJobTitleInput] = useState("");
  const [keywordInput, setKeywordInput] = useState("");
  const [domainInput, setDomainInput] = useState("");
  const [revenueInput, setRevenueInput] = useState("");

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
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              Unternehmen
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Suchen Sie nach spezifischen Unternehmen</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <div className="flex gap-2">
              <Input
                value={companyInput}
                onChange={(e) => setCompanyInput(e.target.value)}
                onKeyDown={(e) => handleArrayInput(e, "companyNames", companyInput, setCompanyInput)}
                placeholder="Unternehmensnamen eingeben..."
              />
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => {
                  if (companyInput.trim()) {
                    handleInputChange("companyNames", [...filters.companyNames, companyInput.trim()]);
                    setCompanyInput("");
                  }
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.companyNames.map((company, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-2 bg-violet-50 px-3 py-1 rounded-full text-sm text-violet-700"
                >
                  {company}
                  <button
                    onClick={() => removeFromArray("companyNames", index)}
                    className="text-violet-500 hover:text-violet-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Ausgeschlossene Unternehmen</Label>
            <Input
              placeholder="Unternehmen zum Ausschließen..."
              value={domainInput}
              onChange={(e) => setDomainInput(e.target.value)}
              onKeyDown={(e) => handleArrayInput(e, "excludedCompanies", domainInput, setDomainInput)}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Standorte</Label>
            <div className="flex gap-2">
              <Input
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                onKeyDown={(e) => handleArrayInput(e, "locations", locationInput, setLocationInput)}
                placeholder="Standorte hinzufügen..."
              />
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => {
                  if (locationInput.trim()) {
                    handleInputChange("locations", [...filters.locations, locationInput.trim()]);
                    setLocationInput("");
                  }
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.locations.map((location, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-200"
                >
                  {location}
                  <button
                    onClick={() => removeFromArray("locations", index)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Ausgeschlossene Standorte</Label>
            <Input
              placeholder="Standorte zum Ausschließen..."
              value={domainInput}
              onChange={(e) => setDomainInput(e.target.value)}
              onKeyDown={(e) => handleArrayInput(e, "excludedLocations", domainInput, setDomainInput)}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Job Titel</Label>
            <div className="flex gap-2">
              <Input
                value={jobTitleInput}
                onChange={(e) => setJobTitleInput(e.target.value)}
                onKeyDown={(e) => handleArrayInput(e, "jobTitles", jobTitleInput, setJobTitleInput)}
                placeholder="Job-Titel hinzufügen..."
              />
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => {
                  if (jobTitleInput.trim()) {
                    handleInputChange("jobTitles", [...filters.jobTitles, jobTitleInput.trim()]);
                    setJobTitleInput("");
                  }
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.jobTitles.map((title, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-200"
                >
                  {title}
                  <button
                    onClick={() => removeFromArray("jobTitles", index)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Ausgeschlossene Job-Titel</Label>
            <Input
              placeholder="Job-Titel zum Ausschließen..."
              value={domainInput}
              onChange={(e) => setDomainInput(e.target.value)}
              onKeyDown={(e) => handleArrayInput(e, "excludedJobTitles", domainInput, setDomainInput)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Management Level</Label>
          <Select onValueChange={(value) => handleInputChange("managementLevel", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Management Level auswählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="c_level">C-Level</SelectItem>
              <SelectItem value="vp">VP Level</SelectItem>
              <SelectItem value="director">Director Level</SelectItem>
              <SelectItem value="manager">Manager Level</SelectItem>
              <SelectItem value="senior">Senior/Lead Level</SelectItem>
              <SelectItem value="entry">Entry Level</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Job Funktionen</Label>
          <Select onValueChange={(value) => handleInputChange("jobFunctions", [value])}>
            <SelectTrigger>
              <SelectValue placeholder="Funktion auswählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="operations">Operations</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="hr">Human Resources</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="it">IT</SelectItem>
              <SelectItem value="product">Product</SelectItem>
              <SelectItem value="legal">Legal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Mitarbeiteranzahl</Label>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm text-gray-500">Minimum</Label>
              <Select onValueChange={(value) => handleInputChange("employeeRange", {...filters.employeeRange, min: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Min" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="200">200</SelectItem>
                  <SelectItem value="500">500</SelectItem>
                  <SelectItem value="1000">1.000</SelectItem>
                  <SelectItem value="5000">5.000</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-gray-500">Maximum</Label>
              <Select onValueChange={(value) => handleInputChange("employeeRange", {...filters.employeeRange, max: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Max" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="200">200</SelectItem>
                  <SelectItem value="500">500</SelectItem>
                  <SelectItem value="1000">1.000</SelectItem>
                  <SelectItem value="5000">5.000</SelectItem>
                  <SelectItem value="10000">10.000</SelectItem>
                  <SelectItem value="max">Unbegrenzt</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Jahresumsatz</Label>
          <Select onValueChange={(value) => handleInputChange("revenue", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Umsatz auswählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="less_than_1m">Unter 1M €</SelectItem>
              <SelectItem value="1m_10m">1M - 10M €</SelectItem>
              <SelectItem value="10m_50m">10M - 50M €</SelectItem>
              <SelectItem value="50m_100m">50M - 100M €</SelectItem>
              <SelectItem value="more_than_100m">Über 100M €</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            Keywords
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Suchen Sie nach spezifischen Keywords in Profilen</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <div className="flex gap-2">
            <Input
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyDown={(e) => handleArrayInput(e, "keywords", keywordInput, setKeywordInput)}
              placeholder="Keywords eingeben..."
            />
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => {
                if (keywordInput.trim()) {
                  handleInputChange("keywords", [...filters.keywords, keywordInput.trim()]);
                  setKeywordInput("");
                }
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.keywords.map((keyword, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2 bg-violet-50 px-3 py-1 rounded-full text-sm text-violet-700"
              >
                {keyword}
                <button
                  onClick={() => removeFromArray("keywords", index)}
                  className="text-violet-500 hover:text-violet-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Domains</Label>
            <div className="flex gap-2">
              <Input
                value={domainInput}
                onChange={(e) => setDomainInput(e.target.value)}
                onKeyDown={(e) => handleArrayInput(e, "domains", domainInput, setDomainInput)}
                placeholder="Domain hinzufügen..."
              />
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => {
                  if (domainInput.trim()) {
                    handleInputChange("domains", [...filters.domains, domainInput.trim()]);
                    setDomainInput("");
                  }
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Ausgeschlossene Domains</Label>
            <Input
              placeholder="Domains zum Ausschließen..."
              value={domainInput}
              onChange={(e) => setDomainInput(e.target.value)}
              onKeyDown={(e) => handleArrayInput(e, "excludedDomains", domainInput, setDomainInput)}
            />
          </div>
        </div>

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
