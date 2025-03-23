
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ArrowUpRight } from 'lucide-react';

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
}

export const DashboardHeader = ({ title, subtitle }: DashboardHeaderProps) => {
  return (
    <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-slide-in">
      <div>
        <h1 className="text-2xl font-bold gradient-text mb-1">{title}</h1>
        <p className="text-gray-600 animate-fade-in" style={{ animationDelay: '150ms' }}>{subtitle}</p>
      </div>
      <div className="flex gap-2 w-full sm:w-auto animate-fade-in" style={{ animationDelay: '300ms' }}>
        <div className="relative flex-1 sm:flex-initial max-w-xs group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 transition-colors group-hover:text-amplifa-orange" />
          <Input 
            placeholder="Search..." 
            className="pl-10 transition-all border-gray-200 focus:border-amplifa-orange/50 hover:border-amplifa-orange/30" 
          />
        </div>
        <Button variant="default" className="gap-2 group">
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /> 
          Actions
        </Button>
      </div>
    </div>
  );
};
