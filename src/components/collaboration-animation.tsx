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
        
        const maxRotation = 15;
        setRotation({ x: -y * maxRotation, y: x * maxRotation });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
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
                className="relative w-[200px] h-[200px]"
                style={{
                    transformStyle: 'preserve-3d',
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                    transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}
            >
                <style>
                {`
                    .tesseract-face {
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        border: 1px solid hsl(var(--primary));
                        background: hsla(var(--primary) / 0.1);
                        box-shadow: 0 0 20px hsla(var(--primary) / 0.3), inset 0 0 20px hsla(var(--primary) / 0.2);
                        transition: all 6s ease-in-out;
                    }
                    .tesseract-container:hover .tesseract-face {
                        border-color: hsl(var(--accent));
                        background: hsla(var(--accent) / 0.15);
                        box-shadow: 0 0 35px hsla(var(--accent) / 0.5), inset 0 0 35px hsla(var(--accent) / 0.3);
                    }
                    .tesseract-container {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        transform-style: preserve-3d;
                        animation: tesseract-rotate 16s infinite linear;
                    }

                    @keyframes tesseract-rotate {
                        0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
                        100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
                    }

                    .inner-cube {
                        transform-style: preserve-3d;
                        animation: inner-cube-rotate 16s infinite linear reverse;
                    }

                    @keyframes inner-cube-rotate {
                        0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(0.5); }
                        50% { transform: rotateX(-180deg) rotateY(-360deg) rotateZ(-180deg) scale(0.5); }
                        100% { transform: rotateX(-360deg) rotateY(-720deg) rotateZ(-360deg) scale(0.5); }
                    }

                    .outer-cube {
                        transform-style: preserve-3d;
                    }

                    .outer-cube .tesseract-face {
                        width: 200px;
                        height: 200px;
                        margin-left: -100px;
                        margin-top: -100px;
                    }
                    .inner-cube .tesseract-face {
                        width: 100px;
                        height: 100px;
                        margin-left: -50px;
                        margin-top: -50px;
                    }
                `}
                </style>
                <div className="tesseract-container">
                    <div className="outer-cube">
                        <div className="tesseract-face" style={{ transform: 'rotateY(0deg) translateZ(100px)' }}></div>
                        <div className="tesseract-face" style={{ transform: 'rotateY(90deg) translateZ(100px)' }}></div>
                        <div className="tesseract-face" style={{ transform: 'rotateY(180deg) translateZ(100px)' }}></div>
                        <div className="tesseract-face" style={{ transform: 'rotateY(-90deg) translateZ(100px)' }}></div>
                        <div className="tesseract-face" style={{ transform: 'rotateX(90deg) translateZ(100px)' }}></div>
                        <div className="tesseract-face" style={{ transform: 'rotateX(-90deg) translateZ(100px)' }}></div>
                    </div>
                    <div className="inner-cube">
                        <div className="tesseract-face" style={{ transform: 'rotateY(0deg) translateZ(50px)' }}></div>
                        <div className="tesseract-face" style={{ transform: 'rotateY(90deg) translateZ(50px)' }}></div>
                        <div className="tesseract-face" style={{ transform: 'rotateY(180deg) translateZ(50px)' }}></div>
                        <div className="tesseract-face" style={{ transform: 'rotateY(-90deg) translateZ(50px)' }}></div>
                        <div className="tesseract-face" style={{ transform: 'rotateX(90deg) translateZ(50px)' }}></div>
                        <div className="tesseract-face" style={{ transform: 'rotateX(-90deg) translateZ(50px)' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollaborationAnimation;
