import React from 'react';
import { motion } from 'framer-motion';
import { NewspaperIcon, ArrowRightIcon } from 'lucide-react';
const RecentNews: React.FC = () => {
  // Sample news data
  const newsArticles = [{
    id: 1,
    title: 'Bitcoin vượt mốc $48,000 sau khi Fed giữ nguyên lãi suất',
    summary: 'Giá Bitcoin đã tăng vọt sau khi Cục Dự trữ Liên bang Mỹ quyết định giữ nguyên lãi suất, mang lại niềm tin cho các nhà đầu tư cryptocurrency.',
    source: 'CryptoNews',
    time: '2 giờ trước',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    sentiment: 'positive'
  }, {
    id: 2,
    title: 'Ethereum chuẩn bị cho bản nâng cấp lớn, giá tăng 8% trong tuần',
    summary: 'Ethereum đang chuẩn bị cho một bản nâng cấp quan trọng nhằm cải thiện khả năng mở rộng và giảm phí giao dịch, khiến giá ETH tăng mạnh.',
    source: 'BlockchainInsider',
    time: '5 giờ trước',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    sentiment: 'positive'
  }, {
    id: 3,
    title: 'Cảnh báo: Lừa đảo cryptocurrency gia tăng, người dùng cần cẩn trọng',
    summary: 'Các chuyên gia an ninh mạng cảnh báo về sự gia tăng của các vụ lừa đảo liên quan đến cryptocurrency, người dùng cần thận trọng với các khoản đầu tư.',
    source: 'SecurityAlert',
    time: '1 ngày trước',
    image: 'https://images.unsplash.com/photo-1621504450181-5fdb1eaeb4c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    sentiment: 'negative'
  }];
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
          <NewspaperIcon size={20} className="text-blue-400 mr-2" />
          <h2 className="text-xl font-semibold text-white">Tin tức mới nhất</h2>
        </div>
        <a href="#" className="text-blue-400 hover:text-blue-300 text-sm flex items-center">
          Xem tất cả <ArrowRightIcon size={16} className="ml-1" />
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {newsArticles.map((article, index) => <motion.div key={article.id} className="bg-gray-700 rounded-lg overflow-hidden border border-gray-600 hover:border-gray-500 transition-colors" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: index * 0.1
      }} whileHover={{
        y: -5
      }}>
            <div className="h-40 overflow-hidden relative">
              <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
              <div className={`absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded-full ${article.sentiment === 'positive' ? 'bg-green-500/80 text-white' : article.sentiment === 'negative' ? 'bg-red-500/80 text-white' : 'bg-gray-500/80 text-white'}`}>
                {article.sentiment === 'positive' ? 'Tích cực' : article.sentiment === 'negative' ? 'Tiêu cực' : 'Trung lập'}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-white mb-2 line-clamp-2">
                {article.title}
              </h3>
              <p className="text-gray-300 text-sm mb-3 line-clamp-3">
                {article.summary}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{article.source}</span>
                <span>{article.time}</span>
              </div>
            </div>
          </motion.div>)}
      </div>
    </motion.div>;
};
export default RecentNews;