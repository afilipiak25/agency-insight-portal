
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Upload, ChevronDown, Plus, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const CreateCampaignForm = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex justify-between items-start">
        <div className="space-y-6 flex-1">
          {/* Select Audience Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">Select target audience</h2>
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
                  <Button size="sm" variant="outline" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Create New
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">
              Select Data Type:
            </label>
            <div className="w-48">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="B2B" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="b2b">B2B</SelectItem>
                  <SelectItem value="b2c">B2C</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Locations */}
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

          {/* Locations to Exclude */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Locations (To Exclude)
            </label>
            <Input 
              placeholder="Search locations to exclude..."
              className="w-full"
            />
          </div>

          {/* Job Titles */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Job Titles
            </label>
            <div className="flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-200">
                <span>Vice President of Operations</span>
                <button className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-200">
                <span>President of Operations</span>
                <button className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-200">
                <span>Operations Manager</span>
                <button className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-200">
                <span>Sales Operations Manager</span>
                <button className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <Button variant="outline" className="rounded-full">
                + Add Job Title
              </Button>
            </div>
          </div>

          {/* Upload CSV and Generate Sample Email */}
          <div className="flex gap-4">
            <Button variant="outline" className="gap-2">
              <Upload className="w-4 h-4" />
              Upload CSV
            </Button>
            <Button variant="secondary" className="bg-violet-100 text-violet-700 hover:bg-violet-200">
              Generate Sample Email
            </Button>
          </div>
        </div>

        {/* Preview Section */}
        <div className="w-96 bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-700">Preview Leads</h3>
            <span className="text-violet-600 font-semibold">548,845</span>
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                  {index}
                </div>
                <div className="flex-1">
                  <div className="font-medium">Sample Name</div>
                  <div className="text-sm text-gray-500">Operations Manager</div>
                </div>
                <div className="text-sm text-gray-400">Company {index}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Centered Tabs at Bottom */}
      <div className="border-t pt-6">
        <div className="max-w-2xl mx-auto">
          <Tabs defaultValue="targeting" className="w-full">
            <TabsList className="w-full border-b justify-center mb-8 bg-transparent p-0 h-auto">
              <TabsTrigger
                value="targeting"
                className="data-[state=active]:border-b-2 data-[state=active]:border-violet-600 rounded-none px-8 py-4"
              >
                1. Targeting
              </TabsTrigger>
              <TabsTrigger
                value="pitch"
                className="data-[state=active]:border-b-2 data-[state=active]:border-violet-600 rounded-none px-8 py-4"
              >
                2. Pitch
              </TabsTrigger>
              <TabsTrigger
                value="outreach"
                className="data-[state=active]:border-b-2 data-[state=active]:border-violet-600 rounded-none px-8 py-4"
              >
                3. Outreach
              </TabsTrigger>
              <TabsTrigger
                value="workflow"
                className="data-[state=active]:border-b-2 data-[state=active]:border-violet-600 rounded-none px-8 py-4"
              >
                4. Workflow
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="data-[state=active]:border-b-2 data-[state=active]:border-violet-600 rounded-none px-8 py-4"
              >
                5. Settings
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
