import React, { Suspense } from 'react';
import useNewsData from '../../hooks/useNewsData';
import { NewsArticle } from '../../api/newsApi';
import { motion } from 'framer-motion';
import { ArrowRightIcon, TrendingUpIcon, TrendingDownIcon, RefreshCwIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '../../styles/news-cards.css';
interface NewsSectionProps {
  cryptoSymbol: string;
}
const NewsCard: React.FC<{
  article: NewsArticle;
  index: number;
}> = ({
  article,
  index
}) => {
  const {
    t
  } = useTranslation();
  const {
    title,
    url,
    image,
    sentiment,
    publishedAt,
    source
  } = article;
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };
  const sentimentIcon = sentiment.label === t('news.sentiment.positive') ? <TrendingUpIcon size={16} className="mr-1" /> : sentiment.label === t('news.sentiment.negative') ? <TrendingDownIcon size={16} className="mr-1" /> : null;
  return <motion.div 
    className="news-card-container"
    initial={{
      opacity: 0,
      y: 20
    }} 
    whileInView={{
      opacity: 1,
      y: 0
    }} 
    viewport={{
      once: true,
      margin: '-100px'
    }} 
    transition={{
      duration: 0.5,
      delay: index * 0.1
    }}
  >
    <a href={url} target="_blank" rel="noopener noreferrer" className="block h-full">
      <div className={`news-card ${sentiment.color === 'green' ? 'positive-sentiment' : sentiment.color === 'red' ? 'negative-sentiment' : 'neutral-sentiment'}`}>
        <div className="relative overflow-hidden">
          <motion.img 
            src={image} 
            alt={title} 
            className="card-image w-full" 
            loading="lazy" 
            whileHover={{
              scale: 1.05
            }} 
            transition={{
              duration: 0.3
            }} 
          />
          <div className="sentiment-badge">
            {sentimentIcon}
            {sentiment.label}
          </div>
        </div>
        <div className="card-content">
          <h3 className="card-title">
            {title}
          </h3>
          <div className="card-footer">
            <span className="source-tag">
              {source.name}
            </span>
            <span className="date-text">{formatDate(publishedAt)}</span>
          </div>
        </div>
      </div>
    </a>
  </motion.div>;
};
const NewsSection: React.FC<NewsSectionProps> = ({
  cryptoSymbol
}) => {
  const {
    t
  } = useTranslation();
  const {
    news,
    loading,
    error,
    cryptoName,
    lastUpdated,
    refetch
  } = useNewsData(cryptoSymbol);
  if (loading) {
    return <section id="news" className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">
              {t('news.loading')}
            </h2>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
            </div>
          </div>
        </div>
      </section>;
  }
  if (error) {
    return <section id="news" className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">
              {t('news.error')}
            </h2>
            <p className="text-red-400">{error}</p>
          </div>
        </div>
      </section>;
  }
  return <section id="news" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-16" initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5
      }}>
          <div className="flex items-center justify-center mb-4">
            <motion.div className="inline-block" whileHover={{
            scale: 1.05
          }}>
              <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-500/20 text-blue-400 rounded-full">
                {t('news.badge')}
              </span>
            </motion.div>
            {lastUpdated && (
              <span className="ml-4 text-sm text-gray-400">
                Last updated: {new Date(lastUpdated).toLocaleTimeString()}
              </span>
            )}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            {t('news.title')}{' '}
            <span className="text-blue-400">{cryptoName}</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('news.subtitle')}
          </p>
        </motion.div>
        <div className="news-grid">
          {news.map((article, index) => <NewsCard key={index} article={article} index={index} />)}
        </div>
        <motion.div className="mt-12 text-center" initial={{
        opacity: 0
      }} whileInView={{
        opacity: 1
      }} viewport={{
        once: true
      }} transition={{
        delay: 0.5
      }}>
          <div className="flex items-center justify-center space-x-4">
            <motion.button 
              onClick={refetch}
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RefreshCwIcon size={16} className="mr-2" />
              Refresh News
            </motion.button>
            <motion.a href="#" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors font-medium" whileHover={{
            x: 5
          }}>
              {t('common.viewAll')} <ArrowRightIcon size={16} className="ml-2" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>;
};
// Wrap with Suspense for code splitting
const LazyNewsSection: React.FC<NewsSectionProps> = props => {
  const { t } = useTranslation();
  
  return (
    <Suspense fallback={
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">
            {t('news.loading')}
          </h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
          </div>
        </div>
      </section>
    }>
      <NewsSection {...props} />
    </Suspense>
  );
};
export default LazyNewsSection;