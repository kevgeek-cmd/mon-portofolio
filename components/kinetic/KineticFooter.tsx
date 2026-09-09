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
  const showStatus = settings?.footerShowStatus !== false;
  const statusText = settings?.footerStatusText || 'Available worldwide';
  const showSocials = settings?.footerShowSocials !== false;
  const showMentions = settings?.footerShowMentions !== false;

  const activeSocials = (socials || []).filter(s => s.isActive);

  return (
    <footer className="backdrop-blur-md bg-black/40 border-t border-white/5 px-4 sm:px-8 py-2.5 sm:py-3 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 shrink-0 z-40 text-[11px] font-mono select-none">
      <div className="flex items-center flex-wrap gap-2.5 text-zinc-400">
        {showStatus && (
          <>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span className="text-zinc-300 font-medium">{statusText}</span>
            </span>
            <span className="text-white/20">•</span>
          </>
        )}
        <span>© {year} {name} — {settings?.footerTagline || 'Product Builder & AI Designer'}</span>
      </div>

      {(showSocials || showMentions) && (
        <div className="flex items-center flex-wrap gap-4 sm:gap-5 text-zinc-400">
          {showSocials && (
            <>
              {activeSocials.map((social) => (
                <a
                  key={social.id || social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#FF7A00] transition-colors"
                >
                  {social.platform}
                </a>
              ))}
              {settings?.companyEmail && (
                <a
                  href={`mailto:${settings.companyEmail}`}
                  className="hover:text-[#FF7A00] transition-colors"
                >
                  Email
                </a>
              )}
            </>
          )}

          {showSocials && showMentions && (
            <span className="text-white/20">•</span>
          )}

          {showMentions && (
            <button
              onClick={() => onSelectView('contact')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Mentions
            </button>
          )}
        </div>
      )}
    </footer>
  );
}
