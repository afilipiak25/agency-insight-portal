
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  change?: number;
  Icon: LucideIcon;
}

export const StatCard = ({ title, value, change, Icon }: StatCardProps) => {
  return (
    <Card className="card-lift gradient-hover animate-fade-in overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        <div className="p-2 rounded-full bg-amplifa-orange/10 hover-bounce">
          <Icon className="h-4 w-4 text-amplifa-orange" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900 animate-pop">{value}</div>
        {change !== undefined && (
          <div className="flex items-center mt-1 animate-slide-in" style={{ animationDelay: '150ms' }}>
            <span className={`text-xs ${change >= 0 ? 'text-green-600' : 'text-red-600'} font-medium`}>
              {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
            </span>
            <span className="text-xs text-gray-500 ml-1">vs last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
