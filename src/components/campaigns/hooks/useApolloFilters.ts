
import { useState } from "react";
import { ApolloFilters } from "../types/apollo-filters";

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

  const handleFilterChange = (key: keyof ApolloFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));

    console.log("Apollo.io Filter Update:", {
      ...filters,
      [key]: value
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

    console.log("Intent Signals Update:", {
      ...filters.intent,
      [key]: !filters.intent[key]
    });
  };

  return {
    filters,
    handleFilterChange,
    handleIntentChange
  };
};
