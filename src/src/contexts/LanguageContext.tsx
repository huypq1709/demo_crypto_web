import React, { useEffect, useState, createContext, useContext } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from '../locales/en.json';
import viTranslation from '../locales/vi.json';
// Initialize i18next
i18n.use(LanguageDetector).use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation
    },
    vi: {
      translation: viTranslation
    }
  },
  fallbackLng: 'en',
  debug: false,
  interpolation: {
    escapeValue: false
  }
});
type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  availableLanguages: {
    code: string;
    name: string;
  }[];
};
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
export const LanguageProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [language, setLanguageState] = useState(i18n.language || 'en');
  const availableLanguages = [{
    code: 'en',
    name: 'English'
  }, {
    code: 'vi',
    name: 'Tiếng Việt'
  }];
  const setLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };
  // Initialize language from localStorage or browser settings
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    } else {
      // Default to English
      setLanguage('en');
    }
  }, []);
  return <LanguageContext.Provider value={{
    language,
    setLanguage,
    availableLanguages
  }}>
      {children}
    </LanguageContext.Provider>;
};
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};