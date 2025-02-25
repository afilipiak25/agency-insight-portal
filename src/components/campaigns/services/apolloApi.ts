
import { ApolloFilters, ApolloLead } from "../types/apollo-filters";

const SUPABASE_PROJECT_URL = 'https://YOUR_PROJECT_URL.supabase.co';

interface ApolloApiResponse {
  leads: ApolloLead[];
  total: number;
  hasMore: boolean;
}

export const searchApolloLeads = async (filters: ApolloFilters): Promise<ApolloApiResponse> => {
  try {
    console.log('Starting API request with filters:', filters);
    
    // Filter leere oder undefinierte Werte
    const cleanFilters: any = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '' && value !== null) {
        if (Array.isArray(value) && value.length === 0) return;
        cleanFilters[key] = value;
      }
    });

    const response = await fetch(`${SUPABASE_PROJECT_URL}/functions/v1/apollo-search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filters: cleanFilters })
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
