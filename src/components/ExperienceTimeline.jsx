import React, { useState } from 'react';
import { Building2, MapPin, Calendar, ChevronDown, ChevronUp, CheckCircle2, Sparkles, Layers } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../context/LanguageContext';
import { experiencesKhmer } from '../data/translations';

const INITIAL_POSITIONS_COUNT = 4;

export default function ExperienceTimeline({ experiences }) {
  const { language, t } = useLanguage();
  const isKhmer = language === 'km';

  // Toggle for individual card detailed information
  const [openIndices, setOpenIndices] = useState([]);

  // Toggle to show more positions in list
  const [showAllPositions, setShowAllPositions] = useState(false);

  const toggleDetails = (idx) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const displayedExperiences = showAllPositions 
    ? experiences 
    : experiences.slice(0, INITIAL_POSITIONS_COUNT);

  const hasMorePositions = experiences.length > INITIAL_POSITIONS_COUNT;

  return (
    <section id="experience" className="py-8 md:py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Experience Cards List */}
        <div className="space-y-3 sm:space-y-3.5">
          {displayedExperiences.map((exp, idx) => {
            const isExpanded = openIndices.includes(idx);
            const isCurrent = idx === 0;
            const kmData = isKhmer && experiencesKhmer[idx] ? experiencesKhmer[idx] : null;

            const roleTitle = kmData?.role || exp.role;
            const periodText = kmData?.period || exp.period;
            const locationText = kmData?.location || exp.location;
            const descriptionText = kmData?.description || exp.description;

            return (
              <ScrollReveal key={idx} animation="fade-up" delay={Math.min(idx * 40, 160)}>
                {/* Career Card Container */}
                <div 
                  className={`bg-white rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden shadow-2xs ${
                    isExpanded 
                      ? 'border-[#F95721]/50 shadow-md ring-1 ring-[#F95721]/20' 
                      : 'border-neutral-200/90 hover:border-neutral-300 hover:shadow-xs'
                  }`}
                >
                  {/* Clean Compact Header */}
                  <div className="p-4 sm:p-5 sm:px-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                      
                      {/* Left: Icon & Info */}
                      <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
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

                      {/* Right: Show / Hide Details Button */}
                      <div className="flex sm:justify-end shrink-0 pl-14 sm:pl-0">
                        <button
                          type="button"
                          onClick={() => toggleDetails(idx)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                            isExpanded
                              ? 'bg-[#F95721] text-white shadow-md shadow-[#F95721]/20'
                              : 'text-[#F95721] hover:text-white bg-[#F95721]/10 hover:bg-[#F95721] border border-[#F95721]/20'
                          }`}
                        >
                          <span>
                            {isExpanded 
                              ? (isKhmer ? 'បង្រួម' : 'Hide Details') 
                              : (isKhmer ? 'មើលលម្អិត' : 'Show Details')}
                          </span>
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                      </div>

                    </div>
                  </div>

                  {/* Detailed Information Section (Revealed when Show Details is clicked) */}
                  {isExpanded && (
                    <div className="border-t border-neutral-100 bg-neutral-50/60 p-5 sm:p-6 sm:px-8 space-y-5 animate-in fade-in duration-300">
                      
                      {/* Role Scope & Mandate Description */}
                      {descriptionText && (
                        <div>
                          <h5 className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">
                            {isKhmer ? 'វិសាលភាពតួនាទី & ភារកិច្ច' : 'Role Scope & Mandate'}
                          </h5>
                          <p className="text-neutral-700 text-xs sm:text-sm leading-relaxed font-normal">
                            {descriptionText}
                          </p>
                        </div>
                      )}

                      {/* Key Systems & Deliverables Grid */}
                      {exp.keyFeatures && exp.keyFeatures.length > 0 && (
                        <div>
                          <h5 className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#F95721]" />
                            <span>{t.experience?.keyDeliverables || 'Key Banking Deliverables & Systems Built'}</span>
                          </h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                            {exp.keyFeatures.map((feat, i) => (
                              <div
                                key={i}
                                className="flex items-start gap-2.5 p-2.5 sm:p-3 rounded-xl bg-white border border-neutral-200/80 shadow-2xs hover:border-[#F95721]/30 transition-colors"
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

                      {/* Technologies & Tech Stack Badges */}
                      {exp.technologies && exp.technologies.length > 0 && (
                        <div>
                          <h5 className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2.5">
                            {t.experience?.techStackUsed || 'Technology Stack Used'}
                          </h5>
                          <div className="flex flex-wrap gap-1.5">
                            {exp.technologies.map((tech, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-2.5 py-1 rounded-lg bg-white text-[11px] font-semibold text-neutral-700 border border-neutral-200 shadow-2xs"
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

        {/* Show More Positions Toggle (if more than 4 positions) */}
        {hasMorePositions && (
          <div className="flex justify-center mt-6 sm:mt-8">
            <button
              type="button"
              onClick={() => setShowAllPositions(!showAllPositions)}
              className="inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 rounded-full bg-white hover:bg-neutral-50 text-neutral-800 hover:text-[#F95721] font-bold text-xs sm:text-sm border border-neutral-200/90 hover:border-[#F95721]/40 shadow-xs hover:shadow-md transition-all cursor-pointer group"
            >
              <span>
                {showAllPositions
                  ? (isKhmer ? 'បង្រួមតួនាទី' : 'Show Fewer Positions')
                  : (isKhmer 
                      ? `បង្ហាញតួនាទីបន្ថែម (${experiences.length - INITIAL_POSITIONS_COUNT} ទៀត)` 
                      : `Show More Positions (+${experiences.length - INITIAL_POSITIONS_COUNT})`)}
              </span>
              {showAllPositions ? (
                <ChevronUp className="w-4 h-4 text-[#F95721] transition-transform group-hover:-translate-y-0.5" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#F95721] transition-transform group-hover:translate-y-0.5" />
              )}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
