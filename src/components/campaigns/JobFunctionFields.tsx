
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const JobFunctionFields = () => {
  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          Job Function
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Select the department or function you want to target</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select job function" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sales">Sales</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="operations">Operations</SelectItem>
            <SelectItem value="it">IT</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          Management Level
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Select the management level you want to target</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select management level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="c-level">C-Level</SelectItem>
            <SelectItem value="vp">VP Level</SelectItem>
            <SelectItem value="director">Director Level</SelectItem>
            <SelectItem value="manager">Manager Level</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
