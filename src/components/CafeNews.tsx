"use client";

import { useState, useEffect } from 'react';
import { getPageContent } from '@/utils/content';

interface CafeNewsProps {
  className?: string;
}

export default function CafeNews({ className }: CafeNewsProps) {
  const [news, setNews] = useState<string[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const content = await getPageContent();
      setNews(content.cafeNews);
    };

    fetchNews();
  }, []);

  return (
    <div className={className}>
      <div className="bg-yellow-500 text-white p-4 rounded-t-lg">
        <h2 className="text-xl font-bold">Cafe News</h2>
      </div>
      <div className="border rounded-b-lg p-4 bg-white shadow-sm">
        <ul className="space-y-2">
          {news.map((item, index) => (
            <li key={index} className="text-gray-700">• {item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
} 