
import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { ClientStats } from '@/components/ClientStats';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { StatsOverview } from '@/components/dashboard/StatsOverview';
import { EmailPerformance } from '@/components/dashboard/EmailPerformance';
import { NotificationsCard } from '@/components/dashboard/NotificationsCard';
import { TasksList } from '@/components/dashboard/TasksList';
import { UpcomingEvents } from '@/components/dashboard/UpcomingEvents';
import { useDashboardData } from '@/hooks/useDashboardData';

const Index = () => {
  const [selectedClientId, setSelectedClientId] = useState(1);
  const { stats, getStatusColor } = useDashboardData(selectedClientId);

  return (
    <Layout>
      <div className="w-full min-h-screen bg-gray-50">
        <div className="p-4 sm:p-6 md:p-8 w-full">
          <DashboardHeader
            title="Dashboard"
            subtitle="Welcome back! Here's an overview of your business"
          />

          {/* Stats Overview Cards */}
          <StatsOverview stats={stats} />

          {/* Email Performance and Notifications */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <EmailPerformance stats={stats} />
            <NotificationsCard notifications={stats.notifications} />
          </div>

          {/* Task List and Calendar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <TasksList tasks={stats.tasks} getStatusColor={getStatusColor} />
            <UpcomingEvents events={stats.upcomingEvents} />
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
