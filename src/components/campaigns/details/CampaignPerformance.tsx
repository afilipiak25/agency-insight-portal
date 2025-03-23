
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Download, Filter } from 'lucide-react';
import { ChannelPerformanceChart } from '@/components/stats/ChannelPerformanceChart';
import { LeadPerformanceChart } from '@/components/stats/LeadPerformanceChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CampaignRow } from '@/pages/Campaigns';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';

interface CampaignPerformanceProps {
  campaign: CampaignRow;
}

export const CampaignPerformance = ({ campaign }: CampaignPerformanceProps) => {
  const emailData = [
    { name: 'Email 1', opened: 60, replied: 40, clicked: 45 },
    { name: 'Email 2', opened: 55, replied: 35, clicked: 40 },
    { name: 'Email 3', opened: 50, replied: 30, clicked: 35 },
  ];

  const generateDailyData = () => {
    const data = [];
    const today = new Date();
    
    for (let i = 30; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        leads: Math.floor(Math.random() * 20) + 5,
        completed: Math.floor(Math.random() * 10),
      });
    }
    
    return data;
  };

  const dailyData = generateDailyData();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-dashboard-primary">Campaign Performance</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="hover:-translate-y-0.5 transition-transform">
            <Calendar className="w-4 h-4 mr-1.5" />
            Last 30 Days
          </Button>
          <Button variant="outline" size="sm" className="hover:-translate-y-0.5 transition-transform">
            <Download className="w-4 h-4 mr-1.5" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className="shadow-sm border-gray-200">
          <CardHeader className="pb-0">
            <CardTitle className="text-lg font-semibold text-dashboard-primary">
              Email Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={emailData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="opened" fill="#9333EA" name="Opened %" />
                <Bar dataKey="clicked" fill="#38BDF8" name="Clicked %" />
                <Bar dataKey="replied" fill="#F97316" name="Replied %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-gray-200">
          <CardHeader className="pb-0">
            <CardTitle className="text-lg font-semibold text-dashboard-primary">
              Lead Activity Over Time
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="leads" stroke="#F97316" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="completed" stroke="#34D399" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm border-gray-200">
        <CardHeader className="pb-0">
          <CardTitle className="text-lg font-semibold text-dashboard-primary">
            Step-by-Step Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-sm font-medium text-gray-500 border-b">
                <th className="py-3 px-4">Step</th>
                <th className="py-3 px-4">Delivered</th>
                <th className="py-3 px-4">Opened</th>
                <th className="py-3 px-4">Clicked</th>
                <th className="py-3 px-4">Replied</th>
                <th className="py-3 px-4">Conversion</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[1, 2, 3].map((i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">Email {i}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span>{100 - i * 5}%</span>
                      <Progress value={100 - i * 5} className="h-1.5 w-24" />
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span>{60 - i * 5}%</span>
                      <Progress value={60 - i * 5} className="h-1.5 w-24" />
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span>{50 - i * 5}%</span>
                      <Progress value={50 - i * 5} className="h-1.5 w-24" />
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span>{40 - i * 5}%</span>
                      <Progress value={40 - i * 5} className="h-1.5 w-24" />
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span>{30 - i * 5}%</span>
                      <Progress value={30 - i * 5} className="h-1.5 w-24" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};
