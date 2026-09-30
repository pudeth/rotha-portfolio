import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('portfolio_lang') || 'en';
  });
  const [isAiTranslating, setIsAiTranslating] = useState(false);

  useEffect(() => {
    localStorage.setItem('portfolio_lang', language);
    // Update HTML lang attribute and body class for font adjustments
    document.documentElement.lang = language;
    if (language === 'km') {
      document.documentElement.classList.add('lang-km');
    } else {
      document.documentElement.classList.remove('lang-km');
    }
  }, [language]);

  const switchLanguage = (newLang) => {
    if (newLang === language) return;
    setIsAiTranslating(true);
    setTimeout(() => {
      setLanguage(newLang);
      setIsAiTranslating(false);
    }, 280);
  };

  const toggleLanguage = () => {
    switchLanguage(language === 'en' ? 'km' : 'en');
  };

  const t = translations[language] || translations.en;

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, toggleLanguage, t, isAiTranslating }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
