
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CampaignRow } from '@/pages/Campaigns';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface CampaignMetricsProps {
  campaign: CampaignRow;
}

export const CampaignMetrics = ({ campaign }: CampaignMetricsProps) => {
  // Parse leads completed as numbers
  const [completed, total] = campaign.leadsCompleted.split('/').map(v => parseInt(v));
  const completedPercentage = (completed / total) * 100;
  
  // Calculate additional KPIs
  const openRate = parseInt(campaign.opened || '0');
  const replyRate = parseInt(campaign.replied || '0');
  const conversionRate = Math.round((replyRate / openRate) * 100) || 0;
  const bounceRate = 100 - openRate;
  const engagementScore = Math.round((openRate + replyRate * 2) / 3);
  
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
      <Card className="bg-black/5 border-none shadow-sm">
        <CardContent className="p-4">
          <div className="flex justify-between">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Leads Completed</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-[200px] text-xs">Number of leads that have completed the entire campaign workflow</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex justify-between items-end">
            <div className="text-2xl font-bold text-black">{campaign.leadsCompleted}</div>
            <div className="text-xs text-gray-500">{completedPercentage.toFixed(1)}%</div>
          </div>
          <Progress value={completedPercentage} className="h-1.5 mt-2 bg-gray-100" progressColor="bg-black" />
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Sourced</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-[200px] text-xs">Number of leads that have been sourced for this campaign</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex justify-between items-end">
            <div className="text-2xl font-bold text-black">{campaign.sourced || '-'}</div>
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
            </div>
          </div>
          <Progress value={parseInt(campaign.sourced || '0')} max={100} className="h-1.5 mt-2 bg-gray-100" progressColor="bg-black" />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Activated</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-[200px] text-xs">Number of leads that have been activated in the campaign sequence</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex justify-between items-end">
            <div className="text-2xl font-bold text-black">{campaign.activated || '-'}</div>
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
            </div>
          </div>
          <Progress value={parseInt(campaign.activated || '0')} max={100} className="h-1.5 mt-2 bg-gray-100" progressColor="bg-black" />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Opened</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-[200px] text-xs">Percentage of emails that were opened by recipients</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex justify-between items-end">
            <div className="text-2xl font-bold text-black">{campaign.opened || '-'}</div>
            <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
            </div>
          </div>
          <Progress value={openRate} max={100} className="h-1.5 mt-2 bg-gray-100" progressColor="bg-black" />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Replied</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-[200px] text-xs">Percentage of recipients who replied to campaign emails</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex justify-between items-end">
            <div className="text-2xl font-bold text-black">{campaign.replied || '-'}</div>
            <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
            </div>
          </div>
          <Progress value={replyRate} max={100} className="h-1.5 mt-2 bg-gray-100" progressColor="bg-black" />
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100">
        <CardContent className="p-4">
          <div className="flex justify-between">
            <h3 className="text-sm font-medium text-blue-700 mb-1">Engagement Score</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-blue-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-[200px] text-xs">Combined metric of open and reply rates to measure overall engagement</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex justify-between items-end">
            <div className="text-2xl font-bold text-blue-800">{engagementScore}<span className="text-xs ml-1">/ 100</span></div>
            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
            </div>
          </div>
          <Progress value={engagementScore} max={100} className="h-1.5 mt-2 bg-blue-100" progressColor="bg-blue-500" />
        </CardContent>
      </Card>
    </div>
  );
};
