
import { Mail } from "lucide-react";
import { TabsList, TabsTrigger, Tabs } from "../ui/tabs";
import { useState } from "react";
import { WorkflowEditor } from "./WorkflowEditor";
import { TabPanel } from "./workflow/TabPanel";

export const WorkflowSection = () => {
  const [showEditor, setShowEditor] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("steps");

  const handleStepClick = (moduleType: string) => {
    setSelectedModule(moduleType);
    setShowEditor(true);
  };

  if (showEditor && selectedModule) {
    return <WorkflowEditor initialModuleType={selectedModule} onBack={() => setShowEditor(false)} />;
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg border border-gray-100 p-6 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              Build my campaign manually <Mail className="w-4 h-4 text-blue-500" />
            </h2>
            <p className="text-sm text-gray-600 mt-1">Start by choosing your sequence's first step</p>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
            <TabsList className="bg-blue-50">
              <TabsTrigger 
                value="steps" 
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-colors"
              >
                Steps
              </TabsTrigger>
              <TabsTrigger 
                value="conditions"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-colors"
              >
                Conditions
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <TabPanel activeTab={activeTab} handleStepClick={handleStepClick} />
      </div>
    </div>
  );
};
