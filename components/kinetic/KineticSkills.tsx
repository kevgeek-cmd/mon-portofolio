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
    },
    {
      id: '2',
      icon: 'grid_view',
      title: 'UI/UX & Design Systems',
      description: 'Systèmes scalables, bibliothèques de tokens synchronisées, mode sombre natif et micro-animations.',
      tags: 'Figma Pro • Design Tokens • UI Motion',
    },
    {
      id: '3',
      icon: 'code_blocks',
      title: 'Web Apps & Jamstack',
      description: 'Applications web véloces, tableaux de bord interactifs SaaS et composants réactifs modernes.',
      tags: 'Next.js 15 • TypeScript • Tailwind',
    },
    {
      id: '4',
      icon: 'smart_toy',
      title: 'AI Products & Agents',
      description: 'Expériences conversationnelles, assistants de productivité contextuels et chaînes d\'automatisation.',
      tags: 'LLM Chains • Embeddings • Copilots',
    },
    {
      id: '5',
      icon: 'phone_iphone',
      title: 'Mobile Experiences',
      description: 'Ergonomie tactile raffinée pour iOS et Android avec feedback haptique et prototypage réaliste.',
      tags: 'Mobile UI • Gestures • React Native',
    },
    {
      id: '6',
      icon: 'blur_on',
      title: 'Brand Identity & 3D',
      description: 'Direction artistique mémorable, typographie singulière et univers 3D immersifs qui captivent.',
      tags: 'Art Direction • Three.js • Motion',
    },
  ];

  const skillList = services && services.length >= 6 ? services.map((s, idx) => ({
    id: s.id || `${idx}`,
    icon: s.icon ? s.icon.toLowerCase() : defaultSkills[idx]?.icon || 'code_blocks',
    title: s.title || defaultSkills[idx]?.title,
    description: s.description || defaultSkills[idx]?.description,
    tags: defaultSkills[idx]?.tags || 'Architecture • Performance • Design',
  })) : defaultSkills;

  return (
    <section className="w-full h-full flex flex-col px-6 sm:px-12 lg:px-16 py-8 overflow-y-auto custom-scroll justify-between">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/5 pb-4 mb-5 shrink-0">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF7A00] font-semibold">
            Champs d'intervention
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
            className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-[#FF7A00]/40 p-5 rounded-2xl flex flex-col justify-between transition-all group shadow-sm"
          >
            <div>
              <span className="material-symbols-outlined text-2xl text-[#FF7A00] mb-2 group-hover:scale-110 transition-transform inline-block">
                {skill.icon}
              </span>
              <h3 className="text-base font-bold text-white mb-1">{skill.title}</h3>
              <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">{skill.description}</p>
            </div>
            <div className="pt-3 border-t border-white/5 mt-3 flex items-center gap-2 text-[10px] font-mono text-zinc-400">
              <span className="text-[#FF7A00]">●</span> {skill.tags}
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
