
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Info, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const JobTitleFields = () => {
  const [jobTitles, setJobTitles] = useState<string[]>([
    "Vice President of Operations",
    "President of Operations",
    "Operations Manager",
    "Sales Operations Manager"
  ]);
  const [jobTitleInput, setJobTitleInput] = useState("");

  const handleJobTitleAdd = () => {
    if (jobTitleInput.trim()) {
      setJobTitles([...jobTitles, jobTitleInput.trim()]);
      setJobTitleInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleJobTitleAdd();
    }
  };

  const handleRemoveTitle = (titleToRemove: string) => {
    setJobTitles(jobTitles.filter(title => title !== titleToRemove));
  };

  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          Job Titel
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Fügen Sie spezifische Job-Titel hinzu</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </label>
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input
              value={jobTitleInput}
              onChange={(e) => setJobTitleInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Job-Titel eingeben"
              className="flex-1"
            />
            <Button 
              onClick={handleJobTitleAdd}
              variant="outline"
              type="button"
            >
              Hinzufügen
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {jobTitles.map((title) => (
              <div
                key={title}
                className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-200"
              >
                <span>{title}</span>
                <button
                  onClick={() => handleRemoveTitle(title)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          Job-Titel ausschließen
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Job-Titel, die von der Suche ausgeschlossen werden sollen</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </label>
        <Input 
          placeholder="Auszuschließende Job-Titel..."
          className="w-full"
        />
      </div>
    </>
  );
};
