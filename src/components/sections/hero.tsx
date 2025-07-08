
'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePersonalData } from "@/context/PersonalDataContext";

export default function HeroSection() {
  const { personalData } = usePersonalData();

  return (
    <section id="hero" className="w-full bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6">
           <div className="flex flex-col justify-center items-center text-center space-y-4 pt-12">
            <div className="space-y-4">
              <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                {personalData.details.name}
              </h1>
              <h2 className="text-xl md:text-2xl text-primary font-semibold">{personalData.details.title}</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                {personalData.details.professionalSummary}
              </p>
              <p className="max-w-[700px] text-muted-foreground/80 md:text-lg italic">
                {personalData.details.personalTouch}
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
              <Button asChild size="lg">
                <Link href="#contact">Get in Touch</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#projects">View My Work</Link>
              </Button>
            </div>
            <div className="flex items-center gap-4 pt-4">
              {personalData.details.socials.map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <social.icon className="h-6 w-6" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
