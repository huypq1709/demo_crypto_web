import React, { Fragment } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BarChart3Icon, LineChartIcon, PieChartIcon, TrendingUpIcon, TrendingDownIcon, DollarSignIcon, RefreshCwIcon } from 'lucide-react';
import { useCryptoData } from '../../hooks/useCryptoData';
import { formatNumber, formatPrice } from '../../api/cryptoApi';
const AnalysisSection: React.FC = () => {
  const {
    t
  } = useTranslation();
  const { cryptoData, loading, error, lastUpdated, refetch } = useCryptoData();
  
  // Show only top 5 for landing page
  const top5CryptoData = cryptoData.slice(0, 5);
  return <section id="analysis" className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-600 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute top-40 left-20 w-60 h-60 bg-purple-600 rounded-full opacity-5 blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div className="text-center mb-16" initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5
      }}>
          <motion.div className="inline-block" whileHover={{
          scale: 1.05
        }}>
            <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-500/20 text-blue-400 rounded-full mb-4">
              {t('analysis.badge')}
            </span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            {t('analysis.title').split('thị trường').map((part, i) => {
            return i === 0 ? <Fragment key={i}>
                    {part}{' '}
                    <span className="text-blue-400">
                      {t('analysis.title').includes('thị trường') ? 'thị trường' : 'market'}
                    </span>
                  </Fragment> : part;
          })}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('analysis.subtitle')}
          </p>
        </motion.div>
        {/* Market Overview */}
        <div className="mb-16">
          <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-700 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {t('analysis.marketOverview')}
                </h3>
                {lastUpdated && (
                  <p className="text-gray-400 text-sm mt-1">
                    Last updated: {new Date(lastUpdated).toLocaleTimeString()}
                  </p>
                )}
              </div>
              <button 
                onClick={refetch}
                className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors"
                title="Refresh data"
              >
                <RefreshCwIcon size={18} />
              </button>
            </div>
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
              </div>
            ) : error ? (
              <div className="p-8 text-center">
                <p className="text-red-400 mb-4">{error}</p>
                <button 
                  onClick={refetch}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-700/50">
                    <tr>
                      <th className="p-4 text-gray-300 font-medium">
                        {t('common.name')}
                      </th>
                      <th className="p-4 text-gray-300 font-medium">
                        {t('analysis.price')}
                      </th>
                      <th className="p-4 text-gray-300 font-medium">24h %</th>
                      <th className="p-4 text-gray-300 font-medium">
                        {t('analysis.volume')} 24h
                      </th>
                      <th className="p-4 text-gray-300 font-medium">
                        {t('analysis.marketCap')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {top5CryptoData.map((crypto, index) => <motion.tr key={crypto.id} className="border-t border-gray-700 hover:bg-gray-700/30 transition-colors" initial={{
                    opacity: 0,
                    y: 10
                  }} whileInView={{
                    opacity: 1,
                    y: 0
                  }} viewport={{
                    once: true
                  }} transition={{
                    delay: index * 0.1
                  }}>
                        <td className="p-4">
                          <div className="flex items-center">
                            {crypto.image ? (
                              <img 
                                src={crypto.image} 
                                alt={crypto.name}
                                className="w-8 h-8 rounded-full mr-3"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                }}
                              />
                            ) : null}
                            <div className={`w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-3 ${crypto.image ? 'hidden' : ''}`}>
                              {crypto.symbol.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium text-white">
                                {crypto.name}
                              </div>
                              <div className="text-gray-400 text-sm">
                                {crypto.symbol}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-white font-medium">
                          {formatPrice(crypto.price)}
                        </td>
                        <td className="p-4">
                          <div className={`flex items-center ${crypto.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {crypto.change24h >= 0 ? <TrendingUpIcon size={16} className="mr-1" /> : <TrendingDownIcon size={16} className="mr-1" />}
                            {crypto.change24h >= 0 ? '+' : ''}
                            {crypto.change24h.toFixed(2)}%
                          </div>
                        </td>
                        <td className="p-4 text-gray-300">{formatNumber(crypto.volume24h)}</td>
                        <td className="p-4 text-gray-300">{formatNumber(crypto.marketCap)}</td>
                      </motion.tr>)}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        {/* Analysis Tools */}
        <motion.h3 className="text-2xl font-bold mb-6 text-white" initial={{
        opacity: 0,
        y: 10
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }}>
          {t('analysis.analysisTool.title')}
        </motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[{
          icon: <LineChartIcon size={24} />,
          title: t('analysis.analysisTool.technicalCharts.title'),
          description: t('analysis.analysisTool.technicalCharts.description')
        }, {
          icon: <BarChart3Icon size={24} />,
          title: t('analysis.analysisTool.volumeAnalysis.title'),
          description: t('analysis.analysisTool.volumeAnalysis.description')
        }, {
          icon: <PieChartIcon size={24} />,
          title: t('analysis.analysisTool.portfolio.title'),
          description: t('analysis.analysisTool.portfolio.description')
        }].map((tool, index) => <motion.div key={index} className="bg-gray-800 border border-gray-700 p-6 rounded-lg" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: index * 0.1
        }} whileHover={{
          y: -5,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
        }}>
              <div className="text-blue-400 mb-4 bg-blue-400/10 w-12 h-12 rounded-lg flex items-center justify-center">
                {tool.icon}
              </div>
              <h4 className="text-lg font-semibold mb-2 text-white">
                {tool.title}
              </h4>
              <p className="text-gray-300">{tool.description}</p>
            </motion.div>)}
        </div>
        {/* CTA */}
        <motion.div className="bg-gradient-to-r from-blue-900/50 to-gray-800 rounded-xl p-8 border border-gray-700" initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }}>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-white mb-2">
                {t('analysis.weeklyReport.title')}
              </h3>
              <p className="text-gray-300">
                {t('analysis.weeklyReport.subtitle')}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <input type="email" placeholder={t('analysis.weeklyReport.placeholder')} className="px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <motion.button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg" whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                {t('analysis.weeklyReport.button')}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>;
};
export default AnalysisSection;