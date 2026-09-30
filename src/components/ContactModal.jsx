import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, User, Mail, MessageSquare, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ContactModal({ isOpen, onClose, defaultService = '', profile }) {
  const { language, t } = useLanguage();
  const isKhmer = language === 'km';

  const [selectedServices, setSelectedServices] = useState(defaultService ? [defaultService] : []);
  const [budget, setBudget] = useState('$5k - $10k');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [telegramRedirectUrl, setTelegramRedirectUrl] = useState('');

  // Sync default service when opened
  useEffect(() => {
    if (defaultService) {
      setSelectedServices([defaultService]);
    }
  }, [defaultService]);

  // Handle ESC key and body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const servicesList = isKhmer ? [
    'ប្រព័ន្ធស្នូលធនាគារ (Core Banking)',
    'ស្ថាបត្យកម្ម Microservices & APIs',
    'សុវត្ថិភាព & ទប់ស្កាត់ការក្លែងបន្លំ',
    'ភាពជាអ្នកដឹកនាំបច្ចេកវិទ្យា',
    'ប្រឹក្សាយោបល់ FinTech'
  ] : [
    'Core Banking Architecture',
    'Microservices & APIs',
    'Fraud Prevention & Security',
    'Technical Leadership',
    'FinTech Consulting'
  ];

  const budgetTiers = ['<$3k', '$3k - $5k', '$5k - $10k', '$10k+'];

  const telegramUrl = profile?.telegramUrl || 'https://t.me/rotha_kh';
  const telegramHandle = profile?.telegram || '@rotha_kh';
  const emailAddress = profile?.email || 'khoeurnrotha.it@gmail.com';
  const recipientName = profile?.name || (isKhmer ? 'ROTHA KHOEURN' : 'Rotha Khoeurn');

  const toggleService = (srv) => {
    if (selectedServices.includes(srv)) {
      setSelectedServices(selectedServices.filter((s) => s !== srv));
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const cleanUsername = (profile?.telegram || 'rotha_kh')
      .replace('@', '')
      .replace(/https?:\/\/t\.me\//, '')
      .trim();

    const serviceText = selectedServices.length > 0 
      ? selectedServices.join(', ') 
      : (isKhmer ? 'ប្រឹក្សាយោបល់ទូទៅ' : 'General Inquiry');

    const lines = [
      `👋 ${isKhmer ? `ជំរាបសួរ ${recipientName}` : `Hello ${recipientName}`},`,
      '',
      isKhmer 
        ? 'ខ្ញុំបានទាក់ទងមកតាមរយៈគេហទំព័រ Portfolio របស់អ្នក៖' 
        : 'I am reaching out via your portfolio website:',
      `👤 ${isKhmer ? 'ឈ្មោះ' : 'Name'}: ${name.trim()}`,
      `📧 ${isKhmer ? 'អ៊ីមែល' : 'Email'}: ${email.trim()}`,
      `💼 ${isKhmer ? 'ប្រធានបទ' : 'Topics'}: ${serviceText}`,
      `💰 ${isKhmer ? 'កញ្ចប់ថវិកា' : 'Budget'}: ${budget}`,
      '',
      `📝 ${isKhmer ? 'សារពិភាក្សា' : 'Message'}:`,
      message.trim()
    ];

    const messageBody = lines.join('\n');
    const directTelegramUrl = `https://t.me/${cleanUsername}?text=${encodeURIComponent(messageBody)}`;

    setTelegramRedirectUrl(directTelegramUrl);

    // Launch Telegram chat in new tab
    try {
      window.open(directTelegramUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error('Failed to open Telegram link', err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  const resetForm = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setMessage('');
    setSelectedServices(defaultService ? [defaultService] : []);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 sm:py-8 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-[#141414] text-white rounded-3xl sm:rounded-[2.25rem] border border-neutral-800 shadow-2xl shadow-black/90 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky/Fixed Header */}
        <div className="px-5 sm:px-8 pt-5 sm:pt-7 pb-4 border-b border-neutral-800/80 flex items-start justify-between gap-4 shrink-0 bg-[#141414]/90 backdrop-blur-sm">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F95721]/10 border border-[#F95721]/20 text-[#F95721] text-[11px] sm:text-xs font-bold tracking-wider uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F95721] animate-pulse"></span>
              <span>{isKhmer ? `ទាក់ទងមកកាន់ ${recipientName}` : `Connect with ${recipientName}`}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {isKhmer ? 'ចាប់ផ្តើមកិច្ចពិភាក្សា' : 'Start a Conversation'}<span className="text-[#F95721]">.</span>
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm mt-1 leading-relaxed">
              {t.contactModal.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 hover:text-white flex items-center justify-center text-neutral-400 transition-colors shrink-0 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto px-5 sm:px-8 py-5 sm:py-6 space-y-6 custom-scrollbar">
          {submitted ? (
            <div className="py-10 flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-[#F95721]/15 text-[#F95721] flex items-center justify-center mb-5 ring-8 ring-[#F95721]/5">
                <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold mb-2.5">
                {isKhmer ? 'សារបានបញ្ជូនទៅ Telegram!' : 'Opening in Telegram!'}
              </h3>
              <p className="text-neutral-400 text-xs sm:text-sm max-w-md mb-6 leading-relaxed">
                {isKhmer 
                  ? `សាររបស់អ្នកត្រូវបានចងក្រងជាស្រេច។ សូមចុចប៊ូតុង Send នៅក្នុងកម្មវិធី Telegram ដើម្បីផ្ញើទៅកាន់ ${recipientName}។`
                  : `Your inquiry has been compiled with all project details. Simply tap Send in your Telegram app to reach ${recipientName} directly.`}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-sm">
                {telegramRedirectUrl && (
                  <a
                    href={telegramRedirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#F95721] hover:bg-[#e44612] text-white py-3 rounded-full font-bold text-sm transition-all shadow-md shadow-[#F95721]/30 cursor-pointer"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l-.313 4.674c.458 0 .66-.21.916-.457l2.199-2.138 4.573 3.378c.842.464 1.446.225 1.656-.78l2.997-14.121c.307-1.23-.469-1.786-1.272-1.419z" />
                    </svg>
                    <span>{isKhmer ? 'បើក Telegram ម្តងទៀត' : 'Open in Telegram'}</span>
                  </a>
                )}
                <button
                  onClick={resetForm}
                  className="w-full bg-neutral-800 hover:bg-neutral-700 text-neutral-200 py-3 rounded-full font-semibold text-sm transition-colors cursor-pointer"
                >
                  {isKhmer ? 'បិទផ្ទាំងនេះ' : 'Done & Close'}
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Direct Quick Contact Buttons (Telegram + Email) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-neutral-900/80 hover:bg-neutral-800/90 border border-neutral-800 hover:border-[#F95721]/40 transition-all duration-200 group cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 group-hover:bg-[#F95721]/20 group-hover:text-[#F95721] flex items-center justify-center shrink-0 transition-colors">
                      <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                        <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l-.313 4.674c.458 0 .66-.21.916-.457l2.199-2.138 4.573 3.378c.842.464 1.446.225 1.656-.78l2.997-14.121c.307-1.23-.469-1.786-1.272-1.419z" />
                      </svg>
                    </div>
                    <div className="min-w-0 text-left">
                      <div className="text-[11px] text-neutral-400 font-medium">
                        {isKhmer ? 'ផ្ញើសារផ្ទាល់តាម Telegram' : 'Direct Telegram'}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-white group-hover:text-[#F95721] truncate transition-colors">
                        {telegramHandle}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-[#F95721] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
                </a>

                <a
                  href={`mailto:${emailAddress}`}
                  className="flex items-center justify-between p-3 rounded-2xl bg-neutral-900/80 hover:bg-neutral-800/90 border border-neutral-800 hover:border-[#F95721]/40 transition-all duration-200 group cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-[#F95721] group-hover:bg-[#F95721]/20 flex items-center justify-center shrink-0 transition-colors">
                      <Mail className="w-4.5 h-4.5" />
                    </div>
                    <div className="min-w-0 text-left">
                      <div className="text-[11px] text-neutral-400 font-medium">
                        {isKhmer ? 'ផ្ញើអ៊ីមែលការងារ' : 'Direct Email'}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-white group-hover:text-[#F95721] truncate transition-colors">
                        {emailAddress}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-[#F95721] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
                </a>
              </div>

              {/* Divider */}
              <div className="relative flex items-center justify-center">
                <div className="w-full border-t border-neutral-800"></div>
                <span className="absolute bg-[#141414] px-3 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                  {isKhmer ? 'ឬផ្ញើសារលម្អិតខាងក្រោម' : 'Or send a detailed message'}
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Topic / Service Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                    {t.contactModal.serviceLabel}:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {servicesList.map((srv) => {
                      const isSelected = selectedServices.includes(srv);
                      return (
                        <button
                          type="button"
                          key={srv}
                          onClick={() => toggleService(srv)}
                          className={`text-xs font-medium px-3.5 py-2 rounded-xl sm:rounded-full border transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-[#F95721] border-[#F95721] text-white shadow-sm shadow-[#F95721]/30 font-bold scale-[1.02]'
                              : 'bg-neutral-900/90 border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 hover:bg-neutral-800/80'
                          }`}
                        >
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0"></span>}
                          <span>{srv}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Budget Range */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                    {isKhmer ? 'កញ្ចប់ថវិកាប៉ាន់ស្មាន:' : 'Estimated Budget:'}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {budgetTiers.map((tier) => {
                      const isActive = budget === tier;
                      return (
                        <button
                          type="button"
                          key={tier}
                          onClick={() => setBudget(tier)}
                          className={`text-xs font-semibold py-2.5 px-3 rounded-xl border text-center transition-all duration-200 cursor-pointer ${
                            isActive
                              ? 'bg-[#F95721]/15 border-[#F95721] text-[#F95721] font-bold shadow-xs'
                              : 'bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 hover:bg-neutral-800/50'
                          }`}
                        >
                          {tier}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name & Email inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      {t.contactModal.nameLabel} <span className="text-[#F95721]">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t.contactModal.namePlaceholder}
                        className="w-full bg-neutral-900/90 border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#F95721] focus:ring-2 focus:ring-[#F95721]/20 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      {t.contactModal.emailLabel} <span className="text-[#F95721]">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t.contactModal.emailPlaceholder}
                        className="w-full bg-neutral-900/90 border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#F95721] focus:ring-2 focus:ring-[#F95721]/20 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    {t.contactModal.messageLabel} <span className="text-[#F95721]">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      rows="3"
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t.contactModal.messagePlaceholder}
                      className="w-full bg-neutral-900/90 border border-neutral-800 rounded-xl p-3.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#F95721] focus:ring-2 focus:ring-[#F95721]/20 transition-all resize-none"
                    ></textarea>
                  </div>
                </div>

                {/* Submit CTA - Sends to Telegram */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full group flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#F95721] to-[#FF6B35] hover:from-[#e44612] hover:to-[#F95721] text-white py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base shadow-lg shadow-[#F95721]/25 hover:shadow-[#F95721]/40 transition-all duration-300 active:scale-[0.99] cursor-pointer disabled:opacity-70"
                  >
                    <svg className="w-4.5 h-4.5 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                      <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l-.313 4.674c.458 0 .66-.21.916-.457l2.199-2.138 4.573 3.378c.842.464 1.446.225 1.656-.78l2.997-14.121c.307-1.23-.469-1.786-1.272-1.419z" />
                    </svg>
                    <span>
                      {isSubmitting 
                        ? (isKhmer ? 'កំពុងភ្ជាប់ទៅកាន់ Telegram...' : 'Connecting to Telegram...') 
                        : (isKhmer ? 'ផ្ញើសារទៅកាន់ Telegram' : 'Send Message to Telegram')}
                    </span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
