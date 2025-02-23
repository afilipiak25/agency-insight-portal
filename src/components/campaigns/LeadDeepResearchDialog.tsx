
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Info, Search, Database, FileText, Download, Link2 } from "lucide-react";
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
              <DialogTitle>About {lead.company}</DialogTitle>
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
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Download
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Link2 className="w-4 h-4" />
              View
            </Button>
          </div>
        </div>

        <Tabs defaultValue="info" className="w-full">
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

          <TabsContent value="info" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">🏢 Industry</h3>
                <p className="text-sm text-gray-600">Logistics & Supply Chain Solutions</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">📍 Headquarters</h3>
                <p className="text-sm text-gray-600">16 Shaw Rd, Singapore</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">👥 Employees</h3>
                <p className="text-sm text-gray-600">30</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">💰 Revenue Range</h3>
                <p className="text-sm text-gray-600">$1M-$5M</p>
              </div>
              <div className="col-span-2">
                <h3 className="font-medium mb-2">📋 About</h3>
                <p className="text-sm text-gray-600">
                  Amilo International is a logistics and supply chain solutions provider that specializes in connecting businesses across Southeast Asia. The company offers comprehensive logistics services including warehousing, cross-border delivery, and eCommerce fulfillment solutions.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">International Cross-border Delivery</h3>
              <p className="text-sm text-gray-600">Specialized logistics solutions for cross-border shipments in Southeast Asia</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">eCommerce Fulfillment</h3>
              <p className="text-sm text-gray-600">End-to-end fulfillment services for online retailers</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Order Management System (OMS)</h3>
              <p className="text-sm text-gray-600">Integrated system for managing and tracking orders</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Warehouse Management System (WMS)</h3>
              <p className="text-sm text-gray-600">Advanced WMS for inventory optimization and warehouse operations</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Logistics SaaS Platform</h3>
              <p className="text-sm text-gray-600">Cloud-based logistics management platform for businesses</p>
            </div>
          </TabsContent>

          <TabsContent value="research" className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Market Research Report</h3>
              <p className="text-sm text-gray-600 mb-2">Analysis of logistics industry trends and opportunities in Southeast Asia</p>
              <p className="text-xs text-gray-400">Published: March 2024</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Company Research Report</h3>
              <p className="text-sm text-gray-600 mb-2">Research on Amilo International & Key Takeaways: Amilo International, a Singapore-based logistics company established in 2023, has demonstrated significant...</p>
              <p className="text-xs text-gray-400">Published: February 2024</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Market Insight: Improving Customer Satisfaction Through AI-Powered Logistics</h3>
              <p className="text-sm text-gray-600 mb-2">This article discusses how AI and technology are improving customer satisfaction in logistics, which aligns with Amilo's technology-driven approach to logistics services...</p>
              <p className="text-xs text-gray-400">Published: January 2024</p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
