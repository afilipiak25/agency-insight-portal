
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface PerformanceData {
  date: string;
  leads: number;
  responses: number;
  conversions: number;
  revenue: number;
}

interface LeadPerformanceChartProps {
  data: PerformanceData[];
}

export const LeadPerformanceChart = ({ data }: LeadPerformanceChartProps) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <h3 className="text-lg font-semibold mb-6">Lead Generation Performance</h3>
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone"
            dataKey="leads"
            name="Leads"
            stroke="#4361EE"
            strokeWidth={2}
          />
          <Line 
            type="monotone"
            dataKey="conversions"
            name="Conversions"
            stroke="#7209B7"
            strokeWidth={2}
          />
          <Line 
            type="monotone"
            dataKey="revenue"
            name="Umsatz (€)"
            stroke="#F72585"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);
