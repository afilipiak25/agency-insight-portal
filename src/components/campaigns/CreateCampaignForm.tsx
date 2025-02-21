
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AudienceHeader } from "./AudienceHeader";
import { LocationFields } from "./LocationFields";
import { JobTitleFields } from "./JobTitleFields";
import { CompanyFields } from "./CompanyFields";
import { JobFunctionFields } from "./JobFunctionFields";
import { SectorFields } from "./SectorFields";
import { PreviewSection } from "./PreviewSection";
import { AdvancedTargeting } from "./AdvancedTargeting";
import { AdditionalFields } from "./AdditionalFields";
import { useState } from "react";

export const CreateCampaignForm = () => {
  const [activeSection, setActiveSection] = useState<string>("targeting");

  const renderProgressBar = () => {
    const steps = ["targeting", "pitch", "outreach", "workflow", "settings"];
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

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="mb-8 flex justify-between items-start gap-8">
          <div className="space-y-6 flex-1">
            <div className="space-y-8 transition-all duration-300 hover:translate-y-[-2px]">
              <CompanyFields />
              <LocationFields />
              <JobTitleFields />
              <JobFunctionFields />
              <SectorFields />
              <AdditionalFields />
              <AdvancedTargeting />
            </div>

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

          <div className="space-y-6 w-96 sticky top-8">
            <AudienceHeader />
            <PreviewSection />
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
              <TabsList className="w-full border-b justify-center mb-8 bg-transparent p-0 h-auto">
                <TabsTrigger
                  value="targeting"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-violet-600 rounded-none px-8 py-4 transition-all hover:bg-violet-50"
                >
                  1. Targeting
                </TabsTrigger>
                <TabsTrigger
                  value="pitch"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-violet-600 rounded-none px-8 py-4 transition-all hover:bg-violet-50"
                >
                  2. Pitch
                </TabsTrigger>
                <TabsTrigger
                  value="outreach"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-violet-600 rounded-none px-8 py-4 transition-all hover:bg-violet-50"
                >
                  3. Outreach
                </TabsTrigger>
                <TabsTrigger
                  value="workflow"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-violet-600 rounded-none px-8 py-4 transition-all hover:bg-violet-50"
                >
                  4. Workflow
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
    </div>
  );
};
