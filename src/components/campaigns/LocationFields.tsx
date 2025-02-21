
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

export const LocationFields = () => {
  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Locations
        </label>
        <div className="space-y-3">
          <Input 
            placeholder="Search locations..."
            className="w-full"
          />
          <div className="flex flex-wrap gap-2">
            <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-200">
              <span className="inline-flex items-center gap-2">
                <img src="/lovable-uploads/65ea4964-7a50-460e-9b50-6e1a2cb2ee44.png" alt="UK flag" className="w-5 h-5" />
                United Kingdom
              </span>
              <button className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-200">
              <span className="inline-flex items-center gap-2">
                <img src="/lovable-uploads/83a6380b-4ece-451f-a112-25cb4f412c37.png" alt="US flag" className="w-5 h-5" />
                United States
              </span>
              <button className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Locations (To Exclude)
        </label>
        <Input 
          placeholder="Search locations to exclude..."
          className="w-full"
        />
      </div>
    </>
  );
};
