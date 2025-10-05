import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HomeIcon, BarChart3Icon, NewspaperIcon, BellIcon, WalletIcon, SettingsIcon, LogOutIcon, MenuIcon, XIcon, UserIcon, SearchIcon, BellDotIcon, SunIcon, MoonIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import LanguageSwitcher from '../common/LanguageSwitcher';
interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab?: 'overview' | 'market' | 'news' | 'alerts' | 'portfolio';
  onTabChange?: (tab: 'overview' | 'market' | 'news' | 'alerts' | 'portfolio') => void;
}
const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeTab = 'overview',
  onTabChange
}) => {
  const {
    t
  } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notifications, setNotifications] = useState<{
    id: number;
    message: string;
    isRead: boolean;
  }[]>([{
    id: 1,
    message: 'Bitcoin tăng 5% trong 24 giờ qua',
    isRead: false
  }, {
    id: 2,
    message: 'Cảnh báo: Ethereum đang giảm mạnh',
    isRead: false
  }, {
    id: 3,
    message: 'Cập nhật tin tức mới về thị trường',
    isRead: true
  }]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [location]);
  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.notifications-menu') && isNotificationsOpen) {
        setIsNotificationsOpen(false);
      }
      if (!target.closest('.user-menu') && isUserMenuOpen) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isNotificationsOpen, isUserMenuOpen]);
  const unreadNotificationsCount = notifications.filter(n => !n.isRead).length;
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({
      ...n,
      isRead: true
    })));
  };
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, you would apply the theme change to the entire app
  };
  const navigationItems = [{
    name: t('nav.dashboard'),
    icon: <HomeIcon size={20} />,
    tab: 'overview' as const
  }, {
    name: t('nav.market'),
    icon: <BarChart3Icon size={20} />,
    tab: 'market' as const
  }, {
    name: t('nav.news'),
    icon: <NewspaperIcon size={20} />,
    tab: 'news' as const
  }, {
    name: t('nav.alerts'),
    icon: <BellIcon size={20} />,
    tab: 'alerts' as const
  }, {
    name: t('nav.portfolio'),
    icon: <WalletIcon size={20} />,
    tab: 'portfolio' as const
  }, {
    name: t('nav.settings'),
    icon: <SettingsIcon size={20} />,
    path: '/dashboard/settings'
  }];
  const isActive = (item: any) => {
    if (item.tab) {
      return activeTab === item.tab;
    }
    return location.pathname === item.path;
  };

  const handleNavigationClick = (item: any) => {
    if (item.tab && onTabChange) {
      onTabChange(item.tab);
    }
    // For settings, we still use routing
    if (item.path) {
      // This will be handled by Link component
    }
  };
  return <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Desktop Sidebar */}
      <motion.aside className={`bg-gray-800 border-r border-gray-700 h-screen sticky top-0 hidden md:block`} initial={{
      width: isSidebarOpen ? 240 : 80
    }} animate={{
      width: isSidebarOpen ? 240 : 80
    }} transition={{
      duration: 0.3
    }}>
        <div className="p-4 flex items-center justify-between h-16 border-b border-gray-700">
          {isSidebarOpen ? <motion.div className="flex items-center" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.2
        }}>
              <span className="text-xl font-bold text-blue-400">Crypto</span>
              <span className="text-xl font-bold text-white">Insight</span>
            </motion.div> : <div className="mx-auto">
              <span className="text-xl font-bold text-blue-400">C</span>
            </div>}
        </div>
        <nav className="mt-6 px-2">
          <ul className="space-y-2">
            {navigationItems.map(item => <li key={item.name}>
                {item.tab ? (
                  <button 
                    onClick={() => handleNavigationClick(item)}
                    className={`flex items-center p-3 rounded-lg transition-colors w-full text-left ${isActive(item) ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {isSidebarOpen && <motion.span initial={{
                      opacity: 0
                    }} animate={{
                      opacity: 1
                    }} transition={{
                      delay: 0.1
                    }}>
                      {item.name}
                    </motion.span>}
                  </button>
                ) : (
                  <Link to={item.path} className={`flex items-center p-3 rounded-lg transition-colors ${isActive(item) ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
                    <span className="mr-3">{item.icon}</span>
                    {isSidebarOpen && <motion.span initial={{
                      opacity: 0
                    }} animate={{
                      opacity: 1
                    }} transition={{
                      delay: 0.1
                    }}>
                      {item.name}
                    </motion.span>}
                  </Link>
                )}
              </li>)}
          </ul>
        </nav>
        <div className="absolute bottom-0 w-full border-t border-gray-700 p-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 w-full flex items-center justify-center"
            title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isSidebarOpen ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>}
          </button>
        </div>
      </motion.aside>
      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileSidebarOpen && <>
            <motion.div className="fixed inset-0 bg-black/50 z-40 md:hidden" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} onClick={() => setIsMobileSidebarOpen(false)} />
            <motion.aside className="fixed left-0 top-0 bottom-0 w-64 bg-gray-800 border-r border-gray-700 z-50 md:hidden" initial={{
          x: -320
        }} animate={{
          x: 0
        }} exit={{
          x: -320
        }} transition={{
          duration: 0.3
        }}>
              <div className="p-4 flex items-center justify-between h-16 border-b border-gray-700">
                <div className="flex items-center">
                  <span className="text-xl font-bold text-blue-400">
                    Crypto
                  </span>
                  <span className="text-xl font-bold text-white">Insight</span>
                </div>
                <button 
                  onClick={() => setIsMobileSidebarOpen(false)} 
                  className="text-gray-400 hover:text-white"
                  title="Close sidebar"
                >
                  <XIcon size={24} />
                </button>
              </div>
              <nav className="mt-6 px-2">
                <ul className="space-y-2">
                  {navigationItems.map(item => <li key={item.name}>
                      {item.tab ? (
                        <button 
                          onClick={() => handleNavigationClick(item)}
                          className={`flex items-center p-3 rounded-lg transition-colors w-full text-left ${isActive(item) ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                        >
                          <span className="mr-3">{item.icon}</span>
                          <span>{item.name}</span>
                        </button>
                      ) : (
                        <Link to={item.path} className={`flex items-center p-3 rounded-lg transition-colors ${isActive(item) ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
                          <span className="mr-3">{item.icon}</span>
                          <span>{item.name}</span>
                        </Link>
                      )}
                    </li>)}
                </ul>
              </nav>
              <div className="absolute bottom-0 w-full border-t border-gray-700 p-4">
                <Link to="/login" className="p-3 rounded-lg bg-gray-700 hover:bg-gray-600 w-full flex items-center text-red-400">
                  <LogOutIcon size={20} className="mr-3" />
                  <span>{t('auth.logout')}</span>
                </Link>
              </div>
            </motion.aside>
          </>}
      </AnimatePresence>
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-30">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => setIsMobileSidebarOpen(true)} 
                className="mr-4 text-gray-400 hover:text-white md:hidden"
                title="Open sidebar"
              >
                <MenuIcon size={24} />
              </button>
              <div className="relative max-w-md w-full hidden md:block">
                <input type="text" placeholder={t('common.search')} className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                <SearchIcon size={18} className="absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Language Switcher */}
              <LanguageSwitcher minimal />
              {/* Theme Toggle */}
              <button 
                onClick={toggleDarkMode} 
                className="p-2 rounded-full hover:bg-gray-700 text-gray-300"
                title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
              </button>
              {/* Notifications */}
              <div className="relative notifications-menu">
                <button 
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} 
                  className="p-2 rounded-full hover:bg-gray-700 text-gray-300 relative"
                  title="Notifications"
                >
                  {unreadNotificationsCount > 0 ? <>
                      <BellDotIcon size={20} className="text-blue-400" />
                      <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {unreadNotificationsCount}
                      </span>
                    </> : <BellIcon size={20} />}
                </button>
                {/* Notifications Dropdown */}
                <AnimatePresence>
                  {isNotificationsOpen && <motion.div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50" initial={{
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
                      <div className="p-3 border-b border-gray-700 flex items-center justify-between">
                        <h3 className="font-medium">
                          {t('dashboard.notifications.title')}
                        </h3>
                        <button 
                          onClick={markAllAsRead} 
                          className="text-xs text-blue-400 hover:text-blue-300"
                          title="Mark all notifications as read"
                        >
                          {t('dashboard.notifications.markAllRead')}
                        </button>
                      </div>
                      <div className="max-h-72 overflow-y-auto">
                        {notifications.length > 0 ? <div>
                            {notifications.map(notification => <div key={notification.id} className={`p-3 border-b border-gray-700 hover:bg-gray-700 cursor-pointer ${!notification.isRead ? 'bg-gray-700/50' : ''}`}>
                                <div className="flex items-start">
                                  {!notification.isRead && <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500 mr-2"></div>}
                                  <div className={!notification.isRead ? 'font-medium' : ''}>
                                    {notification.message}
                                  </div>
                                </div>
                                <div className="text-xs text-gray-400 mt-1">
                                  2 giờ trước
                                </div>
                              </div>)}
                          </div> : <div className="p-4 text-center text-gray-400">
                            {t('dashboard.notifications.noNotifications')}
                          </div>}
                      </div>
                      <div className="p-2 border-t border-gray-700 text-center">
                        <Link to="/dashboard/notifications" className="text-sm text-blue-400 hover:text-blue-300">
                          {t('dashboard.notifications.viewAll')}
                        </Link>
                      </div>
                    </motion.div>}
                </AnimatePresence>
              </div>
              {/* User Menu */}
              <div className="relative user-menu">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} 
                  className="flex items-center space-x-2 hover:bg-gray-700 rounded-lg p-2"
                  title="User menu"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                    <UserIcon size={16} />
                  </div>
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-medium">John Doe</div>
                    <div className="text-xs text-gray-400">Premium</div>
                  </div>
                </button>
                {/* User Dropdown */}
                <AnimatePresence>
                  {isUserMenuOpen && <motion.div className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50" initial={{
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
                      <div className="p-3 border-b border-gray-700">
                        <div className="font-medium">John Doe</div>
                        <div className="text-sm text-gray-400">
                          john.doe@example.com
                        </div>
                      </div>
                      <div className="p-2">
                        <Link to="/dashboard/profile" className="flex items-center p-2 hover:bg-gray-700 rounded-lg">
                          <UserIcon size={16} className="mr-2" />
                          <span>{t('settings.account.profile')}</span>
                        </Link>
                        <Link to="/dashboard/settings" className="flex items-center p-2 hover:bg-gray-700 rounded-lg">
                          <SettingsIcon size={16} className="mr-2" />
                          <span>{t('nav.settings')}</span>
                        </Link>
                        <div className="border-t border-gray-700 my-1"></div>
                        <Link to="/login" className="flex items-center p-2 hover:bg-gray-700 rounded-lg text-red-400">
                          <LogOutIcon size={16} className="mr-2" />
                          <span>{t('auth.logout')}</span>
                        </Link>
                      </div>
                    </motion.div>}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>
        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
        {/* Footer */}
        <footer className="bg-gray-800 border-t border-gray-700 py-4 px-6 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} {t('app.name')}.{' '}
            {t('footer.allRightsReserved')}
          </p>
        </footer>
      </div>
    </div>;
};
export default DashboardLayout;