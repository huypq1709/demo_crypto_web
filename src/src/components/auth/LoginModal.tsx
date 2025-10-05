import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, MailIcon, LockIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
interface LoginModalProps {
  onClose: () => void;
  onRegisterClick: () => void;
}
const LoginModal: React.FC<LoginModalProps> = ({
  onClose,
  onRegisterClick
}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      // Navigate to dashboard after successful login
      navigate('/dashboard');
    }, 1500);
  };
  const overlayVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1
    }
  };
  const modalVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 300
      }
    }
  };
  return <AnimatePresence>
      <motion.div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" initial="hidden" animate="visible" exit="hidden" variants={overlayVariants} onClick={onClose}>
        <motion.div className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl max-w-md w-full" variants={modalVariants} onClick={e => e.stopPropagation()}>
          <div className="flex justify-between items-center p-6 border-b border-gray-800">
            <h2 className="text-xl font-bold text-white">Đăng nhập</h2>
            <motion.button className="text-gray-400 hover:text-white" onClick={onClose} whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.9
          }}>
              <XIcon size={20} />
            </motion.button>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MailIcon size={18} className="text-gray-500" />
                  </div>
                  <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-10 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="email@example.com" required />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-300 mb-2">
                  Mật khẩu
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <LockIcon size={18} className="text-gray-500" />
                  </div>
                  <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-10 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="••••••••" required />
                </div>
              </div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input type="checkbox" id="remember" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500" />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-300">
                    Ghi nhớ đăng nhập
                  </label>
                </div>
                <a href="#" className="text-sm text-blue-400 hover:text-blue-300">
                  Quên mật khẩu?
                </a>
              </div>
              <motion.button type="submit" className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center justify-center" disabled={isLoading} whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }}>
                {isLoading ? <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Đang đăng nhập...
                  </> : 'Đăng nhập'}
              </motion.button>
            </form>
            <div className="mt-6 flex items-center">
              <div className="flex-grow h-px bg-gray-700"></div>
              <span className="mx-4 text-gray-400 text-sm">Hoặc</span>
              <div className="flex-grow h-px bg-gray-700"></div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <motion.button className="flex items-center justify-center px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 hover:bg-gray-700" whileHover={{
              scale: 1.03
            }} whileTap={{
              scale: 0.97
            }}>
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 mr-2" />
                <span className="text-sm text-white">Google</span>
              </motion.button>
              <motion.button className="flex items-center justify-center px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 hover:bg-gray-700" whileHover={{
              scale: 1.03
            }} whileTap={{
              scale: 0.97
            }}>
                <img src="https://www.svgrepo.com/show/448224/facebook.svg" alt="Facebook" className="w-5 h-5 mr-2" />
                <span className="text-sm text-white">Facebook</span>
              </motion.button>
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-300 text-sm">
                Chưa có tài khoản?{' '}
                <motion.button className="text-blue-400 hover:text-blue-300 font-medium" onClick={onRegisterClick} whileHover={{
                scale: 1.05
              }}>
                  Đăng ký ngay
                </motion.button>
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>;
};
export default LoginModal;