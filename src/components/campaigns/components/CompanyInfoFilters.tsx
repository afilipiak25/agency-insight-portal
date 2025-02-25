
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ApolloFilters } from "../types/apollo-filters";
import { useEffect } from "react";

interface CompanyInfoFiltersProps {
  filters: ApolloFilters;
  onFilterChange: (key: keyof ApolloFilters, value: any) => void;
}

export const CompanyInfoFilters = ({ filters, onFilterChange }: CompanyInfoFiltersProps) => {
  // Auto-trigger search when companyName changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (filters.companyName) {
        console.log("Triggering search for:", filters.companyName);
      }
    }, 500); // Debounce for 500ms

    return () => clearTimeout(timer);
  }, [filters.companyName]);

  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange("companyName", e.target.value);
  };

  return (
    <>
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">
          Firmenname
        </Label>
        <Input 
          placeholder="Firmennamen eingeben"
          className="w-full"
          value={filters.companyName}
          onChange={handleCompanyNameChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              if (filters.companyName) {
                console.log("Enter pressed - searching for:", filters.companyName);
              }
            }
          }}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">
          Branche
        </Label>
        <Select value={filters.industry} onValueChange={(value) => onFilterChange("industry", value)}>
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

      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">
          Unterbranche
        </Label>
        <Select value={filters.subIndustry} onValueChange={(value) => onFilterChange("subIndustry", value)}>
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
    </>
  );
};
