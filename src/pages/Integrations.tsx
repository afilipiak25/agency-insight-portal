
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { PlusCircle, Link2, Mail, Database, Calendar, ExternalLink, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

interface IntegrationCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonText: string;
  buttonColor?: string;
  iconBgColor?: string;
  onConnect?: () => void;
}

const IntegrationCard = ({ 
  title, 
  description, 
  icon, 
  buttonText, 
  buttonColor = "text-amplifa-purple",
  iconBgColor = "bg-amplifa-purple/10",
  onConnect
}: IntegrationCardProps) => (
  <div className="group relative border border-dashed border-gray-200 hover:border-solid hover:border-amplifa-purple/30 rounded-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:shadow-amplifa-purple/5">
    <div className={cn(
      "mb-4 p-4 rounded-full transition-all duration-300 group-hover:scale-110",
      iconBgColor
    )}>
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2 transition-colors duration-300 group-hover:text-amplifa-purple">{title}</h3>
    <p className="text-gray-600 mb-6 text-sm">{description}</p>
    <Button
      variant="outline"
      className={cn(
        "gap-2 transition-all duration-300 group-hover:translate-y-1",
        buttonColor
      )}
      onClick={onConnect}
    >
      {buttonText}
      <ExternalLink className="w-4 h-4" />
    </Button>
  </div>
);

const ActiveIntegration = ({ 
  name, 
  lastSync, 
  isConnected,
  icon: Icon
}: { 
  name: string; 
  lastSync?: string; 
  isConnected: boolean;
  icon: React.ComponentType<{ className?: string }>;
}) => (
  <div className="group flex items-center justify-between py-4 px-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
    <div className="flex items-center gap-4">
      <div className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
        isConnected ? "bg-green-50 text-green-500" : "bg-gray-50 text-gray-400"
      )}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h4 className="font-medium flex items-center gap-2">
          {name}
          {isConnected ? (
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          ) : (
            <XCircle className="w-4 h-4 text-gray-400" />
          )}
        </h4>
        {lastSync && (
          <p className="text-sm text-gray-500">
            Letzter Sync: {lastSync}
          </p>
        )}
      </div>
    </div>
    <Button 
      variant={isConnected ? "default" : "outline"} 
      className={cn(
        "ml-4 transition-all duration-300",
        isConnected ? "bg-green-500 hover:bg-green-600" : "hover:border-gray-400"
      )}
    >
      {isConnected ? "Verbunden" : "Nicht verbunden"}
    </Button>
  </div>
);

const Integrations = () => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleLinkedInConnect = async () => {
    setIsConnecting(true);
    try {
      // In einer echten Implementierung würde hier die OAuth-Authentifizierung stattfinden
      const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${import.meta.env.VITE_LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(window.location.origin + '/integrations/callback')}&scope=r_liteprofile%20r_emailaddress%20w_member_social`;
      
      toast({
        title: "LinkedIn Verbindung wird hergestellt",
        description: "Sie werden zu LinkedIn weitergeleitet...",
      });

      window.location.href = linkedInAuthUrl;
    } catch (error) {
      console.error('LinkedIn connection error:', error);
      toast({
        title: "Verbindung fehlgeschlagen",
        description: "Bitte versuchen Sie es später erneut.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Layout>
      <div className="p-8 max-w-6xl mx-auto animate-fade-in">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold mb-2">Integrationen</h1>
            <p className="text-gray-600">Verbinden Sie Ihre Werkzeuge und Dienste</p>
          </div>
          <Button className="gap-2 bg-gradient-to-r from-amplifa-blue to-amplifa-purple hover:opacity-90 transition-opacity">
            <PlusCircle className="w-4 h-4" />
            Neue Integration
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <IntegrationCard
            title="LinkedIn Integration"
            description="Verbinden Sie Ihre LinkedIn-Profile und Sales Navigator"
            icon={<Link2 className="w-6 h-6 text-[#0077B5]" />}
            buttonText={isConnecting ? "Verbinde..." : "Verbinden"}
            buttonColor="text-[#0077B5]"
            iconBgColor="bg-[#0077B5]/10"
            onConnect={handleLinkedInConnect}
          />
          <IntegrationCard
            title="Email Integration"
            description="Gmail, Outlook und andere Email-Provider verbinden"
            icon={<Mail className="w-6 h-6 text-[#4285F4]" />}
            buttonText="Verbinden"
            buttonColor="text-[#4285F4]"
            iconBgColor="bg-[#4285F4]/10"
          />
          <IntegrationCard
            title="CRM/ATS System"
            description="Salesforce, HubSpot, sCRM, ATS und andere CRM-Systeme verbinden"
            icon={<Database className="w-6 h-6 text-[#FF6B6B]" />}
            buttonText="Verbinden"
            buttonColor="text-[#FF6B6B]"
            iconBgColor="bg-[#FF6B6B]/10"
          />
          <IntegrationCard
            title="Kalender Integration"
            description="Calendly, Google Calendar und andere Kalender verbinden"
            icon={<Calendar className="w-6 h-6 text-[#34C759]" />}
            buttonText="Verbinden"
            buttonColor="text-[#34C759]"
            iconBgColor="bg-[#34C759]/10"
          />
        </div>

        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Aktive Integrationen</h2>
            <Button variant="outline" className="text-gray-600">
              Alle anzeigen
            </Button>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
            <ActiveIntegration
              name="LinkedIn Sales Navigator"
              lastSync="Vor 5 Minuten"
              isConnected={true}
              icon={Link2}
            />
            <ActiveIntegration
              name="Gmail Workspace"
              lastSync="Vor 2 Minuten"
              isConnected={true}
              icon={Mail}
            />
            <ActiveIntegration
              name="Salesforce"
              isConnected={false}
              icon={Database}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Integrations;
