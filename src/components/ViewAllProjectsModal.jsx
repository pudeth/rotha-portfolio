import React, { useState } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { projectsKhmer } from '../data/translations';

export default function ViewAllProjectsModal({ isOpen, onClose, projects, onSelectProject }) {
  const { language, t } = useLanguage();
  const isKhmer = language === 'km';
  const [activeFilter, setActiveFilter] = useState('ALL');

  if (!isOpen) return null;

  const rawCategories = Array.from(new Set(projects.map((p) => p.category.toUpperCase())));
  const categories = ['ALL', ...rawCategories];

  const filteredProjects = activeFilter === 'ALL'
    ? projects
    : projects.filter((p) => p.category.toUpperCase() === activeFilter);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#161616] text-white rounded-[2.5rem] border border-neutral-800 shadow-2xl p-6 sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header & Close Button */}
        <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
          <div>
            <span className="text-[#F95721] text-xs font-bold tracking-widest uppercase block mb-1">
              {t.projects.badge}
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight">
              {t.projects.allSystemsModalTitle}<span className="text-[#F95721]">.</span>
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm mt-1">
              {t.projects.allSystemsModalSubtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 my-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`text-xs font-bold px-4 py-2 rounded-full border transition-all cursor-pointer ${
                activeFilter === cat
                  ? 'bg-[#F95721] border-[#F95721] text-white shadow-md'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
              }`}
            >
              {cat === 'ALL' ? (isKhmer ? 'ទាំងអស់' : 'ALL') : cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const kmProject = isKhmer && projectsKhmer[project.id] ? projectsKhmer[project.id] : null;
            const projectTitle = kmProject?.title || project.title;
            const projectCategory = kmProject?.category || project.category;
            const projectDescription = kmProject?.description || project.description;

            return (
              <div
                key={project.id}
                onClick={() => {
                  onClose();
                  onSelectProject(project);
                }}
                className="group cursor-pointer bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 hover:border-[#F95721]/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-bold text-[#F95721] uppercase tracking-wider block">
                        {projectCategory}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-[#F95721] text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300 shrink-0">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                    <h4 className="font-bold text-lg text-white group-hover:text-[#F95721] transition-colors mb-2">
                      {projectTitle}
                    </h4>
                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                      {projectDescription}
                    </p>
                  </div>

                  {project.tags && (
                    <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-neutral-800">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-neutral-950 text-neutral-400 border border-neutral-800">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
