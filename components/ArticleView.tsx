import React from 'react';
import { Article } from '../types';
import { X, Lock, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ArticleViewProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
  isSubscribed: boolean;
  onSubscribeClick: () => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({ 
  article, 
  isOpen, 
  onClose, 
  isSubscribed, 
  onSubscribeClick 
}) => {
  if (!isOpen || !article) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-dark-900/60 backdrop-blur-sm"
            onClick={onClose}
        />
        
        <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white w-full max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header Image */}
          <div className="relative h-64 sm:h-80 flex-shrink-0">
            <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-colors"
            >
                <X className="w-6 h-6" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 sm:p-8">
                <span className="inline-block px-3 py-1 mb-3 bg-orange-500 text-white text-xs font-bold uppercase tracking-wider rounded-md">
                    {article.source}
                </span>
                <h2 className="text-2xl sm:text-4xl font-display font-bold text-white leading-tight">
                    {article.title}
                </h2>
                <div className="flex items-center mt-4 text-white/80 text-sm">
                    <span>By {article.author}</span>
                    <span className="mx-2">•</span>
                    <span>{article.date}</span>
                </div>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto p-6 sm:p-10 relative">
            <div className="prose prose-lg prose-orange max-w-none">
                <p className="lead font-medium text-dark-800 mb-6 text-lg">
                    {article.summary}
                </p>
                
                <div className="relative">
                    {/* The Full Content */}
                    <div className={`space-y-4 text-dark-800/80 leading-relaxed ${!isSubscribed ? 'gradient-blur h-[200px] overflow-hidden select-none' : ''}`}>
                         {article.fullContent.split('\n\n').map((para, i) => (
                             <p key={i}>{para}</p>
                         ))}
                    </div>

                    {/* Paywall Overlay */}
                    {!isSubscribed && (
                        <div className="absolute inset-0 flex flex-col items-center justify-end pb-0">
                            <div className="w-full bg-cream-50 rounded-2xl p-8 border border-orange-100 shadow-xl text-center transform translate-y-4">
                                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Lock className="w-8 h-8 text-orange-500" />
                                </div>
                                <h3 className="font-display text-2xl font-bold text-dark-900 mb-2">
                                    Unlock Premium Insights 🚀
                                </h3>
                                <p className="text-dark-800/60 mb-6 max-w-md mx-auto">
                                    Get unlimited access to expert analysis, deep dives, and exclusive tech reporting.
                                </p>
                                <div className="flex items-center justify-center space-x-2 mb-8 text-sm text-dark-800/70">
                                    <CheckCircle2 className="w-4 h-4 text-green-500" /> <span>Ad-free reading</span>
                                    <CheckCircle2 className="w-4 h-4 text-green-500 ml-4" /> <span>Offline access</span>
                                </div>
                                <button 
                                    onClick={onSubscribeClick}
                                    className="w-full sm:w-auto px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg hover:shadow-orange-500/25 transition-all transform hover:-translate-y-1"
                                >
                                    Subscribe for ₦500/month
                                </button>
                                <p className="mt-4 text-xs text-gray-400">
                                    Secured by Paystack. Cancel anytime.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};