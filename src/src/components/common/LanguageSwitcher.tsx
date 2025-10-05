import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlobeIcon, CheckIcon, ChevronDownIcon } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
interface LanguageSwitcherProps {
  minimal?: boolean;
}
const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  minimal = false
}) => {
  const {
    language,
    setLanguage,
    availableLanguages
  } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const currentLanguage = availableLanguages.find(lang => lang.code === language);
  return <div className="relative">
      <motion.button className={`flex items-center ${minimal ? 'p-2 rounded-full hover:bg-gray-700 text-gray-300' : 'px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white'}`} onClick={() => setIsOpen(!isOpen)} whileTap={{
      scale: 0.95
    }}>
        <GlobeIcon size={minimal ? 20 : 16} className={minimal ? '' : 'mr-2'} />
        {!minimal && <>
            <span className="mr-1">{currentLanguage?.name}</span>
            <ChevronDownIcon size={16} />
          </>}
      </motion.button>
      <AnimatePresence>
        {isOpen && <motion.div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden" initial={{
        opacity: 0,
        y: -10
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: -10
      }} transition={{
        duration: 0.2
      }}>
            {availableLanguages.map(lang => <button key={lang.code} className="w-full text-left px-4 py-2 flex items-center justify-between hover:bg-gray-700 text-white" onClick={() => {
          setLanguage(lang.code);
          setIsOpen(false);
        }}>
                {lang.name}
                {language === lang.code && <CheckIcon size={16} />}
              </button>)}
          </motion.div>}
      </AnimatePresence>
    </div>;
};
export default LanguageSwitcher;