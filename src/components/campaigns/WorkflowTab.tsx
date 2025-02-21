import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { 
  Mail, 
  MessageSquare, 
  Mic, 
  UserPlus, 
  Eye, 
  Phone, 
  ListTodo, 
  Database,
  Share2,
  Bot,
  Library,
  Plus,
  MoreVertical
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

type WorkflowStep = {
  id: string;
  type: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

export const WorkflowTab = () => {
  const [selectedTab, setSelectedTab] = useState<"steps" | "conditions">("steps");
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([]);

  const automaticSteps: WorkflowStep[] = [
    {
      id: "email",
      type: "automatic",
      title: "Email",
      description: "Send automatic email",
      icon: <Mail className="w-5 h-5 text-green-500" />,
    },
    {
      id: "chat",
      type: "automatic",
      title: "Chat message",
      description: "Send on LinkedIn",
      icon: <MessageSquare className="w-5 h-5 text-blue-500" />,
    },
    {
      id: "voice",
      type: "automatic",
      title: "Voice message",
      description: "Send on LinkedIn",
      icon: <Mic className="w-5 h-5 text-indigo-500" />,
    },
    {
      id: "invitation",
      type: "automatic",
      title: "Invitation",
      description: "Send on LinkedIn",
      icon: <UserPlus className="w-5 h-5 text-violet-500" />,
    },
    {
      id: "visit",
      type: "automatic",
      title: "Visit profile",
      description: "Visit profile",
      icon: <Eye className="w-5 h-5 text-sky-500" />,
    },
  ];

  const manualSteps: WorkflowStep[] = [
    {
      id: "call",
      type: "manual",
      title: "Call",
      description: "Create a task",
      icon: <Phone className="w-5 h-5 text-rose-500" />,
    },
    {
      id: "task",
      type: "manual",
      title: "Manual task",
      description: "Create a task",
      icon: <ListTodo className="w-5 h-5 text-orange-500" />,
    },
  ];

  const otherSteps: WorkflowStep[] = [
    {
      id: "api",
      type: "other",
      title: "Call an API",
      description: "Call an API",
      icon: <Database className="w-5 h-5 text-blue-500" />,
    },
    {
      id: "campaign",
      type: "other",
      title: "Send to another campaign",
      description: "Transfer to campaign",
      icon: <Share2 className="w-5 h-5 text-purple-500" />,
    },
  ];

  const handleAddStep = (step: WorkflowStep) => {
    setWorkflowSteps([...workflowSteps, step]);
    setActiveStep(null);
  };

  return (
    <TabsContent value="workflow" className="space-y-8 py-4">
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold flex items-center gap-2">
              Build my campaign manually
              <Badge variant="outline" className="bg-blue-50">
                <Share2 className="w-4 h-4 mr-1" />
                Flow
              </Badge>
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Start by choosing your sequence's first step
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={selectedTab === "steps" ? "default" : "outline"}
              onClick={() => setSelectedTab("steps")}
              className="font-medium"
            >
              Steps
            </Button>
            <Button
              variant={selectedTab === "conditions" ? "default" : "outline"}
              onClick={() => setSelectedTab("conditions")}
              className="font-medium"
            >
              Conditions
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          <div className="flex-1 space-y-4">
            {workflowSteps.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <p className="text-gray-500">Click the + button to add your first step</p>
              </div>
            ) : (
              <div className="space-y-4">
                {workflowSteps.map((step, index) => (
                  <div key={`${step.id}-${index}`} className="relative">
                    <div className="absolute left-1/2 -translate-x-1/2 -top-4 h-4 w-px bg-gray-200" />
                    <Card className="relative border border-violet-200 shadow-sm hover:shadow-md transition-all">
                      <div className="p-4 flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-gray-50 rounded-lg">
                            {step.icon}
                          </div>
                          <div>
                            <div className="font-medium">{step.title}</div>
                            <div className="text-sm text-gray-500">{step.description}</div>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="shrink-0">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="absolute left-1/2 -translate-x-1/2 -bottom-6 z-10 rounded-full w-8 h-8 shadow-sm border-violet-200 hover:border-violet-300 hover:bg-violet-50"
                      onClick={() => setActiveStep(index.toString())}
                    >
                      <Plus className="w-4 h-4 text-violet-600" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {(workflowSteps.length === 0 || activeStep !== null) && (
              <div className="space-y-8 mt-8 animate-fade-in">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-4">Automatic Steps</h3>
                  <div className="grid grid-cols-4 gap-4">
                    {automaticSteps.map((step) => (
                      <Card 
                        key={step.id}
                        className="p-4 cursor-pointer hover:border-violet-200 hover:shadow-md transition-all group"
                        onClick={() => handleAddStep(step)}
                      >
                        <div className="space-y-3">
                          <div className="p-2 bg-gray-50 rounded-lg w-fit group-hover:scale-110 transition-transform">
                            {step.icon}
                          </div>
                          <div>
                            <div className="font-medium">{step.title}</div>
                            <div className="text-sm text-gray-500">{step.description}</div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-4">Manual execution</h3>
                  <div className="grid grid-cols-4 gap-4">
                    {manualSteps.map((step) => (
                      <Card 
                        key={step.id}
                        className="p-4 cursor-pointer hover:border-violet-200 hover:shadow-md transition-all group"
                        onClick={() => handleAddStep(step)}
                      >
                        <div className="space-y-3">
                          <div className="p-2 bg-gray-50 rounded-lg w-fit group-hover:scale-110 transition-transform">
                            {step.icon}
                          </div>
                          <div>
                            <div className="font-medium">{step.title}</div>
                            <div className="text-sm text-gray-500">{step.description}</div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-4">Other steps</h3>
                  <div className="grid grid-cols-4 gap-4">
                    {otherSteps.map((step) => (
                      <Card 
                        key={step.id}
                        className="p-4 cursor-pointer hover:border-violet-200 hover:shadow-md transition-all group"
                        onClick={() => handleAddStep(step)}
                      >
                        <div className="space-y-3">
                          <div className="p-2 bg-gray-50 rounded-lg w-fit group-hover:scale-110 transition-transform">
                            {step.icon}
                          </div>
                          <div>
                            <div className="font-medium">{step.title}</div>
                            <div className="text-sm text-gray-500">{step.description}</div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="w-80 shrink-0">
            <Card className="p-6">
              <div className="flex gap-4 items-start mb-6">
                <div className="p-3 bg-violet-50 rounded-xl">
                  <Bot className="w-6 h-6 text-violet-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Create with AI</h4>
                  <p className="text-gray-500">Let AI generate your multichannel campaigns</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 bg-blue-50 rounded-xl">
                  <Library className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Templates</h4>
                  <p className="text-gray-500">Use a template to create your campaign</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </TabsContent>
  );
};
