
import { Layout } from "@/components/Layout";
import { CreateCampaignForm } from "@/components/campaigns/CreateCampaignForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

const CreateCampaign = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="p-8 bg-gradient-to-br from-violet-50 to-white min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <Button
              variant="ghost"
              className="mb-4 hover:bg-violet-100 transition-colors"
              onClick={() => navigate("/campaigns")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Campaigns
            </Button>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-violet-400 bg-clip-text text-transparent">
              Create New Campaign
            </h1>
            <p className="text-gray-600 mt-2">
              Set up your campaign targeting and reach your ideal audience
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg border border-violet-100 animate-fade-in animation-delay-150">
            <CreateCampaignForm />
          </div>
        </div>
      </div>
      <Toaster />
    </Layout>
  );
};

export default CreateCampaign;
