import React, { useState } from "react";
import { 
  Check, X, ChevronDown, Download, Filter, Plus, 
  Mail, Link as LinkIcon, Search, MoreHorizontal,
  RefreshCw, Globe, Zap, FileText, User, Instagram,
  LinkedinIcon, Eye, MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ApolloLead } from "./types/apollo-filters";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LeadDeepResearchDialog } from "./LeadDeepResearchDialog";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { StepEditDialog } from "./workflow/StepEditDialog";
import { WorkflowStep } from "./types/workflow";

interface LeadTableViewProps {
  leads: ApolloLead[];
  isLoading: boolean;
}

// Mock data based on screenshots
const mockLeads: ApolloLead[] = [
  {
    id: "1",
    name: "Sandra Franziska Schmitt",
    position: "Managing Partner & Founder",
    company: "Globemee",
    location: "Greater Nuremberg Metropolitan Area",
    email: "sandra.schmitt@globemee.com",
    department: "Management",
    companySize: "1-10",
    technology: ["Marketing Automation", "CRM"],
    lastUpdated: "2023-10-15",
    industry: "Recruitment",
    companyDomain: "globemee.com",
    linkedin: "https://www.linkedin.com/in/sandra-franziska-schmitt",
  },
  {
    id: "2",
    name: "Elisabeth Pongratz",
    position: "Partner",
    company: "COMES Digital GmbH",
    location: "Greater Munich Metropolitan Area",
    email: "ep@comesdigital.de",
    department: "Marketing",
    companySize: "11-50",
    technology: ["SEO", "SEM"],
    lastUpdated: "2023-11-20",
    industry: "Digital Marketing",
    companyDomain: "comesdigital.de",
    linkedin: "https://www.linkedin.com/in/elisabethpongratz",
  },
  {
    id: "3",
    name: "Gunnar Belden",
    position: "Owner, Managing Director",
    company: "maturias Personalberatung",
    location: "Potsdam, Brandenburg, Germany",
    email: "gunnar.belden@maturias.de",
    department: "Executive",
    companySize: "1-10",
    technology: ["ATS", "HR Software"],
    lastUpdated: "2023-09-05",
    industry: "HR & Recruiting",
    companyDomain: "maturias.de",
    linkedin: "https://www.linkedin.com/in/gunnar-belden-9aa9b52",
  },
  {
    id: "4",
    name: "Jasmin Ohme",
    position: "Founder & CEO",
    company: "Das Kontaktwerk",
    location: "Hamburg, Germany",
    email: "j.ohme@daskontaktwerk.de",
    department: "Management",
    companySize: "11-50",
    technology: ["CRM", "Marketing Automation"],
    lastUpdated: "2023-12-10",
    industry: "Business Services",
    companyDomain: "daskontaktwerk.de",
    linkedin: "https://www.linkedin.com/in/jasmin-ohme-46b148155",
  },
  {
    id: "5",
    name: "Baris Kartal",
    position: "Managing Partner",
    company: "Signium Deutschland",
    location: "Frankfurt Rhine-Main Metropolitan Region",
    email: "baris.kartal@signium.de",
    department: "Executive",
    companySize: "11-50",
    technology: ["Talent Management"],
    lastUpdated: "2023-10-18",
    industry: "Executive Search",
    companyDomain: "signium.de",
    linkedin: "https://www.linkedin.com/in/baris-kartal-53851448",
  },
  {
    id: "6",
    name: "Natalia Wallroth",
    position: "Co-Founder & CEO",
    company: "2hearts",
    location: "Berlin Metropolitan Area",
    email: "",
    department: "Management",
    companySize: "1-10",
    technology: ["HR Tech"],
    lastUpdated: "2023-11-12",
    industry: "HR Technology",
    companyDomain: "mintdcareers.com",
    linkedin: "https://www.linkedin.com/in/nataliawallroth",
  },
  {
    id: "7",
    name: "Daniel Sedgwick",
    position: "Co-Founder",
    company: "Satellite Talent",
    location: "Berlin, Berlin, Germany",
    email: "daniel@satellite-talent.com",
    department: "Management",
    companySize: "1-10",
    technology: ["Recruiting Software"],
    lastUpdated: "2023-09-28",
    industry: "Recruiting",
    companyDomain: "satellite-talent.com",
    linkedin: "https://www.linkedin.com/in/danielsedgwicktalentpartner",
  },
  {
    id: "8",
    name: "Luke Williams",
    position: "Founder",
    company: "TalentStax LTD",
    location: "Munich, Bavaria, Germany",
    email: "",
    department: "Management",
    companySize: "1-10",
    technology: [],
    lastUpdated: "2023-08-15",
    industry: "Recruiting",
    companyDomain: "",
    linkedin: "https://www.linkedin.com/in/luke-williams-headhunter",
  },
  {
    id: "9",
    name: "Bosko Todorovic",
    position: "Partner",
    company: "HireOnFire",
    location: "Berlin Metropolitan Area",
    email: "bosko@hireonfire.ai",
    department: "Management",
    companySize: "11-50",
    technology: ["AI Recruiting", "Machine Learning"],
    lastUpdated: "2023-10-02",
    industry: "HR Technology",
    companyDomain: "hireonfire.ai",
    linkedin: "https://www.linkedin.com/in/boskotodorovic",
  },
  {
    id: "10",
    name: "Faruk Ekici",
    position: "Founder & Director",
    company: "FEIY Recruitment GmbH",
    location: "Frankfurt, Hesse, Germany",
    email: "f.ekici@feiyrecruitment.com",
    department: "Management",
    companySize: "11-50",
    technology: ["CRM", "ATS"],
    lastUpdated: "2023-11-05",
    industry: "Recruitment",
    companyDomain: "feiyrecruitment.com",
    linkedin: "https://www.linkedin.com/in/faruk-ekici-b4aa20188",
  },
  {
    id: "11",
    name: "Guillaume Mico",
    position: "Founder",
    company: "MI Career",
    location: "Biberach an der Riß, Baden-Württemberg, Germany",
    email: "guillaume.mico@micareer.eu",
    department: "Management",
    companySize: "1-10",
    technology: ["HR Software"],
    lastUpdated: "2023-09-12",
    industry: "HR & Recruiting",
    companyDomain: "micareer.eu",
    linkedin: "https://www.linkedin.com/in/guillaume-mico-88363415",
  },
  {
    id: "12",
    name: "Niklas Mühlenbein",
    position: "Associate Partner",
    company: "CTG Consulting GmbH",
    location: "Berlin Metropolitan Area",
    email: "",
    department: "Consulting",
    companySize: "11-50",
    technology: ["Business Intelligence"],
    lastUpdated: "2023-10-20",
    industry: "Management Consulting",
    companyDomain: "ctg-consulting.com",
    linkedin: "https://www.linkedin.com/in/niklas-mühlenbein-58974a44",
  },
  {
    id: "13",
    name: "Fabian Scholz",
    position: "Co-founder & Managing Director",
    company: "EWOR",
    location: "Hamburg, Germany",
    email: "fabian.scholz@welcome-to-europe.com",
    department: "Management",
    companySize: "11-50",
    technology: ["EdTech"],
    lastUpdated: "2023-11-18",
    industry: "Education Technology",
    companyDomain: "welcome-to-europe.com",
    linkedin: "https://www.linkedin.com/in/scholzfabian",
  },
  {
    id: "14",
    name: "Achim Dohl",
    position: "Associate Partner",
    company: "Boborykin & Partner",
    location: "Bensheim, Hesse, Germany",
    email: "achim.dohl@boborykin.de",
    department: "Consulting",
    companySize: "11-50",
    technology: ["Business Software"],
    lastUpdated: "2023-10-15",
    industry: "Management Consulting",
    companyDomain: "boborykin.de",
    linkedin: "https://www.linkedin.com/in/achimdohl",
  },
  {
    id: "15",
    name: "Frank Goerlich",
    position: "Founder & CEO",
    company: "braveheads Führungsköpfe",
    location: "Münster, North Rhine-Westphalia, Germany",
    email: "frank.goerlich@braveheads.de",
    department: "Management",
    companySize: "1-10",
    technology: ["Recruiting Software"],
    lastUpdated: "2023-09-08",
    industry: "Executive Search",
    companyDomain: "braveheads.de",
    linkedin: "https://www.linkedin.com/in/braveheads-frank-goerlich",
  },
];

export const LeadTableView = ({ leads = [], isLoading }: LeadTableViewProps) => {
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [selectedLead, setSelectedLead] = useState<ApolloLead | null>(null);
  const [showEmailFinderDialog, setShowEmailFinderDialog] = useState(false);
  const [currentLeadForEmail, setCurrentLeadForEmail] = useState<ApolloLead | null>(null);
  
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([
    {
      id: 1,
      sequenceNum: 1,
      type: 'email',
      icon: <Mail className="w-4 h-4 text-purple-600" />,
      title: 'First Mail',
      content: '<p>Personalized first outreach email</p>',
      waitDays: 2,
      channel: 'email',
    },
    {
      id: 2,
      sequenceNum: 2,
      type: 'linkedin',
      icon: <LinkedinIcon className="w-4 h-4 text-blue-600" />,
      title: 'LinkedIn Message',
      content: '<p>LinkedIn connection message</p>',
      waitDays: 2,
      channel: 'linkedin',
    },
    {
      id: 3,
      sequenceNum: 3,
      type: 'profile-visit',
      icon: <Eye className="w-4 h-4 text-gray-600" />,
      title: 'Profile Visit',
      content: '<p>Visit LinkedIn profile</p>',
      waitDays: 1,
      channel: 'profile-visit',
    },
    {
      id: 4,
      sequenceNum: 4,
      type: 'instagram',
      icon: <Instagram className="w-4 h-4 text-pink-600" />,
      title: 'Instagram DM',
      content: '<p>Instagram direct message</p>',
      waitDays: 2,
      channel: 'instagram',
    },
    {
      id: 5,
      sequenceNum: 5,
      type: 'email',
      icon: <Mail className="w-4 h-4 text-purple-600" />,
      title: 'Follow-up Email',
      content: '<p>Follow-up email</p>',
      waitDays: 0,
      channel: 'email',
    }
  ]);
  
  const [selectedStepId, setSelectedStepId] = useState<number | null>(null);
  
  const displayLeads = leads.length > 0 ? leads : mockLeads;

  const toggleSelectAll = () => {
    if (selectedLeads.length === displayLeads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(displayLeads.map(lead => lead.id));
    }
  };

  const toggleSelectLead = (id: string) => {
    if (selectedLeads.includes(id)) {
      setSelectedLeads(selectedLeads.filter(leadId => leadId !== id));
    } else {
      setSelectedLeads([...selectedLeads, id]);
    }
  };

  const handleOpenEmailFinder = (lead: ApolloLead) => {
    setCurrentLeadForEmail(lead);
    setShowEmailFinderDialog(true);
  };

  const handleStepClick = (stepId: number) => {
    setSelectedStepId(stepId);
  };

  const updateSteps = (newSteps: WorkflowStep[]) => {
    setWorkflowSteps(newSteps);
  };

  const updateWaitDays = (stepId: number, increment: boolean) => {
    setWorkflowSteps(workflowSteps.map(step => 
      step.id === stepId 
        ? {...step, waitDays: increment ? step.waitDays + 1 : Math.max(0, step.waitDays - 1)} 
        : step
    ));
  };

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="table-topbar flex items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-2">
          <Button 
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600"
          >
            <Plus className="w-4 h-4 mr-1" /> Add Enrichment
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-white">
                Actions <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Download className="w-4 h-4 mr-2" /> Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Filter className="w-4 h-4 mr-2" /> Apply Filters
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Mail className="w-4 h-4 mr-2" /> Enrich with Email
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline" className="bg-white">
            <Filter className="w-4 h-4 mr-1" /> No filters
          </Button>
        </div>
        
        <div className="text-sm text-gray-600">
          <span className="font-medium">Apollo Database</span>
          <span className="mx-2">•</span>
          <span>Default View</span>
          <span className="mx-2">•</span>
          <span>{displayLeads.length} rows</span>
        </div>
      </div>

      <div id="leadTableContainer" className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="lead-table min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-4 py-3 text-left sticky left-0 bg-gray-50 z-10">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300"
                  checked={selectedLeads.length === displayLeads.length && displayLeads.length > 0}
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap">First Name</th>
              <th className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap">Last Name</th>
              <th className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap">Full Name</th>
              <th className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap">Job Title</th>
              <th className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap">Location</th>
              <th className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap">Company Domain</th>
              <th className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap">LinkedIn Profile</th>
              <th className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap">Scrape Website</th>
              <th className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap">Enrich Person</th>
              <th className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap">Find Email</th>
              <th className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap">Find Work Email (1)</th>
              <th className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap">Find Work Email (2)</th>
              <th className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap">Find Work Email (3)</th>
              <th className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap">Find Work Email (4)</th>
              <th className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap">Find Work Email (5)</th>
              <th className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap">Connections</th>
              <th className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap">Followers</th>
              <th className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap">Industry</th>
              <th className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap">Company Size</th>
              <th className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap">Technologies</th>
              
              {workflowSteps.map((step) => (
                <th 
                  key={step.id} 
                  className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap cursor-pointer hover:bg-gray-100"
                  onClick={() => handleStepClick(step.id)}
                >
                  <div className="flex items-center gap-1">
                    {step.icon}
                    {step.title}
                  </div>
                </th>
              ))}
              
              <th className="px-4 py-3 text-left font-medium text-sm text-gray-500 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayLeads.length === 0 ? (
              <tr>
                <td colSpan={27} className="px-4 py-8 text-center text-gray-500">
                  No leads found. Try adjusting your filters.
                </td>
              </tr>
            ) : (
              displayLeads.map(lead => {
                const firstName = lead.name.split(' ')[0];
                const lastName = lead.name.split(' ').slice(1).join(' ');
                const hasEmail = !!lead.email;
                
                return (
                  <tr 
                    key={lead.id} 
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedLead(lead)}
                  >
                    <td 
                      className="px-4 py-3 sticky left-0 bg-white z-10"
                      onClick={e => {
                        e.stopPropagation();
                        toggleSelectLead(lead.id);
                      }}
                    >
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-300"
                        checked={selectedLeads.includes(lead.id)}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleSelectLead(lead.id);
                        }}
                      />
                    </td>
                    
                    <td className="px-4 py-3 whitespace-nowrap">{firstName}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{lastName}</td>
                    <td className="px-4 py-3 font-medium whitespace-nowrap">{lead.name}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{lead.position}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{lead.location}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {lead.companyDomain ? (
                        <a href={`https://${lead.companyDomain}`} target="_blank" rel="noopener noreferrer" 
                           className="text-blue-600 hover:underline flex items-center" 
                           onClick={(e) => e.stopPropagation()}>
                          <Globe className="w-3 h-3 mr-1" /> {lead.companyDomain}
                        </a>
                      ) : (
                        <span className="text-red-500">Missing input</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {lead.linkedin ? (
                        <a href={lead.linkedin} target="_blank" rel="noopener noreferrer" 
                           className="text-blue-600 hover:underline flex items-center"
                           onClick={(e) => e.stopPropagation()}>
                          <LinkIcon className="w-3 h-3 mr-1" /> Profile
                        </a>
                      ) : (
                        <span className="text-red-500 flex items-center">
                          <X className="w-3 h-3 mr-1" /> Not found
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Button size="sm" variant="outline" className="text-xs py-1 h-7"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}>
                        <Globe className="w-3 h-3 mr-1" /> Scrape
                      </Button>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Button size="sm" variant="outline" className="text-xs py-1 h-7"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}>
                        <User className="w-3 h-3 mr-1" /> Enrich
                      </Button>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {hasEmail ? (
                        <span className="flex items-center text-green-600">
                          <Check className="w-4 h-4 mr-1" /> {lead.email}
                        </span>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-xs py-1 h-7"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenEmailFinder(lead);
                          }}
                        >
                          <Search className="w-3 h-3 mr-1" /> Find Email
                        </Button>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-sm whitespace-nowrap">
                      {hasEmail ? (
                        <span className="flex items-center text-green-600">
                          <Check className="w-4 h-4 mr-1" /> {lead.email}
                        </span>
                      ) : (
                        <span className="text-gray-500 text-sm">Run condition not met</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-sm whitespace-nowrap">
                      {hasEmail ? (
                        <span className="flex items-center text-green-600">
                          <Check className="w-4 h-4 mr-1" /> {lead.email}
                        </span>
                      ) : (
                        <span className="text-gray-500 text-sm">Run condition not met</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-sm whitespace-nowrap">
                      {hasEmail ? (
                        <span className="flex items-center text-green-600">
                          <Check className="w-4 h-4 mr-1" /> {lead.email}
                        </span>
                      ) : (
                        <span className="text-gray-500 text-sm">Run condition not met</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-sm whitespace-nowrap">
                      {hasEmail ? (
                        <span className="flex items-center text-green-600">
                          <Check className="w-4 h-4 mr-1" /> {lead.email}
                        </span>
                      ) : (
                        <span className="text-gray-500 text-sm">Run condition not met</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-sm whitespace-nowrap">
                      {hasEmail ? (
                        <span className="flex items-center text-green-600">
                          <Check className="w-4 h-4 mr-1" /> {lead.email}
                        </span>
                      ) : (
                        <span className="text-gray-500 text-sm">Run condition not met</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                      {Math.floor(Math.random() * 10000)}
                    </td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                      {Math.floor(Math.random() * 10000)}
                    </td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                      {lead.industry || "Unknown"}
                    </td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                      {lead.companySize || "Unknown"}
                    </td>
                    <td className="px-4 py-3 min-w-[200px]">
                      {lead.technology && lead.technology.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {lead.technology.slice(0, 2).map((tech, i) => (
                            <span key={i} className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-xs">
                              {tech}
                            </span>
                          ))}
                          {lead.technology.length > 2 && (
                            <Popover>
                              <PopoverTrigger asChild>
                                <button 
                                  className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  +{lead.technology.length - 2}
                                </button>
                              </PopoverTrigger>
                              <PopoverContent className="w-48" onClick={(e) => e.stopPropagation()}>
                                <div className="text-sm font-medium mb-2">All Technologies</div>
                                <div className="flex flex-wrap gap-1">
                                  {lead.technology.map((tech, i) => (
                                    <span key={i} className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-xs">
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </PopoverContent>
                            </Popover>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">No data</span>
                      )}
                    </td>
                    
                    {workflowSteps.map((step) => (
                      <td 
                        key={step.id}
                        className="px-4 py-3 cursor-pointer hover:bg-gray-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStepClick(step.id);
                        }}
                      >
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                        >
                          {step.type === 'email' && <Mail className="h-4 w-4" />}
                          {step.type === 'linkedin' && <LinkedinIcon className="h-4 w-4" />}
                          {step.type === 'profile-visit' && <Eye className="h-4 w-4" />}
                          {step.type === 'instagram' && <Instagram className="h-4 w-4" />}
                        </Button>
                      </td>
                    ))}
                    
                    <td className="px-4 py-3 whitespace-nowrap">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Add to Campaign</DropdownMenuItem>
                          <DropdownMenuItem>Edit Lead</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {selectedLead && (
        <LeadDeepResearchDialog
          lead={selectedLead}
          open={!!selectedLead}
          onClose={() => setSelectedLead(null)}
        />
      )}

      {selectedStepId && (
        <StepEditDialog 
          selectedStepId={selectedStepId}
          steps={workflowSteps}
          updateSteps={updateSteps}
          updateWaitDays={updateWaitDays}
        />
      )}

      {showEmailFinderDialog && currentLeadForEmail && (
        <Dialog open={showEmailFinderDialog} onOpenChange={setShowEmailFinderDialog}>
          <DialogContent className="max-w-md">
            <DialogTitle>Find Email for {currentLeadForEmail.name}</DialogTitle>
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-2 border-purple-500 rounded-full border-t-transparent"></div>
              </div>
              <p className="text-center text-sm text-gray-500">Searching for email addresses...</p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
