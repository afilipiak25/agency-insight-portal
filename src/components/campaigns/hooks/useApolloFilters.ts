
import { useState, useEffect } from "react";
import { ApolloFilters, ApolloLead } from "../types/apollo-filters";
import { searchApolloLeads } from "../services/apolloApi";
import { useToast } from "@/hooks/use-toast";

export const useApolloFilters = () => {
  const [filters, setFilters] = useState<ApolloFilters>({
    companyName: "",
    industry: "",
    subIndustry: "",
    businessModel: "",
    companyKeywords: "",
    descriptionKeywords: "",
    employeesMin: "",
    employeesMax: "",
    revenueMin: "",
    revenueMax: "",
    technologies: "",
    fundingStatus: "",
    contactLevel: "",
    ageMin: "",
    ageMax: "",
    growthRate: "",
    hiringStatus: "",
    department: "",
    countries: [],
    city: "",
    region: "",
    postalCode: "",
    titles: [],
    jobTitles: [],
    seniority: [],
    excludedTitles: "", // Neu hinzugefügt
    fundingMin: "",
    fundingMax: "",
    fundingRounds: "",
    foundedMin: "",
    foundedMax: "",
    sicCodes: [],
    naicsCodes: [],
    leadQuality: "",
    emailStatus: "",
    sortBy: "",
    sortDirection: "desc",
    intent: {
      activelyHiring: false,
      highGrowth: false,
      recentlyFunded: false,
      buyingIntent: false,
      recentTechnology: false
    }
  });

  const [filteredLeads, setFilteredLeads] = useState<ApolloLead[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchLeads = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await searchApolloLeads(filters);
      setFilteredLeads(response.leads);
      setTotalResults(response.total);
    } catch (error) {
      console.error('Error fetching leads:', error);
      setError('Fehler beim Laden der Leads');
      setFilteredLeads([]);
      setTotalResults(0);
      toast({
        title: "Fehler beim Laden der Leads",
        description: "Bitte versuchen Sie es später erneut oder passen Sie Ihre Filterkriterien an.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (Object.values(filters).some(value => value)) {
        fetchLeads();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [filters]);

  const handleFilterChange = (key: keyof ApolloFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleIntentChange = (key: keyof typeof filters.intent) => {
    setFilters(prev => ({
      ...prev,
      intent: {
        ...prev.intent,
        [key]: !prev.intent[key]
      }
    }));
  };

  return {
    filters,
    filteredLeads,
    isLoading,
    totalResults,
    error,
    handleFilterChange,
    handleIntentChange
  };
};
