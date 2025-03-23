
import { PreviewSection } from "./PreviewSection";
import { LeadDeepResearchDialog } from "./LeadDeepResearchDialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Search, User, Building, MapPin, Shield, Code, Database, Filter } from "lucide-react";
import { useState } from "react";
import { ApolloLead } from "./types/apollo-filters";
import { LeadTableView } from "./LeadTableView";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Generate 50 mock leads
const generateMockLeads = (): ApolloLead[] => {
  const companies = [
    "TechSolutions GmbH", "Digital Dynamics AG", "Cloudsoft Systems", "InnovateTech", 
    "WebWorks Group", "DataDrive Solutions", "NextGen Software", "SmartTech Inc.",
    "GlobalTech Partners", "Cyber Innovations", "MediaMaster", "FutureSoft GmbH",
    "EuroTech Solutions", "Alpine Systems AG", "Deutsche Digital", "Berlin Bytes",
    "Munich Mobile", "Hamburg Tech Hub", "Frankfurt FinTech", "Bavarian Software"
  ];
  
  const positions = [
    "Head of Marketing", "CTO", "CEO", "Software Engineer", "Marketing Manager", 
    "Sales Director", "Product Manager", "CFO", "COO", "IT Director", 
    "VP of Sales", "UX Designer", "Data Analyst", "HR Director", "Operations Manager"
  ];
  
  const technologies = [
    "React", "Angular", "Vue.js", "Node.js", "Python", "Java", "AWS", "Azure", 
    "Google Cloud", "Docker", "Kubernetes", "MongoDB", "PostgreSQL", "MySQL", 
    "GraphQL", "PHP", "Ruby", "Swift", "Kotlin", ".NET", "Salesforce", "SAP"
  ];
  
  const industries = [
    "Software", "Finance", "Healthcare", "Manufacturing", "Retail", "Education",
    "Transportation", "Energy", "Media", "Telecom", "Insurance", "Real Estate"
  ];
  
  const cities = [
    "Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne", "Stuttgart", 
    "Düsseldorf", "Leipzig", "Dresden", "Nuremberg", "Vienna", "Zurich"
  ];
  
  const companySizes = [
    "1-10", "11-50", "51-200", "201-500", "501-1000", "1001-5000", "5001-10000", "10000+"
  ];
  
  const departments = [
    "Marketing", "Engineering", "Sales", "HR", "Finance", "Operations", 
    "Product", "Design", "Customer Support", "IT", "R&D", "Legal"
  ];
  
  const firstNames = [
    "Alexander", "Sophia", "Max", "Emma", "Paul", "Laura", "Thomas", "Julia", 
    "Michael", "Anna", "Daniel", "Lisa", "Felix", "Sarah", "David", "Marie", 
    "Christian", "Nina", "Patrick", "Lena", "Andreas", "Hannah", "Stefan", "Katharina"
  ];
  
  const lastNames = [
    "Schmidt", "Müller", "Schneider", "Fischer", "Weber", "Schulz", "Wagner", 
    "Becker", "Hoffmann", "Koch", "Richter", "Wolf", "Bauer", "Klein", "Schröder", 
    "Neumann", "Schwarz", "Zimmermann", "Braun", "Krüger", "Hofmann", "Hartmann"
  ];

  return Array.from({ length: 50 }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const company = companies[Math.floor(Math.random() * companies.length)];
    const position = positions[Math.floor(Math.random() * positions.length)];
    const industry = industries[Math.floor(Math.random() * industries.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const companySize = companySizes[Math.floor(Math.random() * companySizes.length)];
    const department = departments[Math.floor(Math.random() * departments.length)];
    
    // Random selection of 1-3 technologies
    const techCount = Math.floor(Math.random() * 3) + 1;
    const techSet = new Set<string>();
    for (let j = 0; j < techCount; j++) {
      techSet.add(technologies[Math.floor(Math.random() * technologies.length)]);
    }
    const tech = Array.from(techSet);

    return {
      id: `lead-${i + 1}`,
      name: `${firstName} ${lastName}`,
      firstName,
      lastName,
      company,
      position,
      industry,
      location: city,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company.toLowerCase().replace(/\s+/g, '')}.com`,
      phone: `+49 ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 9000000) + 1000000}`,
      companySize,
      department,
      technology: tech,
      linkedin: `https://linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}-${Math.floor(Math.random() * 10000)}`,
      companyDomain: `${company.toLowerCase().replace(/\s+/g, '')}.com`,
      score: Math.floor(Math.random() * 100) + 1,
    };
  });
};

const mockLeads = generateMockLeads();

interface LeadPreviewProps {
  showEmailPreview?: boolean;
  selectedDataSource?: string;
  position?: "left" | "right";
  isApolloConnected?: boolean;
  leads?: ApolloLead[];
  isLoading?: boolean;
  totalResults?: number;
  showTableView?: boolean;
}

export const LeadPreview = ({ 
  showEmailPreview = false, 
  selectedDataSource = "",
  position = "right",
  isApolloConnected = false,
  leads = mockLeads,
  isLoading = false,
  totalResults = 54632,
  showTableView = false
}: LeadPreviewProps) => {
  const [selectedLead, setSelectedLead] = useState<ApolloLead | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  if (showEmailPreview) {
    return <PreviewSection />;
  }

  if (showTableView) {
    return <LeadTableView leads={leads} isLoading={isLoading} />;
  }

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.position?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="bg-white rounded-lg border shadow-sm p-4 space-y-4 transition-all duration-300 hover:shadow-md">
        <div className="space-y-1">
          <h2 className="font-semibold text-lg bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">Preview Leads</h2>
          <p className="text-sm text-violet-600 font-medium">
            {isApolloConnected ? `${totalResults.toLocaleString()} leads gefunden` : "54,632 leads total"}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Suchen nach Name, Unternehmen..."
              className="pl-9 bg-gray-50 border-gray-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            className={`${showFilters ? 'bg-orange-100 text-orange-600' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        {showFilters && (
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 space-y-2 animate-fade-in">
            <h3 className="text-sm font-medium text-gray-700">Filter Optionen</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="ghost" size="sm" className="justify-start">
                <Database className="w-3.5 h-3.5 mr-1.5" />
                Branche
              </Button>
              <Button variant="ghost" size="sm" className="justify-start">
                <Building className="w-3.5 h-3.5 mr-1.5" />
                Unternehmensgröße
              </Button>
              <Button variant="ghost" size="sm" className="justify-start">
                <MapPin className="w-3.5 h-3.5 mr-1.5" />
                Standort
              </Button>
              <Button variant="ghost" size="sm" className="justify-start">
                <Code className="w-3.5 h-3.5 mr-1.5" />
                Technologie
              </Button>
            </div>
          </div>
        )}
        
        <div className="space-y-3">
          {isLoading ? (
            <div className="flex items-center justify-center h-44">
              <Loader2 className="w-6 h-6 text-orange-500 animate-spin" />
            </div>
          ) : (
            <ScrollArea className="h-[350px] pr-4">
              <div className="space-y-3">
                {filteredLeads.length > 0 ? (
                  filteredLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="p-3 bg-gray-50 rounded-lg border border-gray-100 cursor-pointer hover:border-orange-400/60 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium truncate">{lead.name}</span>
                            <span className="text-xs bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-full">{lead.score || Math.floor(Math.random() * 100) + 1}</span>
                          </div>
                          <div className="text-xs text-gray-600 font-medium mb-1 truncate">{lead.position}</div>
                          <div className="flex flex-wrap gap-1 text-xs text-gray-500">
                            {lead.company && (
                              <div className="flex items-center gap-0.5">
                                <Building className="w-3 h-3" />
                                <span>{lead.company}</span>
                              </div>
                            )}
                            {lead.location && (
                              <div className="flex items-center gap-0.5 ml-2">
                                <MapPin className="w-3 h-3" />
                                <span>{lead.location}</span>
                              </div>
                            )}
                          </div>
                          
                          {lead.department && (
                            <div className="mt-2 text-xs text-orange-600/90 font-medium">
                              <Shield className="w-3 h-3 inline mr-1" />
                              {lead.department} • {lead.companySize} employees
                            </div>
                          )}
                          
                          {lead.technology && lead.technology.length > 0 && (
                            <div className="flex gap-1 flex-wrap mt-2">
                              {lead.technology.map((tech, i) => (
                                <span 
                                  key={i} 
                                  className="bg-pink-500/10 text-pink-600 px-1.5 py-0.5 rounded-full text-[10px] flex items-center"
                                >
                                  <Code className="w-2 h-2 mr-0.5" />
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>Keine Leads gefunden</p>
                    <p className="text-sm">Bitte passen Sie Ihre Suchparameter an</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          )}
        </div>
        
        <div className="pt-2 border-t">
          <Button 
            variant="gradient" 
            size="sm" 
            className="w-full justify-center"
            onClick={() => {}}
          >
            Alle Leads anzeigen
          </Button>
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
  );
};
