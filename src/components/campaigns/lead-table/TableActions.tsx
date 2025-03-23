
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, ChevronDown, Filter, Download, Mail } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TableActionsProps {
  totalLeads: number;
}

export const TableActions: React.FC<TableActionsProps> = ({ totalLeads }) => {
  return (
    <div className="table-topbar flex items-center justify-between gap-4 mb-2">
      <div className="flex items-center gap-2">
        <Button 
          className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600"
        >
          <Plus className="w-4 h-4 mr-1" /> Add Enrichment
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-white">
              Actions <ChevronDown className="w-4 h-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Download className="w-4 h-4 mr-2" /> Export as CSV
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Filter className="w-4 h-4 mr-2" /> Apply Filters
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Mail className="w-4 h-4 mr-2" /> Enrich with Email
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="outline" className="bg-white">
          <Filter className="w-4 h-4 mr-1" /> No filters
        </Button>
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
