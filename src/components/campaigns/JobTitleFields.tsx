
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Info, X, Plus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ApolloFilters } from "./types/apollo-filters";

interface JobTitleFieldsProps {
  filters?: ApolloFilters;
  onFilterChange?: (key: keyof ApolloFilters, value: any) => void;
}

export const JobTitleFields = ({ filters, onFilterChange }: JobTitleFieldsProps) => {
  const [selectedTitles, setSelectedTitles] = useState<string[]>(filters?.titles || []);
  const [customTitle, setCustomTitle] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [titleToExclude, setTitleToExclude] = useState(filters?.excludedTitles || "");

  const jobTitleSuggestions = [
    {
      category: "Operations",
      titles: [
        "Chief Operations Officer",
        "Head of Operations",
        "Operations Director",
        "Operations Manager",
        "Vice President of Operations",
        "President of Operations",
        "Sales Operations Manager"
      ]
    }
  ];

  const handleAddTitle = (title: string) => {
    if (!selectedTitles.includes(title)) {
      const newTitles = [...selectedTitles, title];
      setSelectedTitles(newTitles);
      onFilterChange?.('titles', newTitles);
    }
    setIsPopoverOpen(false);
  };

  const handleRemoveTitle = (titleToRemove: string) => {
    const newTitles = selectedTitles.filter(title => title !== titleToRemove);
    setSelectedTitles(newTitles);
    onFilterChange?.('titles', newTitles);
  };

  const handleAddCustomTitle = () => {
    if (customTitle.trim() && !selectedTitles.includes(customTitle)) {
      const newTitles = [...selectedTitles, customTitle.trim()];
      setSelectedTitles(newTitles);
      onFilterChange?.('titles', newTitles);
      setCustomTitle("");
    }
  };

  const handleTitleExcludeChange = (value: string) => {
    setTitleToExclude(value);
    onFilterChange?.('excludedTitles', value);
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
          value={titleToExclude}
          onChange={(e) => handleTitleExcludeChange(e.target.value)}
        />
      </div>
    </>
  );
};
