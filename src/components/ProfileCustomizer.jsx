import React, { useState } from 'react';
import { Sliders, Sparkles, User, RefreshCw, X, Check } from 'lucide-react';

export default function ProfileCustomizer({
  currentProfile,
  onSwitchProfile,
  onUpdateProfile,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ ...currentProfile });

  const handleProfileSwitch = (key) => {
    onSwitchProfile(key);
  };

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
        <button
          onClick={() => {
            setFormData({ ...currentProfile });
            setIsOpen(!isOpen);
          }}
          className="group flex items-center gap-2 bg-[#191919] hover:bg-black text-white p-2.5 sm:px-4 sm:py-2.5 rounded-full shadow-2xl border border-neutral-700 hover:border-[#F95721] transition-all duration-300 text-xs font-semibold cursor-pointer"
          title="Switch / Edit Profile"
          aria-label="Switch / Edit Profile"
        >
          <Sliders className="w-4 h-4 text-[#F95721] shrink-0" />
          <span className="hidden sm:inline">Switch / Edit Profile</span>
          <span className="w-2 h-2 rounded-full bg-[#F95721] hidden sm:inline-block"></span>
        </button>
      </div>

      {/* Customizer Drawer / Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="w-full sm:max-w-md bg-[#191919] text-white rounded-3xl border border-neutral-800 shadow-2xl p-6 relative max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#F95721]" />
                <h3 className="font-bold text-base">Profile Customizer</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Switch Preset Buttons */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                Quick Presets:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    handleProfileSwitch('talmeez');
                    setIsOpen(false);
                  }}
                  className={`p-3 rounded-2xl border text-left text-xs font-bold transition-all cursor-pointer ${
                    currentProfile.id === 'talmeez'
                      ? 'border-[#F95721] bg-[#F95721]/15 text-white'
                      : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
                  }`}
                >
                  <span className="block text-sm font-extrabold text-white">talmeez.</span>
                  <span className="text-[11px] font-normal text-neutral-400">UI Image Reference</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    handleProfileSwitch('wife');
                    setIsOpen(false);
                  }}
                  className={`p-3 rounded-2xl border text-left text-xs font-bold transition-all cursor-pointer ${
                    currentProfile.id === 'wife'
                      ? 'border-[#F95721] bg-[#F95721]/15 text-white'
                      : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
                  }`}
                >
                  <span className="block text-sm font-extrabold text-white">Wife's Portfolio</span>
                  <span className="text-[11px] font-normal text-neutral-400">Custom Female Profile</span>
                </button>
              </div>
            </div>

            {/* Custom Input Form */}
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Brand / Logo Name
                </label>
                <input
                  type="text"
                  value={formData.brandName}
                  onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#F95721]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Designer Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#F95721]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">
                    Years Exp.
                  </label>
                  <input
                    type="text"
                    value={formData.experienceYears}
                    onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#F95721]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">
                    Availability Tag
                  </label>
                  <input
                    type="text"
                    value={formData.heroTag}
                    onChange={(e) => setFormData({ ...formData, heroTag: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#F95721]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Hero Subtitle
                </label>
                <textarea
                  rows="2"
                  value={formData.heroSubtitle}
                  onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#F95721]"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Avatar / Photo URL
                </label>
                <input
                  type="url"
                  value={formData.avatarUrl}
                  onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#F95721]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[#F95721] hover:bg-[#e44612] text-white py-2.5 rounded-xl font-bold text-sm shadow-md transition-colors cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Apply Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
