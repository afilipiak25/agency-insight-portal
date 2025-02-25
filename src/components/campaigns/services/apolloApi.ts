
import { ApolloFilters, ApolloLead } from "../types/apollo-filters";

const APOLLO_API_KEY = "rtd26I4RRDz7ZMo0GqsrxQ";
const API_BASE_URL = "https://api.apollo.io/v1";

interface ApolloApiResponse {
  leads: ApolloLead[];
  total: number;
  hasMore: boolean;
}

interface ApolloRequestBody {
  api_key: string;
  page: number;
  per_page: number;
  person_titles?: string[];
  organization_names?: string;
  organization_industries?: string;
  person_departments?: string;
  person_locations?: string[];
  [key: string]: any; // Erlaubt zusätzliche Eigenschaften für zukünftige Erweiterungen
}

export const searchApolloLeads = async (filters: ApolloFilters): Promise<ApolloApiResponse> => {
  try {
    console.log('Starting API request with filters:', filters);
    
    const cleanFilters: any = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '' && value !== null) {
        if (Array.isArray(value) && value.length === 0) return;
        cleanFilters[key] = value;
      }
    });

    // Baue Request-Body entsprechend der Apollo API-Dokumentation
    const requestBody: ApolloRequestBody = {
      api_key: APOLLO_API_KEY,
      page: 1,
      per_page: 25
    };

    // Füge nur die relevanten Filter hinzu, wenn sie vorhanden sind
    if (cleanFilters.titles?.length) {
      requestBody.person_titles = cleanFilters.titles;
    }

    if (cleanFilters.companyName) {
      requestBody.organization_names = cleanFilters.companyName;
    }

    if (cleanFilters.industry) {
      requestBody.organization_industries = cleanFilters.industry;
    }

    if (cleanFilters.department) {
      requestBody.person_departments = cleanFilters.department;
    }

    if (cleanFilters.countries?.length) {
      requestBody.person_locations = cleanFilters.countries;
    }

    console.log('Sending Apollo API request with body:', requestBody);

    const response = await fetch(`${API_BASE_URL}/people/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Apollo API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`Apollo API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Apollo API Response:', data);

    // Transformiere die API-Antwort in unser Format
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
