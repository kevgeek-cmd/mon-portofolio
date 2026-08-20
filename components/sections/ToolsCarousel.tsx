'use client';

import React from 'react';

interface Tool {
  id: string;
  name: string;
  iconUrl: string;
}

interface ToolsCarouselProps {
  tools: Tool[];
}

export default function ToolsCarousel({ tools }: ToolsCarouselProps) {
  if (!tools || tools.length === 0) return null;

  return (
    <section className="py-16 bg-white overflow-hidden border-t border-gray-50">
      <div className="container mx-auto px-6 max-w-7xl mb-10 text-center">
        <h3 className="text-2xl font-bold text-brand-dark mb-2">Outils & Technologies</h3>
        <p className="text-brand-gray text-sm">Mon stack technique pour créer des expériences remarquables</p>
      </div>

      <div className="relative flex overflow-x-hidden">
        {/* Gradient fades for edges */}
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
        {/* Scrolling content */}
        <div className="flex animate-marquee whitespace-nowrap">
          {tools.map((tool) => (
            <div key={tool.id} className="mx-6 flex flex-col items-center justify-center gap-3 group">
              <div className="w-16 h-16 rounded-2xl bg-brand-light border border-gray-100 flex items-center justify-center p-3 group-hover:shadow-md transition-shadow">
                <img src={tool.iconUrl} alt={tool.name} className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
              </div>
              <span className="text-xs font-semibold text-brand-gray">{tool.name}</span>
            </div>
          ))}
          {/* Duplicate for infinite effect */}
          {tools.map((tool) => (
            <div key={`${tool.id}-dup`} className="mx-6 flex flex-col items-center justify-center gap-3 group">
              <div className="w-16 h-16 rounded-2xl bg-brand-light border border-gray-100 flex items-center justify-center p-3 group-hover:shadow-md transition-shadow">
                <img src={tool.iconUrl} alt={tool.name} className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
              </div>
              <span className="text-xs font-semibold text-brand-gray">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Add custom animation in style since we might not have it in tailwind config */}
      <style jsx>{`
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
