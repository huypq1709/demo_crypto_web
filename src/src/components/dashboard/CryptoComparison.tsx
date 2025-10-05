import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpDownIcon, ChevronDownIcon, XIcon, PlusIcon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const CryptoComparison: React.FC = () => {
  const [selectedCoins, setSelectedCoins] = useState<string[]>(['bitcoin', 'ethereum', 'cardano']);
  const [timeframe, setTimeframe] = useState<string>('7d');
  const [isTimeframeDropdownOpen, setIsTimeframeDropdownOpen] = useState(false);
  const [isCoinSelectorOpen, setIsCoinSelectorOpen] = useState(false);
  // Available coins for comparison
  const availableCoins = [{
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    color: '#F7931A'
  }, {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    color: '#627EEA'
  }, {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    color: '#0033AD'
  }, {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    color: '#00FFA3'
  }, {
    id: 'polkadot',
    name: 'Polkadot',
    symbol: 'DOT',
    color: '#E6007A'
  }, {
    id: 'binancecoin',
    name: 'Binance Coin',
    symbol: 'BNB',
    color: '#F0B90B'
  }, {
    id: 'ripple',
    name: 'XRP',
    symbol: 'XRP',
    color: '#23292F'
  }, {
    id: 'dogecoin',
    name: 'Dogecoin',
    symbol: 'DOGE',
    color: '#C2A633'
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
    id: '90d',
    name: '90 ngày'
  }, {
    id: '1y',
    name: '1 năm'
  }];
  // Generate sample comparison data
  const generateComparisonData = () => {
    const baseValues = {
      bitcoin: 48000,
      ethereum: 3100,
      cardano: 1.2,
      solana: 100,
      polkadot: 20,
      binancecoin: 400,
      ripple: 0.75,
      dogecoin: 0.12
    };
    const volatilities = {
      bitcoin: 1000,
      ethereum: 100,
      cardano: 0.05,
      solana: 5,
      polkadot: 0.8,
      binancecoin: 10,
      ripple: 0.02,
      dogecoin: 0.01
    };
    const dataPoints = timeframe === '24h' ? 24 : timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : timeframe === '90d' ? 90 : 365;
    // Calculate percentage changes from base values
    return Array.from({
      length: dataPoints
    }).map((_, index) => {
      const time = timeframe === '24h' ? `${index}:00` : timeframe === '7d' ? `Ngày ${index + 1}` : timeframe === '30d' ? `Ngày ${index + 1}` : timeframe === '90d' ? `Tuần ${Math.floor(index / 7) + 1}` : `Tháng ${Math.floor(index / 30) + 1}`;
      const result: any = {
        time
      };
      selectedCoins.forEach(coin => {
        // Generate price movements with some correlation but different volatilities
        const movement = Math.sin(index / (dataPoints / 6)) * volatilities[coin as keyof typeof volatilities] * (0.7 + 0.3 * Math.random());
        const price = baseValues[coin as keyof typeof baseValues] + movement;
        // Calculate percentage change from starting price
        const startPrice = baseValues[coin as keyof typeof baseValues];
        const percentChange = (price - startPrice) / startPrice * 100;
        result[`${coin}_percent`] = percentChange;
      });
      return result;
    });
  };
  const comparisonData = generateComparisonData();
  // Get the selected timeframe object
  const selectedTimeframeObj = timeframes.find(t => t.id === timeframe) || timeframes[0];
  // Get performance metrics
  const getPerformanceMetrics = (coinId: string) => {
    const firstValue = comparisonData[0][`${coinId}_percent`];
    const lastValue = comparisonData[comparisonData.length - 1][`${coinId}_percent`];
    const change = lastValue - firstValue;
    // Find max and min values
    let maxValue = -Infinity;
    let minValue = Infinity;
    comparisonData.forEach(data => {
      const value = data[`${coinId}_percent`];
      if (value > maxValue) maxValue = value;
      if (value < minValue) minValue = value;
    });
    // Calculate volatility (simplified as max - min)
    const volatility = maxValue - minValue;
    return {
      change,
      volatility,
      maxValue,
      minValue
    };
  };
  // Custom tooltip for the chart
  const CustomTooltip = ({
    active,
    payload,
    label
  }: any) => {
    if (active && payload && payload.length) {
      return <div className="bg-gray-800 border border-gray-700 p-3 rounded shadow-lg">
          <p className="text-gray-300 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => {
          const coin = availableCoins.find(c => `${c.id}_percent` === entry.dataKey);
          if (!coin) return null;
          return <div key={index} className="flex items-center mb-1">
                <div className="w-3 h-3 rounded-full mr-2" style={{
              backgroundColor: coin.color
            }}></div>
                <span className="text-gray-300">{coin.name}: </span>
                <span className="font-medium ml-1" style={{
              color: entry.value >= 0 ? '#10B981' : '#EF4444'
            }}>
                  {entry.value >= 0 ? '+' : ''}
                  {entry.value.toFixed(2)}%
                </span>
              </div>;
        })}
        </div>;
    }
    return null;
  };
  const handleRemoveCoin = (coinId: string) => {
    if (selectedCoins.length > 1) {
      setSelectedCoins(selectedCoins.filter(id => id !== coinId));
    }
  };
  const handleAddCoin = (coinId: string) => {
    if (selectedCoins.length < 5 && !selectedCoins.includes(coinId)) {
      setSelectedCoins([...selectedCoins, coinId]);
    }
    setIsCoinSelectorOpen(false);
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
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center">
          <div size={20} className="text-blue-400 mr-2" />
          <h2 className="text-xl font-semibold text-white">
            So sánh hiệu suất
          </h2>
        </div>
        {/* Timeframe Selector */}
        <div className="relative">
          <button className="bg-gray-700 hover:bg-gray-600 rounded-lg px-3 py-1.5 text-sm flex items-center" onClick={() => setIsTimeframeDropdownOpen(!isTimeframeDropdownOpen)}>
            {selectedTimeframeObj.name}{' '}
            <ChevronDownIcon size={16} className="ml-1" />
          </button>
          {isTimeframeDropdownOpen && <div className="absolute right-0 mt-1 w-32 bg-gray-700 border border-gray-600 rounded-lg shadow-lg z-10">
              {timeframes.map(t => <button key={t.id} className={`w-full text-left px-3 py-2 hover:bg-gray-600 ${t.id === timeframe ? 'bg-gray-600' : ''} first:rounded-t-lg last:rounded-b-lg`} onClick={() => {
            setTimeframe(t.id);
            setIsTimeframeDropdownOpen(false);
          }}>
                  {t.name}
                </button>)}
            </div>}
        </div>
      </div>
      {/* Selected Coins */}
      <div className="p-4 border-b border-gray-700 flex flex-wrap items-center gap-2">
        {selectedCoins.map(coinId => {
        const coin = availableCoins.find(c => c.id === coinId);
        if (!coin) return null;
        return <div key={coin.id} className="bg-gray-700 rounded-lg px-3 py-1.5 flex items-center" style={{
          borderLeft: `3px solid ${coin.color}`
        }}>
              <div className="mr-2 font-medium text-white">{coin.name}</div>
              <div className="text-gray-400 text-xs">({coin.symbol})</div>
              <button className="ml-2 text-gray-400 hover:text-gray-200" onClick={() => handleRemoveCoin(coin.id)}>
                <XIcon size={14} />
              </button>
            </div>;
      })}
        {selectedCoins.length < 5 && <div className="relative">
            <button className="bg-gray-700 hover:bg-gray-600 rounded-lg px-2 py-1.5 flex items-center text-gray-300" onClick={() => setIsCoinSelectorOpen(!isCoinSelectorOpen)}>
              <PlusIcon size={16} className="mr-1" /> Thêm
            </button>
            {isCoinSelectorOpen && <div className="absolute left-0 mt-1 w-48 bg-gray-700 border border-gray-600 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                {availableCoins.filter(coin => !selectedCoins.includes(coin.id)).map(coin => <button key={coin.id} className="w-full text-left px-3 py-2 hover:bg-gray-600 flex items-center" onClick={() => handleAddCoin(coin.id)}>
                      <div className="w-3 h-3 rounded-full mr-2" style={{
              backgroundColor: coin.color
            }}></div>
                      {coin.name}{' '}
                      <span className="text-gray-400 text-xs ml-1">
                        ({coin.symbol})
                      </span>
                    </button>)}
              </div>}
          </div>}
      </div>
      {/* Comparison Chart */}
      <div className="p-4 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={comparisonData} margin={{
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
          }} tickFormatter={value => `${value > 0 ? '+' : ''}${value}%`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend formatter={value => {
            const coinId = value.replace('_percent', '');
            const coin = availableCoins.find(c => c.id === coinId);
            return coin ? coin.name : value;
          }} />
            {selectedCoins.map(coinId => {
            const coin = availableCoins.find(c => c.id === coinId);
            if (!coin) return null;
            return <Line key={coin.id} type="monotone" dataKey={`${coin.id}_percent`} stroke={coin.color} strokeWidth={2} dot={false} activeDot={{
              r: 6,
              stroke: coin.color,
              strokeWidth: 2,
              fill: '#1F2937'
            }} />;
          })}
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* Performance Metrics */}
      <div className="p-4 border-t border-gray-700">
        <h3 className="font-medium text-white mb-3">
          Chỉ số hiệu suất ({selectedTimeframeObj.name})
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-700/50">
                <th className="p-2 text-left text-gray-300 font-medium">
                  Tiền điện tử
                </th>
                <th className="p-2 text-right text-gray-300 font-medium">
                  Thay đổi
                </th>
                <th className="p-2 text-right text-gray-300 font-medium">
                  Cao nhất
                </th>
                <th className="p-2 text-right text-gray-300 font-medium">
                  Thấp nhất
                </th>
                <th className="p-2 text-right text-gray-300 font-medium">
                  Độ biến động
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedCoins.map(coinId => {
              const coin = availableCoins.find(c => c.id === coinId);
              if (!coin) return null;
              const metrics = getPerformanceMetrics(coin.id);
              return <tr key={coin.id} className="border-t border-gray-700">
                    <td className="p-2">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{
                      backgroundColor: coin.color
                    }}></div>
                        <span className="font-medium text-white">
                          {coin.name}
                        </span>
                      </div>
                    </td>
                    <td className={`p-2 text-right ${metrics.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {metrics.change >= 0 ? '+' : ''}
                      {metrics.change.toFixed(2)}%
                    </td>
                    <td className="p-2 text-right text-green-500">
                      +{metrics.maxValue.toFixed(2)}%
                    </td>
                    <td className="p-2 text-right text-red-500">
                      {metrics.minValue.toFixed(2)}%
                    </td>
                    <td className="p-2 text-right text-gray-300">
                      {metrics.volatility.toFixed(2)}%
                    </td>
                  </tr>;
            })}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>;
};
export default CryptoComparison;