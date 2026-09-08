'use client';

import React, { useState } from 'react';
import KineticProjectModal, { ProjectDetail } from './KineticProjectModal';

interface KineticProjectsProps {
  onSelectView: (view: string) => void;
  projects: any[];
}

export default function KineticProjects({ onSelectView, projects }: KineticProjectsProps) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);

  const defaultProjects: ProjectDetail[] = [
    {
      id: 'aura',
      title: 'Aura Intelligence',
      subtitle: 'SaaS Enterprise • Next.js 15 • OpenAI API',
      metric: '+184% Vélocité',
      summary: 'Orchestration générative pour équipes de marque, déclinaison d\'actifs multi-canaux et gouvernance d\'assets visuels.',
      description: 'Plateforme d\'orchestration générative pour équipes de marque mondiales. Intègre un studio visuel avec gouvernance de marque stricte, micro-animations réactives et tokens synchronisés.',
      coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByG89r1e27rZGPwgbNbMjbgNHF2qLTYYCL1lNBi9yxpCswP9vZGzXYKXFs-VcXLHQAzJrvXPlTJW28V_8hN6NnWvXWuKVknk8n0bU6MyagPkRSwReukT-7zZEUylLuTdWDjnMDbfo9zmbQ3BzD7mQ3OOJ8LmLruv8Jtks0QY6V_XN9dOmBXWbsJIVRI32KUDnaQjkprCG2CV3gaihA3ZWCzyVx1ELd2ECtzpDbPKK9ydlrj0ahNSUr3Q',
      category: { name: 'Plateforme IA' },
      technologies: ['Next.js', 'OpenAI API', 'Tailwind']
    },
    {
      id: 'kromatik',
      title: 'Kromatik Studio',
      subtitle: 'WebGL Immersion • Three.js • GSAP',
      metric: 'Site de l\'année 2024',
      summary: 'Identité de marque haut de gamme et expérience web WebGL interactive pour un collectif mondial de créateurs visuels.',
      description: 'Direction artistique haut de gamme et expérience de portfolio digital 3D sculpturale mettant à l\'honneur des shaders ambre/cuivre et des interactions de scroll cinétiques.',
      coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdL_3Bb7iMuW7r1-2mE2N8LUvYn6y9uzfi0C344Uz9TvRF-5CHDKBigAvu7LLBFtVoPfJLtuNFKFH-nKXcDqer-C0_oR3eErIvGrzrRvHQgxU0PBqaKUIWzZ4E4zZmEBfq9sn3WLgFjHjoxawLx65m4Ac5-EOeh4wuL-ybn-QR060L39K2S_hcF713l5Zeej6vWwwgEGlaSyBaJuU99xRhhSYsTtTN400NJqFEij3993wBj7c2GBFQ-w',
      category: { name: 'Brand 3D' },
      technologies: ['Three.js', 'GSAP', 'UI/UX']
    },
    {
      id: 'flowpulse',
      title: 'FlowPulse Wealth',
      subtitle: 'Fintech Mobile • React Native • Design Tokens',
      metric: '42k Utilisateurs',
      summary: 'Application mobile de gestion patrimoniale et trésorerie intelligente pour entrepreneurs et nomades digitaux.',
      description: 'Application mobile de gestion patrimoniale et de trésorerie automatisée pour créateurs et dirigeants nomades. Design system multi-devises ultra fluide avec authentification biométrique.',
      coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrwugo9rXufkpN1rbIx4KeEsadOu_Wj0PJ7dq9p3WDitc1j1rHECrU6q1ahMcFPb7aLCZbkJmSCzj2FTuX3y6HZMxCJ6GiCvJZXK3Of9e-HUptlIAzyMpwWYoGWE1F8Uw07dNBZxXhxVYWeZpXxFMhxOrL2w9NL-p4NP4KOUZ4_rsSz6OkV1OQagPtDANBaYnHSzEzzPWlAr15ZXL3L4n2t-fEV4cVmPuC2qPi2AC595AY4joQ1AmjQA',
      category: { name: 'FinTech' },
      technologies: ['React Native', 'Design Tokens', 'Fintech']
    }
  ];

  const projectList: ProjectDetail[] = (projects && projects.length > 0) ? projects.map(p => ({
    id: p.id,
    title: p.title,
    subtitle: p.technologies?.join(' • ') || 'Next.js • UI/UX',
    metric: p.isFeatured ? '⭐ Projet Vedette' : (p.category?.name || 'Étude de cas'),
    summary: p.summary,
    description: p.description,
    coverImage: p.coverImage,
    category: p.category,
    technologies: p.technologies,
    liveUrl: p.liveUrl,
    githubUrl: p.githubUrl,
  })) : defaultProjects;

  const filteredProjects = projectList.filter(p => {
    if (activeFilter === 'all') return true;
    const catName = p.category?.name?.toLowerCase() || '';
    if (activeFilter === 'ai') return catName.includes('ia') || catName.includes('ai') || p.title.toLowerCase().includes('ia') || p.title.toLowerCase().includes('aura');
    if (activeFilter === 'fintech') return catName.includes('fintech') || catName.includes('mobile') || p.title.toLowerCase().includes('flow') || p.title.toLowerCase().includes('e-commerce');
    if (activeFilter === 'brand') return catName.includes('brand') || catName.includes('3d') || catName.includes('design') || p.title.toLowerCase().includes('kromatik');
    return true;
  });

  return (
    <section className="w-full h-full flex flex-col px-6 sm:px-12 lg:px-16 py-8 overflow-y-auto custom-scroll justify-between">
      
      {/* Header with Interactive Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/5 pb-4 mb-5 shrink-0">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF7A00] font-semibold">
            Études de cas
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            Projets sélectionnés
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 mt-3 sm:mt-0 bg-white/5 p-1 rounded-full border border-white/10 text-xs font-medium">
          <button 
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              activeFilter === 'all' 
                ? 'bg-[#FF7A00] text-black font-semibold shadow-sm' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Tous ({projectList.length})
          </button>
          <button 
            onClick={() => setActiveFilter('ai')}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              activeFilter === 'ai' 
                ? 'bg-[#FF7A00] text-black font-semibold shadow-sm' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Plateforme IA
          </button>
          <button 
            onClick={() => setActiveFilter('fintech')}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              activeFilter === 'fintech' 
                ? 'bg-[#FF7A00] text-black font-semibold shadow-sm' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            FinTech
          </button>
          <button 
            onClick={() => setActiveFilter('brand')}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              activeFilter === 'brand' 
                ? 'bg-[#FF7A00] text-black font-semibold shadow-sm' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Brand 3D
          </button>
        </div>
      </div>

      {/* Interactive 3-Card Asymmetric Portfolio Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 flex-1 items-stretch">
        {filteredProjects.map((project) => (
          <div 
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="group bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 hover:border-[#FF7A00]/50 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl cursor-pointer"
          >
            <div className="relative w-full aspect-[16/10] overflow-hidden bg-black/50">
              <img 
                src={project.coverImage} 
                alt={project.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[10px] font-mono text-[#FF7A00] font-bold">
                {project.category?.name || 'Projet'}
              </div>
            </div>

            <div className="p-5 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white group-hover:text-[#FF7A00] transition-colors">
                    {project.title}
                  </h3>
                  {project.metric && (
                    <span className="text-xs font-mono text-emerald-400 font-bold">
                      {project.metric}
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed line-clamp-3">
                  {project.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 mt-4 flex items-center justify-between text-xs">
                <span className="text-zinc-400 font-mono text-[10px]">
                  {project.technologies?.slice(0, 2).join(' • ') || 'Design • Code'}
                </span>
                <span className="inline-flex items-center gap-1 text-[#FF7A00] font-semibold group-hover:translate-x-1 transition-transform">
                  <span>Détails</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Modal trigger footnote */}
      <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/5 text-xs text-zinc-400 shrink-0">
        <span>* Cliquez sur un projet pour inspecter l’architecture sans quitter l’écran</span>
        <button 
          onClick={() => onSelectView('skills')}
          className="inline-flex items-center gap-1.5 text-[#FF7A00] font-semibold hover:underline cursor-pointer"
        >
          <span>Explorer mes compétences</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>

      {/* Interactive Modal */}
      {selectedProject && (
        <KineticProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
          onContactClick={() => onSelectView('contact')}
        />
      )}

    </section>
  );
}
