
import { useState, useEffect } from "react";
import { ApolloFilters, ApolloLead } from "../types/apollo-filters";
import { searchApolloLeads } from "../services/apolloApi";
import { useToast } from "@/hooks/use-toast";

// Generate mock lead data for the initial state
const generateMockLeads = (): ApolloLead[] => {
  const companies = [
    "TechSolutions GmbH", "Digital Dynamics AG", "Cloudsoft Systems", "InnovateTech", 
    "WebWorks Group", "DataDrive Solutions", "NextGen Software", "SmartTech Inc.",
    "GlobalTech Partners", "Cyber Innovations"
  ];
  
  const positions = [
    "Head of Marketing", "CTO", "CEO", "Software Engineer", "Marketing Manager", 
    "Sales Director", "Product Manager", "CFO", "COO", "IT Director"
  ];
  
  const locations = [
    "Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne", "Stuttgart", 
    "Düsseldorf", "Leipzig", "Dresden", "Nuremberg"
  ];

  const firstNames = [
    "Alexander", "Sophia", "Max", "Emma", "Paul", "Laura", "Thomas", "Julia", 
    "Michael", "Anna"
  ];
  
  const lastNames = [
    "Schmidt", "Müller", "Schneider", "Fischer", "Weber", "Schulz", "Wagner", 
    "Becker", "Hoffmann", "Koch"
  ];

  return Array.from({ length: 50 }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const company = companies[Math.floor(Math.random() * companies.length)];
    const position = positions[Math.floor(Math.random() * positions.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];

    return {
      id: `lead-${i + 1}`,
      name: `${firstName} ${lastName}`,
      firstName,
      lastName,
      position,
      company,
      location,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company.toLowerCase().replace(/\s+/g, '')}.com`,
      companySize: `${Math.floor(Math.random() * 1000) + 1}-${Math.floor(Math.random() * 5000) + 1000}`,
      department: ["Marketing", "Engineering", "Sales", "Product", "HR"][Math.floor(Math.random() * 5)],
      technology: ["React", "Angular", "Vue", "Node.js", "Python"].filter(() => Math.random() > 0.5),
      industry: ["Software", "Finance", "Healthcare", "Manufacturing", "Retail"][Math.floor(Math.random() * 5)]
    };
  });
};

const mockLeads = generateMockLeads();

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
    technologies: [],  // Changed from string to string[] to match interface
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
    excludedTitles: "",
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

  const [filteredLeads, setFilteredLeads] = useState<ApolloLead[]>(mockLeads);
  const [isLoading, setIsLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(mockLeads.length);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchLeads = async () => {
    // Always show mock data initially, regardless of filter state
    if (!hasActiveFilters(filters)) {
      setFilteredLeads(mockLeads);
      setTotalResults(mockLeads.length);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const response = await searchApolloLeads(filters);
      setFilteredLeads(response.leads.length > 0 ? response.leads : mockLeads);
      setTotalResults(response.total > 0 ? response.total : mockLeads.length);
    } catch (error) {
      console.error('Error fetching leads:', error);
      setError('Fehler beim Laden der Leads');
      // Fall back to mock data on error
      setFilteredLeads(mockLeads);
      setTotalResults(mockLeads.length);
      toast({
        title: "Fehler beim Laden der Leads",
        description: "Mock-Daten werden angezeigt. In einer Produktionsumgebung würden echte Leads geladen werden.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Prüft, ob aktive Filter vorhanden sind
  const hasActiveFilters = (filters: ApolloFilters): boolean => {
    return Object.entries(filters).some(([key, value]) => {
      if (key === 'intent') {
        return Object.values(value as any).some((v: any) => v === true);
      }
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== '' && value !== null && value !== undefined;
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLeads();
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
        ...prev.intent!,
        [key]: !prev.intent![key]
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
