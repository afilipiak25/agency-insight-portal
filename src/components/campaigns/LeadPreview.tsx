
import { PreviewSection } from "./PreviewSection";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FilterOption {
  id: string;
  category: string;
  name: string;
  description: string;
  icon: JSX.Element;
}

const filterOptions: FilterOption[] = [
  {
    id: "company_size",
    category: "Company",
    name: "Company Size",
    description: "Filter by number of employees",
    icon: <Filter className="w-4 h-4" />,
  },
  {
    id: "revenue",
    category: "Company",
    name: "Annual Revenue",
    description: "Filter by company revenue",
    icon: <Filter className="w-4 h-4" />,
  },
  {
    id: "industry",
    category: "Company",
    name: "Industry",
    description: "Filter by specific industries",
    icon: <Filter className="w-4 h-4" />,
  },
  {
    id: "technology",
    category: "Technology",
    name: "Tech Stack",
    description: "Filter by used technologies",
    icon: <Filter className="w-4 h-4" />,
  },
  {
    id: "funding",
    category: "Company",
    name: "Funding",
    description: "Filter by funding rounds and amounts",
    icon: <Filter className="w-4 h-4" />,
  },
  {
    id: "headcount_growth",
    category: "Growth",
    name: "Headcount Growth",
    description: "Filter by employee growth rate",
    icon: <Filter className="w-4 h-4" />,
  },
  {
    id: "job_openings",
    category: "Growth",
    name: "Job Openings",
    description: "Filter by number of open positions",
    icon: <Filter className="w-4 h-4" />,
  },
  {
    id: "social_presence",
    category: "Digital",
    name: "Social Media Presence",
    description: "Filter by social media metrics",
    icon: <Filter className="w-4 h-4" />,
  },
  {
    id: "website_traffic",
    category: "Digital",
    name: "Website Traffic",
    description: "Filter by website visitor numbers",
    icon: <Filter className="w-4 h-4" />,
  },
  {
    id: "technologies",
    category: "Technology",
    name: "Technologies Used",
    description: "Filter by specific technologies",
    icon: <Filter className="w-4 h-4" />,
  },
];

interface LeadPreviewProps {
  showEmailPreview?: boolean;
}

export const LeadPreview = ({ showEmailPreview = false }: LeadPreviewProps) => {
  if (showEmailPreview) {
    return <PreviewSection />;
  }

  const categories = Array.from(new Set(filterOptions.map(filter => filter.category)));

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border p-4 space-y-4">
        <div className="space-y-1">
          <h2 className="font-semibold text-lg">Preview Leads</h2>
          <p className="text-sm text-violet-600 font-medium">54,632 leads total</p>
        </div>
        
        <div className="space-y-3">
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Marc Nagel</span>
              <span className="text-xs text-gray-500">CEO</span>
            </div>
            <div className="text-xs text-gray-500">Acme GmbH • Berlin, Germany</div>
          </div>
          
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Sarah Weber</span>
              <span className="text-xs text-gray-500">Marketing Director</span>
            </div>
            <div className="text-xs text-gray-500">TechCorp • Munich, Germany</div>
          </div>
          
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Thomas Müller</span>
              <span className="text-xs text-gray-500">Head of Sales</span>
            </div>
            <div className="text-xs text-gray-500">Digital Solutions • Hamburg, Germany</div>
          </div>
        </div>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full justify-start text-gray-600 bg-white border rounded-lg"
          >
            <Filter className="w-4 h-4 mr-2" />
            Add Filters
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Lead Filters</DialogTitle>
          </DialogHeader>
          
          <div className="mt-4">
            <Tabs defaultValue={categories[0]} className="w-full">
              <TabsList className="w-full flex flex-wrap justify-start bg-gray-100 p-1">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category} className="flex-shrink-0">
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
              {categories.map((category) => (
                <TabsContent key={category} value={category} className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filterOptions
                      .filter((filter) => filter.category === category)
                      .map((filter) => (
                        <div
                          key={filter.id}
                          className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 cursor-move hover:border-violet-500 hover:shadow-sm transition-all"
                          draggable
                        >
                          {filter.icon}
                          <div>
                            <h3 className="font-medium">{filter.name}</h3>
                            <p className="text-sm text-gray-500">
                              {filter.description}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
