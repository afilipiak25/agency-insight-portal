
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { DollarSign, Users, TrendingUp, MoreVertical, ChevronRight, ChevronLeft } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LeadDeepResearchDialog } from "@/components/campaigns/LeadDeepResearchDialog";
import { useState } from "react";

interface PipelineCardProps {
  name: string;
  company: string;
  position: string;
  interest: "High Interest" | "Medium Interest";
  value: number;
  status: "new" | "contacted" | "meeting";
  onClick: () => void;
}

const PipelineCard = ({ name, company, position, interest, value, status, onClick }: PipelineCardProps) => {
  const getInterestColor = (interest: string) => {
    return interest === "High Interest" ? "text-green-600" : "text-orange-500";
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-50 text-blue-600";
      case "contacted":
        return "bg-gray-50 text-gray-600";
      case "meeting":
        return "bg-pink-50 text-pink-600";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  return (
    <div 
      className="bg-white p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600">{company}</p>
          <p className="text-sm text-gray-500">{position}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Bearbeiten</DropdownMenuItem>
            <DropdownMenuItem>Löschen</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex justify-between items-center">
        <span className={getInterestColor(interest)}>{interest}</span>
        <span className="font-medium">€{value.toLocaleString()}</span>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadgeStyle(status)}`}>
          {status}
        </span>
        {status !== "new" && <ChevronLeft className="w-4 h-4 text-gray-400" />}
        {status !== "meeting" && <ChevronRight className="w-4 h-4 text-gray-400" />}
      </div>
    </div>
  );
};

const MetricCard = ({ icon: Icon, label, value, change }: {
  icon: React.ElementType;
  label: string;
  value: string;
  change: string;
}) => (
  <div className="bg-white p-6 rounded-lg border border-gray-100">
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-lg bg-gray-50">
        <Icon className="w-6 h-6 text-gray-600" />
      </div>
      <div>
        <h3 className="text-sm text-gray-600 mb-1">{label}</h3>
        <p className="text-2xl font-semibold">{value}</p>
        <p className="text-sm text-green-600">{change}</p>
      </div>
    </div>
  </div>
);

const Pipeline = () => {
  const [selectedLead, setSelectedLead] = useState<{ name: string; company: string; position: string; location: string; } | null>(null);

  return (
    <Layout>
      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-8">Pipeline</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <MetricCard
              icon={DollarSign}
              label="Pipeline Value"
              value="€225,000"
              change="+15% vs. last month"
            />
            <MetricCard
              icon={Users}
              label="Active Leads"
              value="42"
              change="+8 new this week"
            />
            <MetricCard
              icon={TrendingUp}
              label="Conversion Rate"
              value="24.8%"
              change="+2.1% vs. last month"
            />
          </div>

          <div className="flex items-center gap-4 mb-8">
            <Select defaultValue="all">
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Alle Pipelines" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Pipelines</SelectItem>
                <SelectItem value="sales">Sales Pipeline</SelectItem>
                <SelectItem value="marketing">Marketing Pipeline</SelectItem>
              </SelectContent>
            </Select>

            <Button className="gap-2">
              Neue Pipeline
            </Button>

            <Select defaultValue="all-interests">
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Alle Interests" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-interests">Alle Interests</SelectItem>
                <SelectItem value="high">High Interest</SelectItem>
                <SelectItem value="medium">Medium Interest</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all-values">
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Alle Werte" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-values">Alle Werte</SelectItem>
                <SelectItem value="high">Hohe Werte</SelectItem>
                <SelectItem value="medium">Mittlere Werte</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-6">Alle Pipelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* New Column */}
            <div>
              <h3 className="text-sm font-medium mb-4">New (1)</h3>
              <div className="space-y-4">
                <PipelineCard
                  name="Michael Schmidt"
                  company="TechCorp GmbH"
                  position="Head of Sales"
                  interest="High Interest"
                  value={50000}
                  status="new"
                  onClick={() => setSelectedLead({
                    name: "Michael Schmidt",
                    company: "TechCorp GmbH",
                    position: "Head of Sales",
                    location: "Berlin, Germany"
                  })}
                />
              </div>
            </div>

            {/* Contacted Column */}
            <div>
              <h3 className="text-sm font-medium mb-4">Contacted (1)</h3>
              <div className="space-y-4">
                <PipelineCard
                  name="Sarah Weber"
                  company="Digital Solutions AG"
                  position="CEO"
                  interest="Medium Interest"
                  value={75000}
                  status="contacted"
                  onClick={() => setSelectedLead({
                    name: "Sarah Weber",
                    company: "Digital Solutions AG",
                    position: "CEO",
                    location: "Munich, Germany"
                  })}
                />
              </div>
            </div>

            {/* Meeting Column */}
            <div>
              <h3 className="text-sm font-medium mb-4">Meeting (1)</h3>
              <div className="space-y-4">
                <PipelineCard
                  name="Thomas Müller"
                  company="Innovation Labs"
                  position="Marketing Director"
                  interest="High Interest"
                  value={100000}
                  status="meeting"
                  onClick={() => setSelectedLead({
                    name: "Thomas Müller",
                    company: "Innovation Labs",
                    position: "Marketing Director",
                    location: "Hamburg, Germany"
                  })}
                />
              </div>
            </div>
          </div>
        </div>

        {selectedLead && (
          <LeadDeepResearchDialog
            lead={selectedLead}
            open={!!selectedLead}
            onClose={() => setSelectedLead(null)}
          />
        )}
      </div>
    </Layout>
  );
};

export default Pipeline;
