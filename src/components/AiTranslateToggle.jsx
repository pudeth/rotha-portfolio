import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AiTranslateToggle({ variant = 'floating' }) {
  const { language, switchLanguage, isAiTranslating } = useLanguage();
  const [isNearFooter, setIsNearFooter] = useState(false);

  // Auto-hide floating button when approaching footer to never block text
  useEffect(() => {
    if (variant !== 'floating') return;

    const checkScrollPosition = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      
      // If within 280px of bottom, hide floating button
      if (scrollY + windowHeight >= docHeight - 280) {
        setIsNearFooter(true);
      } else {
        setIsNearFooter(false);
      }
    };

    window.addEventListener('scroll', checkScrollPosition, { passive: true });
    checkScrollPosition();

    return () => window.removeEventListener('scroll', checkScrollPosition);
  }, [variant]);

  // Inline Variant (for header/footer flexbox integration)
  if (variant === 'inline') {
    return (
      <button
        onClick={() => switchLanguage(language === 'en' ? 'km' : 'en')}
        className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 hover:border-[#F95721] transition-all cursor-pointer select-none text-xs font-semibold"
        title={language === 'en' ? 'Smart AI Translation: Switch to ភាសាខ្មែរ' : 'Smart AI Translation: Switch to English'}
      >
        <Sparkles className={`w-3.5 h-3.5 text-[#F95721] ${isAiTranslating ? 'animate-spin' : ''}`} />
        <div className="w-4 h-3 rounded overflow-hidden shadow-2xs border border-white/20 shrink-0">
          <img 
            src={language === 'en' ? '/flags/kh.svg' : '/flags/gb.svg'} 
            alt={language === 'en' ? 'Cambodia Flag' : 'UK Flag'} 
            className="w-full h-full object-cover" 
          />
        </div>
        <span>{language === 'en' ? 'ភាសាខ្មែរ (AI)' : 'English (AI)'}</span>
      </button>
    );
  }

  // Floating Variant: Automatically hides near footer so it never blocks copyright/footer text
  return (
    <>
      <aside 
        aria-label="Language selector"
        className={`fixed bottom-5 left-5 z-40 transition-all duration-300 ${
          isNearFooter ? 'opacity-0 translate-y-6 pointer-events-none scale-90' : 'opacity-100 translate-y-0 scale-100'
        }`}
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
