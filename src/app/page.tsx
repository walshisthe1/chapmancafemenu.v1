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

// Add default content
const defaultContent = {
  title: "Chapman Cafeteria",
  menuItems: [],
  cafeNews: [],
  iceCreamStatus: {
    isWorking: true,
    flavors: []
  }
};

export default function Home() {
  const [content, setContent] = useState(defaultContent); // Initialize with default content
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const loadContent = () => {
      const pageContent = getPageContent();
      if (pageContent) {
        setContent(pageContent);
        setLastUpdate(Date.now());
        setRefreshKey(prev => prev + 1);
      }
    };

    loadContent();
    const interval = setInterval(loadContent, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen p-8 bg-white text-black">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-800">{content.title}</h1>
          <span className="text-sm text-gray-600">
            Last updated: {new Date(lastUpdate).toLocaleTimeString()}
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CafeteriaMenu key={`menu-${refreshKey}`} />
          <FoodGallery key={`gallery-${refreshKey}`} />
        </div>
        <div className="space-y-8">
          <CafeNews key={`news-${refreshKey}`} />
          <IceCreamStatus key={`status-${refreshKey}`} />
        </div>
      </div>
    </div>
  );
}
