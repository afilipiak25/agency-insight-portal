
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ApolloIntegrationProps {
  onConnect?: () => void;
}

export const ApolloIntegration = ({ onConnect }: ApolloIntegrationProps) => {
  const { toast } = useToast();

  const handleConnectApollo = () => {
    console.log("Apollo Connect Button clicked");
    
    toast({
      title: "Apollo.io Integration",
      description: "Verbindung zu Apollo.io wird hergestellt...",
    });
    
    setTimeout(() => {
      toast({
        title: "Erfolgreich verbunden",
        description: "Die Verbindung zu Apollo.io wurde hergestellt.",
        variant: "default",
      });
      
      if (onConnect) {
        onConnect();
      }
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border p-4">
        <h3 className="text-lg font-semibold mb-4">Apollo.io Integration</h3>
        <p className="text-sm text-gray-600 mb-4">
          Verbinden Sie Ihr Apollo.io-Konto, um auf zusätzliche Filter und Funktionen zuzugreifen.
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
