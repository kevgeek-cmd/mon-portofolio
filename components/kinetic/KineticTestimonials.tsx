'use client';

import React from 'react';

interface KineticTestimonialsProps {
  onSelectView: (view: string) => void;
}

export default function KineticTestimonials({ onSelectView }: KineticTestimonialsProps) {
  const testimonials = [
    {
      id: '1',
      quote: "Kevin possède cette double compétence rarissime : une exigence esthétique digne des plus grands studios et la rapidité d'exécution d'un ingénieur produit senior. Notre MVP a levé en seed 2 mois après son intervention.",
      author: "Camille Laurent",
      role: "Co-fondatrice & CEO, Novaflow",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAuyCeI4uYtGtPDrAORwbLqtEHeB3Cszj7snTjEzFJMA9iUfFx4Y-jxqxBJueoCSqySax4DuhT7-7v6XCwqrQKgZxuho8jXDLtGA3Wf9c7d2vaRcDJLnHBbPw8l6YK-nmZfZ7KJxQbb2wMPkqSfHvXSTKjrgSfUVBWVhPX90D3U2PiC6BqCUToc-QSbgw59G-OWVIid9cJIX1Ma1HcpHvb06Y-PE_YMqBumPOqE9_w9sr8V415CU_54Ng",
    },
    {
      id: '2',
      quote: "Travailler avec Kevin a redéfini notre vision du design produit. Les retours de nos utilisateurs sur la simplicité de l'interface ont été unanimes. Il ne fait aucun compromis sur la qualité.",
      author: "Marc Kouassi",
      role: "Head of Product, Apex Africa",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBY3KbG1IjXDASV6-wfBbP-tWNamIite4R-uaD0VAMAM_r37g7Jij6e0Qkdw8geAGrI3dk2tdLDPjCq4Qh80bXBLu1Z54mhWHNp7EuktHv-TLGw5ylE8OjyO8Dlcs7xF1QwOspQbDKwokG-SWmxYCU41FKs18zMUqxRzbJpUpqH3_OoDIG9ZT37sCZ_bMNYE_K1nhRwMcK-ooLcBd7121PSSsAouIZCnHodEJOMmuCY4c8oiuiFX6fNZw",
    },
    {
      id: '3',
      quote: "L'intégration des composants d'IA dans notre application a été rendue tellement intuitive et élégante grâce à son architecture UI. C’est un partenaire stratégique inestimable.",
      author: "Alexander Vance",
      role: "Managing Partner, Studio V",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMOF3iLIbQ9-cWrKzX8I0VFubBGzphuRm9L675lCinSCljgOrleeMJHKvEQMZ4kA0FqL29hMAIkuIqrfn_rts7JU1izgvTB2kmSdiyUpUrSgLDi8iMBwJpbk9uxGMvYZhH4YLiCLp6Kj6vvSEpPw1_sKW67Y-h7h-9-kToMniqnaOv4okoi6wAXaDiLzVg6F16w3nB_Enz4ewqfXeQCsTJYT-8s7yOCL7WUfvpzVH6bHlwJA2S3Db5hw",
    },
  ];

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
        {testimonials.map((t) => (
          <div 
            key={t.id}
            className="bg-white/[0.03] hover:bg-white/[0.05] border border-white/5 hover:border-[#FF7A00]/40 p-6 rounded-2xl flex flex-col justify-between shadow-lg relative overflow-hidden transition-all"
          >
            <div>
              <div className="text-[#FF7A00] text-3xl font-serif leading-none mb-3">“</div>
              <p className="text-xs sm:text-sm text-zinc-300 italic leading-relaxed">
                {t.quote}
              </p>
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-white/5 mt-4">
              <img 
                src={t.avatar} 
                alt={t.author} 
                className="w-10 h-10 rounded-full object-cover border border-white/10" 
              />
              <div>
                <h4 className="text-xs font-bold text-white">{t.author}</h4>
                <p className="text-[10px] text-zinc-400 font-mono">{t.role}</p>
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
