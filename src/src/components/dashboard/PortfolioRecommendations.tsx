import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUpIcon, ShieldIcon, ZapIcon, BarChart2Icon, ArrowRightIcon, InfoIcon } from 'lucide-react';
const PortfolioRecommendations: React.FC = () => {
  // Sample portfolio recommendations
  const recommendations = [{
    id: 1,
    type: 'rebalance',
    title: 'Cân bằng lại danh mục',
    description: 'Danh mục của bạn đang thiên về Bitcoin. Cân bằng lại để giảm thiểu rủi ro.',
    action: 'Giảm Bitcoin, tăng Ethereum và Cardano',
    impact: 'Giảm rủi ro, cải thiện Sharpe Ratio',
    icon: <BarChart2Icon size={20} />,
    color: 'bg-blue-600/20 text-blue-400'
  }, {
    id: 2,
    type: 'diversify',
    title: 'Đa dạng hóa danh mục',
    description: 'Thêm tài sản có tương quan thấp để cải thiện hiệu suất danh mục.',
    action: 'Thêm Polkadot (DOT) và Chainlink (LINK)',
    impact: 'Giảm biến động, cải thiện lợi nhuận dài hạn',
    icon: <ShieldIcon size={20} />,
    color: 'bg-purple-600/20 text-purple-400'
  }, {
    id: 3,
    type: 'opportunity',
    title: 'Cơ hội đầu tư',
    description: 'Solana đang có xu hướng tăng mạnh với các chỉ báo kỹ thuật tích cực.',
    action: 'Xem xét tăng phân bổ cho Solana',
    impact: 'Tiềm năng tăng lợi nhuận ngắn hạn',
    icon: <TrendingUpIcon size={20} />,
    color: 'bg-green-600/20 text-green-400'
  }, {
    id: 4,
    type: 'risk',
    title: 'Cảnh báo rủi ro',
    description: 'Cardano có biến động lớn gần đây do các yếu tố nền tảng.',
    action: 'Xem xét giảm phân bổ cho Cardano',
    impact: 'Giảm thiểu rủi ro giảm giá',
    icon: <ZapIcon size={20} />,
    color: 'bg-red-600/20 text-red-400'
  }];
  // Portfolio health score (0-100)
  const healthScore = 78;
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
          <ShieldIcon size={20} className="text-blue-400 mr-2" />
          <h2 className="text-xl font-semibold text-white">
            Khuyến nghị danh mục
          </h2>
        </div>
        <div className="flex items-center">
          <div className="text-sm text-gray-400 mr-2">Sức khỏe danh mục:</div>
          <div className="flex items-center">
            <div className="w-24 h-2 bg-gray-700 rounded-full mr-2 overflow-hidden">
              <div className={`h-full ${healthScore >= 80 ? 'bg-green-500' : healthScore >= 60 ? 'bg-blue-500' : healthScore >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{
              width: `${healthScore}%`
            }}></div>
            </div>
            <div className={`font-medium ${healthScore >= 80 ? 'text-green-500' : healthScore >= 60 ? 'text-blue-500' : healthScore >= 40 ? 'text-yellow-500' : 'text-red-500'}`}>
              {healthScore}/100
            </div>
          </div>
        </div>
      </div>
      {/* Health Score Explanation */}
      <div className="p-4 bg-blue-900/20 border-b border-gray-700 flex items-start">
        <InfoIcon size={18} className="text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-gray-300 text-sm">
            Điểm sức khỏe danh mục được tính dựa trên sự đa dạng, phân bổ tài
            sản, hiệu suất lịch sử và mức độ rủi ro. Điểm từ 80-100 là Xuất sắc,
            60-79 là Tốt, 40-59 là Trung bình, dưới 40 là Cần cải thiện.
          </p>
        </div>
      </div>
      {/* Recommendations */}
      <div className="divide-y divide-gray-700">
        {recommendations.map((recommendation, index) => <motion.div key={recommendation.id} className="p-4 hover:bg-gray-700/30" initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: index * 0.1
      }}>
            <div className="flex">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${recommendation.color}`}>
                {recommendation.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-white">
                    {recommendation.title}
                  </h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${recommendation.type === 'opportunity' ? 'bg-green-500/20 text-green-400' : recommendation.type === 'risk' ? 'bg-red-500/20 text-red-400' : recommendation.type === 'rebalance' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>
                    {recommendation.type === 'opportunity' ? 'Cơ hội' : recommendation.type === 'risk' ? 'Rủi ro' : recommendation.type === 'rebalance' ? 'Cân bằng' : 'Đa dạng hóa'}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mt-1">
                  {recommendation.description}
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-400">Hành động đề xuất:</span>
                    <div className="text-white">{recommendation.action}</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Tác động tiềm năng:</span>
                    <div className="text-white">{recommendation.impact}</div>
                  </div>
                </div>
                <div className="mt-3 flex justify-end">
                  <button className="text-blue-400 hover:text-blue-300 text-sm flex items-center">
                    Xem chi tiết <ArrowRightIcon size={14} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>)}
      </div>
      {/* Custom Recommendation */}
      <div className="p-4 border-t border-gray-700 bg-gray-700/30">
        <div className="text-center">
          <h3 className="font-medium text-white mb-2">
            Nhận phân tích chi tiết hơn
          </h3>
          <p className="text-gray-300 text-sm mb-4">
            Nhận phân tích chuyên sâu và khuyến nghị được cá nhân hóa từ các
            chuyên gia của chúng tôi.
          </p>
          <motion.button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg" whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }}>
            Yêu cầu tư vấn cá nhân
          </motion.button>
        </div>
      </div>
    </motion.div>;
};
export default PortfolioRecommendations;