import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUpIcon, TrendingDownIcon, BarChart2Icon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
const MarketSentimentAnalysis: React.FC = () => {
  // Sample sentiment data
  const sentimentData = [{
    name: 'Tích cực',
    value: 65,
    color: '#10B981'
  }, {
    name: 'Trung lập',
    value: 25,
    color: '#6B7280'
  }, {
    name: 'Tiêu cực',
    value: 10,
    color: '#EF4444'
  }];
  // Sample social media metrics
  const socialMetrics = [{
    name: 'Twitter',
    mentions: 12500,
    sentiment: 7.2,
    change: 15
  }, {
    name: 'Reddit',
    mentions: 8700,
    sentiment: 6.5,
    change: -3
  }, {
    name: 'Telegram',
    mentions: 5300,
    sentiment: 8.1,
    change: 22
  }, {
    name: 'YouTube',
    mentions: 3200,
    sentiment: 7.8,
    change: 5
  }];
  // Sample fear & greed index history (0-100)
  const fearGreedHistory = [{
    date: '1 tuần trước',
    value: 25,
    status: 'Sợ hãi cực độ'
  }, {
    date: '6 ngày trước',
    value: 28,
    status: 'Sợ hãi'
  }, {
    date: '5 ngày trước',
    value: 32,
    status: 'Sợ hãi'
  }, {
    date: '4 ngày trước',
    value: 45,
    status: 'Trung lập'
  }, {
    date: '3 ngày trước',
    value: 52,
    status: 'Trung lập'
  }, {
    date: '2 ngày trước',
    value: 58,
    status: 'Tham lam'
  }, {
    date: 'Hôm qua',
    value: 65,
    status: 'Tham lam'
  }, {
    date: 'Hôm nay',
    value: 72,
    status: 'Tham lam'
  }];
  // Current fear & greed index
  const currentFearGreed = fearGreedHistory[fearGreedHistory.length - 1];
  // Custom tooltip for the chart
  const CustomTooltip = ({
    active,
    payload
  }: any) => {
    if (active && payload && payload.length) {
      return <div className="bg-gray-800 border border-gray-700 p-2 rounded shadow-lg">
          <p className="font-medium">{`${payload[0].name}: ${payload[0].value}%`}</p>
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
      <div className="p-4 border-b border-gray-700 flex items-center">
        <BarChart2Icon size={20} className="text-blue-400 mr-2" />
        <h2 className="text-xl font-semibold text-white">
          Phân tích tâm lý thị trường
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Fear & Greed Index */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-medium text-white mb-3">
            Chỉ số Fear & Greed
          </h3>
          <div className="relative h-48 flex items-center justify-center">
            <div className="absolute inset-0">
              <div className="w-full h-full relative">
                <div className="absolute inset-0 rounded-full border-8 border-gray-600"></div>
                <div className="absolute inset-0 rounded-full border-8 transition-all duration-1000" style={{
                clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.sin(currentFearGreed.value / 100 * 2 * Math.PI)}% ${50 - 50 * Math.cos(currentFearGreed.value / 100 * 2 * Math.PI)}%, ${currentFearGreed.value > 75 ? '100% 0%, 100% 50%' : ''}${currentFearGreed.value > 50 ? '100% 100%, 50% 100%' : ''}${currentFearGreed.value > 25 ? '0% 100%, 0% 50%' : ''})`,
                borderColor: currentFearGreed.value <= 25 ? '#EF4444' : currentFearGreed.value <= 50 ? '#FBBF24' : currentFearGreed.value <= 75 ? '#34D399' : '#10B981'
              }}></div>
              </div>
            </div>
            <div className="z-10 text-center">
              <div className="text-4xl font-bold text-white">
                {currentFearGreed.value}
              </div>
              <div className="text-lg font-medium" style={{
              color: currentFearGreed.value <= 25 ? '#EF4444' : currentFearGreed.value <= 50 ? '#FBBF24' : currentFearGreed.value <= 75 ? '#34D399' : '#10B981'
            }}>
                {currentFearGreed.status}
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-xs">
              <span className="text-red-500">Sợ hãi cực độ</span>
              <span className="text-green-500">Tham lam cực độ</span>
            </div>
            <div className="h-2 bg-gray-600 rounded-full mt-1 overflow-hidden">
              <div className="h-full transition-all duration-500" style={{
              width: `${currentFearGreed.value}%`,
              background: 'linear-gradient(to right, #EF4444, #FBBF24, #34D399, #10B981)'
            }}></div>
            </div>
          </div>
        </div>
        {/* Market Sentiment Distribution */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-medium text-white mb-3">
            Phân bố tâm lý thị trường
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sentimentData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
                  {sentimentData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {sentimentData.map((item, index) => <div key={index} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{
              backgroundColor: item.color
            }}></div>
                <div className="text-sm text-gray-300">
                  {item.name}{' '}
                  <span className="text-gray-400">({item.value}%)</span>
                </div>
              </div>)}
          </div>
        </div>
        {/* Social Media Sentiment */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-medium text-white mb-3">
            Tâm lý mạng xã hội
          </h3>
          <div className="space-y-3">
            {socialMetrics.map((platform, index) => <div key={index} className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-white">{platform.name}</div>
                  <div className="text-xs text-gray-400">
                    {platform.mentions.toLocaleString()} lượt đề cập
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-white">
                    {platform.sentiment}/10
                  </div>
                  <div className={`flex items-center text-xs ${platform.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {platform.change >= 0 ? <TrendingUpIcon size={12} className="mr-1" /> : <TrendingDownIcon size={12} className="mr-1" />}
                    {platform.change >= 0 ? '+' : ''}
                    {platform.change}%
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </div>
      {/* Fear & Greed History */}
      <div className="p-6 pt-0">
        <h3 className="text-lg font-medium text-white mb-3">
          Lịch sử chỉ số Fear & Greed
        </h3>
        <div className="overflow-x-auto">
          <div className="min-w-full flex space-x-3">
            {fearGreedHistory.map((item, index) => <div key={index} className="flex flex-col items-center">
                <div className="text-xs text-gray-400 mb-1">{item.date}</div>
                <div className={`w-10 h-24 rounded-t-full relative overflow-hidden`} style={{
              background: 'linear-gradient(to top, #EF4444, #FBBF24, #34D399, #10B981)'
            }}>
                  <div className="absolute bottom-0 left-0 right-0 bg-gray-800" style={{
                height: `${100 - item.value}%`
              }}></div>
                </div>
                <div className="text-xs font-medium mt-1" style={{
              color: item.value <= 25 ? '#EF4444' : item.value <= 50 ? '#FBBF24' : item.value <= 75 ? '#34D399' : '#10B981'
            }}>
                  {item.value}
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </motion.div>;
};
export default MarketSentimentAnalysis;