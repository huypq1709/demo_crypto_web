import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpIcon, ArrowDownIcon, DollarSignIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
const PortfolioSummary: React.FC = () => {
  // Sample portfolio data
  const portfolioValue = 24689.56;
  const portfolioChange = 1256.89;
  const portfolioChangePercent = 5.37;
  const portfolioData = [{
    name: 'Bitcoin',
    value: 45,
    color: '#F7931A'
  }, {
    name: 'Ethereum',
    value: 30,
    color: '#627EEA'
  }, {
    name: 'Cardano',
    value: 15,
    color: '#0033AD'
  }, {
    name: 'Solana',
    value: 10,
    color: '#00FFA3'
  }];
  // Sample transaction history
  const recentTransactions = [{
    id: 1,
    type: 'buy',
    coin: 'Bitcoin',
    amount: '0.05 BTC',
    value: '$2,412.80',
    date: '2 giờ trước'
  }, {
    id: 2,
    type: 'sell',
    coin: 'Ethereum',
    amount: '1.2 ETH',
    value: '$3,788.14',
    date: '1 ngày trước'
  }, {
    id: 3,
    type: 'buy',
    coin: 'Solana',
    amount: '10 SOL',
    value: '$1,024.50',
    date: '3 ngày trước'
  }];
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
  return <motion.div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg overflow-hidden" initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5
  }}>
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-white">Danh mục đầu tư</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Portfolio Value */}
        <div className="p-6 border-b md:border-b-0 md:border-r border-gray-700">
          <div className="text-gray-400 mb-2">Tổng giá trị</div>
          <div className="text-3xl font-bold text-white">
            ${portfolioValue.toLocaleString()}
          </div>
          <div className={`mt-2 flex items-center ${portfolioChangePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {portfolioChangePercent >= 0 ? <ArrowUpIcon size={16} className="mr-1" /> : <ArrowDownIcon size={16} className="mr-1" />}
            <span>
              {portfolioChangePercent >= 0 ? '+' : ''}$
              {portfolioChange.toLocaleString()} ({portfolioChangePercent}%)
            </span>
          </div>
          <div className="text-gray-400 text-sm mt-1">so với 24 giờ trước</div>
          <div className="mt-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm mr-2">
              Mua
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm">
              Bán
            </button>
          </div>
        </div>
        {/* Portfolio Distribution */}
        <div className="p-6 border-b md:border-b-0 md:border-r border-gray-700">
          <div className="text-gray-400 mb-2">Phân bổ tài sản</div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={portfolioData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
                  {portfolioData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {portfolioData.map((item, index) => <div key={index} className="flex items-center">
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
        {/* Recent Transactions */}
        <div className="p-6">
          <div className="text-gray-400 mb-2">Giao dịch gần đây</div>
          <div className="space-y-4">
            {recentTransactions.map(transaction => <div key={transaction.id} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${transaction.type === 'buy' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                  {transaction.type === 'buy' ? <ArrowUpIcon size={18} /> : <ArrowDownIcon size={18} />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-white">
                        {transaction.type === 'buy' ? 'Mua' : 'Bán'}{' '}
                        {transaction.coin}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {transaction.date}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-white">
                        {transaction.amount}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {transaction.value}
                      </div>
                    </div>
                  </div>
                </div>
              </div>)}
          </div>
          <div className="mt-4 text-center">
            <button className="text-blue-400 hover:text-blue-300 text-sm">
              Xem tất cả giao dịch
            </button>
          </div>
        </div>
      </div>
    </motion.div>;
};
export default PortfolioSummary;