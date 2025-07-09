
'use client';

import { cn } from "@/lib/utils";

const CollaborationAnimation = ({ className }: { className?: string }) => {
  return (
    <div className={cn("w-full h-full flex items-center justify-center bg-transparent", className)}>
      <svg
        viewBox="0 0 800 400"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        <style>
          {`
            .hyper-gear-outer { animation: rotate 30s linear infinite; transform-origin: center; }
            .hyper-gear-inner { animation: rotate-back 20s linear infinite; transform-origin: center; }
            .spark { animation: spark-burst 4s ease-out infinite; transform-origin: center; }
            .data-stream { stroke-dasharray: 15 5; animation: dash 1s linear infinite; }
            .world-grid-lat { animation: scale-up 10s ease-in-out infinite alternate; transform-origin: center; }
            .world-grid-lon { animation: rotate 20s linear infinite; transform-origin: center; }
            .core-pulse { animation: pulse 2s ease-in-out infinite; }

            @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            @keyframes rotate-back { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
            @keyframes dash { to { stroke-dashoffset: -20; } }
            @keyframes pulse { 0%, 100% { r: 28; opacity: 0.8; } 50% { r: 32; opacity: 1; } }
            @keyframes spark-burst {
              0% { transform: scale(0); opacity: 0; }
              50% { transform: scale(1.2); opacity: 1; }
              100% { transform: scale(0); opacity: 0; }
            }
             @keyframes scale-up {
              from { transform: scale(0.8); }
              to { transform: scale(1.2); }
            }
          `}
        </style>
        
        <defs>
            <radialGradient id="gearGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="hsl(var(--muted-foreground))" />
                <stop offset="60%" stopColor="hsl(var(--secondary))" />
                <stop offset="100%" stopColor="hsl(var(--background))" />
            </radialGradient>
            <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="1" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            </radialGradient>
             <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>

        {/* Mechanical Side */}
        <g id="mechanical-construct" transform="translate(200, 200)">
            {/* Outer rotating gear */}
            <g className="hyper-gear-outer">
                <path fill="url(#gearGrad)" stroke="hsl(var(--border))" strokeWidth="1"
                    d="M 0 -80 L 14 -73 A 80 80 0 0 1 73 -14 L 80 0 L 73 14 A 80 80 0 0 1 14 73 L 0 80 L -14 73 A 80 80 0 0 1 -73 14 L -80 0 L -73 -14 A 80 80 0 0 1 -14 -73 Z" />
                <circle cx="0" cy="0" r="40" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
            </g>
            {/* Inner counter-rotating gear */}
            <g className="hyper-gear-inner">
                <path fill="hsl(var(--secondary))" stroke="hsl(var(--border))" strokeWidth="0.5"
                    d="M 0 -55 L 48 -27.5 L 48 27.5 L 0 55 L -48 27.5 L -48 -27.5 Z" />
                 <circle cx="0" cy="0" r="20" fill="hsl(var(--background))" />
            </g>

            {/* Spark of creation */}
            <g className="spark" style={{ animationDelay: '0s' }}>
                <path d="M-10,0 L10,0 M0,-10 L0,10 M-7,-7 L7,7 M-7,7 L7,-7" stroke="hsl(var(--accent))" strokeWidth="2" filter="url(#glow)"/>
            </g>
            <g className="spark" style={{ animationDelay: '2s' }}>
                <path d="M-10,0 L10,0 M0,-10 L0,10 M-7,-7 L7,7 M-7,7 L7,-7" stroke="hsl(var(--primary))" strokeWidth="2" filter="url(#glow)"/>
            </g>
        </g>
        
        {/* Data Stream */}
        <path className="data-stream" d="M300,200 C 400,150 500,250 600,200" fill="none" stroke="url(#coreGrad)" strokeWidth="2.5" filter="url(#glow)"/>

        {/* Software & World Side */}
        <g id="software-world" transform="translate(600, 200)">
            {/* World Grid */}
            <g className="world-grid" opacity="0.4" filter="url(#glow)">
                {/* Latitudes */}
                <g className="world-grid-lat">
                    <circle cx="0" cy="0" r="100" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5"/>
                    <ellipse cx="0" cy="0" rx="100" ry="30" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5"/>
                    <ellipse cx="0" cy="0" rx="100" ry="60" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5"/>
                    <ellipse cx="0" cy="0" rx="100" ry="90" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5"/>
                </g>
                {/* Longitudes */}
                <g className="world-grid-lon">
                    <ellipse cx="0" cy="0" rx="40" ry="100" fill="none" stroke="hsl(var(--accent))" strokeWidth="0.5" />
                    <ellipse cx="0" cy="0" rx="40" ry="100" fill="none" stroke="hsl(var(--accent))" strokeWidth="0.5" transform="rotate(60)"/>
                    <ellipse cx="0" cy="0" rx="40" ry="100" fill="none" stroke="hsl(var(--accent))" strokeWidth="0.5" transform="rotate(120)"/>
                </g>
            </g>

            {/* Core AI */}
            <circle cx="0" cy="0" r="30" fill="url(#coreGrad)" filter="url(#glow)" />
            <circle className="core-pulse" cx="0" cy="0" r="30" fill="url(#coreGrad)" />
        </g>
      </svg>
    </div>
  );
};

export default CollaborationAnimation;
