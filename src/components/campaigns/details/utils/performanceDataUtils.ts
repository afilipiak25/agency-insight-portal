
export const generateDailyData = (days = 30) => {
  const data = [];
  const today = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      leads: Math.floor(Math.random() * 20) + 5,
      completed: Math.floor(Math.random() * 10),
    });
  }
  
  return data;
};

export const getEmailData = () => [
  { name: 'Email 1', opened: 60, replied: 40, clicked: 45 },
  { name: 'Email 2', opened: 55, replied: 35, clicked: 40 },
  { name: 'Email 3', opened: 50, replied: 30, clicked: 35 },
];

// New utility function for step-based lead distribution
export const getStepDistribution = () => {
  const steps = [
    { name: 'Initial Contact', icon: 'mail', color: '#9b87f5' },
    { name: 'Email Opened', icon: 'eye', color: '#7E69AB' },
    { name: 'Email Clicked', icon: 'mouse-pointer', color: '#D6BCFA' },
    { name: 'Meeting Requested', icon: 'calendar', color: '#1EAEDB' },
    { name: 'Meeting Scheduled', icon: 'calendar-check', color: '#33C3F0' },
    { name: 'Deal Closed', icon: 'check-circle', color: '#10B981' }
  ];

  // Generate random lead counts that decrease as steps progress
  let previousCount = 500;
  return steps.map(step => {
    // Each successive step has fewer leads (realistic funnel)
    const leadCount = Math.floor(previousCount * (0.6 + Math.random() * 0.3));
    previousCount = leadCount;
    return {
      ...step,
      count: leadCount
    };
  });
};
