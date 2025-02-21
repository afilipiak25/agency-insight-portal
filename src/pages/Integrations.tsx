
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface IntegrationCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonText: string;
  buttonColor?: string;
}

const IntegrationCard = ({ title, description, icon, buttonText, buttonColor = "text-amplifa-purple" }: IntegrationCardProps) => (
  <div className="border border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
    <div className="mb-4 text-4xl">{icon}</div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 mb-4 text-sm">{description}</p>
    <Button
      variant="outline"
      className={cn("gap-2", buttonColor)}
    >
      {buttonText} <span className="text-xs">↗</span>
    </Button>
  </div>
);

const ActiveIntegration = ({ 
  name, 
  lastSync, 
  isConnected 
}: { 
  name: string; 
  lastSync?: string; 
  isConnected: boolean;
}) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-100">
    <div className="flex items-center gap-4">
      <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
        {name.charAt(0)}
      </div>
      <div>
        <h4 className="font-medium">{name}</h4>
        {lastSync && <p className="text-sm text-gray-500">Letzter Sync: {lastSync}</p>}
      </div>
    </div>
    <Button variant={isConnected ? "default" : "outline"} className="ml-4">
      {isConnected ? "Verbunden" : "Nicht verbunden"}
    </Button>
  </div>
);

const Integrations = () => {
  return (
    <Layout>
      <div className="p-8 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Integrationen</h1>
          <Button className="gap-2">
            <PlusCircle className="w-4 h-4" />
            Neue Integration
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <IntegrationCard
            title="LinkedIn Integration"
            description="Verbinden Sie Ihre LinkedIn-Profile und Sales Navigator"
            icon="🔗"
            buttonText="Verbinden"
            buttonColor="text-[#0077B5]"
          />
          <IntegrationCard
            title="Email Integration"
            description="Gmail, Outlook und andere Email-Provider verbinden"
            icon="📧"
            buttonText="Verbinden"
            buttonColor="text-[#4285F4]"
          />
          <IntegrationCard
            title="CRM Integration"
            description="Salesforce, HubSpot und andere CRM-Systeme verbinden"
            icon="💾"
            buttonText="Verbinden"
            buttonColor="text-[#FF6B6B]"
          />
          <IntegrationCard
            title="Kalender Integration"
            description="Calendly, Google Calendar und andere Kalender verbinden"
            icon="📅"
            buttonText="Verbinden"
            buttonColor="text-[#34C759]"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-6">Aktive Integrationen</h2>
          <div className="bg-white rounded-lg border border-gray-200">
            <ActiveIntegration
              name="LinkedIn Sales Navigator"
              lastSync="Vor 5 Minuten"
              isConnected={true}
            />
            <ActiveIntegration
              name="Gmail Workspace"
              lastSync="Vor 2 Minuten"
              isConnected={true}
            />
            <ActiveIntegration
              name="Salesforce"
              isConnected={false}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Integrations;
