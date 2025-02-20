
import { mockData } from './stats/mockData';
import { MetricCard } from './stats/MetricCard';
import { StatsCard } from './stats/StatsCard';
import { AIMetric } from './stats/AIMetric';
import { LeadPerformanceChart } from './stats/LeadPerformanceChart';
import { ChannelPerformanceChart } from './stats/ChannelPerformanceChart';

interface ClientStatsProps {
  clientId: number;
}

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
        <LeadPerformanceChart data={data.performanceData} />
        <ChannelPerformanceChart data={data.channelPerformance} />
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
