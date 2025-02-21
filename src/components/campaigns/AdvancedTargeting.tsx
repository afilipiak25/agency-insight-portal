
import { Input } from "@/components/ui/input";
import { ChevronUp } from "lucide-react";

export const AdvancedTargeting = () => {
  return (
    <div className="space-y-2 border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Advanced Targeting</h3>
        <ChevronUp className="w-5 h-5 text-gray-500" />
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Technologies Used
          </label>
          <div className="relative">
            <Input 
              placeholder="Search technologies used"
              className="w-full pr-16"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700">
              Clear All
            </button>
          </div>
          <div className="space-y-2 mt-2">
            {[
              "1World Online",
              "1plusX",
              "1time",
              "20-20 Technologies",
              "2020 Technologies",
              "HubSpot",
              "Salesforce",
              "Marketo",
              "Zendesk",
              "Mailchimp"
            ].map((tech) => (
              <div key={tech} className="flex items-center gap-2">
                <input type="checkbox" id={tech} className="rounded border-gray-300" />
                <label htmlFor={tech} className="text-sm text-gray-700">{tech}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
