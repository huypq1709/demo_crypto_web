import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUpIcon, TrendingDownIcon, ArrowRightIcon, ExternalLinkIcon } from 'lucide-react';
interface TrendingCoinsProps {
  onCoinSelect: (coin: string) => void;
}
const TrendingCoins: React.FC<TrendingCoinsProps> = ({
  onCoinSelect
}) => {
  // Sample trending coins data
  const trendingCoins = [{
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 48256.12,
    change: 2.4,
    volume: '24.5B',
    trending: 1,
    sentiment: 'positive',
    buzz: 95
  }, {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3156.78,
    change: 1.8,
    volume: '12.7B',
    trending: 2,
    sentiment: 'positive',
    buzz: 90
  }, {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    price: 102.45,
    change: 5.2,
    volume: '3.1B',
    trending: 3,
    sentiment: 'positive',
    buzz: 85
  }, {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    price: 1.22,
    change: -0.7,
    volume: '1.9B',
    trending: 4,
    sentiment: 'neutral',
    buzz: 75
  }, {
    id: 'polkadot',
    name: 'Polkadot',
    symbol: 'DOT',
    price: 21.36,
    change: -1.2,
    volume: '1.3B',
    trending: 5,
    sentiment: 'neutral',
    buzz: 70
  }];
  return <motion.div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg h-full" initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5
  }}>
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center">
          <div size={20} className="text-orange-400 mr-2" />
          <h2 className="text-xl font-semibold text-white">
            Tiền điện tử xu hướng
          </h2>
        </div>
        <a href="#" className="text-blue-400 hover:text-blue-300 text-sm flex items-center">
          Xem tất cả <ArrowRightIcon size={16} className="ml-1" />
        </a>
      </div>
      <div className="divide-y divide-gray-700">
        {trendingCoins.map((coin, index) => <motion.div key={coin.id} className="p-4 hover:bg-gray-700/30 cursor-pointer" onClick={() => onCoinSelect(coin.id)} initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: index * 0.1
      }} whileHover={{
        backgroundColor: 'rgba(55, 65, 81, 0.5)'
      }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-6 h-6 bg-gray-700 rounded-full text-gray-400 text-xs font-medium mr-3">
                  {coin.trending}
                </div>
                <div>
                  <div className="flex items-center">
                    <div className="font-medium text-white">{coin.name}</div>
                    <div className="text-gray-400 text-xs ml-1">
                      {coin.symbol}
                    </div>
                  </div>
                  <div className="flex items-center mt-1">
                    <div className={`h-1.5 w-16 bg-gray-700 rounded-full overflow-hidden mr-2`}>
                      <div className={`h-full ${coin.sentiment === 'positive' ? 'bg-green-500' : coin.sentiment === 'negative' ? 'bg-red-500' : 'bg-gray-500'}`} style={{
                    width: `${coin.buzz}%`
                  }}></div>
                    </div>
                    <div className="text-xs text-gray-400">
                      Buzz {coin.buzz}%
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-white">
                  ${coin.price.toLocaleString()}
                </div>
                <div className={`flex items-center justify-end text-xs ${coin.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {coin.change >= 0 ? <TrendingUpIcon size={12} className="mr-1" /> : <TrendingDownIcon size={12} className="mr-1" />}
                  {coin.change >= 0 ? '+' : ''}
                  {coin.change}%
                </div>
              </div>
            </div>
          </motion.div>)}
      </div>
      <div className="p-4 border-t border-gray-700 bg-gray-700/20">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-400">Cập nhật: 2 phút trước</div>
          <a href="#" className="text-sm text-blue-400 hover:text-blue-300 flex items-center">
            Phân tích xu hướng <ExternalLinkIcon size={12} className="ml-1" />
          </a>
        </div>
      </div>
    </motion.div>;
};
export default TrendingCoins;