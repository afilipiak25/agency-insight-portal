
import { Button } from "@/components/ui/button";
import { 
  Target, 
  Workflow, 
  FileText, 
  Eye, 
  Settings,
  ChevronRight,
  ChevronLeft,
  MapPin
} from "lucide-react";

interface CampaignStepsNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const CampaignStepsNavigation = ({ 
  activeSection, 
  onSectionChange 
}: CampaignStepsNavigationProps) => {
  const steps = [
    { id: "targeting", label: "Targeting", icon: <Target className="w-4 h-4" /> },
    { id: "workflow", label: "Workflow", icon: <Workflow className="w-4 h-4" /> },
    { id: "resources", label: "Resources", icon: <FileText className="w-4 h-4" /> },
    { id: "preview", label: "Preview", icon: <Eye className="w-4 h-4" /> },
    { id: "visualization", label: "Flow", icon: <MapPin className="w-4 h-4" /> },
    { id: "settings", label: "Settings", icon: <Settings className="w-4 h-4" /> },
  ];

  const currentIndex = steps.findIndex(step => step.id === activeSection);
  const isFirstStep = currentIndex === 0;
  const isLastStep = currentIndex === steps.length - 1;

  const goToPreviousStep = () => {
    if (!isFirstStep) {
      onSectionChange(steps[currentIndex - 1].id);
    }
  };

  const goToNextStep = () => {
    if (!isLastStep) {
      onSectionChange(steps[currentIndex + 1].id);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <Button
        variant="outline"
        onClick={goToPreviousStep}
        disabled={isFirstStep}
        className="flex items-center gap-2"
      >
        <ChevronLeft className="w-4 h-4" />
        Back
      </Button>

      <div className="flex items-center">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <Button
              variant={activeSection === step.id ? "default" : "ghost"}
              className={`gap-2 ${
                activeSection === step.id 
                  ? "bg-gradient-to-r from-orange-400 to-pink-500 text-white" 
                  : "hover:bg-orange-50 hover:text-orange-600"
              }`}
              onClick={() => onSectionChange(step.id)}
            >
              {step.icon}
              <span className="hidden sm:inline">{step.label}</span>
              <span className="inline sm:hidden">{index + 1}</span>
            </Button>
            {index < steps.length - 1 && (
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
            )}
          </div>
        ))}
      </div>

      <Button
        variant={isLastStep ? "default" : "outline"}
        onClick={goToNextStep}
        disabled={isLastStep}
        className={`flex items-center gap-2 ${
          isLastStep ? "bg-gradient-to-r from-orange-400 to-pink-500 text-white" : ""
        }`}
      >
        {isLastStep ? "Finish" : "Next"}
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};
