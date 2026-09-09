'use client';

import React from 'react';
import { SiteSettingsData, SocialLinkItem } from '@/lib/types';
import { SocialIcon } from '@/components/ui/SocialIcons';

interface KineticHeroProps {
  onSelectView: (view: string) => void;
  settings?: SiteSettingsData | null;
  socialLinks?: SocialLinkItem[];
}

export default function KineticHero({ onSelectView, settings, socialLinks }: KineticHeroProps) {
  const heroBadge = settings?.heroBadgeText || 'Disponible pour de nouveaux projets';
  const showHeroBadge = settings?.heroShowBadge !== false && Boolean(heroBadge?.trim());
  const heroTitle = settings?.heroTitle || "Hi, I’m Kevin.";
  const heroSkills = settings?.heroSkills || 'Product Builder • UI/UX Designer • AI Builder';
  const heroSubtitle = settings?.heroSubtitle || 'J’aide les marques et les entrepreneurs à transformer leurs idées en produits digitaux élégants, utiles et mémorables.';
  
  const showStats = settings?.heroShowStats !== false;
  const statProjects = settings?.statProjects ?? 30;
  const statLabelProjects = settings?.statLabelProjects || 'Projets réalisés';
  const statExperience = settings?.statExperience ?? 3;
  const statLabelExperience = settings?.statLabelExperience || "Années d'expérience";
  const statPassion = settings?.statPassion ?? 100;
  const statLabelPassion = settings?.statLabelPassion || 'Passionné';
  
  const heroImage = settings?.heroImageMain || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuu1invwLa0s2-XMZsz8SbKym4O7yKwbAMqL4BYePgxqw_VujC864oZhcRArkspYHdO1mUZdOhSgFOfypIq_1DCXmEiwin_ZQpNcXeM9owavpajrxJMu8w3gdhhRq0wv_moFY5662UIbwPxwEhmMvh-KQGrvyW8_6wd6H7TP0LedRFiu3YBUZ-uepTMWg2ZNWKJicrti0VyudqU-eP_VYEsrNBMlbqEK-lKF04Epp7Z8THxqsYs7FeQS800nAW9J379hE';

  const activeSocials = (socialLinks || []).filter(s => s.isActive);

  return (
    <section className="w-full h-full flex flex-col lg:flex-row items-center justify-between px-4 sm:px-10 lg:px-16 py-6 lg:py-4 pb-12 lg:pb-6 relative overflow-y-auto lg:overflow-hidden custom-scroll gap-6 lg:gap-0">
      
      {/* Social Vertical Dock (Desktop xl:flex - 100% Synced with /admin/social-links) */}
      {settings?.heroShowSocialBar !== false && activeSocials.length > 0 && (
        <aside className="hidden xl:flex flex-col items-center gap-2 absolute left-5 top-1/2 -translate-y-1/2 z-30 bg-[#121214]/60 backdrop-blur-md p-1.5 rounded-full border border-white/10 shadow-2xl">
          {activeSocials.map((social) => (
            <div key={social.id || social.platform} className="relative group/social">
              <a
                href={social.url}
                target="_blank"
                rel="noreferrer"
                aria-label={social.platform}
                className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/5 hover:border-[#FF7A00]/60 flex items-center justify-center text-zinc-400 hover:text-[#FF7A00] hover:bg-[#FF7A00]/15 hover:scale-105 transition-all duration-200"
              >
                <SocialIcon platform={social.platform} icon={social.icon} className="w-3.5 h-3.5 shrink-0" />
              </a>
              {/* Floating Tooltip */}
              <div className="absolute left-11 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-zinc-900/95 border border-white/10 text-[11px] font-mono font-medium text-white whitespace-nowrap opacity-0 pointer-events-none group-hover/social:opacity-100 group-hover/social:translate-x-1 transition-all duration-150 z-50 shadow-2xl">
                {social.platform}
              </div>
            </div>
          ))}
        </aside>
      )}

      {/* Left Column: Portrait with Cinematic Backlight */}
      <div className="w-full lg:w-1/2 flex items-center justify-center relative pt-2 lg:pt-0 shrink-0">
        <div className="relative w-full max-w-[260px] xs:max-w-[300px] sm:max-w-[380px] lg:max-w-[460px] xl:max-w-[500px] aspect-[4/4.6] flex items-center justify-center">
          {/* Warm Amber Studio Glow Halo */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FF7A00]/30 via-[#FF7A00]/15 to-transparent blur-3xl pointer-events-none" />
          
          {/* Portrait Image */}
          <img 
            src={heroImage} 
            alt="Kevin Assamoi - Product Builder" 
            className="w-full h-full object-cover object-center rounded-2xl shadow-2xl relative z-10 border border-white/10" 
          />
          
          {/* Edge Vignette / Radial fade overlay */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent opacity-85 z-10 pointer-events-none" />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 z-10 pointer-events-none" />
          
          {/* Micro Floating Credential Capsule */}
          {settings?.heroShowFloatingBadge !== false && Boolean(settings?.heroBadgeFloatingText?.trim()) && (
            <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 sm:gap-2 bg-[#121212]/90 border border-white/10 backdrop-blur-xl px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full shadow-xl">
              <span className="material-symbols-outlined text-[#FF7A00] text-xs sm:text-sm">
                {settings?.heroBadgeFloatingIcon || 'auto_awesome'}
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] text-white uppercase tracking-wider font-semibold">
                {settings?.heroBadgeFloatingText || 'AI & Product Craft'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Monolith Narrative & Switchers */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center py-2 lg:py-2 lg:pl-8 xl:pl-14 z-10 my-auto">
        {/* Availability Pill Badge */}
        {showHeroBadge && (
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-md px-3 py-1 rounded-full w-fit mb-3 sm:mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#FF7A00] shadow-[0_0_10px_rgba(255,122,0,0.9)] animate-pulse" />
            <span className="font-mono text-[9px] sm:text-[10px] text-zinc-300 uppercase tracking-widest font-semibold">
              {heroBadge}
            </span>
          </div>
        )}

        {/* Giant Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
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
        <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-primary font-semibold mt-2 sm:mt-3">
          {heroSkills}
        </p>

        {/* Descriptive Narrative */}
        <p className="text-zinc-400 text-xs sm:text-sm lg:text-base max-w-lg mt-3 sm:mt-4 leading-relaxed whitespace-pre-line">
          {heroSubtitle}
        </p>

        {/* CTAs Navigation Links */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 mt-5 sm:mt-6">
          <button 
            onClick={() => onSelectView('projects')}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF7A00] to-[#FF9326] text-black font-bold text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-[0_8px_25px_rgba(255,122,0,0.38)] hover:scale-105 transition-all cursor-pointer"
          >
            <span>Voir mes projets</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
          <button 
            onClick={() => onSelectView('contact')}
            className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-xs sm:text-sm px-4 sm:px-5 py-2.5 sm:py-3 rounded-full backdrop-blur-md hover:scale-105 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-base text-[#FF7A00]">mail</span>
            <span>Me contacter</span>
          </button>
        </div>

        {/* Bottom Metrics Bar (Configurable & Dynamic from CMS) */}
        {showStats && (
          <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-5 sm:pt-6 mt-5 border-t border-white/5 max-w-lg pb-2">
            <div className="flex flex-col">
              <span className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
                {statProjects}<span className="text-[#FF7A00]">+</span>
              </span>
              <span className="text-[11px] sm:text-xs text-zinc-400 font-medium leading-tight mt-0.5">{statLabelProjects}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
                {statExperience}<span className="text-[#FF7A00]">+</span>
              </span>
              <span className="text-[11px] sm:text-xs text-zinc-400 font-medium leading-tight mt-0.5">{statLabelExperience}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-3xl font-extrabold text-[#FF7A00] tracking-tight">
                {statPassion}<span className="text-white">%</span>
              </span>
              <span className="text-[11px] sm:text-xs text-zinc-400 font-medium leading-tight mt-0.5">{statLabelPassion}</span>
            </div>
          </div>
        )}

        {/* Mobile Social Strip (Visible on mobile and tablet < xl) */}
        {settings?.heroShowSocialBar !== false && activeSocials.length > 0 && (
          <div className="flex xl:hidden items-center flex-wrap gap-2 pt-3 mt-3 border-t border-white/5">
            <span className="text-[10px] font-mono uppercase text-zinc-400 mr-1">Réseaux :</span>
            {activeSocials.map((social) => (
              <a
                key={social.id || social.platform}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                aria-label={social.platform}
                className="w-7 h-7 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#FF7A00]/60 flex items-center justify-center text-zinc-400 hover:text-[#FF7A00] transition-colors"
              >
                <SocialIcon platform={social.platform} icon={social.icon} className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        )}

      </div>

    </section>
  );
}
