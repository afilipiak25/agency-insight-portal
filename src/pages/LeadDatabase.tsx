
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Search, MoreVertical } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

interface Lead {
  id: number;
  name: string;
  campaign: string;
  phone: string;
  status: "New" | "Contacted" | "Qualified";
  owner: string;
  isCampaignHot?: boolean;
}

const mockLeads: Lead[] = [
  {
    id: 1,
    name: "Marc Nagel",
    campaign: "Anthony's campaign",
    phone: "+49 176 12345678",
    status: "New",
    owner: "Anthony Filipiak",
    isCampaignHot: true,
  },
  {
    id: 2,
    name: "Sarah Weber",
    campaign: "BAFA",
    phone: "+49 123 4567890",
    status: "Contacted",
    owner: "Anthony Filipiak",
  },
  {
    id: 3,
    name: "Thomas Müller",
    campaign: "BAFA",
    phone: "+49 157 98765432",
    status: "Qualified",
    owner: "Anthony Filipiak",
  },
];

const LeadDatabase = () => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-50 text-blue-600";
      case "Contacted":
        return "bg-gray-50 text-gray-600";
      case "Qualified":
        return "bg-green-50 text-green-600";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-6">Lead Database</h1>
          
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Namen suchen..."
                className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amplifa-purple/30"
              />
            </div>

            <Select defaultValue="all-campaigns">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Alle Kampagnen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-campaigns">Alle Kampagnen</SelectItem>
                <SelectItem value="anthony">Anthony's campaign</SelectItem>
                <SelectItem value="bafa">BAFA</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all-status">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Alle Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-status">Alle Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all-owners">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Alle Owner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-owners">Alle Owner</SelectItem>
                <SelectItem value="anthony">Anthony Filipiak</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">
                  <Checkbox />
                </TableHead>
                <TableHead>Full name</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead className="w-[40px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {lead.campaign}
                      {lead.isCampaignHot && (
                        <div className="w-2 h-2 rounded-full bg-orange-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{lead.phone}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-sm ${getStatusStyle(lead.status)}`}>
                      {lead.status}
                    </span>
                  </TableCell>
                  <TableCell>{lead.owner}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Bearbeiten</DropdownMenuItem>
                        <DropdownMenuItem>Status ändern</DropdownMenuItem>
                        <DropdownMenuItem>Owner ändern</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Löschen</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default LeadDatabase;
