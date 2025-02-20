
export interface ClientCampaignSummary {
  title: string;
  industry: string;
  region: string;
  aiSummary: string;
  lastUpdated: string;
}

export interface ConnectionError {
  type: 'email' | 'linkedin' | 'calendar';
  message: string;
  since: string;
}

export interface ClientOverview {
  id: number;
  name: string;
  activeLeads: number;
  conversionRate: number;
  monthlyTarget: number;
  progress: number;
  requestType?: 'campaign' | 'connection' | 'other';
  campaignSummary?: ClientCampaignSummary;
  connectionError?: ConnectionError;
}
