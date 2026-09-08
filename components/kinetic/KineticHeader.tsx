'use client';

import React, { useState } from 'react';
import { SiteSettingsData } from '@/lib/types';

interface KineticHeaderProps {
  currentView: string;
  onSelectView: (view: string) => void;
  settings?: SiteSettingsData | null;
}

export default function KineticHeader({ currentView, onSelectView, settings }: KineticHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const name = settings?.companyName || 'Kevin Assamoi';
  const firstLetter = name.charAt(0) || 'K';
  const subtitle = settings?.companySubtitle || 'Studio • Product';

  const navItems = [
    { id: 'hero', label: 'Accueil' },
    { id: 'about', label: 'À propos' },
    { id: 'projects', label: 'Projets' },
    { id: 'skills', label: 'Compétences' },
    { id: 'testimonials', label: 'Témoignages' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <header className="backdrop-blur-md bg-black/50 border-b border-white/5 px-4 sm:px-8 py-3.5 flex items-center justify-between z-50 shrink-0 select-none">
        {/* Brand Profile Monogram */}
        <button 
          onClick={() => onSelectView('hero')}
          className="flex items-center gap-3 group transition-transform hover:scale-[1.02] cursor-pointer text-left focus:outline-none"
        >
          <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-[#FF7A00] to-[#FF9E40] text-black font-extrabold flex items-center justify-center text-sm sm:text-base shadow-[0_0_18px_rgba(255,122,0,0.45)]">
            {firstLetter}
          </span>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-bold tracking-tight text-white group-hover:text-primary transition-colors">
                {name}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            </div>
            <span className="text-[10px] font-mono tracking-widest text-[#FF7A00] uppercase font-semibold">
              {subtitle}
            </span>
          </div>
        </button>

        {/* Center Floating Pill Navigation */}
        <nav className="hidden md:flex items-center bg-[#151515]/90 border border-white/10 p-1 rounded-full shadow-inner text-xs font-medium">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectView(item.id)}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  isActive
                    ? 'text-black bg-[#FF7A00] font-semibold shadow-[0_0_20px_rgba(255,122,0,0.45)]'
                    : 'text-[#A0A0A0] hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectView('contact')}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF7A00] to-[#FF9326] hover:brightness-110 text-black font-semibold text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-full shadow-[0_0_24px_rgba(255,122,0,0.35)] transition-all hover:scale-105 cursor-pointer"
          >
            <span>Discutons</span>
            <span className="material-symbols-outlined text-sm sm:text-base font-bold">arrow_forward</span>
          </button>

          {/* Mobile Dropdown Selector Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-lg">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-[68px] inset-x-2 z-40 bg-[#121212]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-3 shadow-2xl flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSelectView(item.id);
                setMobileMenuOpen(false);
              }}
              className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                currentView === item.id
                  ? 'bg-[#FF7A00] text-black font-bold'
                  : 'text-zinc-300 hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
