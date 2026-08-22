'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface GalleryItem {
  id: string;
  imageUrl: string;
  title: string | null;
  caption: string | null;
}

interface LightGalleryProps {
  images: GalleryItem[];
}

export default function LightGallery({ images }: LightGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <section className="py-24 bg-brand-light text-brand-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Galerie <span className="text-brand-gold">Photos</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Aperçu de mes événements, backstages et moments forts.
          </p>
        </div>
        
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img) => (
            <div 
              key={img.id} 
              className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all"
              onClick={() => setSelectedImage(img)}
            >
              <Image 
                src={img.imageUrl} 
                alt={img.title || 'Galerie'} 
                width={600} 
                height={800} 
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                {img.title && <h3 className="text-white font-bold text-lg">{img.title}</h3>}
                {img.caption && <p className="text-gray-300 text-sm mt-1">{img.caption}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4" onClick={() => setSelectedImage(null)}>
          <button 
            className="absolute top-6 right-6 text-white hover:text-brand-gold transition-colors p-2 bg-black/50 rounded-full"
            onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <img 
              src={selectedImage.imageUrl} 
              alt={selectedImage.title || 'Galerie'} 
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl" 
            />
            {(selectedImage.title || selectedImage.caption) && (
              <div className="mt-6 text-center">
                {selectedImage.title && <h3 className="text-2xl font-bold text-white">{selectedImage.title}</h3>}
                {selectedImage.caption && <p className="text-gray-400 mt-2">{selectedImage.caption}</p>}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
