
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CampaignRow } from '@/pages/Campaigns';

interface CampaignMetricsProps {
  campaign: CampaignRow;
}

export const CampaignMetrics = ({ campaign }: CampaignMetricsProps) => {
  // Parse leads completed as numbers
  const [completed, total] = campaign.leadsCompleted.split('/').map(v => parseInt(v));
  const completedPercentage = (completed / total) * 100;
  
  return (
    <div className="grid grid-cols-5 gap-4">
      <Card className="bg-gradient-to-br from-amplifa-orange/10 to-amplifa-pink/10 border-none shadow-sm">
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Leads Completed</h3>
          <div className="flex justify-between items-end">
            <div className="text-2xl font-bold text-dashboard-primary">{campaign.leadsCompleted}</div>
            <div className="text-xs text-gray-500">{completedPercentage.toFixed(1)}%</div>
          </div>
          <Progress value={completedPercentage} className="h-1.5 mt-2" />
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Sourced</h3>
          <div className="flex justify-between items-end">
            <div className="text-2xl font-bold text-dashboard-primary">{campaign.sourced || '-'}</div>
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
            </div>
          </div>
          <Progress value={parseInt(campaign.sourced || '0')} className="h-1.5 mt-2" />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Activated</h3>
          <div className="flex justify-between items-end">
            <div className="text-2xl font-bold text-dashboard-primary">{campaign.activated || '-'}</div>
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
            </div>
          </div>
          <Progress value={parseInt(campaign.activated || '0')} className="h-1.5 mt-2" />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Opened</h3>
          <div className="flex justify-between items-end">
            <div className="text-2xl font-bold text-dashboard-primary">{campaign.opened || '-'}</div>
            <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
            </div>
          </div>
          <Progress value={parseInt(campaign.opened || '0')} className="h-1.5 mt-2" />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Replied</h3>
          <div className="flex justify-between items-end">
            <div className="text-2xl font-bold text-dashboard-primary">{campaign.replied || '-'}</div>
            <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
            </div>
          </div>
          <Progress value={parseInt(campaign.replied || '0')} className="h-1.5 mt-2" />
        </CardContent>
      </Card>
    </div>
  );
};
