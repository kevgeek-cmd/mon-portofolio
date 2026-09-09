'use client';

import React, { useState } from 'react';
import { SiteSettingsData } from '@/lib/types';
import { normalizeViewId } from './KineticApp';

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

  const ctaText = settings?.headerCtaText || 'Discutons';
  const ctaLink = settings?.headerCtaLink || 'contact';

  const defaultNavItems = [
    { id: 'hero', label: 'Accueil' },
    { id: 'about', label: 'À propos' },
    { id: 'projects', label: 'Projets' },
    { id: 'skills', label: 'Compétences' },
    { id: 'testimonials', label: 'Témoignages' },
    { id: 'contact', label: 'Contact' },
  ];

  const navItems = Array.isArray(settings?.menuItems) && (settings.menuItems as any[]).length > 0
    ? (settings.menuItems as any[]).map((item) => ({
        id: normalizeViewId(item.href || item.name || 'hero'),
        label: item.name || item.label || 'Lien',
      }))
    : defaultNavItems;

  return (
    <>
      <header className="backdrop-blur-md bg-black/60 border-b border-white/5 px-3 sm:px-8 py-3 flex items-center justify-between z-50 shrink-0 select-none">
        {/* Brand Profile Monogram */}
        <button 
          onClick={() => {
            onSelectView('hero');
            setMobileMenuOpen(false);
          }}
          className="flex items-center gap-2.5 sm:gap-3 group transition-transform hover:scale-[1.02] cursor-pointer text-left focus:outline-none min-w-0"
        >
          <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-[#FF7A00] to-[#FF9E40] text-black font-extrabold flex items-center justify-center text-xs sm:text-base shrink-0 shadow-[0_0_18px_rgba(255,122,0,0.45)]">
            {firstLetter}
          </span>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-base font-bold tracking-tight text-white group-hover:text-primary transition-colors truncate">
                {name}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] shrink-0" />
            </div>
            <span className="text-[9px] sm:text-[10px] font-mono tracking-wider sm:tracking-widest text-[#FF7A00] uppercase font-semibold truncate">
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
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => onSelectView(ctaLink.replace(/^#/, ''))}
            className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-[#FF7A00] to-[#FF9326] hover:brightness-110 text-black font-semibold text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-full shadow-[0_0_24px_rgba(255,122,0,0.35)] transition-all hover:scale-105 cursor-pointer"
          >
            <span>{ctaText}</span>
            <span className="material-symbols-outlined text-sm sm:text-base font-bold">arrow_forward</span>
          </button>

          {/* Mobile Dropdown Selector Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white focus:outline-none cursor-pointer transition-colors"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-base">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md md:hidden flex flex-col justify-start p-4 pt-16 animate-fadeIn"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="bg-[#121214] border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col gap-1.5 w-full max-w-sm mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-1">
              <span className="text-xs font-mono uppercase tracking-widest text-[#FF7A00] font-semibold">
                Menu de Navigation
              </span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectView(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                  currentView === item.id
                    ? 'bg-[#FF7A00] text-black font-bold shadow-[0_0_20px_rgba(255,122,0,0.35)]'
                    : 'text-zinc-200 hover:bg-white/5'
                }`}
              >
                <span>{item.label}</span>
                {currentView === item.id && (
                  <span className="material-symbols-outlined text-sm">check</span>
                )}
              </button>
            ))}

            <div className="pt-3 border-t border-white/5 mt-2">
              <button
                onClick={() => {
                  onSelectView(ctaLink.replace(/^#/, ''));
                  setMobileMenuOpen(false);
                }}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF7A00] to-[#FF9326] text-black font-bold text-sm py-3 rounded-xl shadow-lg transition-all"
              >
                <span>{ctaText}</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
