
import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { ClientStats } from '@/components/ClientStats';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BarChart3, Calendar, Mail, MessageSquare, Search, TrendingUp, Users, ArrowUpRight, BellRing, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgressBar } from '@/components/stats/ProgressBar';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [selectedClientId, setSelectedClientId] = useState(1);

  // Demo data - in real app, this would come from an API
  const stats = {
    activeLeads: { value: 245, change: 12.5 },
    openDeals: { value: 18, change: 4.3 },
    revenue: { value: 28450, change: 8.7 },
    meetings: { value: 32, change: -2.4 },
    emailsSent: { value: 1245, change: 15.3 },
    responseRate: { value: 42, total: 100 },
    tasks: [
      { id: 1, title: 'Follow up with Acme Corp', status: 'pending', dueDate: '2023-05-15' },
      { id: 2, title: 'Prepare proposal for TechStart', status: 'in-progress', dueDate: '2023-05-12' },
      { id: 3, title: 'Demo with Global Innovations', status: 'in-progress', dueDate: '2023-05-14' },
      { id: 4, title: 'Call with Marketing team', status: 'pending', dueDate: '2023-05-16' },
    ],
    upcomingEvents: [
      { id: 1, title: 'Strategy meeting', time: '10:00 AM', date: '2023-05-12' },
      { id: 2, title: 'Client presentation', time: '2:30 PM', date: '2023-05-15' },
      { id: 3, title: 'Team sync', time: '9:00 AM', date: '2023-05-13' },
    ],
    notifications: [
      { id: 1, message: 'New lead assigned to you', time: '1 hour ago' },
      { id: 2, message: 'Email response from TechCorp', time: '3 hours ago' },
      { id: 3, message: 'Meeting reminder: Strategy review', time: '5 hours ago' },
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Layout>
      <div className="w-full min-h-screen bg-gray-50">
        <div className="p-4 sm:p-6 md:p-8 w-full">
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's an overview of your business</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Search..." className="pl-10" />
              </div>
              <Button className="bg-dashboard-primary hover:bg-dashboard-hover gap-2">
                <ArrowUpRight className="h-4 w-4" /> Actions
              </Button>
            </div>
          </div>

          {/* Stats Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Active Leads</CardTitle>
                <Users className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stats.activeLeads.value}</div>
                <div className="flex items-center mt-1">
                  <span className={`text-xs ${stats.activeLeads.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stats.activeLeads.change >= 0 ? '↑' : '↓'} {Math.abs(stats.activeLeads.change)}%
                  </span>
                  <span className="text-xs text-gray-500 ml-1">vs last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Open Deals</CardTitle>
                <TrendingUp className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stats.openDeals.value}</div>
                <div className="flex items-center mt-1">
                  <span className={`text-xs ${stats.openDeals.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stats.openDeals.change >= 0 ? '↑' : '↓'} {Math.abs(stats.openDeals.change)}%
                  </span>
                  <span className="text-xs text-gray-500 ml-1">vs last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Revenue</CardTitle>
                <BarChart3 className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">€{stats.revenue.value.toLocaleString()}</div>
                <div className="flex items-center mt-1">
                  <span className={`text-xs ${stats.revenue.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stats.revenue.change >= 0 ? '↑' : '↓'} {Math.abs(stats.revenue.change)}%
                  </span>
                  <span className="text-xs text-gray-500 ml-1">vs last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Meetings</CardTitle>
                <Calendar className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stats.meetings.value}</div>
                <div className="flex items-center mt-1">
                  <span className={`text-xs ${stats.meetings.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stats.meetings.change >= 0 ? '↑' : '↓'} {Math.abs(stats.meetings.change)}%
                  </span>
                  <span className="text-xs text-gray-500 ml-1">vs last month</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Email Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Email Performance</CardTitle>
                <CardDescription>Overview of your email campaign performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Emails Sent</span>
                      <span className="text-sm font-medium text-dashboard-primary">{stats.emailsSent.value}</span>
                    </div>
                    <ProgressBar value={100} total={100} color="bg-gradient-to-r from-dashboard-primary to-dashboard-secondary" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Response Rate</span>
                      <span className="text-sm font-medium text-dashboard-primary">{stats.responseRate.value}%</span>
                    </div>
                    <ProgressBar value={stats.responseRate.value} total={stats.responseRate.total} color="bg-gradient-to-r from-dashboard-primary to-dashboard-secondary" />
                  </div>
                  <div className="flex gap-4 flex-wrap pt-3">
                    <div className="bg-dashboard-light rounded-lg p-3 flex-1 min-w-[180px]">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="h-4 w-4 text-dashboard-primary" />
                        <span className="text-sm font-medium">Open Rate</span>
                      </div>
                      <p className="text-2xl font-semibold">65.8%</p>
                      <p className="text-xs text-green-600">↑ 3.2% vs last month</p>
                    </div>
                    <div className="bg-dashboard-light rounded-lg p-3 flex-1 min-w-[180px]">
                      <div className="flex items-center gap-2 mb-2">
                        <Mail className="h-4 w-4 text-dashboard-primary" />
                        <span className="text-sm font-medium">Click Rate</span>
                      </div>
                      <p className="text-2xl font-semibold">28.4%</p>
                      <p className="text-xs text-green-600">↑ 5.7% vs last month</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Notifications</CardTitle>
                <CardDescription>Your recent notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.notifications.map(notification => (
                    <div key={notification.id} className="bg-dashboard-light rounded-lg p-3">
                      <div className="flex items-start gap-3">
                        <div className="bg-white rounded-full p-1 mt-0.5">
                          <BellRing className="h-4 w-4 text-dashboard-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{notification.message}</p>
                          <p className="text-xs text-gray-500">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Task List and Calendar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Tasks</CardTitle>
                <CardDescription>Your upcoming tasks and activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats.tasks.map(task => (
                    <div key={task.id} className="bg-white rounded-lg border border-gray-100 p-3 flex items-center justify-between hover:shadow-sm transition-shadow">
                      <div className="flex items-center gap-3">
                        <div className="bg-dashboard-light rounded-full p-2">
                          <Activity className="h-4 w-4 text-dashboard-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{task.title}</p>
                          <p className="text-xs text-gray-500">Due: {task.dueDate}</p>
                        </div>
                      </div>
                      <Badge className={`${getStatusColor(task.status)}`}>
                        {task.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Events</CardTitle>
                <CardDescription>Your schedule for the coming days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.upcomingEvents.map(event => (
                    <div key={event.id} className="flex items-start gap-3 p-3 bg-dashboard-light rounded-lg">
                      <div className="rounded-lg bg-white p-2 flex flex-col items-center min-w-[40px]">
                        <span className="text-xs font-bold text-dashboard-primary">{event.date.split('-')[2]}</span>
                        <span className="text-xs text-gray-600">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{event.title}</p>
                        <p className="text-xs text-gray-600">{event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Client Stats - kept for backward compatibility, but could be removed in favor of the new dashboard */}
          <div className="mt-8 hidden">
            <ClientStats clientId={selectedClientId} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
