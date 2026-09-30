import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../context/LanguageContext';
import { projectsKhmer } from '../data/translations';

export default function Projects({ projects, onSelectProject, onOpenViewAll }) {
  const { language, t } = useLanguage();
  const isKhmer = language === 'km';

  // Show first 3 projects to match screenshot, or let user expand
  const featuredProjects = projects.slice(0, 3);

  return (
    <section id="work" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal animation="fade-up">
          <div className="mb-12">
            <span className="text-[#F95721] text-xs sm:text-sm font-bold tracking-widest uppercase mb-2 block">
              {t.projects.badge}
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#161616]">
              {t.projects.title}<span className="text-[#F95721]">.</span>
            </h2>
            <p className="text-neutral-600 text-base max-w-2xl mt-3 leading-relaxed">
              {t.projects.subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* 3 Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project, idx) => {
            const kmProject = isKhmer && projectsKhmer[project.id] ? projectsKhmer[project.id] : null;
            const projectTitle = kmProject?.title || project.title;
            const projectCategory = kmProject?.category || project.category;
            const projectDescription = kmProject?.description || project.description;

            return (
              <ScrollReveal
                key={project.id}
                animation="fade-up"
                delay={idx * 140}
                className="h-full"
              >
                <div
                  onClick={() => onSelectProject(project)}
                  className="h-full group cursor-pointer bg-[#181818] rounded-3xl p-7 sm:p-8 border border-neutral-800 shadow-sm hover:shadow-2xl hover:border-[#F95721]/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
                >
                <div>
                  {/* Top Row: Category Tag & Arrow Action */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <span className="text-[11px] font-bold tracking-wider text-[#F95721] uppercase px-3 py-1 rounded-full bg-[#F95721]/10 border border-[#F95721]/20">
                      {projectCategory}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#F95721] text-white flex items-center justify-center transition-all duration-300 group-hover:rotate-45 group-hover:scale-110 shadow-md shadow-[#F95721]/30 shrink-0">
                      <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                    </div>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-2xl font-extrabold tracking-tight text-white group-hover:text-[#F95721] transition-colors mb-3 leading-snug">
                    {projectTitle}
                  </h3>

                  {/* Client & Year */}
                  <div className="text-xs font-semibold text-neutral-400 mb-4 flex items-center gap-2">
                    <span>{project.client}</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-600"></span>
                    <span>{project.year}</span>
                  </div>

                  {/* Project Overview */}
                  <p className="text-sm text-neutral-300 leading-relaxed mb-6 font-normal line-clamp-3">
                    {projectDescription}
                  </p>
                </div>

                {/* Technologies / Deliverables */}
                {project.tags && (
                  <div className="flex flex-wrap gap-1.5 pt-5 border-t border-neutral-800/80">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-neutral-900 text-neutral-400 border border-neutral-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Centered "View All" Button */}
        <div className="flex justify-center">
          <button
            onClick={onOpenViewAll}
            className="group inline-flex items-center gap-3 bg-[#F95721] hover:bg-[#e44612] text-white pl-8 pr-2.5 py-2.5 rounded-full text-base font-bold shadow-lg shadow-[#F95721]/25 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <span>{t.projects.viewAll}</span>
            <div className="w-9 h-9 rounded-full bg-white text-[#F95721] flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </div>
          </button>
        </div>

      </div>
    </section>
  );
}
