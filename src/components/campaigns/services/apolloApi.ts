
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
      api_key: APOLLO_API_KEY,
      page: 1,
      per_page: 25,
      
      // Job title filters
      q_titles: cleanFilters.titles?.length ? cleanFilters.titles.join(' OR ') : undefined,
      person_titles: cleanFilters.titles?.length ? cleanFilters.titles : undefined,
      exclude_person_titles: cleanFilters.excludedTitles ? cleanFilters.excludedTitles.split(',').map(t => t.trim()) : undefined,
      
      // Unternehmensfilter
      q_organization_name: cleanFilters.companyName || undefined,
      organization_industry_tag_ids: cleanFilters.industry || undefined,
      organization_sub_industry: cleanFilters.subIndustry || undefined,
      organization_keywords: cleanFilters.companyKeywords || undefined,
      
      // Position und Abteilung
      person_departments: cleanFilters.department || undefined,
      person_levels: cleanFilters.seniority?.length ? cleanFilters.seniority : undefined,
      
      // Unternehmensgrößen und Metriken
      organization_num_employees_ranges: getEmployeeRange(cleanFilters.employeesMin, cleanFilters.employeesMax),
      organization_revenue_ranges: getRevenueRange(cleanFilters.revenueMin, cleanFilters.revenueMax),
      
      // Technologie und Intent
      organization_technologies: cleanFilters.technologies || undefined,
      buying_intent: cleanFilters.intent?.buyingIntent ? "high" : undefined,
      is_hiring: cleanFilters.intent?.activelyHiring ? true : undefined,
      
      // Standort
      q_country_codes: cleanFilters.countries?.length ? cleanFilters.countries : undefined,
      q_city: cleanFilters.city || undefined,
      q_region: cleanFilters.region || undefined,

      // Sortierung
      sort_by_field: cleanFilters.sortBy || "contact_updated_at",
      sort_ascending: cleanFilters.sortDirection === "asc"
    };

    // Entferne undefined Werte
    Object.keys(requestBody).forEach(key => {
      if (requestBody[key] === undefined) {
        delete requestBody[key];
      }
    });

    console.log('Cleaned request body:', requestBody);

    // Modifizierte Headers und CORS-Handling
    const response = await fetch(`${API_BASE_URL}/mixed_people/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Accept': 'application/json',
        'User-Agent': 'Apollo-Client/1.0',
        'Origin': window.location.origin
      },
      mode: 'cors', // Explizit CORS-Mode setzen
      credentials: 'omit', // Keine Cookies senden
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Apollo API Error Response:', errorText);
      throw new Error(`Apollo API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Apollo API Response:', data);

    // Verbesserte Fehlerbehandlung
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
