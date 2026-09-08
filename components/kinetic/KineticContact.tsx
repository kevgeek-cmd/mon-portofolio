'use client';

import React, { useState } from 'react';
import { SiteSettingsData } from '@/lib/types';

interface KineticContactProps {
  settings?: SiteSettingsData | null;
}

export default function KineticContact({ settings }: KineticContactProps) {
  const [copied, setCopied] = useState(false);

  const email = settings?.companyEmail || 'contact@kevinassamoi.com';
  const contactTitle = settings?.contactTitle || "Un projet en tête ?\nConstruisons-le ensemble.";
  const contactSubtitle = settings?.contactSubtitle || "Construisons quelque chose qui mérite d’exister. Parlons de votre roadmap produit ou de votre prochaine refonte d'expérience digitale.";
  const copyright = settings?.copyrightText || `© ${new Date().getFullYear()} Kevin Assamoi. Tous droits réservés.`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section className="w-full h-full flex flex-col px-6 sm:px-12 lg:px-16 py-8 overflow-y-auto custom-scroll justify-between">
      
      {/* Central Card Container */}
      <div className="max-w-3xl w-full mx-auto my-auto flex flex-col items-center text-center">
        
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1 rounded-full mb-4 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#FF7A00] animate-pulse" />
          <span className="font-mono text-[10px] text-[#FF7A00] uppercase tracking-widest font-semibold">
            Ouvert aux projets sélectifs
          </span>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight whitespace-pre-line">
          {contactTitle.includes('ensemble') ? (
            <>
              {contactTitle.split('ensemble')[0]}
              <span className="text-[#FF7A00] drop-shadow-[0_0_35px_rgba(255,122,0,0.4)]">
                ensemble.
              </span>
            </>
          ) : (
            contactTitle
          )}
        </h2>

        {/* Subtitle */}
        <p className="text-zinc-400 text-sm sm:text-base max-w-lg mt-4 leading-relaxed whitespace-pre-line">
          {contactSubtitle}
        </p>

        {/* Interactive Action Center */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 mt-8 w-full justify-center">
          <a 
            href={`mailto:${email}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF7A00] to-[#FF9326] text-black font-bold text-xs sm:text-sm px-7 py-3 rounded-full shadow-[0_8px_30px_rgba(255,122,0,0.4)] hover:scale-105 transition-all cursor-pointer"
          >
            <span>Discutons de votre projet</span>
            <span className="material-symbols-outlined text-base font-bold">arrow_forward</span>
          </a>

          {/* Copy button with live feedback */}
          <button 
            onClick={handleCopyEmail}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-xs sm:text-sm px-6 py-3 rounded-full transition-all relative cursor-pointer"
          >
            <span className="material-symbols-outlined text-base text-[#FF7A00]">content_copy</span>
            <span>{email}</span>
            {copied && (
              <span className="absolute -top-8 px-2.5 py-0.5 rounded bg-[#FF7A00] text-black text-[11px] font-mono font-bold shadow-lg transition-opacity animate-fadeIn">
                Copié !
              </span>
            )}
          </button>
        </div>

        {/* Timezones & Locations */}
        <div className="flex flex-wrap items-center justify-center gap-5 text-zinc-400 font-mono text-[11px] pt-8 mt-6 border-t border-white/5 w-full">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-[#FF7A00]">location_on</span>
            <span>{settings?.contactLocation1 || "Abidjan, CI (GMT)"}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-[#FF7A00]">location_on</span>
            <span>{settings?.contactLocation2 || "Paris, France (CET)"}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-[#FF7A00]">public</span>
            <span>{settings?.contactLocation3 || "Remote Worldwide"}</span>
          </span>
        </div>
      </div>

      {/* Footer Credits */}
      <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-white/5 text-[11px] text-zinc-500 font-mono shrink-0">
        <span>{copyright}</span>
        <span className="text-zinc-400 mt-1 sm:mt-0">Single-Screen Web App • Performance 100%</span>
      </div>

    </section>
  );
}
