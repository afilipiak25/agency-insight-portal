
import { Calendar, Mail, Database, Linkedin, Settings, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/Layout';
import { cn } from '@/lib/utils';

interface IntegrationCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconColor: string;
  buttonColor: string;
}

const IntegrationCard = ({ title, description, icon, iconColor, buttonColor }: IntegrationCardProps) => (
  <div className="p-6 rounded-lg border border-gray-200 bg-white flex flex-col items-center text-center">
    <div className={cn("p-4 rounded-lg mb-4", iconColor)}>
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 mb-4 text-sm">{description}</p>
    <Button 
      variant="outline" 
      className={cn("gap-2 hover:text-white transition-colors", buttonColor)}
    >
      Verbinden <ExternalLink className="w-4 h-4" />
    </Button>
  </div>
);

interface ActiveIntegrationProps {
  name: string;
  icon: React.ReactNode;
  lastSync: string;
  isConnected: boolean;
}

const ActiveIntegration = ({ name, icon, lastSync, isConnected }: ActiveIntegrationProps) => (
  <div className="flex items-center justify-between p-4 border-b border-gray-100">
    <div className="flex items-center gap-4">
      {icon}
      <div>
        <h4 className="font-medium">{name}</h4>
        <p className="text-sm text-gray-500">{lastSync}</p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <span className={cn(
        "px-3 py-1 rounded-full text-sm",
        isConnected ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
      )}>
        {isConnected ? "Verbunden" : "Nicht verbunden"}
      </span>
      {isConnected && (
        <Button variant="ghost" size="icon">
          <Settings className="w-4 h-4" />
        </Button>
      )}
    </div>
  </div>
);

const Integrations = () => {
  const integrations = [
    {
      title: "LinkedIn Integration",
      description: "Verbinden Sie Ihre LinkedIn-Profile und Sales Navigator",
      icon: <Linkedin className="w-6 h-6 text-[#0077B5]" />,
      iconColor: "bg-[#0077B5]/10",
      buttonColor: "hover:bg-[#0077B5]",
    },
    {
      title: "Email Integration",
      description: "Gmail, Outlook und andere Email-Provider verbinden",
      icon: <Mail className="w-6 h-6 text-blue-500" />,
      iconColor: "bg-blue-50",
      buttonColor: "hover:bg-blue-500",
    },
    {
      title: "CRM Integration",
      description: "Salesforce, HubSpot und andere CRM-Systeme verbinden",
      icon: <Database className="w-6 h-6 text-pink-500" />,
      iconColor: "bg-pink-50",
      buttonColor: "hover:bg-pink-500",
    },
    {
      title: "Kalender Integration",
      description: "Calendly, Google Calendar und andere Kalender verbinden",
      icon: <Calendar className="w-6 h-6 text-green-500" />,
      iconColor: "bg-green-50",
      buttonColor: "hover:bg-green-500",
    },
  ];

  const activeIntegrations = [
    {
      name: "LinkedIn Sales Navigator",
      icon: <Linkedin className="w-5 h-5 text-[#0077B5]" />,
      lastSync: "Letzter Sync: Vor 5 Minuten",
      isConnected: true,
    },
    {
      name: "Gmail Workspace",
      icon: <Mail className="w-5 h-5 text-blue-500" />,
      lastSync: "Letzter Sync: Vor 2 Minuten",
      isConnected: true,
    },
    {
      name: "Salesforce",
      icon: <Database className="w-5 h-5 text-pink-500" />,
      lastSync: "",
      isConnected: false,
    },
    {
      name: "Calendly",
      icon: <Calendar className="w-5 h-5 text-green-500" />,
      lastSync: "Letzter Sync: Vor 1 Minute",
      isConnected: true,
    },
  ];

  return (
    <Layout>
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Integrationen</h1>
          <Button className="bg-[#9b87f5] hover:bg-[#9b87f5]/90">
            + Neue Integration
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {integrations.map((integration, index) => (
            <IntegrationCard key={index} {...integration} />
          ))}
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Aktive Integrationen</h2>
          </div>
          <div>
            {activeIntegrations.map((integration, index) => (
              <ActiveIntegration key={index} {...integration} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Integrations;
