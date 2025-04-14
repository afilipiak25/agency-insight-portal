
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Zap, ArrowRight } from 'lucide-react';
import { CampaignRow } from '@/pages/Campaigns';
import { useState } from 'react';
import { EmailPerformanceChart } from './components/EmailPerformanceChart';
import { LeadActivityChart } from './components/LeadActivityChart';
import { StepPerformanceTable } from './components/StepPerformanceTable';
import { ResponseStatistics, BestPerformingSegment, GoalProgress } from './components/StatCards';
import { TimeFrameSelector } from './components/TimeFrameSelector';
import { generateDailyData, getEmailData, getStepDistribution } from './utils/performanceDataUtils';
import { LeadFunnelVisualization } from './components/LeadFunnelVisualization';
import { motion } from 'framer-motion';

interface CampaignPerformanceProps {
  campaign: CampaignRow;
}

export const CampaignPerformance = ({ campaign }: CampaignPerformanceProps) => {
  const [timeFrame, setTimeFrame] = useState('30d');
  
  // Get data from our utility functions
  const emailData = getEmailData();
  const dailyData = generateDailyData(timeFrame === '7d' ? 7 : timeFrame === '30d' ? 30 : 90);
  const stepData = getStepDistribution();

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
      className="space-y-8"
    >
      <motion.div variants={item} className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Campaign Performance
          </h2>
          <Badge variant="purple" className="bg-purple-100 text-purple-800 animate-pulse">Live Data</Badge>
        </div>
        <div className="flex gap-2">
          <TimeFrameSelector timeFrame={timeFrame} setTimeFrame={setTimeFrame} />
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-full flex items-center gap-1.5 hover:bg-gray-100 hover:shadow-sm transition-all duration-200 border-gray-200 hover:-translate-y-0.5 text-gray-600"
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button 
            size="sm" 
            className="rounded-full flex items-center gap-1.5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
          >
            <Zap className="w-4 h-4" />
            Optimize
          </Button>
        </div>
      </motion.div>

      {/* Lead Step Distribution Visualization */}
      <motion.div 
        variants={item}
        className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
      >
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
          <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Lead Journey Progress
          </span>
          <Badge className="bg-purple-100 text-purple-800 font-normal">
            {stepData.reduce((sum, step) => sum + step.count, 0)} Total Leads
          </Badge>
        </h3>
        <LeadFunnelVisualization steps={stepData} />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={item}>
          <EmailPerformanceChart data={emailData} />
        </motion.div>
        <motion.div variants={item}>
          <LeadActivityChart data={dailyData} />
        </motion.div>
      </div>

      <motion.div variants={item}>
        <StepPerformanceTable />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div variants={item}>
          <ResponseStatistics />
        </motion.div>
        <motion.div variants={item}>
          <BestPerformingSegment />
        </motion.div>
        <motion.div variants={item}>
          <GoalProgress />
        </motion.div>
      </div>
    </motion.div>
  );
};
