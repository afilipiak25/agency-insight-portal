
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartLine, DollarSign, Users, Percent } from 'lucide-react';
import { KPICard } from './KPICard';

interface ClientStatsProps {
  clientId: number;
}

const mockData = {
  1: {
    revenue: 125000,
    customers: 1250,
    growth: 15,
    conversion: 3.2,
    monthlyData: [
      { month: 'Jan', value: 65 },
      { month: 'Feb', value: 75 },
      { month: 'Mar', value: 85 },
      { month: 'Apr', value: 95 },
      { month: 'May', value: 105 },
      { month: 'Jun', value: 125 },
    ]
  },
  2: {
    revenue: 85000,
    customers: 950,
    growth: 8,
    conversion: 2.8,
    monthlyData: [
      { month: 'Jan', value: 45 },
      { month: 'Feb', value: 55 },
      { month: 'Mar', value: 65 },
      { month: 'Apr', value: 75 },
      { month: 'May', value: 85 },
      { month: 'Jun', value: 95 },
    ]
  },
  3: {
    revenue: 150000,
    customers: 1500,
    growth: 20,
    conversion: 3.5,
    monthlyData: [
      { month: 'Jan', value: 85 },
      { month: 'Feb', value: 95 },
      { month: 'Mar', value: 105 },
      { month: 'Apr', value: 115 },
      { month: 'May', value: 125 },
      { month: 'Jun', value: 145 },
    ]
  }
};

export const ClientStats = ({ clientId }: ClientStatsProps) => {
  const data = mockData[clientId as keyof typeof mockData];

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Revenue"
          value={`€${(data.revenue / 1000).toFixed(1)}k`}
          change={data.growth}
          icon={<DollarSign className="w-6 h-6 text-agency-600" />}
        />
        <KPICard
          title="Customers"
          value={data.customers}
          change={data.growth}
          icon={<Users className="w-6 h-6 text-agency-600" />}
        />
        <KPICard
          title="Growth"
          value={`${data.growth}%`}
          icon={<ChartLine className="w-6 h-6 text-agency-600" />}
        />
        <KPICard
          title="Conversion Rate"
          value={`${data.conversion}%`}
          icon={<Percent className="w-6 h-6 text-agency-600" />}
        />
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Performance</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Bar dataKey="value" fill="#9b87f5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
