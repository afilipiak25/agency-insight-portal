
import { Layout } from "@/components/Layout";
import { CreateCampaignForm } from "@/components/campaigns/CreateCampaignForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateCampaign = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Button
              variant="ghost"
              className="mb-4"
              onClick={() => navigate("/campaigns")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zurück zu Kampagnen
            </Button>
            <h1 className="text-3xl font-bold text-dashboard-primary">
              Neue Kampagne erstellen
            </h1>
          </div>
          
          <CreateCampaignForm />
        </div>
      </div>
    </Layout>
  );
};

export default CreateCampaign;
