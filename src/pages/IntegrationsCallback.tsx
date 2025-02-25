
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const IntegrationsCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const error = urlParams.get("error");
      
      if (error) {
        toast({
          title: "Verbindung fehlgeschlagen",
          description: "Die LinkedIn-Verbindung konnte nicht hergestellt werden.",
          variant: "destructive",
        });
        navigate("/integrations");
        return;
      }

      if (code) {
        try {
          // Hier würde normalerweise der Code gegen ein Access Token ausgetauscht werden
          toast({
            title: "Erfolgreich verbunden",
            description: "Die LinkedIn-Integration wurde erfolgreich eingerichtet.",
          });
        } catch (error) {
          console.error("OAuth callback error:", error);
          toast({
            title: "Fehler bei der Verbindung",
            description: "Bitte versuchen Sie es später erneut.",
            variant: "destructive",
          });
        }
      }

      // Zurück zur Integrationsseite
      navigate("/integrations");
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">Verbindung wird hergestellt...</h1>
        <p className="text-gray-600">Bitte warten Sie einen Moment.</p>
      </div>
    </div>
  );
};

export default IntegrationsCallback;
