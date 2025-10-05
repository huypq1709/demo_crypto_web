import React, { useState, Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/sections/HeroSection';
import LoginModal from '../components/auth/LoginModal';
import RegisterModal from '../components/auth/RegisterModal';
import { AnimatePresence } from 'framer-motion';
// Lazy load components for code splitting
const FeaturesSection = lazy(() => import('../components/sections/FeaturesSection'));
const NewsSection = lazy(() => import('../components/sections/NewsSection'));
const AnalysisSection = lazy(() => import('../components/sections/AnalysisSection'));
const ContactSection = lazy(() => import('../components/sections/ContactSection'));
const LandingPage: React.FC = () => {
  const cryptoName = 'Bitcoin';
  const siteUrl = 'https://crypto-insight.com';
  const previewImage = `${siteUrl}/preview-image.jpg`;
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  return <>
      <Helmet>
        <title>
          Latest {cryptoName} Analysis and News | CryptoInsight
        </title>
        <meta name="description" content={`Aggregate news, trend analysis and price forecasts for ${cryptoName} from trusted sources. Make smart investment decisions.`} />
        <link rel="canonical" href={siteUrl} />
        <meta property="og:title" content={`Latest ${cryptoName} Analysis and News`} />
        <meta property="og:description" content="Aggregate news and in-depth analysis of the crypto market." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={previewImage} />
        <meta name="author" content="CryptoInsight" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Phân Tích và Tin Tức ${cryptoName} Mới Nhất`} />
        <meta name="twitter:description" content="Tổng hợp tin tức và phân tích chuyên sâu về thị trường crypto." />
        <meta name="twitter:image" content={previewImage} />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "CryptoInsight",
              "url": "${siteUrl}"
            }
          `}
        </script>
      </Helmet>
      <div className="flex flex-col min-h-screen bg-gray-900 text-white">
        <Header onLoginClick={() => setIsLoginModalOpen(true)} onRegisterClick={() => setIsRegisterModalOpen(true)} />
        <main className="flex-grow">
          <HeroSection onGetStartedClick={() => setIsLoginModalOpen(true)} />
          <Suspense fallback={<div className="py-16 text-center">Đang tải...</div>}>
            <FeaturesSection />
          </Suspense>
          <Suspense fallback={<div className="py-16 text-center">Đang tải tin tức...</div>}>
            <NewsSection cryptoSymbol="BTC" />
          </Suspense>
          <Suspense fallback={<div className="py-16 text-center">Đang tải phân tích...</div>}>
            <AnalysisSection />
          </Suspense>
          <Suspense fallback={<div className="py-16 text-center">Đang tải liên hệ...</div>}>
            <ContactSection />
          </Suspense>
        </main>
        <Footer />
        <AnimatePresence>
          {isLoginModalOpen && <LoginModal onClose={() => setIsLoginModalOpen(false)} onRegisterClick={() => {
          setIsLoginModalOpen(false);
          setIsRegisterModalOpen(true);
        }} />}
          {isRegisterModalOpen && <RegisterModal onClose={() => setIsRegisterModalOpen(false)} onLoginClick={() => {
          setIsRegisterModalOpen(false);
          setIsLoginModalOpen(true);
        }} />}
        </AnimatePresence>
      </div>
    </>;
};
export default LandingPage;