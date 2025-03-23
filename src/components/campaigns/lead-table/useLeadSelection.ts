
import { useState } from "react";
import { ApolloLead } from "../types/apollo-filters";

export const useLeadSelection = (leads: ApolloLead[]) => {
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [selectedLead, setSelectedLead] = useState<ApolloLead | null>(null);
  const [showEmailFinderDialog, setShowEmailFinderDialog] = useState(false);
  const [currentLeadForEmail, setCurrentLeadForEmail] = useState<ApolloLead | null>(null);
  const [selectedPromptLead, setSelectedPromptLead] = useState<ApolloLead | null>(null);

  const toggleSelectAll = () => {
    if (selectedLeads.length === leads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(leads.map(lead => lead.id));
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

  return {
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
  };
};
