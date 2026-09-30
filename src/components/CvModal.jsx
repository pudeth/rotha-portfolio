import React from 'react';
import { X, Download, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function CvModal({ isOpen, onClose }) {
  const { language, t } = useLanguage();
  const isKhmer = language === 'km';

  if (!isOpen) return null;

  const canvaUrl = "https://www.canva.com/design/DAHUmdR9nR0/1QpVSeuenD-kBmz8-nXpUw/view?continue_in_browser=true";
  const canvaEmbedUrl = "https://www.canva.com/design/DAHUmdR9nR0/1QpVSeuenD-kBmz8-nXpUw/view?embed";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl h-[94vh] flex flex-col bg-[#161616] text-white rounded-[2rem] border border-neutral-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="px-5 py-3.5 border-b border-neutral-800 flex items-center justify-between flex-wrap gap-3 shrink-0 bg-[#1A1A1A]">
          
          {/* Document Title & Badge */}
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F95721] animate-pulse"></span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg tracking-tight">
                  {t.cvModal.title}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-800 text-[#F95721] border border-neutral-700">
                  {t.cvModal.badge}
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                {isKhmer ? 'ជំនួយការប្រធានគ្រប់គ្រងផ្នែកអភិវឌ្ឍន៍ Backend' : 'Assistant Backend Development Manager'}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Open Canva in Browser */}
            <a
              href={canvaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-[#F95721] hover:bg-[#e44612] text-white px-4 py-2 rounded-full text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              <span>{t.cvModal.openCanva}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Download PDF Button */}
            <a
              href="/ROTHA_CV.pdf"
              download="ROTHA_KHOEURN_CV.pdf"
              className="hidden sm:flex items-center gap-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-4 py-2 rounded-full text-xs font-bold border border-neutral-700 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.cvModal.downloadPdf}</span>
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Content Viewport - Full Canva Embed */}
        <div className="flex-1 overflow-auto bg-[#0C0C0C] flex justify-center items-center p-2 sm:p-4">
          <div className="w-full h-full max-w-[620px] flex flex-col items-center justify-center">
            <div 
              className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-neutral-800 relative bg-neutral-900"
              style={{ aspectRatio: '594 / 1162' }}
            >
              <iframe
                loading="lazy"
                src={canvaEmbedUrl}
                title="CV.ai - Rotha Khoeurn"
                className="w-full h-full border-0 absolute inset-0"
                allowFullScreen
                allow="fullscreen"
              />
            </div>
            <p className="text-[11px] text-neutral-500 mt-2 text-center">
              {t.cvModal.disclaimer}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
