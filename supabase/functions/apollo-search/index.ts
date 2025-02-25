
import { serve } from 'https://deno.fresh.dev/server'
import { corsHeaders } from '../_shared/cors.ts'

interface RequestBody {
  filters: {
    titles?: string[];
    companyName?: string;
    industry?: string;
    department?: string;
    countries?: string[];
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const APOLLO_API_KEY = Deno.env.get('APOLLO_API_KEY')
    if (!APOLLO_API_KEY) {
      throw new Error('Apollo API key not found')
    }

    const { filters } = await req.json() as RequestBody

    const requestBody: any = {
      api_key: APOLLO_API_KEY,
      page: 1,
      per_page: 25
    }

    if (filters.titles?.length) {
      requestBody.person_titles = filters.titles
    }
    if (filters.companyName) {
      requestBody.organization_names = filters.companyName
    }
    if (filters.industry) {
      requestBody.organization_industries = filters.industry
    }
    if (filters.department) {
      requestBody.person_departments = filters.department
    }
    if (filters.countries?.length) {
      requestBody.person_locations = filters.countries
    }

    const response = await fetch('https://api.apollo.io/v1/people/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })

    const data = await response.json()

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    })
  }
})
