'use client';

import React from 'react';

interface YoutubeVideo {
  id: string;
  title: string;
  youtubeId: string;
  description: string | null;
  isPlaylist: boolean;
}

interface LightVideosProps {
  videos: YoutubeVideo[];
}

export default function LightVideos({ videos }: LightVideosProps) {
  if (!videos || videos.length === 0) return null;

  return (
    <section className="py-24 bg-brand-dark text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-brand-beigeLight mb-4">
            Contenu <span className="text-transparent bg-clip-text bg-gold-gradient">Vidéo</span>
          </h2>
          <p className="text-brand-beige/70 max-w-2xl mx-auto">
            Découvrez mes dernières réalisations, tutoriels et interviews.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map(video => (
            <div key={video.id} className="bg-brand-darkCard rounded-3xl overflow-hidden border border-brand-gold/20 shadow-xl flex flex-col">
               <div className="relative w-full aspect-video">
                 <iframe 
                   src={`https://www.youtube.com/embed/${video.isPlaylist ? `videoseries?list=${video.youtubeId}` : video.youtubeId}`}
                   title={video.title}
                   className="absolute top-0 left-0 w-full h-full border-0"
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                   allowFullScreen 
                 />
               </div>
               <div className="p-6">
                 <h3 className="font-bold text-lg mb-2 text-brand-gold">{video.title}</h3>
                 {video.description && <p className="text-sm text-brand-beige/70">{video.description}</p>}
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
