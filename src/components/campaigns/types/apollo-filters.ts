
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
  intent: {
    activelyHiring: boolean;
    highGrowth: boolean;
    recentlyFunded: boolean;
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
