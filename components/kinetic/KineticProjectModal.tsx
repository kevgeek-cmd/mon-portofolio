'use client';

import React, { useEffect } from 'react';

export interface ProjectDetail {
  id: string;
  title: string;
  subtitle?: string;
  metric?: string;
  summary: string;
  description?: string;
  coverImage: string;
  category?: { name: string } | null;
  technologies?: string[];
  liveUrl?: string | null;
  githubUrl?: string | null;
}

interface KineticProjectModalProps {
  project: ProjectDetail | null;
  onClose: () => void;
  onContactClick: () => void;
}

export default function KineticProjectModal({ project, onClose, onContactClick }: KineticProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 select-none animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-[#121212] border border-white/15 rounded-2xl max-w-2xl w-full p-6 relative shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-zinc-300 transition-colors cursor-pointer z-20"
          aria-label="Fermer"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        <div className="flex flex-col gap-4">
          <div className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden mb-2 bg-black/50">
            <img 
              src={project.coverImage} 
              alt={project.title} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-[#FF7A00] text-black font-mono text-xs font-bold shadow-lg">
              {project.metric || (project.category?.name ? `${project.category.name}` : 'Projet Vedette')}
            </span>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">{project.title}</h3>
            <span className="text-xs font-mono text-zinc-400">
              {project.subtitle || (project.technologies?.length ? project.technologies.join(' • ') : 'Next.js • UI/UX • AI')}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-h-48 overflow-y-auto custom-scroll whitespace-pre-line">
            {project.description || project.summary}
          </p>

          <div className="flex flex-wrap items-center justify-between pt-4 border-t border-white/10 mt-2 gap-3">
            <span className="text-xs text-zinc-400 font-mono">
              Kevin Assamoi Studio • 2024-2026
            </span>
            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-300 hover:text-white bg-white/5 border border-white/10 px-3 py-1.5 rounded-full hover:bg-white/10 transition-all"
                >
                  <span>Voir en direct</span>
                  <span className="material-symbols-outlined text-xs">open_in_new</span>
                </a>
              )}
              <button 
                onClick={() => {
                  onClose();
                  onContactClick();
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF7A00] hover:underline cursor-pointer"
              >
                <span>Discuter d’un projet similaire</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
