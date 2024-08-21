import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-100 p-4">
      <div className="text-xl font-bold mb-8">Company Name</div>
      <ul>
        <li className="mb-4">
          <a href="#" className="flex items-center p-2 text-gray-700 hover:bg-blue-200 rounded">
            <span className="ml-3">Loads</span>
          </a>
        </li>
        
      </ul>
    </div>
  );
};

export default Sidebar;
