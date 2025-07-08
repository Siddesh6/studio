
'use client';

import { cn } from "@/lib/utils";

const CollaborationAnimation = ({ className }: { className?: string }) => {
  return (
    <div className={cn("w-full h-full flex items-center justify-center", className)}>
      <svg
        viewBox="0 0 800 400"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        <style>
          {`
            .gear { animation: rotate 20s linear infinite; transform-origin: center; }
            .gear-2 { animation: rotate-back 15s linear infinite; transform-origin: center; }
            .piston { animation: piston-move 4s ease-in-out infinite; }
            .data-flow { stroke-dasharray: 10; animation: dash 2s linear infinite; }
            .scan-light { animation: scan 4s linear infinite; }
            .eye-glow { animation: pulse 3s ease-in-out infinite; }

            @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            @keyframes rotate-back { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
            @keyframes piston-move { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(20px); } }
            @keyframes dash { to { stroke-dashoffset: -20; } }
            @keyframes scan {
              0%, 100% { transform: translateY(-20px); opacity: 0; }
              25% { opacity: 1; }
              75% { opacity: 1; }
              90% { transform: translateY(20px); opacity: 0; }
            }
            @keyframes pulse { 0%, 100% { opacity: 0.7; } 50% { opacity: 1; } }
          `}
        </style>
        
        <defs>
          <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style={{stopColor: 'hsl(var(--secondary-foreground))', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor: 'hsl(var(--secondary))', stopOpacity:1}} />
          </radialGradient>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: 'hsl(var(--primary))', stopOpacity:0.8}} />
            <stop offset="100%" style={{stopColor: 'hsl(var(--accent))', stopOpacity:0.8}} />
          </linearGradient>
           <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Mechanical Side */}
        <g id="mechanical-parts" transform="translate(150, 200)">
          {/* Main Gear */}
          <g className="gear" transform="scale(1.5)">
            <path fill="url(#grad1)" d="M50,25a25,25 0 1,0-50,0a25,25 0 1,0 50,0 M48,2v5h-4v-5h4 M2,25h5v-4h-5v4 M25,48h-4v-5h4v5 M7.9,7.9l3.5,3.5l-2.8,2.8l-3.5-3.5l2.8-2.8 M7.9,42.1l3.5-3.5l2.8,2.8l-3.5,3.5l-2.8-2.8 M42.1,42.1l-3.5-3.5l2.8-2.8l3.5,3.5l-2.8,2.8 M42.1,7.9l-3.5,3.5l-2.8-2.8l3.5-3.5l2.8,2.8z" />
            <circle cx="25" cy="25" r="10" fill="hsl(var(--background))" />
          </g>
          {/* Secondary Gear */}
          <g className="gear-2" transform="translate(80, -60) scale(0.8)">
            <path fill="url(#grad1)" d="M50,25a25,25 0 1,0-50,0a25,25 0 1,0 50,0 M48,2v5h-4v-5h4 M2,25h5v-4h-5v4 M25,48h-4v-5h4v5 M7.9,7.9l3.5,3.5l-2.8,2.8l-3.5-3.5l2.8-2.8 M7.9,42.1l3.5-3.5l2.8,2.8l-3.5,3.5l-2.8-2.8 M42.1,42.1l-3.5-3.5l2.8-2.8l3.5,3.5l-2.8,2.8 M42.1,7.9l-3.5,3.5l-2.8-2.8l3.5-3.5l2.8,2.8z" />
             <circle cx="25" cy="25" r="8" fill="hsl(var(--background))" />
          </g>
          {/* Piston */}
          <g className="piston" transform="translate(-100, -50)">
            <rect x="0" y="0" width="30" height="60" rx="5" fill="hsl(var(--secondary))" />
            <rect x="5" y="5" width="20" height="50" fill="hsl(var(--secondary-foreground))" opacity="0.2" />
          </g>
        </g>
        
        {/* Data Flow */}
        <g id="data-flow" filter="url(#glow)">
          <path className="data-flow" d="M300,200 C 400,100 500,300 600,200" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
          <path className="data-flow" style={{animationDelay: '0.5s'}} d="M250,150 C 350,250 450,50 580,180" fill="none" stroke="hsl(var(--accent))" strokeWidth="2" />
        </g>

        {/* Software / Vision Side */}
        <g id="vision-parts" transform="translate(650, 200)">
          {/* Eye shape */}
          <path className="eye-glow" d="M-50,0 C-25,-50 25,-50 50,0 C25,50 -25,50 -50,0z" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" filter="url(#glow)" />
          {/* Pupil */}
          <circle cx="0" cy="0" r="15" fill="url(#grad2)" />
           {/* Scan light */}
          <rect className="scan-light" x="-2" y="-20" width="4" height="40" fill="hsl(var(--primary-foreground))" rx="2" />
          {/* Code/data bits around */}
          <g opacity="0.5">
              <text x="-40" y="-45" fill="hsl(var(--foreground))" fontSize="12" fontFamily="monospace">101</text>
              <text x="30" y="-55" fill="hsl(var(--foreground))" fontSize="12" fontFamily="monospace">010</text>
              <text x="50" y="20" fill="hsl(var(--foreground))" fontSize="12" fontFamily="monospace">001</text>
              <text x="-60" y="35" fill="hsl(var(--foreground))" fontSize="12" fontFamily="monospace">110</text>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default CollaborationAnimation;
