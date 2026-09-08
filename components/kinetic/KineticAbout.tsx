'use client';

import React from 'react';
import { SiteSettingsData } from '@/lib/types';

interface KineticAboutProps {
  onSelectView: (view: string) => void;
  settings?: SiteSettingsData | null;
}

export default function KineticAbout({ onSelectView, settings }: KineticAboutProps) {
  const aboutTitle = settings?.aboutTitle || "Je transforme les idées en produits.";
  const aboutMain = settings?.aboutMainText || "Chaque produit que je conçois commence par une écoute attentive des frictions réelles. Je ne produis pas de simples maquettes : je structure des modèles mentaux fluides, bâtis sur des design systems cohérents et capables d’évoluer à grande échelle.";

  return (
    <section className="w-full h-full flex flex-col px-6 sm:px-12 lg:px-16 py-8 overflow-y-auto custom-scroll justify-between">
      
      {/* Header Strip */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/5 pb-4 mb-6 shrink-0">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF7A00] font-semibold">
            Manifeste &amp; Vision
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            {aboutTitle.includes('produits') ? (
              <>
                {aboutTitle.split('produits')[0]}
                <span className="text-[#FF7A00]">produits</span>
                {aboutTitle.split('produits')[1] || ''}
              </>
            ) : (
              aboutTitle
            )}
          </h2>
        </div>
        <div className="text-xs text-zinc-400 font-mono mt-2 sm:mt-0 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          Design suisse • Next.js fullstack • Architectures IA
        </div>
      </div>

      {/* Agency Bento Grid composition */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 items-stretch">
        
        {/* Left Pillar Narrative (5 cols) */}
        <div className="lg:col-span-5 bg-white/[0.03] border border-white/5 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group hover:border-[#FF7A00]/30 transition-all">
          <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-[#FF7A00]/10 rounded-full blur-2xl pointer-events-none" />
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#FF7A00]/15 text-[#FF7A00] flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-xl">psychology</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              Artisanat numérique guidé par le sens, la rigueur et la performance.
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-3 leading-relaxed whitespace-pre-line">
              {aboutMain}
            </p>
          </div>
          <div className="pt-5 border-t border-white/5 mt-5">
            <span className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider">
              Stack de prédilection
            </span>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {(settings?.aboutStackTags 
                ? settings.aboutStackTags.split(',').map((s) => s.trim()) 
                : ['Figma Maestro', 'Design Systems Tokens', 'Next.js & Tailwind', 'LLM & Agents']
              ).map((tag, idx) => (
                <span 
                  key={idx} 
                  className={`px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] ${
                    idx === 3 ? 'text-[#FF7A00]' : 'text-zinc-200'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Bento Matrix (7 cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Pillar 1 */}
          <div className="bg-white/[0.03] hover:bg-white/[0.05] border border-white/5 hover:border-[#FF7A00]/40 p-5 rounded-2xl flex flex-col justify-between transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs font-bold text-[#FF7A00]">01</span>
              <span className="material-symbols-outlined text-zinc-400 text-lg">track_changes</span>
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-1">
                {settings?.aboutValue1Title || "Product Strategy"}
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {settings?.aboutValue1Desc || "Discovery utilisateur, définition d'objectifs ROI, priorisation de features MVP et validation marché en cycles courts."}
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white/[0.03] hover:bg-white/[0.05] border border-white/5 hover:border-[#FF7A00]/40 p-5 rounded-2xl flex flex-col justify-between transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs font-bold text-[#FF7A00]">02</span>
              <span className="material-symbols-outlined text-zinc-400 text-lg">palette</span>
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-1">
                {settings?.aboutValue2Title || "Haute Couture UI/UX"}
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {settings?.aboutValue2Desc || "Direction artistique de précision, micro-interactions tactiles, tokens synchronisés et respect absolu des conventions d'ergonomie."}
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white/[0.03] hover:bg-white/[0.05] border border-white/5 hover:border-[#FF7A00]/40 p-5 rounded-2xl flex flex-col justify-between transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs font-bold text-[#FF7A00]">03</span>
              <span className="material-symbols-outlined text-zinc-400 text-lg">smart_toy</span>
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-1">
                {settings?.aboutValue3Title || "AI Agents & Neural Products"}
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {settings?.aboutValue3Desc || "Intégration d'assistants contextuels, chaînes RAG, orchestration de flux génératifs et interfaces human-in-the-loop."}
              </p>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="bg-white/[0.03] hover:bg-white/[0.05] border border-white/5 hover:border-[#FF7A00]/40 p-5 rounded-2xl flex flex-col justify-between transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs font-bold text-[#FF7A00]">04</span>
              <span className="material-symbols-outlined text-zinc-400 text-lg">bolt</span>
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-1">
                {settings?.aboutValue4Title || "Rapid Fullstack Prototyping"}
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {settings?.aboutValue4Desc || "Du design cliquable au code de production déployé sur infrastructure Vercel en cycles de développement rapides."}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Strip Navigation Prompt */}
      <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/5 text-xs text-zinc-400 shrink-0">
        <span>Prêt à explorer les réalisations concrètes ?</span>
        <button 
          onClick={() => onSelectView('projects')}
          className="inline-flex items-center gap-1.5 text-[#FF7A00] font-semibold hover:underline cursor-pointer"
        >
          <span>Voir les études de cas</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>

    </section>
  );
}
