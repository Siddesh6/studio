
'use client';

import CollaborationAnimation from "../collaboration-animation";

export default function IdeationSection() {
  return (
    <section id="ideation" className="w-full bg-secondary/50 border-y">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Interactive Concept: The Hypercube
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              This animation shows a tesseract—a four-dimensional cube projected into our three dimensions. It represents the exploration of complex, multi-layered ideas. The two nested, rotating cubes symbolize looking at a problem from multiple perspectives simultaneously. Move your cursor to shift your point of view on this abstract concept.
            </p>
        </div>
        <div className="w-full max-w-6xl mx-auto">
            <CollaborationAnimation />
        </div>
      </div>
    </section>
  );
}
