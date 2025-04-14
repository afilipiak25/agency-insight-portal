
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CampaignRow } from '@/pages/Campaigns';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info, Users, Mail, MessageSquare, Gauge, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

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
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Define metric cards
  const metricCards = [
    {
      title: "Leads Completed",
      value: campaign.leadsCompleted,
      percentage: completedPercentage,
      icon: <Users className="h-5 w-5 text-indigo-600" />,
      bgClass: "from-indigo-100 to-white",
      progressColor: "bg-indigo-500"
    },
    {
      title: "Sourced",
      value: campaign.sourced || '-',
      percentage: parseInt(campaign.sourced || '0'),
      icon: <TrendingUp className="h-5 w-5 text-emerald-600" />,
      bgClass: "from-emerald-100 to-white",
      progressColor: "bg-emerald-500"
    },
    {
      title: "Activated",
      value: campaign.activated || '-',
      percentage: parseInt(campaign.activated || '0'),
      icon: <Gauge className="h-5 w-5 text-blue-600" />,
      bgClass: "from-blue-100 to-white",
      progressColor: "bg-blue-500"
    },
    {
      title: "Opened",
      value: campaign.opened || '-',
      percentage: openRate,
      icon: <Mail className="h-5 w-5 text-violet-600" />,
      bgClass: "from-violet-100 to-white",
      progressColor: "bg-violet-500"
    },
    {
      title: "Replied",
      value: campaign.replied || '-',
      percentage: replyRate,
      icon: <MessageSquare className="h-5 w-5 text-pink-600" />,
      bgClass: "from-pink-100 to-white",
      progressColor: "bg-pink-500"
    },
    {
      title: "Engagement Score",
      value: `${engagementScore}`,
      percentage: engagementScore,
      icon: <Gauge className="h-5 w-5 text-purple-600" />,
      bgClass: "from-purple-200 to-indigo-100",
      progressColor: "bg-gradient-to-r from-purple-500 to-indigo-500"
    },
  ];

  return (
    <motion.div 
      className="grid grid-cols-2 lg:grid-cols-6 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {metricCards.map((metric, index) => (
        <motion.div key={index} variants={item}>
          <Card className={`shadow-sm border-none bg-gradient-to-br ${metric.bgClass} hover:shadow-md transition-all duration-300`}>
            <CardContent className="p-4">
              <div className="flex justify-between">
                <h3 className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
                  {metric.icon}
                  {metric.title}
                </h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-[200px] text-xs">{`Information about ${metric.title.toLowerCase()}`}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex justify-between items-end">
                <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                <div className="text-xs text-gray-500">{metric.percentage.toFixed(1)}%</div>
              </div>
              <Progress value={metric.percentage} className={`h-1.5 mt-2 ${metric.progressColor}`} />
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};
