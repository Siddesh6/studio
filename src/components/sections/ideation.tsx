
'use client';

import CollaborationAnimation from "../collaboration-animation";

export default function IdeationSection() {
  return (
    <section id="ideation" className="w-full bg-secondary/50 border-y">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Interactive Concept: The 5D Hypergear
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              This animation is a conceptual representation of a "5D Hypergear." It visualizes multiple dimensions of a complex system through nested, counter-rotating gear structures. Each layer represents a different facet of an idea—from core logic to user experience—all interacting in a delicate, multi-dimensional dance. This interactive piece symbolizes how intricate systems are built, layer by layer, into a cohesive whole. Move your cursor to shift the perspective and explore the structure's depth.
            </p>
        </div>
        <div className="w-full max-w-6xl mx-auto">
            <CollaborationAnimation />
        </div>
      </div>
    </section>
  );
}
