
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface ChannelData {
  channel: string;
  leads: number;
  cost: number;
  cpl: number;
}

interface ChannelPerformanceChartProps {
  data: ChannelData[];
}

export const ChannelPerformanceChart = ({ data }: ChannelPerformanceChartProps) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <h3 className="text-lg font-semibold mb-6">Channel Performance</h3>
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="channel" />
          <YAxis yAxisId="left" orientation="left" stroke="#8B5CF6" />
          <YAxis yAxisId="right" orientation="right" stroke="#F97316" />
          <Tooltip />
          <Legend />
          <Bar 
            yAxisId="left"
            dataKey="leads" 
            name="Leads"
            fill="#8B5CF6" 
          />
          <Bar 
            yAxisId="right"
            dataKey="cost" 
            name="Kosten (€)"
            fill="#F97316" 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);
