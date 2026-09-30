import React from 'react';
import { ArrowRight, Send, FileText, Sparkles, ShieldCheck, Database, Award, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero({ profile, onOpenContact, onExploreWork, onOpenCv }) {
  const isRotha = profile.id === 'rotha';
  const { t, language } = useLanguage();
  const isKm = language === 'km';

  return (
    <section id="home" className="relative isolate pt-4 pb-12 sm:pt-8 sm:pb-16 md:pt-14 md:pb-24 overflow-hidden">
      {/* Background Architectural Grid Pattern with FinTech Node Points */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        style={{
          maskImage: 'radial-gradient(ellipse 95% 85% at 50% 40%, black 50%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(ellipse 95% 85% at 50% 40%, black 50%, transparent 95%)'
        }}
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="arch-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(22, 22, 22, 0.09)" strokeWidth="1" />
              <circle cx="0" cy="0" r="1.5" fill="rgba(249, 87, 33, 0.65)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#arch-grid)" />
        </svg>
      </div>

      {/* Soft Ambient Warm Light Behind Content */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[850px] h-[500px] bg-gradient-to-tr from-[#F95721]/8 via-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            
            {/* Top Badge: "OPEN FOR SELECTED PROJECTS" */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 sm:px-4 sm:py-1.5 rounded-full bg-white/90 border border-neutral-300/80 shadow-xs mb-4 sm:mb-6 transition-transform hover:scale-[1.02]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F95721] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F95721]"></span>
              </span>
              <span className="text-[10px] sm:text-xs font-bold tracking-wider text-neutral-800 uppercase">
                {isKm ? t.hero.tag : (profile.heroTag || t.hero.tag)}
              </span>
              <Send className="w-3.5 h-3.5 text-[#F95721] ml-0.5" />
            </div>

            {/* Main Headline */}
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#161616] mb-3 sm:mb-5 ${
              isKm ? 'font-bold leading-[1.32] tracking-normal' : 'font-extrabold tracking-tight leading-[1.12]'
            }`}>
              {isKm ? (
                <>
                  {t.hero.titleLine1}{' '}
                  <span className="text-[#F95721] inline-block relative not-italic">
                    {t.hero.titleAccent}
                  </span>{' '}
                  <br className="hidden sm:inline" />
                  {t.hero.titleLine2}
                </>
              ) : (
                <>
                  {profile.heroTitleLine1 || 'Architecture That'}{' '}
                  <span className="text-[#F95721] inline-block relative">
                    {profile.heroTitleAccent || 'Powers'}
                  </span>{' '}
                  <br className="hidden sm:inline" />
                  {profile.heroTitleLine2 || 'FinTech.'}
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-neutral-600 max-w-xl font-normal leading-relaxed mb-6 sm:mb-8">
              {isKm ? t.hero.subtitle : (profile.heroSubtitle || t.hero.subtitle)}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-5">
              {/* Primary Pill Button: View My Work */}
              <a
                href="#services"
                onClick={onExploreWork}
                className="group inline-flex items-center gap-2.5 sm:gap-3 bg-[#F95721] hover:bg-[#e44612] text-white pl-5 pr-2 py-2 sm:pl-7 sm:pr-2.5 sm:py-2.5 rounded-full text-sm sm:text-base font-bold shadow-lg shadow-[#F95721]/25 hover:shadow-xl hover:shadow-[#F95721]/35 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>{t.hero.viewWork}</span>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#F95721] flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
                </div>
              </a>

              {/* View CV Button */}
              <button
                onClick={onOpenCv}
                className="group inline-flex items-center gap-2 bg-[#191919] hover:bg-black text-white px-4 py-2 sm:px-6 sm:py-2.5 rounded-full text-sm sm:text-base font-bold shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer border border-neutral-800"
              >
                <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F95721] group-hover:scale-110 transition-transform" />
                <span>{t.hero.viewCv}</span>
              </button>

              {/* Secondary CTA: Hire Me */}
              <button
                onClick={onOpenContact}
                className="group inline-flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base font-bold text-[#161616] hover:text-[#F95721] transition-colors py-2 cursor-pointer ml-1 sm:ml-0"
              >
                <span>{t.hero.hireMe}</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1.5 text-neutral-800 group-hover:text-[#F95721]" />
              </button>
            </div>

          </div>

          {/* Right Column: Portrait with Orange Circle Backdrop */}
          <div className="lg:col-span-5 relative flex justify-center items-center select-none pt-2 sm:pt-4 lg:pt-0">
            
            {/* Background Orange Circle & Portrait Stage */}
            <div className="relative w-[290px] h-[380px] sm:w-[370px] sm:h-[470px] md:w-[420px] md:h-[520px] lg:w-[460px] lg:h-[550px] flex justify-center items-end">
              
              {/* Vibrant Studio Gradient Circle */}
              <div className="absolute top-[60px] sm:top-[75px] md:top-[85px] lg:top-[90px] left-1/2 -translate-x-1/2 w-[250px] h-[250px] sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px] lg:w-[395px] lg:h-[395px] rounded-full bg-gradient-to-br from-[#FF6B35] via-[#F95721] to-[#E03A00] shadow-[0_25px_60px_-15px_rgba(249,87,33,0.4)] ring-1 ring-white/20"></div>
              
              {/* Soft warm ambient backlight aura */}
              <div className="absolute top-[50px] sm:top-[65px] md:top-[75px] lg:top-[80px] left-1/2 -translate-x-1/2 w-[270px] h-[270px] sm:w-[340px] sm:h-[340px] md:w-[380px] md:h-[380px] lg:w-[420px] lg:h-[420px] rounded-full bg-gradient-to-tr from-[#F95721]/30 via-[#FF7748]/25 to-amber-500/15 blur-3xl -z-20"></div>

              {/* Concentric Architectural Orbit Rings */}
              <div className="absolute top-[35px] sm:top-[45px] md:top-[50px] lg:top-[55px] left-1/2 -translate-x-1/2 w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] md:w-[430px] md:h-[430px] lg:w-[470px] lg:h-[470px] rounded-full border border-[#F95721]/20 border-dashed animate-spin-slow pointer-events-none -z-10"></div>
              <div className="absolute top-[45px] sm:top-[58px] md:top-[65px] lg:top-[70px] left-1/2 -translate-x-1/2 w-[280px] h-[280px] sm:w-[355px] sm:h-[355px] md:w-[400px] md:h-[400px] lg:w-[440px] lg:h-[440px] rounded-full border border-[#F95721]/15 pointer-events-none -z-10"></div>

              {/* Portrait Image Cutout with Pop-Out Head & Solid Crisp Torso */}
              <div className="relative z-10 w-full h-[370px] sm:h-[460px] md:h-[510px] lg:h-[540px] flex items-end justify-center pointer-events-none">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="h-full w-auto max-w-full object-contain object-bottom drop-shadow-[0_15px_30px_rgba(0,0,0,0.18)] transition-all duration-500 hover:scale-[1.015] pointer-events-auto select-none"
                  onError={(e) => {
                    e.currentTarget.src = profile.avatarFallback;
                  }}
                />
              </div>

              {/* Ground Anchor Pedestal Pill */}
              <div className="hidden sm:flex absolute -bottom-3.5 left-1/2 -translate-x-1/2 z-20 bg-white/95 backdrop-blur-md px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg shadow-neutral-900/8 border border-white/90 items-center gap-2 whitespace-nowrap select-none hover:scale-105 transition-transform duration-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold text-neutral-800 tracking-wide">
                  {t.hero.badgeCoreBanking}
                </span>
              </div>

              {/* Floating Badge 1: Experience */}
              <div className="absolute -left-2 sm:-left-6 md:-left-8 lg:-left-10 bottom-6 sm:bottom-10 lg:bottom-12 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl shadow-xl shadow-neutral-900/10 border border-white/90 flex flex-col items-center min-w-[95px] sm:min-w-[110px] transition-transform duration-300 hover:scale-105 select-none animate-float-reverse">
                <div className="flex items-center gap-1">
                  <span className="text-2xl sm:text-3xl font-black text-[#F95721] leading-none tracking-tight">
                    {isKm ? t.hero.yearsNumber : profile.experienceYears}
                  </span>
                  <Award className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-neutral-500 mt-1 uppercase tracking-wider text-center leading-tight">
                  {t.hero.yearsLabel}
                </span>
              </div>

              {/* Floating Badge 2: FinTech Architect (Top-Right) */}
              <div className="hidden sm:flex absolute -top-2 -right-2 sm:-top-3 sm:-right-4 md:-right-6 lg:-right-8 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl shadow-lg shadow-neutral-900/10 border border-white/90 items-center gap-2.5 select-none animate-float-slow">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                  <ShieldCheck className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-emerald-600" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[11px] sm:text-xs font-bold text-neutral-900">
                      {t.hero.badgeFintech}
                    </span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-medium text-neutral-500 block leading-tight">
                    {t.hero.badgeHighAvail}
                  </span>
                </div>
              </div>

              {/* Floating Badge 3: Reliability / Enterprise SLA (Bottom-Right) */}
              <div className="hidden md:flex absolute -right-3 md:-right-6 lg:-right-8 bottom-7 sm:bottom-12 lg:bottom-14 z-20 bg-white/95 backdrop-blur-md px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-2xl shadow-lg shadow-neutral-900/10 border border-white/90 items-center gap-2.5 select-none animate-float-slow">
                <div className="w-7 h-7 rounded-xl bg-orange-50 text-[#F95721] flex items-center justify-center shrink-0 border border-orange-100">
                  <Database className="w-3.5 h-3.5 text-[#F95721]" />
                </div>
                <div>
                  <span className="text-[11px] font-black text-neutral-900 block leading-none">
                    {t.hero.badgeUptime}
                  </span>
                  <span className="text-[9px] font-semibold text-neutral-500 block mt-0.5 leading-tight">
                    {t.hero.badgeUptimeLabel}
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Subtle Scroll to Explore Indicator */}
        <div className="hidden md:flex justify-center pt-10">
          <a
            href="#services"
            onClick={onExploreWork}
            className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 hover:bg-white border border-neutral-300/80 shadow-xs hover:shadow-md transition-all text-xs font-bold text-neutral-600 hover:text-[#F95721] cursor-pointer select-none"
          >
            <div className="w-3.5 h-5 rounded-full border-2 border-neutral-400 group-hover:border-[#F95721] flex justify-center pt-0.5 transition-colors">
              <div className="w-1 h-1.5 rounded-full bg-neutral-400 group-hover:bg-[#F95721] animate-mouse-wheel transition-colors"></div>
            </div>
            <span>Scroll to Explore Architecture</span>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#F95721] transition-transform group-hover:translate-y-0.5" />
          </a>
        </div>

      </div>
    </section>
  );
}

