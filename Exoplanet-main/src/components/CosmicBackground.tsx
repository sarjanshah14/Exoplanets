import React from 'react';

// Full-screen, non-interactive cosmic background with central star, planets, orbits, stars, and faint nebulae.
// Designed to sit behind all content without affecting layout or interactions.
export function CosmicBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <style>
          {`
          .system-rotate { animation: sysrot 240s linear infinite; transform-origin: 960px 540px; }
          @keyframes sysrot { to { transform: rotate(360deg); } }

          .orbit-240 { animation: orb 40s linear infinite; transform-origin: 960px 540px; }
          .orbit-360 { animation: orb 70s linear infinite; transform-origin: 960px 540px; }
          .orbit-500 { animation: orb 110s linear infinite; transform-origin: 960px 540px; }
          .orbit-660 { animation: orb 160s linear infinite; transform-origin: 960px 540px; }
          .orbit-820 { animation: orb 220s linear infinite; transform-origin: 960px 540px; }
          @keyframes orb { to { transform: rotate(360deg); } }

          .spin-slow { animation: spin 60s linear infinite; transform-origin: center; }
          .spin-med { animation: spin 30s linear infinite; transform-origin: center; }
          .spin-fast { animation: spin 15s linear infinite; transform-origin: center; }
          @keyframes spin { to { transform: rotate(360deg); } }

          .drift { animation: drift 180s linear infinite; }
          @keyframes drift { 50% { transform: translate(10px, -8px) scale(1.02); } }
        `}
        </style>
        <defs>
          {/* Star glow */}
          <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#ffd27d" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#ffb347" stopOpacity="0" />
          </radialGradient>

          {/* Planet gradients */}
          <radialGradient id="metallic" cx="35%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#d3e5ff" />
            <stop offset="60%" stopColor="#7aa3ff" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </radialGradient>
          <radialGradient id="rocky" cx="35%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#f5e0c3" />
            <stop offset="60%" stopColor="#9a7b5f" />
            <stop offset="100%" stopColor="#4b3b2e" />
          </radialGradient>
          <radialGradient id="gaseous" cx="35%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#c9fff5" />
            <stop offset="60%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#0e7490" />
          </radialGradient>

          {/* Atmosphere glow */}
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Nebula noise */}
          <filter id="nebula" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.002" numOctaves="3" seed="7" result="noise" />
            <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0.6   0 0 0 0 1   0 0 0 0.25 0" />
            <feGaussianBlur stdDeviation="30" />
          </filter>

          {/* Orbit stroke */}
          <linearGradient id="orbitStroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Deep space backdrop */}
        <rect width="100%" height="100%" fill="#000000" />

        {/* Faint nebula clouds */}
        <g opacity="0.25" filter="url(#nebula)">
          <rect x="0" y="0" width="100%" height="100%" fill="#1e3a8a" />
        </g>

        {/* Scattered stars */}
        <g opacity="0.6">
          {Array.from({ length: 250 }).map((_, i) => {
            const x = (i * 7919) % 1920;
            const y = (i * 6151) % 1080;
            const r = (i % 7) / 10 + 0.2;
            return <circle key={i} cx={x} cy={y} r={r} fill="#ffffff" opacity={(i % 5) ? 0.6 : 0.9} />;
          })}
        </g>

        {/* Central star (smaller for further look) */}
        <g transform="translate(960 540)" className="system-rotate">
          <circle r="90" fill="url(#starGlow)" />
          <circle r="6" fill="#fff8e1" />

          {/* Orbits */}
          {[240, 360, 500, 660, 820].map((r, idx) => (
            <circle key={r} r={r} fill="none" stroke="url(#orbitStroke)" strokeWidth={idx % 2 ? 1.2 : 0.8} />
          ))}

          {/* Planets on orbits (use animateTransform for reliable revolution) */}
          {/* Metallic (small) */}
          <g filter="url(#softGlow)">
            <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 0 0" to="360 0 0" dur="40s" repeatCount="indefinite" />
            <g transform="translate(240 0)">
              <g className="spin-med">
                <circle r="14" fill="url(#metallic)" />
              </g>
              <ellipse rx="24" ry="6" fill="none" stroke="#93c5fd" strokeOpacity="0.18" />
            </g>
          </g>

          {/* Rocky */}
          <g filter="url(#softGlow)">
            <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 0 0" to="360 0 0" dur="70s" repeatCount="indefinite" />
            <g transform="translate(360 0)">
              <g className="spin-slow">
                <circle r="18" fill="url(#rocky)" />
              </g>
              <ellipse rx="34" ry="8" fill="none" stroke="#f59e0b" strokeOpacity="0.16" />
            </g>
          </g>

          {/* Gaseous with rings */}
          <g filter="url(#softGlow)">
            <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 0 0" to="360 0 0" dur="110s" repeatCount="indefinite" />
            <g transform="translate(500 0)">
              <g className="spin-fast">
                <circle r="28" fill="url(#gaseous)" />
              </g>
              <ellipse rx="56" ry="14" fill="none" stroke="#67e8f9" strokeOpacity="0.2" />
            </g>
          </g>

          {/* Small rocky */}
          <g filter="url(#softGlow)">
            <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 0 0" to="360 0 0" dur="160s" repeatCount="indefinite" />
            <g transform="translate(660 0)">
              <g className="spin-med">
                <circle r="12" fill="url(#rocky)" />
              </g>
            </g>
          </g>

          {/* Large metallic */}
          <g filter="url(#softGlow)">
            <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 0 0" to="360 0 0" dur="220s" repeatCount="indefinite" />
            <g transform="translate(820 0)">
              <g className="spin-slow">
                <circle r="32" fill="url(#metallic)" />
              </g>
              <ellipse rx="80" ry="18" fill="none" stroke="#93c5fd" strokeOpacity="0.14" />
            </g>
          </g>
        </g>

        {/* Additional distant exoplanets and stars (slow drift, small sizes) */}
        <g className="drift">
          <g opacity="0.5">
            <circle cx="200" cy="120" r="3.5" fill="#93c5fd" />
            <circle cx="1700" cy="220" r="2.8" fill="#67e8f9" />
            <circle cx="1500" cy="920" r="3.2" fill="#fde68a" />
            <circle cx="260" cy="860" r="2.4" fill="#a78bfa" />
          </g>
          <g opacity="0.35">
            <circle cx="320" cy="300" r="5" fill="#22c55e" />
            <circle cx="1680" cy="760" r="4.5" fill="#0ea5e9" />
          </g>
        </g>
      </svg>
    </div>
  );
}


