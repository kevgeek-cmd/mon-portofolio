'use client';

import React from 'react';

interface KineticSkillsProps {
  onSelectView: (view: string) => void;
  services?: any[];
}

export default function KineticSkills({ onSelectView, services }: KineticSkillsProps) {
  const defaultSkills = [
    {
      id: '1',
      icon: 'devices',
      title: 'Product Design',
      description: 'Conception orientée conversion, fluidité des flux d’onboarding et ergonomie centrée utilisateur.',
      tags: 'Discovery • Wireframes • User Flow',
      percentage: 95,
      rating: 5,
      image: null,
    },
    {
      id: '2',
      icon: 'grid_view',
      title: 'UI/UX & Design Systems',
      description: 'Systèmes scalables, bibliothèques de tokens synchronisées, mode sombre natif et micro-animations.',
      tags: 'Figma Pro • Design Tokens • UI Motion',
      percentage: 98,
      rating: 5,
      image: null,
    },
    {
      id: '3',
      icon: 'code_blocks',
      title: 'Web Apps & Jamstack',
      description: 'Applications web véloces, tableaux de bord interactifs SaaS et composants réactifs modernes.',
      tags: 'Next.js 15 • TypeScript • Tailwind',
      percentage: 92,
      rating: 5,
      image: null,
    },
    {
      id: '4',
      icon: 'smart_toy',
      title: 'AI Products & Agents',
      description: 'Expériences conversationnelles, assistants de productivité contextuels et chaînes d\'automatisation.',
      tags: 'LLM Chains • Embeddings • Copilots',
      percentage: 90,
      rating: 5,
      image: null,
    },
    {
      id: '5',
      icon: 'phone_iphone',
      title: 'Mobile Experiences',
      description: 'Ergonomie tactile raffinée pour iOS et Android avec feedback haptique et prototypage réaliste.',
      tags: 'Mobile UI • Gestures • React Native',
      percentage: 88,
      rating: 4,
      image: null,
    },
    {
      id: '6',
      icon: 'blur_on',
      title: 'Brand Identity & 3D',
      description: 'Direction artistique mémorable, typographie singulière et univers 3D immersifs qui captivent.',
      tags: 'Art Direction • Three.js • Motion',
      percentage: 94,
      rating: 5,
      image: null,
    },
  ];

  const skillList = Array.isArray(services) && services.length > 0
    ? services.map((s, idx) => ({
        id: s.id || `${idx}`,
        icon: s.icon ? s.icon.toLowerCase() : (defaultSkills[idx]?.icon || 'code_blocks'),
        image: s.image || null,
        title: s.title || defaultSkills[idx]?.title || 'Compétence',
        description: s.description || defaultSkills[idx]?.description || '',
        tags: s.tags || defaultSkills[idx]?.tags || 'Architecture • Performance • Design',
        percentage: typeof s.percentage === 'number' ? s.percentage : (defaultSkills[idx]?.percentage || 90),
        rating: typeof s.rating === 'number' ? s.rating : (defaultSkills[idx]?.rating || 5),
      }))
    : defaultSkills;

  return (
    <section className="w-full h-full flex flex-col px-6 sm:px-12 lg:px-16 py-8 overflow-y-auto custom-scroll justify-between">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/5 pb-4 mb-5 shrink-0">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF7A00] font-semibold">
            Champs d'intervention &amp; Niveau d'expertise
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            Ce que je construis.
          </h2>
        </div>
        <p className="text-xs text-zinc-400 max-w-sm mt-2 sm:mt-0 leading-relaxed">
          De l’esquisse conceptuelle jusqu’au déploiement d’interfaces vivantes et optimisées pour le scale.
        </p>
      </div>

      {/* 6-Matrix Skill Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 items-stretch">
        {skillList.map((skill) => (
          <div 
            key={skill.id}
            className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-[#FF7A00]/40 p-5 rounded-2xl flex flex-col justify-between transition-all group shadow-sm relative overflow-hidden"
          >
            <div>
              {/* Header with Icon/Image and Star Rating / Percentage */}
              <div className="flex items-center justify-between mb-3">
                {skill.image ? (
                  <img 
                    src={skill.image} 
                    alt={skill.title} 
                    className="w-10 h-10 rounded-xl object-cover border border-white/10 group-hover:scale-105 transition-transform" 
                  />
                ) : (
                  <span className="material-symbols-outlined text-2xl text-[#FF7A00] group-hover:scale-110 transition-transform inline-block">
                    {skill.icon}
                  </span>
                )}

                {/* Stars and percentage badge */}
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-0.5 text-[#FF7A00] text-xs">
                    {Array.from({ length: 5 }).map((_, starIdx) => (
                      <span 
                        key={starIdx} 
                        className="material-symbols-outlined text-[14px]"
                        style={{ fontVariationSettings: `'FILL' ${starIdx < (skill.rating || 5) ? 1 : 0}` }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  {typeof skill.percentage === 'number' && skill.percentage > 0 && (
                    <span className="text-[10px] font-mono font-bold text-[#FF7A00] bg-[#FF7A00]/10 px-2 py-0.5 rounded-full border border-[#FF7A00]/20">
                      {skill.percentage}%
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-base font-bold text-white mb-1">{skill.title}</h3>
              <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">{skill.description}</p>
            </div>

            <div className="space-y-2 mt-4 pt-3 border-t border-white/5">
              {/* Animated Progress Bar */}
              {typeof skill.percentage === 'number' && skill.percentage > 0 && (
                <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-[#FF7A00] to-[#FFB066] h-full rounded-full transition-all duration-700 group-hover:shadow-[0_0_12px_rgba(255,122,0,0.8)]"
                    style={{ width: `${Math.min(100, Math.max(0, skill.percentage))}%` }}
                  />
                </div>
              )}

              {/* Tags */}
              <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
                <span className="text-[#FF7A00]">●</span> {skill.tags}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/5 text-xs text-zinc-400 shrink-0">
        <span>Besoin d’un mix sur-mesure pour votre équipe ?</span>
        <button 
          onClick={() => onSelectView('testimonials')}
          className="inline-flex items-center gap-1.5 text-[#FF7A00] font-semibold hover:underline cursor-pointer"
        >
          <span>Lire les témoignages clients</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>

    </section>
  );
}
