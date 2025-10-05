import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUpIcon, BarChart3Icon, AlertTriangleIcon, WalletIcon } from 'lucide-react';
const QuickActions: React.FC = () => {
  const actions = [{
    icon: <TrendingUpIcon size={20} />,
    title: 'Mua/Bán',
    description: 'Giao dịch tiền điện tử',
    color: 'bg-blue-500/20 text-blue-400'
  }, {
    icon: <BarChart3Icon size={20} />,
    title: 'Phân tích',
    description: 'Xem biểu đồ chi tiết',
    color: 'bg-purple-500/20 text-purple-400'
  }, {
    icon: <AlertTriangleIcon size={20} />,
    title: 'Cảnh báo',
    description: 'Tạo cảnh báo giá mới',
    color: 'bg-orange-500/20 text-orange-400'
  }, {
    icon: <WalletIcon size={20} />,
    title: 'Ví',
    description: 'Quản lý tài sản',
    color: 'bg-green-500/20 text-green-400'
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
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-white">Thao tác nhanh</h2>
      </div>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action, index) => <motion.div key={index} className="p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors" initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: index * 0.1
      }} whileHover={{
        scale: 1.03
      }} whileTap={{
        scale: 0.98
      }}>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${action.color}`}>
              {action.icon}
            </div>
            <h3 className="font-medium text-white">{action.title}</h3>
            <p className="text-gray-400 text-sm">{action.description}</p>
          </motion.div>)}
      </div>
    </motion.div>;
};
export default QuickActions;