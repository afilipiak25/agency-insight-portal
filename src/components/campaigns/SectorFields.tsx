
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const SectorFields = () => {
  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          Sector
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Select the industry sector you want to target</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select sector" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="technology">Technology & Software</SelectItem>
            <SelectItem value="fintech">FinTech</SelectItem>
            <SelectItem value="healthcare">Healthcare & Medical</SelectItem>
            <SelectItem value="biotech">Biotechnology</SelectItem>
            <SelectItem value="finance">Banking & Finance</SelectItem>
            <SelectItem value="insurance">Insurance</SelectItem>
            <SelectItem value="retail">Retail & E-commerce</SelectItem>
            <SelectItem value="manufacturing">Manufacturing</SelectItem>
            <SelectItem value="automotive">Automotive</SelectItem>
            <SelectItem value="education">Education & E-Learning</SelectItem>
            <SelectItem value="real-estate">Real Estate</SelectItem>
            <SelectItem value="construction">Construction</SelectItem>
            <SelectItem value="energy">Energy & Utilities</SelectItem>
            <SelectItem value="telecommunications">Telecommunications</SelectItem>
            <SelectItem value="media">Media & Entertainment</SelectItem>
            <SelectItem value="hospitality">Hospitality & Tourism</SelectItem>
            <SelectItem value="agriculture">Agriculture & Farming</SelectItem>
            <SelectItem value="logistics">Logistics & Transportation</SelectItem>
            <SelectItem value="consulting">Consulting Services</SelectItem>
            <SelectItem value="legal">Legal Services</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          Sectors to Exclude
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Specify sectors you want to exclude from your targeting</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </label>
        <Input 
          placeholder="Enter sectors to exclude..."
          className="w-full"
        />
      </div>
    </>
  );
};
