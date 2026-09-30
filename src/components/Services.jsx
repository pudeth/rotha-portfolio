import React from 'react';
import { ArrowUpRight, ArrowRight, Layout, Globe, Sparkles, Layers, CheckCircle2 } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../context/LanguageContext';
import { servicesKhmer } from '../data/translations';

export default function Services({ services, onSelectService }) {
  const { t, language } = useLanguage();
  const isKm = language === 'km';

  const getIcon = (name) => {
    switch (name) {
      case 'Layout':
        return <Layout className="w-5 h-5 text-white" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-white" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-white" />;
      case 'Layers':
      default:
        return <Layers className="w-5 h-5 text-white" />;
    }
  };

  return (
    <section id="services" className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dark Container enclosing Services */}
        <div className="bg-[#151515] text-white rounded-[2.5rem] p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden border border-neutral-800">
          
          {/* Subtle background ambient light */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F95721]/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

          {/* Section Header */}
          <ScrollReveal animation="fade-up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 border-b border-neutral-800/80 pb-10">
              <div>
                <span className="text-[#F95721] text-xs sm:text-sm font-bold tracking-widest uppercase mb-2 block">
                  {t.services.badge}
                </span>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
                  {t.services.title}<span className="text-[#F95721]">.</span>
                </h2>
              </div>

              <div className="flex items-center gap-4 max-w-md">
                <p className="text-sm sm:text-base text-neutral-400 font-normal leading-relaxed">
                  {t.services.subtitle}
                </p>
                <div className="hidden sm:flex shrink-0 w-10 h-10 rounded-full border border-neutral-700 items-center justify-center text-neutral-400">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* 4 Cards Grid with Staggered Scroll Transitions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => {
              const kmData = isKm && servicesKhmer[service.id];
              const title = kmData?.title || service.title;
              const description = kmData?.description || service.description;
              const features = kmData?.features || service.features;

              return (
                <ScrollReveal
                  key={service.id}
                  animation="fade-up"
                  delay={idx * 120}
                  className="h-full"
                >
                  <div
                    onClick={() => onSelectService(service)}
                    className="group relative h-full bg-[#1F1F1F] hover:bg-[#252525] border border-neutral-800 hover:border-[#F95721]/50 p-6 sm:p-7 rounded-3xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/50"
                  >
                    <div>
                      {/* Header: Icon + Number Index */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-11 h-11 rounded-2xl bg-[#F95721] flex items-center justify-center shadow-md shadow-[#F95721]/20 group-hover:scale-105 transition-transform duration-300">
                          {getIcon(service.iconName)}
                        </div>
                        <span className="text-xs font-mono font-bold text-neutral-600 group-hover:text-[#F95721] transition-colors">
                          0{idx + 1}
                        </span>
                      </div>

                      {/* Service Title */}
                      <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-[#F95721] transition-colors leading-snug">
                        {title}
                      </h3>

                      {/* Description */}
                      <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                        {description}
                      </p>

                      {/* Point-by-point Explanation of Deliverables */}
                      {features && (
                        <div className="space-y-2 mb-6 pt-4 border-t border-neutral-800/80">
                          {features.slice(0, 3).map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-2 text-xs text-neutral-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#F95721] mt-1.5 shrink-0"></span>
                              <span className="leading-tight">{feat}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                  {/* Bottom Footer: Tags & Arrow Button */}
                  <div className="pt-4 border-t border-neutral-800/60 flex items-center justify-between gap-2">
                    <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider group-hover:text-neutral-400 transition-colors">
                      {service.tags?.[0] || 'Enterprise'}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#F95721] text-white flex items-center justify-center transition-all duration-300 group-hover:rotate-45 shrink-0">
                      <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        </div>

      </div>
    </section>
  );
}
