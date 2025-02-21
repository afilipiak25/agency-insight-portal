import { Mail, MessageSquare, Mic, UserPlus, Eye, List, Code, Send, Brain, LayoutTemplate, PhoneCall, Link, Calendar } from "lucide-react";
import { Button } from "../ui/button";
import { TabsList, TabsTrigger, Tabs } from "../ui/tabs";
import { useState } from "react";
import { WorkflowEditor } from "./WorkflowEditor";

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

  const renderAutomaticSteps = () => (
    <div className="animate-fade-in">
      <h3 className="text-sm font-medium text-gray-600 mb-4">Automatic Steps</h3>
      <div className="grid grid-cols-4 gap-4">
        <Button 
          variant="outline" 
          className="h-auto p-4 flex flex-col items-center gap-2 bg-green-50/80 border-green-100 hover:bg-green-100 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
          onClick={() => handleStepClick("Email")}
        >
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <Mail className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-center">
            <div className="font-medium text-gray-900">Email</div>
            <div className="text-xs text-gray-500">Send automatic email</div>
          </div>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto p-4 flex flex-col items-center gap-2 bg-blue-50/80 border-blue-100 hover:bg-blue-100 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
          onClick={() => handleStepClick("Chat message")}
        >
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-center">
            <div className="font-medium text-gray-900">Chat message</div>
            <div className="text-xs text-gray-500">Send on LinkedIn</div>
          </div>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto p-4 flex flex-col items-center gap-2 bg-violet-50/80 border-violet-100 hover:bg-violet-100 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
          onClick={() => handleStepClick("Voice message")}
        >
          <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">
            <Mic className="w-5 h-5 text-violet-600" />
          </div>
          <div className="text-center">
            <div className="font-medium text-gray-900">Voice message</div>
            <div className="text-xs text-gray-500">Send on LinkedIn</div>
          </div>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto p-4 flex flex-col items-center gap-2 bg-indigo-50/80 border-indigo-100 hover:bg-indigo-100 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
          onClick={() => handleStepClick("Invitation")}
        >
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
            <UserPlus className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="text-center">
            <div className="font-medium text-gray-900">Invitation</div>
            <div className="text-xs text-gray-500">Send on LinkedIn</div>
          </div>
        </Button>
      </div>
    </div>
  );

  const renderManualSteps = () => (
    <div className="animate-fade-in animation-delay-150">
      <h3 className="text-sm font-medium text-gray-600 mb-4">Manual execution</h3>
      <div className="grid grid-cols-4 gap-4">
        <Button 
          variant="outline" 
          className="h-auto p-4 flex flex-col items-center gap-2 bg-red-50/80 border-red-100 hover:bg-red-100 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
          onClick={() => handleStepClick("Call")}
        >
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <PhoneCall className="w-5 h-5 text-red-600" />
          </div>
          <div className="text-center">
            <div className="font-medium text-gray-900">Call</div>
            <div className="text-xs text-gray-500">Create a task</div>
          </div>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto p-4 flex flex-col items-center gap-2 bg-orange-50/80 border-orange-100 hover:bg-orange-100 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
          onClick={() => handleStepClick("Manual task")}
        >
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
            <List className="w-5 h-5 text-orange-600" />
          </div>
          <div className="text-center">
            <div className="font-medium text-gray-900">Manual task</div>
            <div className="text-xs text-gray-500">Create a task</div>
          </div>
        </Button>
      </div>
    </div>
  );

  const renderOtherSteps = () => (
    <div className="animate-fade-in animation-delay-300">
      <h3 className="text-sm font-medium text-gray-600 mb-4">Other steps</h3>
      <div className="grid grid-cols-4 gap-4">
        <Button 
          variant="outline" 
          className="h-auto p-4 flex flex-col items-center gap-2 bg-cyan-50/80 border-cyan-100 hover:bg-cyan-100 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
          onClick={() => handleStepClick("Call API")}
        >
          <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center">
            <Code className="w-5 h-5 text-cyan-600" />
          </div>
          <div className="text-center">
            <div className="font-medium text-gray-900">Call an API</div>
            <div className="text-xs text-gray-500">Call an API</div>
          </div>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto p-4 flex flex-col items-center gap-2 bg-gray-50/80 border-gray-100 hover:bg-gray-100 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
          onClick={() => handleStepClick("Send to campaign")}
        >
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <Send className="w-5 h-5 text-gray-600" />
          </div>
          <div className="text-center">
            <div className="font-medium text-gray-900">Send to another campaign</div>
            <div className="text-xs text-gray-500">Transfer to campaign</div>
          </div>
        </Button>
      </div>
    </div>
  );

  const renderConditions = () => (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-4">Lead information</h3>
        <div className="grid grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2 bg-blue-50/80 border-blue-100 hover:bg-blue-100 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
            onClick={() => handleStepClick("Has email")}
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-center">
              <div className="font-medium text-gray-900">Has email address</div>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2 bg-indigo-50/80 border-indigo-100 hover:bg-indigo-100 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
            onClick={() => handleStepClick("Has LinkedIn URL")}
          >
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <Link className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="text-center">
              <div className="font-medium text-gray-900">Has LinkedIn URL</div>
              <div className="text-xs text-gray-500">LinkedIn</div>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2 bg-violet-50/80 border-violet-100 hover:bg-violet-100 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
            onClick={() => handleStepClick("Has phone")}
          >
            <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">
              <PhoneCall className="w-5 h-5 text-violet-600" />
            </div>
            <div className="text-center">
              <div className="font-medium text-gray-900">Has phone number</div>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2 bg-cyan-50/80 border-cyan-100 hover:bg-cyan-100 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
            onClick={() => handleStepClick("Custom condition")}
          >
            <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center">
              <Code className="w-5 h-5 text-cyan-600" />
            </div>
            <div className="text-center">
              <div className="font-medium text-gray-900">Custom condition</div>
            </div>
          </Button>
        </div>
      </div>

      <div className="animate-fade-in animation-delay-150">
        <h3 className="text-sm font-medium text-gray-600 mb-4">Lead actions</h3>
        <div className="grid grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2 bg-blue-50/80 border-blue-100 hover:bg-blue-100 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
            onClick={() => handleStepClick("Opened email")}
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-center">
              <div className="font-medium text-gray-900">Opened email</div>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2 bg-indigo-50/80 border-indigo-100 hover:bg-indigo-100 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
            onClick={() => handleStepClick("Clicked link")}
          >
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <Link className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="text-center">
              <div className="font-medium text-gray-900">Clicked on link in email</div>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2 bg-red-50/80 border-red-100 hover:bg-red-100 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
            onClick={() => handleStepClick("Unsubscribe")}
          >
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-red-600" />
            </div>
            <div className="text-center">
              <div className="font-medium text-gray-900">Unsubscribe from email</div>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2 bg-green-50/80 border-green-100 hover:bg-green-100 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
            onClick={() => handleStepClick("Booked meeting")}
          >
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-center">
              <div className="font-medium text-gray-900">Booked a meeting</div>
              <div className="text-xs text-gray-500">lemcal</div>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2 bg-blue-50/80 border-blue-100 hover:bg-blue-100 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
            onClick={() => handleStepClick("Accepted invite")}
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Link className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-center">
              <div className="font-medium text-gray-900">Accepted invite</div>
              <div className="text-xs text-gray-500">LinkedIn</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );

  const renderModules = () => {
    if (activeTab === "steps") {
      return (
        <>
          {renderAutomaticSteps()}
          {renderManualSteps()}
          {renderOtherSteps()}
        </>
      );
    }
    return renderConditions();
  };

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

        {renderModules()}

        <div className="border-t pt-6 mt-8 animate-fade-in animation-delay-300">
          <h3 className="text-base font-medium text-gray-700 mb-4">Or choose another methods</h3>
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="h-auto p-4 flex items-center gap-4 hover:bg-purple-50/80 transition-colors group"
            >
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Create with AI</div>
                <div className="text-sm text-gray-500">Let AI generate your multichannel campaigns</div>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto p-4 flex items-center gap-4 hover:bg-blue-50/80 transition-colors group"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
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
