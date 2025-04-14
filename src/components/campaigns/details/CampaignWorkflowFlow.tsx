
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { WorkflowPreview } from '@/components/campaigns/workflow/WorkflowPreview';
import { WorkflowVisualizationBoard } from '@/components/campaigns/workflow/WorkflowVisualizationBoard';
import { useWorkflowSteps } from '@/components/campaigns/lead-table/useWorkflowSteps';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, Zap, Clock, Users, GanttChart, 
  BarChart3, FileText, Sparkles, MessageCircle,
  Mail, Check, Calendar
} from 'lucide-react';
import { ApolloLead } from '@/components/campaigns/types/apollo-filters';
import { motion } from 'framer-motion';

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

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show" 
      className="space-y-6"
    >
      <motion.div variants={item} className="flex justify-between items-center">
        <div className="flex gap-4">
          <Button 
            variant={activeView === 'sequential' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setActiveView('sequential')}
            className={`hover:-translate-y-0.5 transition-transform ${
              activeView === 'sequential' ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' : ''
            }`}
          >
            <GanttChart className="w-4 h-4 mr-1.5" />
            Sequential View
          </Button>
          <Button 
            variant={activeView === 'flow' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setActiveView('flow')}
            className={`hover:-translate-y-0.5 transition-transform ${
              activeView === 'flow' ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' : ''
            }`}
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
            size="sm"
            className="hover:-translate-y-0.5 transition-transform bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
          >
            <Zap className="w-4 h-4 mr-1.5" />
            Optimize
          </Button>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <Card className="shadow-sm border-gray-100 hover:shadow-md transition-duration-300 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-white pb-0">
            <CardTitle className="flex justify-between items-center text-lg font-semibold">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white">
                  <FileText className="w-4 h-4" />
                </div>
                Campaign Workflow
                <Badge className="bg-black text-white">Active</Badge>
              </div>
              <div className="flex items-center gap-4 text-sm font-normal text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-indigo-500" />
                  <span>5 Steps</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-purple-500" />
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
      </motion.div>

      <motion.div variants={item}>
        <Card className="shadow-sm border-gray-100 hover:shadow-md transition-duration-300 overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white">
                <Mail className="w-4 h-4" />
              </div>
              Email Templates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "Introduction", type: "Email", metrics: { openRate: 60, replies: 32 } },
                { name: "Follow-up", type: "Email", metrics: { openRate: 52, replies: 24 } },
                { name: "Final Offer", type: "Email", metrics: { openRate: 48, replies: 18 } }
              ].map((template, index) => (
                <Card key={index} className="shadow-sm hover:shadow-md transition-shadow border-gray-100 overflow-hidden">
                  <CardHeader className="p-4 pb-2 bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-md flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          {index + 1}
                        </div>
                        {template.name}
                      </CardTitle>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {template.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600 line-clamp-3">
                      Hey {'{firstName}'}, I noticed your work at {'{company}'} and wanted to connect regarding our lead generation solution that has helped companies like yours increase qualified leads by 30%.
                    </p>
                    <div className="mt-4 flex gap-2">
                      <div className="flex-1 bg-blue-50 rounded-lg p-2">
                        <div className="text-xs text-gray-500">Open Rate</div>
                        <div className="text-lg font-semibold text-blue-700">{template.metrics.openRate}%</div>
                      </div>
                      <div className="flex-1 bg-purple-50 rounded-lg p-2">
                        <div className="text-xs text-gray-500">Replies</div>
                        <div className="text-lg font-semibold text-purple-700">{template.metrics.replies}</div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-2 bg-gray-50 flex justify-end">
                    <Button variant="ghost" size="sm" className="text-xs">Edit Template</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="shadow-sm border-gray-100 hover:shadow-md transition-duration-300 overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              Campaign Automation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-green-100 bg-green-50/30">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Auto-Responder</h4>
                    <p className="text-sm text-gray-600">Automatic replies to interested leads</p>
                    <Badge className="mt-1 bg-green-100 text-green-800">Active</Badge>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-purple-100 bg-purple-50/30">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Meeting Scheduler</h4>
                    <p className="text-sm text-gray-600">Auto-book meetings on positive response</p>
                    <Badge className="mt-1 bg-purple-100 text-purple-800">Active</Badge>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-gray-100">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                    <Check className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Lead Scorer</h4>
                    <p className="text-sm text-gray-600">Automatically score and qualify leads</p>
                    <Badge className="mt-1 bg-gray-100 text-gray-800">Inactive</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};
