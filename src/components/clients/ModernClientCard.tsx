
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Building2, Mail, Phone, Globe, Calendar, 
  TrendingUp, Users, Target, MoreVertical,
  Play, Pause, Eye, Edit, Trash2, MessageSquare,
  BarChart3, Clock, CheckCircle
} from 'lucide-react';
import type { ClientOverview } from '@/types/client';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface ModernClientCardProps {
  client: ClientOverview;
  isHovered: boolean;
  onHover: (id: number | null) => void;
  onClick: (id: number) => void;
  viewMode: 'grid' | 'list';
}

// Mock campaign data for each client
const mockCampaigns = [
  { id: 1, name: 'Q4 Lead Generation', status: 'active', leads: 245, performance: 78, lastActivity: '2 hours ago' },
  { id: 2, name: 'Product Launch Outreach', status: 'paused', leads: 156, performance: 65, lastActivity: '1 day ago' },
  { id: 3, name: 'Winter Campaign 2024', status: 'completed', leads: 89, performance: 92, lastActivity: '3 days ago' },
];

export const ModernClientCard = ({ 
  client, 
  isHovered, 
  onHover, 
  onClick, 
  viewMode 
}: ModernClientCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="w-3 h-3" />;
      case 'paused': return <Pause className="w-3 h-3" />;
      case 'completed': return <CheckCircle className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    hover: { 
      y: -8,
      transition: { duration: 0.3 }
    }
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        onMouseEnter={() => onHover(client.id)}
        onMouseLeave={() => onHover(null)}
      >
        <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              {/* Client Avatar & Info */}
              <div className="flex items-center gap-4 flex-1">
                <div className="relative">
                  <Avatar className="h-16 w-16 ring-4 ring-white shadow-lg">
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${client.name}`} />
                    <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold">
                      {client.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{client.name}</h3>
                  <p className="text-gray-600 flex items-center gap-1">
                    <Building2 className="w-4 h-4" />
                    Technology Sector
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      contact@{client.name.toLowerCase().replace(' ', '')}.com
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Joined 3 months ago
                    </span>
                  </div>
                </div>
              </div>

              {/* Campaigns Overview */}
              <div className="flex-1">
                <div className="grid grid-cols-3 gap-4">
                  {mockCampaigns.slice(0, 3).map((campaign, index) => (
                    <div key={campaign.id} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={`text-xs ${getStatusColor(campaign.status)}`}>
                          {getStatusIcon(campaign.status)}
                          <span className="ml-1">{campaign.status}</span>
                        </Badge>
                      </div>
                      <h4 className="font-medium text-sm text-gray-900 truncate">{campaign.name}</h4>
                      <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                        <span>{campaign.leads} leads</span>
                        <span>{campaign.performance}% performance</span>
                      </div>
                      <Progress value={campaign.performance} className="h-1 mt-2" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">490</div>
                  <div className="text-xs text-gray-500">Total Leads</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">78%</div>
                  <div className="text-xs text-gray-500">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">3</div>
                  <div className="text-xs text-gray-500">Active Campaigns</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button 
                  onClick={() => onClick(client.id)}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View Details
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Client
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Send Message
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Analytics
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Client
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onMouseEnter={() => onHover(client.id)}
      onMouseLeave={() => onHover(null)}
    >
      <Card className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
        {/* Header with gradient */}
        <div className="h-32 bg-gradient-to-br from-indigo-500 via-purple-600 to-blue-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-4 right-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/20">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Client
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Message
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Client
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="absolute bottom-4 left-4 text-white">
            <div className="flex items-center gap-2 text-sm opacity-90">
              <Calendar className="w-4 h-4" />
              <span>Joined 3 months ago</span>
            </div>
          </div>
        </div>

        <CardContent className="p-6 relative">
          {/* Avatar */}
          <div className="absolute -top-8 left-6">
            <Avatar className="h-16 w-16 ring-4 ring-white shadow-lg">
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${client.name}`} />
              <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold">
                {client.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>

          {/* Client Info */}
          <div className="mt-10">
            <h3 className="text-xl font-bold text-gray-900 mb-1">{client.name}</h3>
            <p className="text-gray-600 flex items-center gap-1 mb-4">
              <Building2 className="w-4 h-4" />
              Technology Sector
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="text-center bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-3">
                <div className="text-lg font-bold text-indigo-600">490</div>
                <div className="text-xs text-gray-500">Total Leads</div>
              </div>
              <div className="text-center bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3">
                <div className="text-lg font-bold text-green-600">78%</div>
                <div className="text-xs text-gray-500">Success Rate</div>
              </div>
              <div className="text-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3">
                <div className="text-lg font-bold text-purple-600">3</div>
                <div className="text-xs text-gray-500">Campaigns</div>
              </div>
            </div>

            {/* Campaigns */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-900">Active Campaigns</h4>
                <Badge className="bg-indigo-100 text-indigo-800">3 Running</Badge>
              </div>
              
              {mockCampaigns.slice(0, 2).map((campaign) => (
                <div key={campaign.id} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-sm text-gray-900 truncate flex-1 mr-2">{campaign.name}</h5>
                    <Badge className={`text-xs ${getStatusColor(campaign.status)}`}>
                      {getStatusIcon(campaign.status)}
                      <span className="ml-1">{campaign.status}</span>
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {campaign.leads} leads
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {campaign.performance}%
                    </span>
                  </div>
                  <Progress value={campaign.performance} className="h-1" />
                </div>
              ))}
              
              {mockCampaigns.length > 2 && (
                <div className="text-center">
                  <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-700">
                    View {mockCampaigns.length - 2} more campaigns
                  </Button>
                </div>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>contact@{client.name.toLowerCase().replace(' ', '')}.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Last activity: 2 hours ago</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button 
                onClick={() => onClick(client.id)}
                className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 transition-all duration-300"
              >
                <Eye className="w-4 h-4 mr-1" />
                View Details
              </Button>
              <Button variant="outline" size="icon">
                <MessageSquare className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
