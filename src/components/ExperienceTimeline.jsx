import React from 'react';
import { Building2, MapPin, Calendar } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../context/LanguageContext';
import { experiencesKhmer } from '../data/translations';

export default function ExperienceTimeline({ experiences }) {
  const { language } = useLanguage();
  const isKhmer = language === 'km';

  return (
    <section id="experience" className="py-8 md:py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Experience Cards List - Small, Clean Size (Position, Brand, Year) */}
        <div className="space-y-3 sm:space-y-3.5">
          {experiences.map((exp, idx) => {
            const isCurrent = idx === 0;
            const kmData = isKhmer && experiencesKhmer[idx] ? experiencesKhmer[idx] : null;

            const roleTitle = kmData?.role || exp.role;
            const periodText = kmData?.period || exp.period;
            const locationText = kmData?.location || exp.location;

            return (
              <ScrollReveal key={idx} animation="fade-up" delay={Math.min(idx * 50, 200)}>
                {/* Career Card */}
                <div className="bg-white rounded-2xl sm:rounded-3xl border border-neutral-200/90 hover:border-neutral-300 hover:shadow-md transition-all duration-200 overflow-hidden shadow-2xs">
                  <div className="p-4 sm:p-5 sm:px-6">
                    <div className="flex items-center gap-3.5 sm:gap-4">
                      
                      {/* Company Icon */}
                      <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs ${
                        isCurrent
                          ? 'bg-[#191919] text-[#F95721]'
                          : 'bg-neutral-100 text-neutral-700'
                      }`}>
                        <Building2 className="w-5 h-5 stroke-[2]" />
                      </div>

                      {/* Details: Position, Brand, Year, Location */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-base sm:text-lg md:text-xl font-black text-[#161616]">
                            {roleTitle}
                          </span>
                          {isCurrent && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                              {isKhmer ? 'តួនាទីបច្ចុប្បន្ន' : 'Current Role'}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-y-1 gap-x-2.5 text-xs sm:text-sm font-semibold text-neutral-600">
                          <span className="font-bold text-[#161616]">
                            {exp.company}
                          </span>
                          <span className="text-neutral-300">•</span>
                          <span className="inline-flex items-center gap-1 text-[#F95721] font-bold">
                            <Calendar className="w-3.5 h-3.5" />
                            {periodText}
                          </span>
                          {locationText && (
                            <>
                              <span className="text-neutral-300">•</span>
                              <span className="inline-flex items-center gap-1 text-neutral-500 font-medium">
                                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                                {locationText}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
