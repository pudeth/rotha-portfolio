import React from 'react';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../context/LanguageContext';

export default function CtaBanner({ onOpenContact }) {
  const { language, t } = useLanguage();
  const isKhmer = language === 'km';

  return (
    <section id="contact-banner" className="py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Full Width Orange Banner Container */}
        <ScrollReveal animation="zoom-in">
          <div className="bg-[#F95721] rounded-[2.5rem] p-8 sm:p-12 lg:p-14 text-white shadow-2xl shadow-[#F95721]/30 relative overflow-hidden">
          
          {/* Subtle geometric background accents */}
          <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
          <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-black/10 blur-2xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            
            {/* Left Texts */}
            <div>
              <span className="text-white/80 text-xs sm:text-sm font-bold tracking-widest uppercase mb-3 block">
                {t.cta.badge}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {t.cta.title}
              </h2>
              <p className="text-white/85 text-sm sm:text-base mt-2 max-w-xl font-normal">
                {t.cta.subtitle}
              </p>
            </div>

            {/* Right Button & Response Time */}
            <div className="flex flex-col sm:items-start lg:items-end gap-3 shrink-0">
              <button
                onClick={onOpenContact}
                className="group inline-flex items-center gap-4 bg-[#141414] hover:bg-black text-white pl-7 pr-2.5 py-2.5 rounded-full text-base font-bold shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <span>{t.cta.button}</span>
                <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </div>
              </button>

              <div className="flex items-center gap-2 text-xs font-semibold text-white/90 pl-2 lg:pr-2">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                <span>{isKhmer ? 'ឆ្លើយតបជាធម្មតាក្នុងរង្វង់ ២៤ ម៉ោង' : 'Usually replies within 24 hours'}</span>
              </div>
            </div>

          </div>

        </div>
        </ScrollReveal>

      </div>
    </section>
  );
}

