
import React from 'react';
import { Film } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-3">
          <Film className="h-8 w-8 text-blue-400" />
          <h1 className="text-2xl font-bold text-white">Movie Explorer</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
