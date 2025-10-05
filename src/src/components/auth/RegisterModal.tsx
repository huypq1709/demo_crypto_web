import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, UserIcon, MailIcon, LockIcon, CheckIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
interface RegisterModalProps {
  onClose: () => void;
  onLoginClick: () => void;
}
const RegisterModal: React.FC<RegisterModalProps> = ({
  onClose,
  onLoginClick
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (name === 'password') {
      // Simple password strength checker
      let strength = 0;
      if (value.length > 6) strength += 1;
      if (value.match(/[A-Z]/)) strength += 1;
      if (value.match(/[0-9]/)) strength += 1;
      if (value.match(/[^a-zA-Z0-9]/)) strength += 1;
      setPasswordStrength(strength);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate registration
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      // Navigate to dashboard after successful registration
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
            <h2 className="text-xl font-bold text-white">Đăng ký tài khoản</h2>
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
                <label htmlFor="fullName" className="block text-gray-300 mb-2">
                  Họ tên
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <UserIcon size={18} className="text-gray-500" />
                  </div>
                  <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full pl-10 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Nguyễn Văn A" required />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MailIcon size={18} className="text-gray-500" />
                  </div>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full pl-10 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="email@example.com" required />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-300 mb-2">
                  Mật khẩu
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <LockIcon size={18} className="text-gray-500" />
                  </div>
                  <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full pl-10 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="••••••••" required minLength={6} />
                </div>
                {formData.password && <div className="mt-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-400">
                        Độ mạnh mật khẩu:
                      </span>
                      <span className="text-xs font-medium">
                        {passwordStrength === 0 && 'Yếu'}
                        {passwordStrength === 1 && 'Trung bình'}
                        {passwordStrength === 2 && 'Khá'}
                        {passwordStrength === 3 && 'Mạnh'}
                        {passwordStrength === 4 && 'Rất mạnh'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <div className={`h-1.5 rounded-full ${passwordStrength <= 1 ? 'bg-red-500' : passwordStrength === 2 ? 'bg-yellow-500' : passwordStrength === 3 ? 'bg-green-500' : 'bg-green-400'}`} style={{
                    width: `${passwordStrength * 25}%`
                  }}></div>
                    </div>
                  </div>}
              </div>
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-gray-300 mb-2">
                  Xác nhận mật khẩu
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <CheckIcon size={18} className="text-gray-500" />
                  </div>
                  <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className={`w-full pl-10 px-4 py-3 rounded-lg bg-gray-800 border text-white focus:outline-none focus:ring-2 focus:border-transparent ${formData.confirmPassword && formData.password !== formData.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:ring-blue-500'}`} placeholder="••••••••" required />
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && <p className="mt-1 text-xs text-red-500">
                      Mật khẩu không khớp
                    </p>}
              </div>
              <div className="flex items-start mb-6">
                <div className="flex items-center h-5">
                  <input id="terms" type="checkbox" checked={agreeTerms} onChange={e => setAgreeTerms(e.target.checked)} className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500" required />
                </div>
                <label htmlFor="terms" className="ml-2 text-sm text-gray-300">
                  Tôi đồng ý với{' '}
                  <a href="#" className="text-blue-400 hover:text-blue-300">
                    Điều khoản dịch vụ
                  </a>{' '}
                  và{' '}
                  <a href="#" className="text-blue-400 hover:text-blue-300">
                    Chính sách bảo mật
                  </a>
                </label>
              </div>
              <motion.button type="submit" className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center justify-center" disabled={isLoading || formData.password !== formData.confirmPassword} whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }}>
                {isLoading ? <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Đang đăng ký...
                  </> : 'Đăng ký'}
              </motion.button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-gray-300 text-sm">
                Đã có tài khoản?{' '}
                <motion.button className="text-blue-400 hover:text-blue-300 font-medium" onClick={onLoginClick} whileHover={{
                scale: 1.05
              }}>
                  Đăng nhập
                </motion.button>
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>;
};
export default RegisterModal;