
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
