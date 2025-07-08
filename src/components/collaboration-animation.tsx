
'use client';

import { cn } from "@/lib/utils";

const CollaborationAnimation = ({ className }: { className?: string }) => {
  return (
    <div className={cn("w-full h-full flex items-center justify-center", className)}>
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-[400px] max-h-[400px] aspect-square"
      >
        <style>
          {`
            .gear {
              animation: rotate 20s linear infinite;
              transform-origin: center;
              fill: hsl(var(--primary));
            }
            .laptop-screen {
              animation: pulse 4s ease-in-out infinite;
              fill: hsl(var(--accent));
            }
            .laptop-glow {
                animation: pulse-glow 4s ease-in-out infinite;
                fill: hsl(var(--primary));
                stroke: hsl(var(--primary));
            }
            .dots {
                stroke-dasharray: 2 4;
                stroke-dashoffset: 100;
                animation: dash 5s linear infinite;
                stroke: hsl(var(--primary));
            }
            @keyframes rotate {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes pulse {
              0%, 100% { opacity: 0.8; }
              50% { opacity: 1; }
            }
             @keyframes pulse-glow {
              0%, 100% { opacity: 0.3; transform: scale(1); }
              50% { opacity: 0.7; transform: scale(1.05); }
            }
            @keyframes dash {
              to {
                stroke-dashoffset: 0;
              }
            }
          `}
        </style>
        
        {/* Gear */}
        <g className="gear" transform="translate(60 70) scale(1.2)">
           <path d="M25 12.5C25 19.4036 19.4036 25 12.5 25C5.59644 25 0 19.4036 0 12.5C0 5.59644 5.59644 0 12.5 0C19.4036 0 25 5.59644 25 12.5ZM50 11.3397L50 13.6603L43.6603 13.6603L43.6603 11.3397L50 11.3397ZM36.1603 6.33975L38.4808 6.33975L38.4808 12.6795L36.1603 12.6795L36.1603 6.33975ZM36.1603 12.3205L38.4808 12.3205L38.4808 18.6603L36.1603 18.6603L36.1603 12.3205ZM13.8397 6.33975L11.5192 6.33975L11.5192 12.6795L13.8397 12.6795L13.8397 6.33975ZM13.8397 12.3205L11.5192 12.3205L11.5192 18.6603L13.8397 18.6603L13.8397 12.3205ZM6.33975 11.5192L12.6795 11.5192L12.6795 13.8397L6.33975 13.8397L6.33975 11.5192ZM12.3205 11.5192L18.6603 11.5192L18.6603 13.8397L12.3205 13.8397L12.3205 11.5192ZM43.3013 18.25L36.9615 18.25L36.9615 20.5705L43.3013 20.5705L43.3013 18.25ZM43.3013 4.75L36.9615 4.75L36.9615 7.07051L43.3013 7.07051L43.3013 4.75ZM6.69873 18.25L13.0385 18.25L13.0385 20.5705L6.69873 20.5705L6.69873 18.25ZM6.69873 4.75L13.0385 4.75L13.0385 7.07051L6.69873 7.07051L6.69873 4.75ZM18.25 6.69873L20.5705 6.69873L20.5705 13.0385L18.25 13.0385L18.25 6.69873ZM18.25 36.9615L20.5705 36.9615L20.5705 43.3013L18.25 43.3013L18.25 36.9615ZM4.75 6.69873L7.07051 6.69873L7.07051 13.0385L4.75 13.0385L4.75 6.69873ZM4.75 36.9615L7.07051 36.9615L7.07051 43.3013L4.75 43.3013L4.75 36.9615Z" transform="translate(15 15) rotate(15) scale(1.1)"/>
        </g>

        {/* Laptop */}
        <g transform="translate(80 100)">
            {/* Laptop Glow */}
            <rect className="laptop-glow" x="-5" y="-50" width="90" height="55" rx="5" ry="5" />
            
            {/* Laptop Screen */}
            <rect className="laptop-screen" x="0" y="-45" width="80" height="45" rx="3" ry="3" />
            <text x="12" y="-22" font-family="monospace" font-size="10" fill="hsl(var(--primary-foreground))">{`</>`}</text>
            
            {/* Laptop Base */}
            <path fill="hsl(var(--card-foreground))" d="M -10 5 L 90 5 L 100 15 L -20 15 Z" />
        </g>

        {/* Connecting Dots */}
        <path d="M 95 85 C 100 90, 105 95, 110 100" fill="none" strokeWidth="2" className="dots"/>
      </svg>
    </div>
  );
};

export default CollaborationAnimation;
