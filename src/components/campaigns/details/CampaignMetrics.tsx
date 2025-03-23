
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CampaignRow } from '@/pages/Campaigns';

interface CampaignMetricsProps {
  campaign: CampaignRow;
}

export const CampaignMetrics = ({ campaign }: CampaignMetricsProps) => {
  const [completed, total] = campaign.leadsCompleted.split('/').map(v => parseInt(v));
  const completedPercentage = (completed / total) * 100;
  
  return (
    <div className="grid grid-cols-5 gap-4">
      <Card className="bg-primary/5 border border-primary/10 shadow-sm">
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-gray-600 mb-1">Leads Completed</h3>
          <div className="flex justify-between items-end">
            <div className="text-2xl font-bold text-primary">{campaign.leadsCompleted}</div>
            <div className="text-xs text-gray-500">{completedPercentage.toFixed(1)}%</div>
          </div>
          <Progress value={completedPercentage} className="h-1.5 mt-2 bg-primary/10" />
        </CardContent>
      </Card>
      
      {['Sourced', 'Activated', 'Opened', 'Replied'].map((metric, index) => (
        <Card key={metric} className="border border-gray-100">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-gray-600 mb-1">{metric}</h3>
            <div className="flex justify-between items-end">
              <div className="text-2xl font-bold text-primary">
                {campaign[metric.toLowerCase() as keyof CampaignRow] || '-'}
              </div>
              <div className={`w-6 h-6 rounded-full bg-primary/${(index + 2) * 20} flex items-center justify-center`}>
                <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
              </div>
            </div>
            <Progress 
              value={parseInt(campaign[metric.toLowerCase() as keyof CampaignRow] as string || '0')} 
              className={`h-1.5 mt-2 bg-primary/10`}
              indicatorClassName={`bg-primary/${(index + 2) * 20}`}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
