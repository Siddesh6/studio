'use client';

import { useState, useRef } from 'react';
import { cn } from "@/lib/utils";

const CollaborationAnimation = ({ className }: { className?: string }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();

        const x = (clientX - left - width / 2) / (width / 2); // -1 to 1
        const y = (clientY - top - height / 2) / (height / 2); // -1 to 1
        
        const maxRotation = 20; // Increased rotation for more dramatic effect
        setRotation({ x: -y * maxRotation, y: x * maxRotation });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
    };

    // A path for a gear tooth that will be repeated
    const tooth = "M-5,-100 l10,0 l5,20 l-20,0 l5,-20 Z";

    // A component to generate a gear using the tooth path
    const Gear = ({ teeth, transform, animationClass }: { teeth: number, transform?: string, animationClass?: string }) => {
        const toothElements = [];
        for (let i = 0; i < teeth; i++) {
            toothElements.push(
                <use key={i} href="#tooth" transform={`rotate(${(360 / teeth) * i})`} />
            );
        }
        return (
            <g transform={transform} className={animationClass}>
                <circle r="85" fill="transparent" />
                {toothElements}
                <circle r="70" className="gear-inner-ring" />
                <circle r="25" className="gear-hub" />
            </g>
        );
    };

    return (
        <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={cn("w-full h-[400px] flex items-center justify-center cursor-pointer", className)}
            style={{ perspective: '1200px' }}
        >
            <div
                className="relative w-[400px] h-[400px]"
                style={{
                    transformStyle: 'preserve-3d',
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                    transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}
            >
                <style>
                {`
                    .gear-svg {
                        width: 100%;
                        height: 100%;
                        overflow: visible;
                    }
                    .gear-svg * {
                        transition: all 0.5s ease-out;
                    }
                    .gear-svg #tooth {
                        fill: hsl(var(--primary) / 0.8);
                        stroke: hsl(var(--primary));
                        stroke-width: 2;
                    }
                    .gear-svg .gear-inner-ring {
                        fill: none;
                        stroke: hsl(var(--primary));
                        stroke-width: 8;
                    }
                    .gear-svg .gear-hub {
                        fill: hsl(var(--primary) / 0.2);
                        stroke: hsl(var(--primary));
                        stroke-width: 4;
                    }
                    .gear-svg:hover #tooth {
                        fill: hsl(var(--accent) / 0.8);
                        stroke: hsl(var(--accent));
                    }
                     .gear-svg:hover .gear-inner-ring {
                        stroke: hsl(var(--accent));
                    }
                     .gear-svg:hover .gear-hub {
                        fill: hsl(var(--accent) / 0.2);
                        stroke: hsl(var(--accent));
                    }
                    .gear-1-animation {
                        animation: rotate-cw 10s linear infinite;
                    }
                    .gear-2-animation {
                        animation: rotate-ccw 10s linear infinite;
                    }
                    @keyframes rotate-cw {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                    @keyframes rotate-ccw {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(-360deg); }
                    }
                `}
                </style>
                <svg viewBox="-200 -200 400 400" className="gear-svg">
                    <defs>
                        <path id="tooth" d={tooth} />
                    </defs>
                    <g style={{transform: 'translateZ(10px)'}}>
                        <Gear teeth={12} transform="translate(-70, -40)" animationClass="gear-1-animation"/>
                        <Gear teeth={12} transform="translate(70, 40) rotate(15)" animationClass="gear-2-animation"/>
                    </g>
                </svg>
            </div>
        </div>
    );
};

export default CollaborationAnimation;
