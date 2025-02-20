
import { ClientOverview } from '@/types/client';

export const mockClientsData: ClientOverview[] = [
  { 
    id: 1, 
    name: "Tech Solutions GmbH",
    activeLeads: 46622,
    conversionRate: 24.8,
    monthlyTarget: 300,
    progress: 32.9,
    requestType: 'campaign',
    campaignSummary: {
      title: "Head of Sales Automotive Germany",
      industry: "Automotive",
      region: "Deutschland",
      aiSummary: "Der Kunde sucht einen erfahrenen Head of Sales für den Automotive-Bereich in Deutschland. Schwerpunkte sind die Entwicklung der Vertriebsstrategie, Führung eines 15-köpfigen Teams und die Expansion im DACH-Raum. Zielprofil: 8+ Jahre Erfahrung im Automotive-Vertrieb, nachweisliche Erfolge im B2B-Bereich, verhandlungssicheres Deutsch und Englisch.",
      lastUpdated: "2024-03-15T14:30:00"
    }
  },
  { 
    id: 2, 
    name: "Digital Marketing AG",
    activeLeads: 38450,
    conversionRate: 28.5,
    monthlyTarget: 250,
    progress: 45.2,
    requestType: 'connection',
    campaignSummary: {
      title: "Senior Marketing Manager E-Commerce",
      industry: "E-Commerce",
      region: "Remote / DACH",
      aiSummary: "Gesucht wird ein Senior Marketing Manager mit Fokus auf E-Commerce und Performance Marketing. Hauptaufgaben umfassen die Optimierung der Customer Journey, Steuerung von Paid Media Kampagnen und Entwicklung der Content-Strategie. Anforderungen: 5+ Jahre Erfahrung im E-Commerce Marketing, analytische Fähigkeiten, Hands-on-Mentalität.",
      lastUpdated: "2024-03-14T09:15:00"
    }
  },
  { 
    id: 3, 
    name: "E-Commerce Plus",
    activeLeads: 29876,
    conversionRate: 22.3,
    monthlyTarget: 180,
    progress: 38.7,
    requestType: 'campaign',
    campaignSummary: {
      title: "Online Shop Manager Fashion",
      industry: "Fashion",
      region: "Berlin",
      aiSummary: "Für einen schnell wachsenden Online-Shop im Fashion-Bereich wird ein erfahrener Shop Manager gesucht. Verantwortlichkeiten umfassen die Sortimentsgestaltung, Umsatzsteigerung und Optimierung des Online-Shops. Erwartungen: Erfahrung im E-Commerce, Kenntnisse in SEO und SEA, Kreativität und ein gutes Auge für Trends.",
      lastUpdated: "2024-03-13T16:45:00"
    }
  },
  { 
    id: 4, 
    name: "Innovative Labs",
    activeLeads: 15234,
    conversionRate: 19.8,
    monthlyTarget: 120,
    progress: 28.4,
    requestType: 'other',
    campaignSummary: {
      title: "Data Scientist AI Solutions",
      industry: "AI",
      region: "München",
      aiSummary: "Ein innovatives AI-Unternehmen sucht einen Data Scientist zur Entwicklung von KI-basierten Lösungen. Aufgaben sind die Analyse großer Datenmengen, Entwicklung von Machine Learning Modellen und die Umsetzung von Prototypen. Gesucht werden Kandidaten mit einem starken Hintergrund in Mathematik und Statistik, Erfahrung in Python und R sowie Kenntnisse in Deep Learning.",
      lastUpdated: "2024-03-12T11:00:00"
    }
  },
  { 
    id: 5, 
    name: "Global Trading KG",
    activeLeads: 52189,
    conversionRate: 31.2,
    monthlyTarget: 400,
    progress: 42.1,
    requestType: 'connection',
    campaignSummary: {
      title: "International Sales Director",
      industry: "Trading",
      region: "Hamburg",
      aiSummary: "Für ein international agierendes Handelsunternehmen wird ein erfahrener Sales Director gesucht. Der Fokus liegt auf der Erschließung neuer Märkte, der Betreuung von Key Accounts und der Führung eines internationalen Vertriebsteams. Anforderungen: Mehrjährige Erfahrung im internationalen Vertrieb, verhandlungssicheres Englisch, interkulturelle Kompetenz und Reisebereitschaft.",
      lastUpdated: "2024-03-11T18:20:00"
    }
  }
];
