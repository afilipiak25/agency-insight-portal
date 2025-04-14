
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps } from 'recharts';

interface EmailData {
  name: string;
  opened: number;
  replied: number;
  clicked: number;
}

interface EmailPerformanceChartProps {
  data: EmailData[];
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
        <p className="font-medium text-sm">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 mt-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
            <span className="text-sm">{entry.name}: {entry.value}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const EmailPerformanceChart = ({ data }: EmailPerformanceChartProps) => {
  return (
    <Card className="shadow-sm border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-0 pt-5 border-b border-gray-50">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            Email Performance
            <Popover>
              <PopoverTrigger asChild>
                <Info className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-2">
                  <h4 className="font-medium">Understanding Email Performance</h4>
                  <p className="text-sm text-gray-500">
                    This chart shows the percentage of emails that were opened, clicked, and replied to for each email in your campaign sequence.
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          </CardTitle>
          {/* Icon moved from original component */}
          <div className="h-5 w-5 text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m23 6-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4 h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
            <XAxis dataKey="name" tick={{ fill: '#666' }} />
            <YAxis tick={{ fill: '#666' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '12px', marginTop: "10px" }} />
            <Bar dataKey="opened" fill="#6366f1" name="Opened %" radius={[4, 4, 0, 0]} />
            <Bar dataKey="clicked" fill="#3b82f6" name="Clicked %" radius={[4, 4, 0, 0]} />
            <Bar dataKey="replied" fill="#8b5cf6" name="Replied %" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
