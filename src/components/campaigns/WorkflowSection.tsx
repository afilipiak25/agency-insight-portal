
import { Mail, MessageSquare, Mic, UserPlus, Eye, List, Code, Send, Brain, LayoutTemplate, PhoneCall } from "lucide-react";
import { Button } from "../ui/button";
import { TabsList, TabsTrigger, Tabs } from "../ui/tabs";
import { useState } from "react";
import { WorkflowEditor } from "./WorkflowEditor";

export const WorkflowSection = () => {
  const [showEditor, setShowEditor] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const handleStepClick = (moduleType: string) => () => {
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
          <Tabs defaultValue="steps" className="w-auto">
            <TabsList className="bg-blue-50">
              <TabsTrigger 
                value="steps" 
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                Steps
              </TabsTrigger>
              <TabsTrigger 
                value="conditions"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                Conditions
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-4">Automatic Steps</h3>
          <div className="grid grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center gap-2 bg-green-50 border-green-100 hover:bg-green-100"
              onClick={handleStepClick("Email")}
            >
              <Mail className="w-5 h-5 text-green-600" />
              <div className="text-center">
                <div className="font-medium text-gray-900">Email</div>
                <div className="text-xs text-gray-500">Send automatic email</div>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center gap-2"
              onClick={handleStepClick("Chat message")}
            >
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <div className="text-center">
                <div className="font-medium text-gray-900">Chat message</div>
                <div className="text-xs text-gray-500">Send on LinkedIn</div>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center gap-2"
              onClick={handleStepClick("Voice message")}
            >
              <Mic className="w-5 h-5 text-blue-600" />
              <div className="text-center">
                <div className="font-medium text-gray-900">Voice message</div>
                <div className="text-xs text-gray-500">Send on LinkedIn</div>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center gap-2"
              onClick={handleStepClick("Invitation")}
            >
              <UserPlus className="w-5 h-5 text-blue-600" />
              <div className="text-center">
                <div className="font-medium text-gray-900">Invitation</div>
                <div className="text-xs text-gray-500">Send on LinkedIn</div>
              </div>
            </Button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-4">Manual execution</h3>
          <div className="grid grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center gap-2 bg-red-50 border-red-100 hover:bg-red-100"
              onClick={handleStepClick("Call")}
            >
              <PhoneCall className="w-5 h-5 text-red-600" />
              <div className="text-center">
                <div className="font-medium text-gray-900">Call</div>
                <div className="text-xs text-gray-500">Create a task</div>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center gap-2 bg-red-50 border-red-100 hover:bg-red-100"
              onClick={handleStepClick("Manual task")}
            >
              <List className="w-5 h-5 text-red-600" />
              <div className="text-center">
                <div className="font-medium text-gray-900">Manual task</div>
                <div className="text-xs text-gray-500">Create a task</div>
              </div>
            </Button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-4">Other steps</h3>
          <div className="grid grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center gap-2"
              onClick={handleStepClick("Call API")}
            >
              <Code className="w-5 h-5 text-blue-600" />
              <div className="text-center">
                <div className="font-medium text-gray-900">Call an API</div>
                <div className="text-xs text-gray-500">Call an API</div>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center gap-2"
              onClick={handleStepClick("Send to campaign")}
            >
              <Send className="w-5 h-5 text-gray-600" />
              <div className="text-center">
                <div className="font-medium text-gray-900">Send to another campaign</div>
                <div className="text-xs text-gray-500">Transfer to campaign</div>
              </div>
            </Button>
          </div>
        </div>

        <div className="border-t pt-6 mt-8">
          <h3 className="text-base font-medium text-gray-700 mb-4">Or choose another methods</h3>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Create with AI</div>
                <div className="text-sm text-gray-500">Let AI generate your multichannel campaigns</div>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <LayoutTemplate className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Templates library</div>
                <div className="text-sm text-gray-500">Use a template to create your campaign</div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
