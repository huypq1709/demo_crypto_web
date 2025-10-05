import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { GlobeIcon, BellIcon, UserIcon, ShieldIcon, InfoIcon, CheckIcon, SaveIcon } from 'lucide-react';
const SettingsPage: React.FC = () => {
  const {
    t
  } = useTranslation();
  const {
    language,
    setLanguage,
    availableLanguages
  } = useLanguage();
  const [theme, setTheme] = useState('dark');
  const [notificationSettings, setNotificationSettings] = useState({
    priceAlerts: true,
    newsUpdates: true,
    securityAlerts: true,
    marketSummary: false,
    emailNotifications: true,
    pushNotifications: true
  });
  const [isSaved, setIsSaved] = useState(false);
  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };
  const handleNotificationChange = (setting: string) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting as keyof typeof notificationSettings]
    });
  };
  return <>
      <Helmet>
        <title>
          {t('settings.title')} | {t('app.name')}
        </title>
      </Helmet>
      <DashboardLayout>
        <motion.div className="max-w-4xl mx-auto" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }}>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">
              {t('settings.title')}
            </h1>
            <motion.button className={`px-4 py-2 rounded-lg flex items-center ${isSaved ? 'bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`} onClick={handleSave} whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }}>
              {isSaved ? <>
                  <CheckIcon size={18} className="mr-2" />
                  {t('settings.saved')}
                </> : <>
                  <SaveIcon size={18} className="mr-2" />
                  {t('settings.save')}
                </>}
            </motion.button>
          </div>
          {/* Settings Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <nav className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                <div className="p-4 border-b border-gray-700">
                  <h2 className="font-medium text-white">
                    {t('settings.title')}
                  </h2>
                </div>
                <div className="p-2">
                  <a href="#appearance" className="flex items-center p-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white">
                    <div size={18} className="mr-3" />
                    {t('settings.appearance.title')}
                  </a>
                  <a href="#language" className="flex items-center p-2 rounded-lg bg-gray-700 text-white">
                    <GlobeIcon size={18} className="mr-3" />
                    {t('settings.language.title')}
                  </a>
                  <a href="#notifications" className="flex items-center p-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white">
                    <BellIcon size={18} className="mr-3" />
                    {t('settings.notifications.title')}
                  </a>
                  <a href="#account" className="flex items-center p-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white">
                    <UserIcon size={18} className="mr-3" />
                    {t('settings.account.title')}
                  </a>
                  <a href="#security" className="flex items-center p-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white">
                    <ShieldIcon size={18} className="mr-3" />
                    {t('settings.security.title')}
                  </a>
                  <a href="#about" className="flex items-center p-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white">
                    <InfoIcon size={18} className="mr-3" />
                    {t('settings.about.title')}
                  </a>
                </div>
              </nav>
            </div>
            <div className="md:col-span-2 space-y-6">
              {/* Appearance Section */}
              <section id="appearance" className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                <div className="p-4 border-b border-gray-700">
                  <h2 className="font-medium text-white">
                    {t('settings.appearance.title')}
                  </h2>
                </div>
                <div className="p-4">
                  <div className="mb-4">
                    <label className="block text-gray-300 mb-2">
                      {t('settings.appearance.theme')}
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <button className={`p-3 border rounded-lg flex items-center justify-center ${theme === 'light' ? 'bg-blue-600 border-blue-500 text-white' : 'border-gray-600 text-gray-300 hover:bg-gray-700'}`} onClick={() => setTheme('light')}>
                        {t('settings.appearance.light')}
                      </button>
                      <button className={`p-3 border rounded-lg flex items-center justify-center ${theme === 'dark' ? 'bg-blue-600 border-blue-500 text-white' : 'border-gray-600 text-gray-300 hover:bg-gray-700'}`} onClick={() => setTheme('dark')}>
                        {t('settings.appearance.dark')}
                      </button>
                      <button className={`p-3 border rounded-lg flex items-center justify-center ${theme === 'system' ? 'bg-blue-600 border-blue-500 text-white' : 'border-gray-600 text-gray-300 hover:bg-gray-700'}`} onClick={() => setTheme('system')}>
                        {t('settings.appearance.system')}
                      </button>
                    </div>
                  </div>
                </div>
              </section>
              {/* Language Section */}
              <section id="language" className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                <div className="p-4 border-b border-gray-700">
                  <h2 className="font-medium text-white">
                    {t('settings.language.title')}
                  </h2>
                </div>
                <div className="p-4">
                  <div className="mb-4">
                    <label className="block text-gray-300 mb-2">
                      {t('settings.language.select')}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {availableLanguages.map(lang => <motion.button key={lang.code} className={`p-3 border rounded-lg flex items-center justify-center ${language === lang.code ? 'bg-blue-600 border-blue-500 text-white' : 'border-gray-600 text-gray-300 hover:bg-gray-700'}`} onClick={() => setLanguage(lang.code)} whileHover={{
                      scale: 1.02
                    }} whileTap={{
                      scale: 0.98
                    }}>
                          {lang.name}
                        </motion.button>)}
                    </div>
                  </div>
                </div>
              </section>
              {/* Notifications Section */}
              <section id="notifications" className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                <div className="p-4 border-b border-gray-700">
                  <h2 className="font-medium text-white">
                    {t('settings.notifications.title')}
                  </h2>
                </div>
                <div className="p-4">
                  <ul className="space-y-3">
                    {Object.entries({
                    priceAlerts: t('settings.notifications.priceAlerts'),
                    newsUpdates: t('settings.notifications.newsUpdates'),
                    securityAlerts: t('settings.notifications.securityAlerts'),
                    marketSummary: t('settings.notifications.marketSummary'),
                    emailNotifications: t('settings.notifications.emailNotifications'),
                    pushNotifications: t('settings.notifications.pushNotifications')
                  }).map(([key, label]) => <li key={key} className="flex items-center justify-between">
                        <span className="text-gray-300">{label}</span>
                        <button className={`w-12 h-6 rounded-full p-1 transition-colors ${notificationSettings[key as keyof typeof notificationSettings] ? 'bg-blue-600' : 'bg-gray-600'}`} onClick={() => handleNotificationChange(key)}>
                          <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${notificationSettings[key as keyof typeof notificationSettings] ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                      </li>)}
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </motion.div>
      </DashboardLayout>
    </>;
};
export default SettingsPage;