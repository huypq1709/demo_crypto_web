import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUpIcon, TrendingDownIcon, ArrowRightIcon, FilterIcon, RefreshCwIcon } from 'lucide-react';
import { useCryptoData } from '../../hooks/useCryptoData';
import { formatNumber, formatPrice } from '../../api/cryptoApi';
const MarketOverview: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'gainers' | 'losers'>('all');
  const { cryptoData, loading, error, lastUpdated, refetch } = useCryptoData();
  const filteredData = cryptoData.filter(coin => {
    if (filter === 'gainers') return coin.change24h > 0;
    if (filter === 'losers') return coin.change24h < 0;
    return true;
  });

  if (loading) {
    return (
      <motion.div 
        className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button 
            onClick={refetch}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </motion.div>
    );
  }
  return <motion.div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg" initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5
  }}>
      <div className="p-4 border-b border-gray-700 flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white mb-2 sm:mb-0">
            Market Overview
          </h2>
          <p className="text-gray-400 text-sm">
            Top 10 cryptocurrencies by market cap
            {lastUpdated && (
              <span className="ml-2 text-xs">
                • Last updated: {new Date(lastUpdated).toLocaleTimeString()}
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="bg-gray-700 rounded-lg flex">
            <button className={`px-3 py-1 text-sm rounded-lg ${filter === 'all' ? 'bg-blue-600 text-white' : 'text-gray-300'}`} onClick={() => setFilter('all')}>
              Tất cả
            </button>
            <button className={`px-3 py-1 text-sm rounded-lg ${filter === 'gainers' ? 'bg-green-600 text-white' : 'text-gray-300'}`} onClick={() => setFilter('gainers')}>
              Tăng
            </button>
            <button className={`px-3 py-1 text-sm rounded-lg ${filter === 'losers' ? 'bg-red-600 text-white' : 'text-gray-300'}`} onClick={() => setFilter('losers')}>
              Giảm
            </button>
          </div>
          <button 
            onClick={refetch}
            className="p-2 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600"
            title="Refresh data"
          >
            <RefreshCwIcon size={18} />
          </button>
          <button 
            className="p-2 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600"
            title="Filter options"
          >
            <FilterIcon size={18} />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-700/50">
            <tr>
              <th className="p-4 text-gray-300 font-medium">#</th>
              <th className="p-4 text-gray-300 font-medium">Tên</th>
              <th className="p-4 text-gray-300 font-medium">Giá</th>
              <th className="p-4 text-gray-300 font-medium">24h %</th>
              <th className="p-4 text-gray-300 font-medium">Khối lượng 24h</th>
              <th className="p-4 text-gray-300 font-medium">Vốn hóa</th>
              <th className="p-4 text-gray-300 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((coin, index) => <motion.tr key={coin.id} className="border-t border-gray-700 hover:bg-gray-700/30 transition-colors" initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: index * 0.05
          }}>
                <td className="p-4 text-gray-400">{coin.rank}</td>
                <td className="p-4">
                  <div className="flex items-center">
                    {coin.image ? (
                      <img 
                        src={coin.image} 
                        alt={coin.name}
                        className="w-8 h-8 rounded-full mr-3"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <div className={`w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-3 ${coin.image ? 'hidden' : ''}`}>
                      {coin.symbol.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-white">{coin.name}</div>
                      <div className="text-gray-400 text-sm">{coin.symbol}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-white font-medium">
                  {formatPrice(coin.price)}
                </td>
                <td className="p-4">
                  <div className={`flex items-center ${coin.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {coin.change24h >= 0 ? <TrendingUpIcon size={16} className="mr-1" /> : <TrendingDownIcon size={16} className="mr-1" />}
                    {coin.change24h >= 0 ? '+' : ''}
                    {coin.change24h.toFixed(2)}%
                  </div>
                </td>
                <td className="p-4 text-gray-300">{formatNumber(coin.volume24h)}</td>
                <td className="p-4 text-gray-300">{formatNumber(coin.marketCap)}</td>
                <td className="p-4">
                  <button 
                    className="p-2 text-gray-400 hover:text-blue-400 rounded-full hover:bg-gray-700"
                    title="View details"
                  >
                    <ArrowRightIcon size={16} />
                  </button>
                </td>
              </motion.tr>)}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-gray-700 text-center">
        <a href="#" className="text-blue-400 hover:text-blue-300 text-sm flex items-center justify-center">
          Xem tất cả tiền điện tử <ArrowRightIcon size={16} className="ml-2" />
        </a>
      </div>
    </motion.div>;
};
export default MarketOverview;