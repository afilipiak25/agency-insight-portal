
import { useParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Chart, ChartConfig } from '@/components/ui/chart';
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
            <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
              <TabsTrigger value="workflow">Workflow</TabsTrigger>
              <TabsTrigger value="leads">Leads</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
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
