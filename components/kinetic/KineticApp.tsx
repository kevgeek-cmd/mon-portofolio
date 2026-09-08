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

export default function KineticApp({
  settings,
  projects = [],
  services = [],
  tools = [],
  socialLinks = [],
  testimonials = [],
}: KineticAppProps) {
  const [currentView, setCurrentView] = useState('hero');

  // Handle URL hash routing
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (['hero', 'about', 'projects', 'skills', 'testimonials', 'contact'].includes(hash)) {
        setCurrentView(hash);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const switchView = (view: string) => {
    setCurrentView(view);
    window.location.hash = view;
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-[#090909] text-[#F5F5F5] font-sans relative select-none antialiased">
      
      {/* Subtle Ambient Glowing Backlights */}
      <div className="absolute -top-32 -left-20 w-[600px] h-[600px] bg-[#FF7A00]/12 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-[#FF7A00]/8 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-10 w-[550px] h-[550px] bg-[#FF7A00]/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Framed App Viewport Container (100vh full frame) */}
      <div className="border border-white/10 rounded-2xl md:rounded-3xl m-2 sm:m-4 flex-1 flex flex-col overflow-hidden relative backdrop-blur-3xl bg-[#0D0D0D]/90 shadow-2xl">
        
        {/* PERSISTENT TOP HEADER */}
        <KineticHeader 
          currentView={currentView} 
          onSelectView={switchView} 
          settings={settings} 
        />

        {/* MAIN MULTI-VIEW HOST CONTAINER */}
        <main className="flex-1 relative overflow-hidden w-full h-full">
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
