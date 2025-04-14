
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Download, Filter, Info, TrendingUp } from 'lucide-react';
import { CampaignRow } from '@/pages/Campaigns';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, TooltipProps } from 'recharts';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface CampaignPerformanceProps {
  campaign: CampaignRow;
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

export const CampaignPerformance = ({ campaign }: CampaignPerformanceProps) => {
  const [timeFrame, setTimeFrame] = useState('30d');
  
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
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Campaign Performance</h2>
          <Badge variant="purple" className="animate-pulse-ring">Live</Badge>
        </div>
        <div className="flex gap-2">
          <div className="bg-white border border-gray-200 rounded-full shadow-sm flex overflow-hidden">
            <Button 
              variant="ghost"
              size="sm"
              className={`rounded-full px-3 ${timeFrame === '7d' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600'}`}
              onClick={() => setTimeFrame('7d')}
            >
              7d
            </Button>
            <Button 
              variant="ghost"
              size="sm"
              className={`rounded-full px-3 ${timeFrame === '30d' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600'}`}
              onClick={() => setTimeFrame('30d')}
            >
              30d
            </Button>
            <Button 
              variant="ghost"
              size="sm"
              className={`rounded-full px-3 ${timeFrame === '90d' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600'}`}
              onClick={() => setTimeFrame('90d')}
            >
              90d
            </Button>
          </div>
          <Button variant="outline" size="sm" className="rounded-full flex items-center gap-1.5 hover:bg-gray-100 hover:shadow-none border-gray-200 hover:-translate-y-0 text-gray-600">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent className="pt-4 h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={emailData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
              <LineChart data={dailyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
      </div>

      <Card className="shadow-sm border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300">
        <CardHeader className="pb-0 pt-5 border-b border-gray-50">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              Step-by-Step Performance
              <Popover>
                <PopoverTrigger asChild>
                  <Info className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-medium">Understanding Step Performance</h4>
                    <p className="text-sm text-gray-500">
                      This table shows detailed metrics for each step in your campaign workflow. Track deliverability, engagement, and conversion rates across all emails.
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            </CardTitle>
            <Button variant="outline" size="sm" className="rounded-full flex items-center gap-1.5 hover:bg-gray-100 border-gray-200 text-gray-600">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="overflow-hidden rounded-lg border border-gray-100">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Step</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Delivered</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Opened</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Clicked</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Replied</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Conversion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[1, 2, 3].map((i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 font-medium">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-medium text-sm">E{i}</div>
                        <span>Email {i}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{95 - i * 5}%</span>
                        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-indigo-500 rounded-full"
                            style={{ width: `${95 - i * 5}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{55 - i * 5}%</span>
                        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${55 - i * 5}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{45 - i * 5}%</span>
                        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-violet-500 rounded-full"
                            style={{ width: `${45 - i * 5}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{35 - i * 5}%</span>
                        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-purple-500 rounded-full"
                            style={{ width: `${35 - i * 5}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{25 - i * 5}%</span>
                        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                            style={{ width: `${25 - i * 5}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-sm border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-0 pt-5">
            <CardTitle className="text-lg font-semibold text-gray-800">Response Statistics</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Average Response Time</span>
                  <span className="text-sm font-medium text-indigo-600">4.2 hours</span>
                </div>
                <Progress value={70} className="h-2" progressColor="bg-indigo-500" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Positive Responses</span>
                  <span className="text-sm font-medium text-green-600">28%</span>
                </div>
                <Progress value={28} className="h-2" progressColor="bg-green-500" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Negative Responses</span>
                  <span className="text-sm font-medium text-red-500">12%</span>
                </div>
                <Progress value={12} className="h-2" progressColor="bg-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-0 pt-5">
            <CardTitle className="text-lg font-semibold text-gray-800">Best Performing Segment</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Tech Industry</span>
                <Badge className="bg-gradient-to-r from-indigo-500 to-purple-600 border-0">Top Performer</Badge>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-500">Open Rate</span>
                    <span className="text-xs font-medium">68%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-500">Reply Rate</span>
                    <span className="text-xs font-medium">42%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: '42%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-500">Meeting Booked</span>
                    <span className="text-xs font-medium">18%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '18%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-0 pt-5">
            <CardTitle className="text-lg font-semibold text-gray-800">Goal Progress</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Meetings Booked</span>
                  <span className="text-sm font-medium">12 / 20</span>
                </div>
                <Progress value={60} className="h-2" progressColor="bg-gradient-to-r from-indigo-500 to-purple-600" />
                <p className="text-xs text-gray-500 mt-1">60% of target</p>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Pipeline Generated</span>
                  <span className="text-sm font-medium">$42K / $100K</span>
                </div>
                <Progress value={42} className="h-2" progressColor="bg-gradient-to-r from-indigo-500 to-purple-600" />
                <p className="text-xs text-gray-500 mt-1">42% of target</p>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Campaign Timeline</span>
                  <span className="text-sm font-medium">Day 18 / 30</span>
                </div>
                <Progress value={60} className="h-2" progressColor="bg-gradient-to-r from-indigo-500 to-purple-600" />
                <p className="text-xs text-gray-500 mt-1">60% complete</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
