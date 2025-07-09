
'use client';

import CollaborationAnimation from "../collaboration-animation";

export default function IdeationSection() {
  return (
    <section id="ideation" className="w-full bg-secondary/50 border-y">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Interactive Concept: The Shape of Ideas
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              This interactive animation represents a conceptual 4D cube, or tesseract. Its constant state of flux symbolizes the dynamic and ever-evolving nature of innovation. Move your cursor over the animation to shift its perspective, demonstrating how focus and interaction can shape the concepts we explore.
            </p>
        </div>
        <div className="w-full max-w-6xl mx-auto">
            <CollaborationAnimation />
        </div>
      </div>
    </section>
  );
}
