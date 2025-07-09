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
        
        const maxRotation = 20;
        setRotation({ x: -y * maxRotation, y: x * maxRotation });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
    };
    
    const CubeFace = ({ transform }: { transform: string }) => (
        <path
            d="M-50,-50 L50,-50 L50,50 L-50,50 Z"
            transform={transform}
        />
    );

    const Cube = ({ scale = 1, animationClass, id }: { scale: number, animationClass: string, id: string }) => (
        <g id={id} className={animationClass} style={{ transform: `scale(${scale})` }}>
            <CubeFace transform="rotateX(90) translateZ(50)" />
            <CubeFace transform="rotateX(-90) translateZ(50)" />
            <CubeFace transform="rotateY(0) translateZ(50)" />
            <CubeFace transform="rotateY(180) translateZ(50)" />
            <CubeFace transform="rotateY(90) translateZ(50)" />
            <CubeFace transform="rotateY(-90) translateZ(50)" />
        </g>
    );

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
                    .tesseract-svg {
                        width: 100%;
                        height: 100%;
                        overflow: visible;
                    }
                    .tesseract-svg g {
                        transform-style: preserve-3d;
                    }
                    .tesseract-svg path {
                        fill: hsl(var(--primary) / 0.15);
                        stroke: hsl(var(--primary));
                        stroke-width: 1;
                        transition: all 0.5s ease-out;
                    }
                    .tesseract-svg:hover path {
                        fill: hsl(var(--accent) / 0.25);
                        stroke: hsl(var(--accent));
                    }
                    
                    .outer-cube {
                        animation: rotate-outer 20s linear infinite;
                    }
                    .inner-cube {
                        animation: rotate-inner 15s linear infinite reverse;
                    }

                    @keyframes rotate-outer {
                        from { transform: scale(1) rotateX(0deg) rotateY(0deg); }
                        to { transform: scale(1) rotateX(360deg) rotateY(360deg); }
                    }
                    @keyframes rotate-inner {
                        from { transform: scale(0.5) rotateX(0deg) rotateY(0deg); }
                        to { transform: scale(0.5) rotateX(360deg) rotateY(360deg); }
                    }
                `}
                </style>
                <svg viewBox="-100 -100 200 200" className="tesseract-svg">
                   <Cube id="outer-cube" scale={1} animationClass="outer-cube" />
                   <Cube id="inner-cube" scale={0.5} animationClass="inner-cube" />
                </svg>
            </div>
        </div>
    );
};

export default CollaborationAnimation;
