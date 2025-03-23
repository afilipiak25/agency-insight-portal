
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { WorkflowPreview } from '@/components/campaigns/workflow/WorkflowPreview';
import { CampaignFlowVisualization } from '@/components/campaigns/workflow/CampaignFlowVisualization';
import { WorkflowVisualizationBoard } from '@/components/campaigns/workflow/WorkflowVisualizationBoard';
import { useWorkflowSteps } from '@/components/campaigns/lead-table/useWorkflowSteps';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Zap, Clock, Users, GanttChart, BarChart3 } from 'lucide-react';
import { ApolloLead } from '@/components/campaigns/types/apollo-filters';

interface CampaignWorkflowFlowProps {
  campaignId: number;
}

// Mock lead data with required location property
const mockLeads: ApolloLead[] = [
  { id: '1', name: 'John Doe', position: 'CEO', company: 'Acme Inc', location: 'San Francisco', score: 85 },
  { id: '2', name: 'Jane Smith', position: 'CMO', company: 'Globex Corp', location: 'New York', score: 92 },
  { id: '3', name: 'James Wilson', position: 'CTO', company: 'Initech', location: 'Boston', score: 78 },
  { id: '4', name: 'Sarah Johnson', position: 'VP Sales', company: 'Umbrella Corp', location: 'Seattle', score: 88 },
  { id: '5', name: 'Michael Brown', position: 'Director', company: 'Stark Industries', location: 'Chicago', score: 81 },
];

export const CampaignWorkflowFlow = ({ campaignId }: CampaignWorkflowFlowProps) => {
  const { workflowSteps } = useWorkflowSteps();
  const [activeView, setActiveView] = useState<'sequential' | 'flow'>('flow');
  const [isSimulating, setIsSimulating] = useState(false);

  const handleStartSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 10000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <Button 
            variant={activeView === 'sequential' ? 'gradient' : 'outline'} 
            size="sm"
            onClick={() => setActiveView('sequential')}
            className="hover:-translate-y-0.5 transition-transform"
          >
            <GanttChart className="w-4 h-4 mr-1.5" />
            Sequential View
          </Button>
          <Button 
            variant={activeView === 'flow' ? 'gradient' : 'outline'} 
            size="sm"
            onClick={() => setActiveView('flow')}
            className="hover:-translate-y-0.5 transition-transform"
          >
            <BarChart3 className="w-4 h-4 mr-1.5" />
            Flow Visualization
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline"
            size="sm"
            onClick={handleStartSimulation}
            disabled={isSimulating}
            className="hover:-translate-y-0.5 transition-transform"
          >
            <Play className="w-4 h-4 mr-1.5" />
            {isSimulating ? 'Simulating...' : 'Simulate Flow'}
          </Button>
          <Button 
            variant="gradient"
            size="sm"
            className="hover:-translate-y-0.5 transition-transform"
          >
            <Zap className="w-4 h-4 mr-1.5" />
            Optimize
          </Button>
        </div>
      </div>

      <Card className="shadow-sm border-gray-200">
        <CardHeader className="pb-0">
          <CardTitle className="flex justify-between items-center text-lg font-semibold text-dashboard-primary">
            <div className="flex items-center gap-3">
              Campaign Workflow
              <Badge className="bg-black text-white">Active</Badge>
            </div>
            <div className="flex items-center gap-4 text-sm font-normal text-gray-500">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-black" />
                <span>5 Steps</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-black" />
                <span>733 Leads</span>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {activeView === 'sequential' ? (
            <WorkflowPreview />
          ) : (
            <WorkflowVisualizationBoard leads={mockLeads} />
          )}
        </CardContent>
      </Card>

      <Card className="shadow-sm border-gray-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-dashboard-primary">
            Email Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((emailNum) => (
              <Card key={emailNum} className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-md">Email {emailNum}: Introduction</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-gray-600 line-clamp-3">
                    Hey {'{firstName}'}, I noticed your work at {'{company}'} and wanted to connect regarding our lead generation solution that has helped companies like yours increase qualified leads by 30%.
                  </p>
                  <div className="mt-3 flex justify-between items-center">
                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                      {60 - (emailNum * 10)}% Open Rate
                    </Badge>
                    <Button variant="ghost" size="xs">Edit</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
