"use client";

import { FC, useEffect, useState } from 'react';
import { getPageContent } from '@/utils/content';

interface MenuItem {
  id: number;
  name: string;
  demand: number;
  photo?: string;
}

const FoodGallery: FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const content = getPageContent();
    if (content) {
      setMenuItems(content.menuItems);
    }
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden mt-8">
      <div className="bg-orange-500 text-white p-4">
        <h2 className="text-xl font-bold">Today's Menu Photos</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuItems.map((item) => (
            item.photo && (
              <div key={item.id} className="flex flex-col items-center">
                <span className="text-lg font-semibold mb-2">{item.name}</span>
                <img 
                  src={item.photo} 
                  alt={item.name} 
                  className="w-40 h-40 object-cover rounded-lg shadow-md"
                />
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodGallery; 