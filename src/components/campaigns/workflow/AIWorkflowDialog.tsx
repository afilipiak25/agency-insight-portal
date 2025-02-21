
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RocketIcon } from "lucide-react";
import { useState } from "react";
import { WorkflowStep } from "./types";

interface AIWorkflowDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (steps: WorkflowStep[]) => void;
}

export const AIWorkflowDialog = ({ isOpen, onClose, onGenerate }: AIWorkflowDialogProps) => {
  const [salesTeam, setSalesTeam] = useState("sales teams");
  const [industry, setIndustry] = useState("b2b agencies");
  const [goal, setGoal] = useState("book more sales meetings");
  const [method, setMethod] = useState("providing a software that allows personalization at scale");
  const [reason, setReason] = useState("prospect's company is hiring");
  const [language, setLanguage] = useState("English");
  const [tone, setTone] = useState("conversational");

  const handleGenerate = () => {
    // Hier würde normalerweise die KI-Integration stattfinden
    // Für dieses Beispiel generieren wir einen Beispiel-Workflow
    const mockGeneratedSteps: WorkflowStep[] = [
      {
        id: "email-1",
        type: "automatic",
        title: "Initial Email",
        description: "First contact email",
        icon: null
      },
      {
        id: "linkedin-1",
        type: "automatic",
        title: "LinkedIn Connection",
        description: "Connect on LinkedIn",
        icon: null
      },
      {
        id: "email-2",
        type: "automatic",
        title: "Follow-up Email",
        description: "Second contact email",
        icon: null
      }
    ];
    
    onGenerate(mockGeneratedSteps);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <RocketIcon className="w-6 h-6 text-violet-500" />
            Create your campaign automatically with AI
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <p className="text-gray-600">
            Give us the information for your sequence, and we'll take care of the rest!
          </p>

          <div className="space-y-4">
            <div className="flex gap-2 items-center">
              <span className="text-gray-700">We help</span>
              <Input
                value={salesTeam}
                onChange={(e) => setSalesTeam(e.target.value)}
                className="bg-violet-50 border-violet-100"
              />
              <span className="text-gray-700">in</span>
              <Input
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="bg-violet-50 border-violet-100"
              />
              <span className="text-gray-700">to</span>
            </div>

            <Input
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="bg-violet-50 border-violet-100"
            />

            <div className="flex gap-2 items-center">
              <span className="text-gray-700">by</span>
              <Input
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="bg-violet-50 border-violet-100 flex-1"
              />
            </div>

            <div className="flex gap-2 items-center">
              <span className="text-gray-700">With this campaign, I'm reaching out because</span>
              <Input
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="bg-violet-50 border-violet-100 flex-1"
              />
            </div>

            <div className="flex gap-2 items-center">
              <span className="text-gray-700">I want the campaign written in</span>
              <Input
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-violet-50 border-violet-100 w-32"
              />
              <span className="text-gray-700">with a</span>
              <Input
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="bg-violet-50 border-violet-100 w-40"
              />
              <span className="text-gray-700">tone.</span>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button 
              onClick={handleGenerate}
              className="bg-violet-600 hover:bg-violet-700"
            >
              Generate your campaign
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
