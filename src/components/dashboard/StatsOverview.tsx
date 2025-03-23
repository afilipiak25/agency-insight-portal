
import React from 'react';
import { StatCard } from './StatCard';
import { Users, TrendingUp, BarChart3, Calendar } from 'lucide-react';

interface Stats {
  activeLeads: { value: number; change: number };
  openDeals: { value: number; change: number };
  revenue: { value: number; change: number };
  meetings: { value: number; change: number };
}

interface StatsOverviewProps {
  stats: Stats;
}

export const StatsOverview = ({ stats }: StatsOverviewProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="animate-fade-in" style={{ animationDelay: '0ms' }}>
        <StatCard 
          title="Active Leads" 
          value={stats.activeLeads.value} 
          change={stats.activeLeads.change} 
          Icon={Users} 
        />
      </div>
      <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
        <StatCard 
          title="Open Deals" 
          value={stats.openDeals.value} 
          change={stats.openDeals.change} 
          Icon={TrendingUp} 
        />
      </div>
      <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
        <StatCard 
          title="Revenue" 
          value={`€${stats.revenue.value.toLocaleString()}`}
          change={stats.revenue.change} 
          Icon={BarChart3} 
        />
      </div>
      <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
        <StatCard 
          title="Meetings" 
          value={stats.meetings.value} 
          change={stats.meetings.change} 
          Icon={Calendar} 
        />
      </div>
    </div>
  );
};
