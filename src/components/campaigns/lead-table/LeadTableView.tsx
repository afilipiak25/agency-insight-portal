import React from "react";
import { ApolloLead } from "../types/apollo-filters";
import { WorkflowStep } from "../types/workflow";
import { TableActions } from "./TableActions";
import { LeadTableHeader } from "./LeadTableHeader";
import { LeadTableRow } from "./LeadTableRow";
import { EmailFinderDialog } from "./EmailFinderDialog";
import { useWorkflowSteps } from "./useWorkflowSteps";
import { useLeadSelection } from "./useLeadSelection";
import { LeadDeepResearchDialog } from "../LeadDeepResearchDialog";
import { StepEditDialog } from "../workflow/StepEditDialog";
import { PromptDialog } from "../workflow/PromptDialog";

interface LeadTableViewProps {
  leads: ApolloLead[];
  isLoading: boolean;
}

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
  const displayLeads = leads.length > 0 ? leads : mockLeads;
  
  const {
    workflowSteps,
    selectedStepId,
    selectedPromptStep,
    setSelectedStepId,
    setSelectedPromptStep,
    updateSteps,
    updateWaitDays,
    updateStepPrompt
  } = useWorkflowSteps();
  
  const {
    selectedLeads,
    selectedLead,
    showEmailFinderDialog,
    currentLeadForEmail,
    selectedPromptLead,
    setSelectedLead,
    setShowEmailFinderDialog,
    setSelectedPromptLead,
    toggleSelectAll,
    toggleSelectLead,
    handleOpenEmailFinder
  } = useLeadSelection(displayLeads);

  const handleStepClick = (stepId: number) => {
    setSelectedStepId(stepId);
  };
  
  const handlePromptClick = (step: WorkflowStep, lead: ApolloLead) => {
    setSelectedPromptStep(step);
    setSelectedPromptLead(lead);
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
      <TableActions totalLeads={displayLeads.length} />

      <div id="leadTableContainer" className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="lead-table min-w-full border-collapse">
          <LeadTableHeader
            toggleSelectAll={toggleSelectAll}
            selectedLeads={selectedLeads}
            totalLeads={displayLeads.length}
            workflowSteps={workflowSteps}
            onStepClick={handleStepClick}
          />
          <tbody>
            {displayLeads.length === 0 ? (
              <tr>
                <td colSpan={27} className="px-4 py-8 text-center text-gray-500">
                  No leads found. Try adjusting your filters.
                </td>
              </tr>
            ) : (
              displayLeads.map(lead => (
                <LeadTableRow
                  key={lead.id}
                  lead={lead}
                  selectedLeads={selectedLeads}
                  workflowSteps={workflowSteps}
                  toggleSelectLead={toggleSelectLead}
                  onLeadSelect={setSelectedLead}
                  onOpenEmailFinder={handleOpenEmailFinder}
                  onPromptClick={handlePromptClick}
                />
              ))
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
      
      {selectedPromptStep && selectedPromptLead && (
        <PromptDialog
          open={!!selectedPromptStep && !!selectedPromptLead}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedPromptStep(null);
              setSelectedPromptLead(null);
            }
          }}
          step={selectedPromptStep}
          lead={selectedPromptLead}
          onUpdatePrompt={updateStepPrompt}
        />
      )}

      {showEmailFinderDialog && currentLeadForEmail && (
        <EmailFinderDialog
          open={showEmailFinderDialog}
          onOpenChange={setShowEmailFinderDialog}
          lead={currentLeadForEmail}
        />
      )}
    </div>
  );
};
