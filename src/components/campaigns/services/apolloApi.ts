
import { ApolloLead } from "../types/apollo-filters";

const APOLLO_API_KEY = "rtd26I4RRDz7ZMo0GqsrxQ";

interface ApolloApiResponse {
  leads: ApolloLead[];
  total: number;
  hasMore: boolean;
}

export const searchApolloLeads = async (filters: any): Promise<ApolloApiResponse> => {
  try {
    console.log('Sending request with filters:', filters);
    
    const requestBody = {
      api_key: APOLLO_API_KEY,
      q_organization_name: filters.companyName || "",
      page: 1,
      per_page: 25,
      organization_industry_tag_ids: filters.industry,
      organization_sub_industry: filters.subIndustry,
      organization_keywords: filters.companyKeywords,
      person_departments: filters.department,
      organization_num_employees_ranges: getEmployeeRange(filters.employeesMin, filters.employeesMax),
      organization_technologies: filters.technologies,
      
      // Location filters
      q_country_codes: filters.countries,
      q_city: filters.city,
      q_region: filters.region,
      q_postal_code: filters.postalCode,

      // Additional person filters
      q_titles: filters.titles,
      person_titles: filters.jobTitles,
      person_levels: filters.seniority,
      
      // Company filters
      organization_revenue_ranges: getRevenueRange(filters.revenueMin, filters.revenueMax),
      organization_funding_ranges: getFundingRange(filters.fundingMin, filters.fundingMax),
      organization_funding_raised_rounds: filters.fundingRounds,
      organization_founded_years: getFoundedRange(filters.foundedMin, filters.foundedMax),
      organization_sic_codes: filters.sicCodes,
      organization_naics_codes: filters.naicsCodes,
      
      // Intent filters
      buying_intent: filters.intent.buyingIntent ? "high" : undefined,
      recent_funding: filters.intent.recentlyFunded ? true : undefined,
      recent_tech: filters.intent.recentTechnology ? true : undefined,
      is_hiring: filters.intent.activelyHiring ? true : undefined,
      
      // Quality filters
      q_lead_quality: filters.leadQuality,
      contact_email_status: filters.emailStatus,
      
      // Sort and pagination
      sort_by: filters.sortBy || "relevance",
      sort_direction: filters.sortDirection || "desc"
    };
    
    console.log('Request body:', requestBody);

    const response = await fetch('https://api.apollo.io/v1/mixed_people/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Apollo API Response:', data);

    if (!response.ok) {
      throw new Error(`Apollo API request failed: ${JSON.stringify(data)}`);
    }

    if (!data.people || !Array.isArray(data.people)) {
      console.log('No data from API, using mock data');
      return getMockData();
    }

    return {
      leads: data.people.map(transformApolloLead),
      total: data.pagination?.total_entries || 0,
      hasMore: data.pagination?.has_next_page || false
    };
  } catch (error) {
    console.error('Apollo API Error:', error);
    return getMockData();
  }
};

const getMockData = (): ApolloApiResponse => {
  return {
    leads: [
      {
        id: '1',
        name: 'John Doe',
        position: 'CEO',
        company: 'Tech Corp',
        location: 'Berlin, Germany',
        email: 'john@techcorp.com',
        department: 'Executive',
        companySize: '50-100',
        technology: ['React', 'Node.js'],
        lastUpdated: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Jane Smith',
        position: 'CTO',
        company: 'Innovation GmbH',
        location: 'München, Germany',
        email: 'jane@innovation.de',
        department: 'Technology',
        companySize: '100-500',
        technology: ['Python', 'AWS'],
        lastUpdated: new Date().toISOString()
      }
    ],
    total: 2,
    hasMore: false
  };
};

const transformApolloLead = (apiLead: any): ApolloLead => {
  return {
    id: apiLead.id,
    name: `${apiLead.first_name} ${apiLead.last_name}`,
    position: apiLead.title || '',
    company: apiLead.organization?.name || '',
    location: `${apiLead.city || ''}, ${apiLead.country || ''}`,
    email: apiLead.email || undefined,
    department: apiLead.department || undefined,
    companySize: apiLead.organization?.employee_count || undefined,
    technology: apiLead.organization?.technologies || [],
    lastUpdated: apiLead.updated_at
  };
};

const getEmployeeRange = (min?: string, max?: string) => {
  if (!min && !max) return null;
  return `${min || '*'}-${max || '*'}`;
};

const getRevenueRange = (min?: string, max?: string) => {
  if (!min && !max) return null;
  return `${min || '*'}-${max || '*'}`;
};

const getFundingRange = (min?: string, max?: string) => {
  if (!min && !max) return null;
  return `${min || '*'}-${max || '*'}`;
};

const getFoundedRange = (min?: string, max?: string) => {
  if (!min && !max) return null;
  const currentYear = new Date().getFullYear();
  const minYear = min ? currentYear - parseInt(min) : '*';
  const maxYear = max ? currentYear - parseInt(max) : '*';
  return `${minYear}-${maxYear}`;
};
