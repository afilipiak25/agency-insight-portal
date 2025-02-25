
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ApolloFilters } from "../types/apollo-filters";

interface IntentSignalsFiltersProps {
  filters: ApolloFilters;
  onIntentChange: (key: keyof ApolloFilters['intent']) => void;
}

export const IntentSignalsFilters = ({ filters, onIntentChange }: IntentSignalsFiltersProps) => {
  return (
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
            onCheckedChange={() => onIntentChange("activelyHiring")}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label className="text-sm text-gray-600" htmlFor="growth">
            Hohes Unternehmenswachstum
          </Label>
          <Switch 
            id="growth"
            checked={filters.intent.highGrowth}
            onCheckedChange={() => onIntentChange("highGrowth")}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label className="text-sm text-gray-600" htmlFor="funding">
            Kürzlich finanziert
          </Label>
          <Switch 
            id="funding"
            checked={filters.intent.recentlyFunded}
            onCheckedChange={() => onIntentChange("recentlyFunded")}
          />
        </div>
      </div>
    </div>
  );
};
