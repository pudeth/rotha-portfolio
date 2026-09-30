import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer({ profile, onOpenContact }) {
  const { language, t } = useLanguage();
  const isKhmer = language === 'km';
  const isRotha = profile.id === 'rotha';

  // SVG Icons for social links matching the image footer icons
  const socials = [
    {
      name: 'X (Twitter)',
      href: 'https://twitter.com',
      svg: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com',
      svg: (
        <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      svg: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z" />
        </svg>
      )
    },
    {
      name: 'GitHub',
      href: 'https://github.com',
      svg: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      )
    },
    {
      name: 'Dribbble',
      href: 'https://dribbble.com',
      svg: (
        <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
          <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
          <path d="M8.5 2.5c2.31 4.54 3.73 9.47 4.25 19" />
        </svg>
      )
    },
    {
      name: 'Pinterest',
      href: 'https://pinterest.com',
      svg: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.171-2.911 1.024 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12C24.017 5.367 18.644 0 12.017 0z" />
        </svg>
      )
    }
  ];

  const quickLinks = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.services, href: '#services' },
    { name: t.nav.experience, href: '#experience' },
    { name: t.nav.systems, href: '#projects' },
    { name: t.nav.skills, href: '#skills' }
  ];

  const serviceLinks = isRotha
    ? [
        { name: isKhmer ? 'ប្រព័ន្ធស្នូលធនាគារ' : 'Core Banking', href: '#services' },
        { name: isKhmer ? 'Microservices & APIs' : 'Microservices', href: '#services' },
        { name: isKhmer ? 'ច្រកទូទាត់ប្រាក់' : 'Payment Gateways', href: '#services' },
        { name: isKhmer ? 'ប្រព័ន្ធកម្រិតសហគ្រាស' : 'High-Scale Systems', href: '#services' },
        { name: isKhmer ? 'ស្ថាបត្យកម្មទិន្នន័យ' : 'Database Architecture', href: '#services' }
      ]
    : [
        { name: 'UI/UX Design', href: '#services' },
        { name: 'Web Design', href: '#services' },
        { name: 'Brand Identity', href: '#services' },
        { name: 'Design Systems', href: '#services' },
        { name: 'Graphic Design', href: '#services' }
      ];

  return (
    <footer id="contact" className="bg-[#121212] text-white pt-10 sm:pt-14 pb-8 sm:pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid: 2 columns side-by-side on mobile, 4 columns on md, 12 on lg */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-x-6 sm:gap-x-8 gap-y-7 sm:gap-y-10 pb-8 sm:pb-10 border-b border-neutral-800">
          
          {/* Column 1: Brand & Socials */}
          <div className="col-span-2 md:col-span-4 lg:col-span-5">
            <a href="#home" className="inline-block mb-2 sm:mb-3 group select-none text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              <span>{(profile.brandName || 'rotha').replace('.', '')}</span>
              <span className="text-[#F95721] inline-block transition-transform duration-300 group-hover:scale-125">.</span>
            </a>
            
            <p className="text-neutral-400 text-xs sm:text-sm max-w-sm mb-4 leading-relaxed">
              {isKhmer && isRotha ? t.footer.summary : (profile.bio || 'Designing bold brands that make impact.')}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 flex-wrap">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-[#F95721] hover:bg-[#F95721] transition-all duration-200 cursor-pointer"
                >
                  {social.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-3">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-neutral-400 hover:text-[#F95721] text-xs sm:text-sm transition-colors block py-0.5"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-3">
              {isKhmer ? 'ជំនាញស្នូល' : (isRotha ? 'Expertise' : 'Services')}
            </h4>
            <ul className="space-y-2">
              {serviceLinks.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    className="text-neutral-400 hover:text-[#F95721] text-xs sm:text-sm transition-colors block py-0.5"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div className="col-span-2 md:col-span-4 lg:col-span-3 pt-4 md:pt-0 border-t border-neutral-800/60 md:border-t-0">
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-3">
              {t.footer.contactTitle}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2.5 sm:gap-3 text-neutral-400 text-xs sm:text-sm">
              <a 
                href={`mailto:${profile.email}`} 
                className="flex items-center gap-2.5 hover:text-white transition-colors group p-1.5 -ml-1.5 rounded-lg hover:bg-neutral-900/50"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#F95721] group-hover:scale-110 transition-transform shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">{profile.email}</span>
              </a>

              <div className="flex items-center gap-2.5 p-1.5 -ml-1.5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#F95721] shrink-0">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">{isKhmer ? t.footer.location : profile.location}</span>
              </div>

              <a 
                href={`tel:${profile.phone}`} 
                className="flex items-center gap-2.5 hover:text-white transition-colors group p-1.5 -ml-1.5 rounded-lg hover:bg-neutral-900/50"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#F95721] group-hover:scale-110 transition-transform shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>{profile.phone}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs text-neutral-500">
          <p>© 2026 {profile.name}. {t.footer.rights}</p>
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
            <a href="#privacy" className="hover:text-neutral-300 transition-colors">{isKhmer ? 'គោលការណ៍ឯកជនភាព' : 'Privacy Policy'}</a>
            <a href="#terms" className="hover:text-neutral-300 transition-colors">{isKhmer ? 'លក្ខខណ្ឌប្រើប្រាស់' : 'Terms & Conditions'}</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

