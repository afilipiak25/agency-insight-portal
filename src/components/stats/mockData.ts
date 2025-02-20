
export const mockData = {
  1: {
    monthlyTarget: { current: 98800, total: 300000 },
    activeLeads: { current: 46622, total: 50000 },
    conversionRate: { current: 24.8, total: 30 },
    aiResponseRate: { current: 92.5, total: 95 },
    leadQualityScore: { value: 8.4, change: 12 },
    responseTime: { value: 2.3, change: -30 },
    engagementRate: { value: 78.5, change: 15 },
    costPerLead: { value: 42.5, change: -15 },
    customerLifetimeValue: { value: 2850, change: 25 },
    leadToOpportunityRate: { value: 35.8, change: 8 },
    campaignROI: { value: 324, change: 45 },
    performanceData: [
      { date: 'Jan 30', leads: 300, responses: 350, conversions: 320, revenue: 12500 },
      { date: 'Feb 02', leads: 500, responses: 520, conversions: 480, revenue: 18900 },
      { date: 'Feb 05', leads: 600, responses: 450, conversions: 520, revenue: 22400 },
      { date: 'Feb 08', leads: 400, responses: 650, conversions: 580, revenue: 25600 },
      { date: 'Feb 11', leads: 580, responses: 600, conversions: 700, revenue: 31200 }
    ],
    channelPerformance: [
      { channel: 'Google Ads', leads: 2500, cost: 12500, cpl: 5 },
      { channel: 'LinkedIn', leads: 1800, cost: 15300, cpl: 8.5 },
      { channel: 'Facebook', leads: 3200, cost: 9600, cpl: 3 },
      { channel: 'Email', leads: 950, cost: 2850, cpl: 3 }
    ],
    aiMetrics: {
      messageQuality: 92,
      responseAccuracy: 88,
      sentimentAnalysis: 95,
      leadQualification: 86
    }
  }
};
