'use client';

import React, { useState, useEffect } from 'react';
import KineticHeader from './KineticHeader';
import KineticHero from './KineticHero';
import KineticAbout from './KineticAbout';
import KineticProjects from './KineticProjects';
import KineticSkills from './KineticSkills';
import KineticTestimonials from './KineticTestimonials';
import KineticContact from './KineticContact';
import KineticFooter from './KineticFooter';
import { SiteSettingsData, SocialLinkItem } from '@/lib/types';

interface KineticAppProps {
  settings?: SiteSettingsData | null;
  projects?: any[];
  services?: any[];
  tools?: any[];
  socialLinks?: SocialLinkItem[];
  testimonials?: any[];
}

export function normalizeViewId(view: string): string {
  const clean = (view || '').toLowerCase().replace(/^#/, '').trim();
  if (['hero', 'accueil', 'home', ''].includes(clean)) return 'hero';
  if (['about', 'a-propos', 'apropos', 'histoire'].includes(clean)) return 'about';
  if (['projects', 'projets', 'nos-projets', 'portfolio', 'travaux'].includes(clean)) return 'projects';
  if (['skills', 'competences', 'services', 'expertise'].includes(clean)) return 'skills';
  if (['testimonials', 'temoignages', 'avis', 'clients'].includes(clean)) return 'testimonials';
  if (['contact', 'me-contacter', 'messages'].includes(clean)) return 'contact';
  return 'hero';
}

export default function KineticApp({
  settings,
  projects = [],
  services = [],
  tools = [],
  socialLinks = [],
  testimonials = [],
}: KineticAppProps) {
  const [currentView, setCurrentView] = useState('hero');

  // Handle URL hash routing with automatic alias normalization
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      const normalized = normalizeViewId(hash);
      setCurrentView(normalized);
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const switchView = (view: string) => {
    const normalized = normalizeViewId(view);
    setCurrentView(normalized);
    window.location.hash = normalized;
  };

  return (
    <div className="min-h-[100dvh] h-[100dvh] w-full overflow-hidden flex flex-col bg-[#090909] text-[#F5F5F5] font-sans relative select-none antialiased">
      
      {/* Subtle Ambient Glowing Backlights */}
      <div className="absolute -top-32 -left-20 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-[#FF7A00]/12 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] bg-[#FF7A00]/8 rounded-full blur-[90px] sm:blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-10 w-[300px] sm:w-[550px] h-[300px] sm:h-[550px] bg-[#FF7A00]/10 rounded-full blur-[110px] sm:blur-[160px] pointer-events-none -z-10" />

      {/* Framed App Viewport Container (Adaptive on mobile) */}
      <div className="border-0 sm:border border-white/10 rounded-none sm:rounded-2xl md:rounded-3xl m-0 sm:m-3 md:m-4 flex-1 flex flex-col min-h-0 overflow-hidden relative backdrop-blur-3xl bg-[#0D0D0D]/95 sm:bg-[#0D0D0D]/90 shadow-2xl">
        
        {/* PERSISTENT TOP HEADER */}
        <KineticHeader 
          currentView={currentView} 
          onSelectView={switchView} 
          settings={settings} 
        />

        {/* MAIN MULTI-VIEW HOST CONTAINER */}
        <main className="flex-1 relative overflow-y-auto overflow-x-hidden w-full h-full min-h-0 custom-scroll">
          {currentView === 'hero' && (
            <div className="w-full h-full animate-fadeIn flex flex-col">
              <KineticHero 
                onSelectView={switchView} 
                settings={settings} 
                socialLinks={socialLinks} 
              />
            </div>
          )}

          {currentView === 'about' && (
            <div className="w-full h-full animate-fadeIn flex flex-col">
              <KineticAbout 
                onSelectView={switchView} 
                settings={settings} 
              />
            </div>
          )}

          {currentView === 'projects' && (
            <div className="w-full h-full animate-fadeIn flex flex-col">
              <KineticProjects 
                onSelectView={switchView} 
                projects={projects} 
              />
            </div>
          )}

          {currentView === 'skills' && (
            <div className="w-full h-full animate-fadeIn flex flex-col">
              <KineticSkills 
                onSelectView={switchView} 
                services={services} 
              />
            </div>
          )}

          {currentView === 'testimonials' && (
            <div className="w-full h-full animate-fadeIn flex flex-col">
              <KineticTestimonials 
                onSelectView={switchView} 
                testimonials={testimonials}
              />
            </div>
          )}

          {currentView === 'contact' && (
            <div className="w-full h-full animate-fadeIn flex flex-col">
              <KineticContact 
                settings={settings} 
              />
            </div>
          )}
        </main>

        {/* PERSISTENT BOTTOM FOOTER STATUS BAR */}
        <KineticFooter 
          onSelectView={switchView} 
          settings={settings} 
          socials={socialLinks} 
        />
      </div>

    </div>
  );
}
