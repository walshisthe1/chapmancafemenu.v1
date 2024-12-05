const defaultContent = {
  title: "Chapman Cafeteria",
  menuItems: [],
  cafeNews: [],
  date: new Date().toLocaleDateString(),
  lastUpdated: new Date().toLocaleTimeString(),
  iceCreamStatus: {
    isWorking: true,
    flavors: []
  }
};

export function getPageContent() {
  if (typeof window === 'undefined') return defaultContent;
  
  const stored = localStorage.getItem('pageContent');
  if (!stored) return defaultContent;
  
  try {
    return JSON.parse(stored);
  } catch {
    return defaultContent;
  }
} 