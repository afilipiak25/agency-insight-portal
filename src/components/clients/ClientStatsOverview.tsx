
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, Target, TrendingUp, Calendar, 
  Mail, MessageSquare, BarChart3, Clock
} from 'lucide-react';
import type { ClientOverview } from '@/types/client';
import { motion } from 'framer-motion';

interface ClientStatsOverviewProps {
  clients: ClientOverview[];
}

export const ClientStatsOverview = ({ clients }: ClientStatsOverviewProps) => {
  const totalClients = clients.length;
  const activeClients = clients.filter(c => c.requestType === 'campaign').length;
  const totalCampaigns = activeClients * 2.5; // Mock calculation
  const totalLeads = Math.floor(totalCampaigns * 165); // Mock calculation
  
  const stats = [
    {
      title: 'Total Clients',
      value: totalClients.toString(),
      change: '+12%',
      changeType: 'positive' as const,
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50'
    },
    {
      title: 'Active Campaigns',
      value: Math.floor(totalCampaigns).toString(),
      change: '+8%',
      changeType: 'positive' as const,
      icon: Target,
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'from-indigo-50 to-purple-50'
    },
    {
      title: 'Total Leads',
      value: totalLeads.toLocaleString(),
      change: '+23%',
      changeType: 'positive' as const,
      icon: BarChart3,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50'
    },
    {
      title: 'Avg Response Rate',
      value: '78%',
      change: '+5%',
      changeType: 'positive' as const,
      icon: MessageSquare,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
    >
      {stats.map((stat, index) => (
        <motion.div key={stat.title} variants={itemVariants}>
          <Card className="relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm group hover:-translate-y-1">
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-50 group-hover:opacity-70 transition-opacity`}></div>
            
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <Badge 
                  className={`${
                    stat.changeType === 'positive' 
                      ? 'bg-green-100 text-green-800 border-green-200' 
                      : 'bg-red-100 text-red-800 border-red-200'
                  }`}
                >
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {stat.change}
                </Badge>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-sm text-gray-600">{stat.title}</p>
              </div>
              
              {/* Additional info based on stat type */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>Updated 2 minutes ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};
