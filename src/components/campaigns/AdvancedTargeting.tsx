
import { Input } from "@/components/ui/input";
import { ChevronUp } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface ApolloFilters {
  companyName: string;
  industry: string;
  subIndustry: string;
  businessModel: string;
  companyKeywords: string;
  descriptionKeywords: string;
  employeesMin: string;
  employeesMax: string;
  revenueMin: string;
  revenueMax: string;
  technologies: string;
  fundingStatus: string;
  contactLevel: string;
  ageMin: string;
  ageMax: string;
  growthRate: string;
  hiringStatus: string;
  department: string;
  intent: {
    activelyHiring: boolean;
    highGrowth: boolean;
    recentlyFunded: boolean;
  }
}

export const AdvancedTargeting = () => {
  const [filters, setFilters] = useState<ApolloFilters>({
    companyName: "",
    industry: "",
    subIndustry: "",
    businessModel: "",
    companyKeywords: "",
    descriptionKeywords: "",
    employeesMin: "",
    employeesMax: "",
    revenueMin: "",
    revenueMax: "",
    technologies: "",
    fundingStatus: "",
    contactLevel: "",
    ageMin: "",
    ageMax: "",
    growthRate: "",
    hiringStatus: "",
    department: "",
    intent: {
      activelyHiring: false,
      highGrowth: false,
      recentlyFunded: false
    }
  });

  const handleFilterChange = (key: keyof ApolloFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));

    // Log the updated filters for debugging
    console.log("Apollo.io Filter Update:", {
      ...filters,
      [key]: value
    });
  };

  const handleIntentChange = (key: keyof typeof filters.intent) => {
    setFilters(prev => ({
      ...prev,
      intent: {
        ...prev.intent,
        [key]: !prev.intent[key]
      }
    }));

    // Log intent signals update
    console.log("Intent Signals Update:", {
      ...filters.intent,
      [key]: !filters.intent[key]
    });
  };

  return (
    <div className="space-y-4 border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Erweiterte Apollo.io Filter</h3>
        <ChevronUp className="w-5 h-5 text-gray-500" />
      </div>
      
      <div className="space-y-6">
        {/* Company Name */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Firmenname
          </Label>
          <Input 
            placeholder="Firmennamen eingeben, durch Kommas getrennt"
            className="w-full"
            value={filters.companyName}
            onChange={(e) => handleFilterChange("companyName", e.target.value)}
          />
        </div>

        {/* Industry */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Branche
          </Label>
          <Select value={filters.industry} onValueChange={(value) => handleFilterChange("industry", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Branche auswählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="software">Software & Technologie</SelectItem>
              <SelectItem value="financial">Finanzdienstleistungen</SelectItem>
              <SelectItem value="healthcare">Gesundheitswesen</SelectItem>
              <SelectItem value="manufacturing">Produktion</SelectItem>
              <SelectItem value="retail">Einzelhandel & E-Commerce</SelectItem>
              <SelectItem value="education">Bildung</SelectItem>
              <SelectItem value="professional">Professional Services</SelectItem>
              <SelectItem value="real_estate">Immobilien</SelectItem>
              <SelectItem value="telecom">Telekommunikation</SelectItem>
              <SelectItem value="media">Medien & Unterhaltung</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sub-Industry */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Unterbranche
          </Label>
          <Select value={filters.subIndustry} onValueChange={(value) => handleFilterChange("subIndustry", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Unterbranche auswählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="saas">SaaS</SelectItem>
              <SelectItem value="ai_ml">KI & Machine Learning</SelectItem>
              <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
              <SelectItem value="cloud">Cloud Services</SelectItem>
              <SelectItem value="fintech">FinTech</SelectItem>
              <SelectItem value="biotech">Biotech</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Company Size */}
        <div className="space-y-4">
          <Label className="text-sm font-medium text-gray-700">
            Unternehmensgröße
          </Label>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label className="text-xs text-gray-600">Min</Label>
              <Select value={filters.employeesMin} onValueChange={(value) => handleFilterChange("employeesMin", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Min. Mitarbeiter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                  <SelectItem value="500">500</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label className="text-xs text-gray-600">Max</Label>
              <Select value={filters.employeesMax} onValueChange={(value) => handleFilterChange("employeesMax", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Max. Mitarbeiter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                  <SelectItem value="500">500</SelectItem>
                  <SelectItem value="1000">1.000</SelectItem>
                  <SelectItem value="5000">5.000</SelectItem>
                  <SelectItem value="10000">10.000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Revenue */}
        <div className="space-y-4">
          <Label className="text-sm font-medium text-gray-700">
            Jahresumsatz
          </Label>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label className="text-xs text-gray-600">Min</Label>
              <Select value={filters.revenueMin} onValueChange={(value) => handleFilterChange("revenueMin", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Min. Umsatz" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">1 Mio. €</SelectItem>
                  <SelectItem value="5m">5 Mio. €</SelectItem>
                  <SelectItem value="10m">10 Mio. €</SelectItem>
                  <SelectItem value="50m">50 Mio. €</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label className="text-xs text-gray-600">Max</Label>
              <Select value={filters.revenueMax} onValueChange={(value) => handleFilterChange("revenueMax", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Max. Umsatz" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5m">5 Mio. €</SelectItem>
                  <SelectItem value="10m">10 Mio. €</SelectItem>
                  <SelectItem value="50m">50 Mio. €</SelectItem>
                  <SelectItem value="100m">100 Mio. €</SelectItem>
                  <SelectItem value="1b">1 Mrd. €+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Technologies */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Technologien
          </Label>
          <Select value={filters.technologies} onValueChange={(value) => handleFilterChange("technologies", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Technologie auswählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="salesforce">Salesforce</SelectItem>
              <SelectItem value="hubspot">HubSpot</SelectItem>
              <SelectItem value="marketo">Marketo</SelectItem>
              <SelectItem value="zendesk">Zendesk</SelectItem>
              <SelectItem value="intercom">Intercom</SelectItem>
              <SelectItem value="slack">Slack</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Intent Signals */}
        <div className="space-y-4">
          <Label className="text-sm font-medium text-gray-700">
            Intent Signale
          </Label>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm text-gray-600" htmlFor="hiring">
                Aktiv auf der Suche nach Mitarbeitern
              </Label>
              <Switch 
                id="hiring"
                checked={filters.intent.activelyHiring}
                onCheckedChange={() => handleIntentChange("activelyHiring")}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm text-gray-600" htmlFor="growth">
                Hohes Unternehmenswachstum
              </Label>
              <Switch 
                id="growth"
                checked={filters.intent.highGrowth}
                onCheckedChange={() => handleIntentChange("highGrowth")}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm text-gray-600" htmlFor="funding">
                Kürzlich finanziert
              </Label>
              <Switch 
                id="funding"
                checked={filters.intent.recentlyFunded}
                onCheckedChange={() => handleIntentChange("recentlyFunded")}
              />
            </div>
          </div>
        </div>

        {/* Contact Level */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Kontaktebene
          </Label>
          <Select value={filters.contactLevel} onValueChange={(value) => handleFilterChange("contactLevel", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Kontaktebene auswählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="c_level">C-Level</SelectItem>
              <SelectItem value="vp_level">VP Level</SelectItem>
              <SelectItem value="director_level">Director Level</SelectItem>
              <SelectItem value="manager_level">Manager Level</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Company Age */}
        <div className="space-y-4">
          <Label className="text-sm font-medium text-gray-700">
            Unternehmensalter
          </Label>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label className="text-xs text-gray-600">Min Jahre</Label>
              <Select value={filters.ageMin} onValueChange={(value) => handleFilterChange("ageMin", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Min. Alter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label className="text-xs text-gray-600">Max Jahre</Label>
              <Select value={filters.ageMax} onValueChange={(value) => handleFilterChange("ageMax", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Max. Alter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Growth Rate */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Wachstumsrate (YoY)
          </Label>
          <Select value={filters.growthRate} onValueChange={(value) => handleFilterChange("growthRate", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Wachstumsrate auswählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="negative">Negativ</SelectItem>
              <SelectItem value="0_10">0-10%</SelectItem>
              <SelectItem value="10_25">10-25%</SelectItem>
              <SelectItem value="25_50">25-50%</SelectItem>
              <SelectItem value="50_100">50-100%</SelectItem>
              <SelectItem value="100_plus">100%+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Department */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Abteilung
          </Label>
          <Select value={filters.department} onValueChange={(value) => handleFilterChange("department", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Abteilung auswählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sales">Vertrieb</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="it">IT</SelectItem>
              <SelectItem value="hr">Personal</SelectItem>
              <SelectItem value="finance">Finanzen</SelectItem>
              <SelectItem value="operations">Operations</SelectItem>
            </SelectContent>
          </Select>
        </div>

      </div>
    </div>
  );
};
