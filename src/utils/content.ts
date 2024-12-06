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
    console.log('Attempting to save content:', content);
    
    const response = await fetch('/api/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: content.title,
        menuTitle: content.menuTitle,
        mealOptionsTitle: content.mealOptionsTitle,
        menuItems: content.menuItems,
        cafeNews: content.cafeNews,
        date: content.date,
        lastUpdated: content.lastUpdated,
        iceCreamStatus: content.iceCreamStatus
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Save failed:', errorData);
      throw new Error(`Failed to save content: ${errorData.error || response.statusText}`);
    }
    
    const savedContent = await response.json();
    console.log('Content saved successfully:', savedContent);
    return savedContent;
  } catch (error) {
    console.error('Error in savePageContent:', error);
    throw error;
  }
} 