"use client";

import { useState, useEffect } from 'react';
import { getPageContent, savePageContent } from '@/utils/content';
import FileUpload from '@/components/FileUpload';

interface MenuItem {
  id: number;
  name: string;
  demand: number;
  photo?: string;
}

interface PageContent {
  title: string;
  menuTitle: string;
  mealOptionsTitle: string;
  menuItems: MenuItem[];
  cafeNews: string[];
  date: string;
  lastUpdated: string;
  iceCreamStatus: {
    isWorking: boolean;
    flavors: { name: string; available: boolean; }[];
  };
}

const getInitialContent = (): PageContent => ({
  title: "Chapman Cafeteria",
  menuTitle: "Cafeteria Menu",
  mealOptionsTitle: "Meal Options",
  menuItems: [
    { id: 1, name: 'Grilled Chicken', demand: 5 },
    { id: 2, name: 'Vegetarian Pasta', demand: 3 },
    { id: 3, name: 'Taco Bar', demand: 8 },
    { id: 4, name: 'Salad Station', demand: 2 },
    { id: 5, name: 'Pizza', demand: 6 },
  ],
  cafeNews: [
    'New vegan options available starting next week!',
    'Chef\'s special: Sushi night on Friday',
    'Upcoming food waste reduction campaign',
  ],
  date: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
  lastUpdated: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' }),
  iceCreamStatus: {
    isWorking: true,
    flavors: [
      { name: 'Vanilla', available: true },
      { name: 'Chocolate', available: true },
      { name: 'Strawberry', available: true },
    ],
  },
});

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [newMenuItem, setNewMenuItem] = useState('');
  const [newNewsItem, setNewNewsItem] = useState('');
  const [content, setContent] = useState<PageContent | null>(null);

  useEffect(() => {
    getPageContent().then(data => setContent(data));
  }, []);

  if (!content) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      
      const data = await response.json();
      if (data.success) {
        setIsAuthenticated(true);
        setError('');
      } else {
        setError('Invalid password');
      }
    } catch (error) {
      setError('An error occurred: ' + (error as Error).message);
    }
  };

  const handleSave = async () => {
    if (content) {
      try {
        const savedContent = await savePageContent(content);
        setContent(savedContent);
        alert('Changes saved successfully!');
      } catch (error) {
        alert('Failed to save changes');
      }
    }
  };

  const updateContent = (newContent: PageContent) => {
    setContent(newContent);
    localStorage.setItem('pageContent', JSON.stringify(newContent));
  };

  const addMenuItem = () => {
    if (newMenuItem.trim()) {
      const newId = Math.max(0, ...content.menuItems.map(item => item.id)) + 1;
      updateContent({
        ...content,
        menuItems: [...content.menuItems, { id: newId, name: newMenuItem, demand: 0 }]
      });
      setNewMenuItem('');
    }
  };

  const removeMenuItem = (id: number) => {
    updateContent({
      ...content,
      menuItems: content.menuItems.filter(item => item.id !== id)
    });
  };

  const addNewsItem = () => {
    if (newNewsItem.trim()) {
      updateContent({
        ...content,
        cafeNews: [...content.cafeNews, newNewsItem]
      });
      setNewNewsItem('');
    }
  };

  const removeNewsItem = (index: number) => {
    updateContent({
      ...content,
      cafeNews: content.cafeNews.filter((_, i) => i !== index)
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-bold text-center">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
              </label>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black">Admin Dashboard</h1>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Save Changes
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6 space-y-6 text-black">
          <div>
            <h2 className="text-xl font-semibold mb-4">General Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Page Title
                </label>
                <input
                  type="text"
                  value={content.title}
                  onChange={(e) => updateContent({ ...content, title: e.target.value })}
                  className="border rounded px-2 py-1 w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Menu Title
                </label>
                <input
                  type="text"
                  value={content.menuTitle}
                  onChange={(e) => updateContent({ ...content, menuTitle: e.target.value })}
                  className="border rounded px-2 py-1 w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meal Options Title
                </label>
                <input
                  type="text"
                  value={content.mealOptionsTitle}
                  onChange={(e) => updateContent({ ...content, mealOptionsTitle: e.target.value })}
                  className="border rounded px-2 py-1 w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="text"
                  value={content.date}
                  onChange={(e) => updateContent({ ...content, date: e.target.value })}
                  className="border rounded px-2 py-1 w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Updated
                </label>
                <input
                  type="text"
                  value={content.lastUpdated}
                  onChange={(e) => updateContent({ ...content, lastUpdated: e.target.value })}
                  className="border rounded px-2 py-1 w-full"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Menu Items</h2>
            <div className="space-y-4">
              {content.menuItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => {
                      const newItems = content.menuItems.map(i =>
                        i.id === item.id ? { ...i, name: e.target.value } : i
                      );
                      updateContent({ ...content, menuItems: newItems });
                    }}
                    className="border rounded px-2 py-1 flex-grow"
                  />
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={item.demand}
                    onChange={(e) => {
                      const newItems = content.menuItems.map(i =>
                        i.id === item.id ? { ...i, demand: Number(e.target.value) } : i
                      );
                      updateContent({ ...content, menuItems: newItems });
                    }}
                    className="border rounded px-2 py-1 w-20"
                  />
                  <FileUpload 
                    onUploadCompleteAction={(url) => {
                      const newItems = content.menuItems.map(i =>
                        i.id === item.id ? { ...i, photo: url } : i
                      );
                      updateContent({ ...content, menuItems: newItems });
                    }} 
                  />
                  <button
                    onClick={() => removeMenuItem(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMenuItem}
                  onChange={(e) => setNewMenuItem(e.target.value)}
                  placeholder="New menu item"
                  className="border rounded px-2 py-1 flex-grow"
                />
                <button
                  onClick={addMenuItem}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Cafe News</h2>
            <div className="space-y-4">
              {content.cafeNews.map((news, index) => (
                <div key={index} className="flex items-center gap-4">
                  <input
                    type="text"
                    value={news}
                    onChange={(e) => {
                      const newNews = [...content.cafeNews];
                      newNews[index] = e.target.value;
                      updateContent({ ...content, cafeNews: newNews });
                    }}
                    className="border rounded px-2 py-1 flex-grow"
                  />
                  <button
                    onClick={() => removeNewsItem(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newNewsItem}
                  onChange={(e) => setNewNewsItem(e.target.value)}
                  placeholder="New news update"
                  className="border rounded px-2 py-1 flex-grow"
                />
                <button
                  onClick={addNewsItem}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Add News
                </button>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Ice Cream Machine</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={content.iceCreamStatus.isWorking}
                  onChange={(e) => {
                    updateContent({
                      ...content,
                      iceCreamStatus: {
                        ...content.iceCreamStatus,
                        isWorking: e.target.checked,
                      },
                    });
                  }}
                />
                <span>Machine Working</span>
              </label>
              <div className="flex flex-col gap-2">
                {content.iceCreamStatus.flavors.map((flavor) => (
                  <label key={flavor.name} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={flavor.available}
                      onChange={(e) => {
                        updateContent({
                          ...content,
                          iceCreamStatus: {
                            ...content.iceCreamStatus,
                            flavors: content.iceCreamStatus.flavors.map((f) =>
                              f.name === flavor.name ? { ...f, available: e.target.checked } : f
                            ),
                          },
                        });
                      }}
                    />
                    <span>{flavor.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Save All Changes
        </button>
      </div>
    </div>
  );
} 