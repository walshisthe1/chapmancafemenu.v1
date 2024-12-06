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
      <div className="bg-blue-500 p-4">
        <h2 className="text-xl font-bold text-white !important">Ice Cream Machine Status</h2>
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