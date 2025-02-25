
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const ApolloIntegration = () => {
  const { toast } = useToast();

  const handleConnectApollo = () => {
    // Hier würde normalerweise die Apollo.io OAuth Integration stattfinden
    toast({
      title: "Apollo.io Integration",
      description: "Verbindung zu Apollo.io wird hergestellt...",
    });
    
    // Simuliere eine erfolgreiche Verbindung nach 2 Sekunden
    setTimeout(() => {
      toast({
        title: "Erfolgreich verbunden",
        description: "Die Verbindung zu Apollo.io wurde hergestellt.",
        variant: "default", // Geändert von "success" zu "default"
      });
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border p-4">
        <h3 className="text-lg font-semibold mb-4">Apollo.io Integration</h3>
        <p className="text-sm text-gray-600 mb-4">
          Connect your Apollo.io account to access your saved searches and leads.
        </p>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={handleConnectApollo}
        >
          Connect Apollo.io
        </Button>
      </div>
    </div>
  );
};
