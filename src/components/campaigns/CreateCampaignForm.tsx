import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Upload, ChevronDown, Plus, X, ChevronUp } from "lucide-react";
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

          {/* Company Search */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Company Search
            </label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Search for specific companies..." />
              </SelectTrigger>
              <SelectContent>
                {[...Array(50)].map((_, i) => (
                  <SelectItem key={i} value={`company-${i + 1}`}>
                    Company {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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

          {/* Job Titles to Exclude */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Job Titles to Exclude
            </label>
            <Input 
              placeholder="Enter job titles to exclude..."
              className="w-full"
            />
          </div>

          {/* Job Function */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Job Function
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

          {/* Management Level */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Management Level
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

          {/* Sector */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Sector
            </label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sectors to Exclude */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Sectors to Exclude
            </label>
            <Input 
              placeholder="Enter sectors to exclude..."
              className="w-full"
            />
          </div>

          {/* Number of Employees */}
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

          {/* Outbound Keywords */}
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

          {/* Blacklisted Email Domains */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Blacklisted Email Domains
            </label>
            <Input 
              placeholder="Enter domains to blacklist..."
              className="w-full"
            />
          </div>

          {/* Advanced Targeting */}
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
        <div className="w-96 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-violet-500" />
                <h3 className="text-sm font-medium text-gray-900">Preview Leads</h3>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-violet-600 font-semibold text-lg">548,845</span>
                <span className="text-xs text-gray-500">Total Leads</span>
              </div>
            </div>
          </div>
          
          <div className="p-4 space-y-3">
            {[1, 2, 3, 4, 5].map((index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-violet-50 rounded-full flex items-center justify-center text-violet-600 font-medium">
                  {index}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 truncate">Sample Name</div>
                  <div className="text-sm text-gray-500">Operations Manager</div>
                </div>
                <div className="text-sm text-gray-400 whitespace-nowrap">Company {index}</div>
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
