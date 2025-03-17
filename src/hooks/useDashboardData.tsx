
import { useState } from 'react';

// Demo data for the dashboard
export interface DashboardStats {
  activeLeads: { value: number; change: number };
  openDeals: { value: number; change: number };
  revenue: { value: number; change: number };
  meetings: { value: number; change: number };
  emailsSent: { value: number; change: number };
  responseRate: { value: number; total: number };
  tasks: {
    id: number;
    title: string;
    status: string;
    dueDate: string;
  }[];
  upcomingEvents: {
    id: number;
    title: string;
    time: string;
    date: string;
  }[];
  notifications: {
    id: number;
    message: string;
    time: string;
  }[];
}

export const useDashboardData = (clientId: number = 1) => {
  // Demo data - in real app, this would come from an API
  const stats: DashboardStats = {
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

  // Utility function to determine status badge colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'in-progress': return 'bg-amplifa-blue-light/20 text-amplifa-blue border-amplifa-blue/20';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return { stats, getStatusColor };
};
