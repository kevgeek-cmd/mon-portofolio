'use client';

import React from 'react';
import { SiteSettingsData, SocialLinkItem } from '@/lib/types';

interface KineticHeroProps {
  onSelectView: (view: string) => void;
  settings?: SiteSettingsData | null;
  socialLinks?: SocialLinkItem[];
}

export default function KineticHero({ onSelectView, settings, socialLinks }: KineticHeroProps) {
  const heroBadge = settings?.heroBadgeText || 'Disponible pour de nouveaux projets';
  const heroTitle = settings?.heroTitle || "Hi, I’m Kevin.";
  const heroSkills = settings?.heroSkills || 'Product Builder • UI/UX Designer • AI Builder';
  const heroSubtitle = settings?.heroSubtitle || 'J’aide les marques et les entrepreneurs à transformer leurs idées en produits digitaux élégants, utiles et mémorables.';
  const statProjects = settings?.statProjects || 10;
  const statExperience = settings?.statExperience || 3;
  const statPassion = settings?.statPassion || 100;
  
  const heroImage = settings?.heroImageMain || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuu1invwLa0s2-XMZsz8SbKym4O7yKwbAMqL4BYePgxqw_VujC864oZhcRArkspYHdO1mUZdOhSgFOfypIq_1DCXmEiwin_ZQpNcXeM9owavpajrxJMu8w3gdhhRq0wv_moFY5662UIbwPxwEhmMvh-KQGrvyW8_6wd6H7TP0LedRFiu3YBUZ-uepTMWg2ZNWKJicrti0VyudqU-eP_VYEsrNBMlbqEK-lKF04Epp7Z8THxqsYs7FeQS800nAW9J379hE';

  return (
    <section className="w-full h-full flex flex-col lg:flex-row items-center justify-between px-6 sm:px-12 lg:px-16 py-6 lg:py-0 relative overflow-y-auto lg:overflow-hidden custom-scroll">
      
      {/* Social Vertical Bar (Dynamic & Toggleable from CMS) */}
      {settings?.heroShowSocialBar !== false && (
        (() => {
          const activeSocials = (socialLinks || []).filter(s => s.isActive);
          if (activeSocials.length === 0 && !settings?.companyEmail) return null;

          const getPlatformIcon = (platform: string, customIcon?: string) => {
            if (customIcon && customIcon.trim()) return customIcon;
            const p = platform.toLowerCase();
            if (p.includes('linkedin')) return 'work';
            if (p.includes('github')) return 'code';
            if (p.includes('twitter') || p.includes('x')) return 'sports_volleyball';
            if (p.includes('youtube')) return 'smart_display';
            if (p.includes('instagram') || p.includes('tiktok')) return 'photo_camera';
            if (p.includes('facebook')) return 'groups';
            if (p.includes('whatsapp')) return 'chat';
            if (p.includes('discord')) return 'forum';
            if (p.includes('telegram')) return 'send';
            if (p.includes('figma')) return 'draw';
            if (p.includes('dribbble')) return 'palette';
            if (p.includes('behance')) return 'brush';
            if (p.includes('spotify')) return 'headphones';
            if (p.includes('twitch')) return 'videogame_asset';
            return 'link';
          };

          return (
            <aside className="hidden xl:flex flex-col items-center gap-3.5 absolute left-6 top-1/2 -translate-y-1/2 z-30">
              {activeSocials.map((social) => (
                <div key={social.id || social.platform} className="relative group/social">
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.platform}
                    className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#FF7A00]/60 flex items-center justify-center text-zinc-400 hover:text-[#FF7A00] hover:bg-[#FF7A00]/15 hover:scale-110 shadow-lg transition-all duration-300"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {getPlatformIcon(social.platform, social.icon)}
                    </span>
                  </a>
                  {/* Floating Tooltip */}
                  <div className="absolute left-12 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-black/90 border border-white/10 text-[11px] font-mono font-medium text-white whitespace-nowrap opacity-0 pointer-events-none group-hover/social:opacity-100 group-hover/social:translate-x-1 transition-all duration-200 z-40 shadow-xl">
                    {social.platform}
                  </div>
                </div>
              ))}

              {settings?.companyEmail && (
                <div className="relative group/social">
                  <a
                    href={`mailto:${settings.companyEmail}`}
                    aria-label="Email"
                    className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#FF7A00]/60 flex items-center justify-center text-zinc-400 hover:text-[#FF7A00] hover:bg-[#FF7A00]/15 hover:scale-110 shadow-lg transition-all duration-300"
                  >
                    <span className="material-symbols-outlined text-[18px]">mail</span>
                  </a>
                  <div className="absolute left-12 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-black/90 border border-white/10 text-[11px] font-mono font-medium text-white whitespace-nowrap opacity-0 pointer-events-none group-hover/social:opacity-100 group-hover/social:translate-x-1 transition-all duration-200 z-40 shadow-xl">
                    Email Direct
                  </div>
                </div>
              )}
            </aside>
          );
        })()
      )}

      {/* Left Column: Portrait with Cinematic Backlight */}
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center relative pt-4 lg:pt-0">
        <div className="relative w-full max-w-[480px] xl:max-w-[540px] aspect-[4/4.8] sm:aspect-[4/4.6] flex items-center justify-center">
          {/* Warm Amber Studio Glow Halo */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FF7A00]/35 via-[#FF7A00]/15 to-transparent blur-3xl pointer-events-none" />
          
          {/* Portrait Image */}
          <img 
            src={heroImage} 
            alt="Kevin Assamoi - Product Builder" 
            className="w-full h-full object-cover object-center rounded-2xl shadow-2xl relative z-10 border border-white/10" 
          />
          
          {/* Edge Vignette / Radial fade overlay */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent opacity-85 z-10 pointer-events-none" />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 z-10 pointer-events-none" />
          
          {/* Micro Floating Credential Capsule (Customizable / Removable from CMS) */}
          {settings?.heroShowFloatingBadge !== false && Boolean(settings?.heroBadgeFloatingText?.trim()) && (
            <div className="absolute bottom-6 right-5 z-20 hidden sm:flex items-center gap-2 bg-[#121212]/90 border border-white/10 backdrop-blur-xl px-3.5 py-1.5 rounded-full shadow-xl">
              <span className="material-symbols-outlined text-[#FF7A00] text-sm">
                {settings?.heroBadgeFloatingIcon || 'auto_awesome'}
              </span>
              <span className="font-mono text-[10px] text-white uppercase tracking-wider font-semibold">
                {settings?.heroBadgeFloatingText || 'AI & Product Craft'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Monolith Narrative & Switchers */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center py-6 lg:py-0 lg:pl-10 xl:pl-16 z-10">
        {/* Availability Pill Badge */}
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-md px-3.5 py-1 rounded-full w-fit mb-5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#FF7A00] shadow-[0_0_10px_rgba(255,122,0,0.9)] animate-pulse" />
          <span className="font-mono text-[10px] text-zinc-300 uppercase tracking-widest font-semibold">
            {heroBadge}
          </span>
        </div>

        {/* Giant Headline */}
        <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.02]">
          {heroTitle.includes('Kevin') ? (
            <>
              {heroTitle.split('Kevin')[0]}
              <span className="text-[#FF7A00] drop-shadow-[0_0_35px_rgba(255,122,0,0.35)]">Kevin{heroTitle.split('Kevin')[1] || '.'}</span>
            </>
          ) : (
            <span className="text-[#FF7A00] drop-shadow-[0_0_35px_rgba(255,122,0,0.35)]">{heroTitle}</span>
          )}
        </h1>

        {/* Subtitle Eyebrow */}
        <p className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-primary font-semibold mt-3">
          {heroSkills}
        </p>

        {/* Descriptive Narrative */}
        <p className="text-zinc-400 text-sm sm:text-base max-w-lg mt-4 leading-relaxed whitespace-pre-line">
          {heroSubtitle}
        </p>

        {/* CTAs Navigation Links */}
        <div className="flex flex-wrap items-center gap-3.5 mt-7">
          <button 
            onClick={() => onSelectView('projects')}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF7A00] to-[#FF9326] text-black font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-[0_8px_25px_rgba(255,122,0,0.38)] hover:scale-105 hover:shadow-[0_10px_30px_rgba(255,122,0,0.55)] transition-all cursor-pointer"
          >
            <span>Voir mes projets</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
          <button 
            onClick={() => onSelectView('contact')}
            className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-xs sm:text-sm px-5 py-3 rounded-full backdrop-blur-md hover:scale-105 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-base text-[#FF7A00]">mail</span>
            <span>Me contacter</span>
          </button>
        </div>

        {/* Bottom Metrics Bar */}
        <div className="grid grid-cols-3 gap-4 pt-8 mt-6 border-t border-white/5 max-w-lg">
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {statProjects}<span className="text-[#FF7A00]">+</span>
            </span>
            <span className="text-xs text-zinc-400 font-medium">Projets réalisés</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {statExperience}<span className="text-[#FF7A00]">+</span>
            </span>
            <span className="text-xs text-zinc-400 font-medium">Années d'expérience</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#FF7A00] tracking-tight">
              {statPassion}<span className="text-white">%</span>
            </span>
            <span className="text-xs text-zinc-400 font-medium">Passionné</span>
          </div>
        </div>
      </div>

    </section>
  );
}
