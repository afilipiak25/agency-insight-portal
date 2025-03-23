
export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  position: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'failed';
  step: string;
  activity: string;
  score: number;
}

// Mock lead data for the table
export const mockLeads: Lead[] = Array.from({ length: 10 }).map((_, index) => ({
  id: `lead-${index + 1}`,
  name: ['John Doe', 'Jane Smith', 'Michael Brown', 'Sarah Johnson', 'David Wilson'][index % 5],
  email: `example${index + 1}@company.com`,
  company: ['Acme Inc', 'Globex Corp', 'Initech', 'Umbrella Corp', 'Stark Industries'][index % 5],
  position: ['CEO', 'CMO', 'CTO', 'VP Sales', 'Director'][index % 5],
  status: ['not-started', 'in-progress', 'completed', 'failed'][index % 4] as any,
  step: [`Email ${(index % 3) + 1}`, 'Waiting', 'Replied', 'Call scheduled'][index % 4],
  activity: [`${index + 1} days ago`, 'Today', 'Yesterday'][index % 3],
  score: Math.floor(70 + Math.random() * 30),
}));
