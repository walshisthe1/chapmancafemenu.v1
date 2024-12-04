'use client';

import { useEffect, useState } from 'react';
import { getPageContent } from '@/utils/content';
import dynamic from 'next/dynamic';

const CafeteriaMenu = dynamic(() => import('@/components/CafeteriaMenu'), {
  ssr: false,
  loading: () => <div>Loading menu...</div>
});
const CafeNews = dynamic(() => import('@/components/CafeNews'), {
  ssr: false,
  loading: () => <div>Loading news...</div>
});
const IceCreamStatus = dynamic(() => import('@/components/IceCreamStatus'), {
  ssr: false,
  loading: () => <div>Loading status...</div>
});
const FoodGallery = dynamic(() => import('@/components/FoodGallery'), {
  ssr: false,
  loading: () => <div>Loading gallery...</div>
});

export default function Home() {
  const [content, setContent] = useState<any>(null);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  useEffect(() => {
    let isSubscribed = true;

    const loadContent = async () => {
      const pageContent = getPageContent();
      if (pageContent && isSubscribed) {
        setContent(pageContent);
        setLastUpdate(Date.now());
      }
    };

    loadContent();
    const interval = setInterval(loadContent, 5000);

    return () => {
      isSubscribed = false;
      clearInterval(interval);
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
