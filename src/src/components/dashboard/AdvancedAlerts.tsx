import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BellIcon, PlusIcon, XIcon, ChevronDownIcon, AlertTriangleIcon, TrendingUpIcon, TrendingDownIcon, PercentIcon, DollarSignIcon, BarChart2Icon, ClockIcon, SaveIcon } from 'lucide-react';
const AdvancedAlerts: React.FC = () => {
  const [isCreatingAlert, setIsCreatingAlert] = useState(false);
  const [alertType, setAlertType] = useState('price');
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const [isAlertTypeOpen, setIsAlertTypeOpen] = useState(false);
  const [isCoinSelectorOpen, setIsCoinSelectorOpen] = useState(false);
  // Sample alert data
  const [alerts, setAlerts] = useState([{
    id: 1,
    type: 'price',
    coin: 'Bitcoin',
    symbol: 'BTC',
    condition: 'above',
    value: 50000,
    unit: '$',
    active: true,
    repeat: 'once'
  }, {
    id: 2,
    type: 'price',
    coin: 'Ethereum',
    symbol: 'ETH',
    condition: 'below',
    value: 3000,
    unit: '$',
    active: true,
    repeat: 'once'
  }, {
    id: 3,
    type: 'price_change',
    coin: 'Cardano',
    symbol: 'ADA',
    condition: 'above',
    value: 5,
    unit: '%',
    timeframe: '24h',
    active: false,
    repeat: 'once'
  }, {
    id: 4,
    type: 'volume',
    coin: 'Solana',
    symbol: 'SOL',
    condition: 'above',
    value: 500000000,
    unit: '$',
    active: true,
    repeat: 'always'
  }, {
    id: 5,
    type: 'rsi',
    coin: 'Bitcoin',
    symbol: 'BTC',
    condition: 'above',
    value: 70,
    timeframe: '1d',
    active: true,
    repeat: 'once'
  }]);
  // Available coins
  const availableCoins = [{
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC'
  }, {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH'
  }, {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA'
  }, {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL'
  }, {
    id: 'polkadot',
    name: 'Polkadot',
    symbol: 'DOT'
  }, {
    id: 'binancecoin',
    name: 'Binance Coin',
    symbol: 'BNB'
  }];
  // Alert types
  const alertTypes = [{
    id: 'price',
    name: 'Giá',
    icon: <DollarSignIcon size={16} className="mr-2" />
  }, {
    id: 'price_change',
    name: 'Thay đổi giá',
    icon: <PercentIcon size={16} className="mr-2" />
  }, {
    id: 'volume',
    name: 'Khối lượng',
    icon: <BarChart2Icon size={16} className="mr-2" />
  }, {
    id: 'rsi',
    name: 'Chỉ báo RSI',
    icon: <TrendingUpIcon size={16} className="mr-2" />
  }, {
    id: 'macd',
    name: 'Chỉ báo MACD',
    icon: <TrendingDownIcon size={16} className="mr-2" />
  }];
  // Form state for new alert
  const [newAlert, setNewAlert] = useState({
    type: 'price',
    coin: 'bitcoin',
    condition: 'above',
    value: '',
    timeframe: '24h',
    repeat: 'once'
  });
  const toggleAlertStatus = (id: number) => {
    setAlerts(alerts.map(alert => alert.id === id ? {
      ...alert,
      active: !alert.active
    } : alert));
  };
  const deleteAlert = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAlert.value) {
      const selectedCoinObj = availableCoins.find(c => c.id === newAlert.coin);
      if (selectedCoinObj) {
        const alertToAdd = {
          id: alerts.length + 1,
          type: newAlert.type,
          coin: selectedCoinObj.name,
          symbol: selectedCoinObj.symbol,
          condition: newAlert.condition,
          value: parseFloat(newAlert.value),
          unit: newAlert.type === 'price_change' || newAlert.type === 'rsi' ? '%' : '$',
          timeframe: newAlert.timeframe,
          active: true,
          repeat: newAlert.repeat
        };
        setAlerts([...alerts, alertToAdd]);
        setNewAlert({
          type: 'price',
          coin: 'bitcoin',
          condition: 'above',
          value: '',
          timeframe: '24h',
          repeat: 'once'
        });
        setIsCreatingAlert(false);
      }
    }
  };
  // Helper function to render alert description
  const renderAlertDescription = (alert: any) => {
    switch (alert.type) {
      case 'price':
        return <span>
            {alert.coin} ({alert.symbol}){' '}
            {alert.condition === 'above' ? 'lớn hơn hoặc bằng' : 'nhỏ hơn hoặc bằng'}{' '}
            {alert.unit}
            {alert.value.toLocaleString()}
          </span>;
      case 'price_change':
        return <span>
            {alert.coin} ({alert.symbol}) thay đổi{' '}
            {alert.condition === 'above' ? 'tăng trên' : 'giảm dưới'}{' '}
            {alert.value}% trong {alert.timeframe}
          </span>;
      case 'volume':
        return <span>
            Khối lượng giao dịch {alert.coin} ({alert.symbol}){' '}
            {alert.condition === 'above' ? 'lớn hơn' : 'nhỏ hơn'} {alert.unit}
            {alert.value.toLocaleString()}
          </span>;
      case 'rsi':
        return <span>
            RSI của {alert.coin} ({alert.symbol}){' '}
            {alert.condition === 'above' ? 'lớn hơn' : 'nhỏ hơn'} {alert.value}{' '}
            ({alert.timeframe})
          </span>;
      case 'macd':
        return <span>
            MACD của {alert.coin} ({alert.symbol}){' '}
            {alert.condition === 'above' ? 'vượt qua đường tín hiệu' : 'cắt xuống dưới đường tín hiệu'}
          </span>;
      default:
        return <span>
            {alert.coin} ({alert.symbol})
          </span>;
    }
  };
  // Get icon for alert type
  const getAlertTypeIcon = (type: string) => {
    switch (type) {
      case 'price':
        return <DollarSignIcon size={16} />;
      case 'price_change':
        return <PercentIcon size={16} />;
      case 'volume':
        return <BarChart2Icon size={16} />;
      case 'rsi':
        return <TrendingUpIcon size={16} />;
      case 'macd':
        return <TrendingDownIcon size={16} />;
      default:
        return <AlertTriangleIcon size={16} />;
    }
  };
  return <motion.div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg" initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5
  }}>
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center">
          <BellIcon size={20} className="text-blue-400 mr-2" />
          <h2 className="text-xl font-semibold text-white">
            Cảnh báo nâng cao
          </h2>
        </div>
        <button className={`p-2 rounded-lg ${isCreatingAlert ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'} text-white flex items-center`} onClick={() => setIsCreatingAlert(!isCreatingAlert)}>
          {isCreatingAlert ? <>
              <XIcon size={16} className="mr-1" /> Hủy
            </> : <>
              <PlusIcon size={16} className="mr-1" /> Tạo cảnh báo
            </>}
        </button>
      </div>
      {/* Create Alert Form */}
      {isCreatingAlert && <motion.div className="p-4 border-b border-gray-700 bg-gray-700/30" initial={{
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
          <h3 className="font-medium text-white mb-4">Tạo cảnh báo mới</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Alert Type */}
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Loại cảnh báo
                </label>
                <div className="relative">
                  <button type="button" className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={() => setIsAlertTypeOpen(!isAlertTypeOpen)}>
                    <div className="flex items-center">
                      {alertTypes.find(t => t.id === newAlert.type)?.icon}
                      {alertTypes.find(t => t.id === newAlert.type)?.name}
                    </div>
                    <ChevronDownIcon size={16} />
                  </button>
                  {isAlertTypeOpen && <div className="absolute z-10 mt-1 w-full bg-gray-700 border border-gray-600 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                      {alertTypes.map(type => <button key={type.id} type="button" className={`w-full text-left px-3 py-2 flex items-center ${newAlert.type === type.id ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`} onClick={() => {
                  setNewAlert({
                    ...newAlert,
                    type: type.id
                  });
                  setIsAlertTypeOpen(false);
                }}>
                          {type.icon}
                          {type.name}
                        </button>)}
                    </div>}
                </div>
              </div>
              {/* Coin Selection */}
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Tiền điện tử
                </label>
                <div className="relative">
                  <button type="button" className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={() => setIsCoinSelectorOpen(!isCoinSelectorOpen)}>
                    {availableCoins.find(c => c.id === newAlert.coin)?.name} (
                    {availableCoins.find(c => c.id === newAlert.coin)?.symbol}
                    )
                    <ChevronDownIcon size={16} />
                  </button>
                  {isCoinSelectorOpen && <div className="absolute z-10 mt-1 w-full bg-gray-700 border border-gray-600 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                      {availableCoins.map(coin => <button key={coin.id} type="button" className={`w-full text-left px-3 py-2 ${newAlert.coin === coin.id ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`} onClick={() => {
                  setNewAlert({
                    ...newAlert,
                    coin: coin.id
                  });
                  setIsCoinSelectorOpen(false);
                }}>
                          {coin.name} ({coin.symbol})
                        </button>)}
                    </div>}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Condition */}
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Điều kiện
                </label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" value={newAlert.condition} onChange={e => setNewAlert({
              ...newAlert,
              condition: e.target.value
            })}>
                  <option value="above">Lớn hơn hoặc bằng</option>
                  <option value="below">Nhỏ hơn hoặc bằng</option>
                </select>
              </div>
              {/* Value */}
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Giá trị
                </label>
                <div className="relative">
                  <input type="number" className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 pl-8 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0.00" value={newAlert.value} onChange={e => setNewAlert({
                ...newAlert,
                value: e.target.value
              })} required min="0" step="any" />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    {newAlert.type === 'price' || newAlert.type === 'volume' ? '$' : '%'}
                  </div>
                </div>
              </div>
              {/* Timeframe - only for certain alert types */}
              {(newAlert.type === 'price_change' || newAlert.type === 'rsi' || newAlert.type === 'macd') && <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Khung thời gian
                  </label>
                  <select className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" value={newAlert.timeframe} onChange={e => setNewAlert({
              ...newAlert,
              timeframe: e.target.value
            })}>
                    <option value="1h">1 giờ</option>
                    <option value="4h">4 giờ</option>
                    <option value="24h">24 giờ</option>
                    <option value="1d">1 ngày</option>
                    <option value="1w">1 tuần</option>
                  </select>
                </div>}
              {/* Repeat Option */}
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Lặp lại
                </label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" value={newAlert.repeat} onChange={e => setNewAlert({
              ...newAlert,
              repeat: e.target.value
            })}>
                  <option value="once">Một lần</option>
                  <option value="always">Liên tục</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button type="button" className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg mr-2" onClick={() => setIsCreatingAlert(false)}>
                Hủy
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center">
                <SaveIcon size={16} className="mr-2" />
                Lưu cảnh báo
              </button>
            </div>
          </form>
        </motion.div>}
      {/* Alerts List */}
      <div className="divide-y divide-gray-700 max-h-[500px] overflow-y-auto">
        {alerts.length > 0 ? alerts.map((alert, index) => <motion.div key={alert.id} className="p-4 hover:bg-gray-700/30" initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: index * 0.05
      }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${alert.active ? 'bg-blue-600/20 text-blue-400' : 'bg-gray-700 text-gray-400'}`}>
                    {getAlertTypeIcon(alert.type)}
                  </div>
                  <div>
                    <div className="flex items-center text-sm text-gray-400 mb-1">
                      {alert.type === 'price' && <DollarSignIcon size={14} className="mr-1" />}
                      {alert.type === 'price_change' && <PercentIcon size={14} className="mr-1" />}
                      {alert.type === 'volume' && <BarChart2Icon size={14} className="mr-1" />}
                      {alert.type === 'rsi' && <TrendingUpIcon size={14} className="mr-1" />}
                      {alert.type === 'macd' && <TrendingDownIcon size={14} className="mr-1" />}
                      {alertTypes.find(t => t.id === alert.type)?.name}
                      {alert.repeat === 'always' && <span className="ml-2 bg-gray-600 text-gray-300 text-xs px-2 py-0.5 rounded-full flex items-center">
                          <ClockIcon size={10} className="mr-1" /> Lặp lại
                        </span>}
                    </div>
                    <div className="font-medium text-white">
                      {renderAlertDescription(alert)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={alert.active} onChange={() => toggleAlertStatus(alert.id)} />
                    <div className="relative w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800">
                      <div className={`absolute w-5 h-5 rounded-full transition-all duration-300 ${alert.active ? 'bg-white translate-x-5' : 'bg-gray-400 translate-x-1'} top-0.5`}></div>
                    </div>
                  </label>
                  <button className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-700" onClick={() => deleteAlert(alert.id)}>
                    <XIcon size={16} />
                  </button>
                </div>
              </div>
            </motion.div>) : <div className="p-8 text-center text-gray-400">
            Không có cảnh báo nào. Nhấn nút "Tạo cảnh báo" để thêm cảnh báo mới.
          </div>}
      </div>
    </motion.div>;
};
export default AdvancedAlerts;