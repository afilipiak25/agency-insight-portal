
import { ChevronUp } from "lucide-react";
import { CompanyInfoFilters } from "./components/CompanyInfoFilters";
import { CompanyMetricsFilters } from "./components/CompanyMetricsFilters";
import { IntentSignalsFilters } from "./components/IntentSignalsFilters";
import { useApolloFilters } from "./hooks/useApolloFilters";

export const AdvancedTargeting = () => {
  const { filters, handleFilterChange, handleIntentChange } = useApolloFilters();

  return (
    <div className="space-y-4 border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Erweiterte Apollo.io Filter</h3>
        <ChevronUp className="w-5 h-5 text-gray-500" />
      </div>
      
      <div className="space-y-6">
        <CompanyInfoFilters 
          filters={filters} 
          onFilterChange={handleFilterChange} 
        />
        
        <CompanyMetricsFilters 
          filters={filters} 
          onFilterChange={handleFilterChange} 
        />
        
        <IntentSignalsFilters 
          filters={filters} 
          onIntentChange={handleIntentChange} 
        />
      </div>
    </div>
  );
};
