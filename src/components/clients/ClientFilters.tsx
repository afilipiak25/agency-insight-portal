
import { Search, PlayCircle, AlertCircle, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ClientFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedFilter: 'all' | 'campaign' | 'connection' | 'other';
  onFilterChange: (filter: 'all' | 'campaign' | 'connection' | 'other') => void;
  getFilterCount: (filterType: 'campaign' | 'connection' | 'other') => number;
}

export const ClientFilters = ({ 
  searchQuery, 
  onSearchChange, 
  selectedFilter, 
  onFilterChange,
  getFilterCount 
}: ClientFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 animate-fade-in">
      <div className="relative flex-1 max-w-md">
        <input
          type="text"
          placeholder="Kunden suchen..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amplifa
-purple/30 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/80"
        />
        <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
      </div>
      
      <div className="flex gap-3">
        <button
          onClick={() => onFilterChange('all')}
          className={cn(
            "px-4 py-2 rounded-lg border transition-all duration-300",
            selectedFilter === 'all' 
              ? "border-amplifa-purple bg-amplifa-purple text-white" 
              : "border-gray-200 hover:border-amplifa-purple/50"
          )}
        >
          Alle Anfragen
        </button>
        <button
          onClick={() => onFilterChange('campaign')}
          className={cn(
            "px-4 py-2 rounded-lg border transition-all duration-300 flex items-center gap-2",
            selectedFilter === 'campaign' 
              ? "border-amplifa-purple bg-amplifa-purple text-white" 
              : "border-gray-200 hover:border-amplifa-purple/50"
          )}
        >
          <PlayCircle className="w-4 h-4" />
          Neue Kampagnen
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
            {getFilterCount('campaign')}
          </span>
        </button>
        <button
          onClick={() => onFilterChange('connection')}
          className={cn(
            "px-4 py-2 rounded-lg border transition-all duration-300 flex items-center gap-2",
            selectedFilter === 'connection' 
              ? "border-amplifa-purple bg-amplifa-purple text-white" 
              : "border-gray-200 hover:border-amplifa-purple/50"
          )}
        >
          <AlertCircle className="w-4 h-4" />
          Connection Fehler
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
            {getFilterCount('connection')}
          </span>
        </button>
        <button
          onClick={() => onFilterChange('other')}
          className={cn(
            "px-4 py-2 rounded-lg border transition-all duration-300 flex items-center gap-2",
            selectedFilter === 'other' 
              ? "border-amplifa-purple bg-amplifa-purple text-white" 
              : "border-gray-200 hover:border-amplifa-purple/50"
          )}
        >
          <HelpCircle className="w-4 h-4" />
          Sonstige
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
            {getFilterCount('other')}
          </span>
        </button>
      </div>
    </div>
  );
};
