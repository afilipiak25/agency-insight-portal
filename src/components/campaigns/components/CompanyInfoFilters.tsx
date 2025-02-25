
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ApolloFilters } from "../types/apollo-filters";
import { useEffect, useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Building2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CompanyInfoFiltersProps {
  filters: ApolloFilters;
  onFilterChange: (key: keyof ApolloFilters, value: any) => void;
}

const mockCompanies = [
  { value: "apple", label: "Apple Inc." },
  { value: "microsoft", label: "Microsoft Corporation" },
  { value: "google", label: "Google LLC" },
  { value: "amazon", label: "Amazon.com Inc." },
  { value: "meta", label: "Meta Platforms Inc." },
  { value: "tesla", label: "Tesla Inc." },
  { value: "nvidia", label: "NVIDIA Corporation" },
  { value: "samsung", label: "Samsung Electronics" },
  { value: "intel", label: "Intel Corporation" },
  { value: "ibm", label: "IBM Corporation" }
];

export const CompanyInfoFilters = ({ filters, onFilterChange }: CompanyInfoFiltersProps) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState(mockCompanies);

  // Update suggestions when search value changes
  useEffect(() => {
    const filtered = mockCompanies.filter(company => 
      company.label.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSuggestions(filtered);
  }, [searchValue]);

  return (
    <>
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">
          Firmenname
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div className="relative">
              <Input 
                placeholder="Firmennamen eingeben"
                className="w-full"
                value={filters.companyName}
                onChange={(e) => onFilterChange("companyName", e.target.value)}
                onClick={() => setOpen(true)}
              />
              <Building2 className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0" align="start">
            <Command shouldFilter={false}>
              <CommandInput 
                placeholder="Suchen Sie nach Unternehmen..." 
                value={searchValue}
                onValueChange={setSearchValue}
              />
              <CommandList>
                <CommandEmpty>Keine Firmen gefunden.</CommandEmpty>
                <CommandGroup heading="Vorgeschlagene Unternehmen">
                  {suggestions.map((company) => (
                    <CommandItem
                      key={company.value}
                      onSelect={() => {
                        onFilterChange("companyName", company.label);
                        setSearchValue("");
                        setOpen(false);
                      }}
                      className="cursor-pointer"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          filters.companyName === company.label ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {company.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
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
