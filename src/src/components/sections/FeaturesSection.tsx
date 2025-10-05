import React, { Fragment } from 'react';
import { TrendingUpIcon, NewspaperIcon, AlertTriangleIcon, BarChartIcon, ZapIcon, ShieldIcon, RefreshCwIcon, SmartphoneIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}
const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  delay
}) => <motion.div className="bg-gray-800 border border-gray-700 p-6 rounded-lg shadow-lg hover:shadow-blue-900/20 transition-all duration-300" initial={{
  opacity: 0,
  y: 20
}} whileInView={{
  opacity: 1,
  y: 0
}} viewport={{
  once: true,
  margin: '-100px'
}} transition={{
  duration: 0.5,
  delay: delay
}} whileHover={{
  y: -5,
  boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1)'
}}>
    <motion.div className="text-blue-400 mb-4 bg-blue-400/10 w-12 h-12 rounded-lg flex items-center justify-center" whileHover={{
    rotate: 5,
    scale: 1.1
  }}>
      {icon}
    </motion.div>
    <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </motion.div>;
const FeaturesSection: React.FC = () => {
  const {
    t
  } = useTranslation();
  const features = [{
    icon: <TrendingUpIcon size={24} />,
    title: t('features.trendAnalysis.title'),
    description: t('features.trendAnalysis.description')
  }, {
    icon: <NewspaperIcon size={24} />,
    title: t('features.latestNews.title'),
    description: t('features.latestNews.description')
  }, {
    icon: <AlertTriangleIcon size={24} />,
    title: t('features.volatilityAlerts.title'),
    description: t('features.volatilityAlerts.description')
  }, {
    icon: <BarChartIcon size={24} />,
    title: t('features.technicalAnalysis.title'),
    description: t('features.technicalAnalysis.description')
  }, {
    icon: <ZapIcon size={24} />,
    title: t('features.fastTrading.title'),
    description: t('features.fastTrading.description')
  }, {
    icon: <ShieldIcon size={24} />,
    title: t('features.maximumSecurity.title'),
    description: t('features.maximumSecurity.description')
  }, {
    icon: <RefreshCwIcon size={24} />,
    title: t('features.continuousUpdates.title'),
    description: t('features.continuousUpdates.description')
  }, {
    icon: <SmartphoneIcon size={24} />,
    title: t('features.crossPlatform.title'),
    description: t('features.crossPlatform.description')
  }];
  return <section id="features" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
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
              {t('features.badge')}
            </span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            {t('features.title').split('thông minh').map((part, i) => {
            return i === 0 ? <Fragment key={i}>
                    {part}
                    <span className="text-blue-400">
                      {t('features.title').includes('thông minh') ? 'thông minh' : 'smart'}
                    </span>
                  </Fragment> : part;
          })}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('features.subtitle')}
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} delay={index * 0.1} />)}
        </div>
        <motion.div className="mt-16 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-8 border border-gray-700 shadow-lg" initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5,
        delay: 0.2
      }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4 text-white">
                {t('features.readyToExperience')}
              </h3>
              <p className="text-gray-300 mb-6">{t('features.subtitle')}</p>
              <motion.button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg shadow-blue-500/20" whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                {t('features.startFreeTrial')}
              </motion.button>
            </div>
            <div className="hidden md:block">
              <motion.img src="https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNyeXB0byUyMGRhc2hib2FyZHxlbnwwfHwwfHx8MA%3D%3D" alt="Cryptocurrency dashboard interface" className="rounded-lg shadow-lg" initial={{
              scale: 0.9,
              rotate: -5
            }} whileHover={{
              scale: 1,
              rotate: 0
            }} transition={{
              duration: 0.3
            }} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>;
};
export default FeaturesSection;