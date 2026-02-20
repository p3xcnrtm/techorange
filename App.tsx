import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ArticleCard } from './components/ArticleCard';
import { ArticleView } from './components/ArticleView';
import { PaywallModal } from './components/PaywallModal';
import { Footer } from './components/Footer';
import { useSubscription } from './hooks/useSubscription';
import { fetchLatestNews } from './services/geminiService';
import { Article } from './types';
import { Loader2, RefreshCw } from 'lucide-react';

const App: React.FC = () => {
  const { subscription, subscribe } = useSubscription();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showPaywallModal, setShowPaywallModal] = useState(false);
  const [isArticleViewOpen, setIsArticleViewOpen] = useState(false);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    setLoading(true);
    const news = await fetchLatestNews();
    setArticles(news);
    setLoading(false);
  };

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setIsArticleViewOpen(true);
  };

  const handleSubscribeClick = () => {
    // If opening from inside the article view, we keep article view open but show modal over it
    // Or we can close article view. Let's keep article view open.
    setShowPaywallModal(true);
  };

  const handlePaymentSuccess = () => {
    subscribe();
    setShowPaywallModal(false);
    // Article view remains open and updates to show content
  };

  return (
    <div className="min-h-screen bg-cream-50 font-sans text-dark-900">
      <Header isSubscribed={subscription.isSubscribed} />
      
      <main>
        <Hero />
        
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-3xl font-bold text-dark-900">Latest Stories</h2>
            <button 
                onClick={loadNews} 
                disabled={loading}
                className="flex items-center text-sm font-medium text-orange-600 hover:text-orange-700 disabled:opacity-50"
            >
                {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <RefreshCw className="mr-2 h-4 w-4" />}
                Refresh
            </button>
          </div>

          {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {[1, 2, 3, 4, 5, 6].map((i) => (
                     <div key={i} className="bg-white rounded-2xl h-96 animate-pulse p-4 flex flex-col">
                         <div className="w-full h-48 bg-gray-200 rounded-xl mb-4"></div>
                         <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                         <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                         <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                         <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                         <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                     </div>
                 ))}
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <ArticleCard 
                  key={article.id} 
                  article={article} 
                  onClick={handleArticleClick} 
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />

      {/* Article Reading Modal */}
      <ArticleView 
        article={selectedArticle}
        isOpen={isArticleViewOpen}
        onClose={() => setIsArticleViewOpen(false)}
        isSubscribed={subscription.isSubscribed}
        onSubscribeClick={handleSubscribeClick}
      />

      {/* Paywall Payment Modal */}
      <PaywallModal 
        isOpen={showPaywallModal}
        onClose={() => setShowPaywallModal(false)}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default App;