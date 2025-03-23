
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  ChevronDown, 
  Filter, 
  Download, 
  Mail, 
  Trash2, 
  UserPlus, 
  Database, 
  Building, 
  MapPin, 
  Code 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EnrichmentDialog } from "./EnrichmentDialog";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

interface TableActionsProps {
  totalLeads: number;
}

export const TableActions: React.FC<TableActionsProps> = ({ totalLeads }) => {
  const { toast } = useToast();
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleEnrichmentSelect = (enrichment: any) => {
    toast({
      title: `${enrichment.name} enrichment added`,
      description: "Processing started for selected leads"
    });
  };

  const handleActionSelect = (action: string) => {
    toast({
      title: `${action} initiated`,
      description: "Processing started for selected leads"
    });
  };

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  return (
    <div className="table-topbar flex items-center justify-between gap-4 mb-4">
      <div className="flex items-center gap-2">
        <EnrichmentDialog onEnrichmentSelect={handleEnrichmentSelect} />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-white">
              Actions <ChevronDown className="w-4 h-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white">
            <DropdownMenuItem onClick={() => handleActionSelect("Export CSV")}>
              <Download className="w-4 h-4 mr-2" /> Export as CSV
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleActionSelect("Bulk Delete")}>
              <Trash2 className="w-4 h-4 mr-2" /> Bulk Delete
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleActionSelect("Enrich with Email")}>
              <Mail className="w-4 h-4 mr-2" /> Enrich with Email
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleActionSelect("Assign To")}>
              <UserPlus className="w-4 h-4 mr-2" /> Assign To
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Popover open={showFilters} onOpenChange={setShowFilters}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className={`bg-white ${activeFilters.length > 0 ? 'border-purple-400 text-purple-600' : ''}`}
            >
              <Filter className="w-4 h-4 mr-1" /> 
              {activeFilters.length === 0 
                ? "No filters" 
                : `${activeFilters.length} filter${activeFilters.length > 1 ? 's' : ''}`}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-4" align="start">
            <div className="space-y-4">
              <h3 className="font-medium">Filter Options</h3>
              <div className="space-y-2">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">By Category</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <FilterButton 
                      icon={<Database className="w-3.5 h-3.5" />} 
                      label="Industry" 
                      active={activeFilters.includes('Industry')} 
                      onClick={() => toggleFilter('Industry')}
                    />
                    <FilterButton 
                      icon={<Building className="w-3.5 h-3.5" />} 
                      label="Company Size" 
                      active={activeFilters.includes('Company Size')} 
                      onClick={() => toggleFilter('Company Size')}
                    />
                    <FilterButton 
                      icon={<MapPin className="w-3.5 h-3.5" />} 
                      label="Location" 
                      active={activeFilters.includes('Location')} 
                      onClick={() => toggleFilter('Location')}
                    />
                    <FilterButton 
                      icon={<Code className="w-3.5 h-3.5" />} 
                      label="Technology" 
                      active={activeFilters.includes('Technology')} 
                      onClick={() => toggleFilter('Technology')}
                    />
                  </div>
                </div>
              </div>
              
              {activeFilters.length > 0 && (
                <div className="pt-2 border-t">
                  <div className="flex flex-wrap gap-1.5">
                    {activeFilters.map(filter => (
                      <Badge 
                        key={filter}
                        variant="outline" 
                        className="bg-purple-50 border-purple-200 text-purple-700"
                      >
                        {filter}
                        <button 
                          className="ml-1 text-purple-400 hover:text-purple-700"
                          onClick={() => toggleFilter(filter)}
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    variant="link" 
                    className="mt-2 h-auto p-0 text-sm text-purple-600"
                    onClick={() => setActiveFilters([])}
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="text-sm text-gray-600">
        <span className="font-medium">Apollo Database</span>
        <span className="mx-2">•</span>
        <span>Default View</span>
        <span className="mx-2">•</span>
        <span>{totalLeads} rows</span>
      </div>
    </div>
  );
};

// Helper component for filter buttons
const FilterButton = ({ 
  icon, 
  label, 
  active, 
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string; 
  active: boolean; 
  onClick: () => void;
}) => (
  <Button 
    variant="ghost" 
    size="sm" 
    className={`justify-start ${active ? 'bg-purple-100 text-purple-700' : ''}`}
    onClick={onClick}
  >
    <span className="mr-1.5">{icon}</span>
    {label}
  </Button>
);
