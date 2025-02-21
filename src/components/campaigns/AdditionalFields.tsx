
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";

export const AdditionalFields = () => {
  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Number of Employees
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
        <label className="text-sm font-medium text-gray-700">
          Blacklisted Email Domains
        </label>
        <Input 
          placeholder="Enter domains to blacklist..."
          className="w-full"
        />
      </div>
    </>
  );
};
