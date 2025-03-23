
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
  businessModel?: string; // Added missing property
  companyKeywords?: string; // Added missing property
  descriptionKeywords?: string; // Added missing property
  fundingStatus?: string; // Added missing property
  contactLevel?: string; // Added missing property
  ageMin?: string; // Added missing property
  ageMax?: string; // Added missing property
  growthRate?: string; // Added missing property
  hiringStatus?: string; // Added missing property
  department?: string; // Added missing property
  countries?: string[]; // Added missing property
  city?: string; // Added missing property
  region?: string; // Added missing property
  postalCode?: string; // Added missing property
  jobTitles?: string[]; // Added missing property
  seniority?: string[]; // Added missing property
  fundingMin?: string; // Added missing property
  fundingMax?: string; // Added missing property
  fundingRounds?: string; // Added missing property
  foundedMin?: string; // Added missing property
  foundedMax?: string; // Added missing property
  sicCodes?: string[]; // Added missing property
  naicsCodes?: string[]; // Added missing property
  leadQuality?: string; // Added missing property
  emailStatus?: string; // Added missing property
  sortBy?: string; // Added missing property
  sortDirection?: string; // Added missing property
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
  position: string; // Required to match Lead type
  company: string; // Changed from optional to required to match 'Lead' type
  location: string; // Changed from optional to required to match 'Lead' type
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
