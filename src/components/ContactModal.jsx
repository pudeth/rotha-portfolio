import React, { useState } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ContactModal({ isOpen, onClose, defaultService = '' }) {
  const { language, t } = useLanguage();
  const isKhmer = language === 'km';

  const [selectedServices, setSelectedServices] = useState(defaultService ? [defaultService] : []);
  const [budget, setBudget] = useState('$5k - $10k');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

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

  const toggleService = (srv) => {
    if (selectedServices.includes(srv)) {
      setSelectedServices(selectedServices.filter((s) => s !== srv));
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Keep state clear after closing
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#1A1A1A] text-white rounded-[2rem] border border-neutral-800 shadow-2xl overflow-hidden p-6 sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-[#F95721]/20 text-[#F95721] flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>
            <h3 className="text-3xl font-extrabold mb-3">
              {isKhmer ? 'ទទួលបានសារជោគជ័យ!' : 'Message Received!'}
            </h3>
            <p className="text-neutral-400 max-w-md mb-8">
              {t.contactModal.success}
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="bg-[#F95721] hover:bg-[#e44612] text-white px-8 py-3 rounded-full font-bold transition-colors cursor-pointer"
            >
              {isKhmer ? 'បិទផ្ទាំងនេះ' : 'Close'}
            </button>
          </div>
        ) : (
          <div>
            <span className="text-[#F95721] text-xs font-bold tracking-widest uppercase block mb-1">
              {t.contactModal.title}
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
              {isKhmer ? 'ចាប់ផ្តើមកិច្ចពិភាក្សា' : 'Start Your Project'}<span className="text-[#F95721]">.</span>
            </h3>
            <p className="text-neutral-400 text-sm mb-6">
              {t.contactModal.subtitle}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2.5">
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
                        className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#F95721] border-[#F95721] text-white'
                            : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                        }`}
                      >
                        {srv}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Budget Range */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2.5">
                  {isKhmer ? 'កញ្ចប់ថវិកាប៉ាន់ស្មាន:' : 'Estimated Budget:'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {budgetTiers.map((tier) => (
                    <button
                      type="button"
                      key={tier}
                      onClick={() => setBudget(tier)}
                      className={`text-xs font-semibold py-2 rounded-xl border text-center transition-all cursor-pointer ${
                        budget === tier
                          ? 'bg-neutral-800 border-[#F95721] text-[#F95721]'
                          : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">
                    {t.contactModal.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.contactModal.namePlaceholder}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#F95721]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">
                    {t.contactModal.emailLabel}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.contactModal.emailPlaceholder}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#F95721]"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  {t.contactModal.messageLabel}
                </label>
                <textarea
                  rows="3"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.contactModal.messagePlaceholder}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#F95721]"
                ></textarea>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 bg-[#F95721] hover:bg-[#e44612] text-white py-3.5 rounded-full font-bold text-base shadow-lg shadow-[#F95721]/30 transition-all duration-200 cursor-pointer"
                >
                  <span>{t.contactModal.submitButton}</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
