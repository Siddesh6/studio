
'use client';

import CollaborationAnimation from "../collaboration-animation";

export default function IdeationSection() {
  return (
    <section id="ideation" className="w-full bg-secondary/50 border-y">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Interactive Concept: The 4D Tesseract
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              This animation is a conceptual representation of a "4D Tesseract," or hypercube. It symbolizes the multi-faceted nature of complex projects and ideas. The outer cube represents the tangible product, while the inner, counter-rotating cube symbolizes the core logic and abstract thinking behind it. This interactive piece demonstrates how different layers of a project are interconnected. Move your cursor to shift your perspective and explore the structure's depth.
            </p>
        </div>
        <div className="w-full max-w-6xl mx-auto">
            <CollaborationAnimation />
        </div>
      </div>
    </section>
  );
}
