import React from 'react';

interface LaFamiliaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'horizontal' | 'icon';
  showSubtitle?: boolean;
}

export const LaFamiliaLogo: React.FC<LaFamiliaLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'horizontal',
  showSubtitle = true
}) => {
  // SVG Icon component of the exact La Familia emblem (Shield + LF Monogram + Pulse)
  const renderIcon = (iconSizeClass: string) => (
    <div className={`relative flex items-center justify-center shrink-0 ${iconSizeClass}`}>
      {/* Ambient neon backglow */}
      <div className="absolute inset-0 bg-emerald-500/25 blur-lg rounded-full transform scale-90 pointer-events-none" />
      
      <svg
        viewBox="0 0 200 170"
        className="w-full h-full relative z-10 drop-shadow-[0_2px_12px_rgba(16,185,129,0.35)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Emerald / Mint Gradients */}
          <linearGradient id="lf-emerald-bright" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6EE7B7" />
            <stop offset="30%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          <linearGradient id="lf-emerald-dark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="70%" stopColor="#047857" />
            <stop offset="100%" stopColor="#064E3B" />
          </linearGradient>

          <linearGradient id="lf-cyan-pulse" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#A7F3D0" />
            <stop offset="50%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>

          {/* Silver / Chrome Metallic Shield Gradients */}
          <linearGradient id="shield-highlight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          <linearGradient id="shield-shadow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#64748B" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>

          <linearGradient id="shield-inner" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* --- 1. METALLIC SHIELD (Background Layer) --- */}
        <g id="shield-group" transform="translate(8, 0)">
          {/* Shield Outer Rim / Left Highlight Facet */}
          <path
            d="M95 18 L126 38 C126 82 108 114 95 128 C95 128 95 18 95 18 Z"
            fill="url(#shield-shadow)"
            stroke="#475569"
            strokeWidth="1.5"
          />
          <path
            d="M95 18 L64 38 C64 82 82 114 95 128 C95 128 95 18 95 18 Z"
            fill="url(#shield-highlight)"
            stroke="#CBD5E1"
            strokeWidth="1.5"
          />

          {/* Shield Inner Dark Core */}
          <path
            d="M95 25 L120 41 C120 78 105 106 95 118 C85 106 70 78 70 41 L95 25 Z"
            fill="url(#shield-inner)"
            stroke="#1E293B"
            strokeWidth="2"
          />
          
          {/* Shield Bevel Crest Lines */}
          <path
            d="M95 25 L95 118"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="1.5"
          />
        </g>

        {/* --- 2. LETTER 'L' (Left Wing) --- */}
        <g id="letter-L">
          {/* Main Angled Stem of L */}
          <path
            d="M48 34 L72 34 L56 120 L26 120 Z"
            fill="url(#lf-emerald-bright)"
          />
          {/* Inner facet of L */}
          <path
            d="M62 44 L72 34 L56 120 L44 120 Z"
            fill="url(#lf-emerald-dark)"
            opacity="0.8"
          />
          {/* Horizontal Bottom Base of L */}
          <path
            d="M26 120 L96 120 L88 100 L48 100 L53 78 L38 78 Z"
            fill="url(#lf-emerald-bright)"
          />
          {/* Bottom Chamfer Highlight */}
          <polygon
            points="26,120 96,120 90,112 36,112"
            fill="#A7F3D0"
            opacity="0.7"
          />
        </g>

        {/* --- 3. LETTER 'F' (Right Aerodynamic Wing) --- */}
        <g id="letter-F">
          {/* Top Sweeping Blade of F */}
          <path
            d="M106 34 L164 34 C172 34 176 42 168 48 L126 48 C116 48 110 56 106 66 L98 66 Z"
            fill="url(#lf-emerald-bright)"
          />
          <path
            d="M120 34 L164 34 C172 34 176 42 168 48 L138 48 Z"
            fill="#6EE7B7"
          />

          {/* Lower Sweeping Bar of F with rounded curve */}
          <path
            d="M108 72 L150 72 C158 72 160 80 152 86 L118 86 C108 86 100 96 94 114 L84 114 C90 94 98 72 108 72 Z"
            fill="url(#lf-emerald-bright)"
          />

          {/* Lower blade bevel gradient */}
          <path
            d="M118 72 L150 72 C158 72 160 80 152 86 L128 86 Z"
            fill="#34D399"
          />

          {/* Small Chrome Accent Square between F prongs */}
          <rect
            x="142"
            y="54"
            width="10"
            height="10"
            rx="1.5"
            fill="url(#shield-highlight)"
            stroke="#475569"
            strokeWidth="1"
          />
        </g>

        {/* --- 4. CARDIOGRAM ECG PULSE HEARTBEAT LINE --- */}
        <g id="ecg-pulse" filter="url(#neon-glow)">
          {/* Glowing Pulse Path cutting across the shield */}
          <path
            d="M66 76 L86 76 L92 60 L102 96 L110 66 L116 76 L148 76"
            stroke="url(#lf-cyan-pulse)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Inner intense light line */}
          <path
            d="M66 76 L86 76 L92 60 L102 96 L110 66 L116 76 L148 76"
            stroke="#ECFDF5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );

  // Sizing definitions
  const sizeMap = {
    sm: {
      icon: 'w-8 h-8',
      title: 'text-sm',
      sub: 'text-[9px]',
      gap: 'gap-2'
    },
    md: {
      icon: 'w-10 h-10',
      title: 'text-base sm:text-lg',
      sub: 'text-[10px]',
      gap: 'gap-2.5'
    },
    lg: {
      icon: 'w-16 h-16',
      title: 'text-2xl sm:text-3xl',
      sub: 'text-xs',
      gap: 'gap-3'
    },
    xl: {
      icon: 'w-24 h-24 sm:w-32 sm:h-32',
      title: 'text-3xl sm:text-5xl',
      sub: 'text-xs sm:text-sm',
      gap: 'gap-4'
    }
  };

  const currentSize = sizeMap[size];

  // VARIANT: ICON ONLY
  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {renderIcon(currentSize.icon)}
      </div>
    );
  }

  // VARIANT: FULL VERTICAL LOCKUP (Center-aligned, like the original poster)
  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center justify-center text-center ${currentSize.gap} ${className}`}>
        {renderIcon(currentSize.icon)}

        <div className="space-y-0.5">
          <h1 className={`font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.4)] uppercase ${currentSize.title}`}>
            LA FAMILIA
          </h1>
          {showSubtitle && (
            <p className={`font-bold tracking-[0.25em] text-zinc-200 uppercase ${currentSize.sub}`}>
              FITNESS & COMMUNITY
            </p>
          )}
        </div>
      </div>
    );
  }

  // VARIANT: HORIZONTAL (For Navbar & Headers)
  return (
    <div className={`inline-flex items-center ${currentSize.gap} ${className}`}>
      {renderIcon(currentSize.icon)}

      <div className="flex flex-col text-left rtl:text-right leading-none">
        <div className="flex items-center gap-1.5">
          <span className={`font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.35)] uppercase ${currentSize.title}`}>
            LA FAMILIA
          </span>
        </div>
        {showSubtitle && (
          <span className={`font-bold tracking-[0.2em] text-zinc-300 uppercase mt-0.5 ${currentSize.sub}`}>
            FITNESS & COMMUNITY
          </span>
        )}
      </div>
    </div>
  );
};
