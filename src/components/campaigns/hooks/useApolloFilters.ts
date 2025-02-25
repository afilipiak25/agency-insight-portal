
import { useState } from "react";
import { ApolloFilters, ApolloLead } from "../types/apollo-filters";

const mockLeads: ApolloLead[] = [
  {
    id: "1",
    name: "Dr. Michael Schmidt",
    position: "Chief Technology Officer",
    company: "TechVision GmbH",
    location: "Berlin, Germany",
    department: "Engineering",
    companySize: "50-200",
    technology: ["React", "Node.js", "AWS"],
    lastUpdated: "2024-02-25"
  },
  {
    id: "2",
    name: "Anna Weber",
    position: "Head of Marketing",
    company: "Digital Marketing Solutions",
    location: "Munich, Germany",
    department: "Marketing",
    companySize: "201-500",
    technology: ["HubSpot", "Salesforce"],
    lastUpdated: "2024-02-24"
  },
  // ... Generate more mock data for demonstration
];

// Generate 1000 leads based on the mock data template
const generateMockLeads = (): ApolloLead[] => {
  const positions = [
    "CEO", "CTO", "CFO", "Head of Marketing", "Head of Sales",
    "VP Engineering", "Product Manager", "Sales Director",
    "Marketing Manager", "Technical Lead"
  ];
  const companies = [
    "TechVision GmbH", "Digital Solutions AG", "Innovation Labs",
    "Future Systems", "Cloud Technologies", "Data Analytics Pro",
    "AI Solutions", "Smart Software GmbH", "Digital Marketing Solutions",
    "Tech Innovators"
  ];
  const cities = ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne", "Stuttgart"];
  const departments = ["Engineering", "Marketing", "Sales", "Product", "Operations"];
  const technologies = ["React", "Node.js", "AWS", "Azure", "GCP", "Salesforce", "HubSpot"];
  const companySizes = ["1-50", "51-200", "201-500", "501-1000", "1000+"];

  return Array.from({ length: 1000 }, (_, i): ApolloLead => ({
    id: `lead-${i + 1}`,
    name: `Person ${i + 1}`,
    position: positions[Math.floor(Math.random() * positions.length)],
    company: companies[Math.floor(Math.random() * companies.length)],
    location: `${cities[Math.floor(Math.random() * cities.length)]}, Germany`,
    department: departments[Math.floor(Math.random() * departments.length)],
    companySize: companySizes[Math.floor(Math.random() * companySizes.length)],
    technology: Array.from(
      { length: Math.floor(Math.random() * 3) + 1 },
      () => technologies[Math.floor(Math.random() * technologies.length)]
    ),
    lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0]
  }));
};

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
    intent: {
      activelyHiring: false,
      highGrowth: false,
      recentlyFunded: false
    }
  });

  const [filteredLeads, setFilteredLeads] = useState<ApolloLead[]>(generateMockLeads());

  const handleFilterChange = (key: keyof ApolloFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));

    // Apply filters to mock data
    const allLeads = generateMockLeads();
    const filtered = allLeads.filter(lead => {
      if (filters.companyName && !lead.company.toLowerCase().includes(filters.companyName.toLowerCase())) {
        return false;
      }
      if (filters.department && lead.department !== filters.department) {
        return false;
      }
      if (filters.employeesMin && filters.employeesMax) {
        const [min, max] = lead.companySize?.split('-').map(Number) || [0, 0];
        if (Number(filters.employeesMin) > min || Number(filters.employeesMax) < max) {
          return false;
        }
      }
      if (filters.technologies && !lead.technology?.some(tech => 
        tech.toLowerCase().includes(filters.technologies.toLowerCase())
      )) {
        return false;
      }
      return true;
    });

    setFilteredLeads(filtered);
    console.log("Apollo.io Filter Update:", {
      ...filters,
      [key]: value,
      resultCount: filtered.length
    });
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
    handleFilterChange,
    handleIntentChange
  };
};
