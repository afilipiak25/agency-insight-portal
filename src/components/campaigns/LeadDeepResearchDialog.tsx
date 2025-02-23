
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Info, Search, Database, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Lead {
  name: string;
  position: string;
  company: string;
  location: string;
}

interface LeadDeepResearchDialogProps {
  lead: Lead;
  open: boolean;
  onClose: () => void;
}

export const LeadDeepResearchDialog = ({
  lead,
  open,
  onClose,
}: LeadDeepResearchDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Info className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <DialogTitle className="text-xl">About {lead.company}</DialogTitle>
              <p className="text-sm text-gray-500 mt-1">Key company information and insights</p>
            </div>
          </div>
        </DialogHeader>

        <div className="flex justify-between items-center mt-4 mb-6">
          <Input
            className="max-w-sm"
            placeholder="Ask anything about this account..."
            prefix={<Search className="w-4 h-4 text-gray-400" />}
          />
          <Button variant="outline">View</Button>
        </div>

        <Tabs defaultValue="info">
          <TabsList className="mb-4">
            <TabsTrigger value="info" className="gap-2">
              <Info className="w-4 h-4" />
              About {lead.company}
            </TabsTrigger>
            <TabsTrigger value="products" className="gap-2">
              <Database className="w-4 h-4" />
              5 key products & services
            </TabsTrigger>
            <TabsTrigger value="research" className="gap-2">
              <FileText className="w-4 h-4" />
              Research Reports (3)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="mt-4 space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">🏢 Industry</h3>
                <p className="text-sm text-gray-600">Logistics</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">📍 Headquarters</h3>
                <p className="text-sm text-gray-600">{lead.location}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">👥 Employees</h3>
                <p className="text-sm text-gray-600">50-100</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">💰 Funding</h3>
                <p className="text-sm text-gray-600">$1M-$5M</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-1">International Cross-border Delivery</h3>
              <p className="text-sm text-gray-600">Specialized logistics solutions for cross-border shipments</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-1">eCommerce Fulfillment</h3>
              <p className="text-sm text-gray-600">End-to-end fulfillment services for online retailers</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-1">Warehouse Management System</h3>
              <p className="text-sm text-gray-600">Advanced WMS for inventory optimization</p>
            </div>
          </TabsContent>

          <TabsContent value="research" className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-gray-500" />
                <h3 className="font-medium">Market Research Report</h3>
              </div>
              <p className="text-sm text-gray-600">Analysis of logistics industry trends and opportunities in Southeast Asia</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-gray-500" />
                <h3 className="font-medium">Company Research</h3>
              </div>
              <p className="text-sm text-gray-600">Detailed overview of company operations and market position</p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
