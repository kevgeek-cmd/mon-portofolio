'use client';

import React from 'react';

interface KineticTestimonialsProps {
  onSelectView: (view: string) => void;
  testimonials?: any[];
}

const DEFAULT_TESTIMONIALS = [
  {
    id: '1',
    content: "Kevin possède cette double compétence rarissime : une exigence esthétique digne des plus grands studios et la rapidité d'exécution d'un ingénieur produit senior. Notre MVP a levé en seed 2 mois après son intervention.",
    clientName: "Camille Laurent",
    clientRole: "Co-fondatrice & CEO, Novaflow",
    clientAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    rating: 5,
  },
  {
    id: '2',
    content: "Travailler avec Kevin a redéfini notre vision du design produit. Les retours de nos utilisateurs sur la simplicité de l'interface ont été unanimes. Il ne fait aucun compromis sur la qualité.",
    clientName: "Marc Kouassi",
    clientRole: "Head of Product, Apex Africa",
    clientAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    rating: 5,
  },
  {
    id: '3',
    content: "L'intégration des composants d'IA dans notre application a été rendue tellement intuitive et élégante grâce à son architecture UI. C’est un partenaire stratégique inestimable.",
    clientName: "Alexander Vance",
    clientRole: "Managing Partner, Studio V",
    clientAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    rating: 5,
  },
];

export default function KineticTestimonials({ onSelectView, testimonials = [] }: KineticTestimonialsProps) {
  const displayList = Array.isArray(testimonials) && testimonials.length > 0 
    ? testimonials 
    : DEFAULT_TESTIMONIALS;

  return (
    <section className="w-full h-full flex flex-col px-6 sm:px-12 lg:px-16 py-8 overflow-y-auto custom-scroll justify-between">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/5 pb-4 mb-5 shrink-0">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF7A00] font-semibold">
            Confiance &amp; Retours
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            Ce qu'ils disent du travail ensemble.
          </h2>
        </div>
        <div className="flex items-center gap-1 text-[#FF7A00] text-sm mt-2 sm:mt-0">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          <span className="text-xs text-zinc-300 font-mono ml-2 font-bold">5.0 / 5</span>
        </div>
      </div>

      {/* 3 Premium Editorial Testimonial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 flex-1 items-stretch">
        {displayList.slice(0, 3).map((t: any) => (
          <div 
            key={t.id}
            className="bg-white/[0.03] hover:bg-white/[0.05] border border-white/5 hover:border-[#FF7A00]/40 p-6 rounded-2xl flex flex-col justify-between shadow-lg relative overflow-hidden transition-all"
          >
            <div>
              <div className="text-[#FF7A00] text-3xl font-serif leading-none mb-3">“</div>
              <p className="text-xs sm:text-sm text-zinc-300 italic leading-relaxed">
                {t.content || t.quote}
              </p>
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-white/5 mt-4">
              <img 
                src={t.clientAvatar || t.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"} 
                alt={t.clientName || t.author || "Client"} 
                className="w-10 h-10 rounded-full object-cover border border-white/10" 
              />
              <div>
                <h4 className="text-xs font-bold text-white">{t.clientName || t.author}</h4>
                <p className="text-[10px] text-zinc-400 font-mono">{t.clientRole || t.role || "Client"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/5 text-xs text-zinc-400 shrink-0">
        <span>Envie de démarrer une collaboration similaire ?</span>
        <button 
          onClick={() => onSelectView('contact')}
          className="inline-flex items-center gap-1.5 text-[#FF7A00] font-semibold hover:underline cursor-pointer"
        >
          <span>Passer à l’étape suivante</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>

    </section>
  );
}
