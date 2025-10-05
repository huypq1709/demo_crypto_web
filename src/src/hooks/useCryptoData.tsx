import { useState, useEffect } from 'react';
import { fetchTop10Cryptos, CryptoData } from '../api/cryptoApi';

export const useCryptoData = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTop10Cryptos();
      setCryptoData(data);
      setLastUpdated(new Date().toISOString());
    } catch (err) {
      setError('Failed to fetch crypto data. Please try again later.');
      console.error('Error fetching crypto data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    cryptoData,
    loading,
    error,
    lastUpdated,
    refetch: fetchData
  };
};

export default useCryptoData;
