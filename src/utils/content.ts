export function getPageContent() {
  if (typeof window === 'undefined') return null;
  
  const stored = localStorage.getItem('pageContent');
  if (!stored) return null;
  
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
} 