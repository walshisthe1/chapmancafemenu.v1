"use client";

import { FC, useEffect, useState } from 'react';
import { getPageContent } from '@/utils/content';

const CafeNews: FC = () => {
  const [news, setNews] = useState<string[]>([]);

  useEffect(() => {
    const content = getPageContent();
    if (content) {
      setNews(content.cafeNews);
    }
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-yellow-500 p-4">
        <h2 className="text-xl font-bold flex items-center gap-2 text-white !important">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
          </svg>
          Cafe News
        </h2>
      </div>
      <div className="p-4 space-y-4">
        {news.map((item, index) => (
          <div key={index} className="flex items-start gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-500 mt-2"></span>
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CafeNews; 