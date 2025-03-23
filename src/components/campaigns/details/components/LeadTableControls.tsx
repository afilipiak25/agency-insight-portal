
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';

interface LeadTableControlsProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export const LeadTableControls = ({ searchQuery, onSearchChange }: LeadTableControlsProps) => {
  return (
    <div className="flex gap-2">
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
    </div>
  );
};
