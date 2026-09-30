import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X, FileText, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar({ brandName, onOpenContact, activeSection, onOpenCv }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.services, href: '#services' },
    { name: t.nav.experience, href: '#experience' },
    { name: t.nav.systems, href: '#work' },
    { name: t.nav.skills, href: '#skills' },
    { name: t.nav.contact, href: '#contact' },
  ];

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
      scrolled ? 'bg-[#FAF7F2]/90 backdrop-blur-md py-3 shadow-xs' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo with New Custom Typography & Cyan Dot */}
        <a href="#home" className="group flex items-center select-none py-1">
          <img 
            src="/logo_text_dark.png" 
            alt={brandName} 
            className="h-7 sm:h-8 md:h-8.5 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
          />
        </a>

        {/* Center Pill Nav - Exact match with UI reference */}
        <nav className="hidden lg:flex items-center bg-[#191919] p-1.5 rounded-full shadow-lg border border-neutral-800/80">
          {navLinks.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId || (link.href === '#home' && !activeSection);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-[#F95721] text-white shadow-sm font-semibold'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Buttons */}
        <div className="hidden sm:flex items-center gap-2 sm:gap-2.5">
          {/* View CV Button */}
          <button
            onClick={onOpenCv}
            className="flex items-center gap-1.5 bg-[#FAF7F2] hover:bg-white text-[#161616] px-3.5 py-2 rounded-full text-xs font-bold border border-neutral-300 shadow-xs hover:border-[#F95721] hover:text-[#F95721] transition-all cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-[#F95721]" />
            <span>{t.nav.viewCv}</span>
          </button>

          {/* "Let's Talk" */}
          <button
            onClick={onOpenContact}
            className="group flex items-center gap-2.5 bg-[#191919] hover:bg-[#252525] text-white pl-4 pr-1.5 py-1.5 rounded-full text-sm font-semibold shadow-md transition-all duration-200 border border-neutral-800 hover:border-neutral-700 cursor-pointer"
          >
            <span>{t.nav.letsTalk}</span>
            <div className="w-8 h-8 rounded-full bg-[#F95721] text-white flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </div>
          </button>
        </div>

        {/* Mobile Hamburger & CV Button */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={onOpenCv}
            className="flex items-center gap-1.5 bg-[#FAF7F2] text-[#161616] border border-neutral-300 px-3 py-1.5 rounded-full text-xs font-bold"
          >
            <FileText className="w-3.5 h-3.5 text-[#F95721]" />
            <span>CV</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full bg-[#191919] text-white hover:bg-neutral-800 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-3 pb-6 bg-[#191919] text-white mx-4 mt-2 rounded-3xl shadow-2xl border border-neutral-800 animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-base font-medium text-neutral-200 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-neutral-800 mt-2 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCv();
                }}
                className="w-full flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white py-2.5 rounded-2xl font-semibold border border-neutral-700"
              >
                <FileText className="w-4 h-4 text-[#F95721]" />
                <span>{t.nav.cvDocument}</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#F95721] text-white py-3 rounded-2xl font-semibold shadow-md"
              >
                <span>{t.nav.discussOpps}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
