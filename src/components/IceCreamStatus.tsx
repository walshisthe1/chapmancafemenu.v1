"use client";

import { FC, useEffect, useState } from 'react';
import { getPageContent } from '@/utils/content';

interface IceCreamStatus {
  isWorking: boolean;
  flavors: {
    name: string;
    available: boolean;
  }[];
}

const IceCreamStatus: FC = () => {
  const [status, setStatus] = useState<IceCreamStatus | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      const content = await getPageContent();
      if (content) {
        setStatus(content.iceCreamStatus);
      }
    };

    fetchContent();
  }, []);

  if (!status) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-blue-500 p-4">
        <h2 className="text-xl font-bold text-white">Ice Cream Machine Status</h2>
      </div>
      <div className="p-8">
        <div className="flex items-center mb-4">
          <span className="font-medium mr-2">Machine is</span>
          <span className={`px-3 py-1 rounded ${
            status.isWorking 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {status.isWorking ? 'Working' : 'Out of Order'}
          </span>
        </div>
        
        {status.isWorking && (
          <div>
            <h3 className="font-medium mb-2">Available Flavors:</h3>
            <div className="grid grid-cols-2 gap-2">
              {status.flavors.map((flavor) => (
                <div key={flavor.name}>
                  <span className={`px-2 py-1 rounded block text-center ${
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
  );
};

export default IceCreamStatus; 