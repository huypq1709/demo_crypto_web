import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChevronDownIcon, ZoomInIcon, ZoomOutIcon, DownloadIcon } from 'lucide-react';
interface PriceChartProps {
  coin: string;
  timeframe: string;
  onTimeframeChange: (timeframe: string) => void;
  onCoinChange: (coin: string) => void;
}
const PriceChart: React.FC<PriceChartProps> = ({
  coin,
  timeframe,
  onTimeframeChange,
  onCoinChange
}) => {
  const [isTimeframeDropdownOpen, setIsTimeframeDropdownOpen] = useState(false);
  const [isCoinDropdownOpen, setIsCoinDropdownOpen] = useState(false);
  // Sample price data
  const generatePriceData = () => {
    const basePrice = coin === 'bitcoin' ? 48000 : coin === 'ethereum' ? 3100 : 1.2;
    const volatility = coin === 'bitcoin' ? 1000 : coin === 'ethereum' ? 100 : 0.05;
    const dataPoints = timeframe === '24h' ? 24 : timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 365;
    return Array.from({
      length: dataPoints
    }).map((_, index) => {
      const time = timeframe === '24h' ? `${index}:00` : timeframe === '7d' ? `Day ${index + 1}` : timeframe === '30d' ? `Day ${index + 1}` : `Month ${Math.floor(index / 30) + 1}`;
      return {
        time,
        price: basePrice + Math.sin(index / (dataPoints / 10)) * volatility * Math.random(),
        volume: Math.floor(Math.random() * 1000000)
      };
    });
  };
  const priceData = generatePriceData();
  // Available coins
  const availableCoins = [{
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC'
  }, {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH'
  }, {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA'
  }];
  // Available timeframes
  const timeframes = [{
    id: '24h',
    name: '24 giờ'
  }, {
    id: '7d',
    name: '7 ngày'
  }, {
    id: '30d',
    name: '30 ngày'
  }, {
    id: '1y',
    name: '1 năm'
  }];
  const selectedCoin = availableCoins.find(c => c.id === coin) || availableCoins[0];
  const selectedTimeframeObj = timeframes.find(t => t.id === timeframe) || timeframes[0];
  // Calculate current price and change
  const currentPrice = priceData[priceData.length - 1].price;
  const previousPrice = priceData[0].price;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercentage = priceChange / previousPrice * 100;
  // Custom tooltip for the chart
  const CustomTooltip = ({
    active,
    payload,
    label
  }: any) => {
    if (active && payload && payload.length) {
      return <div className="bg-gray-800 border border-gray-700 p-3 rounded shadow-lg">
          <p className="text-gray-300 mb-1">{label}</p>
          <p className="font-medium text-blue-400">
            ${payload[0].value.toFixed(2)}
          </p>
          <p className="text-gray-400 text-sm">
            Volume: ${payload[0].payload.volume.toLocaleString()}
          </p>
        </div>;
    }
    return null;
  };
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
        <div className="flex items-center mb-4 sm:mb-0">
          <h2 className="text-xl font-semibold text-white mr-3">Biểu đồ giá</h2>
          {/* Coin Selector */}
          <div className="relative">
            <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 rounded-lg px-3 py-1.5 text-sm" onClick={() => setIsCoinDropdownOpen(!isCoinDropdownOpen)}>
              <div className="w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center mr-1">
                {selectedCoin.symbol.charAt(0)}
              </div>
              <span>{selectedCoin.name}</span>
              <ChevronDownIcon size={16} />
            </button>
            {isCoinDropdownOpen && <div className="absolute mt-1 w-40 bg-gray-700 border border-gray-600 rounded-lg shadow-lg z-10">
                {availableCoins.map(c => <button key={c.id} className={`w-full text-left px-3 py-2 hover:bg-gray-600 ${c.id === coin ? 'bg-gray-600' : ''} first:rounded-t-lg last:rounded-b-lg flex items-center`} onClick={() => {
              onCoinChange(c.id);
              setIsCoinDropdownOpen(false);
            }}>
                    <div className="w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center mr-2">
                      {c.symbol.charAt(0)}
                    </div>
                    {c.name}
                  </button>)}
              </div>}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {/* Timeframe Selector */}
          <div className="relative">
            <button className="bg-gray-700 hover:bg-gray-600 rounded-lg px-3 py-1.5 text-sm flex items-center" onClick={() => setIsTimeframeDropdownOpen(!isTimeframeDropdownOpen)}>
              {selectedTimeframeObj.name}{' '}
              <ChevronDownIcon size={16} className="ml-1" />
            </button>
            {isTimeframeDropdownOpen && <div className="absolute right-0 mt-1 w-32 bg-gray-700 border border-gray-600 rounded-lg shadow-lg z-10">
                {timeframes.map(t => <button key={t.id} className={`w-full text-left px-3 py-2 hover:bg-gray-600 ${t.id === timeframe ? 'bg-gray-600' : ''} first:rounded-t-lg last:rounded-b-lg`} onClick={() => {
              onTimeframeChange(t.id);
              setIsTimeframeDropdownOpen(false);
            }}>
                    {t.name}
                  </button>)}
              </div>}
          </div>
          {/* Chart Controls */}
          <div className="flex space-x-1">
            <button className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300">
              <ZoomInIcon size={16} />
            </button>
            <button className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300">
              <ZoomOutIcon size={16} />
            </button>
            <button className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300">
              <DownloadIcon size={16} />
            </button>
          </div>
        </div>
      </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-gray-700">
        <div>
          <div className="text-gray-400 text-sm">Giá hiện tại</div>
          <div className="text-2xl font-bold text-white">
            ${currentPrice.toFixed(2)}
          </div>
        </div>
        <div>
          <div className="text-gray-400 text-sm">
            Thay đổi ({selectedTimeframeObj.name})
          </div>
          <div className={`text-2xl font-bold ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {priceChange >= 0 ? '+' : ''}
            {priceChange.toFixed(2)} ({priceChangePercentage.toFixed(2)}%)
          </div>
        </div>
        <div>
          <div className="text-gray-400 text-sm">
            Khối lượng ({selectedTimeframeObj.name})
          </div>
          <div className="text-2xl font-bold text-white">
            $
            {(priceData.reduce((acc, item) => acc + item.volume, 0) / 1000000).toFixed(2)}
            M
          </div>
        </div>
      </div>
      <div className="p-4 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={priceData} margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="time" stroke="#9CA3AF" tick={{
            fill: '#9CA3AF'
          }} axisLine={{
            stroke: '#4B5563'
          }} />
            <YAxis stroke="#9CA3AF" tick={{
            fill: '#9CA3AF'
          }} axisLine={{
            stroke: '#4B5563'
          }} domain={['auto', 'auto']} tickFormatter={value => `$${value.toLocaleString()}`} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="price" stroke="#3B82F6" strokeWidth={2} dot={false} activeDot={{
            r: 6,
            stroke: '#3B82F6',
            strokeWidth: 2,
            fill: '#1E3A8A'
          }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>;
};
export default PriceChart;