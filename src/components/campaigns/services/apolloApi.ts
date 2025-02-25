
import { ApolloFilters, ApolloLead } from "../types/apollo-filters";

const APOLLO_API_KEY = "rtd26I4RRDz7ZMo0GqsrxQ";
const API_BASE_URL = "https://api.apollo.io/v1";

interface ApolloApiResponse {
  leads: ApolloLead[];
  total: number;
  hasMore: boolean;
}

export const searchApolloLeads = async (filters: ApolloFilters): Promise<ApolloApiResponse> => {
  try {
    console.log('Sending request with filters:', filters);
    
    // Remove undefined and empty values from filter
    const cleanFilters: any = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '' && value !== null) {
        if (Array.isArray(value) && value.length === 0) return;
        cleanFilters[key] = value;
      }
    });

    const requestBody = {
      // API Key in Body wie in Apollo Dokumentation empfohlen
      api_key: APOLLO_API_KEY,
      
      // Paginierung
      page: 1,
      per_page: 25,
      
      // Suchparameter
      q_keywords: cleanFilters.titles?.length ? cleanFilters.titles.join(' OR ') : undefined,
      
      // Personen Filter
      person_titles: cleanFilters.titles?.length ? cleanFilters.titles : undefined,
      person_departments: cleanFilters.department || undefined,
      person_locations: cleanFilters.countries?.length ? cleanFilters.countries : undefined,
      
      // Organisations Filter
      organization_names: cleanFilters.companyName || undefined,
      organization_industries: cleanFilters.industry || undefined,
      technologies: cleanFilters.technologies || undefined,
      
      // Seniority
      person_seniorities: cleanFilters.seniority?.length ? cleanFilters.seniority : undefined,
      
      // Mitarbeiter und Umsatz
      organization_num_employees_ranges: getEmployeeRange(cleanFilters.employeesMin, cleanFilters.employeesMax),
      organization_revenue_ranges: getRevenueRange(cleanFilters.revenueMin, cleanFilters.revenueMax),
      
      // Intent Signale
      buying_intent: cleanFilters.intent?.buyingIntent ? "high" : undefined,
      is_hiring: cleanFilters.intent?.activelyHiring || undefined,
      
      // Sortierung
      sort_by: cleanFilters.sortBy || "recently_updated",
      sort_ascending: cleanFilters.sortDirection === "asc"
    };

    // Entferne undefined Werte
    Object.keys(requestBody).forEach(key => {
      if (requestBody[key] === undefined) {
        delete requestBody[key];
      }
    });

    console.log('Sending request with body:', requestBody);

    const response = await fetch(`${API_BASE_URL}/people/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Apollo API Error Response:', errorText);
      throw new Error(`Apollo API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Apollo API Response:', data);

    if (!data.people) {
      console.error('Invalid API response:', data);
      throw new Error('Ungültiges API-Antwortformat');
    }

    return {
      leads: Array.isArray(data.people) ? data.people.map(transformApolloLead) : [],
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
    id: apiLead.id || '',
    name: `${apiLead.first_name || ''} ${apiLead.last_name || ''}`.trim(),
    position: apiLead.title || '',
    company: apiLead.organization?.name || '',
    location: [apiLead.city, apiLead.state, apiLead.country].filter(Boolean).join(', '),
    email: apiLead.email || '',
    department: apiLead.department || '',
    companySize: apiLead.organization?.employee_count || '',
    technology: Array.isArray(apiLead.organization?.technologies) ? apiLead.organization.technologies : [],
    lastUpdated: apiLead.updated_at || new Date().toISOString()
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
