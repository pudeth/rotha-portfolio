import React, { useState } from 'react';
import { Briefcase, Building2, MapPin, Calendar, CheckCircle2, ChevronDown, ChevronUp, Sparkles, ShieldCheck, Layers, ArrowUpRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../context/LanguageContext';
import { experiencesKhmer } from '../data/translations';

export default function ExperienceTimeline({ experiences }) {
  const { language, t } = useLanguage();
  const isKhmer = language === 'km';

  // Allow multiple or single open; default first 2 open for immediate richness
  const [openIndices, setOpenIndices] = useState([0]);

  const toggleIndex = (idx) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <section id="experience" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Experience Cards List */}
        <div className="space-y-6">
          {experiences.map((exp, idx) => {
            const isExpanded = openIndices.includes(idx);
            const isCurrent = idx === 0;
            const kmData = isKhmer && experiencesKhmer[idx] ? experiencesKhmer[idx] : null;

            const roleTitle = kmData?.role || exp.role;
            const periodText = kmData?.period || exp.period;
            const locationText = kmData?.location || exp.location;
            const descriptionText = kmData?.description || exp.description;

            return (
              <ScrollReveal key={idx} animation="fade-up" delay={Math.min(idx * 75, 200)}>
                {/* Career Card */}
                <div
                  className={`bg-white rounded-3xl border transition-all duration-300 overflow-hidden shadow-xs hover:shadow-xl ${
                    isExpanded
                      ? 'border-[#F95721]/50 shadow-md ring-1 ring-[#F95721]/20'
                      : 'border-neutral-200/90 hover:border-neutral-300'
                  }`}
                >
                  {/* Clickable Header Bar */}
                  <div
                    onClick={() => toggleIndex(idx)}
                    className="p-6 sm:p-7 cursor-pointer select-none hover:bg-neutral-50/50 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      
                      {/* Company & Role Details */}
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${
                          isCurrent
                            ? 'bg-[#191919] text-[#F95721]'
                            : 'bg-neutral-100 text-neutral-700'
                        }`}>
                          <Building2 className="w-6 h-6 stroke-[2]" />
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                            <span className="text-xl sm:text-2xl font-black text-[#161616] group-hover:text-[#F95721] transition-colors">
                              {roleTitle}
                            </span>
                            {isCurrent && (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                {isKhmer ? 'តួនាទីបច្ចុប្បន្ន' : 'Current Role'}
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs sm:text-sm font-semibold text-neutral-600">
                            <span className="font-bold text-[#161616]">
                              {exp.company}
                            </span>
                            <span className="text-neutral-300">•</span>
                            <span className="inline-flex items-center gap-1 text-[#F95721] font-bold">
                              <Calendar className="w-3.5 h-3.5" />
                              {periodText}
                            </span>
                            <span className="text-neutral-300 hidden sm:inline">•</span>
                            <span className="hidden sm:inline-flex items-center gap-1 text-neutral-500">
                              <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                              {locationText}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Expand Chevron Button */}
                      <div className="flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-neutral-100">
                        <span className="text-xs font-bold text-neutral-400 hover:text-[#F95721] transition-colors md:hidden">
                          {isExpanded 
                            ? (isKhmer ? 'លាក់សមិទ្ធផល' : 'Hide Deliverables') 
                            : (isKhmer ? 'មើលសមិទ្ធផល' : 'View Deliverables')}
                        </span>
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isExpanded ? 'bg-[#F95721] text-white rotate-180' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                        }`}>
                          <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                        </div>
                      </div>

                    </div>

                    {/* Always-visible Quick Tech Stack Chips */}
                    {exp.technologies && (
                      <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-4 border-t border-neutral-100">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mr-1">
                          {isKhmer ? 'បច្ចេកវិទ្យា:' : 'Stack:'}
                        </span>
                        {exp.technologies.slice(0, 5).map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-neutral-100/80 text-neutral-700 border border-neutral-200/60"
                          >
                            {tech}
                          </span>
                        ))}
                        {exp.technologies.length > 5 && (
                          <span className="text-[10px] font-bold text-neutral-400 px-1.5 py-0.5">
                            +{exp.technologies.length - 5} {isKhmer ? 'ទៀត' : 'more'}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Expanded Content Section */}
                  {isExpanded && (
                    <div className="px-6 pb-8 sm:px-8 border-t border-neutral-100 pt-6 bg-neutral-50/40 animate-in fade-in duration-300">
                      
                      {/* Mandate Description */}
                      <div className="mb-6">
                        <h5 className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">
                          {isKhmer ? 'វិសាលភាពតួនាទី & ភារកិច្ច' : 'Role Scope & Mandate'}
                        </h5>
                        <p className="text-neutral-700 text-sm sm:text-base leading-relaxed font-normal">
                          {descriptionText}
                        </p>
                      </div>

                      {/* Key Systems & Deliverables Grid */}
                      {exp.keyFeatures && (
                        <div className="mb-6">
                          <h5 className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#F95721]" />
                            <span>{t.experience.keyDeliverables}</span>
                          </h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {exp.keyFeatures.map((feat, i) => (
                              <div
                                key={i}
                                className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-neutral-200/70 shadow-2xs hover:border-[#F95721]/30 transition-colors"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-[#F95721] mt-1.5 shrink-0"></div>
                                <span className="text-xs sm:text-sm font-semibold text-neutral-800 leading-snug">
                                  {feat}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Full Tech Stack Badges */}
                      {exp.technologies && (
                        <div>
                          <h5 className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2.5">
                            {t.experience.techStackUsed}
                          </h5>
                          <div className="flex flex-wrap gap-1.5">
                            {exp.technologies.map((tech, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-3 py-1 rounded-full bg-white text-xs font-semibold text-neutral-800 border border-neutral-200 shadow-2xs"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  )}

                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}

