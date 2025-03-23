
import { Mail, UserPlus, Eye, MessageSquare, Instagram, Plus, Minus, AlertCircle, Type, FileText, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface WorkflowStep {
  id: number;
  type: string;
  icon: JSX.Element;
  sequenceNum: number;
  title: string;
  content: string;
  waitDays: number;
  status?: 'completed' | 'in-progress' | 'not-met' | 'missing-inputs';
  personalized?: boolean;
}

export const WorkflowPreview = () => {
  const [selectedStepId, setSelectedStepId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [steps, setSteps] = useState<WorkflowStep[]>([
    {
      id: 1,
      sequenceNum: 1,
      type: "email",
      icon: <Mail className="w-5 h-5 text-purple-500" />,
      title: "Mail 1",
      content: "<p>Hey Sandra Franziska,</p> <p>ich habe deine beeindruckende Erfahrung im Bereich Marketing gesehen...</p>",
      waitDays: 3,
      personalized: true,
    },
    {
      id: 2,
      sequenceNum: 1,
      type: "personalized",
      icon: <Type className="w-5 h-5 text-gray-600" />,
      title: "Personalized Outreach",
      content: "<p>Hey Sandra Franziska,</p> <p>ich würde mich gerne über deine Erfahrungen im Bereich...</p>",
      waitDays: 0,
    },
    {
      id: 3,
      sequenceNum: 1,
      type: "email",
      icon: <Mail className="w-5 h-5 text-purple-500" />,
      title: "Follow-Up Email",
      content: "<p>Hey Sandra Franziska,</p> <p>ich wollte nur kurz nachfragen, ob du meine letzte Nachricht erhalten hast...</p>",
      waitDays: 5,
      status: 'in-progress',
    },
    {
      id: 4,
      sequenceNum: 1,
      type: "personalized",
      icon: <Type className="w-5 h-5 text-gray-600" />,
      title: "Follow-Up Email Format",
      content: "<p>Hey Sandra Franziska,</p> <p>ich hoffe, es geht dir gut. Bezüglich meiner letzten Nachricht...</p>",
      waitDays: 0,
    },
    {
      id: 5,
      sequenceNum: 2,
      type: "email",
      icon: <Mail className="w-5 h-5 text-purple-500" />,
      title: "Follow up 2",
      content: "<p>Hey Sandra Franziska,</p> <p>ich wollte mich ein letztes Mal melden...</p>",
      waitDays: 7,
      status: 'not-met',
    },
    {
      id: 6,
      sequenceNum: 1,
      type: "ai",
      icon: <FileText className="w-5 h-5 text-green-600" />,
      title: "Use AI html Email",
      content: "<p>Hey Sandra Franziska,</p> <p>basierend auf Deinem Profil habe ich...</p>",
      waitDays: 0,
    },
  ]);

  const updateWaitDays = (stepId: number, increment: boolean) => {
    setSteps(prevSteps => prevSteps.map(step => {
      if (step.id === stepId) {
        const newWaitDays = increment 
          ? Math.min(step.waitDays + 1, 30) 
          : Math.max(step.waitDays - 1, 0);
        return { ...step, waitDays: newWaitDays };
      }
      return step;
    }));
  };

  const addNewStep = () => {
    const newId = Math.max(...steps.map(s => s.id)) + 1;
    const newStep: WorkflowStep = {
      id: newId,
      sequenceNum: 1,
      type: "email",
      icon: <Mail className="w-5 h-5 text-purple-500" />,
      title: `New Step ${newId}`,
      content: "<p>Hey [Name],</p> <p>ich möchte...</p>",
      waitDays: 3,
    };
    setSteps([...steps, newStep]);
  };

  const openStepDialog = (stepId: number) => {
    setSelectedStepId(stepId);
    setOpenDialog(true);
  };

  const getStatusIndicator = (status?: string) => {
    if (!status) return null;
    
    switch (status) {
      case 'not-met':
        return (
          <div className="text-xs text-gray-500 py-1 px-2 bg-gray-100 rounded-md flex items-center gap-1">
            <AlertCircle className="w-3 h-3 text-gray-500" />
            Run condition not met
          </div>
        );
      case 'missing-inputs':
        return (
          <div className="text-xs text-gray-500 py-1 px-2 bg-gray-100 rounded-md flex items-center gap-1">
            <AlertCircle className="w-3 h-3 text-yellow-500" />
            Some inputs missing
          </div>
        );
      case 'in-progress':
        return (
          <div className="text-xs text-green-600 py-1 px-2 bg-green-50 rounded-md flex items-center gap-1">
            <Play className="w-3 h-3 text-green-600" />
            Running
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm p-4 space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">Workflow Preview</h2>
        <Button 
          onClick={addNewStep}
          className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Step
        </Button>
      </div>

      <ScrollArea className="w-full overflow-x-auto pb-4">
        <div className="flex gap-4" style={{ minWidth: "max-content" }}>
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className="w-64 border rounded-lg p-4 cursor-pointer hover:border-purple-300 transition-colors"
              onClick={() => openStepDialog(step.id)}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step.type === 'email' ? 'bg-purple-100' : step.type === 'ai' ? 'bg-green-100' : 'bg-gray-100'}`}>
                  {step.icon}
                </div>
                <div className="flex items-center gap-1">
                  <span className={`font-medium ${step.type === 'email' ? 'text-purple-600' : step.type === 'ai' ? 'text-green-600' : 'text-gray-800'}`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className="text-xs text-gray-500 flex items-center gap-1 ml-2">
                      <span>{step.waitDays}d</span>
                    </div>
                  )}
                </div>
                {step.personalized && (
                  <span className="ml-auto text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">
                    Personalized
                  </span>
                )}
              </div>
              
              <div 
                className="text-sm text-gray-600 line-clamp-3 min-h-[60px] border-b pb-2"
                dangerouslySetInnerHTML={{ __html: step.content }}
              />
              
              {getStatusIndicator(step.status)}
              
              <div className="mt-4 flex justify-end gap-2">
                {index < steps.length - 1 && (
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    Wait:
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={(e) => { e.stopPropagation(); updateWaitDays(step.id, false); }}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-6 text-center">
                      {step.waitDays}d
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={(e) => { e.stopPropagation(); updateWaitDays(step.id, true); }}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      {/* Step Edit Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {selectedStepId ? steps.find(s => s.id === selectedStepId)?.title : 'Edit Step'}
            </DialogTitle>
          </DialogHeader>
          <div className="p-4 space-y-4">
            {selectedStepId && (
              <>
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    {steps.find(s => s.id === selectedStepId)?.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{steps.find(s => s.id === selectedStepId)?.title}</h3>
                    <p className="text-sm text-gray-500">Edit step details</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Content</label>
                  <Textarea 
                    className="min-h-[200px]"
                    value={steps.find(s => s.id === selectedStepId)?.content.replace(/<\/?p>/g, '') || ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSteps(steps.map(step => 
                        step.id === selectedStepId 
                          ? {...step, content: `<p>${value.replace(/\n/g, '</p><p>')}</p>`} 
                          : step
                      ));
                    }}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Wait duration (days)</label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        const step = steps.find(s => s.id === selectedStepId);
                        if (step && step.waitDays > 0) {
                          updateWaitDays(step.id, false);
                        }
                      }}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">
                      {steps.find(s => s.id === selectedStepId)?.waitDays || 0}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        const step = steps.find(s => s.id === selectedStepId);
                        if (step) {
                          updateWaitDays(step.id, true);
                        }
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
