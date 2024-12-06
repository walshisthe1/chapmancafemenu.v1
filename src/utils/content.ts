const defaultContent = {
  title: "Chapman Cafeteria",
  menuTitle: "Cafeteria Menu",
  mealOptionsTitle: "Meal Options",
  menuItems: [
    { id: 1, name: 'Grilled Chicken', demand: 5 },
    { id: 2, name: 'Vegetarian Pasta', demand: 3 },
    { id: 3, name: 'Taco Bar', demand: 8 },
  ],
  cafeNews: [
    'New vegan options available!',
    'Chef\'s special: Sushi Friday',
  ],
  date: new Date().toLocaleDateString(),
  lastUpdated: new Date().toLocaleTimeString(),
  iceCreamStatus: {
    isWorking: true,
    flavors: [
      { name: 'Vanilla', available: true },
      { name: 'Chocolate', available: true },
    ],
  },
};

export async function getPageContent() {
  try {
    const response = await fetch('/api/content');
    if (!response.ok) {
      return defaultContent;
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch content:', error);
    return defaultContent;
  }
}

export async function savePageContent(content: any) {
  try {
    const response = await fetch('/api/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(content),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save content');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to save content:', error);
    throw error;
  }
} 