import React from 'react';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AiTranslateToggle({ variant = 'floating' }) {
  const { language, switchLanguage, isAiTranslating } = useLanguage();

  return (
    <>
      {/* The Single Floating Smart AI Button */}
      <aside 
        aria-label="Language selector"
        className="fixed bottom-5 left-5 z-40"
      >
        <button
          onClick={() => switchLanguage(language === 'en' ? 'km' : 'en')}
          className="group flex items-center gap-2.5 bg-[#161616]/95 hover:bg-black text-white px-4 py-2.5 rounded-full shadow-2xl border border-neutral-700 hover:border-[#F95721] transition-all duration-300 backdrop-blur-md cursor-pointer select-none hover:scale-105 active:scale-95"
          title={language === 'en' ? 'Smart AI Translation: Switch to ភាសាខ្មែរ' : 'Smart AI Translation: Switch to English'}
        >
          {/* AI Sparkle Icon with animated state */}
          <div className="relative flex items-center justify-center">
            <Sparkles className={`w-4 h-4 text-[#F95721] ${isAiTranslating ? 'animate-spin' : 'group-hover:rotate-12 transition-transform'}`} />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#F95721] animate-ping opacity-75" />
          </div>

          {/* Real SVG Country Flag */}
          <div className="w-5 h-3.5 rounded overflow-hidden shadow-xs border border-white/20 flex items-center justify-center shrink-0">
            <img 
              src={language === 'en' ? '/flags/kh.svg' : '/flags/gb.svg'} 
              alt={language === 'en' ? 'Cambodia Flag' : 'UK Flag'} 
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Clean Label */}
          <span className="text-xs font-bold tracking-wide">
            {language === 'en' ? 'ភាសាខ្មែរ (AI)' : 'English (AI)'}
          </span>
        </button>
      </aside>

      {/* Floating AI Status Feedback Toast */}
      {isAiTranslating && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#161616]/95 text-white border border-[#F95721]/50 shadow-2xl backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-[#F95721] animate-spin" />
            <span className="text-xs font-bold">
              {language === 'en' ? 'Smart AI: កំពុងបកប្រែជាភាសាខ្មែរ...' : 'Smart AI: Translating to English...'}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
