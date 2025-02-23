
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
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-auto">
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
            <div className="grid grid-cols-1 gap-6">
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
              <div>
                <h3 className="font-medium mb-2">📋 About</h3>
                <p className="text-sm text-gray-600">
                  Amilo International is a logistics and supply chain solutions provider that specializes in connecting businesses across Southeast Asia. The company offers comprehensive logistics services including warehousing, cross-border delivery, and eCommerce fulfillment solutions.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <div className="p-6 border rounded-lg">
              <h3 className="font-medium mb-3 text-lg">International Cross-border Delivery</h3>
              <p className="text-sm text-gray-600">Specialized logistics solutions for cross-border shipments in Southeast Asia. Our network covers major markets including Singapore, Malaysia, Thailand, and Indonesia. We offer customs clearance, documentation support, and real-time shipment tracking.</p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-medium mb-3 text-lg">eCommerce Fulfillment</h3>
              <p className="text-sm text-gray-600">End-to-end fulfillment services for online retailers, including inventory management, pick & pack services, and last-mile delivery. We integrate with major eCommerce platforms and marketplaces to streamline operations.</p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-medium mb-3 text-lg">Order Management System (OMS)</h3>
              <p className="text-sm text-gray-600">Integrated system for managing and tracking orders across multiple sales channels. Features include automated order processing, inventory sync, and advanced analytics for better decision-making.</p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-medium mb-3 text-lg">Warehouse Management System (WMS)</h3>
              <p className="text-sm text-gray-600">Advanced WMS for inventory optimization and warehouse operations. Real-time inventory tracking, automated replenishment, and optimized picking routes increase efficiency and reduce errors.</p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-medium mb-3 text-lg">Logistics SaaS Platform</h3>
              <p className="text-sm text-gray-600">Cloud-based logistics management platform for businesses. Includes route optimization, delivery scheduling, driver management, and comprehensive reporting tools. Mobile apps for drivers and customers enhance the delivery experience.</p>
            </div>
          </TabsContent>

          <TabsContent value="research" className="space-y-4">
            <div className="p-6 border rounded-lg">
              <h3 className="font-medium mb-3 text-lg">Market Research Report</h3>
              <p className="text-sm text-gray-600 mb-4">
                Analysis of logistics industry trends and opportunities in Southeast Asia. Key findings include:
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>20% annual growth in cross-border eCommerce logistics</li>
                  <li>Increasing demand for integrated logistics solutions</li>
                  <li>Rising adoption of automation and AI in warehouse operations</li>
                  <li>Shift towards sustainable logistics practices</li>
                </ul>
              </p>
              <p className="text-xs text-gray-400">Published: March 2024</p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-medium mb-3 text-lg">Company Research Report</h3>
              <p className="text-sm text-gray-600 mb-4">
                Research on Amilo International & Key Takeaways: Amilo International, a Singapore-based logistics company established in 2023, has demonstrated significant growth potential in the regional logistics market. The company's focus on technology-driven solutions and strategic partnerships has positioned it well for expansion.
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>Strong technology infrastructure and partnerships</li>
                  <li>Experienced management team from logistics industry</li>
                  <li>Rapid customer acquisition in key markets</li>
                  <li>Investment in automation and AI capabilities</li>
                </ul>
              </p>
              <p className="text-xs text-gray-400">Published: February 2024</p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-medium mb-3 text-lg">Market Insight: Improving Customer Satisfaction Through AI-Powered Logistics</h3>
              <p className="text-sm text-gray-600 mb-4">
                This article discusses how AI and technology are improving customer satisfaction in logistics, which aligns with Amilo's technology-driven approach to logistics services. Key points include:
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>AI-powered route optimization reduces delivery times by 30%</li>
                  <li>Machine learning algorithms improve delivery accuracy</li>
                  <li>Real-time tracking enhances customer experience</li>
                  <li>Predictive analytics for better resource allocation</li>
                </ul>
              </p>
              <p className="text-xs text-gray-400">Published: January 2024</p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
