
export interface ApolloFilters {
  companyName: string;
  industry: string;
  subIndustry: string;
  businessModel: string;
  companyKeywords: string;
  descriptionKeywords: string;
  employeesMin: string;
  employeesMax: string;
  revenueMin: string;
  revenueMax: string;
  technologies: string;
  fundingStatus: string;
  contactLevel: string;
  ageMin: string;
  ageMax: string;
  growthRate: string;
  hiringStatus: string;
  department: string;
  
  // Location filters
  countries: string[];
  city: string;
  region: string;
  postalCode: string;
  
  // Job title filters
  titles: string[];
  jobTitles: string[];
  seniority: string[];
  
  // Company details
  fundingMin: string;
  fundingMax: string;
  fundingRounds: string;
  foundedMin: string;
  foundedMax: string;
  sicCodes: string[];
  naicsCodes: string[];
  
  // Quality and sorting
  leadQuality: string;
  emailStatus: string;
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  
  intent: {
    activelyHiring: boolean;
    highGrowth: boolean;
    recentlyFunded: boolean;
    buyingIntent: boolean;
    recentTechnology: boolean;
  }
}

export interface ApolloLead {
  id: string;
  name: string;
  position: string;
  company: string;
  location: string;
  email?: string;
  department?: string;
  companySize?: string;
  technology?: string[];
  lastUpdated?: string;
}
