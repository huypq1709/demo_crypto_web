import React, { useEffect, useState } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';
import Button from '../common/Button';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../common/LanguageSwitcher';
interface HeaderProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}
const Header: React.FC<HeaderProps> = ({
  onLoginClick,
  onRegisterClick
}) => {
  const {
    t
  } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Add scroll event listener to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      setIsMenuOpen(false);
    }
  };
  return <motion.header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`} initial={{
    y: -100
  }} animate={{
    y: 0
  }} transition={{
    type: 'spring',
    stiffness: 100,
    damping: 20
  }}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <motion.div className="text-2xl font-bold mr-2 flex items-center" whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }}>
              <span className="text-blue-400">Crypto</span>
              <span>Insight</span>
            </motion.div>
            <nav className="hidden md:flex space-x-6 ml-10">
              <motion.a href="#hero" onClick={e => {
              e.preventDefault();
              scrollToSection('hero');
            }} className="hover:text-blue-400 transition-colors relative" whileHover={{
              y: -2
            }}>
                {t('nav.home')}
                <motion.span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400" whileHover={{
                width: '100%'
              }} transition={{
                duration: 0.2
              }} />
              </motion.a>
              <motion.a href="#features" onClick={e => {
              e.preventDefault();
              scrollToSection('features');
            }} className="hover:text-blue-400 transition-colors relative" whileHover={{
              y: -2
            }}>
                {t('nav.features')}
                <motion.span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400" whileHover={{
                width: '100%'
              }} transition={{
                duration: 0.2
              }} />
              </motion.a>
              <motion.a href="#news" onClick={e => {
              e.preventDefault();
              scrollToSection('news');
            }} className="hover:text-blue-400 transition-colors relative" whileHover={{
              y: -2
            }}>
                {t('nav.news')}
                <motion.span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400" whileHover={{
                width: '100%'
              }} transition={{
                duration: 0.2
              }} />
              </motion.a>
              <motion.a href="#analysis" onClick={e => {
              e.preventDefault();
              scrollToSection('analysis');
            }} className="hover:text-blue-400 transition-colors relative" whileHover={{
              y: -2
            }}>
                {t('nav.analysis')}
                <motion.span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400" whileHover={{
                width: '100%'
              }} transition={{
                duration: 0.2
              }} />
              </motion.a>
              <motion.a href="#contact" onClick={e => {
              e.preventDefault();
              scrollToSection('contact');
            }} className="hover:text-blue-400 transition-colors relative" whileHover={{
              y: -2
            }}>
                {t('nav.contact')}
                <motion.span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400" whileHover={{
                width: '100%'
              }} transition={{
                duration: 0.2
              }} />
              </motion.a>
            </nav>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <motion.div whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }}>
              <Button variant="outline" size="sm" onClick={onLoginClick} className="border-blue-500 text-blue-400 hover:bg-blue-900/30">
                {t('auth.login')}
              </Button>
            </motion.div>
            <motion.div whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }}>
              <Button size="sm" onClick={onRegisterClick} className="bg-blue-600 hover:bg-blue-700">
                {t('auth.register')}
              </Button>
            </motion.div>
          </div>
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher minimal />
            <motion.button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none" whileTap={{
            scale: 0.9
          }}>
              {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </motion.button>
          </div>
        </div>
        {/* Mobile menu */}
        {isMenuOpen && <motion.div className="md:hidden mt-4 pb-4" initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} exit={{
        opacity: 0,
        height: 0
      }} transition={{
        duration: 0.3
      }}>
            <div className="flex flex-col space-y-3">
              <a href="#hero" onClick={e => {
            e.preventDefault();
            scrollToSection('hero');
          }} className="hover:text-blue-400 transition-colors py-2">
                {t('nav.home')}
              </a>
              <a href="#features" onClick={e => {
            e.preventDefault();
            scrollToSection('features');
          }} className="hover:text-blue-400 transition-colors py-2">
                {t('nav.features')}
              </a>
              <a href="#news" onClick={e => {
            e.preventDefault();
            scrollToSection('news');
          }} className="hover:text-blue-400 transition-colors py-2">
                {t('nav.news')}
              </a>
              <a href="#analysis" onClick={e => {
            e.preventDefault();
            scrollToSection('analysis');
          }} className="hover:text-blue-400 transition-colors py-2">
                {t('nav.analysis')}
              </a>
              <a href="#contact" onClick={e => {
            e.preventDefault();
            scrollToSection('contact');
          }} className="hover:text-blue-400 transition-colors py-2">
                {t('nav.contact')}
              </a>
            </div>
            <div className="mt-4 flex space-x-4">
              <Button variant="outline" size="sm" onClick={onLoginClick} className="border-blue-500 text-blue-400 hover:bg-blue-900/30">
                {t('auth.login')}
              </Button>
              <Button size="sm" onClick={onRegisterClick} className="bg-blue-600 hover:bg-blue-700">
                {t('auth.register')}
              </Button>
            </div>
          </motion.div>}
      </div>
    </motion.header>;
};
export default Header;