
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Mail, Eye, MousePointer, Calendar, CalendarCheck, CheckCircle, LucideIcon } from 'lucide-react';

interface StepData {
  name: string;
  icon: string;
  color: string;
  count: number;
}

interface LeadFunnelVisualizationProps {
  steps: StepData[];
}

export const LeadFunnelVisualization = ({ steps }: LeadFunnelVisualizationProps) => {
  // Find the maximum count to normalize percentages
  const maxCount = Math.max(...steps.map(step => step.count));
  
  // Function to get icon component based on icon name
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'mail': return <Mail className="w-5 h-5" />;
      case 'eye': return <Eye className="w-5 h-5" />;
      case 'mouse-pointer': return <MousePointer className="w-5 h-5" />;
      case 'calendar': return <Calendar className="w-5 h-5" />;
      case 'calendar-check': return <CalendarCheck className="w-5 h-5" />;
      case 'check-circle': return <CheckCircle className="w-5 h-5" />;
      default: return <Mail className="w-5 h-5" />;
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Step progress visualization */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
        {steps.map((step, index) => (
          <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <div 
              className="p-4 rounded-xl border transition-all duration-300 hover:shadow-md flex flex-col items-center justify-center h-full hover:-translate-y-1"
              style={{ borderColor: step.color }}
            >
              <div 
                className="rounded-full p-3 mb-3"
                style={{ backgroundColor: `${step.color}15` }}
              >
                <div className="text-white rounded-full p-2" style={{ backgroundColor: step.color }}>
                  {getIconComponent(step.icon)}
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs font-medium text-gray-500 mb-1">{step.name}</p>
                <h4 className="text-2xl font-bold">{step.count}</h4>
                <p className="text-xs text-gray-400">Leads</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Flow visualization */}
      <div className="mt-8 relative pb-2">
        <div className="absolute h-1 bg-gray-100 left-0 right-0 top-12 z-0"></div>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-2 relative z-10">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-full">
                  <Progress 
                    value={(step.count / maxCount) * 100} 
                    className="h-4 animate-scale-in" 
                    style={{ 
                      backgroundColor: `${step.color}30`,
                      "--tw-progress-bar": step.color
                    } as React.CSSProperties}
                  />
                </div>
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: step.color }}
                >
                  {index + 1}
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute" style={{ left: `${(index + 0.5) * (100 / steps.length)}%` }}>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                )}
                
                <div className="text-center mt-1">
                  <Badge 
                    variant="outline" 
                    className="text-xs animate-fade-in bg-white"
                    style={{ color: step.color, borderColor: step.color }}
                  >
                    {index > 0 ? 
                      `${Math.round((step.count / steps[index-1].count) * 100)}% conversion` : 
                      '100% start'}
                  </Badge>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      
      {/* Key metrics row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-300">
          <h4 className="text-sm font-medium text-gray-600">Average Conversion</h4>
          <p className="text-2xl font-bold mt-1">
            {Math.round((steps[steps.length - 1].count / steps[0].count) * 100)}%
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-300">
          <h4 className="text-sm font-medium text-gray-600">Biggest Drop-off</h4>
          <p className="text-2xl font-bold mt-1">
            Step {steps.reduce((maxDrop, step, i) => {
              if (i === 0) return maxDrop;
              const dropRate = (steps[i-1].count - step.count) / steps[i-1].count;
              return dropRate > steps[maxDrop-1].count - steps[maxDrop].count ? i : maxDrop;
            }, 1)} → {steps.reduce((maxDrop, step, i) => {
              if (i === 0) return maxDrop;
              const dropRate = (steps[i-1].count - step.count) / steps[i-1].count;
              return dropRate > steps[maxDrop-1].count - steps[maxDrop].count ? i + 1 : maxDrop;
            }, 2)}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-300">
          <h4 className="text-sm font-medium text-gray-600">Total Journey Leads</h4>
          <p className="text-2xl font-bold mt-1">{steps.reduce((sum, step) => sum + step.count, 0)}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-300">
          <h4 className="text-sm font-medium text-gray-600">Conversion Goal</h4>
          <p className="text-2xl font-bold mt-1 text-emerald-600">
            {Math.round((steps[steps.length - 1].count / steps[0].count) * 100) >= 10 ? 'On Target' : 'Below Target'}
          </p>
        </div>
      </div>
    </div>
  );
};
