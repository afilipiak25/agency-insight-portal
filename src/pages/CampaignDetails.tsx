
import { useParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartConfig } from '@/components/ui/chart';
import { CampaignHeader } from '@/components/campaigns/details/CampaignHeader';
import { CampaignMetrics } from '@/components/campaigns/details/CampaignMetrics';
import { CampaignWorkflowFlow } from '@/components/campaigns/details/CampaignWorkflowFlow';
import { CampaignLeadsTable } from '@/components/campaigns/details/CampaignLeadsTable';
import { CampaignPerformance } from '@/components/campaigns/details/CampaignPerformance';
import { mockCampaigns } from './Campaigns';

const CampaignDetails = () => {
  const { id } = useParams<{ id: string }>();
  const campaignId = parseInt(id || '1');
  
  // Find the campaign from mock data
  const campaign = mockCampaigns.find(c => c.id === campaignId) || mockCampaigns[0];

  const openRateData = [
    { name: 'Email 1', value: parseInt(campaign.opened || '0') },
    { name: 'Email 2', value: parseInt(campaign.opened || '0') - 5 },
    { name: 'Email 3', value: parseInt(campaign.opened || '0') - 10 },
  ];

  const replyRateData = [
    { name: 'Email 1', value: parseInt(campaign.replied || '0') },
    { name: 'Email 2', value: parseInt(campaign.replied || '0') - 5 },
    { name: 'Email 3', value: parseInt(campaign.replied || '0') - 10 },
  ];

  return (
    <Layout>
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Campaign Header with Title and Actions */}
          <CampaignHeader campaign={campaign} />
          
          {/* Key Metrics Summary */}
          <CampaignMetrics campaign={campaign} />

          <Tabs defaultValue="workflow" className="mt-8">
            <TabsList className="mb-8 border-b border-gray-200 w-full justify-start gap-8 rounded-none bg-transparent h-auto pb-1">
              <TabsTrigger 
                value="workflow" 
                className="data-[state=active]:border-b-0 data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-gray-300 bg-transparent text-gray-600 data-[state=active]:text-gray-800 px-2 py-2 rounded-none h-auto"
              >
                Workflow
              </TabsTrigger>
              <TabsTrigger 
                value="leads" 
                className="data-[state=active]:border-b-0 data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-gray-300 bg-transparent text-gray-600 data-[state=active]:text-gray-800 px-2 py-2 rounded-none h-auto"
              >
                Leads
              </TabsTrigger>
              <TabsTrigger 
                value="performance" 
                className="data-[state=active]:border-b-0 data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-gray-300 bg-transparent text-gray-600 data-[state=active]:text-gray-800 px-2 py-2 rounded-none h-auto data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-rose-400 data-[state=active]:text-white data-[state=active]:rounded-t-lg data-[state=active]:px-6 data-[state=active]:py-1.5"
              >
                Performance
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="workflow" className="space-y-6">
              {/* Campaign Workflow Visualization */}
              <CampaignWorkflowFlow campaignId={campaignId} />
            </TabsContent>
            
            <TabsContent value="leads" className="space-y-6">
              {/* Campaign Leads Table */}
              <CampaignLeadsTable campaignId={campaignId} />
            </TabsContent>
            
            <TabsContent value="performance" className="space-y-6">
              {/* Campaign Performance Analytics */}
              <CampaignPerformance campaign={campaign} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default CampaignDetails;
