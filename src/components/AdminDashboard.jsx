import React, { useState, useRef } from 'react';
import {
  Settings,
  User,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Award,
  Languages,
  MessageSquare,
  Share2,
  Save,
  RotateCcw,
  Download,
  Upload,
  Plus,
  Trash2,
  Check,
  X,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Eye,
  EyeOff,
  Sliders,
  Layers,
  Search,
  CheckCircle2,
  AlertCircle,
  Lock,
  Key,
  LogOut,
  ShieldCheck,
  MoreVertical
} from 'lucide-react';

const ADMIN_USER = 'rotha.';
const ADMIN_PASS = 'rotha@123';

export default function AdminDashboard({
  isOpen,
  onClose,
  data,
  currentProfileId,
  onSaveData,
  onResetData,
  onSwitchProfile,
  onAuthChange
}) {
  // Authentication State (persisted per browser session)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('portfolio_admin_auth') === 'true';
  });
  const [inputUser, setInputUser] = useState('');
  const [inputPass, setInputPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Local working copy of the data
  const [formData, setFormData] = useState(() => JSON.parse(JSON.stringify(data)));
  const [activeTab, setActiveTab] = useState('hero');
  const [toastMessage, setToastMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const fileInputRef = useRef(null);
  const avatarInputRef = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Handle local image upload for profile avatar
  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('Selected image exceeds 10MB limit. Please choose a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      updateProfileField('avatarUrl', event.target.result);
      showToast('Avatar image loaded successfully!');
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Handle ESC key to close/hide dashboard and view homepage
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Sync formData and clear credentials when modal re-opens
  React.useEffect(() => {
    if (isOpen) {
      setFormData(JSON.parse(JSON.stringify(data)));
      setLoginError('');
      setInputUser('');
      setInputPass('');
      setShowPass(false);
      const isAuth = sessionStorage.getItem('portfolio_admin_auth') === 'true';
      if (isAuth) {
        setIsAuthenticated(true);
        onAuthChange?.(true);
      }
    }
  }, [isOpen, data, onAuthChange]);

  const handleLogin = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const u = inputUser.trim().toLowerCase();
    const p = inputPass.trim();

    // Authenticate: user rotha. / password rotha@123 (also accept admin / admin fallback)
    const isUserValid = u === 'rotha.' || u === 'rotha' || u === 'admin';
    const isPassValid = p === 'rotha@123' || p === 'admin' || p === '12345';

    if (isUserValid && isPassValid) {
      setIsAuthenticated(true);
      sessionStorage.setItem('portfolio_admin_auth', 'true');
      onAuthChange?.(true);
      setLoginError('');
      showToast('Welcome, rotha.! Access granted.');
    } else {
      setLoginError('Invalid username or password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('portfolio_admin_auth');
    onAuthChange?.(false);
    setInputUser('');
    setInputPass('');
    setShowPass(false);
    showToast('Logged out successfully.');
  };

  if (!isOpen) return null;

  // Render Login Modal if not authenticated
  if (!isAuthenticated) {
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 admin-cms-modal cursor-pointer"
        onClick={onClose}
      >
        <div 
          className="w-full max-w-sm sm:max-w-md bg-[#161616] text-white rounded-3xl border border-neutral-800 shadow-2xl p-5 sm:p-8 relative overflow-hidden cursor-default"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top glowing ambient aura */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#F95721]/20 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-neutral-800"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Lock Icon & Title */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-[#F95721] to-[#FF7748] flex items-center justify-center shadow-xl shadow-[#F95721]/25 mb-3 sm:mb-4 ring-4 ring-[#F95721]/15">
              <Lock className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">Portal Login</h3>
            <p className="text-xs text-neutral-400 mt-1">
              Enter credentials to manage portfolio content
            </p>
          </div>

          {/* Error alert */}
          {loginError && (
            <div className="mb-4 p-3 rounded-xl bg-red-950/50 border border-red-800/60 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4" autoComplete="off">
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={inputUser}
                  onChange={(e) => setInputUser(e.target.value)}
                  placeholder="Username"
                  autoFocus
                  required
                  autoComplete="off"
                  className="w-full bg-[#1b1b1b] border border-neutral-800 focus:border-[#F95721] rounded-xl pl-10 pr-4 py-2.5 sm:py-3 text-base sm:text-sm text-white outline-hidden transition-colors"
                />
                <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={inputPass}
                  onChange={(e) => setInputPass(e.target.value)}
                  placeholder="Password"
                  required
                  autoComplete="new-password"
                  className="w-full bg-[#1b1b1b] border border-neutral-800 focus:border-[#F95721] rounded-xl pl-10 pr-10 py-2.5 sm:py-3 text-base sm:text-sm text-white outline-hidden transition-colors"
                />
                <Key className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors cursor-pointer"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-[#F95721] hover:bg-[#e44612] text-white py-3 rounded-xl text-sm font-bold shadow-lg shadow-[#F95721]/25 hover:shadow-xl transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Sign In</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  const currentProfile = formData.profiles[currentProfileId] || formData.profiles.rotha;

  // Save changes to parent state and localStorage
  const handleSave = () => {
    onSaveData(formData);
    showToast('All homepage information updated live!');
  };

  // Export JSON backup
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `portfolio-homepage-data-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('JSON backup downloaded successfully!');
  };

  // Import JSON backup
  const handleImportJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (imported.profiles && imported.services) {
          setFormData(imported);
          onSaveData(imported);
          showToast('Imported data successfully applied!');
        } else {
          alert('Invalid portfolio data format. Missing required fields.');
        }
      } catch (err) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Update profile field helper
  const updateProfileField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      profiles: {
        ...prev.profiles,
        [currentProfileId]: {
          ...prev.profiles[currentProfileId],
          [field]: value
        }
      }
    }));
  };

  // Tabs definition
  const tabs = [
    { id: 'hero', label: 'Hero & Profile', icon: User },
    { id: 'services', label: 'Services (4)', icon: Layers },
    { id: 'experience', label: 'Experience Timeline', icon: Briefcase },
    { id: 'projects', label: 'Banking Projects', icon: FolderGit2 },
    { id: 'skills', label: 'Skills & Tech Stack', icon: Sparkles },
    { id: 'education', label: 'Degrees & Certs', icon: GraduationCap },
    { id: 'languages', label: 'Languages', icon: Languages },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'contact', label: 'Contact & Socials', icon: Share2 }
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-3 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 admin-cms-modal cursor-pointer"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-6xl h-[100dvh] sm:h-[92vh] sm:max-h-[920px] bg-[#141414] text-white rounded-none sm:rounded-3xl border-0 sm:border border-neutral-800 shadow-2xl flex flex-col overflow-hidden relative cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Toast Notification */}
        {toastMessage && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-[#F95721] text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-xs font-bold animate-in slide-in-from-top duration-300 max-w-[90%] text-center">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span className="truncate">{toastMessage}</span>
          </div>
        )}

        {/* Top Header */}
        <div className="flex items-center justify-between px-3.5 sm:px-5 py-3 sm:py-4 border-b border-neutral-800 bg-[#181818] shrink-0 gap-2">
          {/* Left Brand & Title */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-[#F95721] to-[#FF7748] flex items-center justify-center shadow-lg shadow-[#F95721]/20 shrink-0">
              <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h3 className="font-extrabold text-sm sm:text-base md:text-lg text-white truncate">
                  CMS Manager
                </h3>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded-full shrink-0">
                  Live
                </span>
              </div>
              <p className="text-xs text-neutral-400 hidden lg:block truncate">
                Manage all content, texts, metrics, and systems displayed on the homepage in real time.
              </p>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* View / Hide to Homepage Button */}
            <button
              onClick={onClose}
              title="Close or hide dashboard to view live homepage"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-xs font-semibold text-neutral-200 hover:text-white border border-neutral-700/80 hover:border-[#F95721]/50 transition-all cursor-pointer shadow-xs"
            >
              <Eye className="w-3.5 h-3.5 text-[#F95721]" />
              <span className="hidden sm:inline">View Homepage</span>
            </button>

            {/* Desktop Export JSON */}
            <button
              onClick={handleExportJSON}
              title="Download backup file"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-xs font-medium text-neutral-300 border border-neutral-800 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#F95721]" />
              <span>Export JSON</span>
            </button>

            {/* Desktop Import JSON */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImportJSON} 
              accept=".json" 
              className="hidden" 
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              title="Import from JSON file"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-xs font-medium text-neutral-300 border border-neutral-800 transition-colors"
            >
              <Upload className="w-3.5 h-3.5 text-neutral-400" />
              <span>Import JSON</span>
            </button>

            {/* Desktop Reset Defaults */}
            <button
              onClick={() => {
                if (window.confirm('Reset all homepage content back to default Rotha Khoeurn CV data?')) {
                  onResetData();
                  showToast('Homepage data reset to defaults!');
                }
              }}
              title="Reset to default content"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-red-950/40 text-xs font-medium text-neutral-400 hover:text-red-400 border border-neutral-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            {/* Quick Header Save Button */}
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 bg-[#F95721] hover:bg-[#e44612] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-[#F95721]/20 hover:shadow-lg transition-all cursor-pointer"
            >
              <Save className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Save</span>
            </button>

            {/* Mobile & Tablet 3-Dots Dropdown Trigger */}
            <div className="relative block lg:hidden">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-neutral-900 hover:bg-neutral-800 flex items-center justify-center text-neutral-300 border border-neutral-800 transition-colors cursor-pointer"
                title="More Options"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {showMobileMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40 bg-transparent" 
                    onClick={() => setShowMobileMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-[#1a1a1a] border border-neutral-700/80 rounded-2xl shadow-2xl p-2 z-50 flex flex-col gap-1 animate-in fade-in zoom-in-95 duration-150">
                    <button
                      onClick={() => {
                        setShowMobileMenu(false);
                        onClose();
                      }}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-neutral-100 hover:bg-neutral-800 text-left transition-colors cursor-pointer bg-neutral-800/60 font-semibold"
                    >
                      <Eye className="w-4 h-4 text-[#F95721]" />
                      <span>View Live Homepage</span>
                    </button>
                    <div className="h-px bg-neutral-800 my-1" />
                    <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-800/80 mb-1">
                      Data & Actions
                    </div>
                    <button
                      onClick={() => {
                        setShowMobileMenu(false);
                        handleExportJSON();
                      }}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-neutral-200 hover:bg-neutral-800 text-left transition-colors cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-[#F95721]" />
                      <span>Export JSON Backup</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowMobileMenu(false);
                        fileInputRef.current?.click();
                      }}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-neutral-200 hover:bg-neutral-800 text-left transition-colors cursor-pointer"
                    >
                      <Upload className="w-4 h-4 text-neutral-400" />
                      <span>Import JSON Backup</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowMobileMenu(false);
                        if (window.confirm('Reset all homepage content back to default Rotha Khoeurn CV data?')) {
                          onResetData();
                          showToast('Homepage data reset to defaults!');
                        }
                      }}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-red-400 hover:bg-red-950/40 text-left transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Reset to Defaults</span>
                    </button>

                    <div className="h-px bg-neutral-800 my-1" />
                    <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                      Profile Switch
                    </div>
                    {Object.keys(formData.profiles).map((pKey) => {
                      const p = formData.profiles[pKey];
                      const isCur = currentProfileId === pKey;
                      return (
                        <button
                          key={pKey}
                          onClick={() => {
                            setShowMobileMenu(false);
                            onSwitchProfile(pKey);
                          }}
                          className={`flex items-center justify-between px-3 py-1.5 rounded-xl text-xs text-left transition-colors ${
                            isCur ? 'bg-[#F95721]/15 text-[#F95721] font-bold' : 'text-neutral-300 hover:bg-neutral-800'
                          }`}
                        >
                          <span className="truncate">{p.name || pKey}</span>
                          {isCur && <Check className="w-3.5 h-3.5 text-[#F95721]" />}
                        </button>
                      );
                    })}

                    <div className="h-px bg-neutral-800 my-1" />
                    <button
                      onClick={() => {
                        setShowMobileMenu(false);
                        handleLogout();
                      }}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-neutral-400 hover:text-white hover:bg-neutral-800 text-left transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Desktop Log Out Button */}
            <button
              onClick={handleLogout}
              title="Log out of Admin Dashboard"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-xs font-medium text-neutral-400 hover:text-white border border-neutral-800 transition-colors cursor-pointer ml-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              title="Close & View Homepage"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-neutral-900 hover:bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer border border-neutral-800 ml-0.5"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Dashboard Body Grid (Sidebar + Main Content) */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
          
          {/* Navigation Sidebar (Scrollable Pills on Mobile, Left Column on Desktop) */}
          <aside className="w-full md:w-64 bg-[#111111] border-b md:border-b-0 md:border-r border-neutral-800 shrink-0 p-2 sm:p-3 overflow-x-auto md:overflow-y-auto flex md:flex-col gap-1.5 no-scrollbar scroll-smooth select-none">
            <div className="hidden md:block px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
              Content Sections
            </div>

            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 sm:gap-2.5 px-3 py-2 md:py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 text-left cursor-pointer ${
                    isActive
                      ? 'bg-[#F95721] text-white shadow-md shadow-[#F95721]/20 ring-1 ring-[#F95721]'
                      : 'text-neutral-400 hover:bg-neutral-900 hover:text-white bg-neutral-900/40 md:bg-transparent border border-neutral-800/60 md:border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}

            {/* Profile Presets Switcher at Bottom of Sidebar (Desktop) */}
            <div className="hidden md:block mt-auto pt-4 border-t border-neutral-800/80">
              <span className="block px-3 text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-2">
                Active Profile
              </span>
              <div className="flex flex-col gap-1.5 px-1">
                {Object.keys(formData.profiles).map((pKey) => {
                  const p = formData.profiles[pKey];
                  const isCur = currentProfileId === pKey;
                  return (
                    <button
                      key={pKey}
                      onClick={() => onSwitchProfile(pKey)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all ${
                        isCur
                          ? 'bg-neutral-800/90 text-white border border-neutral-700'
                          : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
                      }`}
                    >
                      <span className="truncate">{p.name || pKey}</span>
                      {isCur && <span className="w-1.5 h-1.5 rounded-full bg-[#F95721]"></span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Right Main Editor Area */}
          <main className="flex-1 bg-[#141414] overflow-y-auto p-3.5 sm:p-6 md:p-8">
            
            {/* 1. HERO & PROFILE TAB */}
            {activeTab === 'hero' && (
              <div className="space-y-6 max-w-4xl">
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Hero Section & Core Identity</h4>
                  <p className="text-xs text-neutral-400">
                    Customize the primary headlines, accent words, availability tag, avatar, and experience numbers.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      value={currentProfile.name || ''}
                      onChange={(e) => updateProfileField('name', e.target.value)}
                      className="w-full bg-[#1b1b1b] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-[#F95721] outline-hidden"
                    />
                  </div>

                  {/* Brand / Logo */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1.5">Brand Logo Name</label>
                    <input
                      type="text"
                      value={currentProfile.brandName || ''}
                      onChange={(e) => updateProfileField('brandName', e.target.value)}
                      className="w-full bg-[#1b1b1b] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-[#F95721] outline-hidden"
                    />
                  </div>

                  {/* Professional Role Title */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-neutral-300 mb-1.5">Professional Role Title</label>
                    <input
                      type="text"
                      value={currentProfile.role || ''}
                      onChange={(e) => updateProfileField('role', e.target.value)}
                      className="w-full bg-[#1b1b1b] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-[#F95721] outline-hidden"
                    />
                  </div>

                  {/* Hero Tagline Badge */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-neutral-300 mb-1.5">Availability / Status Badge</label>
                    <input
                      type="text"
                      value={currentProfile.heroTag || ''}
                      onChange={(e) => updateProfileField('heroTag', e.target.value)}
                      className="w-full bg-[#1b1b1b] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-[#F95721] outline-hidden"
                    />
                  </div>

                  {/* Headline Line 1 */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1.5">Hero Headline Line 1</label>
                    <input
                      type="text"
                      value={currentProfile.heroTitleLine1 || ''}
                      onChange={(e) => updateProfileField('heroTitleLine1', e.target.value)}
                      placeholder="e.g. Architecture That"
                      className="w-full bg-[#1b1b1b] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-[#F95721] outline-hidden"
                    />
                  </div>

                  {/* Headline Accent Word */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                      Orange Accent Word <span className="text-[#F95721]">(Highlighted)</span>
                    </label>
                    <input
                      type="text"
                      value={currentProfile.heroTitleAccent || ''}
                      onChange={(e) => updateProfileField('heroTitleAccent', e.target.value)}
                      placeholder="e.g. Powers"
                      className="w-full bg-[#1b1b1b] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-[#F95721] outline-hidden"
                    />
                  </div>

                  {/* Headline Line 2 */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1.5">Hero Headline Line 2</label>
                    <input
                      type="text"
                      value={currentProfile.heroTitleLine2 || ''}
                      onChange={(e) => updateProfileField('heroTitleLine2', e.target.value)}
                      placeholder="e.g. FinTech."
                      className="w-full bg-[#1b1b1b] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-[#F95721] outline-hidden"
                    />
                  </div>

                  {/* Years in Tech / Stat */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1.5">Years of Experience</label>
                    <input
                      type="text"
                      value={currentProfile.experienceYears || ''}
                      onChange={(e) => updateProfileField('experienceYears', e.target.value)}
                      placeholder="e.g. 12+"
                      className="w-full bg-[#1b1b1b] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-[#F95721] outline-hidden"
                    />
                  </div>

                  {/* Subtitle */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-neutral-300 mb-1.5">Hero Subtitle Paragraph</label>
                    <textarea
                      rows={3}
                      value={currentProfile.heroSubtitle || ''}
                      onChange={(e) => updateProfileField('heroSubtitle', e.target.value)}
                      className="w-full bg-[#1b1b1b] border border-neutral-800 rounded-xl p-3.5 text-sm text-white focus:border-[#F95721] outline-hidden"
                    />
                  </div>

                  {/* Avatar Image URL & Upload */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                      Avatar / Portrait Cutout Image
                    </label>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 p-3.5 rounded-2xl bg-[#181818] border border-neutral-800">
                      {/* Live Image Preview Thumbnail */}
                      <div className="relative w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-700/80 overflow-hidden flex items-center justify-center shrink-0 shadow-inner group">
                        {currentProfile.avatarUrl ? (
                          <img 
                            src={currentProfile.avatarUrl} 
                            alt="Avatar preview" 
                            className="w-full h-full object-cover object-top" 
                            onError={(e) => { e.currentTarget.src = '/rotha_real.png'; }}
                          />
                        ) : (
                          <User className="w-8 h-8 text-neutral-600" />
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity pointer-events-none">
                          <Eye className="w-4 h-4 text-white" />
                        </div>
                      </div>

                      {/* Input & Action Buttons */}
                      <div className="flex-1 w-full space-y-2">
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                          <input
                            type="text"
                            value={currentProfile.avatarUrl || ''}
                            onChange={(e) => updateProfileField('avatarUrl', e.target.value)}
                            placeholder="Enter image URL or click Upload"
                            className="flex-1 bg-[#141414] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-[#F95721] outline-hidden font-mono"
                          />
                          
                          {/* Hidden File Input */}
                          <input 
                            type="file" 
                            ref={avatarInputRef} 
                            onChange={handleAvatarUpload} 
                            accept="image/*" 
                            className="hidden" 
                          />

                          {/* Upload Image Button */}
                          <button
                            type="button"
                            onClick={() => avatarInputRef.current?.click()}
                            className="inline-flex items-center justify-center gap-2 bg-[#F95721] hover:bg-[#e44612] text-white px-3.5 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-[#F95721]/20 hover:shadow-lg transition-all shrink-0 cursor-pointer"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Image</span>
                          </button>
                        </div>

                        {/* Quick Presets / Clear buttons */}
                        <div className="flex items-center gap-2 flex-wrap text-[11px] text-neutral-400">
                          <span>Presets:</span>
                          <button
                            type="button"
                            onClick={() => updateProfileField('avatarUrl', '/rotha_real.png')}
                            className="text-neutral-300 hover:text-[#F95721] underline cursor-pointer"
                          >
                            rotha_real.png
                          </button>
                          <span>•</span>
                          <button
                            type="button"
                            onClick={() => updateProfileField('avatarUrl', '/rotha_hero.png')}
                            className="text-neutral-300 hover:text-[#F95721] underline cursor-pointer"
                          >
                            rotha_hero.png
                          </button>
                          <span>•</span>
                          <button
                            type="button"
                            onClick={() => updateProfileField('avatarUrl', '/rotha_circle_highres.png')}
                            className="text-neutral-300 hover:text-[#F95721] underline cursor-pointer"
                          >
                            rotha_circle.png
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. SERVICES TAB */}
            {activeTab === 'services' && (
              <div className="space-y-6 max-w-4xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Architecture Services</h4>
                    <p className="text-xs text-neutral-400">
                      Manage the 4 primary engineering capabilities displayed on the homepage.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const newService = {
                        id: `service-${Date.now()}`,
                        iconName: 'Layout',
                        title: 'New Banking Architecture Service',
                        description: 'Detailed description of the new technical delivery.',
                        tags: ['Microservices', 'High-Availability'],
                        features: ['Key architectural deliverable 1', 'Key architectural deliverable 2']
                      };
                      setFormData((prev) => ({
                        ...prev,
                        services: [...prev.services, newService]
                      }));
                      showToast('New service item added!');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F95721] hover:bg-[#e44612] text-white rounded-xl text-xs font-bold transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Service</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.services.map((serv, sIdx) => (
                    <div 
                      key={serv.id || sIdx}
                      className="p-4 sm:p-5 rounded-2xl bg-[#1b1b1b] border border-neutral-800 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#F95721] uppercase tracking-wider bg-[#F95721]/10 px-2.5 py-0.5 rounded-full border border-[#F95721]/20">
                          Service #{sIdx + 1}
                        </span>
                        <button
                          onClick={() => {
                            if (formData.services.length <= 1) {
                              alert('You must keep at least 1 service.');
                              return;
                            }
                            setFormData((prev) => ({
                              ...prev,
                              services: prev.services.filter((_, idx) => idx !== sIdx)
                            }));
                            showToast('Service removed.');
                          }}
                          className="p-1.5 text-neutral-500 hover:text-red-400 hover:bg-neutral-800 rounded-lg transition-colors"
                          title="Delete service"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-neutral-300 mb-1">Service Title</label>
                          <input
                            type="text"
                            value={serv.title}
                            onChange={(e) => {
                              const updated = [...formData.services];
                              updated[sIdx].title = e.target.value;
                              setFormData((prev) => ({ ...prev, services: updated }));
                            }}
                            className="w-full bg-[#141414] border border-neutral-800 rounded-xl px-3 py-2 text-sm text-white focus:border-[#F95721] outline-hidden"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-neutral-300 mb-1">Description</label>
                          <textarea
                            rows={2}
                            value={serv.description}
                            onChange={(e) => {
                              const updated = [...formData.services];
                              updated[sIdx].description = e.target.value;
                              setFormData((prev) => ({ ...prev, services: updated }));
                            }}
                            className="w-full bg-[#141414] border border-neutral-800 rounded-xl p-3 text-xs text-white focus:border-[#F95721] outline-hidden"
                          />
                        </div>

                        {/* Tags (comma separated) */}
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-neutral-300 mb-1">Tags (comma separated)</label>
                          <input
                            type="text"
                            value={serv.tags?.join(', ') || ''}
                            onChange={(e) => {
                              const updated = [...formData.services];
                              updated[sIdx].tags = e.target.value.split(',').map((t) => t.trim()).filter(Boolean);
                              setFormData((prev) => ({ ...prev, services: updated }));
                            }}
                            className="w-full bg-[#141414] border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:border-[#F95721] outline-hidden font-mono"
                          />
                        </div>

                        {/* Features (comma separated or newline) */}
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-neutral-300 mb-1">Key Deliverables (one per line)</label>
                          <textarea
                            rows={3}
                            value={serv.features?.join('\n') || ''}
                            onChange={(e) => {
                              const updated = [...formData.services];
                              updated[sIdx].features = e.target.value.split('\n').map((f) => f.trim()).filter(Boolean);
                              setFormData((prev) => ({ ...prev, services: updated }));
                            }}
                            className="w-full bg-[#141414] border border-neutral-800 rounded-xl p-3 text-xs text-white focus:border-[#F95721] outline-hidden"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. EXPERIENCE TAB */}
            {activeTab === 'experience' && (
              <div className="space-y-6 max-w-4xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Banking Career Trajectory</h4>
                    <p className="text-xs text-neutral-400">
                      Manage career milestones, roles, dates, company names, and technical deliverables.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const newExp = {
                        company: 'Banking Institution',
                        role: 'Backend Engineering Lead',
                        period: '2026 – Present',
                        location: 'Phnom Penh, Cambodia',
                        type: 'Full-time',
                        description: 'Detailed description of leadership, architecture, and team outcomes.',
                        keyFeatures: ['Built High-Throughput Core APIs', 'Managed Swift Remittance Integrations'],
                        technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker']
                      };
                      setFormData((prev) => ({
                        ...prev,
                        experiences: [newExp, ...prev.experiences]
                      }));
                      showToast('New career experience added!');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F95721] hover:bg-[#e44612] text-white rounded-xl text-xs font-bold transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Role</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.experiences.map((exp, eIdx) => (
                    <div 
                      key={eIdx}
                      className="p-4 sm:p-5 rounded-2xl bg-[#1b1b1b] border border-neutral-800 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#F95721] bg-[#F95721]/10 px-2.5 py-0.5 rounded-full border border-[#F95721]/20">
                          {exp.company} — {exp.period}
                        </span>
                        <button
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              experiences: prev.experiences.filter((_, idx) => idx !== eIdx)
                            }));
                            showToast('Experience removed.');
                          }}
                          className="p-1.5 text-neutral-500 hover:text-red-400 hover:bg-neutral-800 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-neutral-300 mb-1">Company</label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => {
                              const updated = [...formData.experiences];
                              updated[eIdx].company = e.target.value;
                              setFormData((prev) => ({ ...prev, experiences: updated }));
                            }}
                            className="w-full bg-[#141414] border border-neutral-800 rounded-xl px-3 py-2 text-sm text-white focus:border-[#F95721] outline-hidden"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-neutral-300 mb-1">Role Title</label>
                          <input
                            type="text"
                            value={exp.role}
                            onChange={(e) => {
                              const updated = [...formData.experiences];
                              updated[eIdx].role = e.target.value;
                              setFormData((prev) => ({ ...prev, experiences: updated }));
                            }}
                            className="w-full bg-[#141414] border border-neutral-800 rounded-xl px-3 py-2 text-sm text-white focus:border-[#F95721] outline-hidden"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-neutral-300 mb-1">Period</label>
                          <input
                            type="text"
                            value={exp.period}
                            onChange={(e) => {
                              const updated = [...formData.experiences];
                              updated[eIdx].period = e.target.value;
                              setFormData((prev) => ({ ...prev, experiences: updated }));
                            }}
                            className="w-full bg-[#141414] border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:border-[#F95721] outline-hidden"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-neutral-300 mb-1">Location</label>
                          <input
                            type="text"
                            value={exp.location}
                            onChange={(e) => {
                              const updated = [...formData.experiences];
                              updated[eIdx].location = e.target.value;
                              setFormData((prev) => ({ ...prev, experiences: updated }));
                            }}
                            className="w-full bg-[#141414] border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:border-[#F95721] outline-hidden"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-neutral-300 mb-1">Role Description</label>
                          <textarea
                            rows={2}
                            value={exp.description}
                            onChange={(e) => {
                              const updated = [...formData.experiences];
                              updated[eIdx].description = e.target.value;
                              setFormData((prev) => ({ ...prev, experiences: updated }));
                            }}
                            className="w-full bg-[#141414] border border-neutral-800 rounded-xl p-3 text-xs text-white focus:border-[#F95721] outline-hidden"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-neutral-300 mb-1">Key Deliverables (one per line)</label>
                          <textarea
                            rows={3}
                            value={exp.keyFeatures?.join('\n') || ''}
                            onChange={(e) => {
                              const updated = [...formData.experiences];
                              updated[eIdx].keyFeatures = e.target.value.split('\n').map((f) => f.trim()).filter(Boolean);
                              setFormData((prev) => ({ ...prev, experiences: updated }));
                            }}
                            className="w-full bg-[#141414] border border-neutral-800 rounded-xl p-3 text-xs text-white focus:border-[#F95721] outline-hidden"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-neutral-300 mb-1">Technologies Used (comma separated)</label>
                          <input
                            type="text"
                            value={exp.technologies?.join(', ') || ''}
                            onChange={(e) => {
                              const updated = [...formData.experiences];
                              updated[eIdx].technologies = e.target.value.split(',').map((t) => t.trim()).filter(Boolean);
                              setFormData((prev) => ({ ...prev, experiences: updated }));
                            }}
                            className="w-full bg-[#141414] border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:border-[#F95721] outline-hidden font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. PROJECTS TAB */}
            {activeTab === 'projects' && (
              <div className="space-y-6 max-w-4xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Mission-Critical Banking Projects</h4>
                    <p className="text-xs text-neutral-400">
                      Manage real-world banking applications, clients, high-availability metrics, and highlights.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const newProj = {
                        id: `proj-${Date.now()}`,
                        title: 'New Financial Platform Integration',
                        category: 'Core Banking & APIs',
                        client: 'Enterprise Banking Partner',
                        year: '2026',
                        metrics: '99.99% SLA Uptime',
                        description: 'Detailed architecture description of this deployment.',
                        highlights: ['Sub-second latency', 'High-concurrency clustering'],
                        technologies: ['Spring Boot', 'Kafka', 'PostgreSQL', 'Docker']
                      };
                      setFormData((prev) => ({
                        ...prev,
                        projects: [newProj, ...prev.projects]
                      }));
                      showToast('New project created!');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F95721] hover:bg-[#e44612] text-white rounded-xl text-xs font-bold transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Project</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.projects.map((proj, pIdx) => (
                    <div 
                      key={proj.id || pIdx}
                      className="p-4 sm:p-5 rounded-2xl bg-[#1b1b1b] border border-neutral-800 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#F95721] bg-[#F95721]/10 px-2.5 py-0.5 rounded-full border border-[#F95721]/20">
                          {proj.title} ({proj.year || '2025'})
                        </span>
                        <button
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              projects: prev.projects.filter((_, idx) => idx !== pIdx)
                            }));
                            showToast('Project removed.');
                          }}
                          className="p-1.5 text-neutral-500 hover:text-red-400 hover:bg-neutral-800 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-neutral-300 mb-1">Project Title</label>
                          <input
                            type="text"
                            value={proj.title}
                            onChange={(e) => {
                              const updated = [...formData.projects];
                              updated[pIdx].title = e.target.value;
                              setFormData((prev) => ({ ...prev, projects: updated }));
                            }}
                            className="w-full bg-[#141414] border border-neutral-800 rounded-xl px-3 py-2 text-sm text-white focus:border-[#F95721] outline-hidden"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-neutral-300 mb-1">Category</label>
                          <input
                            type="text"
                            value={proj.category}
                            onChange={(e) => {
                              const updated = [...formData.projects];
                              updated[pIdx].category = e.target.value;
                              setFormData((prev) => ({ ...prev, projects: updated }));
                            }}
                            className="w-full bg-[#141414] border border-neutral-800 rounded-xl px-3 py-2 text-sm text-white focus:border-[#F95721] outline-hidden"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-neutral-300 mb-1">Client / Bank</label>
                          <input
                            type="text"
                            value={proj.client}
                            onChange={(e) => {
                              const updated = [...formData.projects];
                              updated[pIdx].client = e.target.value;
                              setFormData((prev) => ({ ...prev, projects: updated }));
                            }}
                            className="w-full bg-[#141414] border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:border-[#F95721] outline-hidden"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-neutral-300 mb-1">Metrics / High SLA</label>
                          <input
                            type="text"
                            value={proj.metrics}
                            onChange={(e) => {
                              const updated = [...formData.projects];
                              updated[pIdx].metrics = e.target.value;
                              setFormData((prev) => ({ ...prev, projects: updated }));
                            }}
                            placeholder="e.g. 99.99% Uptime"
                            className="w-full bg-[#141414] border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:border-[#F95721] outline-hidden"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-neutral-300 mb-1">Overview Description</label>
                          <textarea
                            rows={2}
                            value={proj.description}
                            onChange={(e) => {
                              const updated = [...formData.projects];
                              updated[pIdx].description = e.target.value;
                              setFormData((prev) => ({ ...prev, projects: updated }));
                            }}
                            className="w-full bg-[#141414] border border-neutral-800 rounded-xl p-3 text-xs text-white focus:border-[#F95721] outline-hidden"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-neutral-300 mb-1">Key Architecture Highlights (one per line)</label>
                          <textarea
                            rows={3}
                            value={proj.highlights?.join('\n') || ''}
                            onChange={(e) => {
                              const updated = [...formData.projects];
                              updated[pIdx].highlights = e.target.value.split('\n').map((h) => h.trim()).filter(Boolean);
                              setFormData((prev) => ({ ...prev, projects: updated }));
                            }}
                            className="w-full bg-[#141414] border border-neutral-800 rounded-xl p-3 text-xs text-white focus:border-[#F95721] outline-hidden"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-neutral-300 mb-1">Technologies (comma separated)</label>
                          <input
                            type="text"
                            value={proj.technologies?.join(', ') || ''}
                            onChange={(e) => {
                              const updated = [...formData.projects];
                              updated[pIdx].technologies = e.target.value.split(',').map((t) => t.trim()).filter(Boolean);
                              setFormData((prev) => ({ ...prev, projects: updated }));
                            }}
                            className="w-full bg-[#141414] border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:border-[#F95721] outline-hidden font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. SKILLS TAB */}
            {activeTab === 'skills' && (
              <div className="space-y-6 max-w-4xl">
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Technical Skills & Categories</h4>
                  <p className="text-xs text-neutral-400">
                    Edit comma-separated technologies for Backend, Databases, Security, DevOps, and Frontend.
                  </p>
                </div>

                <div className="space-y-4">
                  {['backend', 'databases', 'security', 'devops', 'frontend'].map((category) => {
                    const skillsList = formData.technicalSkills?.[category] || [];
                    return (
                      <div key={category} className="p-4 rounded-2xl bg-[#1b1b1b] border border-neutral-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white uppercase tracking-wider">
                            {category} ({skillsList.length} skills)
                          </span>
                        </div>
                        <textarea
                          rows={2}
                          value={skillsList.join(', ')}
                          onChange={(e) => {
                            const newSkills = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                            setFormData((prev) => ({
                              ...prev,
                              technicalSkills: {
                                ...prev.technicalSkills,
                                [category]: newSkills
                              }
                            }));
                          }}
                          className="w-full bg-[#141414] border border-neutral-800 rounded-xl p-3 text-xs text-white focus:border-[#F95721] outline-hidden font-mono"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 6. EDUCATION & CERTS TAB */}
            {activeTab === 'education' && (
              <div className="space-y-8 max-w-4xl">
                {/* Degrees */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-bold text-white">Degrees & Formal Education</h4>
                      <p className="text-xs text-neutral-400">Universities and diplomas awarded.</p>
                    </div>
                    <button
                      onClick={() => {
                        const newEdu = {
                          institution: 'New University',
                          degree: 'Degree Program',
                          period: '2018–2022',
                          location: 'Phnom Penh, Cambodia'
                        };
                        setFormData((prev) => ({
                          ...prev,
                          education: [newEdu, ...prev.education]
                        }));
                        showToast('New degree added!');
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F95721] hover:bg-[#e44612] text-white rounded-xl text-xs font-bold"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Degree</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {formData.education.map((edu, eduIdx) => (
                      <div key={eduIdx} className="p-3.5 rounded-2xl bg-[#1b1b1b] border border-neutral-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 flex-1">
                          <input
                            type="text"
                            placeholder="Institution"
                            value={edu.institution}
                            onChange={(e) => {
                              const updated = [...formData.education];
                              updated[eduIdx].institution = e.target.value;
                              setFormData((prev) => ({ ...prev, education: updated }));
                            }}
                            className="bg-[#141414] border border-neutral-800 rounded-xl px-2.5 py-1.5 text-xs text-white focus:border-[#F95721] outline-hidden"
                          />
                          <input
                            type="text"
                            placeholder="Degree"
                            value={edu.degree}
                            onChange={(e) => {
                              const updated = [...formData.education];
                              updated[eduIdx].degree = e.target.value;
                              setFormData((prev) => ({ ...prev, education: updated }));
                            }}
                            className="bg-[#141414] border border-neutral-800 rounded-xl px-2.5 py-1.5 text-xs text-white focus:border-[#F95721] outline-hidden"
                          />
                          <input
                            type="text"
                            placeholder="Period"
                            value={edu.period}
                            onChange={(e) => {
                              const updated = [...formData.education];
                              updated[eduIdx].period = e.target.value;
                              setFormData((prev) => ({ ...prev, education: updated }));
                            }}
                            className="bg-[#141414] border border-neutral-800 rounded-xl px-2.5 py-1.5 text-xs text-white focus:border-[#F95721] outline-hidden"
                          />
                          <input
                            type="text"
                            placeholder="Location"
                            value={edu.location}
                            onChange={(e) => {
                              const updated = [...formData.education];
                              updated[eduIdx].location = e.target.value;
                              setFormData((prev) => ({ ...prev, education: updated }));
                            }}
                            className="bg-[#141414] border border-neutral-800 rounded-xl px-2.5 py-1.5 text-xs text-white focus:border-[#F95721] outline-hidden"
                          />
                        </div>
                        <div className="flex justify-end sm:justify-center shrink-0">
                          <button
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                education: prev.education.filter((_, idx) => idx !== eduIdx)
                              }));
                              showToast('Degree removed.');
                            }}
                            className="p-1.5 text-neutral-500 hover:text-red-400 hover:bg-neutral-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                            title="Delete degree"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="sm:hidden text-xs text-red-400">Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div className="space-y-4 pt-4 border-t border-neutral-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-bold text-white">Professional Certifications</h4>
                      <p className="text-xs text-neutral-400">Verified credentials and issuer institutions.</p>
                    </div>
                    <button
                      onClick={() => {
                        const newCert = {
                          institution: 'AWS / Cloud / Security',
                          name: 'Certificate Name',
                          date: '2026'
                        };
                        setFormData((prev) => ({
                          ...prev,
                          certifications: [newCert, ...prev.certifications]
                        }));
                        showToast('New certification added!');
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F95721] hover:bg-[#e44612] text-white rounded-xl text-xs font-bold"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Cert</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {formData.certifications.map((cert, cIdx) => (
                      <div key={cIdx} className="p-3.5 rounded-2xl bg-[#1b1b1b] border border-neutral-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1">
                          <input
                            type="text"
                            placeholder="Issuing Organization"
                            value={cert.institution}
                            onChange={(e) => {
                              const updated = [...formData.certifications];
                              updated[cIdx].institution = e.target.value;
                              setFormData((prev) => ({ ...prev, certifications: updated }));
                            }}
                            className="bg-[#141414] border border-neutral-800 rounded-xl px-2.5 py-1.5 text-xs text-white focus:border-[#F95721] outline-hidden"
                          />
                          <input
                            type="text"
                            placeholder="Certification Title"
                            value={cert.name}
                            onChange={(e) => {
                              const updated = [...formData.certifications];
                              updated[cIdx].name = e.target.value;
                              setFormData((prev) => ({ ...prev, certifications: updated }));
                            }}
                            className="bg-[#141414] border border-neutral-800 rounded-xl px-2.5 py-1.5 text-xs text-white focus:border-[#F95721] outline-hidden"
                          />
                          <input
                            type="text"
                            placeholder="Date"
                            value={cert.date}
                            onChange={(e) => {
                              const updated = [...formData.certifications];
                              updated[cIdx].date = e.target.value;
                              setFormData((prev) => ({ ...prev, certifications: updated }));
                            }}
                            className="bg-[#141414] border border-neutral-800 rounded-xl px-2.5 py-1.5 text-xs text-white focus:border-[#F95721] outline-hidden"
                          />
                        </div>
                        <div className="flex justify-end sm:justify-center shrink-0">
                          <button
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                certifications: prev.certifications.filter((_, idx) => idx !== cIdx)
                              }));
                              showToast('Certification removed.');
                            }}
                            className="p-1.5 text-neutral-500 hover:text-red-400 hover:bg-neutral-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                            title="Delete certification"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="sm:hidden text-xs text-red-400">Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 7. LANGUAGES TAB */}
            {activeTab === 'languages' && (
              <div className="space-y-6 max-w-4xl">
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Languages & Fluency Levels</h4>
                  <p className="text-xs text-neutral-400">
                    Configure spoken and professional languages, CEFR rankings, and proficiency levels.
                  </p>
                </div>

                <div className="space-y-4">
                  {formData.technicalSkills?.languages?.map((lang, lIdx) => (
                    <div key={lIdx} className="p-4 rounded-2xl bg-[#1b1b1b] border border-neutral-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#F95721] uppercase tracking-wider bg-[#F95721]/10 px-2.5 py-0.5 rounded-full border border-[#F95721]/20">
                          {lang.name}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-neutral-300 mb-1">Language Name</label>
                          <input
                            type="text"
                            value={lang.name}
                            onChange={(e) => {
                              const updated = [...formData.technicalSkills.languages];
                              updated[lIdx].name = e.target.value;
                              setFormData((prev) => ({
                                ...prev,
                                technicalSkills: { ...prev.technicalSkills, languages: updated }
                              }));
                            }}
                            className="w-full bg-[#141414] border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:border-[#F95721] outline-hidden"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-neutral-300 mb-1">Proficiency Level Description</label>
                          <input
                            type="text"
                            value={lang.level}
                            onChange={(e) => {
                              const updated = [...formData.technicalSkills.languages];
                              updated[lIdx].level = e.target.value;
                              setFormData((prev) => ({
                                ...prev,
                                technicalSkills: { ...prev.technicalSkills, languages: updated }
                              }));
                            }}
                            className="w-full bg-[#141414] border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:border-[#F95721] outline-hidden"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 8. TESTIMONIALS TAB */}
            {activeTab === 'testimonials' && (
              <div className="space-y-6 max-w-4xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Client Recommendations & Quotes</h4>
                    <p className="text-xs text-neutral-400">
                      Manage VP, Lead Architect, and Product Director peer reviews.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const newTestimonial = {
                        id: Date.now(),
                        quote: 'Rotha delivers exceptional software architecture with zero production downtime.',
                        author: 'Engineering Director',
                        role: 'FinTech Banking Partner',
                        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
                        rating: 5
                      };
                      setFormData((prev) => ({
                        ...prev,
                        testimonials: [...prev.testimonials, newTestimonial]
                      }));
                      showToast('New testimonial created!');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F95721] hover:bg-[#e44612] text-white rounded-xl text-xs font-bold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Review</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.testimonials.map((testi, tIdx) => (
                    <div key={testi.id || tIdx} className="p-4 sm:p-5 rounded-2xl bg-[#1b1b1b] border border-neutral-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#F95721] bg-[#F95721]/10 px-2.5 py-0.5 rounded-full border border-[#F95721]/20">
                          {testi.author} ({testi.role})
                        </span>
                        <button
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              testimonials: prev.testimonials.filter((_, idx) => idx !== tIdx)
                            }));
                            showToast('Testimonial removed.');
                          }}
                          className="p-1.5 text-neutral-500 hover:text-red-400 hover:bg-neutral-800 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-neutral-300 mb-1">Author Name / Title</label>
                          <input
                            type="text"
                            value={testi.author}
                            onChange={(e) => {
                              const updated = [...formData.testimonials];
                              updated[tIdx].author = e.target.value;
                              setFormData((prev) => ({ ...prev, testimonials: updated }));
                            }}
                            className="w-full bg-[#141414] border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:border-[#F95721] outline-hidden"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-neutral-300 mb-1">Organization / Department</label>
                          <input
                            type="text"
                            value={testi.role}
                            onChange={(e) => {
                              const updated = [...formData.testimonials];
                              updated[tIdx].role = e.target.value;
                              setFormData((prev) => ({ ...prev, testimonials: updated }));
                            }}
                            className="w-full bg-[#141414] border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:border-[#F95721] outline-hidden"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-neutral-300 mb-1">Review Quote</label>
                          <textarea
                            rows={2}
                            value={testi.quote}
                            onChange={(e) => {
                              const updated = [...formData.testimonials];
                              updated[tIdx].quote = e.target.value;
                              setFormData((prev) => ({ ...prev, testimonials: updated }));
                            }}
                            className="w-full bg-[#141414] border border-neutral-800 rounded-xl p-3 text-xs text-white focus:border-[#F95721] outline-hidden"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 9. CONTACT TAB */}
            {activeTab === 'contact' && (
              <div className="space-y-6 max-w-4xl">
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Contact Channels & Professional Links</h4>
                  <p className="text-xs text-neutral-400">
                    Update phone, email, Telegram, LinkedIn, and office location displayed in footer and modals.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={currentProfile.email || ''}
                      onChange={(e) => updateProfileField('email', e.target.value)}
                      className="w-full bg-[#1b1b1b] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-[#F95721] outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1.5">Phone Number (Display)</label>
                    <input
                      type="text"
                      value={currentProfile.phone || ''}
                      onChange={(e) => updateProfileField('phone', e.target.value)}
                      className="w-full bg-[#1b1b1b] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-[#F95721] outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1.5">Telegram Handle</label>
                    <input
                      type="text"
                      value={currentProfile.telegram || ''}
                      onChange={(e) => updateProfileField('telegram', e.target.value)}
                      className="w-full bg-[#1b1b1b] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-[#F95721] outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1.5">Telegram URL</label>
                    <input
                      type="text"
                      value={currentProfile.telegramUrl || ''}
                      onChange={(e) => updateProfileField('telegramUrl', e.target.value)}
                      className="w-full bg-[#1b1b1b] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-[#F95721] outline-hidden"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-neutral-300 mb-1.5">LinkedIn Profile URL</label>
                    <input
                      type="text"
                      value={currentProfile.linkedin || ''}
                      onChange={(e) => updateProfileField('linkedin', e.target.value)}
                      className="w-full bg-[#1b1b1b] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-[#F95721] outline-hidden"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-neutral-300 mb-1.5">Location</label>
                    <input
                      type="text"
                      value={currentProfile.location || ''}
                      onChange={(e) => updateProfileField('location', e.target.value)}
                      className="w-full bg-[#1b1b1b] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-[#F95721] outline-hidden"
                    />
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>

        {/* Bottom Save Bar */}
        <div className="px-3.5 sm:px-5 py-2.5 sm:py-3.5 border-t border-neutral-800 bg-[#181818] flex items-center justify-between shrink-0 gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Edits will immediately update the live homepage & persist across reloads.</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-center transition-colors cursor-pointer"
            >
              <Eye className="w-4 h-4 text-[#F95721]" />
              <span>Hide / View Homepage</span>
            </button>
            <button
              onClick={handleSave}
              className="flex-2 sm:flex-initial inline-flex items-center justify-center gap-2 bg-[#F95721] hover:bg-[#e44612] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-[#F95721]/25 hover:shadow-xl transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save & Apply</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
