'use client';

import React from 'react';
import { SiteSettingsData, SocialLinkItem } from '@/lib/types';

interface KineticFooterProps {
  onSelectView: (view: string) => void;
  settings?: SiteSettingsData | null;
  socials?: SocialLinkItem[];
}

export default function KineticFooter({ onSelectView, settings, socials }: KineticFooterProps) {
  const name = settings?.companyName || 'Kevin Assamoi';
  const year = new Date().getFullYear();

  return (
    <footer className="backdrop-blur-md bg-black/40 border-t border-white/5 px-4 sm:px-8 py-2.5 sm:py-3 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 shrink-0 z-40 text-[11px] font-mono select-none">
      <div className="flex items-center gap-2.5 text-zinc-400">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <span className="text-zinc-300 font-medium">Available worldwide</span>
        </span>
        <span className="text-white/20">•</span>
        <span>© {year} {name} — Product Builder &amp; AI Designer</span>
      </div>

      <div className="flex items-center gap-4 sm:gap-5 text-zinc-400">
        <a 
          href={socials?.find(s => s.platform.toLowerCase().includes('twitter') || s.platform.toLowerCase().includes('x'))?.url || "https://twitter.com"} 
          target="_blank" 
          rel="noreferrer" 
          className="hover:text-[#FF7A00] transition-colors"
        >
          Twitter / X
        </a>
        <a 
          href={socials?.find(s => s.platform.toLowerCase().includes('linkedin'))?.url || "https://linkedin.com"} 
          target="_blank" 
          rel="noreferrer" 
          className="hover:text-[#FF7A00] transition-colors"
        >
          LinkedIn
        </a>
        <a 
          href={socials?.find(s => s.platform.toLowerCase().includes('github'))?.url || "https://github.com"} 
          target="_blank" 
          rel="noreferrer" 
          className="hover:text-[#FF7A00] transition-colors"
        >
          GitHub
        </a>
        <a 
          href={`mailto:${settings?.companyEmail || 'contact@kevinassamoi.com'}`} 
          className="hover:text-[#FF7A00] transition-colors"
        >
          Email
        </a>
        <span className="text-white/20">•</span>
        <button 
          onClick={() => onSelectView('contact')} 
          className="hover:text-white transition-colors cursor-pointer"
        >
          Mentions
        </button>
      </div>
    </footer>
  );
}
