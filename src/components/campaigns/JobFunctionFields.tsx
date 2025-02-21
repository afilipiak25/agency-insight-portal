
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
            <SelectItem value="sales">Sales & Business Development</SelectItem>
            <SelectItem value="marketing">Marketing & Communications</SelectItem>
            <SelectItem value="operations">Operations Management</SelectItem>
            <SelectItem value="it">Information Technology</SelectItem>
            <SelectItem value="engineering">Engineering</SelectItem>
            <SelectItem value="product">Product Management</SelectItem>
            <SelectItem value="finance">Finance & Accounting</SelectItem>
            <SelectItem value="hr">Human Resources</SelectItem>
            <SelectItem value="legal">Legal & Compliance</SelectItem>
            <SelectItem value="research">Research & Development</SelectItem>
            <SelectItem value="consulting">Consulting</SelectItem>
            <SelectItem value="customer-success">Customer Success</SelectItem>
            <SelectItem value="data">Data & Analytics</SelectItem>
            <SelectItem value="design">Design & UX</SelectItem>
            <SelectItem value="procurement">Procurement</SelectItem>
            <SelectItem value="quality">Quality Assurance</SelectItem>
            <SelectItem value="support">Customer Support</SelectItem>
            <SelectItem value="admin">Administration</SelectItem>
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
            <SelectItem value="c-level">C-Level Executive</SelectItem>
            <SelectItem value="president">President</SelectItem>
            <SelectItem value="vp">Vice President</SelectItem>
            <SelectItem value="svp">Senior Vice President</SelectItem>
            <SelectItem value="avp">Associate Vice President</SelectItem>
            <SelectItem value="director">Director</SelectItem>
            <SelectItem value="senior-director">Senior Director</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="senior-manager">Senior Manager</SelectItem>
            <SelectItem value="team-lead">Team Lead</SelectItem>
            <SelectItem value="supervisor">Supervisor</SelectItem>
            <SelectItem value="head">Head of Department</SelectItem>
            <SelectItem value="specialist">Senior Specialist</SelectItem>
            <SelectItem value="individual">Individual Contributor</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
