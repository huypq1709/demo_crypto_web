import React, { useState, Fragment } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MailIcon, PhoneIcon, MapPinIcon, SendIcon, CheckIcon } from 'lucide-react';
const ContactSection: React.FC = () => {
  const {
    t
  } = useTranslation();
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };
  return <section id="contact" className="py-20 bg-gray-800 relative">
      {/* Background effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-600 rounded-full opacity-5 blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div className="text-center mb-16" initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5
      }}>
          <motion.div className="inline-block" whileHover={{
          scale: 1.05
        }}>
            <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-500/20 text-blue-400 rounded-full mb-4">
              {t('contact.badge')}
            </span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            {t('contact.title').split('với chúng tôi').map((part, i) => {
            return i === 0 ? <Fragment key={i}>
                    {part}{' '}
                    <span className="text-blue-400">
                      {t('contact.title').includes('với chúng tôi') ? 'với chúng tôi' : 'us'}
                    </span>
                  </Fragment> : part;
          })}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 h-full">
              <h3 className="text-xl font-bold mb-6 text-white">
                {t('contact.info.title')}
              </h3>
              <div className="space-y-6">
                <motion.div className="flex items-start" initial={{
                opacity: 0,
                x: -20
              }} whileInView={{
                opacity: 1,
                x: 0
              }} viewport={{
                once: true
              }} transition={{
                delay: 0.1
              }}>
                  <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                    <MailIcon size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-gray-300 font-medium mb-1">
                      {t('contact.info.email')}
                    </h4>
                    <p className="text-white">info@cryptoinsight.com</p>
                    <p className="text-white">support@cryptoinsight.com</p>
                  </div>
                </motion.div>
                <motion.div className="flex items-start" initial={{
                opacity: 0,
                x: -20
              }} whileInView={{
                opacity: 1,
                x: 0
              }} viewport={{
                once: true
              }} transition={{
                delay: 0.2
              }}>
                  <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                    <PhoneIcon size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-gray-300 font-medium mb-1">
                      {t('contact.info.phone')}
                    </h4>
                    <p className="text-white">+84 123 456 789</p>
                    <p className="text-white">+84 987 654 321</p>
                  </div>
                </motion.div>
                <motion.div className="flex items-start" initial={{
                opacity: 0,
                x: -20
              }} whileInView={{
                opacity: 1,
                x: 0
              }} viewport={{
                once: true
              }} transition={{
                delay: 0.3
              }}>
                  <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                    <MapPinIcon size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-gray-300 font-medium mb-1">
                      {t('contact.info.address')}
                    </h4>
                    <p className="text-white">
                      Landmark 81 Building, Vinhomes Central Park
                    </p>
                    <p className="text-white">
                      Binh Thanh District, Ho Chi Minh City
                    </p>
                  </div>
                </motion.div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-700">
                <h4 className="text-white font-medium mb-4">
                  {t('contact.connectWithUs')}
                </h4>
                <div className="flex space-x-4">
                  {['facebook', 'twitter', 'linkedin', 'youtube'].map((social, index) => <motion.a key={social} href="#" className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-300 hover:text-blue-400 hover:border-blue-400 transition-colors" whileHover={{
                  y: -3
                }} whileTap={{
                  scale: 0.95
                }}>
                        {social.charAt(0).toUpperCase()}
                      </motion.a>)}
                </div>
              </div>
            </div>
          </div>
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-6 text-white">
                {t('contact.form.title')}
              </h3>
              {formStatus === 'success' ? <motion.div className="bg-green-500/20 border border-green-500/30 rounded-lg p-6 text-center" initial={{
              opacity: 0,
              scale: 0.9
            }} animate={{
              opacity: 1,
              scale: 1
            }}>
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckIcon size={32} className="text-green-500" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    {t('contact.form.success.title')}
                  </h4>
                  <p className="text-gray-300">
                    {t('contact.form.success.text')}
                  </p>
                  <motion.button className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg" onClick={() => setFormStatus('idle')} whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }}>
                    {t('contact.form.success.button')}
                  </motion.button>
                </motion.div> : <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-300 mb-2">
                        {t('contact.form.name')}
                      </label>
                      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder={t('contact.form.name')} />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-300 mb-2">
                        {t('contact.form.email')}
                      </label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="email@example.com" />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-gray-300 mb-2">
                      {t('contact.form.subject')}
                    </label>
                    <select id="subject" name="subject" value={formData.subject} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">
                        {t('contact.form.selectSubject')}
                      </option>
                      <option value="general">
                        {t('contact.form.subjects.general')}
                      </option>
                      <option value="support">
                        {t('contact.form.subjects.support')}
                      </option>
                      <option value="billing">
                        {t('contact.form.subjects.billing')}
                      </option>
                      <option value="partnership">
                        {t('contact.form.subjects.partnership')}
                      </option>
                      <option value="other">
                        {t('contact.form.subjects.other')}
                      </option>
                    </select>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-300 mb-2">
                      {t('contact.form.message')}
                    </label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={6} className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" placeholder={t('contact.form.enterMessage')}></textarea>
                  </div>
                  <motion.button type="submit" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center justify-center w-full md:w-auto" disabled={formStatus === 'submitting'} whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }}>
                    {formStatus === 'submitting' ? <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        {t('contact.form.sending')}
                      </> : <>
                        <SendIcon size={18} className="mr-2" />
                        {t('contact.form.send')}
                      </>}
                  </motion.button>
                </form>}
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default ContactSection;