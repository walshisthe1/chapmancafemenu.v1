"use client";

import { FC, useEffect, useState } from 'react';
import { getPageContent } from '@/utils/content';

interface MenuItem {
  id: number;
  name: string;
  demand: number;
}

const getColorClass = (demand: number) => {
  if (demand <= 3) return 'bg-green-500';
  if (demand <= 7) return 'bg-yellow-500';
  return 'bg-red-500';
};

const CafeteriaMenu: FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [menuTitle, setMenuTitle] = useState('');
  const [mealOptionsTitle, setMealOptionsTitle] = useState('');
  const [date, setDate] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      const content = await getPageContent();
      if (content) {
        setMenuItems(content.menuItems);
        setMenuTitle(content.menuTitle);
        setMealOptionsTitle(content.mealOptionsTitle);
        setDate(content.date);
        setLastUpdated(content.lastUpdated);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="flex justify-between items-center bg-orange-500 p-4">
        <h2 className="text-xl font-bold text-white !important">{menuTitle}</h2>
        <span className="text-xl text-white !important">{date}</span>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">{mealOptionsTitle}</span>
          <div className="flex items-center space-x-4">
            <span className="text-lg font-semibold">Current Demand</span>
            <span className="text-gray-500 text-sm">Updated: {lastUpdated}</span>
          </div>
        </div>

        <div className="space-y-6">
          {menuItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${getColorClass(item.demand)}`}></span>
                <span className="text-lg">{item.name}</span>
              </span>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-6 h-6 rounded
                        ${i < item.demand ? getColorClass(item.demand) : 'bg-gray-200'}`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm font-medium w-10">{item.demand}/10</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CafeteriaMenu; 