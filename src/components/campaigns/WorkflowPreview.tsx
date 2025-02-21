
import { Mail, UserPlus, Eye, MessageSquare, Instagram, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface WorkflowStep {
  id: number;
  type: string;
  icon: JSX.Element;
  title: string;
  content: string;
  waitDays: number;
}

export const WorkflowPreview = () => {
  const [steps, setSteps] = useState<WorkflowStep[]>([
    {
      id: 1,
      type: "email",
      icon: <Mail className="w-5 h-5 text-blue-500" />,
      title: "Erste E-Mail",
      content: "Sehr geehrte/r [Name],\n\nIch hoffe, diese Nachricht erreicht Sie gut. Ich bin auf Ihr Profil aufmerksam geworden...",
      waitDays: 5,
    },
    {
      id: 2,
      type: "linkedin_view",
      icon: <Eye className="w-5 h-5 text-violet-500" />,
      title: "LinkedIn Profil besuchen",
      content: "Profil des Leads auf LinkedIn besuchen",
      waitDays: 3,
    },
    {
      id: 3,
      type: "linkedin_invite",
      icon: <UserPlus className="w-5 h-5 text-blue-600" />,
      title: "LinkedIn Einladung",
      content: "Sehr geehrte/r [Name], ich würde Sie gerne in mein berufliches Netzwerk aufnehmen...",
      waitDays: 5,
    },
    {
      id: 4,
      type: "email",
      icon: <Mail className="w-5 h-5 text-blue-500" />,
      title: "Follow-up E-Mail",
      content: "Sehr geehrte/r [Name],\n\nIch wollte mich noch einmal bei Ihnen melden...",
      waitDays: 5,
    },
    {
      id: 5,
      type: "linkedin_message",
      icon: <MessageSquare className="w-5 h-5 text-blue-600" />,
      title: "LinkedIn Nachricht",
      content: "Hallo [Name], vielen Dank für die Vernetzung. Ich würde gerne...",
      waitDays: 3,
    },
    {
      id: 6,
      type: "instagram",
      icon: <Instagram className="w-5 h-5 text-pink-600" />,
      title: "Instagram Nachricht",
      content: "Hallo [Name], ich habe gesehen, dass Sie auch auf Instagram aktiv sind...",
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

  const getTotalDuration = () => {
    return steps.reduce((total, step) => total + step.waitDays, 0);
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6 md:p-8 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Workflow Vorschau</h2>
        <span className="text-sm text-gray-500">Gesamtdauer: {getTotalDuration()} Tage</span>
      </div>

      <div className="space-y-8">
        {steps.map((step, index) => (
          <div key={step.id} className="relative">
            <div className="flex gap-6">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gray-50 border flex items-center justify-center">
                  {step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute top-12 left-1/2 bottom-0 w-px bg-gray-200 -translate-x-1/2 h-24" />
                )}
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{step.title}</h3>
                  {index < steps.length - 1 && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Warten:</span>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateWaitDays(step.id, false)}
                          disabled={step.waitDays === 0}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center font-medium">
                          {step.waitDays} {step.waitDays === 1 ? "Tag" : "Tage"}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateWaitDays(step.id, true)}
                          disabled={step.waitDays === 30}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <Textarea
                  defaultValue={step.content}
                  className="min-h-[100px] text-sm"
                  placeholder="Nachrichteninhalt eingeben..."
                />

                {index < steps.length - 1 && (
                  <div className="pt-4 pb-8">
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      <span>↓</span> {step.waitDays} {step.waitDays === 1 ? "Tag" : "Tage"} warten
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
