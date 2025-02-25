
import { Button } from "@/components/ui/button";
import { AudienceHeader } from "./AudienceHeader";
import { JobTitleFields } from "./JobTitleFields";
import { CompanyFields } from "./CompanyFields";
import { JobFunctionFields } from "./JobFunctionFields";
import { SectorFields } from "./SectorFields";
import { PreviewSection } from "./PreviewSection";
import { AdvancedTargeting } from "./AdvancedTargeting";
import { AdditionalFields } from "./AdditionalFields";
import { WorkflowSection } from "./WorkflowSection";
import { ResourcesSection } from "./ResourcesSection";
import { WorkflowPreview } from "./WorkflowPreview";
import { SettingsSection } from "./SettingsSection";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { PublishCampaignDialog } from "./PublishCampaignDialog";
import { CampaignStepsNavigation } from "./CampaignStepsNavigation";
import { LeadPreview } from "./LeadPreview";

export const CreateCampaignForm = () => {
  const [activeSection, setActiveSection] = useState<string>("targeting");
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [selectedDataSource, setSelectedDataSource] = useState<string>("");

  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePublish = () => {
    if (!campaignName.trim()) {
      toast({
        title: "Kampagnenname erforderlich",
        description: "Bitte geben Sie einen Namen für die Kampagne ein.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Kampagne erstellt",
      description: `Die Kampagne "${campaignName}" wurde erfolgreich erstellt.`,
    });
    navigate("/campaigns");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "targeting":
        return (
          <div className="space-y-8 transition-all duration-300 hover:translate-y-[-2px]">
            <CompanyFields onDataSourceChange={setSelectedDataSource} />
            <JobTitleFields />
            <JobFunctionFields />
            <SectorFields />
            <AdditionalFields />
            <AdvancedTargeting />
          </div>
        );
      case "workflow":
        return <WorkflowSection />;
      case "resources":
        return <ResourcesSection />;
      case "preview":
        return <WorkflowPreview />;
      case "settings":
        return (
          <div className="relative">
            <SettingsSection />
            <div className="mt-8 flex justify-end">
              <Button 
                onClick={() => setShowPublishDialog(true)}
                className="bg-violet-600 hover:bg-violet-700 text-white px-8"
              >
                Kampagne veröffentlichen
              </Button>
            </div>
          </div>
        );
      default:
        return <div>Content for {activeSection}</div>;
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-8">
          <div className="flex-1 space-y-8">
            {renderContent()}
          </div>
          
          <div className="w-[400px] sticky top-4 h-fit">
            <LeadPreview 
              showEmailPreview={activeSection === "workflow"} 
              selectedDataSource={selectedDataSource}
              position="right"
            />
          </div>
        </div>

        <div className="border-t mt-8 pt-6">
          <CampaignStepsNavigation 
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>
      </div>

      <PublishCampaignDialog
        open={showPublishDialog}
        onOpenChange={setShowPublishDialog}
        campaignName={campaignName}
        onCampaignNameChange={setCampaignName}
        onPublish={handlePublish}
      />
    </div>
  );
};
