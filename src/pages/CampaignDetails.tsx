
import { useParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CampaignHeader } from '@/components/campaigns/details/CampaignHeader';
import { CampaignMetrics } from '@/components/campaigns/details/CampaignMetrics';
import { CampaignWorkflowFlow } from '@/components/campaigns/details/CampaignWorkflowFlow';
import { CampaignLeadsTable } from '@/components/campaigns/details/CampaignLeadsTable';
import { CampaignPerformance } from '@/components/campaigns/details/CampaignPerformance';
import { CampaignAnalysis } from '@/components/campaigns/details/CampaignAnalysis';
import { mockCampaigns } from './Campaigns';
import { motion } from 'framer-motion';

const CampaignDetails = () => {
  const { id } = useParams<{ id: string }>();
  const campaignId = parseInt(id || '1');
  
  // Find the campaign from mock data
  const campaign = mockCampaigns.find(c => c.id === campaignId) || mockCampaigns[0];

  return (
    <Layout>
      <motion.div 
        className="p-8 bg-gradient-to-b from-gray-50 to-white min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Campaign Header with Title and Actions */}
          <CampaignHeader campaign={campaign} />
          
          {/* Key Metrics Summary */}
          <CampaignMetrics campaign={campaign} />

          <Tabs defaultValue="workflow" className="mt-8">
            <TabsList className="w-full max-w-3xl mx-auto flex justify-center gap-2 bg-white p-1 rounded-xl shadow-sm border border-gray-100">
              <TabsTrigger 
                value="workflow" 
                className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 rounded-lg py-3"
              >
                Workflow
              </TabsTrigger>
              <TabsTrigger 
                value="leads" 
                className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 rounded-lg py-3"
              >
                Leads
              </TabsTrigger>
              <TabsTrigger 
                value="performance" 
                className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 rounded-lg py-3"
              >
                Performance
              </TabsTrigger>
              <TabsTrigger 
                value="analysis" 
                className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 rounded-lg py-3"
              >
                AI Analysis
              </TabsTrigger>
            </TabsList>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-8"
            >
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
              
              <TabsContent value="analysis" className="space-y-6">
                {/* AI Analysis Component */}
                <CampaignAnalysis campaignId={campaignId} />
              </TabsContent>
            </motion.div>
          </Tabs>
        </div>
      </motion.div>
    </Layout>
  );
};

export default CampaignDetails;
