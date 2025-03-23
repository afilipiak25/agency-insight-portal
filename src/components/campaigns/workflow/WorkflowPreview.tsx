
import { Mail, UserPlus, Eye, MessageSquare, Instagram, Plus, Type, FileText, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ContextMenu,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { StepCard } from "./StepCard";
import { StepContextMenu } from "./StepContextMenu";
import { StepEditDialog } from "./StepEditDialog";
import { WorkflowStep } from "../types/workflow";

export const WorkflowPreview = () => {
  const [selectedStepId, setSelectedStepId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [activeContextMenuStep, setActiveContextMenuStep] = useState<number | null>(null);
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
      color: "#9b87f5",
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

  const handleStepRename = (stepId: number, newTitle: string) => {
    setSteps(prevSteps => prevSteps.map(step => 
      step.id === stepId ? { ...step, title: newTitle } : step
    ));
  };

  const handleStepDelete = (stepId: number) => {
    setSteps(prevSteps => prevSteps.filter(step => step.id !== stepId));
  };

  const handleStepDuplicate = (stepId: number) => {
    const stepToDuplicate = steps.find(step => step.id === stepId);
    if (stepToDuplicate) {
      const newId = Math.max(...steps.map(s => s.id)) + 1;
      const newStep = {
        ...stepToDuplicate,
        id: newId,
        title: `${stepToDuplicate.title} (Copy)`,
      };
      setSteps([...steps, newStep]);
    }
  };

  const handleColorChange = (stepId: number, color: string) => {
    setSteps(prevSteps => prevSteps.map(step => 
      step.id === stepId ? { ...step, color } : step
    ));
    setColorPickerOpen(false);
  };

  const insertNewStep = (stepId: number, position: 'left' | 'right') => {
    const currentIndex = steps.findIndex(step => step.id === stepId);
    if (currentIndex === -1) return;
    
    const newId = Math.max(...steps.map(s => s.id)) + 1;
    const newStep: WorkflowStep = {
      id: newId,
      sequenceNum: 1,
      type: "email",
      icon: <Mail className="w-5 h-5 text-purple-500" />,
      title: `New Step`,
      content: "<p>Hey [Name],</p> <p>ich möchte...</p>",
      waitDays: 3,
    };
    
    const newSteps = [...steps];
    newSteps.splice(position === 'left' ? currentIndex : currentIndex + 1, 0, newStep);
    setSteps(newSteps);
  };

  const colorOptions = [
    "#9b87f5", // Primary Purple
    "#7E69AB", // Secondary Purple
    "#6E59A5", // Tertiary Purple
    "#D6BCFA", // Light Purple
    "#F97316", // Bright Orange
    "#0EA5E9", // Ocean Blue
    "#D946EF", // Magenta Pink
    "#8B5CF6", // Vivid Purple
    "#EC4899", // Pink
    "#EF4444", // Red
    "#F59E0B", // Amber
    "#10B981", // Emerald
  ];

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
            <ContextMenu key={step.id}>
              <ContextMenuTrigger asChild>
                <div>
                  <StepCard 
                    step={step}
                    index={index}
                    stepsLength={steps.length}
                    onStepClick={openStepDialog}
                    updateWaitDays={updateWaitDays}
                  />
                </div>
              </ContextMenuTrigger>
              
              <StepContextMenu 
                stepId={step.id}
                activeContextMenuStep={activeContextMenuStep}
                stepTitle={step.title}
                setActiveContextMenuStep={setActiveContextMenuStep}
                handleStepRename={handleStepRename}
                openStepDialog={openStepDialog}
                handleStepDuplicate={handleStepDuplicate}
                insertNewStep={insertNewStep}
                handleColorChange={handleColorChange}
                handleStepDelete={handleStepDelete}
                colorOptions={colorOptions}
              />
            </ContextMenu>
          ))}
        </div>
      </ScrollArea>
      
      {/* Step Edit Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <StepEditDialog 
          selectedStepId={selectedStepId}
          steps={steps}
          updateSteps={setSteps}
          updateWaitDays={updateWaitDays}
        />
      </Dialog>
    </div>
  );
};
