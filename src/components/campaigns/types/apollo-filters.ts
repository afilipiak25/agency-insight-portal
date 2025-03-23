
export interface ApolloFilters {
  titles?: string[];
  excludedTitles?: string;
  companies?: string[];
  excludedCompanies?: string;
  jobFunctions?: string[];
  seniorities?: string[];
  industries?: string[];
  locations?: string[];
  keywords?: string;
  companySize?: string[];
  minEmployees?: number;
  maxEmployees?: number;
  minRevenue?: number;
  maxRevenue?: number;
  companyTypes?: string[];
  intentKeywords?: string[];
  intentTopics?: string[];
  intentScoreMin?: number;
  technologies?: string[];
  limit?: number;
  page?: number;
  // Add missing properties referenced in components
  companyName?: string;
  industry?: string;
  subIndustry?: string;
  employeesMin?: string;
  employeesMax?: string;
  revenueMin?: string;
  revenueMax?: string;
  intent?: {
    activelyHiring: boolean;
    highGrowth: boolean;
    recentlyFunded: boolean;
    buyingIntent?: boolean;
    recentTechnology?: boolean;
  };
}

export interface ApolloLead {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  position: string; // Changed from optional to required to match 'Lead' type
  company?: string;
  location?: string;
  email?: string;
  phone?: string;
  companySize?: string;
  department?: string;
  technology?: string[];
  lastUpdated?: string;
  industry?: string;
  linkedin?: string;
  companyDomain?: string;
  score?: number;
}
