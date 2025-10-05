import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FilterIcon, CheckIcon, XIcon, SearchIcon } from 'lucide-react';
interface NewsFiltersProps {
  onFilterChange: (filters: {
    sentiment: string[];
    sources: string[];
    coins: string[];
    dateRange: string;
    searchQuery: string;
  }) => void;
}
const NewsFilters: React.FC<NewsFiltersProps> = ({
  onFilterChange
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    sentiment: ['all'],
    sources: ['all'],
    coins: ['all'],
    dateRange: '7d',
    searchQuery: ''
  });
  // Available sentiment options
  const sentimentOptions = [{
    id: 'all',
    label: 'Tất cả'
  }, {
    id: 'positive',
    label: 'Tích cực'
  }, {
    id: 'negative',
    label: 'Tiêu cực'
  }, {
    id: 'neutral',
    label: 'Trung tính'
  }];
  // Available news sources
  const sourceOptions = [{
    id: 'all',
    label: 'Tất cả nguồn'
  }, {
    id: 'cryptonews',
    label: 'CryptoNews'
  }, {
    id: 'coindesk',
    label: 'CoinDesk'
  }, {
    id: 'cointelegraph',
    label: 'CoinTelegraph'
  }, {
    id: 'bitcoinist',
    label: 'Bitcoinist'
  }, {
    id: 'decrypt',
    label: 'Decrypt'
  }];
  // Available cryptocurrencies
  const coinOptions = [{
    id: 'all',
    label: 'Tất cả tiền điện tử'
  }, {
    id: 'bitcoin',
    label: 'Bitcoin (BTC)'
  }, {
    id: 'ethereum',
    label: 'Ethereum (ETH)'
  }, {
    id: 'cardano',
    label: 'Cardano (ADA)'
  }, {
    id: 'solana',
    label: 'Solana (SOL)'
  }, {
    id: 'polkadot',
    label: 'Polkadot (DOT)'
  }, {
    id: 'binancecoin',
    label: 'Binance Coin (BNB)'
  }];
  // Available date ranges
  const dateRangeOptions = [{
    id: '24h',
    label: '24 giờ qua'
  }, {
    id: '7d',
    label: '7 ngày qua'
  }, {
    id: '30d',
    label: '30 ngày qua'
  }, {
    id: 'all',
    label: 'Tất cả thời gian'
  }];
  const handleMultiSelectChange = (category: 'sentiment' | 'sources' | 'coins', id: string) => {
    let newSelection: string[];
    if (id === 'all') {
      newSelection = ['all'];
    } else {
      // If "all" is currently selected and we select a specific option
      if (filters[category].includes('all')) {
        newSelection = [id];
      } else {
        // If the option is already selected, remove it
        if (filters[category].includes(id)) {
          newSelection = filters[category].filter(item => item !== id);
          // If nothing is selected after removal, select "all"
          if (newSelection.length === 0) {
            newSelection = ['all'];
          }
        } else {
          // Add the option to the selection
          newSelection = [...filters[category], id];
        }
      }
    }
    const newFilters = {
      ...filters,
      [category]: newSelection
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  const handleDateRangeChange = (id: string) => {
    const newFilters = {
      ...filters,
      dateRange: id
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = {
      ...filters,
      searchQuery: e.target.value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  const handleClearFilters = () => {
    const defaultFilters = {
      sentiment: ['all'],
      sources: ['all'],
      coins: ['all'],
      dateRange: '7d',
      searchQuery: ''
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };
  const isFiltered = !filters.sentiment.includes('all') || !filters.sources.includes('all') || !filters.coins.includes('all') || filters.dateRange !== '7d' || filters.searchQuery !== '';
  return <motion.div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg mb-6" initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5
  }}>
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <div className="flex items-center">
          <FilterIcon size={18} className="text-blue-400 mr-2" />
          <h3 className="font-medium text-white">Bộ lọc tin tức</h3>
          {isFiltered && <div className="ml-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
              Đang lọc
            </div>}
        </div>
        <div className="flex items-center space-x-2">
          {isFiltered && <button className="text-sm text-gray-300 hover:text-white flex items-center" onClick={handleClearFilters}>
              <XIcon size={14} className="mr-1" /> Xóa bộ lọc
            </button>}
          <button className="bg-gray-700 hover:bg-gray-600 rounded-lg p-1.5" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <XIcon size={16} /> : <FilterIcon size={16} />}
          </button>
        </div>
      </div>
      {/* Search Bar - Always visible */}
      <div className="p-4">
        <div className="relative">
          <input type="text" placeholder="Tìm kiếm tin tức..." className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" value={filters.searchQuery} onChange={handleSearchChange} />
          <SearchIcon size={18} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>
      {/* Expandable Filter Options */}
      {isExpanded && <motion.div className="p-4 pt-0 border-t border-gray-700" initial={{
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Sentiment Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Tâm lý</h4>
              <div className="space-y-1">
                {sentimentOptions.map(option => <button key={option.id} className={`flex items-center px-2 py-1 rounded-md w-full text-left ${filters.sentiment.includes(option.id) ? 'bg-blue-600/20 text-blue-400' : 'text-gray-300 hover:bg-gray-700'}`} onClick={() => handleMultiSelectChange('sentiment', option.id)}>
                    <div className={`w-4 h-4 rounded-sm mr-2 flex items-center justify-center ${filters.sentiment.includes(option.id) ? 'bg-blue-500 text-white' : 'border border-gray-500'}`}>
                      {filters.sentiment.includes(option.id) && <CheckIcon size={12} />}
                    </div>
                    {option.label}
                  </button>)}
              </div>
            </div>
            {/* Sources Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">
                Nguồn tin
              </h4>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {sourceOptions.map(option => <button key={option.id} className={`flex items-center px-2 py-1 rounded-md w-full text-left ${filters.sources.includes(option.id) ? 'bg-blue-600/20 text-blue-400' : 'text-gray-300 hover:bg-gray-700'}`} onClick={() => handleMultiSelectChange('sources', option.id)}>
                    <div className={`w-4 h-4 rounded-sm mr-2 flex items-center justify-center ${filters.sources.includes(option.id) ? 'bg-blue-500 text-white' : 'border border-gray-500'}`}>
                      {filters.sources.includes(option.id) && <CheckIcon size={12} />}
                    </div>
                    {option.label}
                  </button>)}
              </div>
            </div>
            {/* Coins Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">
                Tiền điện tử
              </h4>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {coinOptions.map(option => <button key={option.id} className={`flex items-center px-2 py-1 rounded-md w-full text-left ${filters.coins.includes(option.id) ? 'bg-blue-600/20 text-blue-400' : 'text-gray-300 hover:bg-gray-700'}`} onClick={() => handleMultiSelectChange('coins', option.id)}>
                    <div className={`w-4 h-4 rounded-sm mr-2 flex items-center justify-center ${filters.coins.includes(option.id) ? 'bg-blue-500 text-white' : 'border border-gray-500'}`}>
                      {filters.coins.includes(option.id) && <CheckIcon size={12} />}
                    </div>
                    {option.label}
                  </button>)}
              </div>
            </div>
            {/* Date Range Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">
                Thời gian
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {dateRangeOptions.map(option => <button key={option.id} className={`px-3 py-1.5 rounded-md text-center text-sm ${filters.dateRange === option.id ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`} onClick={() => handleDateRangeChange(option.id)}>
                    {option.label}
                  </button>)}
              </div>
            </div>
          </div>
        </motion.div>}
    </motion.div>;
};
export default NewsFilters;