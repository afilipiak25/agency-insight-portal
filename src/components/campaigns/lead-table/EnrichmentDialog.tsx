
import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Info, Calendar, BarChart2, Radar, Globe, Linkedin, FileText, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EnrichmentOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface EnrichmentDialogProps {
  onEnrichmentSelect: (enrichment: EnrichmentOption) => void;
}

export const EnrichmentDialog: React.FC<EnrichmentDialogProps> = ({ 
  onEnrichmentSelect 
}) => {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);

  const enrichmentOptions: EnrichmentOption[] = [
    {
      id: "swot",
      name: "SWOT Analysis",
      description: "Analyze strengths, weaknesses, opportunities, and threats",
      icon: <Info className="text-blue-500" />
    },
    {
      id: "conference",
      name: "Conference Attendance Tracker",
      description: "Track industry events and attendee engagement",
      icon: <Calendar className="text-green-500" />
    },
    {
      id: "financials",
      name: "Financials Analyzer",
      description: "Analyze company financial performance and metrics",
      icon: <BarChart2 className="text-orange-500" />
    },
    {
      id: "competitor",
      name: "Competitor Researcher",
      description: "Research and analyze competing companies",
      icon: <Radar className="text-purple-500" />
    },
    {
      id: "website",
      name: "Website Scraper",
      description: "Extract information from target company websites",
      icon: <Globe className="text-teal-500" />
    },
    {
      id: "linkedin",
      name: "LinkedIn Profile Scraper",
      description: "Extract information from LinkedIn profiles",
      icon: <Linkedin className="text-blue-600" />
    },
    {
      id: "custom",
      name: "Custom Research Request",
      description: "Define a custom research query for your leads",
      icon: <FileText className="text-pink-500" />
    }
  ];

  const handleSelect = (option: EnrichmentOption) => {
    onEnrichmentSelect(option);
    setOpen(false);
    toast({
      title: `${option.name} added`,
      description: "The enrichment has been added to your campaign.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="orange"
          className="rounded-md"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Enrichment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add Enrichment to Campaign</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <p className="text-sm text-gray-500">
            Select an enrichment to add to your campaign. This will allow you to enhance your data with additional insights.
          </p>
          <div className="grid grid-cols-1 gap-3 mt-2">
            {enrichmentOptions.map((option) => (
              <button
                key={option.id}
                className="flex items-center gap-3 p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-all duration-200 hover:border-purple-400 hover:shadow-md"
                onClick={() => handleSelect(option)}
              >
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
                  {option.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{option.name}</h3>
                  <p className="text-sm text-gray-500">{option.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
