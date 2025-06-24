
import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { ClientFilters } from '@/components/clients/ClientFilters';
import { ModernClientCard } from '@/components/clients/ModernClientCard';
import { ClientStatsOverview } from '@/components/clients/ClientStatsOverview';
import { mockClientsData } from '@/data/mockClients';
import type { ClientOverview } from '@/types/client';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserPlus, Grid3X3, List, BarChart3, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AllClients = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredClient, setHoveredClient] = useState<number | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'campaign' | 'connection' | 'other'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'campaigns' | 'performance' | 'lastActivity'>('lastActivity');
  
  const filteredClients = mockClientsData.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || client.requestType === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const sortedClients = [...filteredClients].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'campaigns':
        return b.id - a.id; // Mock sort by campaign count
      case 'performance':
        return b.id - a.id; // Mock sort by performance
      default:
        return b.id - a.id; // Mock sort by last activity
    }
  });

  const getFilterCount = (filterType: 'campaign' | 'connection' | 'other') => {
    return mockClientsData.filter(client => client.requestType === filterType).length;
  };

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
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            {/* Enhanced Header */}
            <motion.div 
              className="mb-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur-xl opacity-20"></div>
                  <div className="relative bg-white p-4 rounded-2xl shadow-lg">
                    <Users className="w-8 h-8 text-indigo-600" />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Client Dashboard
                  </h1>
                  <p className="text-gray-600 mt-2 text-lg">Manage all your clients and their campaign performance</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-all ${
                      viewMode === 'grid' 
                        ? 'bg-indigo-100 text-indigo-600 shadow-sm' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-all ${
                      viewMode === 'list' 
                        ? 'bg-indigo-100 text-indigo-600 shadow-sm' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="lastActivity">Last Activity</option>
                  <option value="name">Name</option>
                  <option value="campaigns">Campaigns</option>
                  <option value="performance">Performance</option>
                </select>
                
                <Button
                  onClick={() => navigate('/clients/create')}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  New Client
                </Button>
              </div>
            </motion.div>

            {/* Stats Overview */}
            <ClientStatsOverview clients={mockClientsData} />

            {/* Enhanced Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <ClientFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedFilter={selectedFilter}
                onFilterChange={setSelectedFilter}
                getFilterCount={getFilterCount}
              />
            </motion.div>

            {/* Clients Grid/List */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={`mt-8 ${
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6' 
                  : 'space-y-4'
              }`}
            >
              <AnimatePresence mode="wait">
                {sortedClients.map((client, index) => (
                  <motion.div
                    key={client.id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ delay: index * 0.1 }}
                    layout
                  >
                    <ModernClientCard
                      client={client}
                      isHovered={hoveredClient === client.id}
                      onHover={setHoveredClient}
                      onClick={(id) => navigate(`/campaigns?clientId=${id}`)}
                      viewMode={viewMode}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Empty State */}
            {sortedClients.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-xl opacity-20"></div>
                  <div className="relative bg-white p-6 rounded-full shadow-lg">
                    <BarChart3 className="w-12 h-12 text-gray-400" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No clients found</h3>
                <p className="text-gray-500 mb-6 max-w-md">
                  No clients match your current filters. Try adjusting your search criteria or create a new client.
                </p>
                <Button
                  onClick={() => navigate('/clients/create')}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Create Your First Client
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllClients;
