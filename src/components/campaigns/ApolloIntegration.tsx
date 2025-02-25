
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Link2 } from "lucide-react";

interface ApolloIntegrationProps {
  onConnect?: () => void;
  isConnected?: boolean;
}

export const ApolloIntegration = ({ onConnect, isConnected }: ApolloIntegrationProps) => {
  const { toast } = useToast();

  const handleConnectApollo = () => {
    if (isConnected) return;
    
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

  if (isConnected) {
    return (
      <div className="space-y-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Apollo.io Integration</h3>
            <span className="text-sm text-green-600 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Verbunden
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Apollo.io ist erfolgreich verbunden. Sie können nun alle erweiterten Filter nutzen.
          </p>
          <Button 
            variant="outline" 
            className="w-full gap-2 text-green-600 border-green-600/20 bg-green-50 hover:bg-green-100"
            disabled
          >
            <CheckCircle2 className="w-4 h-4" />
            Aktive Verbindung
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border p-4">
        <h3 className="text-lg font-semibold mb-4">Apollo.io Integration</h3>
        <p className="text-sm text-gray-600 mb-4">
          Verbinden Sie Ihr Apollo.io-Konto, um auf zusätzliche Filter und Funktionen zuzugreifen.
        </p>
        <Button 
          variant="outline" 
          className="w-full gap-2"
          onClick={handleConnectApollo}
        >
          <Link2 className="w-4 h-4" />
          Connect Apollo.io
        </Button>
      </div>
    </div>
  );
};
