import React, { Fragment } from 'react';
import Button from '../common/Button';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import CryptoBubblesAnimation from '../animations/CryptoBubblesAnimation';
interface HeroSectionProps {
  onGetStartedClick?: () => void;
}
const HeroSection: React.FC<HeroSectionProps> = ({
  onGetStartedClick
}) => {
  const {
    t
  } = useTranslation();
  return <section id="hero" className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white pt-24 relative overflow-hidden min-h-screen">
      {/* Background effect with floating crypto bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-60 -left-20 w-60 h-60 bg-purple-600 rounded-full opacity-10 blur-3xl"></div>
        <CryptoBubblesAnimation />
      </div>
      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{
          opacity: 0,
          x: -50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8,
          ease: 'easeOut'
        }}>
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.2,
            duration: 0.5
          }}>
              <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-500/20 text-blue-400 rounded-full mb-4">
                {t('hero.badge')}
              </span>
            </motion.div>
            <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.3,
            duration: 0.5
          }}>
              {t('hero.title').split('Crypto').map((part, i) => {
              return i === 0 ? <Fragment key={i}>
                      {part}
                      <span className="text-blue-400 inline-block relative">
                        Crypto
                        <span className="absolute bottom-2 left-0 w-full h-2 bg-blue-500/20 -z-10"></span>
                      </span>
                    </Fragment> : part;
            })}
            </motion.h1>
            <motion.p className="text-xl text-gray-300 mb-8" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.4,
            duration: 0.5
          }}>
              {t('hero.subtitle')}
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.5,
            duration: 0.5
          }}>
              <motion.div whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-lg shadow-blue-500/20" onClick={onGetStartedClick}>
                  {t('hero.getStarted')}
                </Button>
              </motion.div>
              <motion.div whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                <Button variant="outline" size="lg" className="border-blue-500 text-blue-400 hover:bg-blue-900/30">
                  {t('hero.learnMore')}
                </Button>
              </motion.div>
            </motion.div>
            <motion.div className="mt-8 flex items-center space-x-4" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.7,
            duration: 0.5
          }}>
              <div className="flex -space-x-2">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="w-8 h-8 rounded-full border-2 border-gray-900" />
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" className="w-8 h-8 rounded-full border-2 border-gray-900" />
                <img src="https://randomuser.me/api/portraits/men/46.jpg" alt="User" className="w-8 h-8 rounded-full border-2 border-gray-900" />
              </div>
              <span className="text-sm text-gray-300">
                <span className="text-blue-400 font-semibold">+5,000</span>{' '}
                {t('hero.usersCount')}
              </span>
            </motion.div>
          </motion.div>
          <motion.div className="hidden lg:block" initial={{
          opacity: 0,
          x: 50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8,
          ease: 'easeOut'
        }}>
            <div className="relative h-96 flex items-center justify-center">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl blur-xl" 
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 1, 0]
                }} 
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }} 
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default HeroSection;