
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const AudienceHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Select outreach persona</h2>
        <div className="flex items-center gap-4">
          <Select>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="James - Demo Test" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="james">James - Demo Test</SelectItem>
              <SelectItem value="other">Other Audience</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-3 text-sm">
            <button className="text-violet-600 hover:text-violet-700">
              Edit Name
            </button>
            <span className="text-gray-300">|</span>
            <Button size="icon" variant="outline">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
