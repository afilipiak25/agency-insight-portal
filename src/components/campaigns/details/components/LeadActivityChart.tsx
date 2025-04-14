
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';

interface DailyData {
  date: string;
  leads: number;
  completed: number;
}

interface LeadActivityChartProps {
  data: DailyData[];
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
        <p className="font-medium text-sm">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 mt-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
            <span className="text-sm">{entry.name}: {entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const LeadActivityChart = ({ data }: LeadActivityChartProps) => {
  return (
    <Card className="shadow-sm border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-0 pt-5 border-b border-gray-50">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            Lead Activity Over Time
            <Popover>
              <PopoverTrigger asChild>
                <Info className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-2">
                  <h4 className="font-medium">Understanding Lead Activity</h4>
                  <p className="text-sm text-gray-500">
                    This chart shows the number of active leads and completed leads over time. A steeper curve indicates faster progression through your campaign.
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          </CardTitle>
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span>Active Leads</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Completed</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4 h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
            <XAxis dataKey="date" tick={{ fill: '#666' }} />
            <YAxis tick={{ fill: '#666' }} />
            <Tooltip 
              content={<CustomTooltip />}
              contentStyle={{ 
                backgroundColor: "white", 
                borderRadius: "8px",
                borderColor: "#f1f5f9",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="leads" 
              stroke="#f97316" 
              strokeWidth={2} 
              dot={{ fill: "#f97316", strokeWidth: 2, r: 4, stroke: "white" }} 
              activeDot={{ r: 6, fill: "#f97316" }} 
            />
            <Line 
              type="monotone" 
              dataKey="completed" 
              stroke="#10b981" 
              strokeWidth={2} 
              dot={{ fill: "#10b981", strokeWidth: 2, r: 4, stroke: "white" }} 
              activeDot={{ r: 6, fill: "#10b981" }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
