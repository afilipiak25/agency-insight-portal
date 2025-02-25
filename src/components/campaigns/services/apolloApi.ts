
import { ApolloLead } from "../types/apollo-filters";

const APOLLO_API_KEY = "rtd26I4RRDz7ZMo0GqsrxQ";

interface ApolloApiResponse {
  leads: ApolloLead[];
  total: number;
  hasMore: boolean;
}

export const searchApolloLeads = async (filters: any): Promise<ApolloApiResponse> => {
  try {
    const response = await fetch('https://api.apollo.io/v1/mixed_people/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${APOLLO_API_KEY}`
      },
      body: JSON.stringify({
        api_key: APOLLO_API_KEY,
        page: 1,
        per_page: 25,
        ...transformFilters(filters)
      })
    });

    if (!response.ok) {
      throw new Error('Apollo API request failed');
    }

    const data = await response.json();
    return {
      leads: data.people.map(transformApolloLead),
      total: data.pagination.total_entries,
      hasMore: data.pagination.has_next_page
    };
  } catch (error) {
    console.error('Apollo API Error:', error);
    throw error;
  }
};

const transformFilters = (filters: any) => {
  return {
    q_organization_name: filters.companyName,
    organization_industry_tag_ids: filters.industry,
    organization_sub_industry: filters.subIndustry,
    organization_keywords: filters.companyKeywords,
    person_departments: filters.department,
    organization_num_employees_ranges: getEmployeeRange(filters.employeesMin, filters.employeesMax),
    organization_technologies: filters.technologies,
    // Add more Apollo.io specific filter transformations
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
