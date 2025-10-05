import React from 'react';
import { useTranslation } from 'react-i18next';
const Footer: React.FC = () => {
  const {
    t
  } = useTranslation();
  const currentYear = new Date().getFullYear();
  return <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{t('app.name')}</h3>
            <p className="text-gray-400">{t('features.subtitle')}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {t('nav.quickLinks')}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.home')}
                </a>
              </li>
              <li>
                <a href="#features" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.features')}
                </a>
              </li>
              <li>
                <a href="#news" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.news')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.analysis')}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('nav.resources')}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.guides')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.blog')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  API
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.documentation')}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('nav.contact')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@cryptoinsight.com</li>
              <li>{t('contact.info.phone')}: +84 123 456 789</li>
              <li>{t('contact.info.address')}: Hanoi, Vietnam</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            © {currentYear} {t('app.name')}. {t('footer.allRightsReserved')}
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              {t('footer.termsOfService')}
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              {t('footer.privacyPolicy')}
            </a>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;