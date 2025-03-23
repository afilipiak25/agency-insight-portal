
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { ProgressBar } from '@/components/stats/ProgressBar';
import { MessageSquare, Mail } from 'lucide-react';

interface EmailStats {
  emailsSent: { value: number; change: number };
  responseRate: { value: number; total: number };
}

interface EmailPerformanceProps {
  stats: EmailStats;
}

export const EmailPerformance = ({ stats }: EmailPerformanceProps) => {
  return (
    <Card className="lg:col-span-2 card-lift animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg">Email Performance</CardTitle>
        <CardDescription>Overview of your email campaign performance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="animate-slide-in-up" style={{ animationDelay: '50ms' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Emails Sent</span>
              <span className="text-sm font-medium text-amplifa-orange">{stats.emailsSent.value}</span>
            </div>
            <ProgressBar value={100} total={100} color="bg-gradient-to-r from-amplifa-orange to-amplifa-pink" />
          </div>
          <div className="animate-slide-in-up" style={{ animationDelay: '150ms' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Response Rate</span>
              <span className="text-sm font-medium text-amplifa-orange">{stats.responseRate.value}%</span>
            </div>
            <ProgressBar value={stats.responseRate.value} total={stats.responseRate.total} color="bg-gradient-to-r from-amplifa-orange to-amplifa-pink" />
          </div>
          <div className="flex gap-4 flex-wrap pt-3">
            <div className="bg-amplifa-orange/10 rounded-lg p-3 flex-1 min-w-[180px] card-lift animate-slide-in-up" style={{ animationDelay: '250ms' }}>
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="h-4 w-4 text-amplifa-orange hover-bounce" />
                <span className="text-sm font-medium">Open Rate</span>
              </div>
              <p className="text-2xl font-semibold">65.8%</p>
              <p className="text-xs text-green-600">↑ 3.2% vs last month</p>
            </div>
            <div className="bg-amplifa-pink/10 rounded-lg p-3 flex-1 min-w-[180px] card-lift animate-slide-in-up" style={{ animationDelay: '350ms' }}>
              <div className="flex items-center gap-2 mb-2">
                <Mail className="h-4 w-4 text-amplifa-pink hover-bounce" />
                <span className="text-sm font-medium">Click Rate</span>
              </div>
              <p className="text-2xl font-semibold">28.4%</p>
              <p className="text-xs text-green-600">↑ 5.7% vs last month</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
