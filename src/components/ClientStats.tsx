import { LineChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, BarChart, Line } from 'recharts';
import { MessageSquare, Timer, Target, Zap, DollarSign, Users, TrendingUp, Award } from 'lucide-react';

interface ClientStatsProps {
  clientId: number;
}

const mockData = {
  1: {
    monthlyTarget: { current: 98800, total: 300000 },
    activeLeads: { current: 46622, total: 50000 },
    conversionRate: { current: 24.8, total: 30 },
    aiResponseRate: { current: 92.5, total: 95 },
    leadQualityScore: { value: 8.4, change: 12 },
    responseTime: { value: 2.3, change: -30 },
    engagementRate: { value: 78.5, change: 15 },
    costPerLead: { value: 42.5, change: -15 },
    customerLifetimeValue: { value: 2850, change: 25 },
    leadToOpportunityRate: { value: 35.8, change: 8 },
    campaignROI: { value: 324, change: 45 },
    performanceData: [
      { date: 'Jan 30', leads: 300, responses: 350, conversions: 320, revenue: 12500 },
      { date: 'Feb 02', leads: 500, responses: 520, conversions: 480, revenue: 18900 },
      { date: 'Feb 05', leads: 600, responses: 450, conversions: 520, revenue: 22400 },
      { date: 'Feb 08', leads: 400, responses: 650, conversions: 580, revenue: 25600 },
      { date: 'Feb 11', leads: 580, responses: 600, conversions: 700, revenue: 31200 }
    ],
    channelPerformance: [
      { channel: 'Google Ads', leads: 2500, cost: 12500, cpl: 5 },
      { channel: 'LinkedIn', leads: 1800, cost: 15300, cpl: 8.5 },
      { channel: 'Facebook', leads: 3200, cost: 9600, cpl: 3 },
      { channel: 'Email', leads: 950, cost: 2850, cpl: 3 }
    ],
    aiMetrics: {
      messageQuality: 92,
      responseAccuracy: 88,
      sentimentAnalysis: 95,
      leadQualification: 86
    }
  }
};

const ProgressBar = ({ value, total, color }: { value: number, total: number, color: string }) => (
  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
    <div 
      className={`h-full ${color}`}
      style={{ width: `${(value / total) * 100}%` }}
    />
  </div>
);

const MetricCard = ({ 
  title, 
  value, 
  total, 
  color = "bg-[#6366F1]"
}: { 
  title: string;
  value: number;
  total: number;
  color?: string;
}) => (
  <div className="bg-white p-6 rounded-xl">
    <h3 className="text-sm text-gray-500 mb-2">{title}</h3>
    <div className="flex items-end gap-2 mb-3">
      <span className="text-2xl font-semibold">{value.toLocaleString()}</span>
      <span className="text-gray-400 text-sm mb-1">/ {total.toLocaleString()}</span>
    </div>
    <ProgressBar value={value} total={total} color={color} />
  </div>
);

const StatsCard = ({ 
  title, 
  value, 
  change, 
  color,
  prefix,
  suffix 
}: { 
  title: string;
  value: number;
  change: number;
  color: string;
  prefix?: string;
  suffix?: string;
}) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <h3 className="text-sm text-gray-500 mb-2">{title}</h3>
    <div className="flex items-baseline gap-2">
      <span className={`text-2xl font-semibold ${color}`}>
        {prefix}{value.toLocaleString()}{suffix}
      </span>
    </div>
    <div className={`text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'} flex items-center gap-1`}>
      {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% vom letzten Monat
    </div>
  </div>
);

const AIMetric = ({ label, value }: { label: string; value: number }) => (
  <div className="flex items-center justify-between mb-4">
    <span className="text-sm text-gray-600">{label}</span>
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">{value}%</span>
      <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#6366F1]"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  </div>
);

export const ClientStats = ({ clientId }: ClientStatsProps) => {
  const data = mockData[clientId as keyof typeof mockData];

  return (
    <div className="p-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Monatliches Verkaufsziel"
          value={data.monthlyTarget.current}
          total={data.monthlyTarget.total}
        />
        <MetricCard
          title="Aktive Leads"
          value={data.activeLeads.current}
          total={data.activeLeads.total}
          color="bg-[#8B5CF6]"
        />
        <MetricCard
          title="Conversion Rate"
          value={data.conversionRate.current}
          total={data.conversionRate.total}
          color="bg-[#F97316]"
        />
        <MetricCard
          title="AI Response Rate"
          value={data.aiResponseRate.current}
          total={data.aiResponseRate.total}
          color="bg-[#0EA5E9]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Lead Qualitäts Score"
          value={data.leadQualityScore.value}
          change={data.leadQualityScore.change}
          color="text-[#8B5CF6]"
          suffix="/10"
        />
        <StatsCard
          title="Durchschnittliche Antwortzeit"
          value={data.responseTime.value}
          change={data.responseTime.change}
          color="text-[#0EA5E9]"
          suffix=" Min"
        />
        <StatsCard
          title="Cost per Lead"
          value={data.costPerLead.value}
          change={data.costPerLead.change}
          color="text-[#F97316]"
          prefix="€"
        />
        <StatsCard
          title="Kampagnen ROI"
          value={data.campaignROI.value}
          change={data.campaignROI.change}
          color="text-green-600"
          suffix="%"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Lead zu Opportunity Rate"
          value={data.leadToOpportunityRate.value}
          change={data.leadToOpportunityRate.change}
          color="text-[#8B5CF6]"
          suffix="%"
        />
        <StatsCard
          title="Customer Lifetime Value"
          value={data.customerLifetimeValue.value}
          change={data.customerLifetimeValue.change}
          color="text-[#0EA5E9]"
          prefix="€"
        />
        <StatsCard
          title="AI Engagement Rate"
          value={data.engagementRate.value}
          change={data.engagementRate.change}
          color="text-[#F97316]"
          suffix="%"
        />
        <StatsCard
          title="Lead Quality Score"
          value={data.leadQualityScore.value}
          change={data.leadQualityScore.change}
          color="text-green-600"
          suffix="/10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-6">Lead Generation Performance</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone"
                  dataKey="leads"
                  name="Leads"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                />
                <Line 
                  type="monotone"
                  dataKey="conversions"
                  name="Conversions"
                  stroke="#F97316"
                  strokeWidth={2}
                />
                <Line 
                  type="monotone"
                  dataKey="revenue"
                  name="Umsatz (€)"
                  stroke="#0EA5E9"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-6">Channel Performance</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.channelPerformance}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="channel" />
                <YAxis yAxisId="left" orientation="left" stroke="#8B5CF6" />
                <YAxis yAxisId="right" orientation="right" stroke="#F97316" />
                <Tooltip />
                <Legend />
                <Bar 
                  yAxisId="left"
                  dataKey="leads" 
                  name="Leads"
                  fill="#8B5CF6" 
                />
                <Bar 
                  yAxisId="right"
                  dataKey="cost" 
                  name="Kosten (€)"
                  fill="#F97316" 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-6">AI Performance Metrics</h3>
        <div className="space-y-6">
          <AIMetric label="Message Quality" value={data.aiMetrics.messageQuality} />
          <AIMetric label="Response Accuracy" value={data.aiMetrics.responseAccuracy} />
          <AIMetric label="Sentiment Analysis" value={data.aiMetrics.sentimentAnalysis} />
          <AIMetric label="Lead Qualification" value={data.aiMetrics.leadQualification} />
        </div>
      </div>
    </div>
  );
};
