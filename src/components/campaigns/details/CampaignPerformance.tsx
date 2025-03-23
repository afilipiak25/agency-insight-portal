
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
        <h2 className="text-xl font-semibold text-amber-500">Campaign Performance</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-full flex items-center gap-1.5 hover:bg-gray-100 hover:shadow-none border-gray-200 hover:-translate-y-0 text-gray-600">
            <Calendar className="w-4 h-4" />
            Last 30 Days
          </Button>
          <Button variant="outline" size="sm" className="rounded-full flex items-center gap-1.5 hover:bg-gray-100 hover:shadow-none border-gray-200 hover:-translate-y-0 text-gray-600">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className="shadow-sm border-gray-200 rounded-xl overflow-hidden">
          <CardHeader className="pb-0 pt-5">
            <CardTitle className="text-lg font-semibold text-amber-500">
              Email Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={emailData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fill: '#666' }} />
                <YAxis tick={{ fill: '#666' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "white", 
                    borderRadius: "8px",
                    borderColor: "#eaeaea",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                  }} 
                />
                <Legend wrapperStyle={{ fontSize: '12px', marginTop: "10px" }} />
                <Bar dataKey="opened" fill="#9e7ee3" name="Opened %" />
                <Bar dataKey="clicked" fill="#7fcef1" name="Clicked %" />
                <Bar dataKey="replied" fill="#f79e74" name="Replied %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-gray-200 rounded-xl overflow-hidden">
          <CardHeader className="pb-0 pt-5">
            <CardTitle className="text-lg font-semibold text-amber-500">
              Lead Activity Over Time
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fill: '#666' }} />
                <YAxis tick={{ fill: '#666' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "white", 
                    borderRadius: "8px",
                    borderColor: "#eaeaea",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                  }} 
                />
                <Legend wrapperStyle={{ fontSize: '12px', marginTop: "10px" }} />
                <Line type="monotone" dataKey="leads" stroke="#f79e74" strokeWidth={2} dot={false} activeDot={{ r: 6, fill: "#f79e74" }} />
                <Line type="monotone" dataKey="completed" stroke="#85e0b7" strokeWidth={2} dot={false} activeDot={{ r: 6, fill: "#85e0b7" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm border-gray-200 rounded-xl overflow-hidden">
        <CardHeader className="pb-0 pt-5">
          <CardTitle className="text-lg font-semibold text-amber-500">
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
                      <span>{95 - i * 5}%</span>
                      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-amber-400 rounded-full"
                          style={{ width: `${95 - i * 5}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span>{55 - i * 5}%</span>
                      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-amber-400 rounded-full"
                          style={{ width: `${55 - i * 5}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span>{45 - i * 5}%</span>
                      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-amber-400 rounded-full"
                          style={{ width: `${45 - i * 5}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span>{35 - i * 5}%</span>
                      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-amber-400 rounded-full"
                          style={{ width: `${35 - i * 5}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span>{25 - i * 5}%</span>
                      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-amber-400 rounded-full"
                          style={{ width: `${25 - i * 5}%` }}
                        />
                      </div>
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
