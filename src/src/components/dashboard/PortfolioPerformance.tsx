import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDownIcon, ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
const PortfolioPerformance: React.FC = () => {
  const [timeframe, setTimeframe] = useState<string>('1m');
  const [isTimeframeDropdownOpen, setIsTimeframeDropdownOpen] = useState(false);
  // Available timeframes
  const timeframes = [{
    id: '1w',
    name: '1 tuần'
  }, {
    id: '1m',
    name: '1 tháng'
  }, {
    id: '3m',
    name: '3 tháng'
  }, {
    id: '1y',
    name: '1 năm'
  }, {
    id: 'all',
    name: 'Tất cả'
  }];
  // Get selected timeframe object
  const selectedTimeframeObj = timeframes.find(t => t.id === timeframe) || timeframes[0];
  // Generate sample portfolio performance data
  const generatePerformanceData = () => {
    const dataPoints = timeframe === '1w' ? 7 : timeframe === '1m' ? 30 : timeframe === '3m' ? 90 : timeframe === '1y' ? 365 : 500;
    const startValue = 20000;
    let currentValue = startValue;
    return Array.from({
      length: dataPoints
    }).map((_, index) => {
      // Add some randomness to the portfolio value with an upward trend
      const change = (Math.random() - 0.45) * 500; // Slightly biased towards positive
      currentValue += change;
      // Ensure value doesn't go below a reasonable amount
      if (currentValue < 5000) currentValue = 5000 + Math.random() * 2000;
      const date = new Date();
      if (timeframe === '1w') {
        date.setDate(date.getDate() - (6 - index));
      } else if (timeframe === '1m') {
        date.setDate(date.getDate() - (29 - index));
      } else if (timeframe === '3m') {
        date.setDate(date.getDate() - (89 - index));
      } else if (timeframe === '1y') {
        date.setDate(date.getDate() - (364 - index));
      } else {
        date.setDate(date.getDate() - (499 - index));
      }
      const formattedDate = timeframe === '1w' || timeframe === '1m' ? date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit'
      }) : timeframe === '3m' ? date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit'
      }) : date.toLocaleDateString('vi-VN', {
        month: '2-digit',
        year: '2-digit'
      });
      return {
        date: formattedDate,
        value: currentValue,
        btcValue: currentValue * (0.8 + Math.random() * 0.4),
        ethValue: currentValue * (0.7 + Math.random() * 0.4) // ETH comparison
      };
    });
  };
  const performanceData = generatePerformanceData();
  // Calculate performance metrics
  const calculateMetrics = () => {
    const firstValue = performanceData[0].value;
    const lastValue = performanceData[performanceData.length - 1].value;
    const absoluteChange = lastValue - firstValue;
    const percentChange = absoluteChange / firstValue * 100;
    // Calculate daily average return
    const dailyReturns: number[] = [];
    for (let i = 1; i < performanceData.length; i++) {
      const dailyReturn = (performanceData[i].value - performanceData[i - 1].value) / performanceData[i - 1].value;
      dailyReturns.push(dailyReturn);
    }
    const avgDailyReturn = dailyReturns.reduce((sum, value) => sum + value, 0) / dailyReturns.length;
    const annualizedReturn = (Math.pow(1 + avgDailyReturn, 365) - 1) * 100;
    // Calculate volatility (standard deviation of returns)
    const meanReturn = avgDailyReturn;
    const squaredDifferences = dailyReturns.map(return_ => Math.pow(return_ - meanReturn, 2));
    const variance = squaredDifferences.reduce((sum, value) => sum + value, 0) / squaredDifferences.length;
    const volatility = Math.sqrt(variance) * Math.sqrt(365) * 100; // Annualized volatility
    // Calculate max drawdown
    let maxDrawdown = 0;
    let peak = performanceData[0].value;
    for (const dataPoint of performanceData) {
      if (dataPoint.value > peak) {
        peak = dataPoint.value;
      }
      const drawdown = (peak - dataPoint.value) / peak;
      if (drawdown > maxDrawdown) {
        maxDrawdown = drawdown;
      }
    }
    return {
      currentValue: lastValue,
      absoluteChange,
      percentChange,
      annualizedReturn,
      volatility,
      maxDrawdown: maxDrawdown * 100
    };
  };
  const metrics = calculateMetrics();
  // Custom tooltip for the chart
  const CustomTooltip = ({
    active,
    payload,
    label
  }: any) => {
    if (active && payload && payload.length) {
      return <div className="bg-gray-800 border border-gray-700 p-3 rounded shadow-lg">
          <p className="text-gray-300 mb-2">{label}</p>
          <p className="font-medium text-blue-400 mb-1">
            Danh mục: ${payload[0].value.toLocaleString()}
          </p>
          <p className="text-gray-300 text-sm">
            BTC: ${payload[1].value.toLocaleString()}
          </p>
          <p className="text-gray-300 text-sm">
            ETH: ${payload[2].value.toLocaleString()}
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
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center">
          <div size={20} className="text-blue-400 mr-2" />
          <h2 className="text-xl font-semibold text-white">
            Hiệu suất danh mục đầu tư
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
      {/* Performance Metrics */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <div className="text-gray-400 text-sm">Giá trị hiện tại</div>
          <div className="text-2xl font-bold text-white">
            ${metrics.currentValue.toLocaleString()}
          </div>
        </div>
        <div>
          <div className="text-gray-400 text-sm">
            Thay đổi ({selectedTimeframeObj.name})
          </div>
          <div className={`text-2xl font-bold flex items-center ${metrics.percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {metrics.percentChange >= 0 ? <ArrowUpIcon size={20} className="mr-1" /> : <ArrowDownIcon size={20} className="mr-1" />}
            {metrics.percentChange >= 0 ? '+' : ''}
            {metrics.percentChange.toFixed(2)}%
            <span className="text-gray-400 text-sm ml-2">
              (${Math.abs(metrics.absoluteChange).toLocaleString()})
            </span>
          </div>
        </div>
        <div>
          <div className="text-gray-400 text-sm">Lợi nhuận hàng năm</div>
          <div className={`text-2xl font-bold ${metrics.annualizedReturn >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {metrics.annualizedReturn >= 0 ? '+' : ''}
            {metrics.annualizedReturn.toFixed(2)}%
          </div>
        </div>
      </div>
      {/* Performance Chart */}
      <div className="p-4 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={performanceData} margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9CA3AF" tick={{
            fill: '#9CA3AF'
          }} axisLine={{
            stroke: '#4B5563'
          }} />
            <YAxis stroke="#9CA3AF" tick={{
            fill: '#9CA3AF'
          }} axisLine={{
            stroke: '#4B5563'
          }} tickFormatter={value => `$${value.toLocaleString()}`} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="value" stroke="#3B82F6" fill="url(#colorValue)" strokeWidth={2} activeDot={{
            r: 6,
            stroke: '#3B82F6',
            strokeWidth: 2,
            fill: '#1F2937'
          }} />
            <Area type="monotone" dataKey="btcValue" stroke="#F7931A" fill="url(#colorBtc)" strokeWidth={1.5} strokeDasharray="5 5" activeDot={{
            r: 4,
            stroke: '#F7931A',
            strokeWidth: 2,
            fill: '#1F2937'
          }} />
            <Area type="monotone" dataKey="ethValue" stroke="#627EEA" fill="url(#colorEth)" strokeWidth={1.5} strokeDasharray="5 5" activeDot={{
            r: 4,
            stroke: '#627EEA',
            strokeWidth: 2,
            fill: '#1F2937'
          }} />
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorBtc" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F7931A" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#F7931A" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorEth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#627EEA" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#627EEA" stopOpacity={0} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {/* Additional Performance Metrics */}
      <div className="p-4 border-t border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Risk Metrics */}
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-medium text-white mb-3">
              Chỉ số rủi ro
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-300">Độ biến động</span>
                  <span className="text-white font-medium">
                    {metrics.volatility.toFixed(2)}%
                  </span>
                </div>
                <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500" style={{
                  width: `${Math.min(metrics.volatility, 50)}%`
                }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-300">Sụt giảm tối đa</span>
                  <span className="text-red-500 font-medium">
                    {metrics.maxDrawdown.toFixed(2)}%
                  </span>
                </div>
                <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500" style={{
                  width: `${Math.min(metrics.maxDrawdown, 50)}%`
                }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-300">Sharpe Ratio</span>
                  <span className="text-white font-medium">
                    {((metrics.annualizedReturn - 2) / metrics.volatility).toFixed(2)}
                  </span>
                </div>
                <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{
                  width: `${Math.min((metrics.annualizedReturn - 2) / metrics.volatility * 50, 100)}%`
                }}></div>
                </div>
              </div>
            </div>
          </div>
          {/* Comparison to Benchmarks */}
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-medium text-white mb-3">
              So sánh hiệu suất
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-gray-300">Danh mục của bạn</span>
                  </div>
                  <span className={`font-medium ${metrics.percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {metrics.percentChange >= 0 ? '+' : ''}
                    {metrics.percentChange.toFixed(2)}%
                  </span>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <span className="text-gray-300">Bitcoin</span>
                  </div>
                  <span className="font-medium text-green-500">+12.45%</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                    <span className="text-gray-300">Ethereum</span>
                  </div>
                  <span className="font-medium text-green-500">+8.92%</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
                    <span className="text-gray-300">S&P 500</span>
                  </div>
                  <span className="font-medium text-red-500">-2.18%</span>
                </div>
              </div>
            </div>
          </div>
          {/* Asset Allocation */}
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-medium text-white mb-3">
              Phân bổ tài sản
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-300">Bitcoin (BTC)</span>
                  <span className="text-white font-medium">45%</span>
                </div>
                <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500" style={{
                  width: '45%'
                }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-300">Ethereum (ETH)</span>
                  <span className="text-white font-medium">30%</span>
                </div>
                <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500" style={{
                  width: '30%'
                }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-300">Cardano (ADA)</span>
                  <span className="text-white font-medium">15%</span>
                </div>
                <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{
                  width: '15%'
                }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-300">Solana (SOL)</span>
                  <span className="text-white font-medium">10%</span>
                </div>
                <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{
                  width: '10%'
                }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>;
};
export default PortfolioPerformance;