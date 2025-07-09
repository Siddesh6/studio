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
        <div 
            className="absolute w-[100px] h-[100px] border border-primary/50 bg-primary/10 transition-colors duration-300"
            style={{ transform }}
        />
    );

    const Cube = ({ scale = 1, animationClass }: { scale?: number, animationClass: string }) => (
        <div 
            className={cn("absolute w-[100px] h-[100px]", animationClass)}
            style={{ 
                transformStyle: 'preserve-3d',
                transform: `scale(${scale})`
            }}
        >
            <CubeFace transform="rotateX(90deg) translateZ(50px)" />
            <CubeFace transform="rotateX(-90deg) translateZ(50px)" />
            <CubeFace transform="rotateY(0deg) translateZ(50px)" />
            <CubeFace transform="rotateY(180deg) translateZ(50px)" />
            <CubeFace transform="rotateY(90deg) translateZ(50px)" />
            <CubeFace transform="rotateY(-90deg) translateZ(50px)" />
        </div>
    );
    

    return (
        <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={cn("w-full h-[400px] flex items-center justify-center cursor-pointer group", className)}
            style={{ perspective: '1000px' }}
        >
            <div
                className="relative w-[100px] h-[100px]"
                style={{
                    transformStyle: 'preserve-3d',
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                    transition: 'transform 0.1s linear'
                }}
            >
                <style>
                {`
                    @keyframes rotate-inner {
                        from { transform: scale(0.5) rotateX(0deg) rotateY(0deg); }
                        to { transform: scale(0.5) rotateX(360deg) rotateY(360deg); }
                    }
                    .animate-rotate-inner {
                        animation: rotate-inner 20s linear infinite;
                    }
                    .group:hover .border-primary\\/50 {
                        border-color: hsl(var(--accent));
                    }
                     .group:hover .bg-primary\\/10 {
                        background-color: hsl(var(--accent) / 0.2);
                    }
                `}
                </style>
                <div className="tesseract-container w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
                    <Cube animationClass="" />
                    <Cube scale={0.5} animationClass="animate-rotate-inner" />
                </div>
            </div>
        </div>
    );
};

export default CollaborationAnimation;
