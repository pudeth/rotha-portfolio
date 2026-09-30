import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExperienceTimeline from './components/ExperienceTimeline';
import Services from './components/Services';
import Projects from './components/Projects';
import SkillsEducation from './components/SkillsEducation';
import Testimonials from './components/Testimonials';
import CtaBanner from './components/CtaBanner';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import ProjectModal from './components/ProjectModal';
import ViewAllProjectsModal from './components/ViewAllProjectsModal';
import AdminDashboard from './components/AdminDashboard';
import CvModal from './components/CvModal';
import ScrollProgress from './components/ScrollProgress';
import AiTranslateToggle from './components/AiTranslateToggle';
import { portfolioData } from './data/portfolioData';
import { Settings, Eye, LogOut } from 'lucide-react';

const STORAGE_KEY = 'portfolio_homepage_cms_data';
const PROFILE_KEY = 'portfolio_active_profile_id';

const getInitialData = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Failed to parse saved portfolio data', e);
  }
  return portfolioData;
};

const getInitialProfileId = () => {
  return localStorage.getItem(PROFILE_KEY) || 'rotha';
};

const checkIsAdminRoute = () => {
  const path = window.location.pathname.toLowerCase().replace(/\/+$/, '');
  const hash = window.location.hash.toLowerCase();
  return path === '/rotha' || hash === '#rotha' || hash === '#/rotha';
};

export default function App() {
  // Dynamic CMS Site Data state (persisted to localStorage)
  const [siteData, setSiteData] = useState(getInitialData);
  const [currentProfileId, setCurrentProfileId] = useState(getInitialProfileId);
  const [activeSection, setActiveSection] = useState('home');

  // Modal States (Route /rotha opens Admin Dashboard)
  const [isAdminOpen, setIsAdminOpen] = useState(checkIsAdminRoute);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem('portfolio_admin_auth') === 'true';
  });
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [defaultContactService, setDefaultContactService] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isViewAllOpen, setIsViewAllOpen] = useState(false);
  const [isCvOpen, setIsCvOpen] = useState(false);

  const profile = siteData.profiles[currentProfileId] || siteData.profiles.rotha || portfolioData.profiles.rotha;

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'experience', 'work', 'skills', 'about', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen to /rotha URL changes
  useEffect(() => {
    const handleRouteCheck = () => {
      if (checkIsAdminRoute()) {
        setIsAdminOpen(true);
      }
    };

    handleRouteCheck();
    window.addEventListener('popstate', handleRouteCheck);
    window.addEventListener('hashchange', handleRouteCheck);

    return () => {
      window.removeEventListener('popstate', handleRouteCheck);
      window.removeEventListener('hashchange', handleRouteCheck);
    };
  }, []);

  const handleOpenAdmin = () => {
    setIsAdminOpen(true);
    if (!checkIsAdminRoute()) {
      window.history.pushState(null, '', '/rotha');
    }
  };

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    if (checkIsAdminRoute()) {
      window.history.pushState(null, '', '/');
    }
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem('portfolio_admin_auth');
    setIsAdminAuthenticated(false);
    setIsAdminOpen(false);
    if (checkIsAdminRoute()) {
      window.history.pushState(null, '', '/');
    }
  };

  // Keyboard shortcut Ctrl+Shift+A for Admin Dashboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        if (isAdminOpen) {
          handleCloseAdmin();
        } else {
          handleOpenAdmin();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminOpen]);

  const handleOpenContactWithService = (service) => {
    setDefaultContactService(service?.title || '');
    setIsContactOpen(true);
  };

  const handleSwitchProfile = (pId) => {
    if (siteData.profiles[pId]) {
      setCurrentProfileId(pId);
      try {
        localStorage.setItem(PROFILE_KEY, pId);
      } catch (e) {}
    }
  };

  const handleSaveData = (newData) => {
    setSiteData(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.error('Failed to save portfolio data to localStorage', e);
    }
  };

  const handleResetData = () => {
    setSiteData(portfolioData);
    setCurrentProfileId('rotha');
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(PROFILE_KEY);
    } catch (e) {}
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#161616] font-sans selection:bg-[#F95721] selection:text-white relative">
      {/* Global Subtle Architectural Grid Texture */}
      <div 
        className="fixed inset-0 pointer-events-none bg-grid-pattern opacity-30 -z-10"
        style={{
          maskImage: 'linear-gradient(to bottom, black 40%, transparent 95%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 95%)'
        }}
      />

      {/* Top Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Floating Pill Navbar */}
      <Navbar
        brandName={profile.brandName}
        onOpenContact={() => setIsContactOpen(true)}
        activeSection={activeSection}
        onOpenCv={() => setIsCvOpen(true)}
      />

      <main>
        {/* Hero Section */}
        <Hero
          profile={profile}
          onOpenContact={() => setIsContactOpen(true)}
          onOpenCv={() => setIsCvOpen(true)}
          onExploreWork={() => {
            const el = document.getElementById('services');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Core Expertise & What I Do */}
        <Services
          services={siteData.services || portfolioData.services}
          onSelectService={handleOpenContactWithService}
        />

        {/* 12+ Years Banking Career Trajectory */}
        <ExperienceTimeline experiences={siteData.experiences || portfolioData.experiences} />

        {/* Mission-Critical Systems & Selected Work */}
        <Projects
          projects={siteData.projects || portfolioData.projects}
          onSelectProject={(project) => setSelectedProject(project)}
          onOpenViewAll={() => setIsViewAllOpen(true)}
        />

        {/* Technical Skills, Degrees & Certifications */}
        <SkillsEducation
          technicalSkills={siteData.technicalSkills || portfolioData.technicalSkills}
          education={siteData.education || portfolioData.education}
          certifications={siteData.certifications || portfolioData.certifications}
        />

        {/* Professional Recommendations / Testimonials */}
        <Testimonials testimonials={siteData.testimonials || portfolioData.testimonials} />

        {/* Let's Work Together Call to Action */}
        <CtaBanner onOpenContact={() => setIsContactOpen(true)} />
      </main>

      {/* Footer with Rotha's Contact Details */}
      <Footer
        profile={profile}
        footerLinks={siteData.footerLinks || portfolioData.footerLinks}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* CV Document Viewer & Download Modal */}
      <CvModal
        isOpen={isCvOpen}
        onClose={() => setIsCvOpen(false)}
      />

      {/* Contact & Inquiry Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        defaultService={defaultContactService}
        profile={profile}
      />

      {/* System Architecture Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenContact={() => {
          setSelectedProject(null);
          setIsContactOpen(true);
        }}
      />

      {/* All Systems & Works Explorer Modal */}
      <ViewAllProjectsModal
        isOpen={isViewAllOpen}
        onClose={() => setIsViewAllOpen(false)}
        projects={siteData.projects || portfolioData.projects}
        onSelectProject={(project) => setSelectedProject(project)}
      />

      {/* Full Admin Dashboard CMS Modal (Accessed securely via route /rotha or Ctrl+Shift+A) */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={handleCloseAdmin}
        data={siteData}
        currentProfileId={currentProfileId}
        onSaveData={handleSaveData}
        onResetData={handleResetData}
        onSwitchProfile={handleSwitchProfile}
        onAuthChange={setIsAdminAuthenticated}
      />

      {/* Floating CMS Status Bar (Visible only when Admin is logged in & viewing the live homepage) */}
      {isAdminAuthenticated && !isAdminOpen && (
        <aside 
          aria-label="Admin CMS Quick Bar"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 sm:gap-3 bg-[#161616]/95 text-white border border-neutral-700/80 shadow-2xl px-4 py-2.5 rounded-2xl backdrop-blur-md animate-in slide-in-from-bottom duration-300 ring-1 ring-white/10"
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-neutral-200">Viewing Homepage</span>
          </div>
          <div className="h-4 w-px bg-neutral-700"></div>
          <button
            onClick={handleOpenAdmin}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F95721] hover:bg-[#e44612] text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-[#F95721]/30 cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Open CMS</span>
          </button>
          <button
            onClick={handleAdminLogout}
            className="text-xs text-neutral-400 hover:text-white px-2 py-1 transition-colors cursor-pointer"
            title="Log out of CMS"
          >
            Log Out
          </button>
        </aside>
      )}

      {/* Floating Smart AI Quick Toggle Pill */}
      <AiTranslateToggle variant="floating" />
    </div>
  );
}
