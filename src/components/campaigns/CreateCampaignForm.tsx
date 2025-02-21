
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AudienceHeader } from "./AudienceHeader";
import { LocationFields } from "./LocationFields";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export const CreateCampaignForm = () => {
  const [activeSection, setActiveSection] = useState<string>("targeting");
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const [campaignName, setCampaignName] = useState("");
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

    // Hier würde die Logik zum Speichern der Kampagne implementiert werden

    toast({
      title: "Kampagne erstellt",
      description: `Die Kampagne "${campaignName}" wurde erfolgreich erstellt.`,
    });
    navigate("/campaigns");
  };

  const renderProgressBar = () => {
    const steps = ["targeting", "workflow", "resources", "preview", "settings"];
    const currentIndex = steps.indexOf(activeSection);
    const progress = ((currentIndex + 1) / steps.length) * 100;

    return (
      <div className="h-1 bg-violet-100 rounded-full w-full mb-8">
        <div 
          className="h-full bg-violet-600 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  };

  const renderPreview = () => {
    if (activeSection === "workflow") {
      return <PreviewSection />;
    }
    return (
      <div className="bg-white rounded-lg border p-4 space-y-4">
        <div className="space-y-1">
          <h2 className="font-semibold text-lg">Preview Leads</h2>
          <p className="text-sm text-violet-600 font-medium">54,632 leads total</p>
        </div>
        
        <div className="space-y-3">
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Marc Nagel</span>
              <span className="text-xs text-gray-500">CEO</span>
            </div>
            <div className="text-xs text-gray-500">Acme GmbH • Berlin, Germany</div>
          </div>
          
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Sarah Weber</span>
              <span className="text-xs text-gray-500">Marketing Director</span>
            </div>
            <div className="text-xs text-gray-500">TechCorp • Munich, Germany</div>
          </div>
          
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Thomas Müller</span>
              <span className="text-xs text-gray-500">Head of Sales</span>
            </div>
            <div className="text-xs text-gray-500">Digital Solutions • Hamburg, Germany</div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case "targeting":
        return (
          <div className="space-y-8 transition-all duration-300 hover:translate-y-[-2px]">
            <CompanyFields />
            <LocationFields />
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
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="space-y-6 flex-1 w-full">
            {renderContent()}

            <div className="flex gap-4 mt-8">
              <Button variant="outline" className="gap-2 hover:bg-violet-50">
                <Upload className="w-4 h-4" />
                Upload CSV
              </Button>
              <Button 
                variant="secondary" 
                className="bg-violet-100 text-violet-700 hover:bg-violet-200 transition-colors"
              >
                Generate Sample Email
              </Button>
            </div>
          </div>

          <div className="space-y-6 w-full md:w-96 sticky top-8">
            <AudienceHeader />
            {renderPreview()}
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="max-w-2xl mx-auto">
            {renderProgressBar()}
            <Tabs 
              value={activeSection} 
              onValueChange={setActiveSection}
              className="w-full"
            >
              <TabsList className="w-full justify-center mb-8 bg-transparent p-0 h-auto">
                <TabsTrigger
                  value="targeting"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-violet-600 rounded-none px-8 py-4 transition-all hover:bg-violet-50"
                >
                  1. Targeting
                </TabsTrigger>
                <TabsTrigger
                  value="workflow"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-violet-600 rounded-none px-8 py-4 transition-all hover:bg-violet-50"
                >
                  2. Workflow
                </TabsTrigger>
                <TabsTrigger
                  value="resources"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-violet-600 rounded-none px-8 py-4 transition-all hover:bg-violet-50"
                >
                  3. Resources
                </TabsTrigger>
                <TabsTrigger
                  value="preview"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-violet-600 rounded-none px-8 py-4 transition-all hover:bg-violet-50"
                >
                  4. Preview
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-violet-600 rounded-none px-8 py-4 transition-all hover:bg-violet-50"
                >
                  5. Settings
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      <Dialog open={showPublishDialog} onOpenChange={setShowPublishDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kampagne veröffentlichen</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <label className="text-sm font-medium mb-2 block">
              Kampagnenname
            </label>
            <Input
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              placeholder="z.B. Q2 Sales Campaign 2024"
              className="w-full"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPublishDialog(false)}
            >
              Abbrechen
            </Button>
            <Button
              onClick={handlePublish}
              className="bg-violet-600 hover:bg-violet-700 text-white"
            >
              Veröffentlichen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
