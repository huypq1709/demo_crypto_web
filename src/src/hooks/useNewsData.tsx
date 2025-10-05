import React, { useEffect, useState, useCallback } from 'react';
import { fetchCryptoNews, NewsArticle } from '../api/newsApi';

export const useNewsData = (cryptoSymbol: string) => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // Map crypto symbols to full names
  const getCryptoName = (symbol: string): string => {
    const cryptoMap: Record<string, string> = {
      BTC: 'Bitcoin',
      ETH: 'Ethereum',
      ADA: 'Cardano',
      SOL: 'Solana',
      DOT: 'Polkadot'
    };
    return cryptoMap[symbol] || 'Cryptocurrency';
  };

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const cryptoName = getCryptoName(cryptoSymbol);
      const articles = await fetchCryptoNews(cryptoName);
      setNews(articles);
      setLastUpdated(new Date().toISOString());
    } catch (err) {
      setError('Không thể tải tin tức. Vui lòng thử lại sau.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [cryptoSymbol]);

  useEffect(() => {
    fetchNews();
    
    // Auto-refresh every 5 minutes for real-time updates
    const interval = setInterval(fetchNews, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [fetchNews]);

  return {
    news,
    loading,
    error,
    cryptoName: getCryptoName(cryptoSymbol),
    lastUpdated,
    refetch: fetchNews
  };
};
export default useNewsData;