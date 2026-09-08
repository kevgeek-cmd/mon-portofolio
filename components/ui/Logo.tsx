import React from 'react';
import Image from 'next/image';

export const ModernEmblemIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="emblemGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E5BF47" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#8C6D2D" />
        </linearGradient>
      </defs>
      
      {/* Outer Hexagon Diamond Shape */}
      <polygon
        points="50,6 92,28 92,72 50,94 8,72 8,28"
        stroke="url(#emblemGoldGradient)"
        strokeWidth="4"
        fill="rgba(212, 175, 55, 0.08)"
      />
      
      {/* Inner Geometric Star / Dynamic Layers */}
      <polygon
        points="50,18 80,35 80,65 50,82 20,65 20,35"
        fill="url(#emblemGoldGradient)"
        opacity="0.9"
      />
      
      {/* Core Accent Diamond */}
      <polygon
        points="50,30 68,50 50,70 32,50"
        fill="#0B0B0C"
      />
      
      <circle cx="50" cy="50" r="4" fill="url(#emblemGoldGradient)" />
    </svg>
  );
};

interface LogoProps {
  name?: string | null;
  subtitle?: string | null;
  logoUrl?: string | null;
  variant?: 'light' | 'dark';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  name = 'Kevin Assamoi',
  subtitle = 'Studio • Product',
  logoUrl,
  variant = 'dark',
  className = '',
}) => {
  const textMain = variant === 'light' ? 'text-brand-beigeLight' : 'text-zinc-900 dark:text-brand-beigeLight';
  const textSub = variant === 'light' ? 'text-brand-gold' : 'text-brand-bronze dark:text-brand-gold';

  const displayName = name || 'VOTRE MARQUE';
  const displaySubtitle = subtitle !== undefined ? subtitle : 'AGENCE DIGITALE';

  return (
    <div className={`flex items-center gap-3 group cursor-pointer ${className}`}>
      <div className="relative p-1.5 rounded-xl bg-brand-dark/10 dark:bg-brand-gold/10 border border-brand-gold/30 shadow-md group-hover:scale-105 transition-transform duration-300 flex items-center justify-center shrink-0">
        {logoUrl ? (
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-lg overflow-hidden">
            <Image src={logoUrl} alt={displayName} fill className="object-contain" />
          </div>
        ) : (
          <ModernEmblemIcon className="w-8 h-8 sm:w-9 sm:h-9" />
        )}
      </div>
      <div className="flex flex-col">
        <span className={`font-extrabold tracking-wider text-base sm:text-lg leading-tight uppercase ${textMain}`}>
          {displayName}
        </span>
        {displaySubtitle && (
          <span className={`font-semibold tracking-[0.25em] text-[10px] sm:text-xs leading-tight uppercase ${textSub}`}>
            {displaySubtitle}
          </span>
        )}
      </div>
    </div>
  );
};
