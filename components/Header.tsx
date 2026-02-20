import React from 'react';
import { Menu, Search, Zap } from 'lucide-react';

export const Header: React.FC<{ isSubscribed: boolean }> = ({ isSubscribed }) => {
  return (
    <header className="sticky top-0 z-50 bg-cream-100/80 backdrop-blur-md border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-2">
            <div className="bg-orange-500 p-2 rounded-lg">
              <Zap className="h-6 w-6 text-white" fill="currentColor" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight text-dark-900">
              TechOrange
            </span>
          </div>

          <div className="flex items-center space-x-4">
             {isSubscribed && (
                 <span className="hidden sm:inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider rounded-full">
                     Premium Member
                 </span>
             )}
            <button className="p-2 text-dark-800 hover:text-orange-500 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button className="md:hidden p-2 text-dark-800">
              <Menu className="h-6 w-6" />
            </button>
            {!isSubscribed && (
              <button className="hidden md:block bg-dark-900 text-white px-5 py-2.5 rounded-full font-medium text-sm hover:bg-orange-500 transition-colors duration-300 shadow-lg hover:shadow-orange-500/20">
                Subscribe
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};