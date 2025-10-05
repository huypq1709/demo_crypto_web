import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import MarketOverview from '../components/dashboard/MarketOverview';
import PortfolioSummary from '../components/dashboard/PortfolioSummary';
import PriceChart from '../components/dashboard/PriceChart';
import TrendingCoins from '../components/dashboard/TrendingCoins';
import RecentNews from '../components/dashboard/RecentNews';
import AlertsWidget from '../components/dashboard/AlertsWidget';
import QuickActions from '../components/dashboard/QuickActions';
import MarketSentimentAnalysis from '../components/dashboard/MarketSentimentAnalysis';
import CryptoComparison from '../components/dashboard/CryptoComparison';
import NewsFilters from '../components/dashboard/NewsFilters';
import AdvancedAlerts from '../components/dashboard/AdvancedAlerts';
import PortfolioPerformance from '../components/dashboard/PortfolioPerformance';
import PortfolioRecommendations from '../components/dashboard/PortfolioRecommendations';
const Dashboard: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('24h');
  const [selectedCoin, setSelectedCoin] = useState<string>('bitcoin');
  const [activeTab, setActiveTab] = useState<'overview' | 'market' | 'news' | 'alerts' | 'portfolio'>('overview');
  // Handle news filters change
  const handleNewsFiltersChange = (filters: any) => {
    console.log('News filters changed:', filters);
    // In a real app, you would use this to filter news data
  };
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Portfolio Summary */}
              <div className="lg:col-span-2">
                <PortfolioSummary />
              </div>
              {/* Quick Actions */}
              <div className="lg:col-span-1">
                <QuickActions />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Price Chart */}
              <div className="lg:col-span-2">
                <PriceChart coin={selectedCoin} timeframe={selectedTimeframe} onTimeframeChange={setSelectedTimeframe} onCoinChange={setSelectedCoin} />
              </div>
              {/* Alerts Widget */}
              <div className="lg:col-span-1">
                <AlertsWidget />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Market Overview */}
              <div className="lg:col-span-2">
                <MarketOverview />
              </div>
              {/* Trending Coins */}
              <div className="lg:col-span-1">
                <TrendingCoins onCoinSelect={setSelectedCoin} />
              </div>
            </div>
            {/* Recent News */}
            <div className="mb-6">
              <RecentNews />
            </div>
          </>;
      case 'market':
        return <>
            <div className="mb-6">
              <PriceChart coin={selectedCoin} timeframe={selectedTimeframe} onTimeframeChange={setSelectedTimeframe} onCoinChange={setSelectedCoin} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <MarketOverview />
              </div>
              <div className="lg:col-span-1">
                <TrendingCoins onCoinSelect={setSelectedCoin} />
              </div>
            </div>
            <div className="mb-6">
              <MarketSentimentAnalysis />
            </div>
            <div className="mb-6">
              <CryptoComparison />
            </div>
          </>;
      case 'news':
        return <>
            <NewsFilters onFilterChange={handleNewsFiltersChange} />
            <div className="mb-6">
              <RecentNews />
            </div>
            <div className="mb-6">
              <MarketSentimentAnalysis />
            </div>
          </>;
      case 'alerts':
        return <>
            <div className="mb-6">
              <AdvancedAlerts />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <PriceChart coin={selectedCoin} timeframe={selectedTimeframe} onTimeframeChange={setSelectedTimeframe} onCoinChange={setSelectedCoin} />
              </div>
              <div className="lg:col-span-1">
                <TrendingCoins onCoinSelect={setSelectedCoin} />
              </div>
            </div>
          </>;
      case 'portfolio':
        return <>
            <div className="mb-6">
              <PortfolioSummary />
            </div>
            <div className="mb-6">
              <PortfolioPerformance />
            </div>
            <div className="mb-6">
              <PortfolioRecommendations />
            </div>
          </>;
      default:
        return null;
    }
  };
  return <>
      <Helmet>
        <title>Dashboard | CryptoInsight</title>
      </Helmet>
      <DashboardLayout 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
      >
        {renderContent()}
      </DashboardLayout>
    </>;
};
export default Dashboard;