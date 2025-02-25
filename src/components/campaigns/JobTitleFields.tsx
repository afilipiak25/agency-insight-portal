
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Info, X, Plus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export const JobTitleFields = () => {
  const [selectedTitles, setSelectedTitles] = useState<string[]>([
    "Vice President of Operations",
    "President of Operations",
    "Operations Manager",
    "Sales Operations Manager"
  ]);
  const [customTitle, setCustomTitle] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // Sample job title suggestions (in reality, this would be a much larger dataset)
  const jobTitleSuggestions = [
    {
      category: "Operations",
      titles: [
        "Chief Operations Officer",
        "Head of Operations",
        "Operations Director",
        "Operations Coordinator",
        "Operations Specialist",
        "Operations Analyst",
        "Regional Operations Manager"
      ]
    },
    {
      category: "Sales",
      titles: [
        "Sales Director",
        "Head of Sales",
        "Sales Manager",
        "Account Executive",
        "Sales Representative",
        "Business Development Manager",
        "Sales Operations Manager"
      ]
    },
    {
      category: "Marketing",
      titles: [
        "Chief Marketing Officer",
        "Marketing Director",
        "Marketing Manager",
        "Digital Marketing Manager",
        "Content Marketing Manager",
        "Marketing Specialist",
        "Brand Manager"
      ]
    }
  ];

  const handleAddTitle = (title: string) => {
    if (!selectedTitles.includes(title)) {
      setSelectedTitles([...selectedTitles, title]);
    }
    setIsPopoverOpen(false);
  };

  const handleRemoveTitle = (titleToRemove: string) => {
    setSelectedTitles(selectedTitles.filter(title => title !== titleToRemove));
  };

  const handleAddCustomTitle = () => {
    if (customTitle.trim() && !selectedTitles.includes(customTitle)) {
      setSelectedTitles([...selectedTitles, customTitle.trim()]);
      setCustomTitle("");
    }
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            Job Titles
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add specific job titles you want to target. You can choose from suggestions or add your own.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </label>
          <span className="text-sm text-gray-500">{selectedTitles.length} titles selected</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {selectedTitles.map((title) => (
            <div 
              key={title} 
              className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-200 hover:border-violet-200 transition-colors"
            >
              <span className="text-sm">{title}</span>
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={() => handleRemoveTitle(title)}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              placeholder="Add custom job title..."
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddCustomTitle();
                }
              }}
            />
          </div>
          <Button
            variant="outline"
            onClick={handleAddCustomTitle}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Custom
          </Button>
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="secondary">Browse Suggestions</Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search job titles..." />
                <CommandList className="max-h-[300px]">
                  <CommandEmpty>No job titles found.</CommandEmpty>
                  {jobTitleSuggestions.map((category) => (
                    <CommandGroup key={category.category} heading={category.category}>
                      {category.titles.map((title) => (
                        <CommandItem
                          key={title}
                          onSelect={() => handleAddTitle(title)}
                          className="cursor-pointer"
                        >
                          {title}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="space-y-2 mt-4">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          Job Titles to Exclude
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Specify job titles you want to exclude from your targeting</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </label>
        <Input 
          placeholder="Enter job titles to exclude..."
          className="w-full"
        />
      </div>
    </>
  );
};
