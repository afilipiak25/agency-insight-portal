
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { EnrichmentDialog } from '@/components/campaigns/lead-table/EnrichmentDialog';
import { useToast } from "@/hooks/use-toast";

interface LeadTableControlsProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export const LeadTableControls = ({ searchQuery, onSearchChange }: LeadTableControlsProps) => {
  const { toast } = useToast();
  
  const handleEnrichmentSelect = (enrichment: any) => {
    toast({
      title: `${enrichment.name} added`,
      description: "The enrichment has been added to your campaign.",
    });
  };

  return (
    <div className="flex gap-2 items-center">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search leads..."
          className="pl-9 h-9 w-[250px]"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <Button variant="outline" size="sm" className="hover:-translate-y-0.5 transition-transform">
        <Filter className="w-4 h-4 mr-1.5" />
        Filter
      </Button>
      
      <div className="ml-auto">
        <EnrichmentDialog onEnrichmentSelect={handleEnrichmentSelect} />
      </div>
    </div>
  );
};
