
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
  excludedTitles: string;
  
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
  };
  
  // Workflow condition fields
  emailOpened?: boolean;
  emailClicked?: boolean;
  meetingBooked?: boolean;
  hasEmail?: boolean;
  hasLinkedIn?: boolean;
  hasPhone?: boolean;
  
  // Communication status fields
  email1Status?: 'not_sent' | 'sent' | 'opened' | 'clicked' | 'replied';
  linkedinStatus?: 'not_sent' | 'sent' | 'accepted' | 'replied';
  profileVisitStatus?: 'not_done' | 'done';
  instagramStatus?: 'not_sent' | 'sent' | 'seen' | 'replied';
  email2Status?: 'not_sent' | 'sent' | 'opened' | 'clicked' | 'replied';
}

export interface ApolloLead {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  position: string;
  company: string;
  location: string;
  email?: string;
  department?: string;
  companySize?: string;
  technology?: string[];
  lastUpdated?: string;
  industry?: string;
  companyDomain?: string;
  linkedin?: string;
  instagram?: string;
  phone?: string;
  status?: 'active' | 'pending' | 'completed' | 'failed';
  conditionMet?: boolean;
  missingInputs?: boolean;
  emailStatus?: 'opened' | 'clicked' | 'replied' | 'bounced' | 'not_sent';
  sequence?: {
    position: number;
    name: string;
    total: number;
  };
  
  // Communication channel statuses
  email1Status?: 'not_sent' | 'sent' | 'opened' | 'clicked' | 'replied';
  linkedinStatus?: 'not_sent' | 'sent' | 'accepted' | 'replied';
  profileVisitStatus?: 'not_done' | 'done';
  instagramStatus?: 'not_sent' | 'sent' | 'seen' | 'replied';
  email2Status?: 'not_sent' | 'sent' | 'opened' | 'clicked' | 'replied';
  
  // Last LinkedIn activity for personalization
  lastLinkedInActivity?: string;
  
  // Lead score for quality assessment (0-100)
  score?: number;
}
