
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
import { ApolloIntegration } from "./ApolloIntegration";
import { useApolloFilters } from "./hooks/useApolloFilters";
import { WorkflowVisualizationBoard } from "./workflow/WorkflowVisualizationBoard";

export const CreateCampaignForm = () => {
  const [activeSection, setActiveSection] = useState<string>("targeting");
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [selectedDataSource, setSelectedDataSource] = useState<string>("");
  const [isApolloConnected, setIsApolloConnected] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    filters,
    filteredLeads,
    isLoading,
    totalResults,
    handleFilterChange,
    handleIntentChange
  } = useApolloFilters();

  const handleApolloConnect = () => {
    setIsApolloConnected(true);
    toast({
      title: "Apollo.io verbunden",
      description: "Alle Filter sind nun verfügbar",
    });
  };

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
            {selectedDataSource === "b2b" && (
              <div className="mb-6">
                <ApolloIntegration 
                  onConnect={handleApolloConnect} 
                  isConnected={isApolloConnected}
                />
              </div>
            )}
            <CompanyFields onDataSourceChange={setSelectedDataSource} />
            <JobTitleFields 
              filters={filters}
              onFilterChange={handleFilterChange}
            />
            <JobFunctionFields />
            <SectorFields />
            <AdditionalFields />
            {isApolloConnected && selectedDataSource === "b2b" && (
              <>
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4 gradient-text">Erweiterte Apollo.io Filter</h3>
                  <AdvancedTargeting 
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onIntentChange={handleIntentChange}
                  />
                </div>
              </>
            )}
          </div>
        );
      case "workflow":
        return <WorkflowSection />;
      case "resources":
        return <ResourcesSection />;
      case "preview":
        return (
          <div className="space-y-6">
            <LeadPreview 
              leads={filteredLeads}
              isLoading={isLoading}
              totalResults={totalResults}
              isApolloConnected={isApolloConnected}
              showTableView={true} 
            />
          </div>
        );
      case "visualization":
        return (
          <div className="space-y-6">
            <WorkflowVisualizationBoard leads={filteredLeads} />
          </div>
        );
      case "settings":
        return (
          <div className="relative">
            <SettingsSection />
            <div className="mt-8 flex justify-end">
              <Button 
                onClick={() => setShowPublishDialog(true)}
                className="bg-gradient-amplifa hover:opacity-90 text-white px-8 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
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
        <div className={`grid ${activeSection === "preview" || activeSection === "visualization" ? "grid-cols-1" : "grid-cols-[1fr,400px]"} gap-8`}>
          <div className="space-y-8">
            {renderContent()}
          </div>
          
          {activeSection !== "preview" && activeSection !== "visualization" && (
            <div className="sticky top-4 h-fit">
              <LeadPreview 
                showEmailPreview={activeSection === "workflow"} 
                selectedDataSource={selectedDataSource}
                position="right"
                isApolloConnected={isApolloConnected}
                leads={filteredLeads}
                isLoading={isLoading}
                totalResults={totalResults}
              />
            </div>
          )}
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
