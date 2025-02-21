
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

export const JobTitleFields = () => {
  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Job Titles
        </label>
        <div className="flex flex-wrap gap-2">
          {["Vice President of Operations", "President of Operations", "Operations Manager", "Sales Operations Manager"].map((title) => (
            <div key={title} className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-200">
              <span>{title}</span>
              <button className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          <Button variant="outline" className="rounded-full">
            + Add Job Title
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Job Titles to Exclude
        </label>
        <Input 
          placeholder="Enter job titles to exclude..."
          className="w-full"
        />
      </div>
    </>
  );
};
