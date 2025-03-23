
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CampaignStepsNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const CampaignStepsNavigation = ({
  activeSection,
  onSectionChange,
}: CampaignStepsNavigationProps) => {
  const renderProgressBar = () => {
    const steps = ["targeting", "workflow", "resources", "preview", "settings"];
    const currentIndex = steps.indexOf(activeSection);
    const progress = ((currentIndex + 1) / steps.length) * 100;

    return (
      <div className="h-1 bg-violet-100 rounded-full w-full mb-8">
        <div 
          className="h-full bg-gradient-amplifa rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      {renderProgressBar()}
      <Tabs 
        value={activeSection} 
        onValueChange={onSectionChange}
        className="w-full"
      >
        <TabsList className="w-full justify-center mb-8 bg-transparent p-0 h-auto gap-2">
          <TabsTrigger
            value="targeting"
            className="data-[state=active]:bg-gradient-amplifa data-[state=active]:text-white rounded-md px-8 py-4 transition-all duration-300 data-[state=active]:shadow-md hover:bg-violet-50 hover:-translate-y-0.5"
          >
            1. Targeting
          </TabsTrigger>
          <TabsTrigger
            value="workflow"
            className="data-[state=active]:bg-gradient-amplifa data-[state=active]:text-white rounded-md px-8 py-4 transition-all duration-300 data-[state=active]:shadow-md hover:bg-violet-50 hover:-translate-y-0.5"
          >
            2. Workflow
          </TabsTrigger>
          <TabsTrigger
            value="resources"
            className="data-[state=active]:bg-gradient-amplifa data-[state=active]:text-white rounded-md px-8 py-4 transition-all duration-300 data-[state=active]:shadow-md hover:bg-violet-50 hover:-translate-y-0.5"
          >
            3. Resources
          </TabsTrigger>
          <TabsTrigger
            value="preview"
            className="data-[state=active]:bg-gradient-amplifa data-[state=active]:text-white rounded-md px-8 py-4 transition-all duration-300 data-[state=active]:shadow-md hover:bg-violet-50 hover:-translate-y-0.5"
          >
            4. Preview
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="data-[state=active]:bg-gradient-amplifa data-[state=active]:text-white rounded-md px-8 py-4 transition-all duration-300 data-[state=active]:shadow-md hover:bg-violet-50 hover:-translate-y-0.5"
          >
            5. Settings
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
