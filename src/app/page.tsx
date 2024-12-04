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

  useEffect(() => {
    // Initial load
    const loadContent = () => {
      const pageContent = getPageContent();
      if (pageContent) {
        setContent(pageContent);
      }
    };

    // Load content immediately
    loadContent();

    // Set up interval to check for updates every 30 seconds
    const interval = setInterval(loadContent, 30000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-800">{content?.title || "Chapman Cafeteria"}</h1>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CafeteriaMenu />
          <FoodGallery />
        </div>
        <div className="space-y-8">
          <CafeNews />
          <IceCreamStatus />
        </div>
      </div>
    </div>
  );
}
