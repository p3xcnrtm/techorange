import React from 'react';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-white px-3 py-1 rounded-full shadow-sm mb-6 border border-orange-100">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            <span className="text-sm font-medium text-dark-800">Live Updates Enabled</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-dark-900 leading-tight mb-6">
            Future tech, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400">
              decoded today.
            </span>
          </h1>
          <p className="text-xl text-dark-800/70 mb-8 max-w-2xl leading-relaxed">
            Curated insights from the world's leading tech publications. 
            We filter the noise so you can focus on the signal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-semibold rounded-full text-white bg-orange-500 hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/30">
              Start Reading
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-1/4 -mt-12 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
    </section>
  );
};
