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
    
    // Remove undefined and empty values from filter
    const cleanFilters: any = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '' && value !== null) {
        cleanFilters[key] = value;
      }
    });

    const requestBody = {
      api_key: APOLLO_API_KEY,
      q_organization_name: cleanFilters.companyName || "",
      page: 1,
      per_page: 25,
      organization_industry_tag_ids: cleanFilters.industry || undefined,
      organization_sub_industry: cleanFilters.subIndustry || undefined,
      organization_keywords: cleanFilters.companyKeywords || undefined,
      person_departments: cleanFilters.department || undefined,
      organization_num_employees_ranges: getEmployeeRange(cleanFilters.employeesMin, cleanFilters.employeesMax),
      organization_technologies: cleanFilters.technologies || undefined,
      
      // Location filters
      q_country_codes: cleanFilters.countries?.length ? cleanFilters.countries : undefined,
      q_city: cleanFilters.city || undefined,
      q_region: cleanFilters.region || undefined,
      q_postal_code: cleanFilters.postalCode || undefined,

      // Additional person filters
      q_titles: cleanFilters.titles?.length ? cleanFilters.titles : undefined,
      person_titles: cleanFilters.jobTitles?.length ? cleanFilters.jobTitles : undefined,
      person_levels: cleanFilters.seniority?.length ? cleanFilters.seniority : undefined,
      
      // Company filters
      organization_revenue_ranges: getRevenueRange(cleanFilters.revenueMin, cleanFilters.revenueMax),
      organization_funding_ranges: getFundingRange(cleanFilters.fundingMin, cleanFilters.fundingMax),
      organization_funding_raised_rounds: cleanFilters.fundingRounds || undefined,
      organization_founded_years: getFoundedRange(cleanFilters.foundedMin, cleanFilters.foundedMax),
      organization_sic_codes: cleanFilters.sicCodes?.length ? cleanFilters.sicCodes : undefined,
      organization_naics_codes: cleanFilters.naicsCodes?.length ? cleanFilters.naicsCodes : undefined,
      
      // Intent filters
      buying_intent: cleanFilters.intent?.buyingIntent ? "high" : undefined,
      recent_funding: cleanFilters.intent?.recentlyFunded || undefined,
      recent_tech: cleanFilters.intent?.recentTechnology || undefined,
      is_hiring: cleanFilters.intent?.activelyHiring || undefined,
      
      // Quality filters
      q_lead_quality: cleanFilters.leadQuality || undefined,
      contact_email_status: cleanFilters.emailStatus || undefined,
      
      // Sort and pagination
      sort_by: cleanFilters.sortBy || "relevance",
      sort_direction: cleanFilters.sortDirection || "desc"
    };
    
    // Remove all undefined values from request body
    Object.keys(requestBody).forEach(key => {
      if (requestBody[key] === undefined) {
        delete requestBody[key];
      }
    });
    
    console.log('Cleaned request body:', requestBody);

    const response = await fetch('https://api.apollo.io/v1/mixed_people/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Accept': 'application/json',
        'Authorization': `Bearer ${APOLLO_API_KEY}`
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
      throw new Error('Invalid API response format');
    }

    return {
      leads: data.people.map(transformApolloLead),
      total: data.pagination?.total_entries || 0,
      hasMore: data.pagination?.has_next_page || false
    };
  } catch (error) {
    console.error('Apollo API Error:', error);
    throw error;
  }
};

const transformApolloLead = (apiLead: any): ApolloLead => {
  return {
    id: apiLead.id,
    name: `${apiLead.first_name || ''} ${apiLead.last_name || ''}`.trim(),
    position: apiLead.title || '',
    company: apiLead.organization?.name || '',
    location: [apiLead.city, apiLead.state, apiLead.country].filter(Boolean).join(', '),
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
