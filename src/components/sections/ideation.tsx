
'use client';

import CollaborationAnimation from "../collaboration-animation";

export default function IdeationSection() {
  return (
    <section id="ideation" className="w-full bg-secondary/50 border-y">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              A 4D Concept: The Genesis of Innovation
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              This animation represents a "fourth-dimensional" concept: a hyper-gear of mechanical precision strikes a nascent AI core, birthing a new digital world. It's a visual metaphor for how raw engineering power, when fused with intelligent software, can unlock and explore limitless global possibilities.
            </p>
        </div>
        <div className="w-full max-w-6xl mx-auto">
            <CollaborationAnimation />
        </div>
      </div>
    </section>
  );
}
