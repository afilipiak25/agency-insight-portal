
import { ApolloFilters, ApolloLead } from "../types/apollo-filters";

const SUPABASE_PROJECT_URL = 'https://xqnomvfmulzltjkusrlv.supabase.co';

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
        'Accept': 'application/json',
        'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ filters: cleanFilters }),
      credentials: 'include'
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Apollo API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      
      // Detailliertere Fehlermeldung
      if (response.status === 401) {
        throw new Error('Nicht autorisiert - Bitte überprüfen Sie Ihre API-Schlüssel');
      } else if (response.status === 404) {
        throw new Error('Edge Function nicht gefunden - Bitte stellen Sie sicher, dass die apollo-search Funktion deployed ist');
      } else {
        throw new Error(`Apollo API error: ${response.status} - ${errorText}`);
      }
    }

    const data = await response.json();
    console.log('Apollo API Response:', data);

    // Überprüfung der API-Antwort
    if (!data || (!data.people && !Array.isArray(data))) {
      console.error('Unerwartetes API-Antwortformat:', data);
      return {
        leads: [],
        total: 0,
        hasMore: false
      };
    }

    // Behandlung verschiedener Antwortformate
    const people = Array.isArray(data) ? data : data.people || [];

    return {
      leads: people.map(transformApolloLead),
      total: data.pagination?.total_entries || people.length || 0,
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
