
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ApolloFilters } from "../types/apollo-filters";

interface CompanyMetricsFiltersProps {
  filters: ApolloFilters;
  onFilterChange: (key: keyof ApolloFilters, value: any) => void;
}

export const CompanyMetricsFilters = ({ filters, onFilterChange }: CompanyMetricsFiltersProps) => {
  return (
    <>
      <div className="space-y-4">
        <Label className="text-sm font-medium text-gray-700">
          Unternehmensgröße
        </Label>
        <div className="flex gap-4">
          <div className="flex-1">
            <Label className="text-xs text-gray-600">Min</Label>
            <Select value={filters.employeesMin} onValueChange={(value) => onFilterChange("employeesMin", value)}>
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
            <Select value={filters.employeesMax} onValueChange={(value) => onFilterChange("employeesMax", value)}>
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

      <div className="space-y-4">
        <Label className="text-sm font-medium text-gray-700">
          Jahresumsatz
        </Label>
        <div className="flex gap-4">
          <div className="flex-1">
            <Label className="text-xs text-gray-600">Min</Label>
            <Select value={filters.revenueMin} onValueChange={(value) => onFilterChange("revenueMin", value)}>
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
            <Select value={filters.revenueMax} onValueChange={(value) => onFilterChange("revenueMax", value)}>
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
    </>
  );
};
