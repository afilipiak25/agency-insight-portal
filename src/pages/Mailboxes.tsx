
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Mail, Search, Settings, Globe, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { ProgressBar } from "@/components/stats/ProgressBar";

interface MailProvider {
  id: string;
  name: string;
  icon: string;
  category: 'popular' | 'additional';
}

interface ActiveMailbox {
  id: string;
  email: string;
  provider: string;
  status: 'active' | 'inactive';
  deliverabilityRate: number;
  health: 'fully_operational' | 'minor_issues' | 'urgent_issues';
}

const mailProviders: MailProvider[] = [
  { id: 'google', name: 'Google Workspace', icon: '/lovable-uploads/5092db53-f3c0-4857-b407-7de1f79d2191.png', category: 'popular' },
  { id: 'gmail', name: 'Gmail', icon: '/lovable-uploads/5092db53-f3c0-4857-b407-7de1f79d2191.png', category: 'popular' },
  { id: 'microsoft365', name: 'Microsoft 365', icon: '/lovable-uploads/5092db53-f3c0-4857-b407-7de1f79d2191.png', category: 'popular' },
  { id: 'outlook', name: 'Outlook', icon: '/lovable-uploads/5092db53-f3c0-4857-b407-7de1f79d2191.png', category: 'popular' },
  { id: 'sendgrid', name: 'SendGrid', icon: '/lovable-uploads/5092db53-f3c0-4857-b407-7de1f79d2191.png', category: 'popular' },
  { id: 'mailgun', name: 'Mailgun', icon: '/lovable-uploads/5092db53-f3c0-4857-b407-7de1f79d2191.png', category: 'popular' },
  { id: 'smtp', name: 'Custom SMTP', icon: '/lovable-uploads/5092db53-f3c0-4857-b407-7de1f79d2191.png', category: 'popular' },
  { id: 'yahoo', name: 'Yahoo', icon: '/lovable-uploads/5092db53-f3c0-4857-b407-7de1f79d2191.png', category: 'additional' },
  { id: 'zoho', name: 'Zoho', icon: '/lovable-uploads/5092db53-f3c0-4857-b407-7de1f79d2191.png', category: 'additional' },
  { id: 'zohopro', name: 'Zoho-PRO', icon: '/lovable-uploads/5092db53-f3c0-4857-b407-7de1f79d2191.png', category: 'additional' },
];

const activeMailboxes: ActiveMailbox[] = [
  { id: '1', email: 'max.mueller@company.com', provider: 'SMTP/IMAP', status: 'active', deliverabilityRate: 98.5, health: 'fully_operational' },
  { id: '2', email: 'sarah.schmidt@company.com', provider: 'SMTP/IMAP', status: 'active', deliverabilityRate: 97.2, health: 'minor_issues' },
  { id: '3', email: 'andreas.weber@company.com', provider: 'SMTP/IMAP', status: 'active', deliverabilityRate: 99.1, health: 'fully_operational' },
  { id: '4', email: 'lisa.wagner@company.com', provider: 'SMTP/IMAP', status: 'active', deliverabilityRate: 86.8, health: 'urgent_issues' },
];

const statisticsData = {
  sent: { value: 598, change: 15.6 },
  responses: { value: 45, change: 11.2 },
  deliverability: { value: 95 },
  mailboxHealth: { value: 88 },
  activeMailboxes: { value: activeMailboxes.length },
  dailyEmailCapacity: { value: 5000, used: 2450 }
};

const Mailboxes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const getHealthIcon = (health: ActiveMailbox['health']) => {
    switch (health) {
      case 'fully_operational':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'minor_issues':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'urgent_issues':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getHealthText = (health: ActiveMailbox['health']) => {
    switch (health) {
      case 'fully_operational':
        return "Fully Operational";
      case 'minor_issues':
        return "Minor Issues";
      case 'urgent_issues':
        return "Urgent Issues";
    }
  };

  const getHealthBarColor = (health: ActiveMailbox['health']) => {
    switch (health) {
      case 'fully_operational':
        return "bg-gradient-to-r from-green-400 to-green-500";
      case 'minor_issues':
        return "bg-gradient-to-r from-amber-400 to-amber-500";
      case 'urgent_issues':
        return "bg-gradient-to-r from-red-400 to-red-500";
    }
  };

  return (
    <Layout>
      <div className="flex-1 w-full min-h-screen bg-gray-50">
        <div className="w-full p-4 sm:p-6 md:p-8">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4 mb-6">
            <div className="w-full sm:w-auto flex flex-col items-center sm:items-start">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-xl sm:text-2xl font-semibold">Mailboxes</h1>
                <Badge variant="outline" className="bg-violet-100 text-dashboard-primary border-dashboard-secondary">
                  {activeMailboxes.length}/{activeMailboxes.length} Connected
                </Badge>
              </div>
              <p className="text-sm sm:text-base text-gray-600">
                This will dynamically rotate between your mailboxes, maximizing deliverability.
              </p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2 flex-1 sm:flex-initial whitespace-nowrap"
              >
                <Settings className="w-4 h-4" />
                Einstellungen
              </Button>
              <Button 
                variant="default"
                size="sm"
                className="gap-2 flex-1 sm:flex-initial whitespace-nowrap bg-[#7E69AB] hover:bg-[#6A5A91]"
              >
                <Plus className="w-4 h-4" />
                Add Email Address
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col items-center border border-gray-100">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-blue-100 mb-3">
                <Mail className="text-blue-500 w-6 h-6" />
              </div>
              <p className="text-gray-500 text-sm mb-1">Sent</p>
              <h3 className="text-3xl font-semibold text-gray-800">{statisticsData.sent.value}</h3>
              <span className="text-green-500 text-sm">↑ {statisticsData.sent.change}%</span>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col items-center border border-gray-100">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-green-100 mb-3">
                <Mail className="text-green-500 w-6 h-6" />
              </div>
              <p className="text-gray-500 text-sm mb-1">Responses</p>
              <h3 className="text-3xl font-semibold text-gray-800">{statisticsData.responses.value}</h3>
              <span className="text-green-500 text-sm">↑ {statisticsData.responses.change}%</span>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col items-center border border-gray-100">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-violet-100 mb-3">
                <CheckCircle className="text-violet-500 w-6 h-6" />
              </div>
              <p className="text-gray-500 text-sm mb-1">Deliverability</p>
              <h3 className="text-3xl font-semibold text-gray-800">{statisticsData.deliverability.value}%</h3>
              <div className="w-full mt-2">
                <ProgressBar value={statisticsData.deliverability.value} total={100} color="bg-gradient-to-r from-violet-400 to-violet-600" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col items-center border border-gray-100">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-pink-100 mb-3">
                <Mail className="text-pink-500 w-6 h-6" />
              </div>
              <p className="text-gray-500 text-sm mb-1">Mailbox Health</p>
              <h3 className="text-3xl font-semibold text-gray-800">{statisticsData.mailboxHealth.value}%</h3>
              <div className="w-full mt-2">
                <ProgressBar value={statisticsData.mailboxHealth.value} total={100} color="bg-gradient-to-r from-pink-400 to-pink-600" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col items-center border border-gray-100">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-indigo-100 mb-3">
                <Mail className="text-indigo-500 w-6 h-6" />
              </div>
              <p className="text-gray-500 text-sm mb-1">Active Mailboxes</p>
              <h3 className="text-3xl font-semibold text-gray-800">{statisticsData.activeMailboxes.value}</h3>
              <span className="text-gray-500 text-sm">Total Connected</span>
            </div>
          </div>

          {/* Daily Email Capacity */}
          <div className="bg-white rounded-xl shadow-sm p-5 mb-6 border border-gray-100">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-800">Daily Email Capacity</h3>
              <span className="text-gray-500 text-sm">{statisticsData.dailyEmailCapacity.used}/{statisticsData.dailyEmailCapacity.value}</span>
            </div>
            <ProgressBar 
              value={statisticsData.dailyEmailCapacity.used} 
              total={statisticsData.dailyEmailCapacity.value} 
              color="bg-gradient-to-r from-dashboard-primary to-dashboard-secondary" 
            />
          </div>

          <div className="bg-white rounded-lg border p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Accounts</h2>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search mailboxes..."
                  className="pl-10 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Nach Anbietern suchen..."
                className="pl-10 w-full"
              />
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-sm font-medium text-gray-500 mb-4">Status</h2>
                <div className="space-y-4">
                  {activeMailboxes.map(mailbox => (
                    <div
                      key={mailbox.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-white hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-4">
                        <div className="bg-dashboard-light rounded-full p-2">
                          <Mail className="w-5 h-5 text-dashboard-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm text-gray-900">{mailbox.email}</p>
                          <p className="text-xs text-gray-600">{mailbox.provider}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          {getHealthIcon(mailbox.health)}
                          <span className={`text-sm ${
                            mailbox.health === 'fully_operational' ? 'text-green-500' : 
                            mailbox.health === 'minor_issues' ? 'text-amber-500' : 
                            'text-red-500'
                          }`}>
                            {getHealthText(mailbox.health)}
                          </span>
                        </div>
                        
                        <div className="w-24">
                          <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                            <div 
                              className={getHealthBarColor(mailbox.health)} 
                              style={{ width: `${mailbox.deliverabilityRate}%`, height: '100%' }}
                            />
                          </div>
                        </div>
                        
                        <Switch 
                          checked={mailbox.status === 'active'} 
                          className="data-[state=checked]:bg-dashboard-primary"
                        />
                        
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 border-red-200 hover:bg-red-50"
                        >
                          Disconnect
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-sm font-medium text-gray-500 mb-4">Popular Providers</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {mailProviders
                    .filter(provider => provider.category === 'popular')
                    .map(provider => (
                      <button
                        key={provider.id}
                        className="flex items-center gap-3 p-3 sm:p-4 rounded-lg border hover:border-violet-400 hover:bg-violet-50 transition-all w-full text-left"
                      >
                        <div className="w-10 h-10 rounded-full bg-dashboard-light flex items-center justify-center">
                          <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-dashboard-primary flex-shrink-0" />
                        </div>
                        <span className="font-medium text-sm sm:text-base truncate">
                          {provider.name}
                        </span>
                      </button>
                    ))}
                </div>
              </div>

              <div>
                <h2 className="text-sm font-medium text-gray-500 mb-4">Additional Providers</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {mailProviders
                    .filter(provider => provider.category === 'additional')
                    .map(provider => (
                      <button
                        key={provider.id}
                        className="flex items-center gap-3 p-3 sm:p-4 rounded-lg border hover:border-violet-400 hover:bg-violet-50 transition-all w-full text-left"
                      >
                        <div className="w-10 h-10 rounded-full bg-dashboard-light flex items-center justify-center">
                          <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-dashboard-primary flex-shrink-0" />
                        </div>
                        <span className="font-medium text-sm sm:text-base truncate">
                          {provider.name}
                        </span>
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Mailboxes;
