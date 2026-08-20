'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Volume2, VolumeX, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  title?: string | null;
  subtitle?: string | null;
  videoUrl?: string | null;
  ctaText?: string | null;
  ctaLink?: string | null;
}

export const Hero: React.FC<HeroProps> = ({
  title = 'INNOVEZ AVEC EXCELLENCE',
  subtitle = 'Nous concevons des solutions numériques modernes et performantes pour propulser votre entreprise vers le succès.',
  videoUrl,
  ctaText = 'DÉCOUVRIR NOS PROJETS',
  ctaLink = '#projets',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const displayTitle = title || 'INNOVEZ AVEC EXCELLENCE';
  const displaySubtitle =
    subtitle ||
    'Nous concevons des solutions numériques modernes et performantes pour propulser votre entreprise vers le succès.';

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const hasVideo = Boolean(videoUrl && videoUrl.trim() !== '');

  return (
    <section
      id="accueil"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-brand-dark pt-20"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-gold/10 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-20 left-10 w-96 h-96 bg-brand-bronze/15 rounded-full filter blur-[130px] pointer-events-none" />

      {/* Optional Background Video */}
      {hasVideo && isMounted && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted={isMuted}
            loop
            playsInline
            className="w-full h-full object-cover filter brightness-50 contrast-105"
          >
            <source src={videoUrl!} type="video/mp4" />
          </video>
        </div>
      )}

      {/* Background Grid Pattern Overlay */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.07] pointer-events-none" />

      {/* Bottom Transition Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent pointer-events-none z-10" />

      {/* Main Hero Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10 flex flex-col items-center">
        {/* Top Tag Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-semibold uppercase tracking-widest mb-6 shadow-inner"
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
          <span>Agence Digitale & Solutions Sur Mesure</span>
        </motion.div>

        {/* Hero Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-brand-beigeLight tracking-tight leading-[1.1] uppercase max-w-4xl"
        >
          {displayTitle}
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg lg:text-xl text-brand-beige/80 max-w-2xl leading-relaxed"
        >
          {displaySubtitle}
        </motion.p>

        {/* CTA Buttons Group */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link
            href={ctaLink || '#projets'}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-gold-gradient hover:bg-gold-gradient-hover shadow-2xl hover:shadow-brand-gold/30 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span>{ctaText || 'Découvrir nos projets'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest text-brand-beige hover:text-white bg-brand-darkCard/80 border border-brand-gold/30 hover:border-brand-gold/60 backdrop-blur-md transition-all duration-300"
          >
            <span>Contactez-nous</span>
          </Link>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-brand-beige/60"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-gold" />
            <span>Développement Haute Performance</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-gold" />
            <span>Design & Expérience Premium</span>
          </div>
        </motion.div>
      </div>

      {/* Floating Sound Toggle Control (if video is active) */}
      {hasVideo && (
        <div className="absolute bottom-6 right-4 sm:bottom-8 sm:right-8 z-20">
          <button
            onClick={toggleSound}
            className="inline-flex items-center gap-2 sm:gap-2.5 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-brand-dark/85 hover:bg-brand-dark backdrop-blur-xl border border-brand-gold/40 text-brand-gold hover:text-white shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-[11px] sm:text-xs font-bold uppercase tracking-wider"
            aria-label={isMuted ? 'Activer le son de la vidéo' : 'Désactiver le son'}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-brand-gold shrink-0" />
                <span>Activer le son</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse shrink-0" />
                <span>Désactiver le son</span>
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
};
