
import { Search, Filter, Plus, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const LeadTableHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg border border-gray-200">
      <div className="flex items-center">
        <div className="text-sm">
          <div className="flex items-center gap-2">
            <span className="font-medium">Default View</span>
            <ChevronDown className="h-4 w-4" />
          </div>
          <div className="text-gray-500 text-xs mt-1">
            62/71 columns • 1,778/1,778 rows • No filters • Recruiter - Agencys
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="relative flex-grow max-w-xs">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input 
            type="text" 
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amplifa-blue/30"
          />
        </div>

        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="h-4 w-4" />
          <span>No filters</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <span>Actions</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Export CSV</DropdownMenuItem>
            <DropdownMenuItem>Bulk edit</DropdownMenuItem>
            <DropdownMenuItem>Delete selected</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button className="gap-2 whitespace-nowrap" size="sm">
          <Plus className="h-4 w-4" />
          <span>Add enrichment</span>
        </Button>
      </div>
      
      <div className="hidden sm:block ml-auto">
        <div className="text-xs font-medium bg-red-100 text-red-600 px-3 py-1 rounded-full">
          Running low on credits
        </div>
      </div>
    </div>
  );
};
