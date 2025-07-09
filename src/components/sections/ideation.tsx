
'use client';

import CollaborationAnimation from "../collaboration-animation";

export default function IdeationSection() {
  return (
    <section id="ideation" className="w-full bg-secondary/50 border-y">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Interactive Concept: The Mechanical Tesseract
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              This animation visualizes a Mechanical Tesseract—a structure where the faces of a 4D cube are replaced by spur gears. It represents the fusion of precision engineering and complex, multi-dimensional software architecture. The nested, rotating cells symbolize layers of an intricate system working in perfect concert. Move your cursor to manipulate the perspective and explore this hyper-dimensional engine.
            </p>
        </div>
        <div className="w-full max-w-6xl mx-auto">
            <CollaborationAnimation />
        </div>
      </div>
    </section>
  );
}
