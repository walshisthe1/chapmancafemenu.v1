'use client';

import { useState, useEffect } from 'react';
import { getPageContent } from '@/utils/content';
import Link from 'next/link';

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

export default function HomePage() {
  const [content, setContent] = useState<PageContent | null>(null);

  useEffect(() => {
    getPageContent().then(data => setContent(data));
  }, []);

  if (!content) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-gray-800">{content.title}</h1>
          </div>
          <span className="text-sm text-gray-600">
            Last updated: {content.lastUpdated}
          </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left Section - Menu */}
          <div className="md:col-span-3">
            <div className="bg-orange-500 text-white p-4 rounded-t-lg flex justify-between items-center">
              <h2 className="text-xl font-bold">{content.menuTitle}</h2>
              <span className="text-lg font-medium">{content.date}</span>
            </div>
            
            <div className="border rounded-b-lg p-6 bg-white shadow-sm">
              <h3 className="text-lg font-semibold mb-4">{content.mealOptionsTitle}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {content.menuItems.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4 bg-white shadow">
                    <h4 className="text-lg font-semibold">{item.name}</h4>
                    <div className="mt-3">
                      <div className="flex flex-col">
                        <span className="text-base font-medium text-gray-600 mb-1">Demand Level:</span>
                        <div className="flex items-center">
                          <div className="flex gap-[1px]">
                            {[...Array(10)].map((_, index) => (
                              <div 
                                key={index}
                                className={`h-7 w-5 ${
                                  index < item.demand
                                    ? item.demand <= 3
                                      ? 'text-green-500'
                                      : item.demand <= 7
                                        ? 'text-yellow-500'
                                        : 'text-red-500'
                                    : 'text-gray-200'
                                }`}
                              >
                                <svg 
                                  viewBox="0 0 24 24" 
                                  fill="currentColor"
                                  className="h-full w-full"
                                >
                                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                </svg>
                              </div>
                            ))}
                          </div>
                          <span className="ml-2 text-base font-medium text-gray-600">{item.demand}/10</span>
                        </div>
                      </div>
                    </div>
                    {item.photo && (
                      <div className="mt-3 aspect-square w-full relative">
                        <img
                          src={item.photo}
                          alt={item.name}
                          className="absolute inset-0 w-full h-full object-cover rounded"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section - News and Status */}
          <div className="md:col-span-1">
            <div className="bg-yellow-500 text-white p-4 rounded-t-lg">
              <h2 className="text-xl font-bold">Cafe News</h2>
            </div>
            <div className="border rounded-b-lg p-4 bg-white shadow-sm mb-6">
              <ul className="space-y-2 text-sm">
                {content.cafeNews.map((news, index) => (
                  <li key={index} className="text-gray-700">• {news}</li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-500 text-white p-4 rounded-t-lg">
              <h2 className="text-xl font-bold">Ice Cream Machine Status</h2>
            </div>
            <div className="border rounded-b-lg p-4 bg-white shadow-sm">
              <div className="flex items-center mb-3">
                <span className="font-medium mr-2 text-lg">Ice cream machine is</span>
                <span className={`px-2 py-1 rounded text-sm font-medium ${
                  content.iceCreamStatus.isWorking 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {content.iceCreamStatus.isWorking ? 'Working' : 'Out of Order'}
                </span>
              </div>
              
              {content.iceCreamStatus.isWorking && (
                <div>
                  <p className="font-medium mb-2 text-md">Available Flavors:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {content.iceCreamStatus.flavors.map((flavor) => (
                      <div key={flavor.name} className="flex items-center">
                        <span className={`px-2 py-1 rounded text-sm font-medium w-full text-center ${
                          flavor.available 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {flavor.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
