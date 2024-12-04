"use client";

import { FC, useEffect, useState } from 'react';
import { getPageContent } from '@/utils/content';

interface IceCreamStatus {
  isWorking: boolean;
  flavors: { name: string; available: boolean; }[];
}

const IceCreamStatus: FC = () => {
  const [status, setStatus] = useState<IceCreamStatus>({
    isWorking: true,
    flavors: []
  });

  useEffect(() => {
    const content = getPageContent();
    if (content) {
      setStatus(content.iceCreamStatus);
    }
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-blue-500 text-white p-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4c1.93 0 3.5 1.57 3.5 3.5 0 .89-.34 1.69-.88 2.31.53.62.88 1.42.88 2.31v1.38c0 1.93-1.57 3.5-3.5 3.5s-3.5-1.57-3.5-3.5v-1.38c0-.89.34-1.69.88-2.31A3.46 3.46 0 018.5 7.5C8.5 5.57 10.07 4 12 4zM12 17v4M9 21h6" />
          </svg>
          Ice Cream Machine Status
        </h2>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">Ice cream machine is</span>
          <span 
            className={`px-3 py-1 ${
              status.isWorking 
                ? 'bg-green-100 text-green-800 [animation:pulse_0.5s_cubic-bezier(0.4,0,0.6,1)_infinite]' 
                : 'bg-red-100 text-red-800'
            } rounded-full text-sm font-medium transition-all duration-300`}
          >
            {status.isWorking ? 'Working' : 'Out of Order'}
          </span>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Available Flavors:</h3>
          <div className="space-y-2">
            {status.flavors.map((flavor, index) => (
              <div key={index} className="flex justify-between items-center">
                <span>{flavor.name}</span>
                <span className={`px-3 py-1 ${flavor.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} rounded-full text-sm`}>
                  {flavor.available ? 'Available' : 'Unavailable'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IceCreamStatus; 