import React from 'react';
import { X, ExternalLink, Calendar, User, Tag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { projectsKhmer } from '../data/translations';

export default function ProjectModal({ project, onClose, onOpenContact }) {
  const { language } = useLanguage();
  const isKhmer = language === 'km';

  if (!project) return null;

  const kmProject = isKhmer && projectsKhmer[project.id] ? projectsKhmer[project.id] : null;
  const projectTitle = kmProject?.title || project.title;
  const projectSubtitle = kmProject?.subtitle || project.subtitle;
  const projectCategory = kmProject?.category || project.category;
  const projectDescription = kmProject?.description || project.description;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#1A1A1A] text-white rounded-[2.5rem] border border-neutral-800 shadow-2xl p-6 sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="sticky top-0 float-right z-20 w-10 h-10 rounded-full bg-neutral-800/90 hover:bg-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category & Title */}
        <div className="mb-6">
          <span className="text-[#F95721] text-xs font-bold tracking-widest uppercase block mb-2">
            {projectCategory}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {projectTitle}
            {projectSubtitle && <span className="text-neutral-400 font-normal text-xl block mt-1">{projectSubtitle}</span>}
          </h2>
        </div>


        {/* Meta Details Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-neutral-900 border border-neutral-800/80 mb-8">
          <div>
            <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block">
              {isKhmer ? 'ស្ថាប័នអតិថិជន' : 'Client'}
            </span>
            <p className="text-sm font-semibold text-white mt-0.5">
              {project.client || 'Confidential'}
            </p>
          </div>
          <div>
            <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block">
              {isKhmer ? 'ឆ្នាំអនុវត្ត' : 'Year'}
            </span>
            <p className="text-sm font-semibold text-white mt-0.5">
              {project.year || '2026'}
            </p>
          </div>
          <div>
            <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block">
              {isKhmer ? 'វិស័យ / សេវាកម្ម' : 'Services'}
            </span>
            <p className="text-sm font-semibold text-white mt-0.5">
              {projectCategory}
            </p>
          </div>
        </div>

        {/* Project Description */}
        <div className="mb-8">
          <h4 className="text-lg font-bold mb-2">
            {isKhmer ? 'ទិដ្ឋភាពទូទៅនៃគម្រោង' : 'Project Overview'}
          </h4>
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            {projectDescription}
          </p>
        </div>

        {/* Tags */}
        {project.tags && (
          <div className="mb-8">
            <h5 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2.5">
              {isKhmer ? 'សមិទ្ធផល & បច្ចេកវិទ្យាប្រើប្រាស់' : 'Deliverables & Technologies'}
            </h5>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-neutral-800/80 text-xs font-medium text-neutral-300 border border-neutral-700/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}


        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-800">
          <a
            href={project.liveUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#F95721] hover:underline"
          >
            <span>{isKhmer ? 'ទស្សនាគំរូផ្សាយផ្ទាល់' : 'Preview Live Site / Mockup'}</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            onClick={() => {
              onClose();
              onOpenContact();
            }}
            className="bg-[#F95721] hover:bg-[#e44612] text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-md transition-colors cursor-pointer"
          >
            {isKhmer ? 'ស្នើសុំប្រព័ន្ធស្រដៀងគ្នា' : 'Request Similar Project'}
          </button>
        </div>
      </div>
    </div>
  );
}
