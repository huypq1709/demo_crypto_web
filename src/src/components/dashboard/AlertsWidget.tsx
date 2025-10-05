import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BellIcon, PlusIcon, XIcon, ArrowRightIcon } from 'lucide-react';
const AlertsWidget: React.FC = () => {
  const [isAddingAlert, setIsAddingAlert] = useState(false);
  const [newAlertCoin, setNewAlertCoin] = useState('');
  const [newAlertPrice, setNewAlertPrice] = useState('');
  const [newAlertCondition, setNewAlertCondition] = useState('above');
  // Sample alerts data
  const [alerts, setAlerts] = useState([{
    id: 1,
    coin: 'Bitcoin',
    symbol: 'BTC',
    price: 50000,
    condition: 'above',
    active: true
  }, {
    id: 2,
    coin: 'Ethereum',
    symbol: 'ETH',
    price: 3000,
    condition: 'below',
    active: true
  }, {
    id: 3,
    coin: 'Cardano',
    symbol: 'ADA',
    price: 1.5,
    condition: 'above',
    active: false
  }]);
  const handleAddAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAlertCoin && newAlertPrice) {
      const newAlert = {
        id: alerts.length + 1,
        coin: newAlertCoin,
        symbol: newAlertCoin.substring(0, 3).toUpperCase(),
        price: parseFloat(newAlertPrice),
        condition: newAlertCondition,
        active: true
      };
      setAlerts([...alerts, newAlert]);
      setNewAlertCoin('');
      setNewAlertPrice('');
      setNewAlertCondition('above');
      setIsAddingAlert(false);
    }
  };
  const toggleAlertStatus = (id: number) => {
    setAlerts(alerts.map(alert => alert.id === id ? {
      ...alert,
      active: !alert.active
    } : alert));
  };
  const deleteAlert = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };
  return <motion.div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg h-full" initial={{
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
          <h2 className="text-xl font-semibold text-white">Cảnh báo giá</h2>
        </div>
        <button className="p-1.5 bg-blue-600 hover:bg-blue-700 rounded-full text-white" onClick={() => setIsAddingAlert(!isAddingAlert)}>
          {isAddingAlert ? <XIcon size={16} /> : <PlusIcon size={16} />}
        </button>
      </div>
      {isAddingAlert && <div className="p-4 border-b border-gray-700 bg-gray-700/30">
          <h3 className="font-medium text-white mb-3">Thêm cảnh báo mới</h3>
          <form onSubmit={handleAddAlert}>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Tiền điện tử
                </label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={newAlertCoin} onChange={e => setNewAlertCoin(e.target.value)} required>
                  <option value="">Chọn tiền điện tử</option>
                  <option value="Bitcoin">Bitcoin (BTC)</option>
                  <option value="Ethereum">Ethereum (ETH)</option>
                  <option value="Cardano">Cardano (ADA)</option>
                  <option value="Solana">Solana (SOL)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Điều kiện
                  </label>
                  <select className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={newAlertCondition} onChange={e => setNewAlertCondition(e.target.value)}>
                    <option value="above">Lớn hơn hoặc bằng</option>
                    <option value="below">Nhỏ hơn hoặc bằng</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Giá (USD)
                  </label>
                  <input type="number" className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="0.00" value={newAlertPrice} onChange={e => setNewAlertPrice(e.target.value)} required min="0" step="0.01" />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-2">
                <button type="button" className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm" onClick={() => setIsAddingAlert(false)}>
                  Hủy
                </button>
                <button type="submit" className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm">
                  Thêm cảnh báo
                </button>
              </div>
            </div>
          </form>
        </div>}
      <div className="divide-y divide-gray-700 max-h-[calc(100%-130px)] overflow-y-auto">
        {alerts.length > 0 ? alerts.map((alert, index) => <motion.div key={alert.id} className="p-4 hover:bg-gray-700/30" initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: index * 0.1
      }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center mr-3">
                    {alert.symbol.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="font-medium text-white">
                        {alert.coin}
                      </span>
                      <span className="text-gray-400 text-sm ml-1">
                        ({alert.symbol})
                      </span>
                    </div>
                    <div className="text-gray-400 text-sm">
                      {alert.condition === 'above' ? 'Lớn hơn hoặc bằng' : 'Nhỏ hơn hoặc bằng'}{' '}
                      ${alert.price.toLocaleString()}
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
            Không có cảnh báo nào. Nhấn vào nút + để thêm cảnh báo mới.
          </div>}
      </div>
      {alerts.length > 0 && <div className="p-4 border-t border-gray-700 text-center">
          <a href="#" className="text-blue-400 hover:text-blue-300 text-sm flex items-center justify-center">
            Quản lý tất cả cảnh báo{' '}
            <ArrowRightIcon size={16} className="ml-2" />
          </a>
        </div>}
    </motion.div>;
};
export default AlertsWidget;