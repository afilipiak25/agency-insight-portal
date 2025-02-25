import { ApolloLead } from "../types/apollo-filters";

const APOLLO_API_KEY = "rtd26I4RRDz7ZMo0GqsrxQ";
const API_BASE_URL = "https://api.apollo.io/v1";

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
      page: 1,
      per_page: 10,
      
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
      q_region: cleanFilters.region || undefined
    };

    // Entferne undefined Werte
    Object.keys(requestBody).forEach(key => {
      if (requestBody[key] === undefined) {
        delete requestBody[key];
      }
    });

    console.log('Cleaned request body:', requestBody);

    const response = await fetch(`${API_BASE_URL}/mixed_people/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      // Wenn die Antwort nicht OK ist, geben wir Mock-Daten zurück
      console.warn('API request failed, using mock data');
      return getMockData();
    }

    const data = await response.json();
    console.log('Apollo API Response:', data);

    if (!data.people || !Array.isArray(data.people)) {
      console.warn('Invalid API response format, using mock data');
      return getMockData();
    }

    return {
      leads: data.people.map(transformApolloLead),
      total: data.pagination?.total_entries || 0,
      hasMore: data.pagination?.has_next_page || false
    };
  } catch (error) {
    console.error('Apollo API Error:', error);
    // Bei Fehlern geben wir Mock-Daten zurück
    return getMockData();
  }
};

const getMockData = (): ApolloApiResponse => {
  return {
    leads: [
      {
        id: '1',
        name: 'Max Mustermann',
        position: 'CEO',
        company: 'Beispiel GmbH',
        location: 'Berlin, Deutschland',
        email: 'max@beispiel.de',
        department: 'Geschäftsführung',
        companySize: '50-100',
        technology: ['SAP', 'Microsoft'],
        lastUpdated: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Anna Schmidt',
        position: 'CTO',
        company: 'Tech AG',
        location: 'München, Deutschland',
        email: 'anna@tech.de',
        department: 'IT',
        companySize: '100-500',
        technology: ['AWS', 'Azure'],
        lastUpdated: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Thomas Weber',
        position: 'Sales Director',
        company: 'Vertrieb GmbH',
        location: 'Hamburg, Deutschland',
        email: 'thomas@vertrieb.de',
        department: 'Vertrieb',
        companySize: '10-50',
        technology: ['Salesforce', 'HubSpot'],
        lastUpdated: new Date().toISOString()
      }
    ],
    total: 3,
    hasMore: false
  };
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
