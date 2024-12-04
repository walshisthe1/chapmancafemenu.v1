'use client';

import { useEffect, useState } from 'react';
import { getPageContent } from '@/utils/content';
import dynamic from 'next/dynamic';

const CafeteriaMenu = dynamic(() => import('@/components/CafeteriaMenu'), {
  ssr: false
});
const CafeNews = dynamic(() => import('@/components/CafeNews'), {
  ssr: false
});
const IceCreamStatus = dynamic(() => import('@/components/IceCreamStatus'), {
  ssr: false
});
const FoodGallery = dynamic(() => import('@/components/FoodGallery'), {
  ssr: false
});

export default function Home() {
  const [content, setContent] = useState<any>(null);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  useEffect(() => {
    // Function to fetch content
    const loadContent = async () => {
      const pageContent = getPageContent();
      if (pageContent) {
        setContent(pageContent);
        setLastUpdate(Date.now());
      }
    };

    // Load content immediately
    loadContent();

    // Check for updates every 5 seconds
    const interval = setInterval(loadContent, 5000);

    // Add storage event listener for cross-tab updates
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cafeteriaContent') {
        loadContent();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-800">{content?.title || "Chapman Cafeteria"}</h1>
          <span className="text-sm text-gray-500">
            Last updated: {new Date(lastUpdate).toLocaleTimeString()}
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CafeteriaMenu key={lastUpdate} />
          <FoodGallery key={lastUpdate} />
        </div>
        <div className="space-y-8">
          <CafeNews key={lastUpdate} />
          <IceCreamStatus key={lastUpdate} />
        </div>
      </div>
    </div>
  );
}
