import React from 'react';
import { Article } from '../types';
import { Clock, ExternalLink } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onClick: (article: Article) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick }) => {
  return (
    <article 
      className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-orange-50 transform hover:-translate-y-1 cursor-pointer"
      onClick={() => onClick(article)}
    >
      <div className="relative h-56 overflow-hidden">
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold text-dark-900 uppercase tracking-wider rounded-md shadow-sm">
            {article.source}
          </span>
        </div>
      </div>
      
      <div className="flex flex-col flex-grow p-6">
        <div className="flex items-center text-sm text-dark-800/50 mb-3 space-x-4">
            <span className="flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1" />
                {article.date}
            </span>
            <span className="font-medium text-orange-500">{article.author}</span>
        </div>
        
        <h3 className="font-display text-xl font-bold text-dark-900 mb-3 line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors">
          {article.title}
        </h3>
        
        <p className="text-dark-800/70 line-clamp-3 mb-6 text-sm leading-relaxed flex-grow">
          {article.summary}
        </p>
        
        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
          <span className="text-sm font-semibold text-dark-900 group-hover:text-orange-500 flex items-center transition-colors">
            Read Article
            <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </article>
  );
};