'use client';

import React from 'react';
import { SiteSettingsData, SocialLinkItem } from '@/lib/types';

interface KineticFooterProps {
  onSelectView: (view: string) => void;
  settings?: SiteSettingsData | null;
  socials?: SocialLinkItem[];
}

export default function KineticFooter({ onSelectView, settings }: KineticFooterProps) {
  const name = settings?.companyName || 'Kevin Stéphane Assamoi';
  const year = new Date().getFullYear();
  const showStatus = settings?.footerShowStatus !== false;
  const statusText = settings?.footerStatusText || 'Available worldwide';

  return (
    <footer className="backdrop-blur-md bg-black/40 border-t border-white/5 px-3 sm:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-2 shrink-0 z-40 text-[10px] sm:text-[11px] font-mono select-none">
      <div className="flex items-center flex-wrap gap-2 text-zinc-400">
        {showStatus && (
          <>
            <span className="flex items-center gap-1.5 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span className="text-zinc-300 font-medium">{statusText}</span>
            </span>
            <span className="text-white/20 hidden xs:inline">•</span>
          </>
        )}
        <span className="truncate">© {year} {name} — {settings?.footerTagline || 'Product Builder & AI Designer'}</span>
      </div>
    </footer>
  );
}
