import React, { useState } from 'react';
import { GraduationCap, Award, Cpu, Database, ShieldCheck, Terminal, Layout, Sparkles, CheckCircle2 } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../context/LanguageContext';
import { skillsCategoriesKhmer, educationKhmer, certificationsKhmer } from '../data/translations';

// Core technologies highlighted with distinct architectural status
const CORE_SKILLS = new Set([
  'Java', 'Spring Boot', 'Spring Cloud', 'Microservices', 'REST API', 'RabbitMQ',
  'PostgreSQL', 'Oracle', 'Oracle Flexcube',
  'Spring Security', 'OAuth2', 'JWT', 'Hybrid Encryption',
  'Docker', 'Kubernetes', 'Git',
  'React.js', 'Vue.js'
]);

export default function SkillsEducation({ technicalSkills, education, certifications }) {
  const { language, t } = useLanguage();
  const isKhmer = language === 'km';
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = [
    {
      id: 'backend',
      name: isKhmer ? skillsCategoriesKhmer.backend.name : 'Backend & Microservices',
      icon: Cpu,
      skills: technicalSkills?.backend || [],
      description: isKhmer ? skillsCategoriesKhmer.backend.description : 'Core banking logic, distributed architecture & high-throughput APIs'
    },
    {
      id: 'databases',
      name: isKhmer ? skillsCategoriesKhmer.databases.name : 'Databases & Core Banking Engines',
      icon: Database,
      skills: technicalSkills?.databases || [],
      description: isKhmer ? skillsCategoriesKhmer.databases.description : 'ACID transactions, core banking ledgers & relational data integrity'
    },
    {
      id: 'security',
      name: isKhmer ? skillsCategoriesKhmer.security.name : 'Security, Auth & Compliance',
      icon: ShieldCheck,
      skills: technicalSkills?.security || [],
      description: isKhmer ? skillsCategoriesKhmer.security.description : 'OAuth2/JWT authentication, biometrics & banking regulatory compliance'
    },
    {
      id: 'devops',
      name: isKhmer ? skillsCategoriesKhmer.devops.name : 'DevOps & Cloud Infrastructure',
      icon: Terminal,
      skills: technicalSkills?.devops || [],
      description: isKhmer ? skillsCategoriesKhmer.devops.description : 'Containerization, orchestration, CI/CD pipelines & production monitoring'
    },
    {
      id: 'frontend',
      name: isKhmer ? skillsCategoriesKhmer.frontend.name : 'Frontend & Back-Office UI',
      icon: Layout,
      skills: technicalSkills?.frontend || ['JavaScript', 'Vue.js', 'Nuxt.js', 'React.js', 'PHP', 'Laravel', 'CodeIgniter'],
      description: isKhmer ? skillsCategoriesKhmer.frontend.description : 'Admin portals, transaction dashboards & responsive web interfaces'
    }
  ];

  const totalSkillCount = categories.reduce((acc, cat) => acc + cat.skills.length, 0);

  const displayedCategories = activeFilter === 'all' 
    ? categories 
    : categories.filter(c => c.id === activeFilter);

  return (
    <section id="skills" className="py-16 md:py-24 bg-[#FFF8F3]/60 border-y border-[#FDE8DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#FDE8DF] pb-8">
            <div>
              <span className="text-[#F95721] text-xs sm:text-sm font-bold tracking-widest uppercase mb-2 block">
                {t.skills.badge}
              </span>
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#161616]">
                {t.skills.title}<span className="text-[#F95721]">.</span>
              </h2>
            </div>
            <p className="text-sm sm:text-base text-neutral-600 max-w-md font-normal leading-relaxed">
              {t.skills.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Technical Skills Breakdown (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal animation="fade-left">
              
              {/* Category Header & Filter Bar */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <h3 className="text-xl font-extrabold text-[#161616] flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-[#FFF0E8] text-[#F95721] flex items-center justify-center">
                      <Cpu className="w-4 h-4" />
                    </span>
                    <span>{t.skills.breakdown}</span>
                  </h3>

                  {/* Core vs Supporting Legend */}
                  <div className="hidden sm:flex items-center gap-3 text-[11px] font-semibold text-neutral-500">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#F95721]" />
                      {t.skills.coreArchitecture}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-neutral-300" />
                      {t.skills.supportingStack}
                    </span>
                  </div>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
                  <button
                    onClick={() => setActiveFilter('all')}
                    className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      activeFilter === 'all'
                        ? 'bg-[#F95721] text-white shadow-sm shadow-[#F95721]/30'
                        : 'bg-white text-neutral-600 hover:text-black border border-neutral-200/80 hover:border-neutral-300'
                    }`}
                  >
                    {isKhmer ? `ទាំងអស់ (${totalSkillCount})` : `All Stack (${totalSkillCount})`}
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveFilter(cat.id)}
                      className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        activeFilter === cat.id
                          ? 'bg-[#F95721] text-white shadow-sm shadow-[#F95721]/30'
                          : 'bg-white text-neutral-600 hover:text-black border border-neutral-200/80 hover:border-neutral-300'
                      }`}
                    >
                      {cat.name.split(' ')[0]} ({cat.skills.length})
                    </button>
                  ))}
                </div>
              </div>

              {/* Unified Master Skills Container */}
              <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-neutral-200/80 shadow-xs divide-y divide-neutral-100">
                {displayedCategories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <div 
                      key={cat.id}
                      className="py-6 first:pt-0 last:pb-0 group"
                    >
                      {/* Category Header */}
                      <div className="flex items-center justify-between gap-3 mb-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-[#FFF0E8] text-[#F95721] flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-[#161616] group-hover:text-[#F95721] transition-colors">
                              {cat.name}
                            </h4>
                            <p className="text-[11px] text-neutral-400 hidden sm:block">
                              {cat.description}
                            </p>
                          </div>
                        </div>

                        <span className="text-[11px] font-bold text-neutral-500 bg-neutral-100 px-2.5 py-0.5 rounded-full shrink-0">
                          {cat.skills.length} {t.skills.skillsCount}
                        </span>
                      </div>

                      {/* Harmonious Unified Pills */}
                      <div className="flex flex-wrap gap-2">
                        {cat.skills.map((skill) => {
                          const isCore = CORE_SKILLS.has(skill);
                          return (
                            <span
                              key={skill}
                              className="group/pill inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#FAF8F5] hover:bg-[#161616] text-neutral-800 hover:text-white border border-neutral-200/80 hover:border-[#161616] shadow-2xs hover:shadow-xs transition-all duration-200 cursor-default select-none transform hover:-translate-y-0.5"
                            >
                              {isCore && (
                                <span className="w-1.5 h-1.5 rounded-full bg-[#F95721] group-hover/pill:bg-[#F95721] shrink-0" />
                              )}
                              <span>{skill}</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

            </ScrollReveal>
          </div>

          {/* Right Column: Credentials, Education & Languages (5 cols) */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            
            {/* 1. Degrees & Education Card */}
            <ScrollReveal animation="fade-right" delay={50}>
              <div className="bg-white p-6 sm:p-7 rounded-[2rem] border border-neutral-200/80 shadow-xs hover:shadow-md transition-all duration-300">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-5">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-[#FFF0E8] text-[#F95721] flex items-center justify-center shrink-0">
                      <GraduationCap className="w-4 h-4" />
                    </span>
                    <div>
                      <h4 className="text-base font-extrabold text-[#161616]">{t.skills.degreesTitle}</h4>
                      <p className="text-[11px] text-neutral-400">{t.skills.degreesSubtitle}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-neutral-500 bg-neutral-100 px-2.5 py-0.5 rounded-full shrink-0">
                    {t.skills.degreesCount}
                  </span>
                </div>

                {/* Independent Degree Items */}
                <div className="space-y-3">
                  {education.map((edu, idx) => {
                    const kmEdu = isKhmer && educationKhmer[idx] ? educationKhmer[idx] : null;
                    const institutionName = kmEdu?.institution || edu.institution;
                    const degreeName = kmEdu?.degree || edu.degree;
                    const periodText = kmEdu?.period || edu.period;
                    const locationText = kmEdu?.location || edu.location;

                    return (
                      <div 
                        key={idx} 
                        className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF8F5] border border-neutral-200/70 hover:border-[#F95721]/50 hover:bg-white hover:shadow-xs transition-all duration-200 group"
                      >
                        <div className="flex items-center justify-between flex-wrap gap-2 mb-1.5">
                          <span className="text-[11px] font-bold text-[#F95721] bg-[#FFF0E8] px-2.5 py-0.5 rounded-full border border-[#FDE8DF]">
                            {periodText}
                          </span>
                          <span className="text-[11px] font-semibold text-neutral-400">
                            {locationText}
                          </span>
                        </div>

                        <h5 className="text-sm font-bold text-[#161616] group-hover:text-[#F95721] transition-colors leading-snug">
                          {institutionName}
                        </h5>
                        <p className="text-xs text-neutral-600 font-medium mt-0.5">
                          {degreeName}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>

            {/* 2. Professional Certifications Card */}
            <ScrollReveal animation="fade-right" delay={100}>
              <div className="bg-white p-6 sm:p-7 rounded-[2rem] border border-neutral-200/80 shadow-xs hover:shadow-md transition-all duration-300">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-5">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-[#FFF0E8] text-[#F95721] flex items-center justify-center shrink-0">
                      <Award className="w-4 h-4" />
                    </span>
                    <div>
                      <h4 className="text-base font-extrabold text-[#161616]">{t.skills.certsTitle}</h4>
                      <p className="text-[11px] text-neutral-400">{t.skills.certsSubtitle}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-neutral-500 bg-neutral-100 px-2.5 py-0.5 rounded-full shrink-0">
                    {t.skills.certsCount}
                  </span>
                </div>

                {/* Independent Certification Items */}
                <div className="space-y-3">
                  {certifications.map((cert, idx) => {
                    const kmCert = isKhmer && certificationsKhmer[idx] ? certificationsKhmer[idx] : null;
                    const certName = kmCert?.name || cert.name;
                    const institutionName = kmCert?.institution || cert.institution;
                    const dateText = kmCert?.date || cert.date;

                    return (
                      <div 
                        key={idx} 
                        className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF8F5] border border-neutral-200/70 hover:border-[#F95721]/50 hover:bg-white hover:shadow-xs transition-all duration-200 group"
                      >
                        <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                          <span className="text-[10px] font-extrabold text-[#F95721] uppercase tracking-wider bg-[#FFF0E8] px-2.5 py-0.5 rounded-full border border-[#FDE8DF]">
                            {institutionName}
                          </span>
                          <span className="text-[11px] font-semibold text-neutral-400">
                            {dateText}
                          </span>
                        </div>

                        <h5 className="text-sm font-bold text-[#161616] group-hover:text-[#F95721] transition-colors leading-snug mt-0.5">
                          {certName}
                        </h5>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
}
