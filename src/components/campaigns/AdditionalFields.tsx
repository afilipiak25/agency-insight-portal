
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const AdditionalFields = () => {
  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          Number of Employees
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Specify the company size range you want to target</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </label>
        <div className="flex gap-4">
          <Input 
            type="number"
            placeholder="Min"
            className="w-full"
            defaultValue={1}
          />
          <Input 
            type="number"
            placeholder="Max"
            className="w-full"
            defaultValue={1000000}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          Outbound Keywords
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Add keywords to refine your target audience</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="text-xs text-gray-500">(Add Comma to Separate)</span>
        </label>
        <div className="flex gap-2">
          <Input 
            placeholder="Add your keywords here"
            className="flex-1"
          />
          <Button variant="secondary" className="bg-violet-100 text-violet-700 hover:bg-violet-200">
            Add New
          </Button>
          <Button variant="outline" className="gap-2">
            <Upload className="w-4 h-4" />
            Upload CSV
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          Blacklisted Email Domains
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Enter email domains you want to exclude from your targeting</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </label>
        <Input 
          placeholder="Enter domains to blacklist..."
          className="w-full"
        />
      </div>
    </>
  );
};
