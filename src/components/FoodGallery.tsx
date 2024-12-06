"use client";

import { FC, useEffect, useState } from 'react';
import { getPageContent } from '@/utils/content';
import Image from 'next/image';

interface MenuItem {
  id: number;
  name: string;
  demand: number;
  photo?: string;
}

const FoodGallery: FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchContent = async () => {
      const content = await getPageContent();
      if (content) {
        setMenuItems(content.menuItems);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden mt-8">
      <div className="bg-orange-500 p-4">
        <h2 className="text-xl font-bold text-black">Today&apos;s Menu Photos</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuItems.map((item) => (
            item.photo && (
              <div key={item.id} className="flex flex-col items-center">
                <span className="text-lg font-semibold mb-2">{item.name}</span>
                <div className="relative w-32 h-32">
                  <Image 
                    src={item.photo}
                    alt={item.name}
                    fill
                    className="object-cover rounded-lg shadow-md"
                  />
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodGallery; 