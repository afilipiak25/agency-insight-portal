
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartLine, DollarSign, Users, UserSquare, ChartBar, BarChartHorizontal, Calendar, Inbox, Database, CircuitBoard } from 'lucide-react';
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Track your client's performance</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50">
            <Calendar className="w-4 h-4" />
            Last 30 days
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#6366F1] rounded-lg hover:bg-[#5457E5]">
            <BarChartHorizontal className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Umsatz"
          value={`€${(data.revenue / 1000).toFixed(1)}k`}
          change={data.growth}
          icon={<DollarSign className="w-6 h-6 text-[#6366F1]" />}
        />
        <KPICard
          title="Kunden"
          value={data.customers}
          change={data.growth}
          icon={<Users className="w-6 h-6 text-[#6366F1]" />}
        />
        <KPICard
          title="Leads"
          value="234"
          change={8}
          icon={<UserSquare className="w-6 h-6 text-[#6366F1]" />}
        />
        <KPICard
          title="Kampagnen"
          value="12"
          change={15}
          icon={<ChartBar className="w-6 h-6 text-[#6366F1]" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Performance</h3>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-sm font-medium text-[#6366F1] bg-[#EEF2FF] rounded-lg">
                Monthly
              </button>
              <button className="px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">
                Weekly
              </button>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Bar dataKey="value" fill="#6366F1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Team Profile</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center">
                <UserSquare className="w-5 h-5 text-[#6366F1]" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900">Marketing Lead</h4>
                <p className="text-sm text-gray-500">Sarah Wilson</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center">
                <CircuitBoard className="w-5 h-5 text-[#6366F1]" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900">Tech Lead</h4>
                <p className="text-sm text-gray-500">Michael Chen</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center">
                <Database className="w-5 h-5 text-[#6366F1]" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900">Project Manager</h4>
                <p className="text-sm text-gray-500">Lisa Thompson</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
