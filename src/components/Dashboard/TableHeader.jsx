import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const TableHeader = () => {
  return (
    <div className="hidden md:grid grid-cols-12 bg-gray-100 p-2 rounded-t-lg">
      <div className="col-span-1 flex items-center space-x-1">
        <span className="text-sm font-medium text-gray-700">ID</span>
        <ChevronDownIcon className="h-4 w-4 text-gray-500" />
      </div>
      <div className="col-span-1 flex items-center">
        <span className="text-sm right-font-medium text-gray-700 font-semibold">Loading Date</span>
      </div>
      <div className="col-span-2 flex items-center">
        <span className="text-sm font-medium text-gray-700">Loading Point</span>
      </div>
      <div className="col-span-2 flex items-center">
        <span className="text-sm font-medium text-gray-700">Unloading Point</span>
      </div>
      <div className="col-span-2 flex items-center">
        <span className="text-sm font-medium text-gray-700">Details</span>
      </div>
      <div className="col-span-1 flex items-center justify-center">
        <span className="text-sm font-medium text-gray-700">Best Quote</span>
      </div>
    </div>
  );
};
  
export default TableHeader;

